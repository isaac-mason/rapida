import { three, Event, EventHandler } from '@isaacmason/rapida-common';
import { System } from './system';
import { Entity } from './entity';
import { NetworkManager } from './network-manager';
import { Runtime } from './runtime';
/**
 * Scene type enum
 */
declare enum SceneType {
    OFFLINE = "OFFLINE",
    NETWORKED = "NETWORKED"
}
/**
 * Params for creating a new scene
 */
declare type SceneParams = {
    runtime: Runtime;
    networkManager?: NetworkManager;
};
/**
 * A scene that can contain entities and can be networked
 */
declare class Scene {
    /**
     * The unique ID for the scene
     */
    id: string;
    /**
     * The runtime the scene is in
     */
    runtime: Runtime;
    /**
     * The type of scene
     */
    sceneType: SceneType;
    /**
     * Entities in the scene
     */
    entities: {
        [name: string]: Entity;
    };
    /**
     * Systems in the scene
     */
    systems: {
        [name: string]: System;
    };
    /**
     * The currently registered camera
     */
    camera?: three.PerspectiveCamera;
    /**
     * The three js scene.
     * Components have a reference to this scene and can add themselves to the three js scene
     */
    threeScene: three.Scene;
    /**
     * Getter for the runtime network manager
     */
    get networkManager(): NetworkManager;
    /**
     * Whether the scene has been initialised
     * If the scene has already been initialised, when adding a new entity to the scene, the scene will initialise the entity
     */
    private initialised;
    /**
     * The scenes event system
     */
    private events;
    /**
     * Functions to be called when the init method is called
     */
    private initJobs;
    /**
     * Functions to be called when the update method is called
     */
    private updateJobs;
    /**
     * Functions to be called when the destroy method is called
     */
    private destroyJobs;
    constructor(id: string, params: SceneParams);
    /**
     * Initialise the scene
     */
    init(): void;
    /**
     * Updates all entities within the scene
     * @param timeElapsed the time since the last update in milliseconds
     */
    update(timeElapsed: number): void;
    /**
     * Destroy all entities
     */
    destroy(): void;
    /**
     * Adds an entity to the scene
     * @param e the entity or system to add
     */
    add(value: Entity | System): Scene;
    /**
     * Removes an entity or a system from the scene
     * @param value the entity or system to remove
     */
    remove(value: Entity | System): Scene;
    /**
     * Adds a handler for scene events
     * @param eventName the event name
     * @param handlerName the name of the handler
     * @param handler the handler function
     * @returns the id of the new handler
     */
    on(eventName: string, handler: EventHandler): string;
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    removeHandler(eventName: string, handlerId: string): void;
    /**
     * Broadcasts an event for handling by the scene
     * @param event the event to broadcast
     */
    emit<E extends Event | Event>(event: E): void;
}
export default Scene;
export { SceneParams, SceneType };
