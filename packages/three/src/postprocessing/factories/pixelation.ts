import { PixelationEffect as PixelationEffectImpl } from 'postprocessing';

type Params = Partial<{
  granularity: number;
}>;

const wrapEffect =
  <C extends new (...args: any[]) => PixelationEffectImpl>(effectImpl: C) =>
  ({ ...params }: Params) => {
    const effect: PixelationEffectImpl = new effectImpl(params.granularity);

    return effect;
  };

const WrappedPixelationEffect = wrapEffect(PixelationEffectImpl);

export const PixelationEffect = (
  params: Parameters<typeof WrappedPixelationEffect>[0]
): PixelationEffectImpl => {
  const effect = WrappedPixelationEffect(params);

  return effect;
};
