import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import recs, { Component } from '@rapidajs/recs';
import { Scene } from 'three';
import { WebGLRenderer } from '../../../src';

export default {
  title: 'Views / Two Views Embedded',
};

class SpinningCube extends Component {
  scene: Scene;

  cube: three.Mesh;

  construct = ({ scene }: { scene: Scene }) => {
    this.scene = scene;

    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.cube = new three.Mesh(geometry, material);
    this.cube.position.set(0, 0, 0);
  };

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

export const TwoViewsEmbedded = () => {
  useEffect(() => {
    const world = recs();

    const renderer = new WebGLRenderer();

    document.getElementById('renderer-root')!.appendChild(renderer.domElement);

    const scene = new Scene();

    const cameraOne = new three.PerspectiveCamera(50, 20, 1, 3500)
    cameraOne.position.set(0, 0, 500);

    const cameraTwo = new three.PerspectiveCamera()
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
      clearDepth: true,
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

    new OrbitControls(cameraOne, viewOne.domElement);

    new OrbitControls(cameraTwo, viewTwo.domElement);

    scene.add(new three.CameraHelper(cameraTwo));

    const ambientLight = new three.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new three.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, -20, 40);
    directionalLight.lookAt(new three.Vector3(0, 0, 0));
    scene.add(directionalLight);

    const space = world.create.space();

    space.create.entity().addComponent(SpinningCube, { scene });

    // simple loop
    world.init();
    
    let lastCallTime = 0;
    const loop = (elapsed: number, time: number) => {
      world.update(elapsed, time);
      renderer.render(elapsed);
    };

    const demoLoop = (now: number) => {
      const nowSeconds = now / 1000;
      const elapsed = nowSeconds - lastCallTime;
      loop(elapsed, nowSeconds);
      requestAnimationFrame(demoLoop);
      lastCallTime = nowSeconds;
    };

    requestAnimationFrame(demoLoop);
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
