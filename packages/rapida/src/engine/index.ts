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
  private previousRenderFrame: number | undefined;

  /**
   * The time of the previous animation frame
   */
  private previousGameLoopFrame: number | undefined;

  /**
   * The time of the previous physics frame
   */
  private previousPhysicsFrame: number | undefined;

  /**
   * Whether there is a physics loop running
   */
  private physicsLoopRunning = false;

  /**
   * Stats instance for the game loop
   */
  private gameLoopStats?: Stats;

  /**
   * Stats instance for the physics loop
   */
  private physicsStats?: Stats;

  /**
   * Stats instance for the render loop
   */
  private renderStats?: Stats;

  /**
   * Constructor for an Engine
   * @param params params for constructing the rapida Engine
   */
  constructor(params?: EngineParams) {
    // set whether the Engine should be in debug mode
    this.debug = params?.debug || false;

    // setup stats if in debug mode
    if (this.debug) {
      this.gameLoopStats = new Stats();
      this.physicsStats = new Stats();
      this.renderStats = new Stats();

      this.gameLoopStats.showPanel(0);
      this.physicsStats.showPanel(0);
      this.renderStats.showPanel(0);

      const container = document.createElement('div');

      this.gameLoopStats.dom.style.position = 'relative';
      this.physicsStats.dom.style.position = 'relative';
      this.renderStats.dom.style.position = 'relative';

      container.appendChild(this.gameLoopStats.dom);
      container.appendChild(this.physicsStats.dom);
      container.appendChild(this.renderStats.dom);

      document.body.appendChild(container);
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = 'unset';
      container.style.right = '0';
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

    // start the loops
    const t = performance.now() / 1000;
    this.previousRenderFrame = t;
    this.previousGameLoopFrame = t;
    this.previousPhysicsFrame = t;
    this.gameLoop();
    this.renderLoop();

    if (this.world.physics.size > 0) {
      this.physicsLoopRunning = true;
      this.physicsLoop();
    }

    this.world.on('addphysics', () => {
      if (!this.physicsLoopRunning) {
        this.physicsLoopRunning = true;
        this.physicsLoop();
      }
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
    this.world?._destroy();
    this.gameLoopStats?.dom.remove();
    this.physicsStats?.dom.remove();
    this.renderStats?.dom.remove();
    this.gameLoopStats?.end();
    this.physicsStats?.end();
    this.renderStats?.end();
  }

  /**
   * Runs the render loop for the engine
   */
  private renderLoop() {
    requestAnimationFrame((time) => {
      if (!this.running) {
        return;
      }

      const now = time / 1000;

      const timeElapsed = now - (this.previousRenderFrame as number);

      this.world?._render(timeElapsed);
      this.renderStats?.update();

      this.previousRenderFrame = now;

      this.renderLoop();
    });
  }

  /**
   * The game logic loop
   */
  private gameLoop() {
    if (!this.running) {
      return;
    }

    const now = performance.now() / 1000;
    const timeElapsed = now - (this.previousGameLoopFrame as number);

    this.world?._update(timeElapsed);

    this.gameLoopStats?.update();

    this.previousGameLoopFrame = now;

    setTimeout(() => {
      this.gameLoop();
    }, this.world?._gameLoopUpdateDelayMs);
  }

  /**
   * The physics loop
   */
  private async physicsLoop() {
    if (!this.running || !this.physicsLoopRunning) {
      return;
    }

    const now = performance.now() / 1000;
    const timeElapsed = now - (this.previousPhysicsFrame as number);
    await this.world?._updatePhysics(timeElapsed);
    this.physicsStats?.update();

    this.previousPhysicsFrame = now;

    setTimeout(() => {
      this.physicsLoop();
    }, this.world?._physicsUpdateDelayMs);
  }
}
