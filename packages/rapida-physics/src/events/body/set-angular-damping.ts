import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetAngularDampingEvent = {
  topic: PhysicsEventTopic.SET_ANGULAR_DAMPING;
  uuid: string;
  params: number;
};

export const handleSetAngularDamping = (e: SetAngularDampingEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularDamping = params;
};
