import {
  Physics,
  PhysicsWorldCreationParams,
} from '@rapidajs/rapida-physics';
import {
  Event,
  EventHandler,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Runtime } from '../runtime';
import { Scene, SceneParams } from '../scene';
import { View, ViewParams } from '../view';
import {
  System,
  Space,
  SpaceParams,
  SystemManager,
  QueryManager,
} from '../ecs';
import { Camera, CameraParams } from '../camera';

type WorldFactories = {
  space: (params?: SpaceParams) => Space;
  view: (params: ViewParams) => View;
  camera: (params?: CameraParams) => Camera;
  scene: (params?: SceneParams) => Scene;
  physics: (params: PhysicsWorldCreationParams) => Physics;
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
 * A World that can contain systems, spaces containing entities, scenes, physics worlds, and views
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
   * Views for the world
   */
  views: Map<string, View> = new Map();

  /**
   * Cameras for the world
   */
  cameras: Map<string, Camera> = new Map();

  /**
   * The runtime the world is in
   */
  runtime: Runtime;

  /**
   * Whether the world has been initialised
   */
  initialised = false;

  /**
   * The system manager for the world
   */
  systemManager: SystemManager;

  /**
   * The query manager for the world
   */
  queryManager: QueryManager;

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
  remove(value: System | Space | Scene | Physics | View | Camera): World {
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
    } else if (value instanceof View) {
      this.views.delete(value.id);
    } else if (value instanceof Camera) {
      this.cameras.delete(value.id);
      value.destroy();
    }

    return this;
  }

  /**
   * Initialises the world
   */
  init(): void {
    // Initialise systems
    this.systemManager._init();

    // Initialise spaces
    this.spaces.forEach((s) => {
      s._init();
    });

    // Initialise cameras
    this.cameras.forEach((c) => {
      c._init();
    });

    // Initialise views
    this.views.forEach((v) => {
      v._init();
    });

    // Initialise physics
    this.physics.forEach((p) => {
      p.start();
    });

    // Set the world to be initialised
    this.initialised = true;
  }

  /**
   * Updates the world
   * @param timeElapsed the time elapsed in milliseconds
   */
  update(timeElapsed: number): void {
    // update systems
    this.systemManager._update(timeElapsed);

    // update spaces
    this.spaces.forEach((s) => {
      s._update(timeElapsed);
    });
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
   * Handles resizing
   */
  onResize(): void {
    this.views.forEach((v) => v._onResize());
  }

  /**
   * Destroys the world
   */
  destroy(): void {
    this.systemManager.destroy();
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
  on<_E extends Event | Event>(
    eventName: string,
    handler: EventHandler
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
    view: (params: ViewParams): View => {
      const view = new View(this, params);
      this.views.set(view.id, view);

      if (this.initialised) {
        view._init();
      }

      return view;
    },
    camera: (params?: CameraParams): Camera => {
      const camera = new Camera(this, params);
      this.cameras.set(camera.id, camera);

      if (this.initialised) {
        camera._init();
      }

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
  };

  /**
   * Retrieves world factories
   */
  public get create(): WorldFactories {
    return this._factories;
  }
}

export default World;

export { World, WorldParams };
