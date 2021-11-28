# Class: Space

a class for a Space that can contain entities

## Table of contents

### Constructors

- [constructor](Space.md#constructor)

### Properties

- [\_factories](Space.md#_factories)
- [entities](Space.md#entities)
- [events](Space.md#events)
- [id](Space.md#id)
- [initialised](Space.md#initialised)
- [world](Space.md#world)

### Accessors

- [create](Space.md#create)

### Methods

- [\_init](Space.md#_init)
- [\_update](Space.md#_update)
- [add](Space.md#add)
- [destroy](Space.md#destroy)
- [emit](Space.md#emit)
- [on](Space.md#on)
- [remove](Space.md#remove)
- [removeHandler](Space.md#removehandler)

## Constructors

### constructor

• **new Space**(`world`, `params?`)

Constructor for the Space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `world` | [`World`](World.md) | - |
| `params?` | [`SpaceParams`](../modules.md#spaceparams) | the parameters for the space |

#### Defined in

[rapida/src/ecs/space.ts:54](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L54)

## Properties

### \_factories

• `Private` **\_factories**: `SpaceFactories`

Factories for creating something new in a space

#### Defined in

[rapida/src/ecs/space.ts:172](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L172)

___

### entities

• **entities**: `Map`<`string`, [`Entity`](Entity.md)\>

Entities in the space

#### Defined in

[rapida/src/ecs/space.ts:38](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L38)

___

### events

• `Private` **events**: `EventSystem`

The spaces event system

#### Defined in

[rapida/src/ecs/space.ts:48](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L48)

___

### id

• **id**: `string`

A unique ID for the space

#### Defined in

[rapida/src/ecs/space.ts:28](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L28)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the space has been initialised

#### Defined in

[rapida/src/ecs/space.ts:43](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L43)

___

### world

• **world**: [`World`](World.md)

The parent World the space is in

#### Defined in

[rapida/src/ecs/space.ts:33](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L33)

## Accessors

### create

• `get` **create**(): `SpaceFactories`

Retrieves world factories

#### Returns

`SpaceFactories`

#### Defined in

[rapida/src/ecs/space.ts:183](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L183)

## Methods

### \_init

▸ **_init**(): `void`

Initialise the space

#### Returns

`void`

#### Defined in

[rapida/src/ecs/space.ts:62](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L62)

___

### \_update

▸ **_update**(`timeElapsed`): `void`

Updates all entities within the space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time since the last update in milliseconds |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/space.ts:71](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L71)

___

### add

▸ **add**(`value`): [`Space`](Space.md)

Adds an entity to the space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Entity`](Entity.md) | the entity to add |

#### Returns

[`Space`](Space.md)

#### Defined in

[rapida/src/ecs/space.ts:109](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L109)

___

### destroy

▸ **destroy**(): `void`

Destroy the space. Removes all entities from the space.

#### Returns

`void`

#### Defined in

[rapida/src/ecs/space.ts:101](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L101)

___

### emit

▸ **emit**<`E`\>(`event`): `void`

Broadcasts an event for handling by the space

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

[rapida/src/ecs/space.ts:165](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L165)

___

### on

▸ **on**<`_E`\>(`eventName`, `handler`): `string`

Adds a handler for space events

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

[rapida/src/ecs/space.ts:145](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L145)

___

### remove

▸ **remove**(`value`): [`Space`](Space.md)

Removes an entity from the space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Entity`](Entity.md) | the entity to remove |

#### Returns

[`Space`](Space.md)

#### Defined in

[rapida/src/ecs/space.ts:125](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L125)

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

[rapida/src/ecs/space.ts:157](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L157)
