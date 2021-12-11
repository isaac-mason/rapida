# Class: World

A World that can contain systems, spaces containing entities, scenes, physics worlds, and renderers

## Table of contents

### Constructors

- [constructor](World.md#constructor)

### Properties

- [\_factories](World.md#_factories)
- [\_rendererFactories](World.md#_rendererfactories)
- [cameras](World.md#cameras)
- [events](World.md#events)
- [id](World.md#id)
- [initialised](World.md#initialised)
- [physics](World.md#physics)
- [queryManager](World.md#querymanager)
- [rendererManager](World.md#renderermanager)
- [runtime](World.md#runtime)
- [scenes](World.md#scenes)
- [spaces](World.md#spaces)
- [systemManager](World.md#systemmanager)

### Accessors

- [create](World.md#create)

### Methods

- [addSystem](World.md#addsystem)
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

[rapida/src/world/world.ts:117](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L117)

## Properties

### \_factories

• `Private` **\_factories**: `WorldFactories`

Factories for creating something new in a world

#### Defined in

[rapida/src/world/world.ts:276](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L276)

___

### \_rendererFactories

• `Private` **\_rendererFactories**: `RendererFactories`

Factories for creating renderers in the world

#### Defined in

[rapida/src/world/world.ts:248](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L248)

___

### cameras

• **cameras**: `Map`<`string`, [`Camera`](Camera.md)\>

Cameras for the world

#### Defined in

[rapida/src/world/world.ts:81](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L81)

___

### events

• `Private` **events**: `EventSystem`

The event system for the world

#### Defined in

[rapida/src/world/world.ts:111](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L111)

___

### id

• **id**: `string`

A unique id for the world

#### Defined in

[rapida/src/world/world.ts:61](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L61)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the world has been initialised

#### Defined in

[rapida/src/world/world.ts:101](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L101)

___

### physics

• **physics**: `Map`<`string`, [`Physics`](Physics.md)\>

Physics worlds within the world

#### Defined in

[rapida/src/world/world.ts:76](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L76)

___

### queryManager

• **queryManager**: [`QueryManager`](QueryManager.md)

The query manager for the world

#### Defined in

[rapida/src/world/world.ts:91](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L91)

___

### rendererManager

• **rendererManager**: [`RendererManager`](RendererManager.md)

The renderer manager for the world

#### Defined in

[rapida/src/world/world.ts:96](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L96)

___

### runtime

• **runtime**: [`Runtime`](Runtime.md)

The runtime the world is in

#### Defined in

[rapida/src/world/world.ts:106](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L106)

___

### scenes

• **scenes**: `Map`<`string`, [`Scene`](Scene.md)\>

Scenes in the world

#### Defined in

[rapida/src/world/world.ts:71](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L71)

___

### spaces

• **spaces**: `Map`<`string`, [`Space`](Space.md)\>

Spaces in the world

#### Defined in

[rapida/src/world/world.ts:66](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L66)

___

### systemManager

• **systemManager**: [`SystemManager`](SystemManager.md)

The system manager for the world

#### Defined in

[rapida/src/world/world.ts:86](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L86)

## Accessors

### create

• `get` **create**(): `WorldFactories`

Retrieves world factories

#### Returns

`WorldFactories`

#### Defined in

[rapida/src/world/world.ts:337](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L337)

## Methods

### addSystem

▸ **addSystem**(`system`): [`World`](World.md)

Adds a system to the World

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `system` | [`System`](System.md) | the system to add to the world |

#### Returns

[`World`](World.md)

#### Defined in

[rapida/src/world/world.ts:129](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L129)

___

### destroy

▸ **destroy**(): `void`

Destroys the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:207](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L207)

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

[rapida/src/world/world.ts:241](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L241)

___

### init

▸ **init**(): `void`

Initialises the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:157](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L157)

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

[rapida/src/world/world.ts:221](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L221)

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

[rapida/src/world/world.ts:138](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L138)

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

[rapida/src/world/world.ts:233](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L233)

___

### render

▸ **render**(): `void`

Renders the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:176](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L176)

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

[rapida/src/world/world.ts:184](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L184)

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

[rapida/src/world/world.ts:198](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/world/world.ts#L198)
