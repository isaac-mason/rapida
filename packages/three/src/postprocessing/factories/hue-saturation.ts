import { HueSaturationEffect as HueSaturationEffectImpl } from 'postprocessing';
import { wrapBasicEffect } from '../utils';

export const HueSaturationEffect = wrapBasicEffect(HueSaturationEffectImpl);
