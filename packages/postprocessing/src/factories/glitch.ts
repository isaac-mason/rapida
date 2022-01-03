import { GlitchEffect as GlitchEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const GlitchEffect = wrapBasicEffect(GlitchEffectImpl);
