import { WebGLRenderer } from './webgl/webgl-renderer';
import { Renderer } from './renderer';

/**
 * RendererManager managers the render and update loop for renderers
 */
class RendererManager {
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
  _init(): void {
    this.renderers.forEach((renderer) => renderer.init && renderer.init());
    this.initialised = true;
  }

  /**
   * Updates the renderer manager to run renderer and view logic that isn't rendering
   */
  _update(): void {
    this.renderersWithUpdate.forEach(
      (renderer) => renderer instanceof WebGLRenderer && renderer.update()
    );
  }

  /**
   * Destroys the renderer manager
   */
  _destroy(): void {
    this.renderers.forEach(
      (renderer) => renderer.destroy && renderer.destroy()
    );
  }

  /**
   * Calls the render method for all renderers
   */
  render(): void {
    this.renderers.forEach((renderer) => renderer.render && renderer.render());
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

    if (this.initialised && renderer.init) {
      renderer.init();
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
  }
}

export { RendererManager };
