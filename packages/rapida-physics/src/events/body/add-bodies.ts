import paramsToBody from '../../params-to-body';
import { State } from '../../state';
import { BodyShapeType, SerializableBodyParams } from '../../types';
import { syncBodies } from '../sync-bodies';
import { PhysicsEventTopic } from '../physics-event-topic';

const ctx = self as unknown as Worker;

export type AddBodiesEvent = {
  topic: PhysicsEventTopic.ADD_BODIES;
  type: BodyShapeType;
  uuid: string[];
  params: SerializableBodyParams[];
};

export const handleAddBodies = (e: AddBodiesEvent, state: State): void => {
  const { uuid, type, params } = e;

  for (let i = 0; i < uuid.length; i++) {
    const body = paramsToBody(uuid[i], params[i] as any, type);
    state.world.addBody(body);
    if (params[i].onCollide)
      // TODO: add types for collide event
      body.addEventListener('collide', ({ b, target, contact }: { b: any; target: any; contact: any }) => {
        const { ni, ri, rj, bi, bj, id } = contact;
        const contactPoint = bi.position.vadd(ri);
        const contactNormal = bi === body ? ni : ni.scale(-1);
        ctx.postMessage({
          topic: PhysicsEventTopic.COLLIDE,
          body: b.uuid,
          target: target.uuid,
          contact: {
            ni: ni.toArray(),
            ri: ri.toArray(),
            rj: rj.toArray(),
            bi: bi.uuid,
            bj: bj.uuid,
            impactVelocity: contact.getImpactVelocityAlongNormal(),
            // World position of the contact
            contactPoint: contactPoint.toArray(),
            // Normal of the contact, relative to the colliding body
            contactNormal: contactNormal.toArray(),
            id,
          },
          collisionFilters: {
            bodyFilterGroup: body.collisionFilterGroup,
            bodyFilterMask: body.collisionFilterMask,
            targetFilterGroup: target.collisionFilterGroup,
            targetFilterMask: target.collisionFilterMask,
          },
        });
      });
  }

  syncBodies(state);
};
