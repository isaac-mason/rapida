import { useEffect } from '@storybook/client-api';
import { CannonPhysics, BodyType } from '../../../lib';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  BoxBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  Vector3,
} from 'three';

export default {
  title: 'Getting Started / Hello World',
};

export const HelloWorld = () => {
  useEffect(() => {
    const renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      precision: 'lowp',
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('renderer-root').prepend(renderer.domElement);

    const camera = new PerspectiveCamera();
    camera.position.z = 20;
    camera.position.y = 5;

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const scene = new Scene();

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(new Vector3(0, 0, 0));
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const physics = new CannonPhysics({
      gravity: [0, -10, 0],
      maxSubSteps: 5,
      delta: 1 / 60,
    });

    const geometry = new BoxBufferGeometry(1, 1, 1, 32, 32);
    const material = new MeshStandardMaterial();
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const { api: { velocity, angularVelocity } } = physics.create.box(
      {
        type: BodyType.DYNAMIC,
        args: [1, 1, 1],
        mass: 1,
        position: [0, 3, 0],
        rotation: [0, 0, 0],
        fixedRotation: false,
        allowSleep: false,
      },
      mesh,
    );

    velocity.set(Math.round(Math.random() * 2) - 1, 10, Math.round(Math.random() * 2) - 1);

    angularVelocity.set(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3);

    physics.create.plane({
      type: BodyType.STATIC,
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      mass: 0,
      material: {
        friction: 0.0,
        restitution: 0.3,
      },
    });

    let lastCallTime = 0;
    const renderLoop = () => {
      const now = performance.now() / 1000;
      const elapsed = now - lastCallTime;
      physics.step(elapsed);
      lastCallTime = now;
      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    };

    requestAnimationFrame(renderLoop);

    return () => {
      physics.terminate();
      renderer.forceContextLoss();
      renderer.dispose();
    };
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
