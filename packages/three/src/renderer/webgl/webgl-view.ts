import { EffectComposer, EffectComposerParams } from '@rapidajs/postprocessing';
import { EventHandler, EventSystem, uuid } from '@rapidajs/rapida-common';
import { OrthographicCamera, PerspectiveCamera, Scene, Vector3 } from 'three';
import { View } from '../view';
import type {
  ViewEventByName,
  ViewInteractionEventSubscription,
  ViewMouseEvent,
  ViewRectangle,
  ViewRectangleParams,
  ViewTouch,
  ViewTouchEvent,
} from '../view-types';
import {
  VIEW_ALL_EVENT_NAMES,
  VIEW_MOUSE_EVENTS,
  VIEW_TOUCH_EVENTS,
} from '../view-types';
import type { WebGLRenderer } from './webgl-renderer';

const defaultWorldViewportTarget = new Vector3();

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
  camera: PerspectiveCamera | OrthographicCamera;

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
   * Whether the view should use an effect composer
   */
  useEffectComposer?: boolean;

  /**
   * Params for the effect composer
   */
  effectComposer?: Omit<EffectComposerParams, 'scene' | 'camera' | 'renderer'>;
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
   * Whether the depth buffer should be cleared after rendering this view
   */
  clearDepth: boolean;

  /**
   * The dom element for the view
   */
  domElement: HTMLElement;

  /**
   * Bounds of the viewport in 3d units + factor (size/viewport) for the default target ({ x: 0, y: 0, z: 0})
   */
  worldViewport!: ReturnType<View['getWorldViewport']>;

  /**
   * The size of the view in pixels
   */
  viewportSizePx: ViewRectangle;

  /**
   * The size of the scissor in pixels
   */
  scissorSizePx: ViewRectangle;

  /**
   * The views camera
   * @see WebGLView.camera
   */
  camera: PerspectiveCamera | OrthographicCamera;

  /**
   * The views scene
   * @see WebGLView.scene;
   */
  scene: Scene;

  /**
   * Getter for the viewport params
   */
  get viewport(): ViewRectangleParams {
    return this.viewportParams;
  }

  /**
   * Setter for the viewport params. Resizes the view on setting.
   */
  set viewport(v: ViewRectangleParams) {
    this.viewportParams = v;
    this._onResize();
  }

  /**
   * Getter for the scissor params
   */
  get scissor(): ViewRectangleParams {
    return this.scissorParams;
  }

  /**
   * Setter for the scissor params. Resizes the view on setting.
   */
  set scissor(v: ViewRectangleParams) {
    this.scissorParams = v;
    this._onResize();
  }

  /**
   * The effect composer for the webgl view
   * @see WebGLView.effectComposer
   */
  get composer(): EffectComposer {
    if (this.effectComposerEnabled) {
      return this.effectComposer as EffectComposer;
    }

    throw new Error('effect composer is not enabled for this view');
  }

  /**
   * Whether the effect composer should be used
   */
  get useEffectComposer(): boolean {
    return this.effectComposerEnabled;
  }

  /**
   * Sets whether the effect composer should be used
   */
  set useEffectComposer(value: boolean) {
    this.effectComposerEnabled = value;
    this.updateRenderMethod();
  }

  /**
   * Gets the dom element used by the renderer
   */
  get rendererDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  /**
   * The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on.
   * @private used internally, do not use or assign
   * @see WebGLViewParams.zIndex
   */
  _zIndex: number;

  /**
   * The current size of the viewport for the view. Sets how to convert from a shader's clip space to some portion of the canvas's pixel space
   * @private used internally, do not use or assign
   */
  _viewportViewRetangle: ViewRectangle;

  /**
   * The current size of the scissor for the view. The shape outside of which nothing can be rendered
   * @private used internally, do not use or assign
   */
  _scissorViewRectangle: ViewRectangle;

  /**
   * The method called used for rendering
   * @private internally set method, do not modify
   */
  _renderMethod!: (timeElapsed: number) => void;

  /**
   * Parameters for the viewport that are used to recalculate the viewport on resize
   */
  private viewportParams: ViewRectangleParams;

  /**
   * Parameters for the scissor that are used to recalculate the scissor on resize
   */
  private scissorParams: ViewRectangleParams;

  /**
   * The renderer the view belongs to
   */
  private renderer: WebGLRenderer;

  /**
   * The events system for the view which is used for mouse and touch events
   */
  private events = new EventSystem({ queued: false });

  /**
   * A map of dom event listener names to data about listeners
   */
  private domElementListeners: Map<
    string,
    { unsubscribe: () => void; handlerIds: Set<string> }
  > = new Map();

  /**
   * Whether the view is using an effect composer
   */
  private effectComposerEnabled: boolean;

  /**
   * The effect composer for the view
   */
  private effectComposer: EffectComposer;

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
      useEffectComposer,
      effectComposer,
      zIndex,
    }: WebGLViewParams
  ) {
    super();

    this.renderer = renderer;
    this.id = id || uuid();
    this.camera = camera;
    this.scene = scene;
    this.clearDepth = clearDepth || false;
    this._zIndex = zIndex !== undefined ? zIndex : 0;

    // set effect composer enabled for the view if enableEffectComposer is true
    this.effectComposerEnabled = !!useEffectComposer;
    this.effectComposer = new EffectComposer({
      renderer: this.renderer.three,
      camera: this.camera,
      scene: this.scene,
      ...(effectComposer || {}),
    });

    // updates the render method from current properties
    this.updateRenderMethod();

    // create a dom element for the view
    this.domElement = document.createElement('div');
    this.domElement.id = this.id;
    this.domElement.className = 'view webgl-view';
    this.domElement.style.position = 'absolute';
    this.domElement.style.zIndex = `${this._zIndex}`;
    this.rendererDomElement.appendChild(this.domElement);

    // set initial values for computed viewport and scissor values
    this._viewportViewRetangle = { bottom: 0, left: 0, width: 0, height: 0 };
    this._scissorViewRectangle = { bottom: 0, left: 0, width: 0, height: 0 };
    this.viewportSizePx = { left: 0, bottom: 0, width: 0, height: 0 };
    this.scissorSizePx = { left: 0, bottom: 0, width: 0, height: 0 };

    // store params for viewport and scissor if present
    this.viewportParams = viewport || {
      bottom: 0,
      left: 0,
      width: 1,
      height: 1,
    };
    this.scissorParams = scissor || {
      bottom: 0,
      left: 0,
      width: 1,
      height: 1,
    };
  }

  /**
   * Sets the camera for the view
   * @param c the new camera for the view
   */
  setCamera(c: PerspectiveCamera | OrthographicCamera): void {
    this.camera = c;
    this.effectComposer.camera = this.camera;

    this.updateRenderMethod();
    this._onResize();
  }

  /**
   * Setter for the views scene
   * @param s the new scene
   */
  setScene(s: Scene): void {
    this.scene = s;
    this.effectComposer.scene = this.scene;

    this.updateRenderMethod();
  }

  /**
   * Adds an event handler for a view mouse or touch event
   * @param event the event of event to subscribe to
   * @param eventHandler the event handler
   * @returns
   */
  on<T extends typeof VIEW_ALL_EVENT_NAMES[number]>(
    eventName: T,
    eventHandler: EventHandler<ViewEventByName<T>>
  ): ViewInteractionEventSubscription {
    if (!VIEW_ALL_EVENT_NAMES.includes(eventName)) {
      throw new Error(`${eventName} is not a supported view event`);
    }

    const subscription = this.events.on(eventName, eventHandler);
    this.addHandler(eventName, subscription.id);

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
        this.removeHandler(eventName, subscription.id);
      },
    };
  }

  /**
   * Destroys the view and removes it from the renderer
   */
  destroy(): void {
    this.renderer.removeView(this);
  }

  /**
   * Destroys the view
   * @private called internally, do not call directly
   */
  _destroy(): void {
    // remove the view dom element
    this.rendererDomElement.removeChild(this.domElement);
  }

  /**
   * Initialises the view
   * @private called internally, do not call directly
   */
  _init = (): void => {
    this._onResize();
  };

  /**
   * Handles resizing
   * @private called internally, do not call directly
   */
  _onResize = (): void => {
    // calculate the new scissor and viewport
    this._scissorViewRectangle = this.calculateViewRectangle(
      this.scissorParams
    );
    this._viewportViewRetangle = this.calculateViewRectangle(
      this.viewportParams
    );

    // store the new size of the view
    const rendererDomRect = this.rendererDomElement.getBoundingClientRect();
    this.viewportSizePx = {
      left: rendererDomRect.width * this._viewportViewRetangle.left,
      bottom: rendererDomRect.height * this._viewportViewRetangle.bottom,
      width: rendererDomRect.width * this._viewportViewRetangle.width,
      height: rendererDomRect.height * this._viewportViewRetangle.height,
    };

    // update the dom element with the scissor size
    this.scissorSizePx = {
      bottom: this._scissorViewRectangle.bottom * rendererDomRect.height,
      left: this._scissorViewRectangle.left * rendererDomRect.width,
      width: this._scissorViewRectangle.width * rendererDomRect.width,
      height: this._scissorViewRectangle.height * rendererDomRect.height,
    };
    this.domElement.style.bottom = `${this.scissorSizePx.bottom}px`;
    this.domElement.style.left = `${this.scissorSizePx.left}px`;
    this.domElement.style.width = `${this.scissorSizePx.width}px`;
    this.domElement.style.height = `${this.scissorSizePx.height}px`;

    // update the camera
    this.resizeCamera();

    // set the size of the effect composer
    this.effectComposer.setSize(
      this.renderer.domElement.clientWidth,
      this.renderer.domElement.clientHeight
    );

    // update the world viewport for the default target
    this.worldViewport = this.getWorldViewport(defaultWorldViewportTarget);
  };

  /**
   * Resizes the camera based on the latest viewport size
   */
  private resizeCamera(): void {
    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect =
        this.viewportSizePx.width / this.viewportSizePx.height;
    }
    this.camera.updateProjectionMatrix();
  }

  /**
   * Sets the render method according to the current state of the WebGL View
   */
  private updateRenderMethod(): void {
    if (this.effectComposerEnabled) {
      this.effectComposer.camera = this.camera;
      this.effectComposer.scene = this.scene;
      this._renderMethod = (timeElapsed: number) =>
        this.effectComposer!.render(timeElapsed);
    } else {
      this._renderMethod = (_timeElapsed: number) =>
        this.renderer.three.render(this.scene, this.camera);
    }
  }

  /**
   * Returns the relative mouse position for a view given the client x and y
   * @param clientX the client x
   * @param clientY the client y
   * @returns the relative mouse position for the view
   */
  private getRelativeMouse(
    clientX: number,
    clientY: number
  ): { relativeX: number; relativeY: number } {
    const relativeX =
      ((clientX - this.viewportSizePx.left) / this.viewportSizePx.width) * 2 -
      1;
    const relativeY = -(
      ((clientY - (1 - this.viewportSizePx.bottom)) /
        this.viewportSizePx.height) *
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
  private removeHandler<T extends typeof VIEW_ALL_EVENT_NAMES[number]>(
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
  private addHandler<T extends typeof VIEW_ALL_EVENT_NAMES[number]>(
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
            ...this.getRelativeMouse(event.clientX, event.clientY),
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
                  ...this.getRelativeMouse(
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

    const unsubscribe = () => this.removeHandler(eventName, handlerId);

    listener = {
      unsubscribe,
      handlerIds: new Set([handlerId]),
    };

    this.domElementListeners.set(eventName, listener);
  }
}
