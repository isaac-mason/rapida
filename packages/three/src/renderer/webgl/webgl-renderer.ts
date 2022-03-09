import {
  WebGLRenderer as ThreeWebGLRenderer,
  WebGLRendererParameters,
} from 'three';
import { WebGLView } from './webgl-view';
import type { WebGLViewParams } from './webgl-view';

/**
 * Params for creating a WebGLRenderer
 */
export type WebGLRendererParams = {
  /**
   * The three renderer parameters
   * @see WebGLRendererParameters
   */
  renderer?: WebGLRendererParameters;
};

/**
 * WebGLRenderer is a wrapper around the three.js WebGLRenderer provides a simple API for managing multiple views.
 *
 * The `domElement` property should be added to the dom immediately after construction.
 *
 * Example usage:
 *
 * ```ts
 * import { WebGLRenderer } from '@rapidajs/three';
 * import { Scene, PerspectiveCamera } from 'three';
 *
 * const renderer = new WebGLRenderer();
 *
 * // add the renderer domElement to the dom before adding views
 * document.getElementById('app').appendChild(renderer.domElement);
 *
 * const scene = new Scene();
 * const camera = new PerspectiveCamera();
 *
 * const view = renderer.create.view({
 *   camera,
 *   scene,
 * });
 *
 * renderer.render();
 * ```
 *
 * Example usage for a view using an effect composer for post processing effects:
 *
 * ```ts
 * import { WebGLRenderer } from '@rapidajs/three';
 * import { Scene, PerspectiveCamera } from 'three';
 *
 * const renderer = new WebGLRenderer();
 *
 * // add the renderer domElement to the dom before adding views
 * document.getElementById('app').appendChild(renderer.domElement);
 *
 * const scene = new Scene();
 * const camera = new PerspectiveCamera();
 *
 * const view = renderer.create.view({
 *   camera,
 *   scene,
 *   useEffectComposer: true,
 * });
 *
 * // get the time elapsed from your render loop
 * const timeElapsed = 0.1;
 *
 * // pass the time elapsed to the render method
 * renderer.render(timeElapsed);
 * ```
 */
export class WebGLRenderer {
  /**
   * The three js renderer
   */
  three: ThreeWebGLRenderer;

  /**
   * Views for the webgl renderer
   */
  views: Map<string, WebGLView> = new Map();

  /**
   * The DOM element for the renderer. Should be added to the dom after creating the WebGLRenderer
   */
  domElement: HTMLElement;

  /**
   * The ordered views according the views zIndex values
   */
  private orderedViews: WebGLView[] = [];

  /**
   * The resize observer for the renderer dom element
   */
  private resizeObserver: ResizeObserver;

  /**
   * Constructor for a WebGLRenderer
   * @param params the params for the new renderer
   */
  constructor(params?: WebGLRendererParams) {
    this.three = new ThreeWebGLRenderer(
      params?.renderer || { antialias: true }
    );

    // Create the renderer dom element for views within the renderer
    this.domElement = document.createElement('div');
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    // ensure root dom element has relative position
    this.domElement.style.position = 'relative';

    // Set up the three js renderer dom element
    this.three.domElement.style.position = 'absolute';
    this.three.domElement.style.top = '0';
    this.three.domElement.style.left = '0';
    this.three.domElement.style.width = '100%';
    this.three.domElement.style.height = '100%';
    this.domElement.appendChild(this.three.domElement);

    // Set the pixel ratio for the renderer
    if (this.three instanceof ThreeWebGLRenderer) {
      this.three.setPixelRatio(window.devicePixelRatio);
    }

    // Create the event listener for the renderer dom element resizing
    window.addEventListener('resize', () => this.onResize(), false);
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.three.domElement);
  }

  /**
   * Retrieves renderer factories
   */
  get create(): {
    /**
     * Creates a new webgl view
     * @param params params for creating a new webgl view
     * @returns
     */
    view: (params: WebGLViewParams) => WebGLView;
  } {
    return {
      view: (params: WebGLViewParams): WebGLView => {
        const view = new WebGLView(this, params);
        this.addView(view);

        return view;
      },
    };
  }

  /**
   * Adds a view to the renderer
   * @param view the view to add
   */
  addView(view: WebGLView): void {
    view._onResize();

    this.views.set(view.id, view);
    this.orderedViews.push(view);
    this.sortViews();
  }

  /**
   * Destroys the renderer and all views
   */
  destroy(): void {
    for (const view of this.views.values()) {
      this.removeView(view);
    }
    this.resizeObserver.disconnect();
    this.three.forceContextLoss();
    this.three.dispose();
  }

  /**
   * Removes a view from the renderer
   * @param view the view to remove
   */
  removeView(view: WebGLView): void {
    this.views.delete(view.id);
    this.domElement.removeChild(view.domElement);

    this.sortViews();
  }

  /**
   * Renders all views
   *
   * @param timeElapsed the time elapsed, required if using an effect composer with time based postprocessing effects
   */
  render(timeElapsed?: number): void {
    const rect = this.three.domElement.getBoundingClientRect();

    for (const view of this.orderedViews) {
      this.three.setViewport(
        view._viewportViewRetangle.left * rect.width,
        view._viewportViewRetangle.bottom * rect.height,
        view._viewportViewRetangle.width * rect.width,
        view._viewportViewRetangle.height * rect.height
      );
      this.three.setScissor(
        view._scissorViewRectangle.left * rect.width,
        view._scissorViewRectangle.bottom * rect.height,
        view._scissorViewRectangle.width * rect.width,
        view._scissorViewRectangle.height * rect.height
      );
      this.three.setScissorTest(true);

      if (view.clearDepth) {
        this.three.clearDepth();
      }

      view._renderMethod(timeElapsed || 0);
    }
  }

  /**
   * Handles resizing
   * @private called internally, do not call directly
   */
  private onResize(): void {
    this.three.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    for (const view of this.views.values()) {
      view._onResize();
    }
  }

  /**
   * Sorts the views in the renderer by their z index
   */
  private sortViews(): void {
    this.orderedViews.sort((a, b) => {
      return a._zIndex - b._zIndex;
    });
  }
}
