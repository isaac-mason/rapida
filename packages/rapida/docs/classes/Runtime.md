# Class: Runtime

A Runtime for rapida worlds

## Table of contents

### Constructors

- [constructor](Runtime.md#constructor)

### Properties

- [debug](Runtime.md#debug)
- [gameLoopUpdateDelayMs](Runtime.md#gameloopupdatedelayms)
- [killLoop](Runtime.md#killloop)
- [log](Runtime.md#log)
- [physicsDelta](Runtime.md#physicsdelta)
- [physicsUpdateDelayMs](Runtime.md#physicsupdatedelayms)
- [previousGameLoopFrame](Runtime.md#previousgameloopframe)
- [previousPhysicsFrame](Runtime.md#previousphysicsframe)
- [stats](Runtime.md#stats)
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

Constructor for a rapida runtime

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`RuntimeParams`](../modules.md#runtimeparams) | params for constructing the rapida runtime |

#### Defined in

[rapida/src/runtime/index.ts:80](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L80)

## Properties

### debug

• `Private` **debug**: `boolean`

Whether the runtime is in debug mode

#### Defined in

[rapida/src/runtime/index.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L52)

___

### gameLoopUpdateDelayMs

• **gameLoopUpdateDelayMs**: `number`

The time in milliseconds to wait before running another game loop update

#### Defined in

[rapida/src/runtime/index.ts:32](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L32)

___

### killLoop

• `Private` **killLoop**: `boolean` = `false`

Whether the render loop should be interrupted
If set to true, the loop will be stopped on the next loop
Set back to false after killing the loop

#### Defined in

[rapida/src/runtime/index.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L59)

___

### log

• **log**: `Logger`

The logger for the runtime

#### Defined in

[rapida/src/runtime/index.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L27)

___

### physicsDelta

• **physicsDelta**: `number`

The delta value for the physics worlds, based on the runtime maxPhysicsUpdatesPerSecond

#### Defined in

[rapida/src/runtime/index.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L42)

___

### physicsUpdateDelayMs

• **physicsUpdateDelayMs**: `number`

The time in milliseconds to wait before running another physics update

#### Defined in

[rapida/src/runtime/index.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L37)

___

### previousGameLoopFrame

• `Private` **previousGameLoopFrame**: `undefined` \| `number`

The time of the previous animation frame

#### Defined in

[rapida/src/runtime/index.ts:64](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L64)

___

### previousPhysicsFrame

• `Private` **previousPhysicsFrame**: `undefined` \| `number`

The time of the previous physics frame

#### Defined in

[rapida/src/runtime/index.ts:69](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L69)

___

### stats

• `Private` **stats**: `Stats`

The stats.js instance for the runtime

#### Defined in

[rapida/src/runtime/index.ts:74](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L74)

___

### world

• `Optional` **world**: [`World`](World.md)

The current world in play

#### Defined in

[rapida/src/runtime/index.ts:22](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L22)

___

### worldProviders

• `Private` **worldProviders**: `Object` = `{}`

The world providers for the runtime

#### Index signature

▪ [id: `string`]: [`WorldProvider`](../modules.md#worldprovider)

#### Defined in

[rapida/src/runtime/index.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L47)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the runtime

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:164](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L164)

___

### gameLoop

▸ `Private` **gameLoop**(): `void`

The game logic loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:191](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L191)

___

### physicsLoop

▸ `Private` **physicsLoop**(): `void`

The physics loop

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:211](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L211)

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

[rapida/src/runtime/index.ts:112](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L112)

___

### renderLoop

▸ `Private` **renderLoop**(): `void`

Runs the render loop for the runtime

#### Returns

`void`

#### Defined in

[rapida/src/runtime/index.ts:173](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L173)

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

[rapida/src/runtime/index.ts:121](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/runtime/index.ts#L121)
