import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetQuaternionEvent = {
  topic: PhysicsEventTopic;
  uuid: string;
  params: [number, number, number];
};

export const handleSetQuaternion = (e: SetQuaternionEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].quaternion.setFromEuler(params[0], params[1], params[2]);
};
