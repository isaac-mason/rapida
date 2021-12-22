import { uuid } from '@rapidajs/rapida-common';
import { Entity } from './entity';
import { Space } from './space';

export type ComponentParams = {
  id?: string;
};

/**
 * Component that has data and behavior through lifecycle hooks, and can be added to an entity.
 *
 * This class should be extended to add fields for data, and to set the methods `onInit`, `onUpdate`, and `onDestroy`.
 */
export abstract class Component {
  /**
   * This component instances unique id
   */
  id: string;

  /**
   * The entity this component belongs to. Set on adding to an Entity.
   */
  private _entity?: Entity;

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
  set entity(entity: Entity) {
    this._entity = entity;
  }

  /**
   * The Space the components entity is in
   */
  get space(): Space {
    return this.entity.space;
  }

  /**
   * Constructor for a Component
   * @param name a unique name for the component
   */
  constructor(params?: ComponentParams) {
    this.id = params?.id || uuid();
  }

  /**
   * Initialisation logic. The entity will be available in this method.
   */
  onInit: (() => void) | undefined = undefined;

  /**
   * Update logic for the component
   * If this method is not implemented in a component it will not be added to the update job pool
   * @param timeElapsed the time since the last update for this component in milliseconds
   */
  onUpdate: ((timeElapsed: number) => void) | undefined = undefined;

  /**
   * Destruction logic
   */
  onDestroy: (() => void) | undefined = undefined;

  /**
   * Gets the component name
   * @param value the component constructor, component instance, or component string name
   * @returns the component name
   */
  static getComponentName<T extends Component | Component>(
    value:
      | {
          new (...args: never[]): T;
        }
      | Component
      | string
  ): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value instanceof Component) {
      return value.constructor.name;
    }
    return value.name;
  }
}
