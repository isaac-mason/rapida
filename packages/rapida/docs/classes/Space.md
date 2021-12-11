# Class: Space

Space that contains entities and manages entities and their lifecycle.

A Space can be added to a world and then affected by the systems in a world.

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

- [\_destroy](Space.md#_destroy)
- [\_init](Space.md#_init)
- [\_update](Space.md#_update)
- [add](Space.md#add)
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

[rapida/src/ecs/space.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L59)

## Properties

### \_factories

• `Private` **\_factories**: `SpaceFactories`

Factories for creating something new in a space

#### Defined in

[rapida/src/ecs/space.ts:177](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L177)

___

### entities

• **entities**: `Map`<`string`, [`Entity`](Entity.md)\>

Entities in the space

#### Defined in

[rapida/src/ecs/space.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L43)

___

### events

• `Private` **events**: `EventSystem`

The spaces event system

#### Defined in

[rapida/src/ecs/space.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L53)

___

### id

• **id**: `string`

A unique ID for the space

#### Defined in

[rapida/src/ecs/space.ts:33](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L33)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the space has been initialised

#### Defined in

[rapida/src/ecs/space.ts:48](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L48)

___

### world

• **world**: [`World`](World.md)

The parent World the space is in

#### Defined in

[rapida/src/ecs/space.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L38)

## Accessors

### create

• `get` **create**(): `SpaceFactories`

Retrieves world factories

#### Returns

`SpaceFactories`

#### Defined in

[rapida/src/ecs/space.ts:188](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L188)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroy the space. Removes all entities from the space.

#### Returns

`void`

#### Defined in

[rapida/src/ecs/space.ts:106](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L106)

___

### \_init

▸ **_init**(): `void`

Initialise the space

#### Returns

`void`

#### Defined in

[rapida/src/ecs/space.ts:67](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L67)

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

[rapida/src/ecs/space.ts:76](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L76)

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

[rapida/src/ecs/space.ts:114](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L114)

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

[rapida/src/ecs/space.ts:170](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L170)

___

### on

▸ **on**<`E`\>(`eventName`, `handler`): `string`

Adds a handler for space events

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

[rapida/src/ecs/space.ts:150](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L150)

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

[rapida/src/ecs/space.ts:130](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L130)

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

[rapida/src/ecs/space.ts:162](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/space.ts#L162)
