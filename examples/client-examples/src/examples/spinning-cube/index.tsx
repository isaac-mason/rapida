/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as three from 'three';
import {
  Component,
  Entity,
  Scene,
  Runtime,
  SceneProvider,
  Camera,
  OrbitControls,
} from '@isaacmason/rapida-client';
import { useFirstRender } from '../../hooks';

class SpinningCubeComponent extends Component {
  cube: three.Mesh;

  init = (): void => {
    const geometry = new three.BoxGeometry(50, 50, 50);
    const material = new three.MeshPhongMaterial({
      color: 'blue',
      specular: 0x111111,
      shininess: 30,
    });
    this.cube = new three.Mesh(geometry, material);
    this.cube.position.set(0, 0, 0);

    this.entity.group.add(this.cube);
  };

  update = (timeElapsed: number): void => {
    this.cube.rotation.x += timeElapsed * 0.0001;
    this.cube.rotation.y += timeElapsed * 0.0001;
  };

  destroy = (): void => {
    this.entity.group.remove(this.cube);
  };
}

class LightComponent extends Component {
  lights: three.Group;

  init = (): void => {
    this.lights = new three.Group();

    const directionalLight = new three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(directionalLight);

    const ambientLight = new three.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, -200, 400);
    ambientLight.lookAt(new three.Vector3(0, 0, 0));
    this.lights.add(ambientLight);

    this.entity.group.add(this.lights);
  };

  destroy = (): void => {
    this.entity.group.remove(this.lights);
  };
}

const SpinningCube = () => {
  const firstRender = useFirstRender();
  const runtime = useRef<Runtime | undefined>(undefined);

  useEffect(() => {
    const newRuntime = new Runtime({
      domId: 'renderer-root',
      debug: true,
    });
    runtime.current = newRuntime;

    const sceneId = 'SpinningCube';

    const sceneProvider: SceneProvider = (sceneParams): Scene => {
      const scene = new Scene(sceneId, {
        runtime: sceneParams.runtime,
        networkManager: sceneParams.networkManager,
      });

      const camera = new Camera('camera');
      camera.position.set(0, 0, 500);
      camera.setControls(new OrbitControls({ target: [0, 0, 0] }));
      scene.add(camera);

      const light = new Entity('light');
      light.addComponent(new LightComponent('light'));
      scene.add(light);

      const cube = new Entity('cube');
      cube.addComponent(new SpinningCubeComponent('cube'));
      scene.add(cube);

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

export default React.memo(SpinningCube);
