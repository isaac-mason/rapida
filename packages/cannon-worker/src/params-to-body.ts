import {
  Body,
  BodyWithId,
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
import type { BodyParams, BodyShapeType, CompoundBodyParams, SerializableBodyParams } from './types';

const makeVec3 = ([x, y, z]: [number, number, number]) => new Vec3(x, y, z);

const prepareSphere = (args: number | number[]): number[] => (Array.isArray(args) ? args : [args]);

// @ts-expect-error TODO: types
const prepareConvexPolyhedron = ([v, faces, n, a, boundingSphereRadius]) => [
  {
    vertices: v ? v.map(makeVec3) : undefined,
    faces,
    normals: n ? n.map(makeVec3) : undefined,
    axes: a ? a.map(makeVec3) : undefined,
    boundingSphereRadius,
  },
];

function createShape(type: BodyShapeType, args: any) {
  switch (type) {
    case 'Box':
      return new Box(new Vec3(...args.map((v: number) => v / 2))); // extents => halfExtents
    case 'ConvexPolyhedron':
      return new ConvexPolyhedron(...prepareConvexPolyhedron(args));
    case 'Cylinder':
      return new Cylinder(...args);
    case 'Heightfield':
      // @ts-expect-error TODO: type
      return new Heightfield(...args); // [ Array data, options: {minValue, maxValue, elementSize}  ] = args
    case 'Particle':
      return new Particle(); // no args
    case 'Plane':
      return new Plane(); // no args, infinite x and y
    case 'Sphere':
      return new Sphere(...(prepareSphere(args) as [number]));
    case 'Trimesh':
      return new Trimesh(...(args as [number[], number[]])); // [vertices, indices] = args
    default:
      throw new Error('unsupported shape type');
  }
}

/**
 * Creates a new body from params
 * @param uuid the unique uuid for the body
 * @param params params that describe the body
 * @param type the body type
 * @return {module:objects/Body.Body}
 */
export const paramsToBody = (
  uuid: string,
  params: BodyParams<unknown> | SerializableBodyParams,
  type: BodyShapeType,
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
  } = params;

  const args = params.args || [];

  const body: BodyWithId = new Body({
    ...extra,
    mass: bodyType === 'Static' ? 0 : mass,
    // @ts-expect-error accessing static property by string name
    type: bodyType ? Body[bodyType.toUpperCase()] : undefined,
    material: material ? new Material(material) : undefined,
  }) as BodyWithId;
  body.uuid = uuid;

  if (collisionResponse !== undefined) {
    // transform number (0 | 1) to boolean
    body.collisionResponse = Boolean(collisionResponse);
  }

  const initPosition = params.position || [0, 0, 0];
  const initRotation = params.rotation || [0, 0, 0];
  const initVelocity = params.velocity || [0, 0, 0];
  const initAngularVelocity = params.angularVelocity || [0, 0, 0];
  const initLinearFactor = params.linearFactor || [1, 1, 1];
  const initAngularFactor = params.angularFactor || [1, 1, 1];

  if (type === 'Compound') {
    const { shapes } = params as CompoundBodyParams;
    // @ts-expect-error TODO: fix shadowed var names and spread warning
    // eslint-disable-next-line @typescript-eslint/no-shadow
    shapes.forEach(({ type, args, position, rotation, material, ...extra }) => {
      const shapeBody = body.addShape(
        createShape(type, args),
        position ? new Vec3(...initPosition) : undefined,
        rotation ? new Quaternion().setFromEuler(...initRotation) : undefined,
      );
      if (material) shapeBody.material = new Material(material);
      Object.assign(shapeBody, extra);
    });
  } else {
    body.addShape(createShape(type, args));
  }

  body.position.set(initPosition[0], initPosition[1], initPosition[2]);
  body.quaternion.setFromEuler(initRotation[0], initRotation[1], initRotation[2]);
  body.velocity.set(initVelocity[0], initVelocity[1], initVelocity[2]);
  body.angularVelocity.set(initAngularVelocity[0], initAngularVelocity[1], initAngularVelocity[2]);
  body.linearFactor.set(initLinearFactor[0], initLinearFactor[1], initLinearFactor[2]);
  body.angularFactor.set(initAngularFactor[0], initAngularFactor[1], initAngularFactor[2]);

  return body;
};
