import { Component } from './component';
import { ObjectPool } from './object-pool';

/**
 * ComponentPool that manages reuse of component objects
 *
 * @private internal class, do not use directly
 */
export class ComponentPool {
  /**
   * The a map of component names to object pools
   */
  _objectPools: { [componentName: string]: ObjectPool<Component> } = {};

  /**
   * The total number of component pools
   */
  get totalPools(): number {
    return Object.values(this._objectPools).length;
  }

  /**
   * The total size of the component pool
   */
  get totalSize(): number {
    return Object.values(this._objectPools).reduce((total, pool) => {
      return total + pool.totalSize;
    }, 0);
  }

  /**
   * The number of available objects in the component pool
   */
  get totalFree(): number {
    return Object.values(this._objectPools).reduce((total, pool) => {
      return total + pool.totalFree;
    }, 0);
  }

  /**
   * The number of used objects in the component pool
   */
  get totalUsed(): number {
    return Object.values(this._objectPools).reduce((total, pool) => {
      return total + pool.totalUsed;
    }, 0);
  }

  /**
   * Requests a component from the component pool
   */
  request<T extends Component>(constr: { new (...args: never[]): T }): T {
    const name = Component.getComponentName(constr);
    let pool = this._objectPools[name];

    if (!pool) {
      // eslint-disable-next-line new-cap
      pool = new ObjectPool<T>(() => new constr());
      this._objectPools[name] = pool;
    }

    return (pool as ObjectPool<T>).request();
  }

  /**
   * Releases a component from the component pool
   * @param component the component to release
   */
  release(component: Component): void {
    const name = Component.getComponentName(component);
    const pool = this._objectPools[name];

    if (pool) {
      pool.release(component);
    }
  }
}
