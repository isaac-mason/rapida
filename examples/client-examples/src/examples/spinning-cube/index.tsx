import * as React from "react";
import { three } from '@isaacmason/rapida-client';
import { useEffect } from "react";
import { CameraComponent, Component, Entity, Scene, Runtime, SceneProvider } from "@isaacmason/rapida-client";
import { useFirstRender } from "../../hooks";

class SpinningCubeComponent extends Component {
  cube: three.Mesh;

  init = (): void => {
    const geometry = new three.BoxGeometry( 50, 50, 50 );
    const material = new three.MeshPhongMaterial({
        color: 'blue',
        specular: 0x111111,
        shininess: 30,
    });
    this.cube = new three.Mesh( geometry, material );
    this.cube.position.set(0, 0, 0);

    this.entity.group.add(this.cube);
  }
  
  update = (timeElapsed: number): void => {
    this.cube.rotation.x += timeElapsed * 2;
    this.cube.rotation.y += timeElapsed * 0.5;
  }

  destroy = (): void => {
    this.entity.group.remove(this.cube);
  }
}

class LightComponent extends Component {
  lights: three.Group;
  
  init = (): void => {
    this.lights = new three.Group();    

    const directionalLight = new three.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 300, 0, 300 );
    directionalLight.lookAt( new three.Vector3( 0, 0, 0 ) );
    this.lights.add(directionalLight);

    const ambientLight = new three.AmbientLight( 0xffffff, .5 );
    ambientLight.position.set( 0, -200, 400);
    ambientLight.lookAt( new three.Vector3( 0, 0, 0 ) );
    this.lights.add(ambientLight);

    this.entity.group.add(this.lights)
  }

  destroy = (): void => {
    this.entity.group.remove(this.lights);
  }
}

const SpinningCube = () => {
  const firstRender = useFirstRender();

  useEffect(() => {
    const runtime = new Runtime({domId: 'renderer-root'});

    const sceneId = 'SpinningCube';

    const sceneProvider: SceneProvider = ({ runtime, networkManager }): Scene => {
      const scene = new Scene(sceneId, { runtime, networkManager });

      const camera = new Entity('camera');
      camera.position = {x: 0, y: 0, z: 500};
      camera.addComponent(new CameraComponent(camera, 'camera'));
      scene.add(camera);

      const light = new Entity('light');
      light.addComponent(new LightComponent(light, 'light'));
      scene.add(light);

      const cube = new Entity('cube');
      cube.addComponent(new SpinningCubeComponent(cube, 'cube'));
      scene.add(cube);

      return scene;
    };

    runtime.registerScene(sceneId, sceneProvider);

    runtime.setScene(sceneId);
  }, [firstRender]);

  return (
    <div id="renderer-root"></div>
  );
};

export default SpinningCube;
