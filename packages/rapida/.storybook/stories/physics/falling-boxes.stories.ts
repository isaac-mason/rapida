import { BodyType, Physics, PhysicsObjectApi } from '@rapidajs/rapida-physics';
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
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import rapida, { Component, Scene, Space, System, World } from '../../../src';

export default {
  title: 'Physics / Falling Boxes',
};

export const FallingBoxes = ({
  spawnInterval,
  timeAlive,
  gravity,
  box,
}: {
  spawnInterval: number;
  timeAlive: number;
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

    physics!: Physics;

    mesh!: Mesh;

    cubeApi!: PhysicsObjectApi;

    construct = ({ scene, physics }: { scene: Scene; physics: Physics }) => {
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

      const { api: cubeApi } = this.physics.create.box(
        {
          type: BodyType.DYNAMIC,
          args: [box.size.x, box.size.y, box.size.z],
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          mass: box.mass,
          allowSleep: true,
        },
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
      }, timeAlive);
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
    physics: Physics;

    msCounter: number = 0;

    constructor({
      space,
      scene,
      physics,
    }: {
      space: Space;
      scene: Scene;
      physics: Physics;
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
      this.msCounter += timeElapsed;

      if (this.msCounter >= spawnInterval) {
        this.msCounter = 0;
        this.createFallingCube();
      }
    };
  }

  useEffect(() => {
    const engine = rapida.engine({ debug: true });

    const world = rapida.world();

    const renderer = world.create.renderer.webgl({
      renderer: new WebGLRenderer({
        precision: 'lowp',
        powerPreference: 'high-performance',
      }),
    });

    const physics = world.create.physics({
      allowSleep: true,
      gravity: [gravity.x, gravity.y, gravity.z],
    });

    const scene = world.create.scene();
    scene.three.background = new Color(LIGHT_BLUE);

    const threeCamera = new PerspectiveCamera(50, 1, 1, 1000);
    const camera = world.create.camera({ id: 'camera', camera: threeCamera });
    camera.position.set(0, 10, 40);
    camera.three.lookAt(0, 0, 0);

    const view = renderer.create.view({
      camera,
      scene,
    });

    new OrbitControls(camera.three, view.domElement);

    const directionalLight = new DirectionalLight(0xffffff, 0.75);
    directionalLight.position.set(100, 100, 100);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.75);
    ambientLight.position.set(50, 50, 50);
    ambientLight.lookAt(new Vector3(0, 0, 0));
    scene.add(ambientLight);

    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -10, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    });

    const planeMesh = new Mesh(
      new PlaneGeometry(150, 150, 1, 1),
      new MeshBasicMaterial({ color: LIGHT_BLUE })
    );
    planeMesh.rotation.set(-Math.PI / 2, 0, 0);
    planeMesh.position.y = -10;
    scene.add(planeMesh);

    const space = world.create.space();

    const cubeEmitter = new CubeSpawner({ space, scene, physics });
    world.add.system(cubeEmitter);

    world.on('ready', () => {
      document.getElementById('renderer-root').appendChild(renderer.domElement);
    });

    engine.start(world);

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

FallingBoxes.args = {
  spawnInterval: 250,
  timeAlive: 30000,
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
