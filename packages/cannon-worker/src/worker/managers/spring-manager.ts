import { Vec3 } from 'cannon-es';
import { Triplet } from '../../types';
import { Spring } from '../../cannon';
import { WorkerState } from '../worker-state';

export enum SpringWorkerEventTopic {
  ADD_SPRING = 'addSpring',
  SET_SPRING_STIFFNESS = 'setSpringStiffness',
  SET_SPRING_REST_LENGTH = 'setSpringRestLength',
  SET_SPRING_DAMPING = 'setSpringDamping',
  REMOVE_SPRING = 'removeSpring',
}

export type AddSpringEvent = {
  topic: SpringWorkerEventTopic.ADD_SPRING;
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

const addSpring = (e: AddSpringEvent, state: WorkerState): void => {
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

  spring.uuid = uuid;

  const postStepSpring = () => spring.applyForce();

  state.springs[uuid] = postStepSpring;
  state.springInstances[uuid] = spring;

  // Compute the force after each step
  state.world.addEventListener('postStep', state.springs[uuid]);
};

export type RemoveSpringEvent = {
  topic: SpringWorkerEventTopic.REMOVE_SPRING;
  uuid: string;
};

const removeSpring = (e: RemoveSpringEvent, state: WorkerState): void => {
  const { uuid } = e;
  state.world.removeEventListener('postStep', state.springs[uuid]);
};

export type SetSpringDampingEvent = {
  topic: SpringWorkerEventTopic.SET_SPRING_DAMPING;
  uuid: string;
  params: number;
};

const setSpringDamping = (e: SetSpringDampingEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].damping = params;
};

export type SetSpringRestLengthEvent = {
  topic: SpringWorkerEventTopic.SET_SPRING_REST_LENGTH;
  uuid: string;
  params: number;
};

const setSpringRestLength = (e: SetSpringRestLengthEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].restLength = params;
};

export type SetSpringStiffnessEvent = {
  topic: SpringWorkerEventTopic.SET_SPRING_STIFFNESS;
  uuid: string;
  params: number;
};

export const setSpringStiffness = (e: SetSpringStiffnessEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  state.springInstances[uuid].stiffness = params;
};

const handlers = {
  [SpringWorkerEventTopic.ADD_SPRING]: addSpring,
  [SpringWorkerEventTopic.REMOVE_SPRING]: removeSpring,
  [SpringWorkerEventTopic.SET_SPRING_DAMPING]: setSpringDamping,
  [SpringWorkerEventTopic.SET_SPRING_REST_LENGTH]: setSpringRestLength,
  [SpringWorkerEventTopic.SET_SPRING_STIFFNESS]: setSpringStiffness,
};

export default handlers;
