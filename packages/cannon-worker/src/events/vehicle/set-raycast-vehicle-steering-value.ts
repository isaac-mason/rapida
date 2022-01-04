import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetRaycastVehicleSteeringValueEvent = {
  topic: PhysicsEventTopic.SET_RAYCAST_VEHICLE_STEERING_VALUE;
  uuid: string;
  params: [number, number];
};

export const handleSetRaycastVehicleSteeringValue = (
  e: SetRaycastVehicleSteeringValueEvent,
  state: State,
): void => {
  const { uuid, params } = e;
  const [value, wheelIndex] = params;
  state.vehicles[uuid].setSteeringValue(value, wheelIndex);
};
