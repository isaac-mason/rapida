import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type ApplyRaycastVehicleEngineForceEvent = {
  topic: PhysicsEventTopic.APPLY_RAYCAST_VEHICLE_ENGINE_FORCE;
  uuid: string;
  params: [number, number];
};

export const handleApplyRaycastVehicleEngineForce = (
  e: ApplyRaycastVehicleEngineForceEvent,
  state: State,
): void => {
  const { uuid, params } = e;
  const [value, wheelIndex] = params;
  state.vehicles[uuid].applyEngineForce(value, wheelIndex);
};
