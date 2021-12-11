import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type RemoveRayEvent = {
  topic: PhysicsEventTopic.REMOVE_RAY;
  uuid: string;
};

export const handleRemoveRay = (e: RemoveRayEvent, state: State): void => {
  const { uuid } = e;
  state.world.removeEventListener('preStep', state.rays[uuid]);
  delete state.rays[uuid];
};
