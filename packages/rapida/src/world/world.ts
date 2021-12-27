import { Physics, PhysicsParams } from '@rapidajs/rapida-physics';
import {
  uuid,
  Event,
  EventHandler,
  EventSystem,
  EventSubscription,
} from '@rapidajs/rapida-common';
import recs, { RECS, Space, SpaceParams, System } from '@rapidajs/recs';
import { Engine } from '../engine';
import { Scene, SceneParams } from '../scene';
import { Camera, CameraParams } from '../camera';
import {
  RendererManager,
  WebGLRenderer,
  WebGLRendererParams,
  CSSRenderer,
} from '../renderer';
import { XRRenderer, XRRendererParams } from '../renderer/xr/xr-renderer';

export enum WorldEvent {
  READY = 'ready',
}

export const WORLD_ALL_EVENT_NAMES: string[] = [WorldEvent.READY];

export interface WorldReadyEvent {
  topic: WorldEvent.READY;
}

export interface WorldEventMap {
  ready: WorldReadyEvent;
}

type WorldEventName<T extends string> = T extends keyof WorldEventMap
  ? WorldEventMap[T]
  : Event;

/**
 * Params for creating a world
 */
export type WorldParams = {
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
export class World {
  /**
   * A unique id for the world
   */
  id: string;

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
   * The RECS instance for the world
   */
  recs: RECS = recs();

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
   * Event system for the rapida world
   */
  private events = new EventSystem();

  /**
   * Factories for creating renderers in the world
   */
  private _rendererFactories = {
    /**
     * Creates a new webgl renderer
     * @param params params for the webgl renderer
     * @returns the new webgl renderer
     */
    webgl: (params?: WebGLRendererParams): WebGLRenderer => {
      const renderer = new WebGLRenderer(this.rendererManager, params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
    /**
     * Creates a new css renderer
     * @param params the params for the css renderer
     * @returns the new css renderer
     */
    css: (): CSSRenderer => {
      const renderer = new CSSRenderer(this.rendererManager);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
    /**
     * Creates a new xr renderer
     * @param params the params for the xr renderer
     * @returns the new xr renderer
     */
    xr: (params: XRRendererParams): XRRenderer => {
      const renderer = new XRRenderer(this.rendererManager, params);
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
      this.recs.add.system(system);
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
      webgl: (params?: WebGLRendererParams) => WebGLRenderer;
      css: () => CSSRenderer;
      xr: (params: XRRendererParams) => XRRenderer;
    };
  } = {
    /**
     * Creates a space in the world
     * @param params the params for the space
     * @returns the new space
     */
    space: (params?: SpaceParams): Space => {
      return this.recs.create.space(params);
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
      const scene = new Scene(this, params);
      this.scenes.set(scene.id, scene);

      return scene;
    },
    /**
     * Creates a physics instance in the world
     * @param params the params for the new physics instance
     * @returns the new physics instance
     */
    physics: (
      params: Exclude<PhysicsParams, 'delta'>
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
   * Constructor for a World
   * @param param0 params for creating the world
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

    this.rendererManager = new RendererManager();
  }

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

  /**
   * Registers events for world methods
   * @param eventName the event name
   * @param eventHandler the handler for the event
   * @returns the event subscription
   */
  on<T extends typeof WORLD_ALL_EVENT_NAMES[number]>(
    eventName: T,
    eventHandler: EventHandler<WorldEventName<T>>
  ): EventSubscription {
    if (!WORLD_ALL_EVENT_NAMES.includes(eventName)) {
      throw new Error(`${eventName} is not a supported view event`);
    }

    return this.events.on(eventName, eventHandler);
  }

  /**
   * Removes from the scene
   * @param value the value to remove
   */
  remove(value: System | Space | Scene | Physics | Camera): void {
    if (value instanceof System) {
      this.recs.remove(value);
    } else if (value instanceof Space) {
      this.recs.remove(value);
    } else if (value instanceof Scene) {
      this.scenes.delete(value.id);
    } else if (value instanceof Physics) {
      this.physics.delete(value.id);
      value.terminate();
    } else if (value instanceof Camera) {
      this.cameras.delete(value.id);
    }
  }

  /**
   * Initialises the world
   */
  _init(): void {
    // Set the world to be initialised
    this.initialised = true;

    // Initialise the ecs
    this.recs.init();

    // Initialise the renderer manager
    this.rendererManager._init();

    // Initial render
    this._render();

    // emit ready event
    this.events.emit({
      topic: WorldEvent.READY,
    });
  }

  /**
   * Renders the world
   */
  _render(): void {
    this.rendererManager.render();
  }

  /**
   * Updates the world
   * @param timeElapsed the time elapsed in milliseconds
   */
  _update(timeElapsed: number): void {
    // tick the world event system
    this.events.tick();

    // update the renderer manager
    this.rendererManager._update();

    // update spaces and systems in the ecs
    this.recs.update(timeElapsed);
  }

  /**
   * Steps the physics world
   */
  _updatePhysics(timeElapsed: number): void {
    this.physics.forEach((p) => {
      p.step(timeElapsed);
    });
  }

  /**
   * Destroys the world
   */
  _destroy(): void {
    this.rendererManager._destroy();
    this.recs.destroy();
    this.physics.forEach((p) => p.terminate());
  }
}
