import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetGravityEvent = {
  topic: PhysicsEventTopic.SET_GRAVITY;
  params: [number, number, number];
};

export const handleSetGravity = (e: SetGravityEvent, state: State): void => {
  const { params } = e;
  state.world.gravity.set(params[0], params[1], params[2]);
};
