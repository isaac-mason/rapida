import { ToneMappingEffect as ToneMappingEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const ToneMappingEffect = wrapBasicEffect(ToneMappingEffectImpl);
