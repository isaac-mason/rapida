import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetIterationsEvent = {
  topic: PhysicsEventTopic.SET_ITERATIONS;
  params: number;
};

export const handleSetIterations = (e: SetIterationsEvent, state: State): void => {
  const { params } = e;
  // @ts-expect-error accessing private property
  state.world.solver.iterations = params;
};
