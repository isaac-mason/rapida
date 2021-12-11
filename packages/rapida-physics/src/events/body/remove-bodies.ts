import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';
import { syncBodies } from '../sync-bodies';

export type RemoveBodiesEvent = {
  topic: PhysicsEventTopic.REMOVE_BODIES;
  uuid: string;
};

export const handleRemoveBodies = (e: RemoveBodiesEvent, state: State): void => {
  const { uuid } = e;
  for (let i = 0; i < uuid.length; i++) state.world.removeBody(state.bodies[uuid[i]]);
  syncBodies(state);
};
