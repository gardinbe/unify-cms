import type { Cursor } from './cursor';
import type { Effect } from './effects';

/** Object of visible and invisible character containers. */
export interface CharContainers {
	visible: HTMLElement;
	invisible: HTMLElement;
}

/** A terminal-typer context for an effect. */
export interface Context {
	cursor: Cursor;
	containers: CharContainers;
	rawValue: string;
}

/** An effect builder used to create instances of effects. */
export interface EffectBuilder<TEffect extends Effect = Effect> {
	key: string;
	create(ctx: Context): TEffect;
}
