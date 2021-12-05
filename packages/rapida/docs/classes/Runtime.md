# Class: Runtime

A Runtime for rapida worlds

## Table of contents

### Constructors

- [constructor](Runtime.md#constructor)

### Properties

- [debug](Runtime.md#debug)
- [domElement](Runtime.md#domelement)
- [killLoop](Runtime.md#killloop)
- [log](Runtime.md#log)
- [previousGameLoopFrame](Runtime.md#previousgameloopframe)
- [stats](Runtime.md#stats)
- [updateDelay](Runtime.md#updatedelay)
- [world](Runtime.md#world)
- [worldProviders](Runtime.md#worldproviders)

### Methods

- [destroy](Runtime.md#destroy)
- [gameLoop](Runtime.md#gameloop)
- [physicsLoop](Runtime.md#physicsloop)
- [registerWorld](Runtime.md#registerworld)
- [renderLoop](Runtime.md#renderloop)
- [startWorld](Runtime.md#startworld)

## Constructors

### constructor

• **new Runtime**(`params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`RuntimeParams`](../modules.md#runtimeparams) |

#### Defined in

[rapida/src/runtime/index.ts:66](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L66)

## Properties

### debug

• `Private` **debug**: `boolean`

Whether the runtime is in debug mode

#### Defined in

[rapida/src/runtime/index.ts:36](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L36)

___

### domElement

• `Private` **domElement**: `any`

The DOM element for the renderer

#### Defined in

[rapida/src/runtime/index.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L42)

___

### killLoop

• `Private` **killLoop**: `boolean` = `false`

Whether the render loop should be interrupted
If set to true, the loop will be stopped on the next loop
Set back to false after killing the loop

#### Defined in

[rapida/src/runtime/index.ts:49](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L49)

___

### log

• **log**: `Logger`

The logger for the runtime

#### Defined in

[rapida/src/runtime/index.ts:26](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L26)

___

### previousGameLoopFrame

• `Private` **previousGameLoopFrame**: `undefined` \| `number`

The time of the previous animation frame

#### Defined in

[rapida/src/runtime/index.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L59)

___

### stats

• `Private` **stats**: `Stats`

The stats.js instance for the runtime

#### Defined in

[rapida/src/runtime/index.ts:64](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L64)

___

### updateDelay

• `Private` **updateDelay**: `number`

The time in milliseconds to wait before running another runtime update

#### Defined in

[rapida/src/runtime/index.ts:54](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L54)

___

### world

• `Optional` **world**: [`World`](World.md)

The current world in play

#### Defined in

[rapida/src/runtime/index.ts:21](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L21)

___

### worldProviders

• `Private` **worldProviders**: `Object` = `{}`

The world providers for the runtime

#### Index signature

▪ [id: `string`]: [`WorldProvider`](../modules.md#worldprovider)

#### Defined in

[rapida/src/runtime/index.ts:31](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L31)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the runtime

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:147](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L147)

___

### gameLoop

▸ `Private` **gameLoop**(): `void`

The game logic loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:174](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L174)

___

### physicsLoop

▸ `Private` **physicsLoop**(): `void`

The physics loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:194](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L194)

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

[rapida/src/runtime/index.ts:95](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L95)

___

### renderLoop

▸ `Private` **renderLoop**(): `void`

Runs the render loop for the runtime

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:156](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L156)

___

### startWorld

▸ **startWorld**(`worldId`): [`Runtime`](Runtime.md)

Sets the world that is playing.
If a world is already playing, the current world is stopped and the new world is started.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `worldId` | `string` | the new world to start |

#### Returns

[`Runtime`](Runtime.md)

#### Defined in

[rapida/src/runtime/index.ts:104](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L104)
