import { uuid } from '@rapidajs/rapida-common';
import recs, { RECS, Space, SpaceParams, System } from '@rapidajs/recs';
import { Camera, CameraParams } from '../camera';
import { Loaders } from '../loaders';
import {
  CSSRenderer,
  RendererManager,
  WebGLRenderer,
  WebGLRendererParams,
  XRRenderer,
  XRRendererParams,
} from '../renderer';
import { Scene, SceneParams } from '../scene';

/**
 * Params for creating a world
 */
export type WorldParams = {
  /**
   * The unique id for the world
   */
  id?: string;

  /**
   * Params for the loader
   */
  loaders?: {
    /**
     * An optional draco loader decoder path. Default to using a CDN.
     * @see Loaders
     */
    dracoDecoderPath?: string;
  };
};

/**
 * A World that can contain systems, spaces containing entities, scenes, and renderers
 */
export class World {
  /**
   * A unique id for the world
   */
  id: string;

  /**
   * Scenes in the world
   */
  scenes: Map<string, Scene> = new Map();

  /**
   * Cameras for the world
   */
  cameras: Map<string, Camera> = new Map();

  /**
   * The RECS instance for the world
   */
  recs: RECS = recs();

  /**
   * Whether the world has been initialised
   */
  initialised = false;

  /**
   * The renderer manager for the world
   */
  rendererManager: RendererManager;

  /**
   * Loaders for various asset types
   */
  private loaders = new Loaders();

  /**
   * Constructor for a World
   * @param params params for creating the world
   */
  constructor(params?: WorldParams) {
    this.id = params?.id || uuid();

    this.rendererManager = new RendererManager();
  }

  /**
   * Retrieves world factories
   */
  get create(): {
    /**
     * Creates a space in the world
     * @param params the params for the space
     * @returns the new space
     */
    space: (params?: SpaceParams) => Space;

    /**
     * Creates a camera in the world
     * @param params the params for the camera
     * @returns the new camera
     */
    camera: (params?: CameraParams) => Camera;

    /**
     * Creates a scene in the world
     * @param params the params for the scene
     * @returns the new scene
     */
    scene: (params?: SceneParams) => Scene;

    /**
     * Factories for creating a renderer in the world
     */
    renderer: {
      /**
       * Creates a new webgl renderer
       * @param params params for the webgl renderer
       * @returns the new webgl renderer
       */
      webgl: (params?: WebGLRendererParams) => WebGLRenderer;

      /**
       * Creates a new css renderer
       * @param params the params for the css renderer
       * @returns the new css renderer
       */
      css: () => CSSRenderer;

      /**
       * Creates a new xr renderer
       * @param params the params for the xr renderer
       * @returns the new xr renderer
       */
      xr: (params: XRRendererParams) => XRRenderer;
    };
  } {
    return {
      space: (params?: SpaceParams): Space => {
        return this.recs.create.space(params);
      },
      camera: (params?: CameraParams): Camera => {
        const camera = new Camera(this, params);
        this.cameras.set(camera.id, camera);
        return camera;
      },
      scene: (params?: SceneParams): Scene => {
        const scene = new Scene(this, params);
        this.scenes.set(scene.id, scene);
        return scene;
      },
      renderer: {
        webgl: (params?: WebGLRendererParams): WebGLRenderer => {
          const renderer = new WebGLRenderer(this.rendererManager, params);
          this.rendererManager.addRenderer(renderer);
          return renderer;
        },
        css: (): CSSRenderer => {
          const renderer = new CSSRenderer(this.rendererManager);
          this.rendererManager.addRenderer(renderer);
          return renderer;
        },
        xr: (params: XRRendererParams): XRRenderer => {
          const renderer = new XRRenderer(this.rendererManager, params);
          this.rendererManager.addRenderer(renderer);
          return renderer;
        },
      },
    };
  }

  /**
   * Retrieves methods for adding to the world
   */
  get add(): {
    /**
     * Adds a system to the World
     * @param system the system to add to the world
     */
    system: (system: System) => System;
  } {
    return {
      system: (system: System): System => {
        this.recs.add.system(system);
        return system;
      },
    };
  }

  /**
   * Retrieves methods for loading assets into the world
   */
  get load(): Loaders {
    return this.loaders;
  }

  /**
   * Removes from the scene
   * @param value the value to remove
   */
  remove(value: System | Space | Scene | Camera): void {
    if (value instanceof System) {
      this.recs.remove(value);
    } else if (value instanceof Space) {
      this.recs.remove(value);
    } else if (value instanceof Scene) {
      this.scenes.delete(value.id);
    } else if (value instanceof Camera) {
      this.cameras.delete(value.id);
    }
  }

  /**
   * Initialises the world
   * @private called internally, do not call directly
   */
  _init(): void {
    // Set the world to be initialised
    this.initialised = true;

    // Initialise the renderer manager
    this.rendererManager.init();

    // Initialise the ecs
    this.recs.init();
  }

  /**
   * Renders the world
   * @private called internally, do not call directly
   */
  _render(timeElapsed: number): void {
    this.rendererManager.render(timeElapsed);
  }

  /**
   * Updates the world
   * @param timeElapsed the time elapsed in seconds
   * @param time the current time in seconds
   * @private called internally, do not call directly
   */
  _update(timeElapsed: number, time: number): void {
    // update the renderer manager
    this.rendererManager.update();

    // update spaces and systems in the ecs
    this.recs.update(timeElapsed, time);
  }

  /**
   * Destroys the world
   * @private called internally, do not call directly
   */
  _destroy(): void {
    this.rendererManager.destroy();
    this.recs.destroy();
  }
}
