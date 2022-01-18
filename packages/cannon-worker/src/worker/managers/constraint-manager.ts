import { Vec3 } from 'cannon-es';
import {
  ConeTwistConstraint,
  Constraint,
  DistanceConstraint,
  HingeConstraint,
  LockConstraint,
  PointToPointConstraint,
} from '../../cannon';
import { Triplet } from '../../types';
import { ConstraintType } from '../../types/constraints';
import { WorkerState } from '../worker-state';

export enum ConstraintWorkerEventTopic {
  ADD_CONSTRAINT = 'addConstraint',
  REMOVE_CONSTRAINT = 'removeConstraint',
  ENABLE_CONSTRAINT = 'enableConstraint',
  DISABLE_CONSTRAINT = 'disableConstraint',
  ENABLE_HINGE_CONSTRAINT_MOTOR = 'enableHingeConstraintMotor',
  DISABLE_HINGE_CONSTRAINT_MOTOR = 'disableHingeConstraintMotor',
  SET_HINGE_CONSTRAINT_MOTOR_SPEED = 'setHingeConstraintMotorSpeed',
  SET_HINGE_CONSTRAINT_MOTOR_MAX_FORCE = 'setHingeConstraintMotorMaxForce',
}

export type AddConstraintEvent = {
  topic: ConstraintWorkerEventTopic.ADD_CONSTRAINT;
  uuid: string;
  // bodyA, bodyB, optns
  params: [
    string,
    string,
    {
      pivotA?: Triplet;
      pivotB?: Triplet;
      axisA?: Triplet;
      axisB?: Triplet;
      distance?: number;
      maxForce?: number;
      collideConnected?: boolean;
      wakeUpBodies?: boolean;
    },
  ];
  type: string;
};

const addConstraint = (e: AddConstraintEvent, state: WorkerState): void => {
  const { uuid, params, type } = e;
  const [bodyA, bodyB, optns] = params;
  const { ...options } = optns;

  const pivotA = Array.isArray(optns.pivotA) ? new Vec3(...optns.pivotA) : undefined;
  const pivotB = Array.isArray(optns.pivotB) ? new Vec3(...optns.pivotB) : undefined;
  const axisA = Array.isArray(optns.axisA) ? new Vec3(...optns.axisA) : undefined;
  const axisB = Array.isArray(optns.axisB) ? new Vec3(...optns.axisB) : undefined;

  let constraint;

  switch (type) {
    case ConstraintType.PointToPoint:
      constraint = new PointToPointConstraint(
        state.bodies[bodyA],
        pivotA,
        state.bodies[bodyB],
        pivotB,
        optns.maxForce,
      );
      break;
    case ConstraintType.ConeTwist:
      constraint = new ConeTwistConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        ...options,
        pivotA,
        pivotB,
        axisA,
        axisB,
      });
      break;
    case ConstraintType.Hinge:
      constraint = new HingeConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        ...options,
        pivotA,
        pivotB,
        axisA,
        axisB,
      });
      break;
    case ConstraintType.Distance:
      constraint = new DistanceConstraint(
        state.bodies[bodyA],
        state.bodies[bodyB],
        optns.distance,
        optns.maxForce,
      );
      break;
    case ConstraintType.Lock:
      constraint = new LockConstraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
    default:
      constraint = new Constraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
  }

  constraint.uuid = uuid;
  state.world.addConstraint(constraint);
};

export type RemoveConstraintEvent = {
  topic: ConstraintWorkerEventTopic.REMOVE_CONSTRAINT;
  uuid: string;
};

const removeConstraint = (e: RemoveConstraintEvent, state: WorkerState): void => {
  const { uuid } = e;
  (state.world.constraints as Constraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => state.world.removeConstraint(c));
};

export type EnableConstraintEvent = {
  topic: ConstraintWorkerEventTopic.ENABLE_CONSTRAINT;
  uuid: string;
};

const enableConstraint = (e: EnableConstraintEvent, state: WorkerState): void => {
  const { uuid } = e;
  (state.world.constraints as Constraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.enable());
};

export type DisableConstraintEvent = {
  topic: ConstraintWorkerEventTopic.DISABLE_CONSTRAINT;
  uuid: string;
};

const disableConstraint = (e: DisableConstraintEvent, state: WorkerState): void => {
  const { uuid } = e;
  (state.world.constraints as Constraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.disable());
};

export type EnableHingeConstraintMotorEvent = {
  topic: ConstraintWorkerEventTopic.ENABLE_HINGE_CONSTRAINT_MOTOR;
  uuid: string;
};

const enableHingeConstraintMotor = (e: EnableHingeConstraintMotorEvent, state: WorkerState): void => {
  const { uuid } = e;
  (state.world.constraints as HingeConstraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.enableMotor());
};

export type DisableHingeConstraintMotorEvent = {
  topic: ConstraintWorkerEventTopic.DISABLE_HINGE_CONSTRAINT_MOTOR;
  uuid: string;
};

const disableHingeConstraintMotor = (e: DisableHingeConstraintMotorEvent, state: WorkerState): void => {
  const { uuid } = e;
  (state.world.constraints as HingeConstraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.disableMotor());
};

export type SetHingeConstraintMotorMaxForceEvent = {
  topic: ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_MAX_FORCE;
  uuid: string;
  params: number;
};

const setHingeConstraintMotorMaxForce = (
  e: SetHingeConstraintMotorMaxForceEvent,
  state: WorkerState,
): void => {
  const { uuid, params } = e;
  (state.world.constraints as HingeConstraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.setMotorMaxForce(params));
};

export type SetHingeConstraintMotorSpeedEvent = {
  topic: ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_SPEED;
  uuid: string;
  params: number;
};

const setHingeConstraintMotorSpeed = (e: SetHingeConstraintMotorSpeedEvent, state: WorkerState): void => {
  const { uuid, params } = e;
  (state.world.constraints as HingeConstraint[])
    .filter(({ uuid: thisId }) => thisId === uuid)
    .map((c) => c.setMotorSpeed(params));
};

const handlers = {
  [ConstraintWorkerEventTopic.ADD_CONSTRAINT]: addConstraint,
  [ConstraintWorkerEventTopic.REMOVE_CONSTRAINT]: removeConstraint,
  [ConstraintWorkerEventTopic.ENABLE_CONSTRAINT]: enableConstraint,
  [ConstraintWorkerEventTopic.DISABLE_CONSTRAINT]: disableConstraint,
  [ConstraintWorkerEventTopic.ENABLE_HINGE_CONSTRAINT_MOTOR]: enableHingeConstraintMotor,
  [ConstraintWorkerEventTopic.DISABLE_HINGE_CONSTRAINT_MOTOR]: disableHingeConstraintMotor,
  [ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_MAX_FORCE]: setHingeConstraintMotorMaxForce,
  [ConstraintWorkerEventTopic.SET_HINGE_CONSTRAINT_MOTOR_SPEED]: setHingeConstraintMotorSpeed,
};

export default handlers;
