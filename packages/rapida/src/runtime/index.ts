import { Logger } from 'pino';
import * as three from 'three';
import { EffectComposer } from 'three-stdlib';
import Stats from 'stats.js';
import logger from '../common/logger';
import { World, WorldProvider } from '../world';

/**
 * Parameters for creating a new rapida runtime
 */
type RuntimeParams = {
  domId: string;
  renderer?: three.WebGLRenderer;
  maxUpdatesPerSecond?: number;
  debug?: boolean;
};

/**
 * A Runtime for rapida worlds
 */
class Runtime {
  /**
   * The current world in play
   */
  world?: World;

  /**
   * The renderer for the World
   */
  renderer: three.WebGLRenderer;

  /**
   * The effect composer for the renderer
   */
  effectComposer: EffectComposer;

  /**
   * The logger for the runtime
   */
  log: Logger;

  /**
   * The world providers for the runtime
   */
  private worldProviders: { [id: string]: WorldProvider } = {};

  /**
   * Whether the runtime is in debug mode
   */
  private debug: boolean;

  /**
   * The DOM element for the renderer
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private domElement: any;

  /**
   * Whether the render loop should be interrupted
   * If set to true, the loop will be stopped on the next loop
   * Set back to false after killing the loop
   */
  private killLoop = false;

  /**
   * The time in milliseconds to wait before running another runtime update
   */
  private updateDelay: number;

  /**
   * The time of the previous animation frame
   */
  private previousGameLoopFrame: number | undefined;

  /**
   * The stats.js instance for the runtime
   */
  private stats: Stats = new Stats();

  /**
   * The resize observer for the renderer dom element
   */
  private resizeObserver: ResizeObserver;

  constructor({ domId, renderer, maxUpdatesPerSecond, debug }: RuntimeParams) {
    // Set update delay
    this.updateDelay = 1000 / (maxUpdatesPerSecond || 60);

    // Set up the renderer
    if (renderer) {
      this.renderer = renderer;
    } else {
      this.renderer = new three.WebGLRenderer({
        antialias: true,
      });
    }

    // Create the effect composer
    this.effectComposer = new EffectComposer(this.renderer);

    // Get the dom element with the given ID
    this.domElement = document.getElementById(domId);

    // Prepend the renderer dom element
    this.domElement.prepend(this.renderer.domElement);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Create the event listener for the renderer dom element resizing
    window.addEventListener('resize', () => this.onResize(), false);
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.renderer.domElement);

    // init world providers map
    this.worldProviders = {};

    // set whether the runtime should be in debug mode
    this.debug = debug || false;

    // setup stats if in debug mode
    if (this.debug) {
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
      this.stats.dom.style.top = '0';
      this.stats.dom.style.left = 'unset';
      this.stats.dom.style.right = '0';
    }

    // store the logger
    this.log = logger;
    this.log.level = this.debug ? 'debug' : 'info';
  }

  /**
   * Registers a new world provider
   * @param worldId the world ID
   * @param worldProvider a function that returns a new World for a given worldId
   */
  registerWorld = (worldId: string, worldProvider: WorldProvider): void => {
    this.worldProviders[worldId] = worldProvider;
  };

  /**
   * Sets the world that is playing.
   * If a world is already playing, the current world is stopped and the new world is started.
   * @param worldId the new world to start
   */
  startWorld(worldId: string): Runtime {
    // clean up running world
    if (this.world !== undefined) {
      // kill the render loop
      this.killLoop = true;

      // destroy the world
      this.world.destroy();
    }

    // get the world provider
    const worldProvider = this.worldProviders[worldId];
    if (worldProvider === undefined) {
      throw new Error('there is no world provider for the given world id');
    }

    // create the world
    this.world = worldProvider({
      runtime: this,
    });
    if (this.world === undefined) {
      throw new Error('Cannot init as the newly provided world is undefined');
    }

    // set killLoop to false now in case anything went wrong
    this.killLoop = false;

    // start the world
    this.world.init();

    // start the loops
    const t = performance.now();
    this.previousGameLoopFrame = t;
    this.gameLoop();
    this.physicsLoop();
    this.renderLoop();

    // run the onResize method
    this.onResize();

    // return the runtime
    return this;
  }

  /**
   * Destroys the runtime
   */
  destroy(): void {
    this.world?.destroy();
    this.stats.dom.remove();
    this.stats.end();
    this.resizeObserver.disconnect();
  }

  /**
   * Handles resizing
   */
  onResize(): void {
    if (this.world === undefined) {
      return;
    }

    this.renderer.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    this.world.views.forEach((v) => {
      v._onResize();
    });
  }

  /**
   * The render loop
   */
  private renderLoop() {
    requestAnimationFrame((t) => {
      if (this.killLoop === true) {
        this.killLoop = false;
        return;
      }

      // render all views
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.world?.views.forEach((view) => {
        this.renderer.setScissorTest(true);
        this.renderer.setScissor(
          view.scissor.left * rect.width,
          view.scissor.top * rect.height,
          view.scissor.width * rect.width,
          view.scissor.height * rect.height
        );
        this.renderer.setViewport(
          view.viewport.left * rect.width,
          view.viewport.top * rect.height,
          view.viewport.width * rect.width,
          view.viewport.height * rect.height
        );

        view.effectComposer.render();
      });

      this.stats.update();

      this.renderLoop();
    });
  }

  /**
   * The game logic loop
   */
  private gameLoop() {
    if (this.killLoop === true) {
      this.killLoop = false;
      return;
    }

    const t = performance.now();
    const timeElapsed = t - (this.previousGameLoopFrame as number);
    this.world?.update(timeElapsed);

    this.previousGameLoopFrame = performance.now();

    setTimeout(() => {
      this.gameLoop();
    }, this.updateDelay);
  }

  /**
   * The physics loop
   */
  private physicsLoop() {
    if (this.killLoop === true) {
      this.killLoop = false;
      return;
    }

    this.world?.updatePhysics();

    setTimeout(() => {
      this.physicsLoop();
    }, this.updateDelay);
  }
}

export { Runtime, RuntimeParams };
