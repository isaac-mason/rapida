import { Body, Quaternion as CQuaternion, Vec3 } from 'cannon-es';
import cannonDebugger from 'cannon-es-debugger';
import { Color, Quaternion, Scene, Vector3 } from 'three';
import { propsToBody } from '../props-to-body';
import type { CannonWorker } from '../cannon-worker';
import type { BodyProps, BodyShapeType } from '../types';

/**
 * Debugging information available to a debugger
 */
export type DebuggerInfo = { bodies: Body[]; objects: { [uuid: string]: Body } };

/**
 * Color for the physics debugger to use
 */
export type DebuggerColor = string | number | Color;

/**
 * Params for creating a PhysicsDebugger instance
 */
export type CannonWorkerDebuggerParams = {
  scene?: Scene;
  color?: DebuggerColor;
  scale?: number;
};

const v = new Vector3();
const s = new Vector3(1, 1, 1);
const q = new Quaternion();

/**
 * Debugger for Physics that adds physics object representations to a three scene
 */
export class CannonWorkerDebugger {
  /**
   * The physics world for the debugger
   */
  physics: CannonWorker;

  /**
   * The scene that the debugger is adding and removing from
   */
  scene: Scene;

  /**
   * The color for debug three objects to be displayed as
   */
  color: DebuggerColor;

  /**
   * The scale of the debugger
   */
  scale: number;

  /**
   * The cannon debugger
   */
  debugger: { update: () => void };

  /**
   * Physics world debug information
   */
  debugInfo: DebuggerInfo = { bodies: [], objects: {} };

  /**
   * Constructor for a new cannon physics debugger
   * @param physics the physics instance
   * @param params the params for the debugger
   */
  constructor(physics: CannonWorker, params?: CannonWorkerDebuggerParams) {
    this.physics = physics;
    this.physics.debugger = this;

    this.scene = params?.scene ? params.scene : new Scene();
    this.color = params?.color ? params.color : 'white';
    this.scale = params?.scale ? params.scale : 1;

    this.debugger = cannonDebugger(this.scene, this.debugInfo.bodies, {
      color: this.color,
      scale: this.scale,
      autoUpdate: false,
    });
  }

  /**
   * Updates the debugger
   */
  update(): void {
    Object.keys(this.debugInfo.objects).forEach((uuid) => {
      this.physics.objects.get(uuid)?.matrix.decompose(v, q, s);
      this.debugInfo.objects[uuid].position.copy(v as unknown as Vec3);
      this.debugInfo.objects[uuid].quaternion.copy(q as unknown as CQuaternion);
    });

    this.debugger.update();
  }

  /**
   * Adds a body to the debugger
   * @param id the id of the body
   * @param params params for the body
   * @param type the body shape type
   */
  add(id: string, params: BodyProps, type: BodyShapeType): void {
    const body = propsToBody(id, params, type);
    this.debugInfo.bodies.push(body);
    this.debugInfo.objects[id] = body;
  }

  /**
   * Removes a body from the debugger
   * @param id the id of the body
   */
  remove(id: string): void {
    const debugBodyIndex = this.debugInfo.bodies.indexOf(this.debugInfo.objects[id]);
    if (debugBodyIndex > -1) this.debugInfo.bodies.splice(debugBodyIndex, 1);
    delete this.debugInfo.objects[id];
  }
}
