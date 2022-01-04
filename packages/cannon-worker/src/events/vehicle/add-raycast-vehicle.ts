import { RaycastVehicle, Vec3 } from 'cannon-es';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';
import { WheelInfoOptions } from '../../types';

export type AddRaycastVehicleEvent = {
  topic: PhysicsEventTopic.ADD_RAYCAST_VEHICLE;
  uuid: string;
  params: [
    string, // chassisBody
    string[], // wheels
    WheelInfoOptions[], // wheelInfos - raycast vehicles
    number | undefined, // vehicle indexRightAxis
    number | undefined, // vehicle indexForwardAxis
    number | undefined, // vehicle indexUpAxis
  ];
};

export const handleAddRaycastVehicle = (e: AddRaycastVehicleEvent, state: State): void => {
  const { uuid, params } = e;
  const [chassisBody, wheels, wheelInfos, indexForwardAxis, indexRightAxis, indexUpAxis] = params;
  const vehicle = new RaycastVehicle({
    chassisBody: state.bodies[chassisBody],
    indexForwardAxis,
    indexRightAxis,
    indexUpAxis,
  });
  vehicle.world = state.world;
  for (let i = 0; i < wheelInfos.length; i++) {
    const wheelInfo = wheelInfos[i];
    vehicle.addWheel({
      radius: wheelInfo.radius || undefined,
      directionLocal: wheelInfo.directionLocal ? new Vec3(...wheelInfo.directionLocal) : undefined,
      suspensionStiffness: wheelInfo.suspensionStiffness || undefined,
      suspensionRestLength: wheelInfo.suspensionRestLength || undefined,
      maxSuspensionForce: wheelInfo.maxSuspensionForce || undefined,
      maxSuspensionTravel: wheelInfo.maxSuspensionTravel || undefined,
      dampingRelaxation: wheelInfo.dampingRelaxation || undefined,
      dampingCompression: wheelInfo.dampingCompression || undefined,
      sideAcceleration: wheelInfo.sideAcceleration || undefined,
      frictionSlip: wheelInfo.frictionSlip || undefined,
      rollInfluence: wheelInfo.rollInfluence || undefined,
      axleLocal: wheelInfo.axleLocal ? new Vec3(...wheelInfo.axleLocal) : undefined,
      chassisConnectionPointLocal: wheelInfo.chassisConnectionPointLocal
        ? new Vec3(...wheelInfo.chassisConnectionPointLocal)
        : undefined,
      isFrontWheel: wheelInfo.isFrontWheel || undefined,
      useCustomSlidingRotationalSpeed: wheelInfo.useCustomSlidingRotationalSpeed || undefined,
      customSlidingRotationalSpeed: wheelInfo.customSlidingRotationalSpeed || undefined,
    });
  }

  // @ts-expect-error add method
  vehicle.preStep = () => {
    state.vehicles[uuid].updateVehicle(state.world.dt);
  };
  // @ts-expect-error add method
  vehicle.postStep = () => {
    for (let i = 0; i < state.vehicles[uuid].wheelInfos.length; i++) {
      state.vehicles[uuid].updateWheelTransform(i);
      const t = state.vehicles[uuid].wheelInfos[i].worldTransform;
      const wheelBody = state.bodies[wheels[i]];
      wheelBody.position.copy(t.position);
      wheelBody.quaternion.copy(t.quaternion);
    }
  };

  state.vehicles[uuid] = vehicle;

  // @ts-expect-error using untyped added method
  state.world.addEventListener('preStep', state.vehicles[uuid].preStep);

  // @ts-expect-error using untyped added method
  state.world.addEventListener('postStep', state.vehicles[uuid].postStep);
};
