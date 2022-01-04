import {
  Event,
  EventHandler,
  EventSubscription,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Entity } from './entity';
import { RECS } from './recs';

/**
 * Params for creating a new Space
 */
export type SpaceParams = {
  /**
   * An id for the space, must be unique
   */
  id?: string;
};

/**
 * Space that contains entities and manages entities and their lifecycle.
 *
 * Spaces can be added to a RECS instance and then affected by the systems in the RECS.
 */
export class Space {
  /**
   * A unique ID for the space
   */
  id: string;

  /**
   * The RECS instance the space is in
   */
  recs: RECS;

  /**
   * Entities in the space
   */
  entities: Map<string, Entity> = new Map();

  /**
   * Whether the space has been initialised
   */
  private initialised = false;

  /**
   * The spaces event system
   */
  private events = new EventSystem({ queued: true });

  /**
   * Constructor for the Space
   * @param params the parameters for the space
   */
  constructor(recs: RECS, params?: SpaceParams) {
    this.recs = recs;
    this.id = params?.id || uuid();
  }

  /**
   * Retrieves space factories
   */
  public get create(): {
    /**
     * Creates a new entity in the space
     * @returns a new entity
     */
    entity: () => Entity;
  } {
    return {
      entity: (): Entity => {
        const entity = this.recs.entityPool.request();
        entity.space = this;
        this.add(entity);
        return entity;
      },
    };
  }

  /**
   * Adds an entity to the space
   * @param value the entity to add
   */
  add(entity: Entity): Space {
    this.entities.set(entity.id, entity);

    if (this.initialised) {
      this.initialiseEntity(entity);
    }

    return this;
  }

  /**
   * Removes an entity from the space
   * @param value the entity to remove
   */
  remove(value: Entity): Space {
    // remove the entity from the entities map
    this.entities.delete(value.id);

    // remove entity update from the RECS update pool
    this.recs._entitiesToUpdate.delete(this.id);

    // emit the entity destroy event to the space
    this.recs.queryManager.onEntityRemoved(value);

    // destroy the entity
    value.destroy();

    // reset the entity for object reuse
    value._reset();

    // release the entity back into the entity pool
    this.recs.entityPool.release(value);

    return this;
  }

  /**
   * Adds a handler for space events
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   * @returns the id of the new handler
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): EventSubscription {
    return this.events.on(eventName, handler);
  }

  /**
   * Broadcasts an event for handling by the space
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Destroys the space and removes it from the RECS
   */
  destroy(): void {
    this.recs.remove(this);
  }

  /**
   * Initialise the space
   * @private called internally, do not call directly
   */
  _init(): void {
    this.initialised = true;
    this.entities.forEach((e) => this.initialiseEntity(e));
  }

  /**
   * Updates the space by stepping the spaces event system
   * @param timeElapsed the time since the last update in seconds
   * @private called internally, do not call directly
   */
  _updateEvents(): void {
    this.events.tick();
  }

  /**
   * Updates all entities within the space
   * @param timeElapsed the time since the last update in seconds
   * @private called internally, do not call directly
   */
  _updateEntities(): void {
    const dead: Entity[] = [];
    const alive: Entity[] = [];

    this.entities.forEach((e) => {
      if (e.alive) {
        alive.push(e);
      } else {
        dead.push(e);
      }
    });

    dead.forEach((d) => {
      this.remove(d);
    });
  }

  /**
   * Destroys all entities from the space
   * @private called internally, do not call directly
   */
  _destroy(): void {
    this.entities.forEach((e) => this.remove(e));
  }

  /**
   * Initialises an entity in a space
   * @param e the entity to initialise
   */
  private initialiseEntity(e: Entity): void {
    // initialise the entity
    e._init();

    // add entity update to the update pool
    this.recs._entitiesToUpdate.set(this.id, e);
  }
}
