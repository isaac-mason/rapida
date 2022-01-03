import { PixelationEffect as PixelationEffectImpl } from 'postprocessing';

type ExtraParams = Partial<{
  granularity: number;
}>;

const wrapEffect =
  <C extends new (...args: any[]) => PixelationEffectImpl>(effectImpl: C) =>
  ({ ...params }: ExtraParams & ConstructorParameters<C>[0]) => {
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
