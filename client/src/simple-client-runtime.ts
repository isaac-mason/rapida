import {
  THREE_CAMERA_DESTROY,
  THREE_CAMERA_INIT,
} from 'src/components/camera.component';
import { Scene } from 'src/core/core';
import * as three from 'three';

/**
 * A simple client runtime to work with the simple scene class.
 *
 * Only suitable for scenes with one camera.
 * Creates a dom element for the renderer on instantiation.
 */
class SimpleClientRuntime {
  /**
   * The current scene in play
   */
  scene: Scene | undefined;

  /**
   * The currently registered camera
   */
  camera: three.PerspectiveCamera | undefined;

  /**
   * The renderer for the Scene
   */
  renderer: three.WebGLRenderer;

  /**
   * The DOM element for the scene
   */
  private domElement: any;

  /**
   * The time of the previous animation frame
   */
  private previousAnimationFrame: number | undefined;

  constructor(renderer?: three.WebGLRenderer) {
    // Set up the renderer
    if (renderer) {
      this.renderer = renderer;
    } else {
      this.renderer = new three.WebGLRenderer({
        antialias: true,
      });
      this.renderer.outputEncoding = three.sRGBEncoding;
      this.renderer.gammaFactor = 2.2;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = three.PCFSoftShadowMap;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // Create the dom element
    this.domElement = document.createElement('#renderer-element');
    // Create the event listener for window resizing
    window.addEventListener('resize', this.onWindowResize, false);
    this.onWindowResize();
  }

  /**
   * Inits the currently set scene
   */
  init() {
    if (this.scene === undefined) {
      throw new Error('Cannot init as the scene is undefined');
    }
    this.scene.addSceneHandler(
      THREE_CAMERA_INIT,
      (camera: three.PerspectiveCamera) => {
        this.camera = camera;
      }
    );
    this.scene.addSceneHandler(
      THREE_CAMERA_DESTROY,
      // eslint-disable-next-line no-unused-vars
      (camera: three.PerspectiveCamera) => {
        this.camera = undefined;
      }
    );
    this.scene.init();
    requestAnimationFrame((t) => {
      this.previousAnimationFrame = t;
    });
    this.raf();
  }

  /**
   * Sets the scene that is playing.
   * If a scene is already playing, the current scene is stopped and the new scene is started.
   * @param s the new scene to start
   */
  setScene(s: Scene) {
    this.scene?.destroy();
    this.scene = s;
  }

  private onWindowResize() {
    if (this.camera === undefined) {
      return;
    }
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private raf() {
    requestAnimationFrame((t) => {
      if (this.camera !== undefined && this.scene !== undefined) {
        const prev = this.previousAnimationFrame || t;
        this.previousAnimationFrame = t;

        this.renderer.render(this.scene.threeScene, this.camera);
        this.scene.update(t - prev);
      }
      setTimeout(() => {
        this.raf();
      }, 1);
    });
  }
}

export default SimpleClientRuntime;
