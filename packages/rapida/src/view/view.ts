import { uuid } from '@rapidajs/rapida-common';
import { Color, PerspectiveCamera, Vector2, WebGLRenderer } from 'three';
import { EffectComposer, RenderPass } from 'three-stdlib';
import { Scene } from '../scene';
import { Camera } from '../camera';
import { World } from '../world';

/**
 * The Viewport for the view
 */
type Viewport = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * The Scissor for the view
 */
type Scissor = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ViewParams = {
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
   * The viewport for the view. Defaults to the full screen.
   */
  viewport?: Viewport;
  /**
   * The scissor for the view. Defaults to the full screen.
   */
  scissor?: Scissor;
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
 * A view that the runtime should render
 */
class View {
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
   * The viewport for the view. Sets how to convert from a shader's clip space to some portion of the canvas's pixel space
   */
  viewport: Viewport;

  /**
   * The scissor for the view. The shape outside of which nothing can be rendered
   */
  scissor: Scissor;

  /**
   * Whether clearDepth should be called after rendering this view
   */
  clearDepth: boolean;

  /**
   * The clear color the renderer should use for this view. Defaults to black - 0x000000
   */
  clearColor: Color;

  /**
   * The relative mouse position on the view.
   */
  mouse: Vector2 = new Vector2();

  /**
   * The current size of the viewport in pixels
   */
  size: {
    left: number;
    top: number;
    width: number;
    height: number;
  } = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  };

  /**
   * The effect composer for the view
   */
  effectComposer: EffectComposer;

  /**
   * The world the view belongs to
   */
  private world: World;

  /**
   * The render pass for the view
   */
  private renderPass: RenderPass;

  private get renderer(): WebGLRenderer {
    return this.world.runtime.renderer;
  }

  constructor(
    world: World,
    { id, camera, scene, viewport, scissor, clearDepth, clearColor }: ViewParams
  ) {
    this.world = world;
    this.id = id || uuid();
    this.camera = camera;
    this.scene = scene;
    this.viewport = viewport || { top: 0, left: 0, width: 1, height: 1 };
    this.scissor = scissor || { top: 0, left: 0, width: 1, height: 1 };
    this.clearDepth = clearDepth || false;
    this.clearColor =
      clearColor instanceof Color ? clearColor : new Color(clearColor);

    // create the effect composer for the view
    this.effectComposer = new EffectComposer(this.world.runtime.renderer);

    // create the render pass for the view
    this.renderPass = new RenderPass(
      this.scene.threeScene,
      this.camera.threeCamera
    );

    // add the render pass for the view
    this.effectComposer.addPass(this.renderPass);
  }

  /**
   * Sets the camera for the view to use
   * @param camera the new camera for the view
   */
  setCamera(camera: Camera): void {
    this.camera = camera;
  }

  _init = (): void => {
    // add the resize listener
    this._onResize();
    window.addEventListener(
      'mousemove',
      (event) => {
        const relX =
          ((event.clientX - this.size.left) / this.size.width) * 2 - 1;
        const relY = -(
          ((event.clientY - this.size.top) / this.size.height) * 2 -
          1
        );
        this.mouse.set(relX, relY);
      },
      false
    );
  };

  /**
   * Destroys the view
   */
  _destroy = (): void => {
    // add the render pass for the view
    this.effectComposer.removePass(this.renderPass);
  };

  _onResize = (): void => {
    this.size = this.getBoundingRect();

    if (this.camera.threeCamera instanceof PerspectiveCamera) {
      this.camera.threeCamera.aspect = this.size.width / this.size.height;
    }

    this.effectComposer.setSize(this.size.width, this.size.height);

    this.camera.threeCamera.updateProjectionMatrix();
  };

  private getBoundingRect() {
    const rendererDomRect = this.renderer.domElement.getBoundingClientRect();

    const size = {
      left: rendererDomRect.width * this.viewport.left,
      top: rendererDomRect.height * this.viewport.top,
      width: rendererDomRect.width * this.viewport.width,
      height: rendererDomRect.height * this.viewport.height,
    };
    return size;
  }
}

export default View;

export { View, ViewParams };
