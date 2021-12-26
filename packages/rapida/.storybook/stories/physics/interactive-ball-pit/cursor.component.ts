import { BodyType, Physics, PhysicsObjectApi } from '@rapidajs/rapida-physics';
import { Mesh, MeshBasicMaterial, Raycaster, SphereBufferGeometry, Vector3 } from 'three';
import { Camera, Component, Scene, WebGLView } from '../../../../src';

class Cursor extends Component {
  physics!: Physics;

  camera!: Camera;

  view!: WebGLView;

  scene!: Scene;

  mesh!: Mesh;

  raycaster!: Raycaster;

  sphereApi!: PhysicsObjectApi;

  construct = (params: {
    physics: Physics;
    camera: Camera;
    view: WebGLView;
    scene: Scene;
  }) => {
    this.physics = params.physics;
    this.camera = params.camera;
    this.view = params.view;
    this.scene = params.scene;
    this.raycaster = new Raycaster();
    this.sphereApi = undefined;
  }

  onInit = (): void => {
    const radius = 6;

    const geometry = new SphereBufferGeometry(radius, 32, 32);
    const material = new MeshBasicMaterial({ color: 'blue' });
    material.opacity = 0.3;
    material.transparent = true; 
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);

    const [_, sphereApi] = this.physics.create.sphere(
      {
        type: BodyType.STATIC,
        radius,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        allowSleep: false,
      },
      this.mesh
    );

    this.sphereApi = sphereApi;

    this.view.on('mousemove', (event) => {
      this.updateCursorPosition(event.data.relativeX, event.data.relativeY);
    });

    this.view.on('touchmove', (event) => {
      this.updateCursorPosition(event.data.changedTouches[0].relativeX, event.data.changedTouches[0].relativeY);
    });
  };

  onDestroy = (): void => {
    this.sphereApi.destroy();
    this.scene.remove(this.mesh);
  };

  updateCursorPosition(x: number, y: number): void {
    const vector = new Vector3(x, y, 0);
    vector.unproject(this.camera.three);

    const dir = vector.sub(this.camera.three.position).normalize();
    const distance = -this.camera.three.position.z / dir.z;
    const pos = this.camera.three.position
      .clone()
      .add(dir.multiplyScalar(distance));

    this.sphereApi.position.set(pos.x, pos.y, 6);
  }
}

export { Cursor };
