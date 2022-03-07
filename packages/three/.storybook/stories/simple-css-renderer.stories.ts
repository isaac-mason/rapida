import { useEffect } from '@storybook/client-api';
import {
  AmbientLight,
  BoxGeometry,
  Camera,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
} from 'three';
import { OrbitControls } from 'three-stdlib';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSSRenderer, WebGLRenderer } from '../../src';

export default {
  title: 'Renderers / Simple CSS Renderer',
};

export const SimpleCSSRenderer = () => {
  useEffect(() => {
    // create renderers
    const webglRenderer = new WebGLRenderer();

    const cssRenderer = new CSSRenderer();

    const root = document.getElementById('renderer-root')!;
    root.appendChild(webglRenderer.domElement);
    root.appendChild(cssRenderer.domElement);

    // create camera and scene
    const scene = new Scene();
    const camera = new PerspectiveCamera();
    camera.position.set(-400, 250, 500);
    camera.lookAt(0, 0, 0);

    // create views
    webglRenderer.create.view({
      camera,
      scene,
    });
    const cssView = cssRenderer.create.view({
      camera,
      scene,
      viewport: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      scissor: {
        left: 0.1,
        right: 0.1,
        top: 0.1,
        bottom: 0.1,
      },
    });

    // create controls
    new OrbitControls(camera, cssView.domElement);

    // create lights
    var ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(300, 0, 300);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    // create a cube
    const geometry = new BoxGeometry(50, 50, 50);
    const material = new MeshPhongMaterial({
      color: 0x002d77,
      specular: 0x111111,
      shininess: 30,
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    // create text
    const element = document.createElement('div');
    element.innerHTML = "<p style='color: white;'>Drag me around!</p>";
    const domObject = new CSS3DObject(element);
    domObject.position.z = 50;
    scene.add(domObject);

    // simple loop
    let lastCallTime = 0;

    const loop = (now: number) => {
      const nowSeconds = now / 1000;
      const elapsed = nowSeconds - lastCallTime;

      cssRenderer.render(elapsed);
      webglRenderer.render(elapsed);
      lastCallTime = nowSeconds;
      
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
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
