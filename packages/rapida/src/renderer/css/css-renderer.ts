import { uuid } from '@rapidajs/rapida-common';
import { CSSView, CSSViewParams } from './css-view';
import { Renderer } from '../renderer';
import { RendererManager } from '../renderer-manager';

/**
 * Factories for creating something in the renderer
 */
type CSSRendererFactories = {
  view: (params: CSSViewParams) => CSSView;
};

/**
 * Parameters for creating a CSSRenderer
 */
type CSSRendererParams = {
  domElementId: string;
};

/**
 * CSSRenderer is a thin wrapper around the CSS3DRenderer three js class with support for multiple views
 */
class CSSRenderer implements Renderer {
  /**
   * A unique id for the css renderer
   */
  id = uuid();

  /**
   * Views for the webgl renderer
   */
  views: Map<string, CSSView> = new Map();

  /**
   * The DOM element for the renderer
   */
  domElement: HTMLElement;

  /**
   * The renderer root dom element
   */
  private rendererRootDomElement: HTMLElement;

  /**
   * Whether the view manager is initialised
   */
  private initialised = false;

  /**
   * The renderer manager the css renderer belongs to
   */
  private rendererManager: RendererManager;

  /**
   * Constructor for a CSSRenderer
   * @param params the params for the css renderer
   */
  constructor(manager: RendererManager, params: CSSRendererParams) {
    this.rendererManager = manager;

    this.rendererRootDomElement = document.getElementById(
      params.domElementId
    ) as HTMLElement;

    this.domElement = this.rendererRootDomElement;
  }

  /**
   * Initialises all css views
   */
  init(): void {
    this.views.forEach((v) => {
      v._init();
    });

    this.initialised = true;
  }

  /**
   * Destroys the css renderer and removes it from the renderer manager
   */
  destroy(): void {
    this.rendererManager.removeRenderer(this);
  }

  /**
   * Destroys all css views
   */
  _destroy(): void {
    this.views.forEach((v) => {
      v._destroy();
    });
  }

  /**
   * Adds a view to the renderer
   * @param view the view to add
   */
  addView(view: CSSView): void {
    this.views.set(view.id, view);

    if (this.initialised) {
      view._init();
    }
  }

  /**
   * Removes a view from the renderer
   * @param view the view to remove
   */
  removeView(view: CSSView): void {
    this.views.delete(view.id);
    view._destroy();
  }

  /**
   * Resizes all css views
   */
  _onResize(): void {
    this.views.forEach((v) => {
      v._onResize();
    });
  }

  /**
   * Renders all of the views in the renderer
   */
  render(): void {
    this.views.forEach((view: CSSView) => {
      view.css3DRenderer.render(view.scene.threeScene, view.camera.three);
    });
  }

  /**
   * Factories for creating objects within the renderer
   */
  private _factories: CSSRendererFactories = {
    view: (params: CSSViewParams): CSSView => {
      const view = new CSSView(this, params);
      this.addView(view);

      return view;
    },
  };

  /**
   * Retrieves renderer factories
   */
  public get create(): CSSRendererFactories {
    return this._factories;
  }
}

export { CSSRenderer, CSSRendererParams };
