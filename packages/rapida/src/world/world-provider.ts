import { World } from './world';
import { Runtime } from '../runtime';

type WorldContext = {
  runtime: Runtime;
};

type WorldProvider = (worldContext: WorldContext) => World;

export default WorldProvider;

export { WorldContext };
