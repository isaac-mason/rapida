# Class: Entity

## Table of contents

### Constructors

- [constructor](Entity.md#constructor)

### Properties

- [alive](Entity.md#alive)
- [componentNames](Entity.md#componentnames)
- [componentUpdatePool](Entity.md#componentupdatepool)
- [components](Entity.md#components)
- [events](Entity.md#events)
- [id](Entity.md#id)
- [initialised](Entity.md#initialised)
- [playing](Entity.md#playing)
- [space](Entity.md#space)

### Methods

- [\_init](Entity.md#_init)
- [\_update](Entity.md#_update)
- [addComponent](Entity.md#addcomponent)
- [destroy](Entity.md#destroy)
- [emit](Entity.md#emit)
- [get](Entity.md#get)
- [has](Entity.md#has)
- [on](Entity.md#on)
- [removeComponent](Entity.md#removecomponent)
- [removeHandler](Entity.md#removehandler)
- [setPlaying](Entity.md#setplaying)

## Constructors

### constructor

• **new Entity**(`space`, `params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | [`Space`](Space.md) |
| `params?` | [`EntityParams`](../modules.md#entityparams) |

#### Defined in

[rapida/src/ecs/entity.ts:64](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L64)

## Properties

### alive

• **alive**: `boolean` = `true`

Whether the entity is alive
If false, the entity will be destroyed by the Space on the next update

#### Defined in

[rapida/src/ecs/entity.ts:41](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L41)

___

### componentNames

• **componentNames**: `Set`<`string`\>

A set of the names in this entity

#### Defined in

[rapida/src/ecs/entity.ts:29](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L29)

___

### componentUpdatePool

• `Private` **componentUpdatePool**: `Map`<`string`, (`timeElapsed`: `number`) => `void`\>

A map of component ids to update functions

#### Defined in

[rapida/src/ecs/entity.ts:56](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L56)

___

### components

• **components**: `Map`<`string`, [`Component`](Component.md)\>

The components for this entity

#### Defined in

[rapida/src/ecs/entity.ts:24](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L24)

___

### events

• `Private` **events**: `EventSystem`

The entities event system

#### Defined in

[rapida/src/ecs/entity.ts:62](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L62)

___

### id

• **id**: `string`

The unique ID of the entity

#### Defined in

[rapida/src/ecs/entity.ts:19](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L19)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the entity has been initialised

#### Defined in

[rapida/src/ecs/entity.ts:46](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L46)

___

### playing

• **playing**: `boolean` = `true`

Whether the entity is 'playing', or whether updates are occurring
TODO: implement handling

#### Defined in

[rapida/src/ecs/entity.ts:35](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L35)

___

### space

• **space**: [`Space`](Space.md)

The space the entity is in

#### Defined in

[rapida/src/ecs/entity.ts:51](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L51)

## Methods

### \_init

▸ **_init**(): [`Entity`](Entity.md)

Initialise the entity

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/entity.ts:75](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L75)

___

### \_update

▸ **_update**(`timeElapsed`): `void`

Updates the entity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time since the last update in milliseconds |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/entity.ts:85](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L85)

___

### addComponent

▸ **addComponent**(`value`): [`Entity`](Entity.md)

Adds a component to the entity

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Component`](Component.md) \| (...`args`: `never`[]) => [`Component`](Component.md) |

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/entity.ts:114](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L114)

___

### destroy

▸ **destroy**(): `void`

Destroy the entities components and set the entity as dead

#### Returns

`void`

#### Defined in

[rapida/src/ecs/entity.ts:96](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L96)

___

### emit

▸ **emit**<`E`\>(`event`): `void`

Broadcasts an event for handling by the entity

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

[rapida/src/ecs/entity.ts:267](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L267)

___

### get

▸ **get**<`T`\>(`constr`): ``null`` \| `T`

Retrieves a component on an entity by type, returns null if the component is not in the entity

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](Component.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constr` | (...`args`: `never`[]) => `T` |

#### Returns

``null`` \| `T`

the component if it is found, or null

#### Defined in

[rapida/src/ecs/entity.ts:223](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L223)

___

### has

▸ **has**(`value`): `boolean`

Returns whether the entity contains the given component

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`Component`](Component.md) \| (...`args`: `never`[]) => [`Component`](Component.md) |

#### Returns

`boolean`

whether the entity contains the given component

#### Defined in

[rapida/src/ecs/entity.ts:196](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L196)

___

### on

▸ **on**(`eventName`, `handler`): `string`

Adds a handler for entity events

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler) | the handler function |

#### Returns

`string`

the id of the created handler

#### Defined in

[rapida/src/ecs/entity.ts:250](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L250)

___

### removeComponent

▸ **removeComponent**(`value`): [`Entity`](Entity.md)

Removes a component from the entity and destroys it.
The value can either be a Component constructor, or the component instance itself

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Component`](Component.md) \| (...`args`: `never`[]) => [`Component`](Component.md) | the component to remove and destroy |

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/entity.ts:156](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L156)

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

[rapida/src/ecs/entity.ts:259](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L259)

___

### setPlaying

▸ **setPlaying**(`playing`): [`Entity`](Entity.md)

Sets whether the entity is playing

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playing` | `boolean` | the new state |

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/entity.ts:105](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L105)
