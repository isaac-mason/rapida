import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type SetRaycastVehicleBrakeEvent = {
  topic: PhysicsEventTopic.SET_RAYCAST_VEHICLE_BRAKE;
  uuid: string;
  params: [number, number];
};

export const handleSetRaycastVehicleBrake = (e: SetRaycastVehicleBrakeEvent, state: State): void => {
  const { uuid, params } = e;
  const [brake, wheelIndex] = params;
  state.vehicles[uuid].setBrake(brake, wheelIndex);
};
