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
- [worldProviders](Engine.md#worldproviders)

### Methods

- [destroy](Engine.md#destroy)
- [gameLoop](Engine.md#gameloop)
- [physicsLoop](Engine.md#physicsloop)
- [registerWorld](Engine.md#registerworld)
- [renderLoop](Engine.md#renderloop)
- [startWorld](Engine.md#startworld)

## Constructors

### constructor

• **new Engine**(`params?`)

Constructor for an Engine

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`EngineParams`](../modules.md#engineparams) | params for constructing the rapida Engine |

#### Defined in

[rapida/src/engine/index.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L63)

## Properties

### debug

• `Private` **debug**: `boolean`

Whether in debug mode

#### Defined in

[rapida/src/engine/index.ts:35](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L35)

___

### killLoop

• `Private` **killLoop**: `boolean` = `false`

Whether the render loop should be interrupted
If set to true, the loop will be stopped on the next loop
Set back to false after killing the loop

#### Defined in

[rapida/src/engine/index.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L42)

___

### log

• **log**: `Logger`

The logger for the engine

#### Defined in

[rapida/src/engine/index.ts:25](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L25)

___

### previousGameLoopFrame

• `Private` **previousGameLoopFrame**: `undefined` \| `number`

The time of the previous animation frame

#### Defined in

[rapida/src/engine/index.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L47)

___

### previousPhysicsFrame

• `Private` **previousPhysicsFrame**: `undefined` \| `number`

The time of the previous physics frame

#### Defined in

[rapida/src/engine/index.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L52)

___

### stats

• `Private` **stats**: `Stats`

The stats.js instance

#### Defined in

[rapida/src/engine/index.ts:57](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L57)

___

### world

• `Optional` **world**: [`World`](World.md)

The current world in play

#### Defined in

[rapida/src/engine/index.ts:20](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L20)

___

### worldProviders

• `Private` **worldProviders**: `Object` = `{}`

The world providers

#### Index signature

▪ [id: `string`]: [`WorldProvider`](../modules.md#worldprovider)

#### Defined in

[rapida/src/engine/index.ts:30](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L30)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the engine

#### Returns

`void`

#### Defined in

[rapida/src/engine/index.ts:142](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L142)

___

### gameLoop

▸ `Private` **gameLoop**(): `void`

The game logic loop

#### Returns

`void`

#### Defined in

[rapida/src/engine/index.ts:169](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L169)

___

### physicsLoop

▸ `Private` **physicsLoop**(): `void`

The physics loop

#### Returns

`void`

#### Defined in

[rapida/src/engine/index.ts:190](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L190)

___

### registerWorld

▸ **registerWorld**(`worldId`, `worldProvider`): `void`

Registers a new world provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `worldId` | `string` | the world ID |
| `worldProvider` | [`WorldProvider`](../modules.md#worldprovider) | a function that returns a new World for a given worldId |

#### Returns

`void`

#### Defined in

[rapida/src/engine/index.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L89)

___

### renderLoop

▸ `Private` **renderLoop**(): `void`

Runs the render loop for the engine

#### Returns

`void`

#### Defined in

[rapida/src/engine/index.ts:151](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L151)

___

### startWorld

▸ **startWorld**(`worldId`): [`Engine`](Engine.md)

Sets the world that is playing.
If a world is already playing, the current world is stopped and the new world is started.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `worldId` | `string` | the new world to start |

#### Returns

[`Engine`](Engine.md)

#### Defined in

[rapida/src/engine/index.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/engine/index.ts#L98)
