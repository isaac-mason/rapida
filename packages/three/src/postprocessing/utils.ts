import { BlendFunction, Effect } from 'postprocessing';

type DefaultParams = Partial<{ blendFunction: BlendFunction; opacity: number }>;

export const wrapBasicEffect =
  <I extends Effect, C extends new (...args: any[]) => I>(
    effectImpl: C,
    defaultBlendMode: BlendFunction = BlendFunction.NORMAL
  ) =>
  ({
    blendFunction,
    opacity,
    ...params
  }: DefaultParams & ConstructorParameters<C>[0]) => {
    const effect: I = new effectImpl(params);

    // set default blend function
    effect.blendMode.blendFunction = blendFunction || defaultBlendMode;

    // set opacity if provided
    if (opacity !== undefined) {
      effect.blendMode.opacity.value = opacity;
    }
    return effect;
  };

export const isWebGL2Available = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch (e) {
    return false;
  }
};
