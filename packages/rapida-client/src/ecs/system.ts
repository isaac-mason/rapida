import {
  Event,
  EventHandler,
  EventSystem,
  notEmpty,
} from '@isaacmason/rapida-common';
import { Physics } from '@isaacmason/rapida-physics';
import {
  AddEntityToSceneEvent,
  ADD_ENTITY_TO_SCENE_EVENT_NAME,
  RemoveEntityFromSceneEvent,
  REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
} from '../events/scene-events';
import { Entity } from './entity';
import { NetworkManager } from '../network/network-manager';
import Scene, { SceneType } from '../scene';

type SystemEntityFilter = (e: Entity) => boolean;

type ComponentType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): any;
};

const SystemEntityFilters: {
  [name: string]: (components: ComponentType[]) => SystemEntityFilter;
} = {
  requireAll: (components: ComponentType[]) => (e: Entity) =>
    components.every((c: ComponentType) => notEmpty(e.getComponent(c))),
  requireAny: (components: ComponentType[]) => (e: Entity) =>
    components.some((c: ComponentType) => notEmpty(e.getComponent(c))),
};

/**
 * Abstract class for a System
 */
abstract class System {
  /**
   * The name for the system
   */
  name: string;

  /**
   * The scene the system is in
   */
  private _scene?: Scene;

  /**
   * Gets the scene. Always called on adding to a scene.
   */
  get scene(): Scene {
    return this._scene as Scene;
  }

  /**
   * Sets the scene
   */
  set scene(s: Scene) {
    this._scene = s;
  }

  /**
   * Getter for the runtime network manager
   */
  get networkManager(): NetworkManager {
    if (
      this._scene?.sceneType === SceneType.OFFLINE ||
      this.scene.networkManager === undefined
    ) {
      throw new Error('network manager is not set on runtime');
    }
    return this.scene.networkManager;
  }

  /**
   * Getter for the scenes physics world
   */
  get physics(): Physics {
    return this.scene.physics;
  }

  /**
   * The entities in the system
   */
  entities: Map<string, Entity> = new Map();

  /**
   * The event system for this system
   */
  events = new EventSystem();

  private _addEntityToSceneHandlerId?: string;

  private _removeEntityFromSceneHandlerId?: string;

  /**
   * Constructor for a System
   * @param name a unique name for the System
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * Initialises the system
   */
  init(): void {
    // add the entity filter if not undefined
    if (this.entityFilter !== undefined) {
      // add scene entity event handlers
      this._addEntityToSceneHandlerId = this.scene.on(
        ADD_ENTITY_TO_SCENE_EVENT_NAME,
        (e: AddEntityToSceneEvent) => {
          if ((this.entityFilter as SystemEntityFilter)(e.data.entity)) {
            this.addEntity(e.data.entity);
          }
        }
      );
      this._removeEntityFromSceneHandlerId = this.scene.on(
        REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
        (e: RemoveEntityFromSceneEvent) => {
          this.removeEntity(e.data.entity);
        }
      );
    }

    // run on system init hook
    if (this.onSystemInit) {
      this.onSystemInit();
    }

    // start the event system
    this.events.start();
  }

  /**
   * Destroy logic for the system
   */
  destroy(): void {
    // remove scene handlers
    if (this._addEntityToSceneHandlerId) {
      this.scene.removeHandler(
        ADD_ENTITY_TO_SCENE_EVENT_NAME,
        this._addEntityToSceneHandlerId
      );
    }
    if (this._removeEntityFromSceneHandlerId) {
      this.scene.removeHandler(
        REMOVE_ENTITY_FROM_SCENE_EVENT_NAME,
        this._removeEntityFromSceneHandlerId
      );
    }

    // stop the event system
    this.events.stop();

    // run on system destroy hook if present
    if (this.onSystemDestroy) {
      this.onSystemDestroy();
    }
  }

  /**
   * Adds an entity to the system
   * @param e the entity to add
   */
  addEntity(e: Entity): void {
    this.entities.set(e.id, e);
    if (this.onAdd) {
      this.onAdd(e);
    }
  }

  /**
   * Removes an entity from the system
   * @param e the entity to remove
   */
  removeEntity(e: Entity): void {
    this.entities.delete(e.id);
    if (this.onRemove) {
      this.onRemove(e);
    }
  }

  /**
   * Returns whether an entity is in the system
   * @param entityId the entity id to check
   * @returns whether the entity is in the system
   */
  hasEntityId(entityId: string): boolean {
    return this.entities.has(entityId);
  }

  /**
   * Adds an event handler for the system
   * @param eventName the event name
   * @param handler the event handler
   */
  on(eventName: string, handler: EventHandler): void {
    this.events.on(eventName, handler);
  }

  /**
   * Emits an event to the system
   * @param event the event to emit
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * The filter for whether entities should be added to the system
   */
  entityFilter?: SystemEntityFilter;

  /**
   * Logic for initialisation of the system. Called during System construction.
   */
  onSystemInit?: () => void = undefined;

  /**
   * Logic for destruction of the system. Called on removing a System from a Scene.
   */
  onSystemDestroy?: () => void = undefined;

  /**
   * Logic for a systems update loop
   * @param timeElapsed the time since the last update
   */
  onUpdate?: (timeElapsed: number) => void = undefined;

  /**
   * Logic for when an entity is added to the system
   * @param e the entity being added to the system
   */
  onAdd?: (e: Entity) => void = undefined;

  /**
   * Logic for when an entity is removed from the system
   * @param e the entity being removed from the system
   */
  onRemove?: (e: Entity) => void = undefined;
}

export { System, SystemEntityFilter, SystemEntityFilters };
