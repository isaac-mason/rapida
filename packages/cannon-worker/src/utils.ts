/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable-next-line no-restricted-syntax */
import { Object3D, Vector3 } from 'three';
import type { BodyParams, PhysicsContext, Triplet } from './types';

export function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export function getUUID(ref: Object3D, index?: number): string | null {
  const suffix = index === undefined ? '' : `/${index}`;
  if (typeof ref === 'function') return null;
  return ref && `${ref.uuid}${suffix}`;
}

export function prepare(object: Object3D, params: BodyParams) {
  object.userData = params.userData || {};
  object.position.set(...(params.position || [0, 0, 0]));
  object.rotation.set(...(params.rotation || [0, 0, 0]));
  object.updateMatrix();
}

export function setupCollision(
  events: PhysicsContext['events'],
  { onCollide, onCollideBegin, onCollideEnd }: Partial<BodyParams>,
  uuid: string,
) {
  events[uuid] = {
    collide: onCollide,
    collideBegin: onCollideBegin,
    collideEnd: onCollideEnd,
  };
}

export function makeTriplet(v: Vector3 | Triplet): Triplet {
  return v instanceof Vector3 ? [v.x, v.y, v.z] : v;
}

export function isString(v: unknown): v is string {
  return typeof v === 'string';
}
