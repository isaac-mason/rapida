import { beforeEach, describe, it, jest, expect } from '@jest/globals';
import { System, SystemManager } from '.';
import { World } from '../world';

describe('SystemManager', () => {
  const world = {} as unknown as World;
  let manager: SystemManager;

  const basicSystemInit = jest.fn();
  const basicSystemDestroy = jest.fn();
  const basicSystemOnUpdate = jest.fn();

  class BasicSystem extends System {
    _init = () => basicSystemInit();

    onUpdate = () => basicSystemOnUpdate();

    onDestroy = () => basicSystemDestroy();
  }
  const basicSystem = new BasicSystem();

  beforeEach(() => {
    manager = new SystemManager(world);
    jest.resetAllMocks();
  });

  describe('addSystem', () => {
    it('should add the system', () => {
      manager.addSystem(basicSystem);

      expect(manager.systems.size).toEqual(1);
      expect(manager.systems.get(basicSystem.id)).toBe(basicSystem);
    });
  });

  describe('removeSystem', () => {
    it('should remove and destroy the system', () => {
      manager.addSystem(basicSystem);

      expect(manager.systems.size).toEqual(1);
      expect(manager.systems.get(basicSystem.id)).toBe(basicSystem);

      manager.removeSystem(basicSystem);

      expect(manager.systems.size).toEqual(0);

      expect(basicSystemDestroy).toBeCalledTimes(1);
    });
  });

  describe('_init', () => {
    it('should initialise all systems', () => {
      manager.addSystem(basicSystem);

      manager._init();

      expect(basicSystemInit).toBeCalledTimes(1);
    });
  });

  describe('_update', () => {
    it('should update the system if it is enabled', () => {
      manager.addSystem(basicSystem);

      manager._init();

      basicSystem.enabled = false;

      manager._update(0);

      expect(basicSystemOnUpdate).toBeCalledTimes(0);

      basicSystem.enabled = true;

      manager._update(0);

      expect(basicSystemOnUpdate).toBeCalledTimes(1);
    });
  });
});
