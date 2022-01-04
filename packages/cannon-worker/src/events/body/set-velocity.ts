import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetVelocityEvent = {
  topic: PhysicsEventTopic.SET_VELOCITY;
  uuid: string;
  params: [number, number, number];
};

export const handleSetVelocity = (e: SetVelocityEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].velocity.set(params[0], params[1], params[2]);
};
