import { uuid } from '@isaacmason/rapida-common';
import { World } from '../world';
import { Entity } from './entity';
import { Space } from './space';

type ComponentParams = {
  id?: string;
};

/**
 * Component that has data and behavior through lifecycle hooks, and can be added to an entity.
 *
 * This class should be extended to add fields for data, and to set the methods `onInit`, `onUpdate`, and `onDestroy`.
 */
abstract class Component {
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
   * The World the components entity is in
   */
  get world(): World {
    return this.entity.space.world;
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
}

export default Component;

export { Component, ComponentParams };
