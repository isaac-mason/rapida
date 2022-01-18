import type { BodyProps, VectorTypes } from './body';
import { Triplet } from './vec';

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

export type BodyShapeType = ShapeType | `${ShapeType}`;

export type PlaneProps = BodyProps & {
  args?: undefined;
};

export type BoxProps = BodyProps & {
  args?: Triplet;
};

export type SphereProps = BodyProps & {
  args?: number | [number];
};

export type CylinderArgs = [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number];

export type CylinderProps = BodyProps & {
  args: CylinderArgs;
};

export type ParticleProps = BodyProps & {
  args?: undefined;
};

export type TrimeshArgs = [vertices: ArrayLike<number>, indices: ArrayLike<number>];

export type TrimeshProps = BodyProps & {
  args: TrimeshArgs;
};

export type HeightfieldArgs = [
  data: number[][],
  options: { elementSize?: number; maxValue?: number; minValue?: number },
];

export type HeightfieldProps = BodyProps & {
  args: HeightfieldArgs;
};

export type ConvexPolyhedronArgs<V extends VectorTypes = VectorTypes> = [
  vertices?: V[],
  faces?: number[][],
  normals?: V[],
  axes?: V[],
  boundingSphereRadius?: number,
];

export type ConvexPolyhedronProps = BodyProps & {
  args: ConvexPolyhedronArgs;
};

export type ShapeProps =
  | BoxProps
  | SphereProps
  | PlaneProps
  | CylinderProps
  | ParticleProps
  | TrimeshProps
  | HeightfieldProps
  | ConvexPolyhedronProps
  | CompoundBodyProps;

export type CompoundShapeProps =
  | (Omit<BoxProps, 'type'> & { type: `${ShapeType.Box}` })
  | (Omit<SphereProps, 'type'> & { type: `${ShapeType.Sphere}` })
  | (Omit<PlaneProps, 'type'> & { type: `${ShapeType.Plane}` })
  | (Omit<CylinderProps, 'type'> & { type: `${ShapeType.Cylinder}` })
  | (Omit<ParticleProps, 'type'> & { type: `${ShapeType.Particle}` })
  | (Omit<TrimeshProps, 'type'> & { type: `${ShapeType.Trimesh}` })
  | (Omit<HeightfieldProps, 'type'> & { type: `${ShapeType.Heightfield}` })
  | (Omit<ConvexPolyhedronProps, 'type'> & { type: `${ShapeType.ConvexPolyhedron}` })
  | (Omit<CompoundBodyProps, 'type'> & { type: `${ShapeType.Compound}` });

export type CompoundBodyProps = BodyProps & {
  shapes: CompoundShapeProps[];
};
