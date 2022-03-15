import {
  BlendFunction as BlendFunctionImpl,
  EffectPass as EffectPassImpl,
  Effect as EffectImpl,
  NormalPass as NormalPassImpl,
  Pass as PassImpl,
  RenderPass as RenderPassImpl,
} from 'postprocessing';

/**
 * Re-exported types from postprocessing
 */
export {
  BlendFunctionImpl as BlendFunction,
  NormalPassImpl as NormalPass,
  EffectPassImpl as EffectPass,
  PassImpl as Pass,
  RenderPassImpl as RenderPass,
};

/**
 * Re-exported type for postprocessing effect
 */
export type Effect = EffectImpl;
