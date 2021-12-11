import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetCollisionResponseEvent = {
  topic: PhysicsEventTopic.SET_COLLISION_RESPONSE;
  uuid: string;
  params: boolean;
};

export const handleSetCollisionResponse = (e: SetCollisionResponseEvent, state: State): void => {
  const { uuid, params } = e;
  state.bodies[uuid].collisionResponse = params;
};
