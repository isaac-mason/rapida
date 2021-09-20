import { Logger } from 'pino';
import { three } from '@isaacmason/rapida-common';
import { NetworkManager } from './network-manager';
import Scene from './scene';
/**
 * Parameters for the scene provider method
 */
declare type SceneProviderParams = {
    networkManager?: NetworkManager;
    runtime: Runtime;
};
/**
 * A scene provider
 */
declare type SceneProvider = (params: SceneProviderParams) => Scene;
/**
 * Parameters for creating a new rapida runtime
 */
declare type RuntimeParams = {
    domId: string;
    renderer?: three.WebGLRenderer;
    maxUpdatesPerSecond?: number;
    networkManager?: NetworkManager;
    debug?: boolean;
};
/**
 * A simple client runtime to work with the scene class.
 *
 * Creates a dom element for the renderer on instantiation.
 * Only suitable for scenes with one camera that use the built-in CameraComponent class.
 * For anything more complex, a custom runtime class should be created.
 */
declare class Runtime {
    /**
     * The current scene in play
     */
    scene?: Scene;
    /**
     * The room that the network scene is in.
     * Left undefined if the scene is not networked.
     */
    networkManager?: NetworkManager;
    /**
     * The renderer for the Scene
     */
    renderer: three.WebGLRenderer;
    /**
     * The logger for the runtime
     */
    logger: Logger;
    /**
     * The scene providers for the runtime
     */
    private sceneProviders;
    /**
     * Whether the runtime is in debug mode
     */
    private debug;
    /**
     * The DOM element for the scene
     */
    private domElement;
    /**
     * Whether the render loop should be stopped.
     * If set to true, the loop will be stopped on the next check.
     * Set back to false after killing the loop.
     */
    private killLoop;
    /**
     * The time in milliseconds to wait before running another runtime update
     */
    private updateDelay;
    /**
     * The time of the previous animation frame
     */
    private previousAnimationFrame;
    constructor({ domId, renderer, maxUpdatesPerSecond, networkManager, debug, }: RuntimeParams);
    /**
     * Registers a new scene
     * @param sceneId the scene ID
     * @param sceneProvider a function that returns a new Scene for a given sceneId
     */
    registerScene: (sceneId: string, sceneProvider: SceneProvider) => void;
    /**
     * Sets the scene that is playing.
     * If a scene is already playing, the current scene is stopped and the new scene is started.
     * @param s the new scene to start
     */
    setScene(sceneId: string): Runtime;
    /**
     * Handles window resizing
     */
    onWindowResize(): void;
    /**
     * The animation loop
     */
    private loop;
}
export { Runtime, SceneProviderParams, SceneProvider };
