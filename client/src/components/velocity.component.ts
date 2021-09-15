import { Vector3 } from 'three';
import { Component } from '../core/component';

/**
 * A component for applying simple velocity to an object
 */
class VelocityComponent extends Component {
  velocity: Vector3 = new Vector3();

  /**
   * Applies the velocity to the entity
   * @param timeElapsed the time elapsed in seconds since the last update
   */
  update = (timeElapsed: number): void => {
    this.entity.position = {
      x: this.entity.position.x + this.velocity.x * timeElapsed,
      y: this.entity.position.y + this.velocity.y * timeElapsed,
      z: this.entity.position.z + this.velocity.z * timeElapsed,
    };
  };
}

export default VelocityComponent;
