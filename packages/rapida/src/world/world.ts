import { Physics, PhysicsParams } from '@rapidajs/rapida-physics';
import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Engine } from '../engine';
import { Scene, SceneParams } from '../scene';
import {
  System,
  Space,
  SpaceParams,
  SystemManager,
  QueryManager,
} from '../ecs';
import { Camera, CameraParams } from '../camera';
import {
  RendererManager,
  WebGLRenderer,
  WebGLRendererParams,
  CSSRenderer,
  CSSRendererParams,
} from '../renderer';
import { XRRenderer, XRRendererParams } from '../renderer/xr/xr-renderer';

/**
 * Params for creating a world
 */
type WorldParams = {
  /**
   * The unique id for the world
   */
  id?: string;

  /**
   * The engine instance the world is in
   */
  engine: Engine;

  /**
   * The maximum game loop updates to run per second
   */
  maxGameLoopUpdatesPerSecond?: number;

  /**
   * The maximum physics loop updates to run per second
   */
  maxPhysicsUpdatesPerSecond?: number;
};

/**
 * A World that can contain systems, spaces containing entities, scenes, physics worlds, and renderers
 */
class World {
  /**
   * A unique id for the world
   */
  id: string;

  /**
   * Spaces in the world
   */
  spaces: Map<string, Space> = new Map();

  /**
   * Scenes in the world
   */
  scenes: Map<string, Scene> = new Map();

  /**
   * Physics worlds within the world
   */
  physics: Map<string, Physics> = new Map();

  /**
   * Cameras for the world
   */
  cameras: Map<string, Camera> = new Map();

  /**
   * The system manager for the world
   */
  systemManager: SystemManager;

  /**
   * The query manager for the world
   */
  queryManager: QueryManager;

  /**
   * The renderer manager for the world
   */
  rendererManager: RendererManager;

  /**
   * Whether the world has been initialised
   */
  initialised = false;

  /**
   * The engine instance the world is in
   */
  engine: Engine;

  /**
   * The event system for the world
   */
  private events = new EventSystem();

  /**
   * The maximum game loop updates to run per second
   */
  _maxGameLoopUpdatesPerSecond: number;

  /**
   * The delay between game loop updates, based on _maxGameLoopUpdatesPerSecond
   */
  _gameLoopUpdateDelayMs: number;

  /**
   * The maximum physics loop updates to run per second
   */
  _maxPhysicsUpdatesPerSecond: number;

  /**
   * The delay between physics updates, based on _maxPhysicsUpdatesPerSecond
   */
  _physicsUpdateDelayMs: number;

  /**
   * The delta value for the physics worlds, based on _maxPhysicsUpdatesPerSecond
   */
  _physicsDelta?: number;

  /**
   * Constructor for a World
   * @param id a unique id for the world
   */
  constructor({
    id,
    engine,
    maxGameLoopUpdatesPerSecond,
    maxPhysicsUpdatesPerSecond,
  }: WorldParams) {
    this.id = id || uuid();
    this.engine = engine;

    this._maxGameLoopUpdatesPerSecond = maxGameLoopUpdatesPerSecond || 60;
    this._maxPhysicsUpdatesPerSecond = maxPhysicsUpdatesPerSecond || 60;
    this._gameLoopUpdateDelayMs = 1000 / this._maxGameLoopUpdatesPerSecond;
    this._physicsUpdateDelayMs = 1000 / this._maxPhysicsUpdatesPerSecond;
    this._physicsDelta = 1 / this._maxPhysicsUpdatesPerSecond;

    this.queryManager = new QueryManager(this);
    this.systemManager = new SystemManager(this);
    this.rendererManager = new RendererManager();
  }

  /**
   * Removes from the scene
   * @param value the value to remove
   */
  remove(value: System | Space | Scene | Physics | Camera): void {
    if (value instanceof System) {
      this.systemManager.removeSystem(value);
    } else if (value instanceof Space) {
      this.spaces.delete(value.id);
      value._destroy();
    } else if (value instanceof Scene) {
      this.scenes.delete(value.id);
    } else if (value instanceof Physics) {
      this.physics.delete(value.id);
      value.destroy();
    } else if (value instanceof Camera) {
      this.cameras.delete(value.id);
    }
  }

  /**
   * Initialises the world
   */
  init(): void {
    // Initialise the renderer manager
    this.rendererManager._init();

    // Initialise systems
    this.systemManager._init();

    // Initialise spaces
    this.spaces.forEach((s) => {
      s._init();
    });

    // Set the world to be initialised
    this.initialised = true;
  }

  /**
   * Renders the world
   */
  render(): void {
    this.rendererManager.render();
  }

  /**
   * Updates the world
   * @param timeElapsed the time elapsed in milliseconds
   */
  update(timeElapsed: number): void {
    // update the renderer manager
    this.rendererManager._update();

    // update systems
    this.systemManager._update(timeElapsed);

    // update spaces
    this.spaces.forEach((s) => s._update(timeElapsed));
  }

  /**
   * Steps the physics world
   */
  updatePhysics(timeElapsed: number): void {
    this.physics.forEach((p) => {
      p.step(timeElapsed);
    });
  }

  /**
   * Destroys the world
   */
  destroy(): void {
    this.rendererManager._destroy();
    this.systemManager._destroy();
    this.spaces.forEach((s) => s._destroy());
    this.physics.forEach((p) => p.destroy());
  }

  /**
   * Adds a handler for scene events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   * @returns the id of the new handler
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): string {
    return this.events.on(eventName, handler);
  }

  /**
   * Removes an event handler by handler id
   * @param eventName the name of the event
   * @param handlerId the id of the event handler
   */
  removeHandler(eventName: string, handlerId: string): void {
    return this.events.removeHandler(eventName, handlerId);
  }

  /**
   * Broadcasts an event for handling by the scene
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Factories for creating renderers in the world
   */
  private _rendererFactories = {
    /**
     * Creates a new webgl renderer
     * @param params params for the webgl renderer
     * @returns the new webgl renderer
     */
    webgl: (params: WebGLRendererParams): WebGLRenderer => {
      const renderer = new WebGLRenderer(params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
    /**
     * Creates a new css renderer
     * @param params the params for the css renderer
     * @returns the new css renderer
     */
    css: (params: CSSRendererParams): CSSRenderer => {
      const renderer = new CSSRenderer(params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
    /**
     * Creates a new xr renderer
     * @param params the params for the xr renderer
     * @returns the new xr renderer
     */
    xr: (params: XRRendererParams): XRRenderer => {
      const renderer = new XRRenderer(params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
  };

  /**
   * Methods for adding something to the world
   */
  private _add: {
    system: (system: System) => World;
  } = {
    /**
     * Adds a system to the World
     * @param system the system to add to the world
     */
    system: (system: System) => {
      this.systemManager.addSystem(system);
      return this;
    },
  };

  /**
   * Factories for creating something new in a world
   */
  private _factories: {
    space: (params?: SpaceParams) => Space;
    camera: (params?: CameraParams) => Camera;
    scene: (params?: SceneParams) => Scene;
    physics: (params: PhysicsParams) => Physics;
    renderer: {
      webgl: (params: WebGLRendererParams) => WebGLRenderer;
      css: (params: CSSRendererParams) => CSSRenderer;
      xr: (params: XRRendererParams) => XRRenderer;
    };
  } = {
    /**
     * Creates a space in the world
     * @param params the params for the space
     * @returns the new space
     */
    space: (params?: SpaceParams): Space => {
      const space = new Space(this, params);
      this.spaces.set(space.id, space);

      if (this.initialised) {
        space._init();
      }

      return space;
    },
    /**
     * Creates a camera in the world
     * @param params the params for the camera
     * @returns the new camera
     */
    camera: (params?: CameraParams): Camera => {
      const camera = new Camera(this, params);
      this.cameras.set(camera.id, camera);

      return camera;
    },
    /**
     * Creates a scene in the world
     * @param params the params for the scene
     * @returns the new scene
     */
    scene: (params?: SceneParams): Scene => {
      const scene = new Scene(params);
      this.scenes.set(scene.id, scene);

      return scene;
    },
    /**
     * Creates a physics instance in the world
     * @param params the params for the new physics instance
     * @returns the new physics instance
     */
    physics: (
      params: Exclude<PhysicsParams, 'delta'> & { maxUpdatesPerSec?: number }
    ): Physics => {
      const physics = new Physics({
        ...params,
        delta: this._physicsDelta,
      });

      this.physics.set(physics.id, physics);

      return physics;
    },
    /**
     * Factories for creating a renderer in the world
     */
    renderer: this._rendererFactories,
  };

  /**
   * Retrieves world factories
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get create() {
    return this._factories;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get add() {
    return this._add;
  }
}

export { World, WorldParams };
