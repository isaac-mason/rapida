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

/**
 * Creates a new rapida engine
 * @param params the params for the new rapida engine
 * @returns a new rapida engine
 */
export const engine = (params?: EngineParams): Engine => new Engine(params);

/**
 * Creates a new rapida world
 * @param params the params for the new rapida world
 * @returns a new rapida world
 */
export const world = (params?: WorldParams): World => new World(params);

export default {
  engine,
  world,
};
