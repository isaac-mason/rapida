import { Event, EventHandler, EventSystem } from '@isaacmason/rapida-common';
import * as three from 'three';
import {
  ThreeCameraDestroyEvent,
  ThreeCameraInitEvent,
  THREE_CAMERA_DESTROY,
  THREE_CAMERA_INIT,
} from '../components/camera.component';
import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import { Runtime } from './runtime';

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
   * Entities managed by this EntityManager
   */
  entities: { [name: string]: Entity } = {};

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
    if (this.runtime.networkManager === undefined) {
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
      // Initialise all entities
      () => {
        Object.values(this.entities).map((e) => e.init());
      },
    ];

    // update lifecycle tasks
    this.updateJobs = [
      (timeElapsed: number) => {
        const dead: { [id: string]: Entity } = {};
        const alive: { [id: string]: Entity } = {};

        Object.values(this.entities).forEach((e) => {
          e.update(timeElapsed);

          if (e.alive) {
            alive[e.name] = e;
          } else {
            dead[e.name] = e;
          }

          Object.values(dead).forEach((d) => {
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
   * @param timeElapsed the time since the last update in seconds
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
   * Adds an entity
   * @param e the entity to add
   */
  add(e: Entity): Scene {
    e.setScene(this);
    this.entities[e.name] = e;
    this.threeScene.add(e.group);

    // initialise the entity if the scene has already been initialised
    if (this.initialised) {
      e.init();
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
  emit(event: Event): void {
    return this.events.emit(event);
  }
}

export { Scene, SceneParams, SceneType };
