import { Quaternion as CQuaternion, Vec3 } from 'cannon-es';
import { BodyParams, ShapeType } from '../types';

/**
 * Shape type options for three to cannon conversion
 */
export enum ThreeToCannonShapeType {
  /**
   * Creates a box, or a bounding box around the shape
   */
  BOX = 'Box',
  /**
   * Creates a cylinder, or a bounding cylinder around the shape
   */
  CYLINDER = 'Cylinder',
  /**
   * Creates a sphere, or a bounding sphere around the shape
   */
  SPHERE = 'Sphere',
  /**
   * Creates a convex polyhedron, or computes a hull for the shape
   */
  HULL = 'ConvexPolyhedron',
  /**
   * Creates a trimesh for the shape
   */
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
