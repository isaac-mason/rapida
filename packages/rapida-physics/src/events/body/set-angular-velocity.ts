import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetAngularVelocityEvent = {
  topic: PhysicsEventTopic.SET_ANGULAR_VELOCITY;
  uuid: string;
  params: [number, number, number];
};

export const handleSetAngularVelocity = (e: SetAngularVelocityEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularVelocity.set(params[0], params[1], params[2]);
};
