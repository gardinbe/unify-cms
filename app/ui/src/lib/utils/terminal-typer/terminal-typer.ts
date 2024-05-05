import { unionWith } from 'ramda';
import type { DeepRequired } from 'ts-essentials';

import { escapeRegex, mergeShallowRight, throwExp } from '~/lib/utils';

import type { CursorOptions } from './cursor';
import { Cursor } from './cursor';
import type { DeleteEffectInterval, Effect, EffectInterval } from './effects';
import { DeleteEffect, InsertEffect, WaitEffect } from './effects';
import type { CharContainers, EffectBuilder } from './types';

/**
 * Options for a terminal-typer parser.
 */
export interface TerminalTyperOptions {
	/**
	 * HTML content to replace the element's innerHTML with.
	 * @defaultValue
	 * ```typescript
	 *	null
	 * ```
	 */
	content?: string | null;
	/** Cursor options. */
	cursor?: CursorOptions;
	/**
	 * Whether or not the layout should shift dynamically as effects are
	 * applied.
	 *
	 * If `true`, then an invisible version of the resulting output will be
	 * rendered immediately.
	 *
	 * As visible characters are inserted, invisible ones will be removed to
	 * keep the total text content constant.
	 * @defaultValue
	 * ```typescript
	 *	false
	 * ```
	 */
	noLayoutShift?: boolean;
	effects?: {
		/** Intervals for some built-in effects. */
		intervals?: TerminalTyperIntervals;
		/**
		 * Effect symbols used when parsing effects from text.
		 *
		 * - Symbols can be multiple characters.
		 * - Opening and closing symbols can be the same.
		 */
		symbols?: {
			/**
			 * Opening symbol for an effect.
			 * @defaultValue
			 * ```typescript
			 *	"{"
			 * ```
			 */
			opening?: string;
			/**
			 * Closing symbol for an effect.
			 * @defaultValue
			 * ```typescript
			 *	"}"
			 * ```
			 */
			closing?: string;
			/**
			 * Separator symbol for an effect.
			 * @defaultValue
			 * ```typescript
			 *	":"
			 * ```
			 */
			separator?: string;
		};
		/**
		 * Register additional effects by providing effect builders.
		 *
		 * - You can override built-in effects by defining an effect builder with
		 * the same key (as the one you want to override).
		 */
		builders?: EffectBuilder[];
		/**
		 * Specify the default effect to be used for plain text.
		 *
		 * If for some reason you want to replace the default effect for plain
		 * text (which is 'insert') you can do it here. Perhaps, you want to write
		 * an effect that inserts multiple characters at a time, or something.
		 * @defaultValue The built-in 'insert' effect builder
		 */
		defaultBuilder?: EffectBuilder;
	};
}

export interface TerminalTyperIntervals {
	/**
	 * Insert effect interval.
	 * @defaultValue
	 * ```typescript
	 *	{
	 *		variance: "random",
	 *		min: 10,
	 *		max: 80
	 *	}
	 * ```
	 */
	insert?: EffectInterval;
	/**
	 * Delete effect interval.
	 * @defaultValue
	 * ```typescript
	 *	{
	 *		variance: "constant",
	 *		value: 40,
	 *		afterFirstChar: 350
	 *	}
	 * ```
	 */
	delete?: DeleteEffectInterval;
}

/**
 * A terminal-typing effect that incrementally inserts, deletes, and applies other
 * effects to characters.
 */
export class TerminalTyper {
	static createOptions(options?: TerminalTyperOptions): DeepRequired<TerminalTyperOptions> {
		const intervals: DeepRequired<TerminalTyperIntervals> = mergeShallowRight(
			{
				insert: {
					variance: 'random',
					min: 25,
					max: 75
				},
				delete: {
					variance: 'constant',
					value: 40,
					afterFirstChar: 350
				}
			},
			options?.effects?.intervals
		);

		return {
			...mergeShallowRight(
				{
					content: null,
					noLayoutShift: false
				},
				options
			),
			cursor: Cursor.createOptions(options?.cursor),
			effects: {
				intervals,
				symbols: mergeShallowRight(
					{
						opening: '{',
						closing: '}',
						separator: ':'
					},
					options?.effects?.symbols
				),
				builders: unionWith(
					(a, b) => a.key === b.key,
					options?.effects?.builders ?? [],
					[
						InsertEffect.builder(intervals.insert),
						DeleteEffect.builder(intervals.delete),
						WaitEffect.builder()
					]
				),
				defaultBuilder: InsertEffect.builder(intervals.insert)
			}
		};
	}

	private options: DeepRequired<TerminalTyperOptions>;

	private patterns: {
		effect: RegExp;
		effectEscape: {
			opening: RegExp;
			closing: RegExp;
		};
		effectSplit: RegExp;
	};

	private effects: Effect[];

	private cursor: Cursor;

	/**
	 * Creates a new terminal-typer instance.
	 * @param el - Element
	 * @param options - Options
	 */
	constructor(el: HTMLElement, options: TerminalTyperOptions) {
		this.options = TerminalTyper.createOptions(options);

		el.style.visibility = 'hidden';

		// 'g' flag to allow successive matches and keep regex state (needed for `matchAll`, `replaceAll`)
		// 'd' flag needed for `match.index`
		// 's' flag to allow modifiers to span multiple lines

		this.patterns = {
			effect:
				new RegExp(
					String.raw`(?<!\\)${escapeRegex(this.options.effects.symbols.opening)}\s*(.*?)\s*(?<!\\)${escapeRegex(this.options.effects.symbols.closing)}`,
					'gds'
				),
			effectEscape: {
				opening:
					new RegExp(
						String.raw`\\${this.options.effects.symbols.opening}`,
						'gds'
					),
				closing:
					new RegExp(
						String.raw`\\${this.options.effects.symbols.closing}`,
						'gds'
					)
			},
			effectSplit:
				// no 'g' flag!
				new RegExp(String.raw`^\s*(.*?)\s*${this.options.effects.symbols.separator}\s*(.*?)\s*$`, 'ds')
		};

		if (this.options.content)
			el.innerHTML = this.options.content;

		this.cursor = new Cursor(el, this.options.cursor);

		this.effects = this.parse(el);

		if (this.options.noLayoutShift)
			this.renderInstantly();

		el.style.visibility = '';
	}

	/**
	 * Starts the effect.
	 */
	async start() {
		this.cursor.stopBlinking();

		for (const effect of this.effects)
			await effect.apply();

		this.cursor.startBlinking();
	}

	/**
	 * Renders the resulting output of the effect instantly.
	 *
	 * - This is invoked when `noLayoutShift` is `true`.
	 */
	private renderInstantly() {
		for (const effect of this.effects)
			effect.applyInvisible();
	}

	/**
	 * Parses a node and returns an array of effects to be performed in
	 * order.
	 * @param node - Node
	 * @returns Array of effects
	 */
	private parse(node: Node): Effect[] {
		return this.getTextNodes(node)
			.flatMap((textNode) =>
				this.parseEffects(
					textNode.textContent!,
					this.createContainerEls(textNode)
				));
	}

	/**
	 * Recursively retrieves and returns all of a node's text nodes as
	 * an array.
	 * @param node - Node
	 * @returns Array of all text nodes
	 */
	private getTextNodes(node: Node): Text[] {
		return Array.from(node.childNodes)
			.flatMap((child) =>
				child.nodeType !== Node.TEXT_NODE
					? this.getTextNodes(child)
					: child.textContent === '\n'
						? []
						: child as Text);
	}

	/**
	 * Creates the visible and invisible character container elements.
	 *
	 * Replaces `textNode` with a wrapper containing the newly created
	 * containers.
	 * @param textNode - Text node
	 * @returns Character containers
	 */
	private createContainerEls(textNode: Text): CharContainers {
		const wrapper = document.createElement('span');
		wrapper.classList.add('terminal-typer__chars');

		const visible = document.createElement('span');
		visible.classList.add('visible');

		const invisible = document.createElement('span');
		invisible.classList.add('invisible');

		wrapper.append(
			visible,
			invisible
		);

		textNode.replaceWith(wrapper);

		return { visible, invisible };
	}

	/**
	 * Parses and extracts effects from a text node's content.
	 * @param text - Text node
	 * @param container - Char containers
	 * @returns Array of effects
	 */
	private parseEffects(text: string, containers: CharContainers): Effect[] {
		const effects: Effect[] = [];

		this.patterns.effect.lastIndex = 0;

		const matches = text.matchAll(
			this.patterns.effect
		);

		let lastMatchEndIndex = 0;

		for (const match of matches) {
			// get all the plain text leading up to this effect string
			const leadingText = this.sanitize(
				text.slice(lastMatchEndIndex, match.index)
			);

			const { builder, rawValue } = this.parseEffectBuilder(match[1]!);

			effects.push(
				this.options.effects.defaultBuilder.create({
					cursor: this.cursor,
					containers,
					rawValue: leadingText
				}),
				builder.create({
					cursor: this.cursor,
					containers,
					rawValue
				})
			);

			lastMatchEndIndex = match.index + match[0].length;
		}

		// get all the remaining text after the last effect string, or
		// if no effect string existed.
		const trailingText = this.sanitize(
			text.slice(lastMatchEndIndex)
		);

		effects.push(
			this.options.effects.defaultBuilder.create({
				cursor: this.cursor,
				containers,
				rawValue: trailingText
			})
		);

		return effects;
	}

	/**
	 * Sanitizes a string.
	 *
	 * Removes escape characters where necessary.
	 * @param str - String
	 * @returns Sanitized string
	 */
	private sanitize(str: string): string {
		this.patterns.effectEscape.opening.lastIndex = 0;
		this.patterns.effectEscape.closing.lastIndex = 0;

		return str
			.replaceAll(
				this.patterns.effectEscape.opening,
				this.options.effects.symbols.opening
			)
			.replaceAll(
				this.patterns.effectEscape.closing,
				this.options.effects.symbols.closing
			);
	}

	/**
	 * Parses and returns a effect builder.
	 * @param str - Unparsed effect string
	 * @returns Array with effect builder and raw value
	 */
	private parseEffectBuilder(str: string) {
		const matches = this.patterns.effectSplit.exec(str);

		const key = matches?.[1]
			?? throwExp('Terminal-typer effect string is invalid');
		const rawValue = matches?.[2]
			?? throwExp('Terminal-typer effect value is missing');

		const builder = this.options.effects.builders
			.find(
				(builder) => builder.key === key
			)
			?? throwExp(`Unrecognized terminal-typer effect '${key}'`);

		return { builder, rawValue };
	}
}
