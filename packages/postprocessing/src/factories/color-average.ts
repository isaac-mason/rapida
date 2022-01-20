import { ColorAverageEffect as ColorAverageEffectImpl } from 'postprocessing';
import { BlendFunction } from '../types';

export type ColorAverageEffectParams = Partial<{
  blendFunction: BlendFunction;
}>;
export const ColorAverageEffect = (
  params: ColorAverageEffectParams
): ColorAverageEffectImpl => {
  return new ColorAverageEffectImpl(
    params.blendFunction || BlendFunction.NORMAL
  );
};
