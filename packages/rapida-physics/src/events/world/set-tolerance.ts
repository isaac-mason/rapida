import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetToleranceEvent = {
  topic: PhysicsEventTopic.SET_TOLERANCE;
  params: number;
};

export const handleSetTolerance = (e: SetToleranceEvent, state: State): void => {
  const { params } = e;
  // @ts-expect-error accessing private property
  state.world.solver.tolerance = params;
};
