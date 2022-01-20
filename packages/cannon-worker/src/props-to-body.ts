import {
  BodyType as CannonBodyType,
  Box,
  ConvexPolyhedron,
  Cylinder,
  Heightfield,
  Material,
  Particle,
  Plane,
  Quaternion,
  Sphere,
  Trimesh,
  Vec3,
} from 'cannon-es';
import { Vector3 } from 'three';
import { Body } from './cannon';
import { BodyProps, BodyType, SerializableBodyProps } from './types/body';
import {
  BodyShapeType,
  BoxProps,
  CompoundBodyProps,
  ConvexPolyhedronArgs,
  ConvexPolyhedronProps,
  CylinderProps,
  HeightfieldProps,
  ShapeType,
  SphereProps,
  TrimeshProps,
} from './types/shapes';
import { Triplet } from './types/vec';

const makeVec3 = (v: Vector3 | Vec3 | Triplet): Vec3 => {
  if (Array.isArray(v)) {
    return new Vec3(v[0], v[1], v[2]);
  }
  if (v instanceof Vec3) {
    return v;
  }
  return new Vec3(v.x, v.y, v.z);
};

const prepareSphere = (args: number | number[]): number[] => (Array.isArray(args) ? args : [args]);

const prepareConvexPolyhedron = ([v, faces, n, a, boundingSphereRadius]: ConvexPolyhedronArgs) => [
  {
    vertices: v ? v.map(makeVec3) : undefined,
    faces,
    normals: n ? n.map(makeVec3) : undefined,
    axes: a ? a.map(makeVec3) : undefined,
    boundingSphereRadius,
  },
];

function createShape(type: BodyShapeType, props: BodyProps | SerializableBodyProps) {
  if (type === ShapeType.Box) {
    const { args } = props as BoxProps;
    return new Box(new Vec3(...(args as Triplet).map((v: number) => v / 2))); // extents => halfExtents
  }
  if (type === ShapeType.ConvexPolyhedron) {
    const { args } = props as ConvexPolyhedronProps;
    return new ConvexPolyhedron(...prepareConvexPolyhedron(args));
  }
  if (type === ShapeType.Cylinder) {
    const { args } = props as CylinderProps;
    return new Cylinder(...args);
  }
  if (type === ShapeType.Heightfield) {
    const { args } = props as HeightfieldProps;
    return new Heightfield(...args); // [ Array data, options: {minValue, maxValue, elementSize}  ] = args
  }
  if (type === ShapeType.Particle) {
    return new Particle(); // no args
  }
  if (type === ShapeType.Plane) {
    return new Plane(); // no args, infinite x and y
  }
  if (type === ShapeType.Sphere) {
    const { args } = props as SphereProps;
    return new Sphere(...(prepareSphere(args as number) as [number]));
  }
  if (type === ShapeType.Trimesh) {
    const { args } = props as TrimeshProps;
    return new Trimesh(...(args as [number[], number[]])); // [vertices, indices] = args
  }

  throw new Error('unsupported shape type');
}

/**
 * Converts parameters to a cannon body
 *
 * @param uuid a unique uuid for the body
 * @param props props for creating the body
 * @param bodyShapeType the type of body to create
 */
export const propsToBody = (
  uuid: string,
  props: BodyProps | SerializableBodyProps,
  bodyShapeType: BodyShapeType,
): Body => {
  const {
    type: bodyType,
    mass,
    material,
    collisionResponse,
    onCollide: _onCollide,
    position: _position,
    rotation: _rotation,
    velocity: _velocity,
    angularVelocity: _angularVelocity,
    linearDamping: _linearDamping,
    angularDamping: _angularDamping,
    linearFactor: _linearFactor,
    angularFactor: _angularFactor,
    ...extra
  } = props;

  const bodyTypeMap = {
    [BodyType.DYNAMIC]: Body.DYNAMIC,
    [BodyType.STATIC]: Body.STATIC,
    [BodyType.KINEMATIC]: Body.KINEMATIC,
  };

  const body: Body = new Body({
    ...extra,
    mass: bodyType === BodyType.STATIC ? 0 : mass,
    type: bodyType ? (bodyTypeMap[bodyType] as CannonBodyType) : undefined,
    material: material ? new Material(material) : undefined,
  });
  body.uuid = uuid;

  if (collisionResponse !== undefined) {
    // transform number (0 | 1) to boolean
    body.collisionResponse = Boolean(collisionResponse);
  }

  const initPosition = props.position || [0, 0, 0];
  const initRotation = props.rotation || [0, 0, 0];
  const initVelocity = props.velocity || [0, 0, 0];
  const initAngularVelocity = props.angularVelocity || [0, 0, 0];
  const initLinearFactor = props.linearFactor || [1, 1, 1];
  const initAngularFactor = props.angularFactor || [1, 1, 1];

  if (bodyShapeType === ShapeType.Compound) {
    const { shapes } = props as CompoundBodyProps;
    shapes.forEach((shape) => {
      const {
        type: shapeType,
        position: shapePosition,
        rotation: shapeRotation,
        material: shapeMaterial,
        ...shapeExtra
      } = shape;
      const shapeBody = body.addShape(
        createShape(shapeType, {
          ...shape,
          type: bodyType || undefined,
        }),
        shapePosition ? new Vec3(...shapePosition) : undefined,
        shapeRotation ? new Quaternion().setFromEuler(...shapeRotation) : undefined,
      );

      if (shapeMaterial) {
        shapeBody.material = new Material(shapeMaterial);
      }

      Object.assign(shapeBody, shapeExtra);
    });
  } else {
    body.addShape(createShape(bodyShapeType, props));
  }

  body.position.set(initPosition[0], initPosition[1], initPosition[2]);
  body.quaternion.setFromEuler(initRotation[0], initRotation[1], initRotation[2]);
  body.velocity.set(initVelocity[0], initVelocity[1], initVelocity[2]);
  body.angularVelocity.set(initAngularVelocity[0], initAngularVelocity[1], initAngularVelocity[2]);
  body.linearFactor.set(initLinearFactor[0], initLinearFactor[1], initLinearFactor[2]);
  body.angularFactor.set(initAngularFactor[0], initAngularFactor[1], initAngularFactor[2]);

  return body;
};
