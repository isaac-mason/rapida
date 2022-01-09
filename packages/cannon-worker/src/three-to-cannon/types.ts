/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Quaternion as CQuaternion, Vec3 } from 'cannon-es';
import { BodyParams, ShapeType } from '../types';

export enum ThreeToCannonShapeType {
  BOX = 'Box',
  CYLINDER = 'Cylinder',
  SPHERE = 'Sphere',
  HULL = 'ConvexPolyhedron',
  MESH = 'Trimesh',
}

export interface ThreeToCannonShapeOptions {
  type?: ThreeToCannonShapeType;
  cylinderAxis?: 'x' | 'y' | 'z';
  sphereRadius?: number;
}

export interface ThreeToCannonShapeResult<T extends BodyParams = BodyParams> {
  params: T;
  type: ShapeType;
  offset?: Vec3;
  orientation?: CQuaternion;
}
