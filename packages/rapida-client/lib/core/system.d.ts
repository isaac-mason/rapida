import { Event, EventHandler, EventSystem } from '@isaacmason/rapida-common';
import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import Scene from './scene';
declare type SystemEntityFilter = (e: Entity) => boolean;
declare type ComponentType = {
    new (...args: any[]): any;
};
declare const SystemEntityFilters: {
    [name: string]: (components: ComponentType[]) => SystemEntityFilter;
};
/**
 * Abstract class for a System
 */
declare abstract class System {
    /**
     * The name for the system
     */
    name: string;
    /**
     * The scene the system is in
     */
    private _scene?;
    /**
     * Gets the scene. Always called on adding to a scene.
     */
    get scene(): Scene;
    /**
     * Sets the scene
     */
    set scene(s: Scene);
    /**
     * Getter for the runtime network manager
     */
    get networkManager(): NetworkManager;
    /**
     * The entities in the system
     */
    entities: {
        [id: string]: Entity;
    };
    /**
     * The event system for this system
     */
    events: EventSystem;
    private _addEntityToSceneHandlerId?;
    private _removeEntityFromSceneHandlerId?;
    constructor(name: string);
    /**
     * Initialises the system
     */
    init(): void;
    /**
     * Destroy logic for the system
     */
    destroy(): void;
    /**
     * Adds an entity to the system
     * @param e the entity to add
     */
    addEntity(e: Entity): void;
    /**
     * Removes an entity from the system
     * @param e the entity to remove
     */
    removeEntity(e: Entity): void;
    /**
     * Returns whether an entity is in the system
     * @param entityId the entity id to check
     * @returns whether the entity is in the system
     */
    hasEntityId(entityId: string): boolean;
    /**
     * Adds an event handler for the system
     * @param eventName the event name
     * @param handler the event handler
     */
    on(eventName: string, handler: EventHandler): void;
    /**
     * Emits an event to the system
     * @param event the event to emit
     */
    emit<E extends Event | Event>(event: E): void;
    /**
     * The filter for whether entities should be added to the system
     */
    entityFilter?: SystemEntityFilter;
    /**
     * Logic for initialisation of the system. Called during System construction.
     */
    onSystemInit?: () => void;
    /**
     * Logic for destruction of the system. Called on removing a System from a Scene.
     */
    onSystemDestroy?: () => void;
    /**
     * Logic for a systems update loop
     * @param timeElapsed the time since the last update
     */
    onUpdate?: (timeElapsed: number) => void;
    /**
     * Logic for when an entity is added to the system
     * @param e the entity being added to the system
     */
    onAdd?: (e: Entity) => void;
    /**
     * Logic for when an entity is removed from the system
     * @param e the entity being removed from the system
     */
    onRemove?: (e: Entity) => void;
}
export { System, SystemEntityFilter, SystemEntityFilters };
