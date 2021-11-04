/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
import {
  Camera,
  Component,
  OrbitControls,
  Entity,
  Runtime,
  Scene,
  SceneProvider,
  uuid,
} from '@isaacmason/rapida-client';
import { BodyType, PhysicsObjectApi } from '@isaacmason/rapida-physics';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  Vector3,
  PlaneGeometry,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';
import { useFirstRender } from '../../hooks';

class FallingCubeComponent extends Component {
  mesh: Mesh;

  cubeApi: PhysicsObjectApi;

  init = (): void => {
    const geometry = new BoxGeometry(3, 3, 3);
    const material = new MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.matrixAutoUpdate = false;
    this.entity.group.add(this.mesh);

    const [_, cubeApi] = this.physics.box(
      {
        type: BodyType.DYNAMIC,
        args: [3, 3, 3],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        mass: 1,
        allowSleep: false,
      },
      this.mesh
    );

    this.cubeApi = cubeApi;

    cubeApi.velocity.set(
      Math.round(Math.random() * 4) - 2,
      50,
      Math.round(Math.random() * 4) - 2
    );

    cubeApi.angularVelocity.set(
      Math.random() * 5 - 2.5,
      Math.random() * 5 - 2.5,
      Math.random() * 5 - 2.5
    );

    setTimeout(() => {
      this.destroy();
    }, 30000);
  };

  destroy = (): void => {
    this.entity.group.remove(this.mesh);
    this.cubeApi.destroy();
  };
}

class GroundComponent extends Component {
  mesh: Mesh;

  plane: PhysicsObjectApi;

  init = (): void => {
    const [_, plane] = this.physics.plane({
      type: BodyType.STATIC,
      position: [0, -10, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    });
    this.plane = plane;

    const geometry = new PlaneGeometry(150, 150, 1, 1);
    const material = new MeshPhongMaterial({
      color: '#555',
      specular: 0xdddddd,
      shininess: 30,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.set(-Math.PI / 2, 0, 0);
    this.mesh.position.y = -10;
    this.entity.group.add(this.mesh);
  };

  destroy = (): void => {
    this.entity.group.remove(this.mesh);
    this.plane.destroy();
  };
}

class LightComponent extends Component {
  lights: Group;

  init = (): void => {
    this.lights = new Group();

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    this.lights.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new Vector3(0, 0, 0));
    this.lights.add(ambientLight);

    this.entity.group.add(this.lights);
  };

  destroy = (): void => {
    this.entity.group.remove(this.lights);
  };
}

const FallingCubes = () => {
  const firstRender = useFirstRender();
  const runtime = useRef<Runtime | undefined>(undefined);

  useEffect(() => {
    const renderer = new WebGLRenderer({
      precision: 'lowp',
      powerPreference: 'high-performance',
    });
    const newRuntime = new Runtime({
      domId: 'renderer-root',
      debug: true,
      renderer,
    });
    runtime.current = newRuntime;

    const sceneId = 'FallingCubes';

    const sceneProvider: SceneProvider = (sceneParams): Scene => {
      const scene = new Scene(sceneId, {
        runtime: sceneParams.runtime,
        networkManager: sceneParams.networkManager,
        physicsParams: {
          gravity: [0, -30, 0],
        },
      });

      const threeCamera = new PerspectiveCamera(50, 1, 20, 1000);
      const camera = new Camera('camera', threeCamera);
      camera.position.set(0, 10, 70);
      camera.setControls(
        new OrbitControls({
          target: [0, 0, 0],
          enablePan: true,
          enableDamping: true,
          enableZoom: true,
        })
      );
      scene.add(camera);

      const light = new Entity('light').addComponent(
        new LightComponent('light')
      );
      scene.add(light);

      const ground = new Entity('ground').addComponent(
        new GroundComponent('ground')
      );
      scene.add(ground);

      const createFallingCube = () => {
        const cube = new Entity(uuid());
        cube.addComponent(new FallingCubeComponent('cube'));
        scene.add(cube);
      };

      createFallingCube();

      setInterval(() => {
        createFallingCube();
      }, 250);

      return scene;
    };

    runtime.current.registerScene(sceneId, sceneProvider);

    runtime.current.setScene(sceneId);
  }, [firstRender]);

  useEffect(() => {
    return () => {
      runtime.current.destroy();
    };
  }, []);

  return <div id="renderer-root"></div>;
};

export default React.memo(FallingCubes);
