import { Event, EventSystem, uuid } from '@rapidajs/rapida-common';
import { WebGLRenderer, PerspectiveCamera, XRFrame } from 'three';
import { ARButton } from 'three-stdlib/webxr/ARButton';
import { VRButton } from 'three-stdlib/webxr/VRButton';
import { Camera } from '../../camera';
import { Scene } from '../../scene';
import { Renderer } from '../renderer';

/**
 * An event for a new XRFrame
 */
interface FrameEvent extends Event {
  topic: 'frame';
  data: {
    frame: XRFrame;
    time: number;
  };
}

/**
 * XRRenderer modes
 */
enum XRRendererMode {
  VR = 'VR',
  AR = 'AR',
}

/**
 * Params for creating a new VRRenderer
 */
type XRRendererParams = {
  /**
   * The dom element id for the xr renderer
   */
  domElementId: string;

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
  camera: Camera;
};

/**
 * Renderer for VR and AR content
 */
class XRRenderer implements Renderer {
  /**
   * Unique id for the vr renderer
   */
  id = uuid();

  /**
   * The renderer for the vr renderer
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
  camera: Camera;

  /**
   * The latest xr frame
   */
  frame?: XRFrame;

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
  private events = new EventSystem();

  constructor({
    appendButton,
    domElementId,
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
      this.three.render(this.scene.threeScene, this.camera.threeCamera);
    });

    // Create the renderer dom element for views within the renderer
    this.domElement = document.getElementById(domElementId) as HTMLElement;

    // ensure root dom element has relative position
    this.domElement.style.position = 'relative';

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
    window.addEventListener('resize', () => this._onResize(), false);
    this.resizeObserver = new ResizeObserver(() => this._onResize());
    this.resizeObserver.observe(this.three.domElement);
  }

  /**
   * Destroys the XR renderer
   */
  destroy(): void {
    this.resizeObserver.disconnect();
    this.three.forceContextLoss();
    this.three.dispose();
    this.buttonDomElement?.remove();
  }

  /**
   * Handles resizing of the XR renderer
   */
  _onResize(): void {
    this.three.setSize(
      this.domElement.clientWidth,
      this.domElement.clientHeight
    );

    if (this.camera.threeCamera instanceof PerspectiveCamera) {
      this.camera.threeCamera.aspect = window.innerWidth / window.innerHeight;
    }

    this.camera.threeCamera.updateProjectionMatrix();
  }

  /**
   * Registers an event handler for new XRFrame frames
   * @param handler the handler for a new frame
   */
  onFrame(handler: (e: FrameEvent) => void): { unsubscribe: () => void } {
    const id = this.events.on('frame', handler);

    return { unsubscribe: () => this.events.removeHandler('frame', id) };
  }
}

export { XRRenderer, XRRendererParams, XRRendererMode };
