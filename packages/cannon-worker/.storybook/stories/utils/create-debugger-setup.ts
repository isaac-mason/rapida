import { WebGLRenderer, PerspectiveCamera, Scene, AmbientLight, DirectionalLight, Vector3 } from 'three';
import { CannonPhysics, CannonPhysicsDebugger } from '../../../lib';

export const createDebuggerSetup = (params?: { delta?: number }): {
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
  physics: CannonPhysics;
  debug: CannonPhysicsDebugger;
loop: ((now: number) => void)[] 
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
  camera.position.z = 15;
  camera.position.y = 5;
  camera.position.x = 0;
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

  const physics = new CannonPhysics({
    delta: params?.delta || 1 / 60,
    gravity: [0, -10, 0],
  });

  const debug = new CannonPhysicsDebugger(physics, { scene, color: 'white' });
  physics.debugger = debug;

  let lastCallTime = 0;

  const loop: ((elapsed: number) => void)[] = [
    (elapsed) => { 
      physics.step(elapsed);
    },
    (_elapsed) => renderer.render(scene, camera),
  ];

  const renderLoop = (now: number) => {
    now = now / 1000;
    const elapsed = now - lastCallTime;
    loop.forEach(l => l(elapsed));
    requestAnimationFrame(renderLoop);
    lastCallTime = now;
  };

  const start = (): void => {
    requestAnimationFrame(renderLoop);
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
