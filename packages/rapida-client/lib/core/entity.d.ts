import { three, Event, EventHandler } from '@isaacmason/rapida-common';
import { Component } from './component';
import Scene from './scene';
declare class Entity {
    /**
     * The unique ID of the entity
     */
    id: string;
    /**
     * The name of the entity
     */
    name: string;
    /**
     * A group of three Object3D objects
     */
    group: three.Group;
    /**
     * The scene the entity is in. Set on adding to a Scene.
     */
    _scene?: Scene;
    get scene(): Scene;
    set scene(s: Scene);
    /**
     * The components for this entity
     */
    components: {
        [name: string]: Component;
    };
    /**
     * Whether the entity is 'playing', or whether updates are occurring
     */
    playing: boolean;
    /**
     * Whether the entity is alive
     * If false, the entity will be destroyed by the EntityManager
     */
    alive: boolean;
    /**
     * The position of the entity
     */
    get position(): three.Vector3;
    /**
     * Sets the position of the entity and broadcasts the change
     */
    set position(p: {
        x: number;
        y: number;
        z: number;
    });
    /**
     * The rotation of the entity
     */
    get rotation(): three.Euler;
    /**
     * Sets the rotation of the entity and broadcasts the change
     */
    set rotation(r: {
        x: number;
        y: number;
        z: number;
    });
    /**
     * The entities event system
     */
    private events;
    constructor(name: string);
    /**
     * Initialise the entity
     */
    init(): Entity;
    /**
     * Updates the entity
     * @param timeElapsed the time since the last update in milliseconds
     */
    update(timeElapsed: number): void;
    /**
     * Destroy the entities components
     */
    destroy(): void;
    /**
     * Sets whether the entity is playing
     * @param playing the new state
     */
    setPlaying(playing: boolean): Entity;
    /**
     * Sets whether the entity is alive
     * @param alive the new state
     */
    setAlive(alive: boolean): Entity;
    /**
     * Adds a component to the entity
     * @param c the component to add
     */
    addComponent(c: Component): Entity;
    /**
     * Retrieves a component on an entity by type.
     * Throws an error if it does not exist.
     * @param constr the component type to retrieve
     * @returns the component
     */
    getComponent<T extends Component | Component>(constr: {
        new (...args: any[]): T;
    }): T;
    /**
     * Adds a handler for entity events
     * @param eventName the event name
     * @param handler the handler function
     * @returns the id of the created handler
     */
    on(eventName: string, handler: EventHandler): string;
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    removeHandler(eventName: string, handlerId: string): void;
    /**
     * Broadcasts an event for handling by the entity
     * @param event the event to broadcast
     */
    emit<E extends Event | Event>(event: E): void;
}
export { Entity };
