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
        return this.recs.entityManager.createEntityInSpace(this);
      },
    };
  }

  /**
   * Removes an entity from the space
   * @param entity the entity to remove
   */
  remove(entity: Entity): Space {
    this.recs.entityManager.removeEntityFromSpace(entity, this);
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
   * Adds an entity to the space
   * @param value the entity to add
   * @private called internally, do not call directly
   */
  _add(entity: Entity): Space {
    this.entities.set(entity.id, entity);

    if (this.initialised) {
      this.recs.entityManager.initialiseEntity(entity);
    }

    return this;
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
    this.recs.entityManager.initialiseEntity(e);
  }
}