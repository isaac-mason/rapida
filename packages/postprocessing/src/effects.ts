import { Camera, Scene } from 'three';
import { NormalPass } from './types';
import {
  BloomEffect,
  BrightnessContrastEffect,
  ChromaticAberrationEffect,
  ColorAverageEffect,
  ColorDepthEffect,
  DepthEffect,
  DepthOfFieldEffect,
  DotScreenEffect,
  GodRaysEffect,
  GlitchEffect,
  GridEffect,
  HueSaturationEffect,
  NoiseEffect,
  SSAOEffect,
  OutlineEffect,
  PixelationEffect,
  SepiaEffect,
  ScanlineEffect,
  ToneMappingEffect,
  VignetteEffect,
} from './factories';

/**
 * Factories for creating post processing effects
 */
export const Effects = {
  /**
   * Creates a new Bloom post processing effect
   * @param params params for the bloom effect
   * @returns the bloom effect
   */
  bloom: (
    params?: Parameters<typeof BloomEffect>[0]
  ): ReturnType<typeof BloomEffect> => {
    return BloomEffect(params || {});
  },
  /**
   * Creates a new brightness contrast post processing effect
   * @param params params for the brightness contrast effect
   * @returns the brightness contrast effect
   */
  brightnessContrast: (
    params?: Parameters<typeof BrightnessContrastEffect>[0]
  ): ReturnType<typeof BrightnessContrastEffect> => {
    return BrightnessContrastEffect(params || {});
  },
  /**
   * Creates a new chromatic aberration post processing effect
   * @param params params for the chromatic aberration post processing effect
   * @returns the chromatic aberration effect
   */
  chromaticAberration: (
    params: Parameters<typeof ChromaticAberrationEffect>[0]
  ): ReturnType<typeof ChromaticAberrationEffect> => {
    return ChromaticAberrationEffect(params);
  },
  /**
   * Creates a new chromatic aberration post processing effect
   * @param params params for the chromatic aberration post processing effect
   * @returns the chromatic aberration effect
   */
  colorAverage: (
    params?: Parameters<typeof ColorAverageEffect>[0]
  ): ReturnType<typeof ColorAverageEffect> => {
    return ColorAverageEffect(params || {});
  },
  /**
   * Creates a new color depth post processing effect
   * @param params the params for the color depth post processing effect
   * @returns the color depth effect
   */
  colorDepth: (
    params?: Parameters<typeof ColorDepthEffect>[0]
  ): ReturnType<typeof ColorDepthEffect> => {
    return ColorDepthEffect(params || {});
  },
  /**
   * Creates a new depth post processing effect
   * @param params the params for the depth post processing effect
   * @returns the depth effect
   */
  depth: (
    params?: Parameters<typeof DepthEffect>[0]
  ): ReturnType<typeof DepthEffect> => {
    return DepthEffect(params || {});
  },
  /**
   * Creates a new depth of field post processing effect
   * @param camera the camera for the effect
   * @param params the params for the effect
   * @returns the depth of field effect
   */
  depthOfField: (
    camera: Camera,
    params?: Parameters<typeof DepthOfFieldEffect>[1]
  ): ReturnType<typeof DepthOfFieldEffect> => {
    return DepthOfFieldEffect(camera, params || {});
  },
  /**
   * Creates a new dot screen post processing effect
   * @param params the params for the effect
   * @returns the dot screen effect
   */
  dotScreen: (
    params?: Parameters<typeof DotScreenEffect>[0]
  ): ReturnType<typeof DotScreenEffect> => {
    return DotScreenEffect(params || {});
  },
  /**
   * Creates a new glitch post processing effect
   * @param params the params for the effect
   * @returns the glitch effect
   */
  glitch: (
    params?: Parameters<typeof GlitchEffect>[0]
  ): ReturnType<typeof GlitchEffect> => {
    return GlitchEffect(params || {});
  },
  /**
   * Creates a new god rays post processing effect
   * @param camera the camera
   * @param sun the sun
   * @param params the params for the effect
   * @returns the god rays effect
   */
  godRays: (
    camera: Camera,
    sun: Parameters<typeof GodRaysEffect>[1],
    params?: Parameters<typeof GodRaysEffect>[2]
  ): ReturnType<typeof GodRaysEffect> => {
    return GodRaysEffect(camera, sun, params || {});
  },
  /**
   * Creates a new grid post processing effect
   * @param params the params for the effect
   * @returns the grid effect
   */
  grid: (
    params?: Parameters<typeof GridEffect>[0]
  ): ReturnType<typeof GridEffect> => {
    return GridEffect(params || {});
  },
  /**
   * Creates a new hue saturation post processing effect
   * @param params the params for the effect
   * @returns the hue saturation effect
   */
  hueSaturation: (
    params?: Parameters<typeof HueSaturationEffect>[0]
  ): ReturnType<typeof HueSaturationEffect> => {
    return HueSaturationEffect(params || {});
  },
  /**
   * Creates a new noise post processing effect
   * @param params the params for the effect
   * @returns the noise effect
   */
  noise: (
    params?: Parameters<typeof NoiseEffect>[0]
  ): ReturnType<typeof NoiseEffect> => {
    return NoiseEffect(params || {});
  },
  /**
   * Creates a new outline post processing effect
   * @param params the params for the effect
   * @returns the outline effect
   */
  outline: (
    scene: Scene,
    camera: Camera,
    params?: Parameters<typeof OutlineEffect>[2]
  ): ReturnType<typeof OutlineEffect> => {
    return OutlineEffect(scene, camera, params || {});
  },
  /**
   * Creates a new pixelation post processing effect
   * @param params the params for the effect
   * @returns the pixelation effect
   */
  pixelation: (
    params?: Parameters<typeof PixelationEffect>[0]
  ): ReturnType<typeof PixelationEffect> => {
    return PixelationEffect(params || {});
  },
  /**
   * Creates a new scanline post processing effect
   * @param params the params for the effect
   * @returns the scanline effect
   */
  scanline: (
    params?: Parameters<typeof ScanlineEffect>[0]
  ): ReturnType<typeof ScanlineEffect> => {
    return ScanlineEffect(params || {});
  },
  /**
   * Creates a new sepia post processing effect
   * @param params the params for the effect
   * @returns the sepia effect
   */
  sepia: (
    params?: Parameters<typeof SepiaEffect>[0]
  ): ReturnType<typeof SepiaEffect> => {
    return SepiaEffect(params || {});
  },
  /**
   * Creates a new tone mapping post processing effect
   * @param params the params for the effect
   * @returns the tone mapping effect
   */
  toneMapping: (
    params?: Parameters<typeof ToneMappingEffect>[0]
  ): ReturnType<typeof ToneMappingEffect> => {
    return ToneMappingEffect(params || {});
  },
  /**
   * Creates a new tone mapping post processing effect
   * @param params the params for the effect
   * @returns the tone mapping effect
   */
  vignette: (
    params?: Parameters<typeof VignetteEffect>[0]
  ): ReturnType<typeof VignetteEffect> => {
    return VignetteEffect(params || {});
  },
  /**
   * Creates a new SSAO post processing effect
   * @param params params for the SSAO effect
   * @returns the SSAO effect
   */
  ssao: (
    camera: Camera,
    normalPass: NormalPass,
    params?: Parameters<typeof SSAOEffect>[2]
  ): ReturnType<typeof SSAOEffect> => {
    return SSAOEffect(camera, normalPass, params || {});
  },
};
