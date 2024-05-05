import { delay } from '~/lib/utils/delay';

import type { EffectBuilder } from '../types';
import { strToFloat } from '../utils';
import type { EffectContext } from './abstract';
import { Effect } from './abstract';

interface WaitEffectContext extends EffectContext {
	/** Delay duration in seconds. */
	duration: number;
}

export class WaitEffect extends Effect<WaitEffectContext> {
	static builder(): EffectBuilder<WaitEffect> {
		return {
			key: 'wait',
			create: (ctx) =>
				new WaitEffect({
					containers: ctx.containers,
					cursor: ctx.cursor,
					duration: strToFloat(ctx.rawValue)
				})
		};
	}

	async apply() {
		this.ctx.cursor.startBlinking();
		await delay(this.ctx.duration * 1000);
		this.ctx.cursor.stopBlinking();
	}

	applyInvisible() { }
}
