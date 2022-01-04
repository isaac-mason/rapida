import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type RemoveRaycastVehicleEvent = {
  topic: PhysicsEventTopic.REMOVE_RAYCAST_VEHICLE;
  uuid: string;
};

export const handleRemoveRaycastVehicle = (e: RemoveRaycastVehicleEvent, state: State): void => {
  const { uuid } = e;

  // @ts-expect-error using untyped added method
  state.world.removeEventListener('preStep', state.vehicles[uuid].preStep);

  // @ts-expect-error using untyped added method
  state.world.removeEventListener('postStep', state.vehicles[uuid].postStep);

  state.vehicles[uuid].world = null;
  delete state.vehicles[uuid];
};
