import { AmbientLight, DirectionalLight, Fog, Group, Vector3 } from 'three';
import { Component, Scene } from '../../../../src';

class Lights extends Component {
  scene: Scene;
  lights: Group;

  constructor({ scene }: { scene: Scene }) {
    super();
    this.scene = scene;
  }

  onInit = (): void => {
    this.lights = new Group();

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
    this.lights.add(directionalLightOne);

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
    this.lights.add(directionalLightTwo);

    const ambientLight = new AmbientLight(0xffffff, 2);
    this.lights.add(ambientLight);

    this.scene.add(this.lights);

    this.scene.threeScene.fog = new Fog('red', 0, 80);
  };

  onDestroy = (): void => {
    this.scene.remove(this.lights);
  };
}

export { Lights };
