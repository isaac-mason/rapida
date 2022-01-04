import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetAxisIndexEvent = {
  topic: PhysicsEventTopic.SET_AXIS_INDEX;
  params: 0 | 1 | 2;
};

export const handleSetAxisIndex = (e: SetAxisIndexEvent, state: State): void => {
  const { params } = e;

  // @ts-expect-error accessing private property
  state.world.broadphase.axisIndex = params === undefined || params === null ? 0 : params;
};
