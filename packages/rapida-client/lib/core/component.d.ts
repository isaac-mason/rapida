import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import Scene from './scene';
/**
 * A component of an entity that has data and behaviour
 */
declare abstract class Component {
    /**
     * This component instances unique id
     */
    id: string;
    /**
     * The name of the component
     */
    name: string;
    /**
     * The entity this component belongs to. Set on adding to an Entity.
     */
    private _entity?;
    /**
     * Gets the entity for the component. Available during init call.
     */
    get entity(): Entity;
    /**
     * Sets what entity the component belongs to
     * @param entity the entity
     */
    set entity(entity: Entity);
    /**
     * The scene the components entity is in
     */
    get scene(): Scene;
    /**
     * The scenes network manager
     */
    get networkManager(): NetworkManager;
    constructor(name: string);
    /**
     * Initialisation logic. The entity will be available in this method.
     */
    init: () => void;
    /**
     * Destruction logic
     */
    destroy: () => void;
    /**
     * Update logic
     * @param timeElapsed the time since the last update for this component in milliseconds
     */
    update: (timeElapsed: number) => void;
}
export { Component };
