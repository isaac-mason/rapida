import { Spring, Vec3 } from 'cannon-es';
import { Triplet } from '../../types';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type AddSpringEvent = {
  topic: PhysicsEventTopic.ADD_SPRING;
  uuid: string;
  params: [
    string,
    string,
    {
      restLength?: number;
      stiffness?: number;
      damping?: number;
      worldAnchorA?: Triplet;
      worldAnchorB?: Triplet;
      localAnchorA?: Triplet;
      localAnchorB?: Triplet;
    },
  ];
};

export const handleAddSpring = (e: AddSpringEvent, state: State): void => {
  const { uuid, params } = e;
  const [bodyA, bodyB, optns] = params;
  const { restLength, stiffness, damping } = optns;

  const worldAnchorA = Array.isArray(optns.worldAnchorA) ? new Vec3(...optns.worldAnchorA) : undefined;
  const worldAnchorB = Array.isArray(optns.worldAnchorB) ? new Vec3(...optns.worldAnchorB) : undefined;
  const localAnchorA = Array.isArray(optns.localAnchorA) ? new Vec3(...optns.localAnchorA) : undefined;
  const localAnchorB = Array.isArray(optns.localAnchorB) ? new Vec3(...optns.localAnchorB) : undefined;

  const spring = new Spring(state.bodies[bodyA], state.bodies[bodyB], {
    worldAnchorA,
    worldAnchorB,
    localAnchorA,
    localAnchorB,
    restLength,
    stiffness,
    damping,
  });

  // @ts-expect-error extra untyped uuid property
  spring.uuid = uuid;

  const postStepSpring = () => spring.applyForce();

  state.springs[uuid] = postStepSpring;
  state.springInstances[uuid] = spring;

  // Compute the force after each step
  state.world.addEventListener('postStep', state.springs[uuid]);
};
