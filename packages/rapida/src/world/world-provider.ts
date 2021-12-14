import { World } from './world';
import { Engine } from '../engine';

type WorldContext = {
  engine: Engine;
};

type WorldProvider = (worldContext: WorldContext) => World;

export { WorldProvider, WorldContext };
