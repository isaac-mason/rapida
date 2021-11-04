import { NetworkManager } from '../network/network-manager';
import { Runtime } from '../runtime';
import Scene from './index';

/**
 * Parameters for the scene provider method
 */
type SceneProviderParams = {
  networkManager?: NetworkManager;
  runtime: Runtime;
};

/**
 * A scene provider
 */
type SceneProvider = (params: SceneProviderParams) => Scene;

export { SceneProvider, SceneProviderParams };
