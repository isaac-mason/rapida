import { useEffect } from '@storybook/client-api';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  SphereBufferGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { CannonPhysics, BodyType, BodyApi } from '@rapidajs/cannon-worker';
import rapida, {
  Camera,
  Component,
  Scene,
  View,
  WebGLView,
} from '../../../src';
// @ts-expect-error webpack image import
import cursorImage from '../../resources/cursor.png';

export default {
  title: 'Physics / Interactive Ball Pit',
};

class BallPitContainer extends Component {
  physics!: CannonPhysics;

  planeApis!: BodyApi[];

  construct = ({ physics }: { physics: CannonPhysics }) => {
    this.planeApis = undefined;
    this.physics = physics;
  };

  onInit = (): void => {
    const height = 15;
    const width = 15;

    const planes: {
      position: [number, number, number];
      rotation: [number, number, number];
    }[] = [
      {
        position: [0, -height / 2, 0],
        rotation: [-Math.PI / 2, 0, 0],
      },
      {
        position: [-width / 2 - 1, 0, 0],
        rotation: [0, Math.PI / 2, 0],
      },
      {
        position: [width / 2 + 1, 0, 0],
        rotation: [0, -Math.PI / 2, 0],
      },
      {
        position: [0, -(width / 2), 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, width / 2 + 1],
        rotation: [0, -Math.PI, 0],
      },
    ];

    planes.forEach((p) => {
      this.physics.create.plane({
        type: BodyType.STATIC,
        position: p.position,
        rotation: p.rotation,
        mass: 0,
        material: {
          friction: 0.0,
          restitution: 0.3,
        },
      });
    });
  };
}

class Cursor extends Component {
  physics!: CannonPhysics;

  camera!: Camera;

  view!: WebGLView;

  scene!: Scene;

  mesh!: Mesh;

  raycaster!: Raycaster;

  sphereApi!: BodyApi;

  construct = (params: {
    physics: CannonPhysics;
    camera: Camera;
    view: WebGLView;
    scene: Scene;
  }) => {
    this.physics = params.physics;
    this.camera = params.camera;
    this.view = params.view;
    this.scene = params.scene;
    this.raycaster = new Raycaster();
    this.sphereApi = undefined;
  };

  onInit = (): void => {
    const radius = 6;

    const geometry = new SphereBufferGeometry(radius, 32, 32);
    const material = new MeshBasicMaterial({ color: 'blue' });
    material.opacity = 0.3;
    material.transparent = true;
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);

    const { api: sphereApi } = this.physics.create.sphere(
      {
        type: BodyType.STATIC,
        args: radius,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        allowSleep: false,
      },
      this.mesh
    );

    this.sphereApi = sphereApi;

    this.view.on('mousemove', (event) => {
      this.updateCursorPosition(event.data.relativeX, event.data.relativeY);
    });

    this.view.on('touchmove', (event) => {
      this.updateCursorPosition(
        event.data.changedTouches[0].relativeX,
        event.data.changedTouches[0].relativeY
      );
    });
  };

  onDestroy = (): void => {
    this.sphereApi.destroy();
    this.scene.remove(this.mesh);
  };

  updateCursorPosition(x: number, y: number): void {
    const vector = new Vector3(x, y, 0);
    vector.unproject(this.camera.three);

    const dir = vector.sub(this.camera.three.position).normalize();
    const distance = -this.camera.three.position.z / dir.z;
    const pos = this.camera.three.position
      .clone()
      .add(dir.multiplyScalar(distance));

    this.sphereApi.position.set(pos.x, pos.y, 6);
  }
}

const ORANGE = '#ff7b00';

class Spheres extends Component {
  physics!: CannonPhysics;

  scene!: Scene;

  view!: View;

  mesh!: InstancedMesh;

  sphereApi!: BodyApi;

  static count = 200;

  construct = (params: { view: View; scene: Scene; physics: CannonPhysics }) => {
    this.sphereApi = undefined;

    this.view = params.view;
    this.scene = params.scene;
    this.physics = params.physics;

    const geometry = new SphereBufferGeometry(1, 32, 32);
    const material = new MeshLambertMaterial({
      color: ORANGE,
    });

    this.mesh = new InstancedMesh(geometry, material, Spheres.count);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.mesh.position.set(0, 0, 0);
    this.mesh.matrixAutoUpdate = false;
    (this.mesh as Object3D).castShadow = true;
    (this.mesh as Object3D).receiveShadow = true;
  };

  onInit = (): void => {
    this.scene.add(this.mesh);

    const { api: sphereApi } = this.physics.create.sphere(
      {
        type: BodyType.DYNAMIC,
        args: 1,
        position: [4 - Math.random() * 8, this.view.viewportSize.height, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        mass: 1,
        allowSleep: false,
      },
      this.mesh
    );

    this.sphereApi = sphereApi;

    for (let i = 0; i < Spheres.count; i++) {
      sphereApi.at(i).position.set(2 - Math.random() * 4, 0, 0);
    }
  };

  onDestroy = (): void => {
    this.scene.remove(this.mesh);
    this.sphereApi.destroy();
  };
}

export const InteractiveBallPit = () => {
  useEffect(() => {
    const engine = rapida.engine({ debug: true });

    const world = rapida.world();

    const renderer = world.create.renderer.webgl({
      renderer: new WebGLRenderer({
        precision: 'lowp',
        powerPreference: 'high-performance',
      }),
    });

    document.getElementById('renderer-root').appendChild(renderer.domElement);

    const physics = world.create.physics({
      gravity: [0, -10, 0],
    });

    const scene = world.create.scene();

    const BACKGROUND = '#89CFF0';
    scene.three.background = new Color(BACKGROUND);

    const camera = world.create.camera({
      camera: new PerspectiveCamera(50, 1, 20, 1000),
    });
    camera.position.set(0, 0, 40);

    const view = renderer.create.view({
      id: 'ball-pit-view',
      camera,
      scene,
    });

    const directionalLightOne = new DirectionalLight(0xffffff, 2);
    directionalLightOne.position.set(50, 50, 25);
    directionalLightOne.castShadow = true;
    directionalLightOne.shadow.mapSize.width = 64;
    directionalLightOne.shadow.camera.left = -10;
    directionalLightOne.shadow.camera.right = 10;
    directionalLightOne.shadow.camera.top = 10;
    directionalLightOne.shadow.camera.bottom = -10;
    directionalLightOne.shadow.mapSize.width = 64;
    directionalLightOne.lookAt(new Vector3(0, 0, 0));
    directionalLightOne.lookAt(0, 0, 0);
    scene.add(directionalLightOne);

    const directionalLightTwo = new DirectionalLight(0xffffff, 0.5);
    directionalLightTwo.position.set(5, -10, 25);
    directionalLightTwo.castShadow = true;
    directionalLightTwo.shadow.mapSize.width = 64;
    directionalLightTwo.shadow.camera.left = -10;
    directionalLightTwo.shadow.camera.right = 10;
    directionalLightTwo.shadow.camera.top = 10;
    directionalLightTwo.shadow.camera.bottom = -10;
    directionalLightTwo.shadow.mapSize.width = 64;
    directionalLightTwo.lookAt(0, 0, 0);
    scene.add(directionalLightTwo);

    const ambientLight = new AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    scene.three.fog = new Fog('red', 0, 80);

    const space = world.create.space();

    space.create.entity().addComponent(BallPitContainer, { physics });
    space.create.entity().addComponent(Spheres, { physics, scene, view });
    space.create
      .entity()
      .addComponent(Cursor, { physics, camera, view, scene });

    engine.start(world);

    return () => engine.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
  }

  #renderer-root #ball-pit-view {
    cursor: url("${cursorImage}")
      39 39,
    auto;
  }
  </style>
  <div id="renderer-root"></div>
  `;
};
