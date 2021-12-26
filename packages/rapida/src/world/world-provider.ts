import { World } from './world';
import { Engine } from '../engine';

export type WorldContext = {
  engine: Engine;
};

export type WorldProvider = (worldContext: WorldContext) => World;
