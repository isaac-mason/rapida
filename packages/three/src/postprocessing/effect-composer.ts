import { EffectComposer as EffectComposerImpl } from 'postprocessing';
import { Camera, Scene, TextureDataType, WebGLRenderer } from 'three';
import { isWebGL2Available } from './utils';
import { EffectPass, NormalPass, Pass, RenderPass, Effect } from './types';

/**
 * Params for creating a new EffectComposer
 */
export type EffectComposerParams = {
  renderer: WebGLRenderer;
  camera: Camera;
  scene: Scene;

  /**
   * Whether the effect composer should use a depth buffer
   * @default true
   */
  depthBuffer?: boolean;

  /**
   * Whether a normal pass should be added.
   * @default true
   */
  normalPass?: boolean;

  /**
   * Whether the render target should have a stencil buffer
   */
  stencilBuffer?: boolean;

  /**
   * The number of samples to use for antialiasing
   * @default 0
   */
  multisampling?: number;

  /**
   * The type of the main frame buffers
   */
  frameBufferType?: TextureDataType;
};

/**
 * EffectComposer with support for simple post processing effects
 */
export class EffectComposer {
  /**
   * The renderer for the effect composer
   */
  renderer: WebGLRenderer;

  /**
   * The camera for the effect composer
   */
  camera: Camera;

  /**
   * The scene for the effect composer
   */
  scene: Scene;

  /**
   * The effect composer implementation
   */
  composer: EffectComposerImpl;

  /**
   * The effect composers default render pass
   */
  renderPass: RenderPass;

  /**
   * The effect composers default normal pass
   */
  normalPass: NormalPass | undefined;

  /**
   * The effect composers effect pass
   */
  effectPass: EffectPass | undefined;

  /**
   * Effects in the effect composer
   */
  _effects: Effect[] = [];

  /**
   * Constructor for a new EffectComposer
   * @param params params for the EffectComposer
   */
  constructor(params: EffectComposerParams) {
    // store three params
    this.renderer = params.renderer;
    this.camera = params.camera;
    this.scene = params.scene;

    // Initialize composer
    this.composer = new EffectComposerImpl(this.renderer, {
      multisampling: isWebGL2Available() ? params.multisampling || 8 : 0,
      depthBuffer: params.depthBuffer,
      stencilBuffer: params.stencilBuffer,
      frameBufferType: params.frameBufferType,
    });

    // add render pass
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    // add normal pass by default
    if (params.normalPass === undefined || params.normalPass === true) {
      this.normalPass = new NormalPass(this.scene, this.camera);
      this.normalPass.renderToScreen = true;
      this.composer.addPass(this.normalPass);
    }
  }

  /**
   * Methods for adding to the Effect Composer
   */
  get add() {
    return {
      /**
       * Adds effects to the effect composers effect pass
       * @param e the effects to add
       */
      effects: (...e: Effect[]) => {
        this.addEffects(e);
      },
      /**
       * Adds a pass to the effect composer
       * @param pass the pass to add
       * @param index the index to add the pass at
       */
      pass: (pass: Pass, index?: number): void => {
        this.composer.addPass(pass, index);
      },
    };
  }

  /**
   * Methods for removing from the effect composer
   */
  get remove() {
    return {
      /**
       * Removes an effect from the effect composer
       * @param effect the effect to remove
       */
      effect: (effect: Effect): void => {
        this._effects = this._effects.filter((e) => e !== effect);
        this.recreateEffectPass();
      },
      /**
       * Removes a pass from the effect composer
       * @param pass the pass to remove
       */
      pass: (pass: Pass): void => {
        this.composer.removePass(pass);
      },
    };
  }

  /**
   * Renders the effect composer
   * @param timeElapsed the time elapsed
   */
  render(timeElapsed: number) {
    this.composer.render(timeElapsed);
  }

  /**
   * Sets the size of the effect composer
   * @param width the width for the effect composer
   * @param height the height for the effect composer
   */
  setSize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  /**
   * Adds effects to the effect composers built in effect pass
   * @param effects the effects to add
   */
  private addEffects(effects: Effect[]): void {
    this._effects.push(...effects);
    this.recreateEffectPass();
  }

  /**
   * Recreates the effect pass
   */
  private recreateEffectPass(): void {
    // remove the existing effect pass
    if (this.effectPass) {
      this.composer.removePass(this.effectPass);
      this.effectPass.dispose();
    }

    // add the new effect pass
    this.effectPass = new EffectPass(this.camera, ...this._effects);
    this.composer.addPass(this.effectPass);
    this.effectPass.renderToScreen = true;
    if (this.normalPass) {
      this.normalPass.enabled = false;
    }
  }
}
