import {
  three,
  Event,
  EventHandler,
  EventSystem,
} from '@isaacmason/rapida-common';
import { System } from './system';
import {
  ThreeCameraDestroyEvent,
  ThreeCameraInitEvent,
  THREE_CAMERA_DESTROY,
  THREE_CAMERA_INIT,
} from '../components/camera.component';
import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import { Runtime } from './runtime';
import {
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  AddEntityToSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
} from '../events/scene-events';

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
   * Entities in the scene
   */
  entities: { [name: string]: Entity } = {};

  /**
   * Systems in the scene
   */
  systems: { [name: string]: System } = {};

  /**
   * The currently registered camera
   */
  camera?: three.PerspectiveCamera;

  /**
   * The three js scene.
   * Components have a reference to this scene and can add themselves to the three js scene
   */
  threeScene: three.Scene = new three.Scene();

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
  private initialised = false;

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

  constructor(id: string, params: SceneParams) {
    // set the id
    this.id = id;

    // init lifecycle tasks
    this.initJobs = [
      // Initialise all systems and entities
      () => {
        Object.values(this.systems).forEach((s) => {
          if (s.onSystemInit !== undefined) {
            s.onSystemInit();
          }
        });
        Object.values(this.entities).forEach((e) => e.init());
      },
    ];

    // update lifecycle tasks
    this.updateJobs = [
      (timeElapsed: number) => {
        Object.values(this.systems).map((s) => {
          if (s.onUpdate !== undefined) {
            s.onUpdate(timeElapsed);
          }
        });
      },
      (timeElapsed: number) => {
        const dead: { [id: string]: Entity } = {};
        const alive: { [id: string]: Entity } = {};

        Object.values(this.entities).map((e) => {
          e.update(timeElapsed);

          if (e.alive) {
            alive[e.name] = e;
          } else {
            dead[e.name] = e;
          }

          Object.values(dead).map((d) => {
            delete this.entities[d.name];
            this.threeScene.remove(d.group);
            d.destroy();
          });

          this.entities = alive;
        });
      },
    ];

    // destroy lifecycle tasks
    this.destroyJobs = [
      () => {
        Object.values(this.entities).map((e) => e.destroy());
      },
    ];

    // add handlers for registering the camera
    this.on(THREE_CAMERA_INIT, (event: ThreeCameraInitEvent): void => {
      this.camera = event.data.camera;
      this.runtime.onWindowResize();
    });
    this.on(
      THREE_CAMERA_DESTROY,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (event: ThreeCameraDestroyEvent): void => {
        this.camera = undefined;
      }
    );

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
   * Destroy all entities
   */
  destroy(): void {
    this.destroyJobs.forEach((d) => d());
  }

  /**
   * Adds an entity to the scene
   * @param e the entity or system to add
   */
  add(value: Entity | System): Scene {
    if (value instanceof Entity) {
      // add the entity
      value.scene = this;
      this.entities[value.name] = value;
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
      value.scene = this;
      this.systems[value.name] = value;

      // retroactively add entities to the system
      Object.values(this.entities)
        .filter((e) => value.entityFilter && value.entityFilter(e))
        .map((e) => value.addEntity(e));

      // initialise if the scene has already been initialised
      if (this.initialised && value.onSystemInit) {
        value.onSystemInit();
      }
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
      delete this.entities[value.name];

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
      delete this.systems[value.name];
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
  on(eventName: string, handler: EventHandler): string {
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

export { SceneParams, SceneType };
