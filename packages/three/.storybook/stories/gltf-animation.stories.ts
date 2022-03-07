import recs, { Component } from '@rapidajs/recs';
import { useEffect } from '@storybook/client-api';
import {
  AnimationMixer,
  Color,
  Group,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  sRGBEncoding
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTF, Loaders, WebGLRenderer } from '../../src';
// @ts-expect-error webpack import
import littlestTokyoGlb from '../resources/LittlestTokyo.glb';
import { SmoothOrbitControls } from '../utils/smooth-orbit-controls';

export default {
  title: 'Loaders / GLTF Animation Example',
};

class LittlestTokyoModel extends Component {
  mixer!: AnimationMixer;
  gltf!: GLTF;
  scene!: Scene;
  model!: Group;

  construct = (scene: Scene, gltf: GLTF) => {
    this.scene = scene;
    this.model = gltf.scene;
    this.model.position.set(0.5, 0, 0);
    this.model.scale.set(0.005, 0.005, 0.005);

    this.gltf = gltf;
    this.mixer = new AnimationMixer(this.model);
  };

  onInit = () => {
    this.scene.add(this.model);
    this.mixer.clipAction(this.gltf.animations[0]).play();
  };

  onUpdate = (t: number) => {
    this.mixer.update(t);
  };
}

export const GLTFAnimationExample = () => {
  useEffect(() => {
    (async () => {
      const world = recs();

      const renderer = new WebGLRenderer();
      renderer.three.outputEncoding = sRGBEncoding;

      document.getElementById('renderer-root')!.appendChild(renderer.domElement);

      const scene = new Scene();
      scene.background = new Color('#bfe3dd');

      const camera = new PerspectiveCamera()
      camera.position.set(0, 0, 5);

      const view = renderer.create.view({
        camera,
        scene,
      });
      
      const space = world.create.space();

      space.create.entity().addComponent(SmoothOrbitControls, camera, view);

      const pmremGenerator = new PMREMGenerator(renderer.three);
      scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;

      const loader = new Loaders();

      const loadedGLTF = await loader.gltf(littlestTokyoGlb);

      space.create.entity().addComponent(LittlestTokyoModel, scene, loadedGLTF);

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
    })();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }
  #info {
    font-family: monospace;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #333;
    z-index: 1;
    text-align: center;
    padding-bottom: 1em;
  }
  </style>
  <div id="info">
    Model: <a href="https://artstation.com/artwork/1AGwX" target="_blank" rel="noopener">Littlest Tokyo</a> by
    <a href="https://artstation.com/glenatron" target="_blank" rel="noopener">Glen Fox</a>, CC Attribution.
  </div>
  <div id="renderer-root"></div>
  `;
};
