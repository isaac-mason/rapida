import { Event, EventHandler, EventSystem } from '@isaacmason/rapida-common';
import {
  Physics,
  PhysicsWorldCreationParams,
} from '@isaacmason/rapida-physics';
import * as three from 'three';
import Camera, {
  ThreeCameraDestroyEvent,
  ThreeCameraInitEvent,
  THREE_CAMERA_DESTROY,
  THREE_CAMERA_INIT,
} from '../camera';
import { Entity } from '../ecs/entity';
import { System } from '../ecs/system';
import {
  AddEntityToSceneEvent,
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
} from '../events/scene-events';
import { NetworkManager } from '../network/network-manager';
import { Runtime } from '../runtime';
import { SceneProvider, SceneProviderParams } from './scene-provider';

/**
 * Scene type enum
 */
enum SceneType {
  OFFLINE = 'OFFLINE',
  NETWORKED = 'NETWORKED',
}

/**
 * Params for creating a new scene
 */
type SceneParams = {
  runtime: Runtime;
  networkManager?: NetworkManager;
  physicsParams?: PhysicsWorldCreationParams;
};

/**
 * A scene that can contain entities and can be networked
 */
class Scene {
  /**
   * The unique ID for the scene
   */
  id: string;

  /**
   * The runtime the scene is in
   */
  runtime: Runtime;

  /**
   * The type of scene
   */
  sceneType: SceneType;

  /**
   * Cameras in the scene
   */
  cameras: Map<string, Camera> = new Map();

  /**
   * The currently active camera
   * TODO - support for multiple cameras
   */
  camera?: Camera;

  /**
   * Entities in the scene
   */
  entities: Map<string, Entity> = new Map();

  /**
   * Systems in the scene
   */
  systems: Map<string, System> = new Map();

  /**
   * The three js scene.
   * Components have a reference to this scene and can add themselves to the three js scene
   */
  threeScene: three.Scene = new three.Scene();

  /**
   * The physics world
   */
  physics: Physics;

  /**
   * Getter for the runtime network manager
   */
  get networkManager(): NetworkManager {
    if (
      this.sceneType === SceneType.OFFLINE ||
      this.runtime.networkManager === undefined
    ) {
      throw new Error('network manager is not set on runtime');
    }
    return this.runtime.networkManager;
  }

  /**
   * Whether the scene has been initialised
   * If the scene has already been initialised, when adding a new entity to the scene, the scene will initialise the entity
   */
  initialised = false;

  /**
   * The scenes event system
   */
  private events = new EventSystem();

  /**
   * Functions to be called when the init method is called
   */
  private initJobs: (() => void)[];

  /**
   * Functions to be called when the update method is called
   */
  private updateJobs: ((timeElapsed: number) => void)[];

  /**
   * Functions to be called when the destroy method is called
   */
  private destroyJobs: (() => void)[];

  /**
   * Constructor for the scene
   * @param id the unique id for the scene
   * @param params the parameters for the scene
   */
  constructor(id: string, params: SceneParams) {
    this.id = id;

    // create the physics world
    this.physics = new Physics(params.physicsParams || {});

    // init lifecycle tasks
    this.initJobs = [
      () => {
        // Initialise the physics world
        this.physics.start();

        // Initialise systems
        this.systems.forEach((s) => {
          if (s.onSystemInit !== undefined) {
            s.onSystemInit();
          }
        });

        // Initialise entities
        this.entities.forEach((e) => e.init());

        // Initialise cameras
        this.cameras.forEach((c) => c.init());
      },
    ];

    // update lifecycle tasks
    this.updateJobs = [
      (timeElapsed: number) => {
        // update systems
        this.systems.forEach((s) => {
          if (s.onUpdate !== undefined) {
            s.onUpdate(timeElapsed);
          }
        });

        // update entities
        const dead: Entity[] = [];
        const deadIds: string[] = [];
        const alive: Entity[] = [];

        this.entities.forEach((e) => {
          // update the entity
          e.update(timeElapsed);

          // check if the entity is still alive
          if (e.alive) {
            alive.push(e);
          } else {
            dead.push(e);
            deadIds.push(e.id);
          }
        });

        // remove dead entities
        dead.forEach((d) => {
          this.entities.delete(d.name);
          this.threeScene.remove(d.group);
          d.destroy();
        });
      },
    ];

    // destroy lifecycle tasks
    this.destroyJobs = [
      () => {
        this.systems.forEach((s) => s.destroy());
        this.entities.forEach((e) => e.destroy());
        this.physics.destroy();
      },
    ];

    // add handlers for registering the camera
    this.on(THREE_CAMERA_INIT, (event: ThreeCameraInitEvent): void => {
      this.camera = event.data.camera;
      this.runtime.onWindowResize();
    });
    this.on(THREE_CAMERA_DESTROY, (_event: ThreeCameraDestroyEvent): void => {
      this.camera = undefined;
    });

    // set the runtime
    this.runtime = params.runtime;

    // set the room if provided and set the room type
    if (params.networkManager) {
      this.runtime.networkManager = params.networkManager;
      this.sceneType = SceneType.NETWORKED;
      this.updateJobs.push(() => {
        this.runtime.networkManager?.tick();
      });
    } else {
      this.sceneType = SceneType.OFFLINE;
    }
  }

  /**
   * Initialise the scene
   */
  init(): void {
    this.initJobs.forEach((i) => i());
    this.events.start();
    this.initialised = true;
  }

  /**
   * Updates all entities within the scene
   * @param timeElapsed the time since the last update in milliseconds
   */
  update(timeElapsed: number): void {
    this.updateJobs.forEach((u) => u(timeElapsed));
  }

  /**
   * Steps the physics world
   */
  updatePhysics(): void {
    this.physics.step();
  }

  /**
   * Destroy all entities
   */
  destroy(): void {
    this.destroyJobs.forEach((d) => d());
  }

  /**
   * Adds an entity to the scene
   * @param e the entity or system to add
   */
  add(value: Entity | System | Camera): Scene {
    value.scene = this;

    if (value instanceof Entity) {
      // add the entity
      this.entities.set(value.name, value);
      this.threeScene.add(value.group);

      // initialise if the scene has already been initialised
      if (this.initialised) {
        value.init();
      }

      // emit the entity to the scene
      this.emit<AddEntityToSceneEvent>({
        topic: ADD_ENTITY_TO_SCENE_EVENT_NAME,
        data: {
          entity: value,
        },
      });
    } else if (value instanceof System) {
      // add the system
      this.systems.set(value.name, value);

      // retroactively add entities to the system
      Object.values(this.entities)
        .filter((e) => value.entityFilter && value.entityFilter(e))
        .forEach((e) => value.addEntity(e));

      // initialise if the scene has already been initialised
      if (this.initialised && value.onSystemInit) {
        value.onSystemInit();
      }
    } else if (value instanceof Camera) {
      // add the camera
      this.cameras.set(value.name, value);
    }

    return this;
  }

  /**
   * Removes an entity or a system from the scene
   * @param value the entity or system to remove
   */
  remove(value: Entity | System): Scene {
    if (value instanceof Entity) {
      // remove the entity from the scene
      this.entities.delete(value.name);

      // destroy the entity
      value.destroy();

      // emit the entity destroy event to the scene
      this.emit<RemoveEntityFromSceneEvent>({
        topic: REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
        data: {
          entity: value,
        },
      });
    } else if (value instanceof System) {
      // remove the system
      this.systems.delete(value.name);
      if (value.onSystemDestroy) {
        value.onSystemDestroy();
      }
    }

    return this;
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
}

export default Scene;

export { SceneParams, SceneType, SceneProvider, SceneProviderParams };
