import {
  CannonPhysics,
  CannonPhysicsDebugger,
  ThreeToCannonShapeType
} from '@rapidajs/cannon-worker';
import { useEffect } from '@storybook/client-api';
import { AmbientLight, BufferGeometry, Color, Mesh } from 'three';
import { Geometry } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import rapida, { Component, GLTF } from '../../../src';

// @ts-expect-error webpack import
import diamondGlb from '../../resources/diamond.glb';

export default {
  title: 'Physics / GLTF Convex Polyhedron Physics',
};

class Diamonds extends Component {
  gltf!: GLTF;
  physics!: CannonPhysics;
  mesh!: Mesh;

  construct = (physics: CannonPhysics, gltf: GLTF) => {
    this.physics = physics;
    this.mesh = gltf.scene.children[0] as Mesh;
    this.mesh.position.set(0, -5, -10);

    this.gltf = gltf;
  };

  onInit = () => {
    // create a geometry from the gltf BufferGeometry
    const geo = new Geometry().fromBufferGeometry(
      (this.gltf.scene.children[0] as Mesh).geometry as BufferGeometry
    );

    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices();

    // create the convex polyhedron from the geometry vertices and faces
    this.physics.create.convexPolyhedron({
      position: [-6, 0, 0],
      mass: 10,
      args: [
        geo.vertices.map((v) => [v.x, v.y, v.z]),
        geo.faces.map((f) => [f.a, f.b, f.c]),
        [],
      ],
      angularVelocity: [0, -1, -1],
    });

    // also create a diamond physics object by calculating its convex hull cannon-worker
    this.physics.create.three(
      {
        three: this.mesh,
        position: [6, 0, 0],
        mass: 10,
        angularVelocity: [0, -1, -1],
      },
      {
        conversion: {
          type: ThreeToCannonShapeType.HULL,
        },
        ref: null,
      }
    );
  };
}

export const GLTFConvexPolyhedronPhysics = () => {
  useEffect(() => {
    const engine = rapida.engine();

    (async () => {
      const world = rapida.world();

      const diamondGLTF = await world.load.gltf(diamondGlb);

      const renderer = world.create.renderer.webgl();
      document.getElementById('renderer-root').appendChild(renderer.domElement);

      const scene = world.create.scene();
      scene.three.background = new Color('#bfe3dd');

      scene.add(new AmbientLight(0xffffff, 1));

      const camera = world.create.camera();
      camera.position.set(1, 2.5, 30);

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

      space.create.entity().addComponent(Diamonds, physics, diamondGLTF);

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
