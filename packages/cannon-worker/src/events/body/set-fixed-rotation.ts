import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetFixedRotationEvent = {
  topic: PhysicsEventTopic.SET_FIXED_ROTATION;
  uuid: string;
  params: boolean;
};

export const handleSetFixedRotation = (e: SetFixedRotationEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].fixedRotation = params;
};
