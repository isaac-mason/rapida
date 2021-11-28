import {
  Physics,
  PhysicsObjectApi,
  BodyType,
} from '@isaacmason/rapida-physics';
import { Component } from '../../../../src';

class BallPitContainer extends Component {
  physics: Physics;
  planeApis: PhysicsObjectApi[];

  constructor({ physics }: { physics: Physics }) {
    super();
    this.physics = physics;
  }

  onInit = (): void => {
    const height = 20;
    const width = 20;

    const planes: {
      position: [number, number, number];
      rotation: [number, number, number];
    }[] = [
      {
        position: [0, -height / 2, 0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        position: [-width / 2 - 1, 0, 0],
        rotation: [0, Math.PI / 2, 0],
      },
      {
        position: [width / 2 + 1, 0, 0],
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 12],
        rotation: [0, -Math.PI, 0],
      },
    ];

    planes.forEach((p) => {
      this.physics.plane({
        type: BodyType.STATIC,
        position: p.position,
        rotation: p.rotation,
        mass: 0,
        material: {
          friction: 0.0,
          restitution: 0.3,
        },
      });
    });
  };
}

export { BallPitContainer };
