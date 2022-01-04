import { Ray, RaycastResult, RayMode, Vec3 } from 'cannon-es';
import { Triplet } from '../../types';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

const ctx = self as unknown as Worker;

export type AddRayEvent = {
  topic: PhysicsEventTopic.ADD_RAY;
  uuid: string;
  params: {
    from: Triplet;
    to: Triplet;
    mode?: RayMode;
    result?: RaycastResult;
    skipBackfaces?: boolean;
    collisionFilterMask?: number;
    collisionFilterGroup?: number;
    checkCollisionResponse?: boolean;
  };
};

export const handleAddRay = (e: AddRayEvent, state: State): void => {
  const { uuid, params } = e;
  const { from, to, ...options } = params;
  const ray = new Ray(from ? new Vec3(...from) : undefined, to ? new Vec3(...to) : undefined);
  // @ts-expect-error should become clear with typing
  options.mode = Ray[options.mode.toUpperCase()];
  options.result = new RaycastResult();
  state.rays[uuid] = () => {
    ray.intersectWorld(state.world, options);
    // @ts-expect-error todo
    const { body, shape, rayFromWorld, rayToWorld, hitNormalWorld, hitPointWorld, ...rest } = options.result;
    ctx.postMessage({
      topic: PhysicsEventTopic.EVENT,
      type: PhysicsEventTopic.RAYHIT,
      ray: {
        from,
        to,
        direction: ray.direction.toArray(),
        collisionFilterGroup: ray.collisionFilterGroup,
        collisionFilterMask: ray.collisionFilterMask,
        uuid,
      },
      body: body ? body.uuid : null,
      shape: shape ? { ...shape, body: body.uuid } : null,
      rayFromWorld: rayFromWorld.toArray(),
      rayToWorld: rayToWorld.toArray(),
      hitNormalWorld: hitNormalWorld.toArray(),
      hitPointWorld: hitPointWorld.toArray(),
      ...rest,
    });
  };
  state.world.addEventListener('preStep', state.rays[uuid]);
};
