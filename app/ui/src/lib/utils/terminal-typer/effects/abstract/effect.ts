import type { Cursor } from '../../cursor';
import type { CharContainers } from '../../types';
import { delay, randomDelay } from '~/lib/utils';

/** An effect interval duration and style. */
export type EffectInterval = {
	variance: 'constant';
	value: number;
} | {
	variance: 'random';
	min: number;
	max: number;
};

/** Context for an effect. */
export interface EffectContext {
	/** Visible and invisible character containers. */
	containers: CharContainers;
	/** Current cursor instance. */
	cursor: Cursor;
}

/**
 * A terminal-typer effect that performs an operation to a string.
 */
export abstract class Effect<TEffectContext extends EffectContext = EffectContext> {
	/**
	 * Applies an interval delay.
	 * @param interval - Target interval
	 */
	protected static async interval(interval: EffectInterval) {
		switch (interval.variance) {
			case 'constant':
				return delay(interval.value);
			case 'random':
				return randomDelay(interval.min, interval.max);
		}
	}

	/**
	 * Creates a new terminal-typer effect instance.
	 * @param ctx - Effect context
	 */
	constructor(
		protected readonly ctx: TEffectContext
	) { }

	/**
	 * Applies the effect.
	 */
	abstract apply(): void | Promise<void>;

	/**
	 * Applies the effect instantly to only the invisible chars container.
	 */
	abstract applyInvisible(): void;
}
