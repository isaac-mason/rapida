import { Physics, PhysicsParams } from '@rapidajs/rapida-physics';
import { World } from '../world';

/**
 * RapidaPhysics is a small extension of the `@rapidajs/rapida-physics` Physics class, but with added methods for interacting with a World
 */
class RapidaPhysics extends Physics {
  /**
   * The world the physics instance is in
   */
  private world: World;

  /**
   * Constructor for a rapida physics instance
   * @param world
   * @param params
   */
  constructor(world: World, params: PhysicsParams) {
    super(params);
    this.world = world;
  }

  /**
   * Destroys the physics instance and removes it from the world
   */
  destroy(): void {
    this.world.remove(this);
  }

  /**
   * Destroys the physics instance
   */
  _destroy(): void {
    this.terminate();
  }
}

export { RapidaPhysics };
