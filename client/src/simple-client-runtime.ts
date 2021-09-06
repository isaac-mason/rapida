import * as three from 'three';
import { Camera } from 'three';
import {
  ThreeCameraDestroyEvent,
  ThreeCameraInitEvent,
  THREE_CAMERA_DESTROY,
  THREE_CAMERA_INIT,
} from './components/camera.component';
import { Scene } from './core/core';

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

  constructor(domId: string, renderer?: three.WebGLRenderer) {
    // Set up the renderer
    if (renderer) {
      this.renderer = renderer;
    } else {
      this.renderer = new three.WebGLRenderer({
        antialias: true,
      });
    }

    // Get the dom element with the given ID
    this.domElement = document.getElementById(domId);

    // Prepend the renderer dom element
    this.domElement.prepend(this.renderer.domElement);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    // Create the event listener for window resizing
    window.addEventListener('resize', () => this.onWindowResize(), false);
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
      'registerCamera',
      (event: ThreeCameraInitEvent) => {
        this.camera = event.data;
        this.onWindowResize();
      }
    );
    this.scene.addSceneHandler(
      THREE_CAMERA_DESTROY,
      'destroyCamera',
      // eslint-disable-next-line no-unused-vars
      (event: ThreeCameraDestroyEvent) => {
        this.camera = undefined;
      }
    );
    this.scene.init();
    this.RAF();
  }

  /**
   * Sets the scene that is playing.
   * If a scene is already playing, the current scene is stopped and the new scene is started.
   * @param s the new scene to start
   */
  setScene(s: Scene): SimpleClientRuntime {
    this.scene?.destroy();
    this.scene = s;
    return this;
  }

  private onWindowResize() {
    if (this.camera === undefined) {
      return;
    }

    this.camera.aspect =
      this.domElement.clientWidth / this.domElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );
  }

  // todo: sort this render method out
  private RAF() {
    requestAnimationFrame((t) => {
      if (this.previousAnimationFrame === undefined) {
        this.previousAnimationFrame = t;
      }

      this.renderer.render(
        (this.scene as Scene).threeScene,
        this.camera as Camera
      );
      const timeElapsed = t - this.previousAnimationFrame;
      const timeElapsedS = Math.min(1.0 / 30.0, timeElapsed * 0.001);
      (this.scene as Scene).update(timeElapsedS);

      this.previousAnimationFrame = t;

      setTimeout(() => {
        this.RAF();
      }, 1);
    });
  }

  // private raf() {
  //   requestAnimationFrame((t) => {
  //     if (this.camera !== undefined && this.scene !== undefined) {
  //       const prev = this.previousAnimationFrame || t;
  //       this.previousAnimationFrame = t;

  //       this.renderer.render(this.scene.threeScene, this.camera);
  //       this.scene.update(t - prev);
  //     }
  //     setTimeout(() => {
  //       this.raf();
  //     }, 1);
  //   });
  // }
}

export default SimpleClientRuntime;
