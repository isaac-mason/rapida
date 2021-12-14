import * as three from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import {
  Engine,
  World,
  WorldContext,
  WorldProvider,
  Component,
  Scene,
} from '../../../src';
import { useEffect } from '@storybook/client-api';

export default {
  title: 'Views / Two Views Embedded',
};

export const TwoViewsEmbedded = () => {
  class SpinningCube extends Component {
    scene: Scene;

    cube: three.Mesh;

    constructor({ scene }: { scene: Scene }) {
      super();
      this.scene = scene;

      const geometry = new three.BoxGeometry(50, 50, 50);
      const material = new three.MeshPhongMaterial({
        color: 'blue',
        specular: 0x111111,
        shininess: 30,
      });
      this.cube = new three.Mesh(geometry, material);
      this.cube.position.set(0, 0, 0);
    }

    onInit = () => {
      this.scene.add(this.cube);
    };

    onUpdate = () => {
      this.cube.rotation.x += 0.005;
      this.cube.rotation.y += 0.005;
    };

    onDestroy = () => {
      this.scene.remove(this.cube);
    };
  }

  useEffect(() => {
    const engine = new Engine();

    const worldId = 'world';

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

      const cameraOne = world.create.camera({
        camera: new three.PerspectiveCamera(50, 20, 1, 3500),
      });
      cameraOne.position.set(0, 0, 500);

      const cameraTwo = world.create.camera();
      cameraTwo.position.set(500, 0, 0);

      const viewOne = renderer.create.view({
        camera: cameraOne,
        scene,
        zIndex: 1,
      });

      const viewTwo = renderer.create.view({
        camera: cameraTwo,
        scene,
        zIndex: 2,
        viewport: {
          right: 0,
          top: 0,
          width: '200px',
          height: '200px',
        },
        scissor: {
          right: 0,
          top: 0,
          width: '200px',
          height: '200px',
        },
      });

      new OrbitControls(cameraOne.threeCamera, viewOne.domElement);

      new OrbitControls(cameraTwo.threeCamera, viewTwo.domElement);

      scene.add(new three.CameraHelper(cameraTwo.threeCamera));

      const ambientLight = new three.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new three.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(0, -20, 40);
      directionalLight.lookAt(new three.Vector3(0, 0, 0));
      scene.add(directionalLight);

      const space = world.create.space();

      space.create.entity().addComponent(new SpinningCube({ scene }));

      return world;
    };

    engine.registerWorld(worldId, worldProvider);

    engine.startWorld(worldId);

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
