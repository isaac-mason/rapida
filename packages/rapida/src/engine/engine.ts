import Stats from 'stats.js';
import { World } from '../world';

/**
 * Parameters for creating a new rapida engine
 */
export type EngineParams = {
  debug?: boolean;
};

/**
 * Engine for rapida worlds
 */
export class Engine {
  /**
   * The current world in play
   */
  world?: World;

  /**
   * Whether in debug mode
   */
  private debug: boolean;

  /**
   * Whether the engine is running the world
   * If set to false, the loop will be stopped on the next loop
   */
  private running = false;

  /**
   * The time of the previous render frame
   */
  private previousFrame: number | undefined;

  /**
   * Whether there is a physics loop running
   */
  private physicsLoopRunning = false;

  /**
   * Stats instance for the render loop
   */
  private stats?: Stats;

  /**
   * The dom element for stats
   */
  private statsDomElement?: HTMLElement;

  /**
   * Constructor for an Engine
   * @param params params for constructing the rapida Engine
   */
  constructor(params?: EngineParams) {
    // set whether the Engine should be in debug mode
    this.debug = params?.debug || false;

    // setup stats if in debug mode
    if (this.debug) {
      this.stats = new Stats();
      this.stats.showPanel(0);

      this.statsDomElement = document.createElement('div');

      this.stats.dom.style.position = 'relative';
      this.statsDomElement.appendChild(this.stats.dom);

      document.body.appendChild(this.statsDomElement);
      this.statsDomElement.style.position = 'fixed';
      this.statsDomElement.style.top = '0';
      this.statsDomElement.style.left = 'unset';
      this.statsDomElement.style.right = '0';
    }
  }

  /**
   * Runs a world. If a world is already running, the current world is stopped and the new world is started.
   * @param worldId the new world to start
   */
  start(world: World): Engine {
    // clean up running world
    if (this.world !== undefined) {
      // kill the render loop
      this.running = false;

      // destroy the world
      this.world._destroy();
    }

    this.world = world;
    if (this.world === undefined) {
      throw new Error('Cannot init as the newly provided world is undefined');
    }

    // set running to true now in case anything went wrong
    this.running = true;

    // start the world
    this.world._init();

    // start the loop
    this.previousFrame = 0;
    requestAnimationFrame(this.loop);

    if (this.world.physics.size > 0) {
      this.physicsLoopRunning = true;
    }

    this.world.on('addphysics', () => {
      this.physicsLoopRunning = true;
    });

    this.world.on('removephysics', () => {
      // kills physics loop on the next iteration
      this.physicsLoopRunning = false;
    });

    return this;
  }

  /**
   * Destroys the engine
   */
  destroy(): void {
    this.running = false;
    this.world?._destroy();
    this.stats?.dom.remove();
    this.statsDomElement?.remove();
    this.stats?.end();
  }

  /**
   * Runs the loop for the engine
   */
  private loop = (time: number) => {
    if (!this.running) {
      return;
    }

    const now = time / 1000;

    const timeElapsed = now - (this.previousFrame as number);

    this.world?._update(timeElapsed);

    if (this.physicsLoopRunning) {
      this.world?._updatePhysics(timeElapsed);
    }

    this.world?._render(timeElapsed);

    this.stats?.update();

    this.previousFrame = now;

    requestAnimationFrame(this.loop);
  };
}
