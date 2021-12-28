import { Engine, EngineParams } from './engine';
import { World, WorldParams } from './world';

export * from '@rapidajs/rapida-common';
export * from '@rapidajs/rapida-physics';
export * from '@rapidajs/recs';
export * from './camera';
export * from './engine';
export * from './renderer';
export * from './scene';
export * from './world';

export const engine = (params?: EngineParams): Engine => new Engine(params);

export const world = (params?: WorldParams): World => new World(params);

export default {
  engine,
  world,
};
