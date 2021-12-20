import { EventHandler, EventSystem, uuid } from '@rapidajs/rapida-common';
import { Color, PerspectiveCamera, Vector2 } from 'three';
import { EffectComposer, RenderPass } from 'three-stdlib';
import { Camera } from '../../camera';
import { Scene } from '../../scene';
import {
  View,
  ViewEventName,
  ViewInteractionEventSubscription,
  ViewMouseEvent,
  ViewRectangle,
  ViewRectangleParams,
  ViewTouch,
  ViewTouchEvent,
  VIEW_ALL_EVENT_NAMES as ALL_VIEW_EVENT_NAMES,
  VIEW_ALL_EVENT_NAMES,
  VIEW_MOUSE_EVENTS,
  VIEW_TOUCH_EVENTS,
} from '../view';
import { WebGLRenderer } from './webgl-renderer';

/**
 * Params for creating a webgl view
 */
export type WebGLViewParams = {
  /**
   * A unique identifier for the view. Defaults to a uuid if unspecified
   */
  id?: string;

  /**
   * The camera for the view
   */
  camera: Camera;

  /**
   * The scene for the view
   */
  scene: Scene;

  /**
   * The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on. Defaults to zero.
   */
  zIndex?: number;

  /**
   * The viewport for the view. Defaults to the full screen.
   */
  viewport?: ViewRectangleParams;

  /**
   * The scissor for the view. Defaults to the full screen.
   */
  scissor?: ViewRectangleParams;

  /**
   * Whether depth should be cleared after rendering this view
   */
  clearDepth?: boolean;

  /**
   * The clear color for the view
   */
  clearColor?: Color | string;
};

/**
 * A WebGLView that a WebGLRenderer should render
 */
export class WebGLView extends View {
  /**
   * A unique identifier for the view
   */
  id: string;

  /**
   * The views camera
   */
  camera: Camera;

  /**
   * The views scene
   */
  scene: Scene;

  /**
   * The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on.
   */
  zIndex = 0;

  /**
   * Parameters for the viewport that are used to recalculate the viewport on resize
   */
  private _viewportParams: ViewRectangleParams;

  /**
   * Getter for the viewport params
   */
  get viewport(): ViewRectangleParams {
    return this._viewportParams;
  }

  /**
   * Setter for the viewport params. Resizes the view on setting.
   */
  set viewport(v: ViewRectangleParams) {
    this._viewportParams = v;
    this._onResize();
  }

  /**
   * Parameters for the scissor that are used to recalculate the scissor on resize
   */
  private _scissorParams: ViewRectangleParams;

  /**
   * Getter for the scissor params
   */
  get scissor(): ViewRectangleParams {
    return this._scissorParams;
  }

  /**
   * Setter for the scissor params. Resizes the view on setting.
   */
  set scissor(v: ViewRectangleParams) {
    this._scissorParams = v;
    this._onResize();
  }

  /**
   * Whether clearDepth should be called after rendering this view
   */
  clearDepth: boolean;

  /**
   * The clear color the renderer should use for this view. Defaults to black - 0x000000
   */
  clearColor?: Color;

  /**
   * The relative mouse position on the view.
   */
  mouse: Vector2 = new Vector2();

  /**
   * The effect composer for the view
   */
  effectComposer: EffectComposer;

  /**
   * The dom element for the view
   */
  domElement: HTMLElement;

  /**
   * The size of the view in pixels
   */
  viewportSize: ViewRectangle;

  /**
   * The size of the scissor in pixels
   */
  scissorSize: ViewRectangle;

  /**
   * The current size of the viewport for the view. Sets how to convert from a shader's clip space to some portion of the canvas's pixel space
   */
  _viewport: ViewRectangle;

  /**
   * The current size of the scissor for the view. The shape outside of which nothing can be rendered
   */
  _scissor: ViewRectangle;

  /**
   * The renderer the view belongs to
   */
  private renderer: WebGLRenderer;

  /**
   * The render pass for the view
   */
  private renderPass: RenderPass;

  /**
   * The events system for the view which is used for mouse and touch events
   */
  private events = new EventSystem();

  /**
   * A map of dom event listener names to data about listeners
   */
  private domElementListeners: Map<
    string,
    { unsubscribe: () => void; handlerIds: Set<string> }
  > = new Map();

  /**
   * Gets the dom element used by the renderer
   */
  get rendererDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  /**
   * Constructor for a WebGLView
   * @param renderer the renderer for the view
   * @param param1 parameters for creating the view
   */
  constructor(
    renderer: WebGLRenderer,
    {
      id,
      camera,
      scene,
      viewport,
      scissor,
      clearDepth,
      clearColor,
    }: WebGLViewParams
  ) {
    super();

    this.renderer = renderer;
    this.id = id || uuid();
    this.camera = camera;
    this.scene = scene;
    this.clearDepth = clearDepth || false;

    if (clearColor) {
      this.clearColor =
        clearColor instanceof Color ? clearColor : new Color(clearColor);
    }

    // create the effect composer for the view
    this.effectComposer = new EffectComposer(this.renderer.three);

    // create the render pass for the view
    this.renderPass = new RenderPass(this.scene.threeScene, this.camera.three);

    // add the render pass for the view
    this.effectComposer.addPass(this.renderPass);

    // create a dom element for the view
    this.domElement = document.createElement('div');
    this.domElement.id = this.id;
    this.domElement.className = 'view webgl-view';
    this.domElement.style.position = 'absolute';
    this.domElement.style.zIndex = `${this.zIndex}`;
    this.rendererDomElement.appendChild(this.domElement);

    // set initial values for computed viewport and scissor values
    this._viewport = { bottom: 0, left: 0, width: 0, height: 0 };
    this._scissor = { bottom: 0, left: 0, width: 0, height: 0 };
    this.viewportSize = { left: 0, bottom: 0, width: 0, height: 0 };
    this.scissorSize = { left: 0, bottom: 0, width: 0, height: 0 };

    // store params for viewport and scissor if present
    this._viewportParams = viewport || {
      bottom: 0,
      left: 0,
      width: 1,
      height: 1,
    };
    this._scissorParams = scissor || {
      bottom: 0,
      left: 0,
      width: 1,
      height: 1,
    };
  }

  /**
   * Initialises the view
   */
  _init = (): void => {
    this._onResize();
  };

  /**
   * Updates the view
   */
  _update(): void {
    this.events.tick();
  }

  /**
   * Destroys the view and removes it from the renderer
   */
  destroy(): void {
    this.renderer.removeView(this);
  }

  /**
   * Destroys the view
   */
  _destroy(): void {
    // add the render pass for the view
    this.effectComposer.removePass(this.renderPass);

    // remove the view dom element
    this.rendererDomElement.removeChild(this.domElement);
  }

  /**
   * Handles resizing
   */
  _onResize = (): void => {
    // calculate the new scissor and viewport
    this._scissor = this.calculateViewRectangle(this._scissorParams);
    this._viewport = this.calculateViewRectangle(this._viewportParams);

    // store the new size of the view
    const rendererDomRect = this.rendererDomElement.getBoundingClientRect();
    this.viewportSize = {
      left: rendererDomRect.width * this._viewport.left,
      bottom: rendererDomRect.height * this._viewport.bottom,
      width: rendererDomRect.width * this._viewport.width,
      height: rendererDomRect.height * this._viewport.height,
    };

    // update the scissor dom element
    this.scissorSize = {
      bottom: this._scissor.bottom * rendererDomRect.height,
      left: this._scissor.left * rendererDomRect.width,
      width: this._scissor.width * rendererDomRect.width,
      height: this._scissor.height * rendererDomRect.height,
    };
    this.domElement.style.bottom = `${this.scissorSize.bottom}px`;
    this.domElement.style.left = `${this.scissorSize.left}px`;
    this.domElement.style.width = `${this.scissorSize.width}px`;
    this.domElement.style.height = `${this.scissorSize.height}px`;

    // update the camera
    if (this.camera.three instanceof PerspectiveCamera) {
      this.camera.three.aspect =
        this.viewportSize.width / this.viewportSize.height;
    }
    this.camera.three.updateProjectionMatrix();

    // set the size of the effect composer
    this.effectComposer.setSize(
      this.viewportSize.width,
      this.viewportSize.height
    );
  };

  /**
   * Adds an event handler for a view mouse or touch event
   * @param event the event of event to subscribe to
   * @param eventHandler the event handler
   * @returns
   */
  on<T extends typeof ALL_VIEW_EVENT_NAMES[number]>(
    eventName: T,
    eventHandler: EventHandler<ViewEventName<T>>
  ): ViewInteractionEventSubscription {
    if (!VIEW_ALL_EVENT_NAMES.includes(eventName)) {
      throw new Error(`${eventName} is not a supported view event`);
    }

    const handlerId = this.events.on(eventName, eventHandler);
    this._addHandler(eventName, handlerId);

    return {
      unsubscribe: () => {
        this.events.removeHandler(eventName, handlerId);
        this._removeHandler(eventName, handlerId);
      },
    };
  }

  /**
   * Returns the relative mouse position for a view given the client x and y
   * @param clientX the client x
   * @param clientY the client y
   * @returns the relative mouse position for the view
   */
  private _getRelativeMouse(
    clientX: number,
    clientY: number
  ): { relativeX: number; relativeY: number } {
    const relativeX =
      ((clientX - this.viewportSize.left) / this.viewportSize.width) * 2 - 1;
    const relativeY = -(
      ((clientY - (1 - this.viewportSize.bottom)) / this.viewportSize.height) *
        2 -
      1
    );
    return { relativeX, relativeY };
  }

  /**
   * Removes a handler for a view event and removes the dom event listener if there are no handlers
   * @param eventName the name of the view event
   * @param handlerId the id of the handlers
   */
  private _removeHandler<T extends typeof ALL_VIEW_EVENT_NAMES[number]>(
    eventName: T,
    handlerId: string
  ): void {
    const listener = this.domElementListeners.get(eventName);

    if (!listener) {
      return;
    }

    listener.handlerIds.delete(handlerId);

    if (listener.handlerIds.size === 0) {
      this.domElementListeners.delete(eventName);
      listener.unsubscribe();
    }
  }

  /**
   * Adds a view event handler and sets up the dom event listener if it does not exist
   * @param eventName the name of the view event
   * @param handlerId the id of the handler
   */
  private _addHandler<T extends typeof ALL_VIEW_EVENT_NAMES[number]>(
    eventName: T,
    handlerId: string
  ): void {
    let listener = this.domElementListeners.get(eventName);

    if (listener) {
      listener.handlerIds.add(handlerId);
      this.domElementListeners.set(eventName, listener);
      return;
    }

    let eventHandler: (e: unknown) => void;

    if (VIEW_MOUSE_EVENTS.includes(eventName)) {
      eventHandler = (e) => {
        const event = e as MouseEvent;
        this.events.emit({
          topic: eventName,
          data: {
            ...event,
            ...this._getRelativeMouse(event.clientX, event.clientY),
          },
        } as ViewMouseEvent);
      };
    } else if (VIEW_TOUCH_EVENTS.includes(eventName)) {
      eventHandler = (e) => {
        const event = e as TouchEvent;

        const mapTouches = (touches: TouchList) =>
          Array(touches.length)
            .fill(0)
            .map(
              (_v: unknown, idx: number) =>
                ({
                  ...touches[idx],
                  ...this._getRelativeMouse(
                    touches[idx].clientX,
                    touches[idx].clientY
                  ),
                } as ViewTouch)
            );

        const toEmit = {
          topic: eventName,
          data: {
            altKey: event.altKey,
            changedTouches: mapTouches(event.changedTouches),
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
            targetTouches: mapTouches(event.targetTouches),
            touches: mapTouches(event.touches),
          },
        } as ViewTouchEvent;

        this.events.emit(toEmit);
      };
    } else {
      throw new Error(`${eventName} is not a supported view event`);
    }

    this.domElement.addEventListener(eventName, eventHandler, false);

    const unsubscribe = () => this._removeHandler(eventName, handlerId);

    listener = {
      unsubscribe,
      handlerIds: new Set([handlerId]),
    };

    this.domElementListeners.set(eventName, listener);
  }
}
