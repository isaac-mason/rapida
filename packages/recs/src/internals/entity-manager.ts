import { uuid } from '@rapidajs/rapida-common';
import { Component } from '../component';
import { ComponentPool } from './component-pool';
import { Entity } from '../entity';
import { EntityPool } from './entity-pool';
import { RECS } from '../recs';
import { Space } from '../space';

/**
 * EntityManager that manages Spaces that contain Entities, Entities themselves, and Components
 *
 * @private used internally, do not use directly
 */
export class EntityManager {
  /**
   * An object pool of components
   */
  private componentPool = new ComponentPool();

  /**
   * Components that need queries updated on the next update before they can be reused
   */
  private componentsToCleanup: Component[] = [];

  /**
   * A map of ids to update functions for all components
   */
  private componentsToUpdate: Map<string, Component> = new Map();

  /**
   * Entities that need queries updated on the next update before they can be reused
   */
  private entitiesToCleanup: Entity[] = [];

  /**
   * A map of ids to update functions for all entities
   */
  private entitiesToUpdate: Map<string, Entity> = new Map();

  /**
   * An object pool of entities
   */
  private entityPool = new EntityPool();

  /**
   * The RECS instance the entity manager is part of
   */
  private recs: RECS;

  /**
   * Constructs a new EntityManager
   * @param recs the RECS instance the entity manager is part of
   */
  constructor(recs: RECS) {
    this.recs = recs;
  }

  /**
   * Adds a component to an entity
   *
   * @param entity the entity to add to
   * @param constr the component to add
   */
  addComponentToEntity<T extends Component>(
    entity: Entity,
    constr: { new (...args: never[]): T },
    ...args: Parameters<T['construct']>
  ): T {
    // request a component from the component pool
    const component = this.componentPool.request(constr);

    // set the components entity
    component.entity = entity;

    // construct the component instance with args if they are present
    if (args.length > 0) {
      component.construct(...args);
    } else {
      component.construct();
    }

    // add the component to the entity components maps
    entity.components.set(constr, component);

    // initialise the component if the entity is already initialised
    if (entity.initialised) {
      this.initialiseComponent(component);
    }

    return component as T;
  }

  /**
   * Creates a new entity in a space
   *
   * Requests an entity from the entity object pool and initialises it in the space
   *
   * @param space the space to create a new entity in
   * @returns the provisioned entity
   */
  createEntity(space: Space): Entity {
    const entity = this.entityPool.request();
    entity.space = space;
    space.entities.set(entity.id, entity);

    if (space.initialised) {
      this.recs.entityManager.initialiseEntity(entity);
    }

    return entity;
  }

  /**
   * Destroys a space
   * @param space the space to destroy
   */
  destroySpace(space: Space): void {
    space.entities.forEach((e) => this.removeEntity(e, space));
  }

  /**
   * Initialises a component
   *
   * @param component the component to initialise
   */
  initialiseComponent(component: Component): void {
    // run component initialisation logic
    if (component.onInit) {
      component.onInit();
    }

    // add the components `onUpdate` method to the component update pool if present
    if (component.onUpdate) {
      this.componentsToUpdate.set(component.id, component);
    }

    // inform the query manager that the component has been initialised
    this.recs.queryManager.onEntityComponentAdded(component.entity, component);
  }

  /**
   * Initialises an entity
   *
   * @param entity the entity to initialise
   */
  initialiseEntity(entity: Entity): void {
    // initialise the entity
    entity.initialised = true;

    // initialise components
    entity.components.forEach((c) => this.initialiseComponent(c));

    // add entity update to the update pool
    this.entitiesToUpdate.set(entity.id, entity);
  }

  /**
   * Initialises a space
   * @param space the space to initialise
   */
  initialiseSpace(space: Space): void {
    space.initialised = true;
    space.entities.forEach((e) => this.initialiseEntity(e));
  }

  /**
   * Recycles destroyed entities and components
   */
  recycle(): void {
    // recycle destroyed entities
    this.entitiesToCleanup
      .splice(0, this.entitiesToCleanup.length)
      .forEach((e) => {
        // reset the entity
        e.id = uuid();
        e.events.reset();

        // release the entity back into the entity pool
        this.entityPool.release(e);
      });

    // recycle destroyed components
    this.componentsToCleanup
      .splice(0, this.componentsToCleanup.length)
      .forEach((c) => {
        // clear the components entity field
        c.entity = undefined;

        // release the component back into the update pool
        this.componentPool.release(c);
      });
  }

  /**
   * Removes a component from an entity
   *
   * @param entity the entity to remove from
   * @param component the component to remove
   * @param notifyQueryManager whether the query manager should be notified
   */
  removeComponentFromEntity(
    entity: Entity,
    component: Component,
    notifyQueryManager: boolean
  ): void {
    // remove the onUpdate method from the component update pool
    if (component.onUpdate) {
      this.componentsToUpdate.delete(component.id);
    }

    // run the onDestroy method
    if (component.onDestroy) {
      component.onDestroy();
    }

    if (notifyQueryManager) {
      // tell the query manager that the component has been removed from the entity
      this.recs.queryManager.onEntityComponentRemoved(entity, component);
    }

    // remove the component from the components maps
    entity.components.delete(component.class);

    // stage the component for cleanup on the next update
    this.componentsToCleanup.push(component);
  }

  /**
   * Removes an entity from a space and releases it to the entity object pool
   *
   * @param entity the entity to release
   */
  removeEntity(entity: Entity, space: Space): void {
    // remove the entity from the space entities map
    space.entities.delete(entity.id);

    // remove entity update from the update pool
    this.entitiesToUpdate.delete(entity.id);

    // emit the entity destroy event to the space
    this.recs.queryManager.onEntityRemoved(entity);

    // destroy components without notifying the query manager
    entity.components.forEach((c) =>
      this.removeComponentFromEntity(entity, c, false)
    );

    // mark the entity as dead
    entity.alive = false;

    // stage the entity for cleanup and reset on the next update
    this.entitiesToCleanup.push(entity);
  }

  /**
   * Run update `onUpdate` methods for all components that have them defined
   *
   * @param timeElapsed the time elapsed in seconds
   * @param time the current time in seconds
   */
  updateComponents(timeElapsed: number, time: number): void {
    this.componentsToUpdate.forEach(
      (c) => c.onUpdate && c.onUpdate(timeElapsed, time)
    );
  }

  /**
   * Steps entity event systems for all entities
   *
   * @param timeElapsed the time elapsed in seconds
   */
  updateEntities(): void {
    // update entities
    this.entitiesToUpdate.forEach((e) => e.events.tick());
  }
}
