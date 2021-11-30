import {
  BodyType,
  Physics,
  PhysicsObjectApi,
} from '@rapidajs/rapida-physics';
import { Mesh, Raycaster, Vector3 } from 'three';
import { Camera, Component, View } from '../../../../src';

class Cursor extends Component {
  physics: Physics;
  camera: Camera;
  view: View;

  mesh: Mesh;
  raycaster = new Raycaster();
  sphereApi: PhysicsObjectApi;

  constructor({
    physics,
    camera,
    view,
  }: {
    physics: Physics;
    camera: Camera;
    view: View;
  }) {
    super();
    this.physics = physics;
    this.camera = camera;
    this.view = view;
  }

  onInit = (): void => {
    const radius = 6;

    const [_, sphereApi] = this.physics.sphere(
      {
        type: BodyType.STATIC,
        args: radius,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        allowSleep: false,
      },
      this.mesh
    );

    this.sphereApi = sphereApi;

    window.addEventListener(
      'mousemove',
      (event) => {
        const vector = new Vector3(this.view.mouse.x, this.view.mouse.y, 0);
        vector.unproject(this.camera.threeCamera);

        const dir = vector.sub(this.camera.threeCamera.position).normalize();
        const distance = -this.camera.threeCamera.position.z / dir.z;
        const pos = this.camera.threeCamera.position
          .clone()
          .add(dir.multiplyScalar(distance));

        this.sphereApi.position.set(pos.x, pos.y, 6);
      },
      false
    );
  };

  onDestroy = (): void => {
    this.sphereApi.destroy();
  };
}

export { Cursor };
