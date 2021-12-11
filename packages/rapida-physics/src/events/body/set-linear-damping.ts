import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetLinearDampingEvent = {
  topic: PhysicsEventTopic.SET_LINEAR_DAMPING;
  uuid: string;
  params: number;
};

export const handleSetLinearDamping = (e: SetLinearDampingEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].linearDamping = params;
};
