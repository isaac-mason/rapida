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
- [systems](World.md#systems)
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

[rapida/src/world/world.ts:105](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L105)

## Properties

### \_factories

• `Private` **\_factories**: `WorldFactories`

Factories for creating something new in a world

#### Defined in

[rapida/src/world/world.ts:251](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L251)

___

### cameras

• **cameras**: `Map`<`string`, [`Camera`](Camera.md)\>

Cameras for the world

#### Defined in

[rapida/src/world/world.ts:74](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L74)

___

### events

• `Private` **events**: `EventSystem`

The event system for the world

#### Defined in

[rapida/src/world/world.ts:99](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L99)

___

### id

• **id**: `string`

A unique id for the world

#### Defined in

[rapida/src/world/world.ts:43](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L43)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the world has been initialised

#### Defined in

[rapida/src/world/world.ts:84](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L84)

___

### physics

• **physics**: `Map`<`string`, `Physics`\>

Physics worlds within the world

#### Defined in

[rapida/src/world/world.ts:64](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L64)

___

### queryManager

• **queryManager**: `QueryManager`

The query manager for the world

#### Defined in

[rapida/src/world/world.ts:94](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L94)

___

### runtime

• **runtime**: [`Runtime`](Runtime.md)

The runtime the world is in

#### Defined in

[rapida/src/world/world.ts:79](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L79)

___

### scenes

• **scenes**: `Map`<`string`, [`Scene`](Scene.md)\>

Scenes in the world

#### Defined in

[rapida/src/world/world.ts:59](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L59)

___

### spaces

• **spaces**: `Map`<`string`, [`Space`](Space.md)\>

Spaces in the world

#### Defined in

[rapida/src/world/world.ts:54](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L54)

___

### systemManager

• **systemManager**: `SystemManager`

The system manager for the world

#### Defined in

[rapida/src/world/world.ts:89](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L89)

___

### systems

• **systems**: `Map`<`string`, [`System`](System.md)\>

Systems in the world
TODO: remove in favour of SystemManager

#### Defined in

[rapida/src/world/world.ts:49](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L49)

___

### views

• **views**: `Map`<`string`, [`View`](View.md)\>

Views for the world

#### Defined in

[rapida/src/world/world.ts:69](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L69)

## Accessors

### create

• `get` **create**(): `WorldFactories`

Retrieves world factories

#### Returns

`WorldFactories`

#### Defined in

[rapida/src/world/world.ts:303](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L303)

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

[rapida/src/world/world.ts:116](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L116)

___

### destroy

▸ **destroy**(): `void`

Destroys the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:211](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L211)

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

[rapida/src/world/world.ts:244](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L244)

___

### init

▸ **init**(): `void`

Initialises the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:149](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L149)

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

[rapida/src/world/world.ts:224](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L224)

___

### onResize

▸ **onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:204](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L204)

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

[rapida/src/world/world.ts:125](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L125)

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

[rapida/src/world/world.ts:236](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L236)

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

[rapida/src/world/world.ts:181](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L181)

___

### updatePhysics

▸ **updatePhysics**(): `void`

Steps the physics world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:194](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L194)
