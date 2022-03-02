import CannonWorker from '@rapidajs/cannon-worker';
import { System } from '@rapidajs/rapida';

/**
 * CannonSystem steps a CannonWorker
 * @private used internally
 */
export class CannonSystem extends System {
  cannon: CannonWorker;

  constructor(cannon: CannonWorker) {
    super();
    this.cannon = cannon;
  }

  onUpdate = (timeElapsed: number): void => {
    this.cannon.step(timeElapsed);
  };

  onDestroy = (): void => {
    this.cannon.terminate();
  };
}
