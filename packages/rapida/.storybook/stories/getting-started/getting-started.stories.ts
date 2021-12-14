import * as three from 'three';
import {
  Component,
  Scene,
  Engine,
  World,
  WorldContext,
  WorldProvider,
} from '../../../src';
import { useEffect } from '@storybook/client-api';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';

export default {
  title: 'Getting Started / Hello World',
};

export const HelloWorld = () => {
  class SpinningCubeComponent extends Component {
    cube: three.Mesh;
    scene: Scene;

    constructor(scene: Scene) {
      super();
      this.scene = scene;
    }

    onInit = (): void => {
      const geometry = new three.BoxGeometry(50, 50, 50);
      const material = new three.MeshPhongMaterial({
        color: 'blue',
        specular: 0x111111,
        shininess: 30,
      });
      this.cube = new three.Mesh(geometry, material);
      this.cube.position.set(0, 0, 0);

      this.scene.add(this.cube);
    };

    onUpdate = (timeElapsed: number): void => {
      this.cube.rotation.x += timeElapsed * 0.0001;
      this.cube.rotation.y += timeElapsed * 0.0001;
    };

    onDestroy = (): void => {
      this.scene.remove(this.cube);
    };
  }

  class LightComponent extends Component {
    lights: three.Group;
    scene: Scene;

    constructor(scene: Scene) {
      super();
      this.scene = scene;
    }

    onInit = (): void => {
      this.lights = new three.Group();

      const directionalLight = new three.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(300, 0, 300);
      directionalLight.lookAt(new three.Vector3(0, 0, 0));
      this.lights.add(directionalLight);

      const ambientLight = new three.AmbientLight(0xffffff, 0.5);
      ambientLight.position.set(0, -200, 400);
      ambientLight.lookAt(new three.Vector3(0, 0, 0));
      this.lights.add(ambientLight);

      this.scene.add(this.lights);
    };

    onDestroy = (): void => {
      this.scene.remove(this.lights);
    };
  }

  useEffect(() => {
    const engine = new Engine({
      debug: true,
    });

    const worldId = 'SpinningCube';

    const worldProvider: WorldProvider = (
      worldContext: WorldContext
    ): World => {
      const world = new World({
        id: worldId,
        engine: worldContext.engine,
      });

      const renderer = world.create.renderer.webgl({
        domElementId: 'renderer-root',
      });

      const scene = world.create.scene();

      const camera = world.create.camera();
      camera.position.set(0, 0, 500);

      const view = renderer.create.view({
        camera,
        scene,
      });

      new OrbitControls(camera.threeCamera, view.domElement);

      const space = world.create.space();

      const light = space.create.entity();
      light.addComponent(new LightComponent(scene));

      const cube = space.create.entity();
      cube.addComponent(new SpinningCubeComponent(scene));

      return world;
    };

    engine.run(worldProvider);

    return () => engine.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};
