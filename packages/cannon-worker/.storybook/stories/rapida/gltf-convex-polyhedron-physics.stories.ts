import CannonWorker, {
  CannonWorkerDebugger,
  ThreeToCannonShapeType,
} from '@rapidajs/cannon-worker';
import { useEffect } from '@storybook/client-api';
import { AmbientLight, BufferGeometry, Color, Mesh, PerspectiveCamera, Scene } from 'three';
import { Geometry } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import World, { Component } from '@rapidajs/recs';

// @ts-expect-error webpack import
import diamondGlb from '../../resources/diamond.glb';
import { CannonSystem } from './cannon-system';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Loaders } from '@rapidajs/three';
import { WebGLRenderer } from '@rapidajs/three';

export default {
  title: 'Rapida / GLTF Convex Polyhedron Physics',
};

class Diamonds extends Component {
  gltf!: GLTF;
  physics!: CannonWorker;
  mesh!: Mesh;

  construct = (physics: CannonWorker, gltf: GLTF) => {
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
    this.physics.create.convexPolyhedron(() => ({
      position: [-6, 0, 0],
      mass: 10,
      args: [
        geo.vertices.map((v) => [v.x, v.y, v.z]),
        geo.faces.map((f) => [f.a, f.b, f.c]),
        [],
      ],
      angularVelocity: [0, -1, -1],
    }));

    // also create a diamond physics object by calculating its convex hull cannon-worker
    this.physics.create.three(
      this.mesh,
      () => ({
        position: [6, 0, 0],
        mass: 10,
        angularVelocity: [0, -1, -1],
      }),
      {
        conversion: {
          type: ThreeToCannonShapeType.HULL,
        },
      }
    );
  };
}

export const GLTFConvexPolyhedronPhysics = () => {
  useEffect(() => {
    const world = new World();

    (async () => {
      const loader = new Loaders();

      const diamondGLTF = await loader.gltf(diamondGlb);

      const renderer = new WebGLRenderer();
      document.getElementById('renderer-root').appendChild(renderer.domElement);

      const scene = new Scene();
      scene.background = new Color('#bfe3dd');

      scene.add(new AmbientLight(0xffffff, 1));

      const camera = new PerspectiveCamera();
      camera.position.set(1, 2.5, 30);

      const view = renderer.create.view({
        camera,
        scene,
      });

      new OrbitControls(camera, view.domElement);

      const physics = new CannonWorker({
        gravity: [0, -10, 0],
      });
  
      world.addSystem(new CannonSystem(physics));

      physics.debugger = new CannonWorkerDebugger(physics, {
        scene: scene,
      });

      physics.create.plane(() => ({
        position: [0, -1, 0],
        rotation: [-Math.PI / 2, 0, 0],
        mass: 0,
        material: {
          friction: 0.0,
          restitution: 0.3,
        },
      }));

      const space = world.create.space();

      space.create.entity().addComponent(Diamonds, physics, diamondGLTF);

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
    })();

    return () => world.destroy();
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
