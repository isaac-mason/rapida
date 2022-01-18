import {
  Body as BodyImpl,
  ConeTwistConstraint as ConeTwistConstraintImpl,
  Constraint as ConstraintImpl,
  DistanceConstraint as DistanceConstraintImpl,
  HingeConstraint as HingeConstraintImpl,
  LockConstraint as LockConstraintImpl,
  PointToPointConstraint as PointToPointConstraintImpl,
  RaycastVehicle as RaycastVehicleImpl,
  Spring as SpringImpl,
} from 'cannon-es';

// re-export extensions of cannon classes with a uuid property

export class Body extends BodyImpl {
  uuid!: string;
}

export class RaycastVehicle extends RaycastVehicleImpl {
  uuid!: string;
}

export class Spring extends SpringImpl {
  uuid!: string;
}

export class PointToPointConstraint extends PointToPointConstraintImpl {
  uuid!: string;
}

export class ConeTwistConstraint extends ConeTwistConstraintImpl {
  uuid!: string;
}

export class HingeConstraint extends HingeConstraintImpl {
  uuid!: string;
}

export class DistanceConstraint extends DistanceConstraintImpl {
  uuid!: string;
}

export class LockConstraint extends LockConstraintImpl {
  uuid!: string;
}

export class Constraint extends ConstraintImpl {
  uuid!: string;
}
