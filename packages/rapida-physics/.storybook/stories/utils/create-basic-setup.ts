import { WebGLRenderer, PerspectiveCamera, Scene, AmbientLight, DirectionalLight, Vector3 } from 'three';

import { Physics, PhysicsDebugger } from '../../../lib';

export const createBasicSetup = (): {
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
  physics: Physics;
  debug: PhysicsDebugger;
loop: (() => void)[] 
  start: () => void;
  destroy: () => void;
} => {
  const renderer = new WebGLRenderer({
    powerPreference: 'high-performance',
    precision: 'lowp',
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new PerspectiveCamera();
  camera.position.y = 30;
  camera.position.z = 500;
  camera.lookAt(0, 0, 0);

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

  const physics = new Physics({
    gravity: [0, -10, 0],
  });

  const debug = new PhysicsDebugger(physics, { scene, color: 'white' });
  physics.debugger = debug;

  let lastCallTime = 0;

  const loop = [
    () => {
      const now = performance.now() / 1000;
      const elapsed = now - lastCallTime;
      physics.step(elapsed);
      lastCallTime = now;
    },
    () => debug.update(),
    () => renderer.render(scene, camera),
  ];

  const renderLoop = () => {
    loop.forEach(l => l());
    setTimeout(() => renderLoop(), physics.config.delta);
  };

  const start = (): void => {
    renderLoop();
  }

  const destroy = () => {
    physics.terminate();
    renderer.forceContextLoss();
    renderer.dispose();
  };

  return {
    scene,
    camera,
    renderer,
    physics,
    loop,
    debug,
    start,
    destroy,
  }
};
