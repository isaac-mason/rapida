import { uuid } from '@rapidajs/rapida-common';
import { CSSView, CSSViewParams } from './css-view';
import { Renderer } from '../renderer';
import { RendererManager } from '../renderer-manager';

/**
 * CSSRenderer is a thin wrapper around the CSS3DRenderer three js class with support for multiple views
 *
 * After construction, the domElement property, which contains a div dom element, should be added to the dom.
 */
export class CSSRenderer implements Renderer {
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
  constructor(manager: RendererManager) {
    this.rendererManager = manager;

    this.domElement = document.createElement('div');
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0';
    this.domElement.style.left = '0';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';
  }

  /**
   * Retrieves renderer factories
   */
  public get create(): { view: (params: CSSViewParams) => CSSView } {
    return {
      view: (params: CSSViewParams): CSSView => {
        const view = new CSSView(this, params);
        this.addView(view);

        return view;
      },
    };
  }

  /**
   * Destroys the css renderer and removes it from the renderer manager
   */
  destroy(): void {
    this.rendererManager.removeRenderer(this);
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
   * Initialises all css views
   * @private called internally, do not call directly
   */
  _init(): void {
    this.initialised = true;
    this.views.forEach((v) => {
      v._init();
    });
  }

  /**
   * Renders all of the views in the renderer
   * @private called internally, do not call directly
   */
  _render(): void {
    this.views.forEach((view: CSSView) => {
      view.css3DRenderer.render(view.scene.three, view.camera.three);
    });
  }

  /**
   * Destroys all css views
   * @private called internally, do not call directly
   */
  _destroy(): void {
    this.views.forEach((v) => {
      v._destroy();
    });
  }

  /**
   * Resizes all css views
   * @private called internally, do not call directly
   */
  _onResize(): void {
    this.views.forEach((v) => {
      v._onResize();
    });
  }

  /**
   * Adds a view to the renderer
   * @param view the view to add
   */
  private addView(view: CSSView): void {
    this.views.set(view.id, view);

    if (this.initialised) {
      view._init();
    }
  }
}
