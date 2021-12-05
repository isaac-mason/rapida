import { Physics, PhysicsWorldCreationParams } from '@rapidajs/rapida-physics';
import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Runtime } from '../runtime';
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

type RendererFactories = {
  webgl: (params: WebGLRendererParams) => WebGLRenderer;
  css: (params: CSSRendererParams) => CSSRenderer;
};

type WorldFactories = {
  space: (params?: SpaceParams) => Space;
  camera: (params?: CameraParams) => Camera;
  scene: (params?: SceneParams) => Scene;
  physics: (params: PhysicsWorldCreationParams) => Physics;
  renderer: RendererFactories;
};

/**
 * Params for creating a world
 */
type WorldParams = {
  /**
   * The unique id for the world
   */
  id?: string;

  /**
   * The runtime the world is in
   */
  runtime: Runtime;
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
   * The runtime the world is in
   */
  runtime: Runtime;

  /**
   * The event system for the world
   */
  private events = new EventSystem();

  /**
   * Constructor for a World
   * @param id a unique id for the world
   */
  constructor({ id, runtime }: WorldParams) {
    this.id = id || uuid();
    this.runtime = runtime;
    this.queryManager = new QueryManager(this);
    this.systemManager = new SystemManager(this);
    this.rendererManager = new RendererManager();
  }

  /**
   * Adds a system to the World
   * @param system the system to add to the world
   */
  addSystem(system: System): World {
    this.systemManager.addSystem(system);
    return this;
  }

  /**
   * Removes from the scene
   * @param value the value to remove
   */
  remove(value: System | Space | Scene | Physics | Camera): World {
    if (value instanceof System) {
      this.systemManager.removeSystem(value);
    } else if (value instanceof Space) {
      this.spaces.delete(value.id);
      value.destroy();
    } else if (value instanceof Scene) {
      this.scenes.delete(value.id);
    } else if (value instanceof Physics) {
      this.physics.delete(value.id);
      value.destroy();
    } else if (value instanceof Camera) {
      this.cameras.delete(value.id);
    }

    return this;
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

    // Initialise physics
    this.physics.forEach((p) => {
      p.start();
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
  updatePhysics(): void {
    // update physics worlds
    this.physics.forEach((p) => {
      p.step();
    });
  }

  /**
   * Destroys the world
   */
  destroy(): void {
    this.rendererManager._destroy();
    this.systemManager._destroy();
    this.spaces.forEach((s) => s.destroy());
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
  private _rendererFactories: RendererFactories = {
    webgl: (params: WebGLRendererParams): WebGLRenderer => {
      const renderer = new WebGLRenderer(params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
    css: (params: CSSRendererParams): CSSRenderer => {
      const renderer = new CSSRenderer(params);
      this.rendererManager.addRenderer(renderer);

      return renderer;
    },
  };

  /**
   * Factories for creating something new in a world
   */
  private _factories: WorldFactories = {
    space: (params?: SpaceParams): Space => {
      const space = new Space(this, params);
      this.spaces.set(space.id, space);

      if (this.initialised) {
        space._init();
      }

      return space;
    },
    camera: (params?: CameraParams): Camera => {
      const camera = new Camera(this, params);
      this.cameras.set(camera.id, camera);

      return camera;
    },
    scene: (params?: SceneParams): Scene => {
      const scene = new Scene(params);
      this.scenes.set(scene.id, scene);

      return scene;
    },
    physics: (params: PhysicsWorldCreationParams): Physics => {
      const physics = new Physics(params);
      this.physics.set(physics.id, physics);

      if (this.initialised) {
        physics.start();
      }

      return physics;
    },
    renderer: this._rendererFactories,
  };

  /**
   * Retrieves world factories
   */
  public get create(): WorldFactories {
    return this._factories;
  }
}

export { World, WorldParams };
