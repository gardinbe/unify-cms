import type { EffectBuilder } from '../types';
import type { EffectContext, EffectInterval } from './abstract';
import { Effect } from './abstract';

interface InsertEffectContext extends EffectContext {
	text: string;
	interval: EffectInterval;
}

export class InsertEffect extends Effect<InsertEffectContext> {
	static builder(interval: EffectInterval): EffectBuilder<InsertEffect> {
		return {
			key: 'insert',
			create: (ctx) =>
				new InsertEffect({
					containers: ctx.containers,
					cursor: ctx.cursor,
					text: ctx.rawValue,
					interval
				})
		};
	}

	async apply() {
		const { visible, invisible } = this.ctx.containers;

		this.removePlaceholder(visible);

		const insertChar = (charEl: HTMLElement) => {
			// must remove first: even if for a split-second, the insertion of a
			// character can extend a word, causing it to wrap at the end of a line,
			// fucking up the position of the cursor.

			invisible.firstChild?.remove();
			visible.append(charEl);
			this.ctx.cursor.moveTo(charEl);
		};

		const charEls = this.createCharEls(this.ctx.text);

		for (const charEl of charEls) {
			insertChar(charEl);
			await Effect.interval(this.ctx.interval);
		}
	}

	applyInvisible() {
		const { invisible } = this.ctx.containers;

		this.removePlaceholder(invisible);

		invisible.append(
			...this.createCharEls(this.ctx.text)
		);
	}

	private removePlaceholder(container: HTMLElement) {
		if (
			container.lastChild
			&& (container.lastChild as HTMLElement).classList.contains('placeholder')
		)
			container.lastChild.remove();
	}

	private createCharEls(text: string): HTMLElement[] {
		return [...text]
			.map(this.createCharEl.bind(this));
	}

	private createCharEl(char: string): HTMLElement {
		const wrapper = document.createElement('span');
		wrapper.textContent = char;
		return wrapper;
	}
}
