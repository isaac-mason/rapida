import { Component } from './component';
import { ComponentPool } from './component-pool';
import { Entity } from './entity';
import { EntityPool } from './entity-pool';
import { RECS } from './recs';
import { Space } from './space';

/**
 * EntityManager that manages Spaces that contain Entities, Entities themselves, and Components
 *
 * @private used internally, do not use directly
 */
export class EntityManager {
  /**
   * An object pool of entities
   */
  private entityPool = new EntityPool();

  /**
   * An object pool of components
   */
  private componentPool = new ComponentPool();

  /**
   * A map of ids to update functions for all entities
   */
  private entitiesToUpdate: Map<string, Entity> = new Map();

  /**
   * A map of ids to update functions for all components
   */
  private componentsToUpdate: Map<string, Component> = new Map();

  /**
   * Entities that need queries updated on the next update before they can be reused
   */
  private entitiesToCleanup: Entity[] = [];

  /**
   * Components that need queries updated on the next update before they can be reused
   */
  private componentsToCleanup: Component[] = [];

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
   * Steps entity event systems for all entities
   *
   * @param timeElapsed the time elapsed in seconds
   */
  updateEntities(): void {
    // update entities
    this.entitiesToUpdate.forEach((e) => e._update());
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
   * Recycles destroyed entities and components
   */
  recycle(): void {
    // recycle destroyed entities
    this.entitiesToCleanup
      .splice(0, this.entitiesToCleanup.length)
      .forEach((e) => {
        // reset the entity
        e._reset();

        // release the entity back into the entity pool
        this.entityPool.release(e);
      });

    // recycle destroyed components
    this.componentsToCleanup
      .splice(0, this.componentsToCleanup.length)
      .forEach((c) => {
        // clear the components entity field
        c.entity = null;

        // release the component back into the update pool
        this.componentPool.release(c);
      });
  }

  /**
   * Creates a new entity in a space
   *
   * Requests an entity from the entity object pool and initialises it in the space
   *
   * @param space the space to create a new entity in
   * @returns the provisioned entity
   */
  createEntityInSpace(space: Space): Entity {
    const entity = this.entityPool.request();
    entity.space = space;
    space.entities.set(entity.id, entity);
    space._add(entity);

    return entity;
  }

  /**
   * Initialises an entity
   *
   * @param entity the entity to initialise
   */
  initialiseEntity(entity: Entity): void {
    // initialise the entity
    entity._init();

    // add entity update to the update pool
    this.entitiesToUpdate.set(entity.id, entity);
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
    // todo - change to just take component
    this.recs.queryManager.onEntityComponentAdded(component.entity, component);
  }

  /**
   * Removes an entity from a space and releases it to the entity object pool
   *
   * @param entity the entity to release
   */
  removeEntityFromSpace(entity: Entity, space: Space): void {
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

    // destroy the entity
    entity._destroy();

    // stage the entity for cleanup and reset on the next update
    this.entitiesToCleanup.push(entity);
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

    return component as T;
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
    entity.components.delete(component._class);

    // stage the component for cleanup on the next update
    this.componentsToCleanup.push(component);
  }
}
