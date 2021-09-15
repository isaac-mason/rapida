import { Logger } from 'pino';
import * as three from 'three';
import logger from './logger';
import { NetworkManager } from './network-manager';
import { Scene } from './scene';

/**
 * Parameters for the scene provider method
 */
type SceneProviderParams = {
  networkManager?: NetworkManager;
  runtime: Runtime;
};

/**
 * A scene provider
 */
type SceneProvider = (params: SceneProviderParams) => Scene;

/**
 * Parameters for creating a new rapida runtime
 */
type RuntimeParams = {
  domId: string;
  renderer?: three.WebGLRenderer;
  maxUpdatesPerSecond?: number;
  networkManager?: NetworkManager;
  debug?: boolean;
};

/**
 * A simple client runtime to work with the scene class.
 *
 * Creates a dom element for the renderer on instantiation.
 * Only suitable for scenes with one camera that use the built-in CameraComponent class.
 * For anything more complex, a custom runtime class should be created.
 */
class Runtime {
  /**
   * The current scene in play
   */
  scene?: Scene;

  /**
   * The room that the network scene is in.
   * Left undefined if the scene is not networked.
   */
  networkManager?: NetworkManager;

  /**
   * The renderer for the Scene
   */
  renderer: three.WebGLRenderer;

  /**
   * The logger for the runtime
   */
  logger: Logger;

  /**
   * The scene providers for the runtime
   */
  private sceneProviders: { [id: string]: SceneProvider } = {};

  /**
   * Whether the runtime is in debug mode
   */
  private debug: boolean;

  /**
   * The DOM element for the scene
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private domElement: any;

  /**
   * Whether the render loop should be stopped.
   * If set to true, the loop will be stopped on the next check.
   * Set back to false after killing the loop.
   */
  private killLoop: boolean;

  /**
   * The time in milliseconds to wait before running another runtime update
   */
  private updateDelay: number;

  /**
   * The time of the previous animation frame
   */
  private previousAnimationFrame: number | undefined;

  constructor({
    domId,
    renderer,
    maxUpdatesPerSecond,
    networkManager,
    debug,
  }: RuntimeParams) {
    // Set update delay
    this.updateDelay = 1000 / (maxUpdatesPerSecond || 60);

    // Set the network manager
    this.networkManager = networkManager;

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

    // init scene providers map
    this.sceneProviders = {};

    // set killLoop to false
    this.killLoop = false;

    // set whether the runtime should be in debug mode
    this.debug = debug || false;

    // set the logger
    this.logger = logger;
    this.logger.level = this.debug ? 'debug' : 'info';
  }

  /**
   * Registers a new scene
   * @param sceneId the scene ID
   * @param sceneProvider a function that returns a new Scene for a given sceneId
   */
  registerScene = (sceneId: string, sceneProvider: SceneProvider): void => {
    this.sceneProviders[sceneId] = sceneProvider;
  };

  /**
   * Sets the scene that is playing.
   * If a scene is already playing, the current scene is stopped and the new scene is started.
   * @param s the new scene to start
   */
  setScene(sceneId: string): Runtime {
    // clean up running scene
    if (this.scene !== undefined) {
      // kill the render loop
      this.killLoop = true;

      // destroy the scene
      this.scene.destroy();
    }

    // get the scene provider
    const sceneProvider = this.sceneProviders[sceneId];
    if (sceneProvider === undefined) {
      throw new Error('there is no scene provider for the given scene id');
    }

    // create the scene
    this.scene = sceneProvider({
      runtime: this,
      networkManager: this.networkManager,
    });
    if (this.scene === undefined) {
      throw new Error('Cannot init as the newly provided scene is undefined');
    }

    // set killLoop to false now in case anything went wrong
    this.killLoop = false;

    // start the scene
    this.scene.init();

    // start the loop
    this.loop();

    // return the scene
    return this;
  }

  /**
   * Handles window resizing
   */
  onWindowResize(): void {
    if (this.scene === undefined || this.scene.camera === undefined) {
      return;
    }

    this.scene.camera.aspect =
      this.domElement.clientWidth / this.domElement.clientHeight;
    this.scene.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );
  }

  /**
   * The animation loop
   */
  private loop() {
    requestAnimationFrame((t) => {
      if (this.killLoop === true) {
        this.killLoop = false;
        return;
      }

      if (this.previousAnimationFrame === undefined) {
        this.previousAnimationFrame = t;
      }

      if (this.scene !== undefined && this.scene.camera !== undefined) {
        this.renderer.render(this.scene.threeScene, this.scene.camera);
        const timeElapsed = t - this.previousAnimationFrame;
        const timeElapsedS = Math.min(1.0 / 30.0, timeElapsed * 0.001);
        this.scene.update(timeElapsedS);
      }

      this.previousAnimationFrame = t;

      setTimeout(() => {
        this.loop();
      }, this.updateDelay);
    });
  }
}

export { Runtime, SceneProviderParams, SceneProvider };
