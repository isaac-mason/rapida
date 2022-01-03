import { ChromaticAberrationEffect as ChromaticAberrationEffectImpl } from 'postprocessing';

export type ChromaticAberrationEffectParams = ConstructorParameters<
  typeof ChromaticAberrationEffectImpl
>[0];

export const ChromaticAberrationEffect = (
  params: ChromaticAberrationEffectParams
): ChromaticAberrationEffectImpl => {
  return new ChromaticAberrationEffectImpl(params);
};
