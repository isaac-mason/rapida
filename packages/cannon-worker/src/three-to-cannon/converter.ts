/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Quaternion as CQuaternion, Vec3 } from 'cannon-es';
import {
  Box3,
  BufferGeometry,
  CylinderGeometry,
  MathUtils,
  Mesh,
  Object3D,
  SphereGeometry,
  Vector3,
} from 'three';
import {
  BoxProps,
  ConvexPolyhedronProps,
  CylinderProps,
  ShapeType,
  SphereProps,
  TrimeshProps,
  Triplet,
} from '../types';
import { ConvexHull } from './convex-hull';
import { ThreeToCannonShapeOptions, ThreeToCannonShapeResult, ThreeToCannonShapeType } from './types';
import { getComponent, getGeometry, getVertices } from './utils.js';

const PI_2 = Math.PI / 2;

const createBoxShape = (geometry: BufferGeometry): ThreeToCannonShapeResult | null => {
  const vertices = getVertices(geometry);

  if (!vertices.length) return null;

  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;

  const params = {
    args: [(box.max.x - box.min.x) / 2, (box.max.y - box.min.y) / 2, (box.max.z - box.min.z) / 2],
  } as BoxProps;

  return {
    params,
    type: ShapeType.Box,
  };
};

/** Bounding box needs to be computed with the entire subtree, not just geometry. */
const createBoundingBoxShape = (object: Object3D): ThreeToCannonShapeResult | null => {
  const clone = object.clone();
  clone.quaternion.set(0, 0, 0, 1);
  clone.updateMatrixWorld();

  const box = new Box3().setFromObject(clone);

  if (!isFinite(box.min.lengthSq())) return null;

  const localPosition = box.translate(clone.position.negate()).getCenter(new Vector3());

  const params = {
    args: [box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z],
  } as BoxProps;

  const offset = localPosition.lengthSq()
    ? new Vec3(localPosition.x, localPosition.y, localPosition.z)
    : undefined;

  return {
    params,
    type: ShapeType.Box,
    offset,
  };
};

/** Computes 3D convex hull as a CANNON.ConvexPolyhedron. */
const createConvexPolyhedron = (object: Object3D): ThreeToCannonShapeResult | null => {
  const geometry = getGeometry(object);

  if (!geometry) return null;

  // Perturb.
  const eps = 1e-4;
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    geometry.attributes.position.setXYZ(
      i,
      geometry.attributes.position.getX(i) + (Math.random() - 0.5) * eps,
      geometry.attributes.position.getY(i) + (Math.random() - 0.5) * eps,
      geometry.attributes.position.getZ(i) + (Math.random() - 0.5) * eps,
    );
  }

  // Compute the 3D convex hull
  const hull = new ConvexHull().setFromObject(new Mesh(geometry));
  const hullFaces = hull.faces;
  const vertices: Triplet[] = [];
  const faces: number[][] = [];

  for (let i = 0; i < hullFaces.length; i++) {
    const hullFace = hullFaces[i];
    const face: number[] = [];
    faces.push(face);

    let { edge } = hullFace;
    do {
      const { point } = edge.head();
      vertices.push([point.x, point.y, point.z]);
      face.push(vertices.length - 1);
      edge = edge.next;
    } while (edge !== hullFace.edge);
  }

  const params = {
    args: [vertices, faces, []],
  } as ConvexPolyhedronProps;

  return { params, type: ShapeType.ConvexPolyhedron };
};

function createCylinderShape(geometry: CylinderGeometry): ThreeToCannonShapeResult | null {
  const { parameters } = geometry;

  const params = {
    args: [parameters.radiusTop, parameters.radiusBottom, parameters.height, parameters.radialSegments],
  } as CylinderProps;

  return {
    params,
    type: ShapeType.Cylinder,
    orientation: new CQuaternion().setFromEuler(MathUtils.degToRad(-90), 0, 0, 'XYZ').normalize(),
  };
}

const createBoundingCylinderShape = (
  object: Object3D,
  options: ThreeToCannonShapeOptions,
): ThreeToCannonShapeResult | null => {
  const axes = ['x', 'y', 'z'];
  const majorAxis = options.cylinderAxis || 'y';
  const minorAxes = axes.splice(axes.indexOf(majorAxis), 1) && axes;
  const box = new Box3().setFromObject(object);

  if (!isFinite(box.min.lengthSq())) return null;

  // Compute cylinder dimensions.
  const height = box.max[majorAxis] - box.min[majorAxis];
  const radius =
    0.5 *
    Math.max(
      getComponent(box.max, minorAxes[0]) - getComponent(box.min, minorAxes[0]),
      getComponent(box.max, minorAxes[1]) - getComponent(box.min, minorAxes[1]),
    );

  // Create shape.
  const params = {
    args: [radius, radius, height, 12],
  } as CylinderProps;

  const eulerX = majorAxis === 'y' ? PI_2 : 0;
  const eulerY = majorAxis === 'z' ? PI_2 : 0;

  return {
    params,
    type: ShapeType.Cylinder,
    orientation: new CQuaternion().setFromEuler(eulerX, eulerY, 0, 'XYZ').normalize(),
  };
};

const createPlaneShape = (geometry: BufferGeometry): ThreeToCannonShapeResult | null => {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;

  const params = {
    args: [
      (box.max.x - box.min.x) / 2 || 0.1,
      (box.max.y - box.min.y) / 2 || 0.1,
      (box.max.z - box.min.z) / 2 || 0.1,
    ],
  } as BoxProps;

  return { params, type: ShapeType.Box };
};

const createSphereShape = (geometry: SphereGeometry): ThreeToCannonShapeResult | null => {
  return {
    params: {
      args: geometry.parameters.radius,
    } as SphereProps,
    type: ShapeType.Sphere,
  };
};

const createBoundingSphereShape = (
  object: Object3D,
  options: ThreeToCannonShapeOptions,
): ThreeToCannonShapeResult | null => {
  if (options.sphereRadius) {
    return {
      params: {
        args: options.sphereRadius,
      } as SphereProps,
      type: ShapeType.Sphere,
    };
  }
  const geometry = getGeometry(object);
  if (!geometry) return null;
  geometry.computeBoundingSphere();
  return {
    params: {
      args: geometry.boundingSphere!.radius,
    } as SphereProps,
    type: ShapeType.Sphere,
  };
};

const createTrimeshShape = (geometry: BufferGeometry): ThreeToCannonShapeResult | null => {
  const vertices = getVertices(geometry);

  if (!vertices.length) return null;

  const indices = Object.keys(vertices).map(Number);

  const params = {
    args: [vertices as unknown as number[], indices],
  } as TrimeshProps;

  return { params, type: ShapeType.Trimesh };
};

/**
 * Given a THREE.Object3D instance, creates corresponding cannon body params
 * @param object the three object to convert
 * @param options optional options for the conversion
 * @returns the conversion result, including the result shape type and the params for the shape
 */
export const threeToCannon = (
  object: Object3D,
  options: ThreeToCannonShapeOptions = {},
): ThreeToCannonShapeResult | null => {
  let geometry: BufferGeometry | null;

  if (options.type === ThreeToCannonShapeType.BOX) {
    return createBoundingBoxShape(object);
  }
  if (options.type === ThreeToCannonShapeType.CYLINDER) {
    return createBoundingCylinderShape(object, options);
  }
  if (options.type === ThreeToCannonShapeType.SPHERE) {
    return createBoundingSphereShape(object, options);
  }
  if (options.type === ThreeToCannonShapeType.HULL) {
    return createConvexPolyhedron(object);
  }
  if (options.type === ThreeToCannonShapeType.MESH) {
    geometry = getGeometry(object);
    return geometry ? createTrimeshShape(geometry) : null;
  }
  if (options.type) {
    throw new Error(`[CANNON.threeToCannon] Invalid type "${options.type}".`);
  }

  geometry = getGeometry(object);
  if (!geometry) return null;

  switch (geometry.type) {
    case 'BoxGeometry':
    case 'BoxBufferGeometry':
      return createBoxShape(geometry);
    case 'CylinderGeometry':
    case 'CylinderBufferGeometry':
      return createCylinderShape(geometry as CylinderGeometry);
    case 'PlaneGeometry':
    case 'PlaneBufferGeometry':
      return createPlaneShape(geometry);
    case 'SphereGeometry':
    case 'SphereBufferGeometry':
      return createSphereShape(geometry as SphereGeometry);
    case 'TubeGeometry':
    case 'BufferGeometry':
      return createBoundingBoxShape(object);
    default:
      // eslint-disable-next-line no-console
      console.warn('Unrecognized geometry: "%s". Using bounding box as shape.', geometry.type);
      return createBoxShape(geometry);
  }
};
