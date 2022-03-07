import { Event, EventSubscription, EventSystem } from '@rapidajs/rapida-common';
import {
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from 'three';
import { ARButton } from 'three-stdlib/webxr/ARButton';
import { VRButton } from 'three-stdlib/webxr/VRButton';

/**
 * An event for a new XRFrame
 */
export interface FrameEvent extends Event {
  topic: 'frame';
  data: {
    frame: XRFrame;
    time: number;
  };
}

/**
 * XRRenderer modes
 */
export enum XRRendererMode {
  VR = 'VR',
  AR = 'AR',
}

/**
 * Params for creating a new VRRenderer
 */
export type XRRendererParams = {
  /**
   * The mode for the xr renderer, VR or AR
   */
  mode: XRRendererMode;

  /**
   * Whether a VR/AR button should be appended that will launch on click
   */
  appendButton?: boolean;

  /**
   * The three WebGLRenderer to use
   */
  renderer?: WebGLRenderer;

  /**
   * The scene to render
   */
  scene: Scene;

  /**
   * The camera to render with
   */
  camera: PerspectiveCamera | OrthographicCamera;
};

/**
 * Renderer for VR and AR content
 *
 * After construction, the domElement property, which contains a div dom element, should be added to the dom.
 */
export class XRRenderer {
  /**
   * The renderer for the xr renderer
   */
  three: WebGLRenderer;

  /**
   * The DOM element for the renderer
   */
  domElement: HTMLElement;

  /**
   * The scene that should be rendered
   */
  scene: Scene;

  /**
   * The camera to render with
   */
  camera: PerspectiveCamera | OrthographicCamera;

  /**
   * The latest xr frame
   */
  frame?: XRFrame;

  /**
   * A user defined animation loop
   */
  private animationLoop?: (delta: number, time: number) => void;

  /**
   * The mode the renderer is in
   */
  private mode: XRRendererMode;

  /**
   * The HTML element for the XR interaction button
   */
  private buttonDomElement?: HTMLElement;

  /**
   * The resize observer for the renderer dom element
   */
  private resizeObserver: ResizeObserver;

  /**
   * Events system for frame events
   */
  private events = new EventSystem({ queued: true });

  /**
   * The renderers last call time
   */
  private lastCallTime = 0;

  /**
   * Constructor for an XRRenderer
   * @param manager the renderer manager for the XRRenderer
   * @param params the params for the XRRenderer
   */
  constructor({
    appendButton,
    renderer,
    mode,
    scene,
    camera,
  }: XRRendererParams) {
    this.mode = mode;
    this.three = renderer || new WebGLRenderer();
    this.three.xr.enabled = true;
    this.scene = scene;
    this.camera = camera;

    // set the animation loop
    this.three.setAnimationLoop((time: number, frame?: XRFrame) => {
      if (frame) {
        this.frame = frame;
        this.events.emit({
          topic: 'frame',
          data: {
            frame,
            time,
          },
        } as FrameEvent);
      }
      this.events.tick();
      this.three.render(this.scene, this.camera);

      const now = time / 1000;
      const elapsed = now - this.lastCallTime;

      if (this.animationLoop) {
        this.animationLoop(elapsed, now);
      }

      this.lastCallTime = now;
    });

    // Create the renderer dom element for views within the renderer
    this.domElement = document.createElement('div');

    // ensure root dom element has relative position
    this.domElement.style.position = 'relative';
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';

    // Set up the three js renderer dom element
    this.three.domElement.style.position = 'absolute';
    this.three.domElement.style.top = '0';
    this.three.domElement.style.left = '0';
    this.three.domElement.style.width = '100%';
    this.three.domElement.style.height = '100%';
    this.domElement.appendChild(this.three.domElement);

    // conditionally append the xr interaction button
    if (appendButton) {
      this.buttonDomElement =
        this.mode === XRRendererMode.AR
          ? ARButton.createButton(this.three)
          : VRButton.createButton(this.three);

      this.domElement.append(this.buttonDomElement);
    }

    // Set the pixel ratio for the renderer
    if (this.three instanceof WebGLRenderer) {
      this.three.setPixelRatio(window.devicePixelRatio);
    }

    // Create the event listener for the renderer dom element resizing
    window.addEventListener('resize', () => this.onResize(), false);
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.three.domElement);
  }

  /**
   * Sets a function to be called on every render
   * @param fn the function to be called on render
   */
  setAnimationLoop(fn: (delta: number, time: number) => void) {
    this.animationLoop = fn;
  }

  /**
   * Sets the camera for the renderer
   * @param c the new camera for the renderer
   */
  setCamera(c: PerspectiveCamera | OrthographicCamera): void {
    this.camera = c;
    this.onResize();
  }

  /**
   * Registers an event handler for new XRFrame frames
   * @param handler the handler for a new frame
   */
  onFrame(handler: (e: FrameEvent) => void): EventSubscription {
    return this.events.on('frame', handler);
  }

  /**
   * Destroys the XR renderer
   * @private used internally, do not call directly
   */
  destroy(): void {
    this.resizeObserver.disconnect();
    this.three.forceContextLoss();
    this.three.dispose();
    this.buttonDomElement?.remove();
  }

  /**
   * Handles resizing of the XR renderer
   * @private used internally, do not call directly
   */
  private onResize(): void {
    this.three.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
    }

    this.camera.updateProjectionMatrix();
  }
}
