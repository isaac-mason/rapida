import {
  Event,
  EventHandler,
  EventSubscription,
  EventSystem,
  uuid,
} from '@rapidajs/rapida-common';
import { Component } from './component';
import { Space } from './space';

/**
 * Entity that contains components and calls component lifecycle methods
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
   * Whether the entity is alive
   * If false, the entity will be destroyed by the Space on the next update
   */
  alive = true;

  /**
   * Whether the entity has been initialised
   */
  initialised = false;

  /**
   * The space the entity is in
   */
  space!: Space;

  /**
   * The event system for the entity
   */
  private events = new EventSystem();

  /**
   * Map of component names to components
   */
  private _componentNamesToComponents: Map<string, Component> = new Map();

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
    const component = this.space.recs.componentPool.request(constr);

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
    this._componentNamesToComponents.set(
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
      this.space.recs._componentUpdatePool.delete(component.id);
    }

    // run the onDestroy method
    if (component.onDestroy) {
      component.onDestroy();
    }

    // clear the components entity field
    component.entity = null;

    // remove the component from the components maps
    this.components.delete(component.id);
    this._componentNamesToComponents.delete(Component.getComponentName(value));

    // tell the query manager that the component has been removed from the entity
    this.space.recs.queryManager.onEntityComponentRemoved(this, component);

    // release the component back into the update pool
    this.space.recs.componentPool.release(component);

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
    return this._componentNamesToComponents.has(
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
      this._componentNamesToComponents.get(Component.getComponentName(value));

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
   */
  _init(): Entity {
    // add entity update to the update pool
    this.space.recs._entityUpdatePool.set(this.id, () => {
      // Process events in the buffer
      this.events.tick();
    });

    // initialise components
    this.components.forEach((c) => this.initialiseComponent(c));

    this.initialised = true;

    return this;
  }

  /**
   * Resets the entity in preparation for object reuse
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
      this.space.recs._componentUpdatePool.set(
        component.id,
        component.onUpdate
      );
    }

    this.space.recs.queryManager.onEntityComponentAdded(this, component);
  }
}
