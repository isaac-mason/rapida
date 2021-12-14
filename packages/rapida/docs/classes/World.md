# Class: World

A World that can contain systems, spaces containing entities, scenes, physics worlds, and renderers

## Table of contents

### Constructors

- [constructor](World.md#constructor)

### Properties

- [\_add](World.md#_add)
- [\_factories](World.md#_factories)
- [\_maxGameLoopUpdatesPerSecond](World.md#_maxgameloopupdatespersecond)
- [\_maxPhysicsUpdatesPerSecond](World.md#_maxphysicsupdatespersecond)
- [\_rendererFactories](World.md#_rendererfactories)
- [cameras](World.md#cameras)
- [engine](World.md#engine)
- [events](World.md#events)
- [id](World.md#id)
- [initialised](World.md#initialised)
- [physics](World.md#physics)
- [queryManager](World.md#querymanager)
- [rendererManager](World.md#renderermanager)
- [scenes](World.md#scenes)
- [spaces](World.md#spaces)
- [systemManager](World.md#systemmanager)

### Accessors

- [add](World.md#add)
- [create](World.md#create)

### Methods

- [destroy](World.md#destroy)
- [emit](World.md#emit)
- [init](World.md#init)
- [on](World.md#on)
- [remove](World.md#remove)
- [removeHandler](World.md#removehandler)
- [render](World.md#render)
- [update](World.md#update)
- [updatePhysics](World.md#updatephysics)

## Constructors

### constructor

• **new World**(`id`)

Constructor for a World

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`WorldParams`](../modules.md#worldparams) | a unique id for the world |

#### Defined in

[rapida/src/world/world.ts:124](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L124)

## Properties

### \_add

• `Private` **\_add**: `Object`

Methods for adding something to the world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `system` | (`system`: [`System`](System.md)) => [`World`](World.md) |

#### Defined in

[rapida/src/world/world.ts:281](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L281)

___

### \_factories

• `Private` **\_factories**: `Object`

Factories for creating something new in a world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `renderer` | `Object` |
| `renderer.css` | [object Object] |
| `renderer.webgl` | [object Object] |
| `camera` | (`params?`: [`CameraParams`](../modules.md#cameraparams)) => [`Camera`](Camera.md) |
| `physics` | (`params`: [`PhysicsParams`](../modules.md#physicsparams)) => [`Physics`](Physics.md) |
| `scene` | (`params?`: [`SceneParams`](../modules.md#sceneparams)) => [`Scene`](Scene.md) |
| `space` | (`params?`: [`SpaceParams`](../modules.md#spaceparams)) => [`Space`](Space.md) |

#### Defined in

[rapida/src/world/world.ts:297](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L297)

___

### \_maxGameLoopUpdatesPerSecond

• **\_maxGameLoopUpdatesPerSecond**: `number`

The maximum game loop updates to run per second

#### Defined in

[rapida/src/world/world.ts:113](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L113)

___

### \_maxPhysicsUpdatesPerSecond

• **\_maxPhysicsUpdatesPerSecond**: `number`

The maximum physics loop updates to run per second

#### Defined in

[rapida/src/world/world.ts:118](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L118)

___

### \_rendererFactories

• `Private` **\_rendererFactories**: `Object`

Factories for creating renderers in the world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `css` | (`params`: [`CSSRendererParams`](../modules.md#cssrendererparams)) => [`CSSRenderer`](CSSRenderer.md) |
| `webgl` | (`params`: [`WebGLRendererParams`](../modules.md#webglrendererparams)) => [`WebGLRenderer`](WebGLRenderer.md) |

#### Defined in

[rapida/src/world/world.ts:253](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L253)

___

### cameras

• **cameras**: `Map`<`string`, [`Camera`](Camera.md)\>

Cameras for the world

#### Defined in

[rapida/src/world/world.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L78)

___

### engine

• **engine**: [`Engine`](Engine.md)

The engine instance the world is in

#### Defined in

[rapida/src/world/world.ts:103](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L103)

___

### events

• `Private` **events**: `EventSystem`

The event system for the world

#### Defined in

[rapida/src/world/world.ts:108](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L108)

___

### id

• **id**: `string`

A unique id for the world

#### Defined in

[rapida/src/world/world.ts:58](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L58)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the world has been initialised

#### Defined in

[rapida/src/world/world.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L98)

___

### physics

• **physics**: `Map`<`string`, [`Physics`](Physics.md)\>

Physics worlds within the world

#### Defined in

[rapida/src/world/world.ts:73](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L73)

___

### queryManager

• **queryManager**: [`QueryManager`](QueryManager.md)

The query manager for the world

#### Defined in

[rapida/src/world/world.ts:88](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L88)

___

### rendererManager

• **rendererManager**: [`RendererManager`](RendererManager.md)

The renderer manager for the world

#### Defined in

[rapida/src/world/world.ts:93](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L93)

___

### scenes

• **scenes**: `Map`<`string`, [`Scene`](Scene.md)\>

Scenes in the world

#### Defined in

[rapida/src/world/world.ts:68](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L68)

___

### spaces

• **spaces**: `Map`<`string`, [`Space`](Space.md)\>

Spaces in the world

#### Defined in

[rapida/src/world/world.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L63)

___

### systemManager

• **systemManager**: [`SystemManager`](SystemManager.md)

The system manager for the world

#### Defined in

[rapida/src/world/world.ts:83](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L83)

## Accessors

### add

• `get` **add**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `system` | (`system`: [`System`](System.md)) => [`World`](World.md) |

#### Defined in

[rapida/src/world/world.ts:377](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L377)

___

### create

• `get` **create**(): `Object`

Retrieves world factories

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `renderer` | `Object` |
| `renderer.css` | [object Object] |
| `renderer.webgl` | [object Object] |
| `camera` | (`params?`: [`CameraParams`](../modules.md#cameraparams)) => [`Camera`](Camera.md) |
| `physics` | (`params`: [`PhysicsParams`](../modules.md#physicsparams)) => [`Physics`](Physics.md) |
| `scene` | (`params?`: [`SceneParams`](../modules.md#sceneparams)) => [`Scene`](Scene.md) |
| `space` | (`params?`: [`SpaceParams`](../modules.md#spaceparams)) => [`Space`](Space.md) |

#### Defined in

[rapida/src/world/world.ts:372](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L372)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:212](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L212)

___

### emit

▸ **emit**<`E`\>(`event`): `void`

Broadcasts an event for handling by the scene

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | the event to broadcast |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:246](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L246)

___

### init

▸ **init**(): `void`

Initialises the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:162](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L162)

___

### on

▸ **on**<`E`\>(`eventName`, `handler`): `string`

Adds a handler for scene events

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler)<`E`\> | the handler function |

#### Returns

`string`

the id of the new handler

#### Defined in

[rapida/src/world/world.ts:226](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L226)

___

### remove

▸ **remove**(`value`): `void`

Removes from the scene

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Physics`](Physics.md) \| [`Camera`](Camera.md) \| [`Space`](Space.md) \| [`System`](System.md) \| [`Scene`](Scene.md) | the value to remove |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:143](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L143)

___

### removeHandler

▸ **removeHandler**(`eventName`, `handlerId`): `void`

Removes an event handler by handler id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the name of the event |
| `handlerId` | `string` | the id of the event handler |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:238](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L238)

___

### render

▸ **render**(): `void`

Renders the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L181)

___

### update

▸ **update**(`timeElapsed`): `void`

Updates the world

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time elapsed in milliseconds |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:189](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L189)

___

### updatePhysics

▸ **updatePhysics**(`timeElapsed`): `void`

Steps the physics world

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeElapsed` | `number` |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:203](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L203)
