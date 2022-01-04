/* eslint-disable max-classes-per-file */

import { ConeTwistConstraint } from 'constraints/ConeTwistConstraint';
import { DistanceConstraint } from 'constraints/DistanceConstraint';
import { HingeConstraint } from 'constraints/HingeConstraint';
import { LockConstraint } from 'constraints/LockConstraint';
import { PointToPointConstraint } from 'constraints/PointToPointConstraint';

declare module 'objects/Body' {
  export class BodyWithId extends Body {
    uuid!: string;
  }
}

declare module 'constraints/Constraint' {
  export class ConstraintWithId extends Constraint {
    uuid!: string;
  }

  export class HingeConstraintWithId extends HingeConstraint {
    uuid!: string;
  }

  export class LockConstraintWithId extends LockConstraint {
    uuid!: string;
  }

  export class DistanceConstraintWithId extends DistanceConstraint {
    uuid!: string;
  }

  export class PointToPointConstraintWithId extends PointToPointConstraint {
    uuid!: string;
  }

  export class ConeTwistConstraintWithId extends ConeTwistConstraint {
    uuid!: string;
  }
}

declare module 'objects/Spring' {
  export class SpringWithId extends Spring {
    uuid!: string;
  }
}

declare module 'objects/RaycastVehicle' {
  export class RaycastVehicleWithId extends RaycastVehicle {
    uuid!: string;

    preStep: () => void;

    postStep: () => void;
  }
}
