import { ChromaticAberrationEffect as ChromaticAberrationEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const ChromaticAberrationEffect = wrapBasicEffect(
  ChromaticAberrationEffectImpl
);
