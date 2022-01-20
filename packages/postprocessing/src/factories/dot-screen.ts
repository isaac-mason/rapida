import { DotScreenEffect as DotScreenEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const DotScreenEffect = wrapBasicEffect(DotScreenEffectImpl);
