# Class: Entity

Entity that contains components and calls component lifecycle methods

## Table of contents

### Constructors

- [constructor](Entity.md#constructor)

### Properties

- [alive](Entity.md#alive)
- [componentNames](Entity.md#componentnames)
- [componentUpdatePool](Entity.md#componentupdatepool)
- [components](Entity.md#components)
- [enabled](Entity.md#enabled)
- [events](Entity.md#events)
- [id](Entity.md#id)
- [initialised](Entity.md#initialised)
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

## Constructors

### constructor

• **new Entity**(`space`, `params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | [`Space`](Space.md) |
| `params?` | [`EntityParams`](../modules.md#entityparams) |

#### Defined in

[rapida/src/ecs/entity.ts:67](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L67)

## Properties

### alive

• **alive**: `boolean` = `true`

Whether the entity is alive
If false, the entity will be destroyed by the Space on the next update

#### Defined in

[rapida/src/ecs/entity.ts:44](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L44)

___

### componentNames

• **componentNames**: `Set`<`string`\>

A set of the names in this entity

#### Defined in

[rapida/src/ecs/entity.ts:32](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L32)

___

### componentUpdatePool

• `Private` **componentUpdatePool**: `Map`<`string`, (`timeElapsed`: `number`) => `void`\>

A map of component ids to update functions

#### Defined in

[rapida/src/ecs/entity.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L59)

___

### components

• **components**: `Map`<`string`, [`Component`](Component.md)\>

The components for this entity

#### Defined in

[rapida/src/ecs/entity.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L27)

___

### enabled

• **enabled**: `boolean` = `true`

Whether the entity should be updated
TODO: implement handling

#### Defined in

[rapida/src/ecs/entity.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L38)

___

### events

• `Private` **events**: `EventSystem`

The entities event system

#### Defined in

[rapida/src/ecs/entity.ts:65](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L65)

___

### id

• **id**: `string`

The unique ID of the entity

#### Defined in

[rapida/src/ecs/entity.ts:22](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L22)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the entity has been initialised

#### Defined in

[rapida/src/ecs/entity.ts:49](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L49)

___

### space

• **space**: [`Space`](Space.md)

The space the entity is in

#### Defined in

[rapida/src/ecs/entity.ts:54](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L54)

## Methods

### \_init

▸ **_init**(): [`Entity`](Entity.md)

Initialise the entity

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/entity.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L78)

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

[rapida/src/ecs/entity.ts:88](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L88)

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

[rapida/src/ecs/entity.ts:108](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L108)

___

### destroy

▸ **destroy**(): `void`

Destroy the entities components and set the entity as dead

#### Returns

`void`

#### Defined in

[rapida/src/ecs/entity.ts:99](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L99)

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

[rapida/src/ecs/entity.ts:264](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L264)

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

[rapida/src/ecs/entity.ts:217](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L217)

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

[rapida/src/ecs/entity.ts:190](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L190)

___

### on

▸ **on**<`E`\>(`eventName`, `handler`): `string`

Adds a handler for entity events

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

the id of the created handler

#### Defined in

[rapida/src/ecs/entity.ts:244](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L244)

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

[rapida/src/ecs/entity.ts:150](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L150)

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

[rapida/src/ecs/entity.ts:256](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L256)
