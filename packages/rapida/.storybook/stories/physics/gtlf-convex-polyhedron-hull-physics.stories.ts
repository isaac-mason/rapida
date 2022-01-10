import {
  CannonPhysics,
  CannonPhysicsDebugger,
  ThreeToCannonShapeType
} from '@rapidajs/cannon-worker';
import { useEffect } from '@storybook/client-api';
import { AmbientLight, Color, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import rapida, { Component, GLTF, Scene } from '../../../src';

// @ts-expect-error webpack import
import mugGlb from '../../resources/mug.glb';

export default {
  title: 'Physics / GLTF Convex Polyhedron Hull Physics',
};

class Model extends Component {
  scene!: Scene;
  physics!: CannonPhysics;
  object!: Object3D;

  construct = (scene: Scene, physics: CannonPhysics, gltf: GLTF) => {
    this.scene = scene;
    this.physics = physics;
    this.object = gltf.scene.children[0];
  };

  onInit = () => {
    this.scene.add(this.object);

    this.physics.create.three(
      {
        three: this.object,
        position: [0, 2, 0],
        mass: 1,
      },
      {
        conversion: {
          type: ThreeToCannonShapeType.HULL,
        },
      }
    );
  };
}

export const GLTFConvexPolyhedronHullPhysics = () => {
  useEffect(() => {
    const engine = rapida.engine();

    (async () => {
      const world = rapida.world();

      const gltf = await world.load.gltf(mugGlb);

      const renderer = world.create.renderer.webgl();
      document.getElementById('renderer-root').appendChild(renderer.domElement);

      const scene = world.create.scene();
      scene.three.background = new Color('#bfe3dd');

      scene.add(new AmbientLight(0xffffff, 1));

      const camera = world.create.camera();
      camera.position.set(-15, 5, -3);
      camera.three.lookAt(0, 0, 0);

      const view = renderer.create.view({
        camera,
        scene,
      });

      new OrbitControls(camera.three, view.domElement);

      const physics = world.create.physics({
        gravity: [0, -10, 0],
      });

      physics.debugger = new CannonPhysicsDebugger(physics, {
        scene: scene.three,
      });

      physics.create.plane({
        position: [0, -1, 0],
        rotation: [-Math.PI / 2, 0, 0],
        mass: 0,
        material: {
          friction: 0.0,
          restitution: 0.3,
        },
      });

      const space = world.create.space();

      space.create.entity().addComponent(Model, scene, physics, gltf);

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
  </style>
  <div id="renderer-root"></div>
  `;
};
