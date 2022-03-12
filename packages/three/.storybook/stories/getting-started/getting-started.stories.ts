import World, { Component } from '@rapidajs/recs';
import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import { PerspectiveCamera, Scene } from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import { WebGLRenderer } from '../../../src';

export default {
  title: 'Getting Started / Hello World',
};

class SpinningCubeComponent extends Component {
  cube!: three.Mesh;
  scene!: Scene;

  construct(params: { scene: Scene }) {
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

  onInit(): void {
    this.scene.add(this.cube);
  };

  onUpdate (timeElapsed: number): void {
    this.cube.rotation.x += timeElapsed * 0.1;
    this.cube.rotation.y += timeElapsed * 0.1;
  };

  onDestroy(): void {
    this.scene.remove(this.cube);
  };
}

export const HelloWorld = () => {
  useEffect(() => {
    const world = new World();

    const renderer = new WebGLRenderer();

    document.getElementById('renderer-root').appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera();
    camera.position.set(0, 0, 500);

    const view = renderer.create.view({
      camera,
      scene,
    });

    new OrbitControls(camera, view.domElement);

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

    // simple loop
    world.init();

    let lastCallTime = 0;

    const loop = (now: number) => {
      const nowSeconds = now / 1000;
      const elapsed = nowSeconds - lastCallTime;

      world.update(elapsed);
      renderer.render(elapsed);

      lastCallTime = nowSeconds;
      
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
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
