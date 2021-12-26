import { Engine, EngineParams } from './engine';

export * from '@rapidajs/rapida-common';
export * from '@rapidajs/rapida-physics';
export * from '@rapidajs/recs';
export * from './camera';
export * from './engine';
export * from './renderer';
export * from './scene';
export * from './world';

export const rapida = (params?: EngineParams): Engine => new Engine(params);

export default rapida;
