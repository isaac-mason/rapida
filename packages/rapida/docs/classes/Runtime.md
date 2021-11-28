# Class: Runtime

A Runtime for rapida worlds

## Table of contents

### Constructors

- [constructor](Runtime.md#constructor)

### Properties

- [debug](Runtime.md#debug)
- [domElement](Runtime.md#domelement)
- [effectComposer](Runtime.md#effectcomposer)
- [killLoop](Runtime.md#killloop)
- [log](Runtime.md#log)
- [previousGameLoopFrame](Runtime.md#previousgameloopframe)
- [renderer](Runtime.md#renderer)
- [resizeObserver](Runtime.md#resizeobserver)
- [stats](Runtime.md#stats)
- [updateDelay](Runtime.md#updatedelay)
- [world](Runtime.md#world)
- [worldProviders](Runtime.md#worldproviders)

### Methods

- [destroy](Runtime.md#destroy)
- [gameLoop](Runtime.md#gameloop)
- [onResize](Runtime.md#onresize)
- [physicsLoop](Runtime.md#physicsloop)
- [registerWorld](Runtime.md#registerworld)
- [renderLoop](Runtime.md#renderloop)
- [startWorld](Runtime.md#startworld)

## Constructors

### constructor

• **new Runtime**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RuntimeParams`](../modules.md#runtimeparams) |

#### Defined in

[rapida/src/runtime/index.ts:85](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L85)

## Properties

### debug

• `Private` **debug**: `boolean`

Whether the runtime is in debug mode

#### Defined in

[rapida/src/runtime/index.ts:50](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L50)

___

### domElement

• `Private` **domElement**: `any`

The DOM element for the renderer

#### Defined in

[rapida/src/runtime/index.ts:56](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L56)

___

### effectComposer

• **effectComposer**: `EffectComposer`<`WebGLRenderTarget`\>

The effect composer for the renderer

#### Defined in

[rapida/src/runtime/index.ts:35](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L35)

___

### killLoop

• `Private` **killLoop**: `boolean` = `false`

Whether the render loop should be interrupted
If set to true, the loop will be stopped on the next loop
Set back to false after killing the loop

#### Defined in

[rapida/src/runtime/index.ts:63](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L63)

___

### log

• **log**: `Logger`

The logger for the runtime

#### Defined in

[rapida/src/runtime/index.ts:40](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L40)

___

### previousGameLoopFrame

• `Private` **previousGameLoopFrame**: `undefined` \| `number`

The time of the previous animation frame

#### Defined in

[rapida/src/runtime/index.ts:73](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L73)

___

### renderer

• **renderer**: `WebGLRenderer`

The renderer for the World

#### Defined in

[rapida/src/runtime/index.ts:30](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L30)

___

### resizeObserver

• `Private` **resizeObserver**: `ResizeObserver`

The resize observer for the renderer dom element

#### Defined in

[rapida/src/runtime/index.ts:83](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L83)

___

### stats

• `Private` **stats**: `Stats`

The stats.js instance for the runtime

#### Defined in

[rapida/src/runtime/index.ts:78](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L78)

___

### updateDelay

• `Private` **updateDelay**: `number`

The time in milliseconds to wait before running another runtime update

#### Defined in

[rapida/src/runtime/index.ts:68](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L68)

___

### world

• `Optional` **world**: [`World`](World.md)

The current world in play

#### Defined in

[rapida/src/runtime/index.ts:25](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L25)

___

### worldProviders

• `Private` **worldProviders**: `Object` = `{}`

The world providers for the runtime

#### Index signature

▪ [id: `string`]: [`WorldProvider`](../modules.md#worldprovider)

#### Defined in

[rapida/src/runtime/index.ts:45](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L45)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the runtime

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:194](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L194)

___

### gameLoop

▸ `Private` **gameLoop**(): `void`

The game logic loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:258](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L258)

___

### onResize

▸ **onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:204](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L204)

___

### physicsLoop

▸ `Private` **physicsLoop**(): `void`

The physics loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:278](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L278)

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

[rapida/src/runtime/index.ts:138](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L138)

___

### renderLoop

▸ `Private` **renderLoop**(): `void`

The render loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:222](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L222)

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

[rapida/src/runtime/index.ts:147](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/runtime/index.ts#L147)
