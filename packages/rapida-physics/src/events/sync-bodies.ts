import { State } from '../state';

export function syncBodies(state: State): void {
  state.bodiesNeedSyncing = true;
  state.bodies = state.world.bodies.reduce(
    (acc, body) => ({
      ...acc,
      // @ts-expect-error using added untyped uuid
      [body.uuid]: body,
    }),
    {},
  );
}
