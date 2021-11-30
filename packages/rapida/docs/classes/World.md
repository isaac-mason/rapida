# Class: World

A World that can contain systems, spaces containing entities, scenes, physics worlds, and views

## Table of contents

### Constructors

- [constructor](World.md#constructor)

### Properties

- [\_factories](World.md#_factories)
- [cameras](World.md#cameras)
- [events](World.md#events)
- [id](World.md#id)
- [initialised](World.md#initialised)
- [physics](World.md#physics)
- [queryManager](World.md#querymanager)
- [runtime](World.md#runtime)
- [scenes](World.md#scenes)
- [spaces](World.md#spaces)
- [systemManager](World.md#systemmanager)
- [views](World.md#views)

### Accessors

- [create](World.md#create)

### Methods

- [addSystem](World.md#addsystem)
- [destroy](World.md#destroy)
- [emit](World.md#emit)
- [init](World.md#init)
- [on](World.md#on)
- [onResize](World.md#onresize)
- [remove](World.md#remove)
- [removeHandler](World.md#removehandler)
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

[rapida/src/world/world.ts:109](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L109)

## Properties

### \_factories

• `Private` **\_factories**: `WorldFactories`

Factories for creating something new in a world

#### Defined in

[rapida/src/world/world.ts:255](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L255)

___

### cameras

• **cameras**: `Map`<`string`, [`Camera`](Camera.md)\>

Cameras for the world

#### Defined in

[rapida/src/world/world.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L78)

___

### events

• `Private` **events**: `EventSystem`

The event system for the world

#### Defined in

[rapida/src/world/world.ts:103](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L103)

___

### id

• **id**: `string`

A unique id for the world

#### Defined in

[rapida/src/world/world.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L53)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the world has been initialised

#### Defined in

[rapida/src/world/world.ts:88](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L88)

___

### physics

• **physics**: `Map`<`string`, `Physics`\>

Physics worlds within the world

#### Defined in

[rapida/src/world/world.ts:68](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L68)

___

### queryManager

• **queryManager**: `QueryManager`

The query manager for the world

#### Defined in

[rapida/src/world/world.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L98)

___

### runtime

• **runtime**: [`Runtime`](Runtime.md)

The runtime the world is in

#### Defined in

[rapida/src/world/world.ts:83](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L83)

___

### scenes

• **scenes**: `Map`<`string`, [`Scene`](Scene.md)\>

Scenes in the world

#### Defined in

[rapida/src/world/world.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L63)

___

### spaces

• **spaces**: `Map`<`string`, [`Space`](Space.md)\>

Spaces in the world

#### Defined in

[rapida/src/world/world.ts:58](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L58)

___

### systemManager

• **systemManager**: `SystemManager`

The system manager for the world

#### Defined in

[rapida/src/world/world.ts:93](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L93)

___

### views

• **views**: `Map`<`string`, [`View`](View.md)\>

Views for the world

#### Defined in

[rapida/src/world/world.ts:73](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L73)

## Accessors

### create

• `get` **create**(): `WorldFactories`

Retrieves world factories

#### Returns

`WorldFactories`

#### Defined in

[rapida/src/world/world.ts:307](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L307)

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

[rapida/src/world/world.ts:120](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L120)

___

### destroy

▸ **destroy**(): `void`

Destroys the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:215](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L215)

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

[rapida/src/world/world.ts:248](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L248)

___

### init

▸ **init**(): `void`

Initialises the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:153](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L153)

___

### on

▸ **on**<`_E`\>(`eventName`, `handler`): `string`

Adds a handler for scene events

#### Type parameters

| Name | Type |
| :------ | :------ |
| `_E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler) | the handler function |

#### Returns

`string`

the id of the new handler

#### Defined in

[rapida/src/world/world.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L228)

___

### onResize

▸ **onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:208](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L208)

___

### remove

▸ **remove**(`value`): [`World`](World.md)

Removes from the scene

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Space`](Space.md) \| [`Camera`](Camera.md) \| [`Scene`](Scene.md) \| [`System`](System.md) \| `Physics` \| [`View`](View.md) | the value to remove |

#### Returns

[`World`](World.md)

#### Defined in

[rapida/src/world/world.ts:129](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L129)

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

[rapida/src/world/world.ts:240](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L240)

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

[rapida/src/world/world.ts:185](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L185)

___

### updatePhysics

▸ **updatePhysics**(): `void`

Steps the physics world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:198](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/world/world.ts#L198)
