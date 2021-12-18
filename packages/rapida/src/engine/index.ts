import { Logger } from 'pino';
import Stats from 'stats.js';
import logger from '../common/logger';
import { World, WorldProvider } from '../world';

/**
 * Parameters for creating a new rapida engine
 */
type EngineParams = {
  debug?: boolean;
};

/**
 * Engine for rapida worlds
 */
class Engine {
  /**
   * The current world in play
   */
  world?: World;

  /**
   * The logger for the engine
   */
  log: Logger;

  /**
   * Whether in debug mode
   */
  private debug: boolean;

  /**
   * Whether the render loop should be interrupted
   * If set to true, the loop will be stopped on the next loop
   * Set back to false after killing the loop
   */
  private killLoop = false;

  /**
   * The time of the previous animation frame
   */
  private previousGameLoopFrame: number | undefined;

  /**
   * The time of the previous physics frame
   */
  private previousPhysicsFrame: number | undefined;

  /**
   * The stats.js instance
   */
  private stats: Stats = new Stats();

  /**
   * Constructor for an Engine
   * @param params params for constructing the rapida Engine
   */
  constructor(params?: EngineParams) {
    // set whether the Engine should be in debug mode
    this.debug = params?.debug || false;

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
   * Sets the world that is playing.
   * If a world is already playing, the current world is stopped and the new world is started.
   * @param worldId the new world to start
   */
  run(worldProvider: WorldProvider): Engine {
    // clean up running world
    if (this.world !== undefined) {
      // kill the render loop
      this.killLoop = true;

      // destroy the world
      this.world.destroy();
    }

    // create the world
    this.world = worldProvider({
      engine: this,
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
    this.previousPhysicsFrame = t / 1000;
    this.gameLoop();
    this.physicsLoop();
    this.renderLoop();

    return this;
  }

  /**
   * Destroys the engine
   */
  destroy(): void {
    this.world?.destroy();
    this.stats.dom.remove();
    this.stats.end();
  }

  /**
   * Runs the render loop for the engine
   */
  private renderLoop() {
    requestAnimationFrame((_t) => {
      if (this.killLoop === true) {
        this.killLoop = false;
        return;
      }

      this.world?.render();

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
    }, this.world?._gameLoopUpdateDelayMs);
  }

  /**
   * The physics loop
   */
  private physicsLoop() {
    if (this.killLoop === true) {
      this.killLoop = false;
      return;
    }

    const now = performance.now() / 1000;
    const timeElapsed = now - (this.previousPhysicsFrame as number);
    this.world?.updatePhysics(timeElapsed);

    this.previousPhysicsFrame = now;

    setTimeout(() => {
      this.physicsLoop();
    }, this.world?._physicsUpdateDelayMs);
  }
}

export { Engine, EngineParams };
