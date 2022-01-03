import { useEffect } from '@storybook/client-api';
import * as three from 'three';
import {
  Mesh,
  MeshBasicMaterial,
  Points,
  SphereBufferGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three-stdlib/controls/OrbitControls';
import rapida, { Component, Scene, Effects } from '../../../src';

export default {
  title: 'Postprocessing / WebGLRenderer Examples',
};

class SpinningCubeComponent extends Component {
  cube!: three.Mesh;
  scene!: Scene;

  construct = (params: {
    scene: Scene;
    color: string;
    position: [number, number, number];
  }) => {
    this.scene = params.scene;

    const geometry = new three.BoxGeometry(0.5, 0.5, 0.5);
    const material = new three.MeshPhongMaterial({
      color: params.color,
      specular: 0x111111,
      shininess: 30,
    });

    this.cube = new three.Mesh(geometry, material);
    this.cube.position.set(...params.position);
  };

  onInit = (): void => {
    this.scene.add(this.cube);
  };

  onUpdate = (timeElapsed: number): void => {
    this.cube.rotation.x += timeElapsed * 0.1;
    this.cube.rotation.y += timeElapsed * 0.1;
  };

  onDestroy = (): void => {
    this.scene.remove(this.cube);
  };
}

const createSimpleCubesSetup = () => {
  const engine = rapida.engine({ debug: true });

  const world = rapida.world();

  const renderer = world.create.renderer.webgl({
    renderer: new WebGLRenderer({
      powerPreference: 'high-performance',
      precision: 'highp',
      antialias: false,
      stencil: false,
    }),
  });

  document.getElementById('renderer-root').appendChild(renderer.domElement);

  const scene = world.create.scene();

  const camera = world.create.camera();
  camera.position.set(0, 0, 3);
  scene.add(camera.three);

  const directionalLight = new three.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(10, 0, 10);
  directionalLight.lookAt(new three.Vector3(0, 0, 0));
  scene.add(directionalLight);

  const ambientLight = new three.AmbientLight(0xffffff, 0.5);
  ambientLight.position.set(0, -200, 400);
  ambientLight.lookAt(new three.Vector3(0, 0, 0));
  scene.add(ambientLight);

  const space = world.create.space();

  const randomColor = (): string => {
    const colours = ['#2F394D', '#EEE1B3', '#EA8C55', '#D68FD6', '#4C934C'];
    return colours[Math.floor(Math.random() * colours.length)];
  };

  const mainSpinningCube = space.create
    .entity()
    .addComponent(SpinningCubeComponent, {
      scene,
      color: randomColor(),
      position: [0, 0, 0],
    });

  const mainCube = mainSpinningCube.cube;

  for (let i = 0; i < 50; i++) {
    space.create.entity().addComponent(SpinningCubeComponent, {
      scene,
      color: randomColor(),
      position: [
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5,
        Math.random() * 20 - 20,
      ],
    });
  }

  return { engine, world, renderer, camera, scene, mainCube };
};

const html = `
<style>
#renderer-root {
  width: 100%;
  height: 100%;
}
</style>
<div id="renderer-root"></div>
`;

export const EmptyEffectComposer = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
      effectComposer: {
        normalPass: false,
      },
    });

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Bloom = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.bloom());

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const BrightnessContrast = ({ brightness, contrast }) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.brightnessContrast({ brightness, contrast })
    );

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

BrightnessContrast.args = {
  brightess: 0.0,
  contrast: 0.5,
};

export const ChromaticAberration = ({ x, y }) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.chromaticAberration({ offset: new Vector2(x, y) })
    );

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

ChromaticAberration.args = { x: 0.005, y: 0.005 };

export const ColorAverage = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.colorAverage());

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const ColorDepth = ({ bits }) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.colorDepth({ bits }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

ColorDepth.args = { bits: 8 };

export const Depth = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.depth({ inverted: true }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const DepthOfField = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.depthOfField(camera.three, {
        target: new Vector3(0, 0, 0),
        focusDistance: 0,
        focalLength: 0.02,
        bokehScale: 2,
      })
    );

    new OrbitControls(camera.three, view.domElement);

    camera.position.z = 6;

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const DotScreen = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.dotScreen());

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Glitch = ({
  chromaticAberrationOffset,
  delay,
  duration,
  dtSize,
  strength,
}) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.glitch({
        chromaticAberrationOffset: new Vector2(
          chromaticAberrationOffset.x,
          chromaticAberrationOffset.y
        ),
        duration: new Vector2(duration.x, duration.y),
        delay: new Vector2(delay.x, delay.y),
        strength: new Vector2(strength.x, strength.y),
        dtSize,
      })
    );

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

Glitch.args = {
  chromaticAberrationOffset: {
    x: 2,
    y: 2,
  },
  duration: {
    x: 0.7,
    y: 0.7,
  },
  delay: {
    x: 1,
    y: 1,
  },
  dtSize: 1,
  strength: {
    x: 0.1,
    y: 0.1,
  },
};

export const GodRays = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    camera.position.z = 6;

    const sun = new Mesh(new SphereBufferGeometry(3), new MeshBasicMaterial());
    sun.position.set(0, 0, -30);
    scene.add(sun);

    view.composer.add.effects(Effects.godRays(camera.three, sun));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Grid = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.grid({ scale: 1, opacity: 0.1 }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const HueSaturation = ({ hue, saturation }) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.hueSaturation({ hue, saturation }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

HueSaturation.args = {
  hue: 0.5,
  saturation: 0.6,
};

export const Noise = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.noise({ opacity: 0.1 }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Outline = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene, mainCube } =
      createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.outline(scene.three, camera.three, {
        selection: mainCube,
        edgeStrength: 5,
      })
    );

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Pixelation = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.pixelation({ granularity: 6 }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Scanline = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.scanline());

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const Sepia = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.sepia());

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const SSAO = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(
      Effects.ssao(view.camera.three, view.composer.normalPass)
    );

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

export const ToneMapping = ({ middleGrey, maxLuminance }) => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.toneMapping({ middleGrey, maxLuminance }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

ToneMapping.args = { middleGrey: 0.1, maxLuminance: 40 };

export const Vignette = () => {
  useEffect(() => {
    const { engine, world, renderer, camera, scene } = createSimpleCubesSetup();

    const view = renderer.create.view({
      camera,
      scene,
      useEffectComposer: true,
    });

    view.composer.add.effects(Effects.vignette({ darkness: 1 }));

    new OrbitControls(camera.three, view.domElement);

    engine.start(world);

    return () => engine.destroy();
  });

  return html;
};

