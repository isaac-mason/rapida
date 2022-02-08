import { Renderer } from './renderer';
import { WebGLRenderer } from './webgl/webgl-renderer';

/**
 * RendererManager managers the render and update loop for renderers
 *
 * @private used internally, do not use directly
 */
export class RendererManager {
  /**
   * The renderers in the renderer manager
   */
  renderers: Map<string, Renderer> = new Map();

  /**
   * A map of renderers that have an update method
   */
  private renderersWithUpdate: Map<string, Renderer> = new Map();

  /**
   * Whether the renderer manager is initialised
   */
  private initialised = false;

  /**
   * Initialises the renderer manager
   */
  init(): void {
    this.initialised = true;
    this.renderers.forEach((renderer) => renderer._init && renderer._init());
  }

  /**
   * Updates the renderer manager to run renderer and view logic that isn't rendering
   */
  update(): void {
    this.renderersWithUpdate.forEach(
      (renderer) => renderer instanceof WebGLRenderer && renderer._update()
    );
  }

  /**
   * Destroys the renderer manager
   */
  destroy(): void {
    this.renderers.forEach(
      (renderer) => renderer._destroy && renderer._destroy()
    );
  }

  /**
   * Calls the render method for all renderers
   * @param timeElapsed the time elapsed in seconds
   */
  render(timeElapsed: number): void {
    this.renderers.forEach(
      (renderer) => renderer._render && renderer._render(timeElapsed)
    );
  }

  /**
   * Adds a renderer to the RendererManager
   * @param renderer the renderer to add
   */
  addRenderer(renderer: Renderer): void {
    this.renderers.set(renderer.id, renderer);

    if (renderer instanceof WebGLRenderer) {
      this.renderersWithUpdate.set(renderer.id, renderer);
    }

    if (this.initialised && renderer._init) {
      renderer._init();
    }
  }

  /**
   * Removes a renderer from the RendererManager
   * @param renderer the renderer to remove
   */
  removeRenderer(renderer: Renderer): void {
    this.renderers.delete(renderer.id);

    if (renderer instanceof WebGLRenderer) {
      this.renderersWithUpdate.delete(renderer.id);
    }

    if (renderer._destroy) {
      renderer._destroy();
    }
  }
}
