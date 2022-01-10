import { AtomicParams, VectorParams, VectorTypes, Triplet } from './atomic';
import { CollideEvent, CollideBeginEvent, CollideEndEvent } from './types';

export enum BodyType {
  DYNAMIC = 'Dynamic',
  STATIC = 'Static',
  KINEMATIC = 'Kinematic',
}

export type BodyParams<T = unknown> = Partial<AtomicParams> &
  Partial<VectorParams> & {
    args?: T;
    type?: BodyType;
    onCollide?: (e: CollideEvent) => void;
    onCollideBegin?: (e: CollideBeginEvent) => void;
    onCollideEnd?: (e: CollideEndEvent) => void;
  };

export type BodyParamsArgsRequired<T = unknown> = BodyParams<T> & {
  args: T;
};

export enum ShapeType {
  Plane = 'Plane',
  Box = 'Box',
  Cylinder = 'Cylinder',
  Heightfield = 'Heightfield',
  Particle = 'Particle',
  Sphere = 'Sphere',
  Trimesh = 'Trimesh',
  ConvexPolyhedron = 'ConvexPolyhedron',
  Compound = 'Compound',
}

export type ShapeTypeString = `${ShapeType}`;

export type BodyShapeType = ShapeTypeString | 'Compound';

export type CylinderArgs = [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number];

export type TrimeshArgs = [vertices: ArrayLike<number>, indices: ArrayLike<number>];

export type HeightfieldArgs = [
  data: number[][],
  options: { elementSize?: number; maxValue?: number; minValue?: number },
];

export type ConvexPolyhedronArgs<V extends VectorTypes = VectorTypes> = [
  vertices?: V[],
  faces?: number[][],
  normals?: V[],
  axes?: V[],
  boundingSphereRadius?: number,
];

export type PlaneParams = BodyParams;

export type BoxParams = BodyParams<Triplet>;

export type CylinderParams = BodyParams<CylinderArgs>;

export type ParticleParams = BodyParams;

export type SphereParams = BodyParams<number>;

export type TrimeshParams = BodyParamsArgsRequired<TrimeshArgs>;

export type HeightfieldParams = BodyParamsArgsRequired<HeightfieldArgs>;

export type ConvexPolyhedronParams = BodyParams<ConvexPolyhedronArgs>;

export interface CompoundBodyParams extends BodyParams<unknown> {
  shapes: (Omit<BodyParams, `type`> & { type: ShapeType | ShapeTypeString })[];
}
