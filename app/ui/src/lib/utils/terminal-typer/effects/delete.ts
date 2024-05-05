import { delay } from '~/lib/utils';

import type { EffectBuilder } from '../types';
import { strToInt } from '../utils';
import type { EffectContext, EffectInterval } from './abstract';
import { Effect } from './abstract';

export type DeleteEffectInterval = EffectInterval & {
	/** Delay duration after the first character deletion. */
	afterFirstChar?: number | null;
};

interface DeleteEffectContext extends EffectContext {
	/** Quantity of characters to delete. */
	quantity: number | 'nodeContent';
	interval: DeleteEffectInterval;
}

export class DeleteEffect extends Effect<DeleteEffectContext> {
	static builder(interval: DeleteEffectInterval): EffectBuilder<DeleteEffect> {
		return {
			key: 'delete',
			create: (ctx) =>
				new DeleteEffect({
					containers: ctx.containers,
					cursor: ctx.cursor,
					quantity: ctx.rawValue === 'nodeContent'
						? ctx.rawValue
						: strToInt(ctx.rawValue),
					interval
				})
		};
	}

	// TODO: currently, the main limitation is that its very annoying to
	// be able to climb up the dom tree and delete characters from previous
	// character containers... would need to keep track of all active
	// containers... cannot be bothered !
	// for now, just being able to work with the current containers is fine.

	async apply() {
		const { visible } = this.ctx.containers;

		let remaining = this.remaining(visible);

		const removeChar = () => {
			this.removeLastChild(visible);
			this.ctx.cursor.moveTo(visible.lastChild as HTMLElement);
			remaining--;
		};

		if (
			this.ctx.interval.afterFirstChar
			&& visible.lastChild
			&& remaining > 0
		) {
			removeChar();
			await delay(this.ctx.interval.afterFirstChar);
		}

		while (
			visible.lastChild
			&& remaining > 0
		) {
			removeChar();
			await Effect.interval(this.ctx.interval);
		}
	}

	applyInvisible() {
		const { invisible } = this.ctx.containers;

		let remaining = this.remaining(invisible);

		while (
			invisible.lastChild
			&& remaining > 0
		) {
			this.removeLastChild(invisible);
			remaining--;
		}
	}

	private remaining(container: HTMLElement): number {
		return this.ctx.quantity === 'nodeContent'
			? container.childNodes.length
			: this.ctx.quantity;
	}

	private removeLastChild(container: HTMLElement) {
		// zero-width-space placeholder hack to keep empty spans with atleast
		// one character, as otherwise empty spans will collapse their height.

		if (container.firstChild === container.lastChild)
			this.addPlaceholder(container);

		container.lastChild?.remove();
	}

	private addPlaceholder(container: HTMLElement) {
		const placeholderEl = document.createElement('span');
		placeholderEl.classList.add('placeholder');
		placeholderEl.innerHTML = '&#8203;';
		container.prepend(placeholderEl);
	}
}
