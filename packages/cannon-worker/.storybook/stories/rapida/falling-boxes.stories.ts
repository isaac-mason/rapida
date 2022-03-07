import CannonPhysics, { BodyApi, BodyType, CannonWorker } from '@rapidajs/cannon-worker';
import { useEffect } from '@storybook/client-api';
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3
} from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import World, { Component, Space, System } from '@rapidajs/recs';
import { WebGLRenderer } from '@rapidajs/three';
import { CannonSystem } from './cannon-system';

export default {
  title: 'Rapida / Falling Boxes',
};

export const FallingBoxes = ({
  spawnInterval,
  timeAliveMs,
  gravity,
  box,
}: {
  spawnInterval: number;
  timeAliveMs: number;
  gravity: { x: number; y: number; z: number };
  box: {
    size: { x: number; y: number; z: number };
    mass: number;
  };
}) => {
  const randomCubeColour = (): string => {
    const colours = ['#2F394D', '#EEE1B3', '#EA8C55', '#D68FD6', '#4C934C'];
    return colours[Math.floor(Math.random() * colours.length)];
  };

  const LIGHT_BLUE = '#89CFF0';

  class FallingCubeComponent extends Component {
    scene!: Scene;

    physics!: CannonPhysics;

    mesh!: Mesh;

    cubeApi!: BodyApi;

    construct = ({ scene, physics }: { scene: Scene; physics: CannonPhysics }) => {
      this.cubeApi = undefined;
      this.scene = scene;
      this.physics = physics;

      const geometry = new BoxGeometry(box.size.x, box.size.y, box.size.z);
      const material = new MeshPhongMaterial({
        color: randomCubeColour(),
        specular: 0x111111,
        shininess: 30,
      });
      this.mesh = new Mesh(geometry, material);
      this.mesh.position.set(0, 0, 0);
      this.mesh.matrixAutoUpdate = false;
    };

    onInit = (): void => {
      this.scene.add(this.mesh);

      const { api: cubeApi } = this.physics.create.box(() => ({
          type: BodyType.DYNAMIC,
          args: [box.size.x, box.size.y, box.size.z],
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          mass: box.mass,
          allowSleep: true,
        }),
        this.mesh
      );

      this.cubeApi = cubeApi;

      cubeApi.velocity.set(Math.random() - 0.5, 15, Math.random() - 0.5);

      cubeApi.angularVelocity.set(
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5
      );

      setTimeout(() => {
        this.destroy();
      }, timeAliveMs);
    };

    destroy = (): void => {
      this.scene.remove(this.mesh);
      this.cubeApi.destroy();
    };
  }

  class CubeSpawner extends System {
    queries = {};
    space: Space;
    scene: Scene;
    physics: CannonPhysics;

    counter: number = 0;

    constructor({
      space,
      scene,
      physics,
    }: {
      space: Space;
      scene: Scene;
      physics: CannonPhysics;
    }) {
      super();
      this.space = space;
      this.scene = scene;
      this.physics = physics;
    }

    createFallingCube() {
      const cube = this.space.create.entity();
      cube.addComponent(FallingCubeComponent, {
        scene: this.scene,
        physics: this.physics,
      });
    }

    onUpdate = (timeElapsed: number): void => {
      this.counter += timeElapsed;

      if (this.counter >= spawnInterval) {
        this.counter = 0;
        this.createFallingCube();
      }
    };
  }

  useEffect(() => {
    const world = new World();

    const renderer = new WebGLRenderer();
  
    document.getElementById('renderer-root').appendChild(renderer.domElement);
    
    const physics = new CannonWorker({
      allowSleep: true,
      gravity: [gravity.x, gravity.y, gravity.z],
      size: 10000,
    });

    world.addSystem(new CannonSystem(physics));

    const scene = new Scene();
    scene.background = new Color(LIGHT_BLUE);

    const camera = new PerspectiveCamera(50, 1, 1, 1000);
    camera.position.set(0, 10, 40);
    camera.lookAt(0, 0, 0);

    const view = renderer.create.view({
      camera,
      scene,
    });

    new OrbitControls(camera, view.domElement);

    const directionalLight = new DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(100, 100, 100);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.75);
    ambientLight.position.set(50, 50, 50);
    ambientLight.lookAt(new Vector3(0, 0, 0));
    scene.add(ambientLight);

    physics.create.plane(() => ({
      type: BodyType.STATIC,
      position: [0, -10, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    }));

    const planeMesh = new Mesh(
      new PlaneGeometry(150, 150, 1, 1),
      new MeshBasicMaterial({ color: LIGHT_BLUE })
    );
    planeMesh.rotation.set(-Math.PI / 2, 0, 0);
    planeMesh.position.y = -10;
    scene.add(planeMesh);

    const space = world.create.space();

    const cubeEmitter = new CubeSpawner({ space, scene, physics });
    world.addSystem(cubeEmitter);

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

FallingBoxes.args = {
  spawnInterval: 0.25,
  timeAliveMs: 30000,
  gravity: {
    x: 0,
    y: -10,
    z: 0,
  },
  box: {
    size: {
      x: 1,
      y: 1,
      z: 1,
    },
    mass: 1,
  },
};
