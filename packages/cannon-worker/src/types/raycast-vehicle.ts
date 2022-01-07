import { Object3D } from 'three';
import { Triplet } from './atomic';

export interface WheelInfoOptions {
  radius?: number;
  directionLocal?: Triplet;
  suspensionStiffness?: number;
  suspensionRestLength?: number;
  maxSuspensionForce?: number;
  maxSuspensionTravel?: number;
  dampingRelaxation?: number;
  dampingCompression?: number;
  sideAcceleration?: number;
  frictionSlip?: number;
  rollInfluence?: number;
  axleLocal?: Triplet;
  chassisConnectionPointLocal?: Triplet;
  isFrontWheel?: boolean;
  useCustomSlidingRotationalSpeed?: boolean;
  customSlidingRotationalSpeed?: number;
}

export interface RaycastVehicleParams {
  chassisBody: Object3D;
  wheels: Object3D[];
  wheelInfos: WheelInfoOptions[];
  indexForwardAxis?: number;
  indexRightAxis?: number;
  indexUpAxis?: number;
}
