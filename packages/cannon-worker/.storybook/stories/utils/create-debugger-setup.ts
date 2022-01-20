import { WebGLRenderer, PerspectiveCamera, Scene, AmbientLight, DirectionalLight, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CannonWorker, CannonWorkerDebugger, CannonWorkerProps, Triplet } from '../../../lib';

export const createDebuggerSetup = (params?: {
  cannonWorkerProps: CannonWorkerProps;
  camera?: {
    position?: Triplet;
    lookAt?: Triplet;
  }
}): {
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
  physics: CannonWorker;
  debug: CannonWorkerDebugger;
  loop: ((now: number) => void)[];
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
  
  if (params?.camera?.position) {
    const [x, y, z] = params.camera.position;
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
  } else {
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = 0;
  }

  let controlsCenter: Triplet;
  if (params?.camera?.lookAt) {
    const [x, y, z] = params.camera.lookAt;
    controlsCenter = [x, y, z];
    camera.lookAt(x, y, z);
  } else {
    controlsCenter = [0, -1, 0];
    camera.lookAt(0, -1, 0);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.center = new Vector3(...controlsCenter);

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

  const physics = new CannonWorker({
    delta: 1 / 60,
    gravity: [0, -10, 0],
    ...(params?.cannonWorkerProps || {}),
  });

  const debug = new CannonWorkerDebugger(physics, { scene, color: 'white' });
  physics.debugger = debug;

  // create a simple render loop
  let lastCallTime = 0;
  const loop: ((elapsed: number) => void)[] = [
    (elapsed) => {
      physics.step(elapsed);
      renderer.render(scene, camera);
      debug.update();
    },
  ];

  const demoLoop = (now: number) => {
    now = now / 1000;
    const elapsed = now - lastCallTime;
    loop.forEach((l) => l(elapsed));
    requestAnimationFrame(demoLoop);
    lastCallTime = now;
  };

  const start = (): void => {
    requestAnimationFrame(demoLoop);
  };

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
  };
};
