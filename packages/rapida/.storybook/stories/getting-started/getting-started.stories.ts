import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import rapida, { Component, Scene, World, WorldProvider } from '../../../src';

export default {
  title: 'Getting Started / Hello World',
};

class SpinningCubeComponent extends Component {
  cube!: three.Mesh;
  scene!: Scene;

  construct = (params: { scene: Scene }) => {
    this.scene = params.scene;

    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });

    this.cube = new three.Mesh(geometry, material);
    this.cube.position.set(0, 0, 0);
  };

  onInit = (): void => {
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

export const HelloWorld = () => {
  useEffect(() => {
    const R = rapida();

    R.run(({ engine }): World => {
      const world = new World({
        engine,
      });

      const renderer = world.create.renderer.webgl();

      const scene = world.create.scene();

      const camera = world.create.camera();
      camera.position.set(0, 0, 500);

      const view = renderer.create.view({
        camera,
        scene,
      });

      new OrbitControls(camera.three, view.domElement);

      const directionalLight = new three.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(300, 0, 300);
      directionalLight.lookAt(new three.Vector3(0, 0, 0));
      scene.add(directionalLight);

      const ambientLight = new three.AmbientLight(0xffffff, 0.5);
      ambientLight.position.set(0, -200, 400);
      ambientLight.lookAt(new three.Vector3(0, 0, 0));
      scene.add(ambientLight);

      const space = world.create.space();

      const cube = space.create.entity();
      cube.addComponent(SpinningCubeComponent, { scene });

      world.on('ready', () => {
        document
          .getElementById('renderer-root')
          .appendChild(renderer.domElement);
      });

      return world;
    });

    return () => R.destroy();
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
