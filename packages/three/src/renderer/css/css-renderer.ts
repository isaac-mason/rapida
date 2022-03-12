import { CSSView, CSSViewParams } from './css-view';

/**
 * CSSRenderer is a thin wrapper around the CSS3DRenderer three js class with support for multiple views
 *
 * After construction, the `domElement` property should be added to the dom.
 */
export class CSSRenderer {
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
   * Constructor for a CSSRenderer
   * @param params the params for the css renderer
   */
  constructor() {
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
  get create(): {
    /**
     * Creates a new css view
     * @param params the params for the css view
     * @returns a new css view
     */
    view: (params: CSSViewParams) => CSSView;
  } {
    return {
      view: (params: CSSViewParams): CSSView => {
        const view = new CSSView(this, params);
        this.addView(view);

        return view;
      },
    };
  }

  /**
   * Removes a view from the renderer
   * @param view the view to remove
   */
  removeView(view: CSSView): void {
    this.views.delete(view.id);
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
   * @param _t the time elapsed in seconds
   * @private called internally, do not call directly
   */
  render(_t: number): void {
    this.views.forEach((view: CSSView) => {
      view.css3DRenderer.render(view.scene, view.camera);
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
