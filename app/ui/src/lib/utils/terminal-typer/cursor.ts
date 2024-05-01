import type { DeepRequired } from 'ts-essentials';
import { mergeShallowRight } from '~/lib/utils';

export interface CursorOptions {
	/**
	 * Symbol used for the cursor.
	 *
	 * ### Suggested values
	 *
	 * *Some of these may not be consistent across all fonts and browsers
	 * and devices!*
	 *
	 * - ▏ Left One-Eighth Block
	 * - ▎ Left One-Quarter Block
	 * - ▍ Left Three-Eighths Block
	 * - ▌ Left Half Block
	 * - ▋ Left Five-Eighths Block
	 * - ▊ Left Three-Quarters Block
	 * - ▉ Left Seven-Eighths Block
	 * - ▁ Lower One-Eighth Block
	 * - ▂ Lower One-Quarter Block
	 * - ▃ Lower Three-Eighths Block
	 * - ▄ Lower Half Block
	 * - █ Full Block
	 * - _ Low Line (underscore)
	 * - | Vertical Line (pipe)
	 * - ▮ Black Vertical Rectangle - **not great on mobile**
	 * - ■ Black Square
	 * - □ White Square
	 * - ● Black Circle
	 * - ○ White Circle
	 * - ◆ Black Diamond
	 * - ◇ White Diamond
	 * - ❖ Black Diamond Minus White X
	 * - ☚ Black Left-Pointing Index
	 * - \< Less-Than Sign
	 * - \> Greater-Than Sign
	 * - ◁ White Left-Pointing Triangle
	 * - ▷ White Right-Pointing Triangle
	 * - ‹ Single Left-Pointing Angle Quotation Mark
	 * - › Single Right-Pointing Angle Quotation Mark
	 * @defaultValue
	 * ```typescript
	 *	"|" //Vertical Line (pipe)
	 * ```
	 */
	symbol?: string;
	/**
	 * Whether or not the cursor should dynamically adjust it's size, depending
	 * on the computed font-size of the active element.
	 * @defaultValue
	 * ```typescript
	 *	true
	 * ```
	 */
	dynamicSize?: boolean;
}

/**
 * A cursor element with methods to perform actions to it.
 */
export class Cursor {
	static createOptions(options?: CursorOptions): DeepRequired<CursorOptions> {
		return mergeShallowRight(
			{
				symbol: '|',
				dynamicSize: true
			},
			options
		);
	}

	private readonly options: DeepRequired<CursorOptions>;

	private readonly wrapperEl: HTMLElement;

	private readonly el: HTMLElement;

	private readonly resizeObserver: ResizeObserver;

	private activeEl: HTMLElement | null = null;

	/**
	 * Creates a new terminal-typer cursor instance.
	 * @param el - Target element to wrap with the cursor
	 * @param options - Options
	 */
	constructor(el: HTMLElement, options: CursorOptions) {
		this.options = Cursor.createOptions(options);

		this.el = this.createCursorEl();

		this.wrapperEl = this.createWrapperEl(
			el,
			this.el
		);

		this.resizeObserver = new ResizeObserver(() => {
			if (this.activeEl)
				this.moveTo(this.activeEl);
		});

		this.resizeObserver.observe(el);
	}

	/**
	 * Starts blinking the cursor.
	 */
	startBlinking() {
		this.el.dataset.blinking = 'true';
	}

	/**
	 * Stops blinking the cursor.
	 */
	stopBlinking() {
		this.el.dataset.blinking = 'false';
	}

	/**
	 * Positions the cursor next to the target element.
	 * @param el - Target element
	 */
	moveTo(el: HTMLElement) {
		this.activeEl = el;

		const wrapperRect = this.wrapperEl.getBoundingClientRect();
		const rect = el.getBoundingClientRect();

		const top = rect.bottom - rect.height / 2 - wrapperRect.top;
		const left = rect.right - wrapperRect.left;

		this.el.style.top = `${top}px`;
		this.el.style.left = `${left}px`;

		if (this.options.dynamicSize)
			this.el.style.fontSize = getComputedStyle(el).fontSize;
	}

	private createCursorEl() {
		const el = document.createElement('div');
		el.classList.add('terminal-typer__cursor');
		el.dataset.blinking = 'false';
		el.textContent = this.options.symbol;
		return el;
	}

	private createWrapperEl(el: HTMLElement, cursorEl: HTMLElement): HTMLElement {
		const wrapper = document.createElement('div');
		wrapper.classList.add('terminal-typer__wrapper');

		el.replaceWith(wrapper);
		wrapper.append(el, cursorEl);

		return wrapper;
	}
}
