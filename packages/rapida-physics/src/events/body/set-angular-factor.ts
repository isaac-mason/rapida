import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetAngularFactorEvent = {
  topic: PhysicsEventTopic.SET_ANGULAR_FACTOR;
  uuid: string;
  params: [number, number, number];
};

export const handleSetAngularFactor = (e: SetAngularFactorEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].angularFactor.set(params[0], params[1], params[2]);
};
