import {
  Engine,
  World,
  WorldContext,
  WorldProvider,
} from '../../../src';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { BoxGeometry, MeshPhongMaterial, Mesh, AmbientLight, Vector3 } from 'three';
import { useEffect } from '@storybook/client-api'
import { OrbitControls } from 'three-stdlib';


export default {
  title: 'Renderers / Simple CSS Renderer',
};

export const SimpleCSSRenderer = () => {
  useEffect(() => {
    const engine = new Engine();

    const worldProvider: WorldProvider = (worldContext: WorldContext): World => {
      const world = new World({
        engine: worldContext.engine,
      });

      // create renderers
      const webglRenderer = world.create.renderer.webgl();
      document.getElementById('renderer-root').appendChild(webglRenderer.domElement);

      const cssRenderer = world.create.renderer.css();
      document.getElementById('renderer-root').appendChild(cssRenderer.domElement);

      // create camera and scene
      const scene = world.create.scene();
      const camera = world.create.camera();
      camera.position.set(0, 0, 500);
      camera.three.lookAt(0, 0, 0);

      // create views
      webglRenderer.create.view({
        camera,
        scene,
      })
      const cssView = cssRenderer.create.view({
        camera,
        scene,
        viewport: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        scissor: {
          left: 0.1,
          right: 0.1,
          top: 0.1,
          bottom: 0.1
        }
      });

      // create controls
      new OrbitControls(camera.three, cssView.domElement);

      // create lights
      var ambientLight = new AmbientLight( 0xffffff, 1 );
      scene.add( ambientLight );
    
      // create a cube
      const geometry = new BoxGeometry( 50, 50, 50 );
      const material = new MeshPhongMaterial( {
          color: 0x002d77,
          specular: 0x111111,
          shininess: 30,
      } );
      const cube = new Mesh( geometry, material );
      scene.add(cube);

      // create text
      const element = document.createElement( 'div' );
      element.innerHTML = "<p style='color: white;'>I'm a paragraph tag!</p>"
      const domObject = new CSS3DObject(element);
      domObject.position.z = 50;
      scene.add(domObject);

      return world;
    };

    engine.run(worldProvider);

    return () => engine.destroy();
  });

  return `
  <style>
  #renderer-root {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  </style>
  <div id="renderer-root"></div>
  `;
}
