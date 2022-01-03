import { uuid } from '@rapidajs/rapida-common';
import { WebGLRenderer as ThreeWebGLRenderer } from 'three';
import { RendererManager } from '../renderer-manager';
import { Renderer } from '../renderer';
import { WebGLView, WebGLViewParams } from './webgl-view';

/**
 * Params for creating a WebGLRenderer
 */
export type WebGLRendererParams = {
  /**
   * The three renderer
   */
  renderer?: ThreeWebGLRenderer;
};

/**
 * WebGLRenderer is a wrapper around the three js WebGLRenderer class that also supports view functionality.
 *
 * After construction, the domElement property, which contains a div dom element, should be added to the dom.
 */
export class WebGLRenderer implements Renderer {
  /**
   * The id for the renderer
   */
  id = uuid();

  /**
   * The three js renderer
   */
  three: ThreeWebGLRenderer;

  /**
   * Views for the webgl renderer
   */
  views: Map<string, WebGLView> = new Map();

  /**
   * The DOM element for the renderer
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
   * Whether the view manager is initialised
   */
  private initialised = false;

  /**
   * The renderer manager for the webgl renderer
   */
  private rendererManager: RendererManager;

  /**
   * Constructor for a WebGLRenderer
   * @param params the params for the new renderer
   */
  constructor(rendererManager: RendererManager, params?: WebGLRendererParams) {
    this.rendererManager = rendererManager;
    this.three =
      params?.renderer || new ThreeWebGLRenderer({ antialias: true });

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
    window.addEventListener('resize', () => this._onResize(), false);
    this.resizeObserver = new ResizeObserver(() => this._onResize());
    this.resizeObserver.observe(this.three.domElement);
  }

  /**
   * Retrieves renderer factories
   */
  public get create(): { view: (params: WebGLViewParams) => WebGLView } {
    return {
      /**
       * Creates a new webgl view
       * @param params params for creating a new webgl view
       * @returns
       */
      view: (params: WebGLViewParams): WebGLView => {
        const view = new WebGLView(this, params);
        this.addView(view);

        return view;
      },
    };
  }

  /**
   * Destroys the webgl renderer and removes it from the renderer manager
   */
  destroy(): void {
    this.rendererManager.removeRenderer(this);
  }

  /**
   * Removes a view from the renderer
   * @param view the view to remove
   */
  removeView(view: WebGLView): void {
    this.views.delete(view.id);
    view._destroy();

    this.sortViews();
  }

  /**
   * Initialises views
   * @private called internally, do not call directly
   */
  _init(): void {
    this.initialised = true;
    this.views.forEach((v) => {
      v._init();
    });
  }

  /**
   * Updates views to process interaction events
   * @private called internally, do not call directly
   */
  _update(): void {
    this.views.forEach((v) => v._update());
  }

  /**
   * Destroys the renderer and all views
   * @private called internally, do not call directly
   */
  _destroy(): void {
    this.views.forEach((v) => {
      v._destroy();
    });
    this.resizeObserver.disconnect();
    this.three.forceContextLoss();
    this.three.dispose();
  }

  /**
   * Handles resizing
   * @private called internally, do not call directly
   */
  _onResize(): void {
    this.three.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    this.views.forEach((v) => v._onResize());
  }

  /**
   * Renders all views for the renderer
   * @private called internally, do not call directly
   */
  _render(timeElapsed: number): void {
    const rect = this.three.domElement.getBoundingClientRect();

    this.views.forEach((view: WebGLView) => {
      this.three.setScissorTest(true);
      this.three.setScissor(
        view._scissor.left * rect.width,
        view._scissor.bottom * rect.height,
        view._scissor.width * rect.width,
        view._scissor.height * rect.height
      );
      this.three.setViewport(
        view._viewport.left * rect.width,
        view._viewport.bottom * rect.height,
        view._viewport.width * rect.width,
        view._viewport.height * rect.height
      );

      if (view.clearColor) {
        this.three.setClearColor(view.clearColor);
      }

      if (view.clearDepth) {
        this.three.clearDepth();
      }

      view._renderMethod(timeElapsed);
    });
  }

  /**
   * Adds a view to the renderer
   * @param view the view to add
   */
  private addView(view: WebGLView): void {
    this.views.set(view.id, view);

    if (this.initialised) {
      view._init();
    }

    if (this.orderedViews.length === 0) {
      this.orderedViews.push(view);
    }

    this.sortViews();
  }

  /**
   * Sorts the views in the renderer by their z index
   */
  private sortViews(): void {
    this.orderedViews.sort((a, b) => a._zIndex - b._zIndex);
  }
}
