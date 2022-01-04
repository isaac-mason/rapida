import { BodyWithId } from 'cannon-es';
import { State } from '../state';

export function syncBodies(state: State): void {
  state.bodiesNeedSyncing = true;
  state.bodies = (state.world.bodies as BodyWithId[]).reduce(
    (acc, body) => ({
      ...acc,
      [body.uuid]: body,
    }),
    {},
  );
}
