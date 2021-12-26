import {
  BodyType,
  Physics,
  PhysicsObjectApi,
} from '@rapidajs/rapida-physics';
import {
  DynamicDrawUsage,
  InstancedMesh,
  MeshLambertMaterial,
  Object3D,
  SphereBufferGeometry,
} from 'three';
import { Component, Scene, View } from '../../../../src';

const ORANGE = '#ff7b00';

class Spheres extends Component {
  physics!: Physics;

  scene!: Scene;

  view!: View;
  
  mesh!: InstancedMesh;

  sphereApi!: PhysicsObjectApi;

  static count = 200;

  construct = (params: {
    view: View;
    scene: Scene;
    physics: Physics;
  }) => {
    this.sphereApi = undefined;

    this.view = params.view;
    this.scene = params.scene;
    this.physics = params.physics;

    const geometry = new SphereBufferGeometry(1, 32, 32);
    const material = new MeshLambertMaterial({
      color: ORANGE,
    });

    this.mesh = new InstancedMesh(geometry, material, Spheres.count);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.mesh.position.set(0, 0, 0);
    this.mesh.matrixAutoUpdate = false;
    (this.mesh as Object3D).castShadow = true;
    (this.mesh as Object3D).receiveShadow = true;
  }

  onInit = (): void => {
    this.scene.add(this.mesh);

    const [_, sphereApi] = this.physics.create.sphere(
      {
        type: BodyType.DYNAMIC,
        args: 1,
        position: [4 - Math.random() * 8, this.view.viewportSize.height, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        mass: 1,
        allowSleep: false,
      },
      this.mesh
    );

    this.sphereApi = sphereApi;

    for (let i = 0; i < Spheres.count; i++) {
      sphereApi.at(i).position.set(2 - Math.random() * 4, 0, 0);
    }
  };

  onDestroy = (): void => {
    this.scene.remove(this.mesh);
    this.sphereApi.destroy();
  };
}

export { Spheres };
