import {
  ConeTwistConstraint,
  Constraint,
  DistanceConstraint,
  HingeConstraint,
  LockConstraint,
  PointToPointConstraint,
  Vec3,
} from 'cannon-es';
import { Triplet } from '../../types';
import { PhysicsEventTopic } from '../physics-event-topic';
import { State } from '../../state';

export type AddConstraintEvent = {
  topic: PhysicsEventTopic.ADD_CONSTRAINT;
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

export const handleAddConstraint = (e: AddConstraintEvent, state: State): void => {
  const { uuid, params, type } = e;
  const [bodyA, bodyB, optns] = params;
  const { ...options } = optns;

  const pivotA = Array.isArray(optns.pivotA) ? new Vec3(...optns.pivotA) : undefined;
  const pivotB = Array.isArray(optns.pivotB) ? new Vec3(...optns.pivotB) : undefined;
  const axisA = Array.isArray(optns.axisA) ? new Vec3(...optns.axisA) : undefined;
  const axisB = Array.isArray(optns.axisB) ? new Vec3(...optns.axisB) : undefined;

  let constraint;

  switch (type) {
    case 'PointToPoint':
      constraint = new PointToPointConstraint(
        state.bodies[bodyA],
        pivotA,
        state.bodies[bodyB],
        pivotB,
        optns.maxForce,
      );
      break;
    case 'ConeTwist':
      constraint = new ConeTwistConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        ...options,
        pivotA,
        pivotB,
        axisA,
        axisB,
      });
      break;
    case 'Hinge':
      constraint = new HingeConstraint(state.bodies[bodyA], state.bodies[bodyB], {
        ...options,
        pivotA,
        pivotB,
        axisA,
        axisB,
      });
      break;
    case 'Distance':
      constraint = new DistanceConstraint(
        state.bodies[bodyA],
        state.bodies[bodyB],
        optns.distance,
        optns.maxForce,
      );
      break;
    case 'Lock':
      constraint = new LockConstraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
    default:
      constraint = new Constraint(state.bodies[bodyA], state.bodies[bodyB], optns);
      break;
  }
  // @ts-expect-error extra untyped uuid property
  constraint.uuid = uuid;
  state.world.addConstraint(constraint);
};
