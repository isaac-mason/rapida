import {
  Event,
  EventHandler,
  EventSubscription,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { RECS } from './recs';
import { Component } from './component';
import { Space } from './space';

/**
 * Entity with a unique id that contains Components, which contain data and behavior
 */
export class Entity {
  /**
   * The unique ID of the entity
   */
  id = uuid();

  /**
   * Map of component ids to components
   */
  components: Map<string, Component> = new Map();

  /**
   * Whether the entity is alive. If false, the entity will be destroyed by the Space on the next update
   */
  alive = true;

  /**
   * The space the entity is in
   */
  space!: Space;

  /**
   * The RECS instance the entity is in
   */
  get recs(): RECS {
    return this.space.recs;
  }

  /**
   * Whether the entity has been initialised
   */
  private initialised = false;

  /**
   * The event system for the entity
   */
  private events = new EventSystem();

  /**
   * Map of component names to components
   */
  private componentNamesToComponents: Map<string, Component> = new Map();

  /**
   * Destroy the entities components and set the entity as dead
   */
  destroy(): void {
    // destroy components
    this.components.forEach((c) => c.onDestroy && c.onDestroy());
    this.alive = false;
  }

  /**
   * Adds a component to the entity
   * @param c the component to add
   */
  addComponent<T extends Component>(
    constr: { new (...args: never[]): T },
    ...args: Parameters<T['construct']>
  ): T {
    // request a component from the component pool
    const component = this.recs.componentPool.request(constr);

    // set the components entity
    component.entity = this;

    // construct the component instance with args if they are present
    if (args.length > 0) {
      component.construct(...args);
    } else {
      component.construct();
    }

    // add the component to the entity components maps
    this.components.set(component.id, component);
    this.componentNamesToComponents.set(
      Component.getComponentName(constr),
      component
    );

    if (this.initialised) {
      this.initialiseComponent(component);
    }

    return component;
  }

  /**
   * Removes a component from the entity and destroys it
   * The value can either be a Component constructor, or the component instance itself
   * @param value the component to remove and destroy
   */
  removeComponent(
    value:
      | Component
      | {
          new (...args: never[]): Component;
        }
  ): Entity {
    let component: Component;

    // retrieve the component from the entity
    if (value instanceof Component) {
      if (!this.components.has(value.id)) {
        throw new Error('Component does not exist in Entity');
      }
      component = value;
    } else {
      const c = this.find(value);
      if (!c) {
        throw new Error('Component does not exist in Entity');
      }
      component = c;
    }

    // remove the onUpdate method from the component update pool
    if (component.onUpdate) {
      this.recs._componentsToUpdate.delete(component.id);
    }

    // run the onDestroy method
    if (component.onDestroy) {
      component.onDestroy();
    }

    // clear the components entity field
    component.entity = null;

    // remove the component from the components maps
    this.components.delete(component.id);
    this.componentNamesToComponents.delete(Component.getComponentName(value));

    // tell the query manager that the component has been removed from the entity
    this.recs.queryManager.onEntityComponentRemoved(this, component);

    // release the component back into the update pool
    this.recs.componentPool.release(component);

    return this;
  }

  /**
   * Returns whether the entity contains the given component
   * @param constr the component constructor, a component instance, or the string name of the component
   * @returns whether the entity contains the given component
   */
  has(
    value:
      | {
          new (...args: never[]): Component;
        }
      | Component
      | string
  ): boolean {
    return this.componentNamesToComponents.has(
      Component.getComponentName(value)
    );
  }

  /**
   * Retrieves a component on an entity by type, throws an error if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component
   */
  get<T extends Component | Component>(
    value:
      | {
          new (...args: never[]): T;
        }
      | Component
      | string
  ): T {
    const component: T | undefined = this.find(value);

    if (component) {
      return component;
    }

    throw new Error(`Component ${value}} not in entity ${this.id}`);
  }

  /**
   * Retrieves a component on an entity by type, returns undefined if the component is not in the entity
   * @param value a constructor for the component type to retrieve
   * @returns the component if it is found, or undefined
   */
  find<T extends Component | Component>(
    value:
      | {
          new (...args: never[]): T;
        }
      | Component
      | string
  ): T | undefined {
    const component: Component | undefined =
      this.componentNamesToComponents.get(Component.getComponentName(value));

    if (component) {
      return component as T;
    }

    return undefined;
  }

  /**
   * Adds a handler for entity events
   * @param eventName the event name
   * @param handler the handler function
   * @returns the subscription
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): EventSubscription {
    return this.events.on(eventName, handler);
  }

  /**
   * Broadcasts an event for handling by the entity
   * @param event the event to broadcast
   */
  emit<E extends Event | Event>(event: E): void {
    return this.events.emit(event);
  }

  /**
   * Initialise the entity
   * @private called internally, do not call directly
   */
  _init(): Entity {
    this.initialised = true;

    // initialise components
    this.components.forEach((c) => this.initialiseComponent(c));

    return this;
  }

  /**
   * Updates the event system for the entity
   * @private called internally, do not call directly
   */
  _update(): void {
    this.events.tick();
  }

  /**
   * Resets the entity in preparation for object reuse
   * @private called internally, do not call directly
   */
  _reset(): void {
    this.id = uuid();
    this.events.reset();
  }

  /**
   * Initialises a component
   * @param component the component to initialise
   */
  private initialiseComponent(component: Component): void {
    if (component.onInit) {
      component.onInit();
    }

    if (component.onUpdate) {
      this.recs._componentsToUpdate.set(component.id, component);
    }

    this.recs.queryManager.onEntityComponentAdded(this, component);
  }
}
