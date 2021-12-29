import { useEffect } from '@storybook/client-api';
import {
  AnimationMixer,
  Color,
  Group,
  PMREMGenerator,
  sRGBEncoding,
} from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import rapida, { Component } from '../../../src';
// @ts-expect-error webpack import
import littlestTokyoGlb from '../../resources/LittlestTokyo.glb';

export default {
  title: 'Loaders / GLTF Example',
};

export const GLTFExample = () => {
  useEffect(() => {
    const engine = rapida.engine();

    (async () => {
      const world = rapida.world();

      const renderer = world.create.renderer.webgl();
      renderer.three.outputEncoding = sRGBEncoding;

      world.on('ready', () => {
        document
          .getElementById('renderer-root')
          .appendChild(renderer.domElement);
      });

      const scene = world.create.scene();
      scene.three.background = new Color('#bfe3dd');

      const camera = world.create.camera();
      camera.position.set(0, 0, 5);

      const view = renderer.create.view({
        camera,
        scene,
      });

      const controls = new OrbitControls(camera.three, view.domElement);
      controls.enableDamping = true;

      const pmremGenerator = new PMREMGenerator(renderer.three);
      scene.three.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;

      const loadedGLTF = await world.load.gltf(littlestTokyoGlb);

      class LittlestTokyoModel extends Component {
        mixer!: AnimationMixer;
        gltf!: GLTF;
        model: Group;

        construct = (gltf: GLTF) => {
          this.model = gltf.scene;
          this.model.position.set(0.5, 0, 0);
          this.model.scale.set(0.005, 0.005, 0.005);

          this.gltf = gltf;
          this.mixer = new AnimationMixer(this.model);
        };

        onInit = () => {
          scene.add(this.model);
          this.mixer.clipAction(this.gltf.animations[0]).play();
        };

        onUpdate = (t: number) => {
          this.mixer.update(t);
        };
      }

      const space = world.create.space();
      space.create.entity().addComponent(LittlestTokyoModel, loadedGLTF);

      engine.start(world);
    })();

    return () => engine.destroy();
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
