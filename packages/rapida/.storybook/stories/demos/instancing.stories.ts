import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import { DirectionalLight, InstancedBufferAttribute } from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import rapida, { Component, Scene, View, Camera } from '../../../src';
import { SmoothOrbitControls } from '../../utils/components/smooth-orbit-controls';

export default {
  title: 'Demos / Instancing',
};

class InstancedCubes extends Component {
  cubes!: three.InstancedMesh;
  scene!: Scene;

  construct = (params: { scene: Scene }) => {
    this.scene = params.scene;

    const size = 125000;
    const tempObject = new three.Object3D();
    const tempColor = new three.Color();
    const colors = new Array(size)
      .fill(0)
      .map(
        () =>
          ['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b'][
            Math.floor(Math.random() * 5)
          ]
      );

    const colorArray = Float32Array.from(
      new Array(size)
        .fill(0)
        .flatMap((_, i) => tempColor.set(colors[i]).toArray())
    );

    const geometry = new three.BoxBufferGeometry(0.15, 0.15, 0.15);
    geometry.setAttribute('color', new InstancedBufferAttribute(colorArray, 3));
    const material = new three.MeshLambertMaterial({
      vertexColors: true,
    });

    this.cubes = new three.InstancedMesh(geometry, material, size);

    let i = 0;
    for (let x = 0; x < 50; x++)
      for (let y = 0; y < 50; y++)
        for (let z = 0; z < 50; z++) {
          const id = i++;
          tempObject.position.set(25 - x, 25 - y, 25 - z);
          tempObject.updateMatrix();
          this.cubes.setMatrixAt(id, tempObject.matrix);
        }
    this.cubes.instanceMatrix.needsUpdate = true;
  };

  onInit = (): void => {
    this.scene.add(this.cubes);
  };

  onDestroy = (): void => {
    this.scene.remove(this.cubes);
  };
}

export const Instancing = () => {
  useEffect(() => {
    const engine = rapida.engine();

    const world = rapida.world();

    const renderer = world.create.renderer.webgl();

    document.getElementById('renderer-root').appendChild(renderer.domElement);

    const scene = world.create.scene();

    const camera = world.create.camera();
    camera.position.set(0, 0, 0.1);

    const view = renderer.create.view({
      camera,
      scene,
    });

    const directionalLight = new DirectionalLight(0xffffff, 0.55);
    directionalLight.position.set(150, 150, 150);
    scene.add(directionalLight);
    scene.add(new three.AmbientLight(0xffffff, 0.55));

    const space = world.create.space();

    const cube = space.create.entity();
    cube.addComponent(InstancedCubes, { scene });

    space.create.entity().addComponent(SmoothOrbitControls, camera, view);

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
