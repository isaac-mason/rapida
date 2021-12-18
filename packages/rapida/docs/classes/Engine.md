# Class: Engine

Engine for rapida worlds

## Table of contents

### Constructors

- [constructor](Engine.md#constructor)

### Properties

- [debug](Engine.md#debug)
- [killLoop](Engine.md#killloop)
- [log](Engine.md#log)
- [previousGameLoopFrame](Engine.md#previousgameloopframe)
- [previousPhysicsFrame](Engine.md#previousphysicsframe)
- [stats](Engine.md#stats)
- [world](Engine.md#world)

### Methods

- [destroy](Engine.md#destroy)
- [gameLoop](Engine.md#gameloop)
- [physicsLoop](Engine.md#physicsloop)
- [renderLoop](Engine.md#renderloop)
- [run](Engine.md#run)

## Constructors

### constructor

• **new Engine**(`params?`)

Constructor for an Engine

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`EngineParams`](../modules.md#engineparams) | params for constructing the rapida Engine |

#### Defined in

[packages/rapida/src/engine/index.ts:58](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L58)

## Properties

### debug

• `Private` **debug**: `boolean`

Whether in debug mode

#### Defined in

[packages/rapida/src/engine/index.ts:30](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L30)

___

### killLoop

• `Private` **killLoop**: `boolean` = `false`

Whether the render loop should be interrupted
If set to true, the loop will be stopped on the next loop
Set back to false after killing the loop

#### Defined in

[packages/rapida/src/engine/index.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L37)

___

### log

• **log**: `Logger`

The logger for the engine

#### Defined in

[packages/rapida/src/engine/index.ts:25](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L25)

___

### previousGameLoopFrame

• `Private` **previousGameLoopFrame**: `undefined` \| `number`

The time of the previous animation frame

#### Defined in

[packages/rapida/src/engine/index.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L42)

___

### previousPhysicsFrame

• `Private` **previousPhysicsFrame**: `undefined` \| `number`

The time of the previous physics frame

#### Defined in

[packages/rapida/src/engine/index.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L47)

___

### stats

• `Private` **stats**: `Stats`

The stats.js instance

#### Defined in

[packages/rapida/src/engine/index.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L52)

___

### world

• `Optional` **world**: [`World`](World.md)

The current world in play

#### Defined in

[packages/rapida/src/engine/index.ts:20](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L20)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the engine

#### Returns

`void`

#### Defined in

[packages/rapida/src/engine/index.ts:119](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L119)

___

### gameLoop

▸ `Private` **gameLoop**(): `void`

The game logic loop

#### Returns

`void`

#### Defined in

[packages/rapida/src/engine/index.ts:146](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L146)

___

### physicsLoop

▸ `Private` **physicsLoop**(): `void`

The physics loop

#### Returns

`void`

#### Defined in

[packages/rapida/src/engine/index.ts:167](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L167)

___

### renderLoop

▸ `Private` **renderLoop**(): `void`

Runs the render loop for the engine

#### Returns

`void`

#### Defined in

[packages/rapida/src/engine/index.ts:128](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L128)

___

### run

▸ **run**(`worldProvider`): [`Engine`](Engine.md)

Sets the world that is playing.
If a world is already playing, the current world is stopped and the new world is started.

#### Parameters

| Name | Type |
| :------ | :------ |
| `worldProvider` | [`WorldProvider`](../modules.md#worldprovider) |

#### Returns

[`Engine`](Engine.md)

#### Defined in

[packages/rapida/src/engine/index.ts:81](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L81)
