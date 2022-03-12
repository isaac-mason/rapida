import { uuid } from '@rapidajs/rapida-common';
import { Entity } from './entity';
import { Space } from './space';

export type ComponentClass<T extends Component | Component = Component> = {
  new (...args: never[]): T;
};

/**
 * Component that has data and behavior through lifecycle hooks, and can be added to an entity.
 *
 * This class should be extended to add fields for data, and to set the methods `construct`, `onInit`, `onUpdate`, and `onDestroy`.
 *
 * A constructor should not be added to classes extending `Component`. See the documentation for the `construct` method for initializing properties.
 */
export abstract class Component {
  /**
   * The class the component was constructed from
   */
  class!: ComponentClass;

  /**
   * This component instances unique id
   */
  id: string = uuid();

  /**
   * Gets the entity for the component. Available during init call.
   */
  get entity(): Entity {
    return this._entity as Entity;
  }

  /**
   * Sets what entity the component belongs to
   * @param entity the entity
   */
  set entity(entity: Entity | undefined) {
    this._entity = entity;
  }

  /**
   * The Space the components entity is in
   */
  get space(): Space {
    return this.entity.space;
  }

  /**
   * The entity this component belongs to. Set on adding to an Entity.
   */
  private _entity?: Entity;

  /**
   * Method for "constructing" a component instance.
   *
   * If a component has properties, this method should be implemented to set initial values for all of them.
   *
   * If a component is a tag with no properties, this method does not need to be implemented.
   *
   * Non-static component properties should not have values defined in the constructor, but should be initialised in this `construct` method.
   * The reason for this is component object instances will be reused, so in order to prevent unexpected behavior, they should be initialised in the `construct` method,
   * which will be executed as part of component reuse to return it to the starting state.
   *
   * The recommended way to handle this in TypeScript is to use the not-null operator for added properties, acting as a 'late-init' syntax for properties.
   * This is safe as the `construct` method will always be run before `onUpdate` and `onDestroy`, and the component will not be accessible by system queries until `construct` has run.
   * For example:
   *
   * ```ts
   * class MyComponent extends Component {
   *   exampleProperty!: number;
   *
   *   construct(): void {
   *     this.exampleProperty = 1; // here we initialise the value of exampleProperty
   *   }
   *
   *   onUpdate(): void {
   *     // because we used the not-null operator `!:` the type of `this.exampleProperty` here will be `number`, as opposed to `number | undefined`
   *     this.exampleProperty += 1;
   *   }
   * }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function, class-methods-use-this
  construct(..._args: any[]) {}

  /**
   * Destruction logic
   */
  onDestroy(): void {}

  /**
   * Initialisation logic
   */
  onInit(): void {}

  /**
   * Update logic for the component
   * If this method is not implemented in a component it will not be added to the update job pool
   * @param timeElapsed the time since the last update for this component in seconds
   * @param time the current time in seconds
   */
  onUpdate(_timeElapsed: number, _time: number) {}
}
