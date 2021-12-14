# Class: System

System abstract class that is extended to create a system containing custom logic for a world.

The System is the 'S' in ECS. Systems can be created with multiple queries for entities by what components they contain.
Systems have lifecycle hooks `onInit`, `onUpdate`, and `onDestroy` hook that are executed to provide logic to the world.
Systems also have their own events system `events` that can be used to run that isn't required to be run on every update.

## Table of contents

### Constructors

- [constructor](System.md#constructor)

### Properties

- [\_world](System.md#_world)
- [enabled](System.md#enabled)
- [events](System.md#events)
- [id](System.md#id)
- [onDestroy](System.md#ondestroy)
- [onInit](System.md#oninit)
- [onUpdate](System.md#onupdate)
- [queries](System.md#queries)
- [queryDescriptions](System.md#querydescriptions)

### Accessors

- [world](System.md#world)

### Methods

- [\_destroy](System.md#_destroy)
- [\_init](System.md#_init)
- [\_update](System.md#_update)
- [emit](System.md#emit)
- [on](System.md#on)

## Constructors

### constructor

• **new System**(`params?`)

Constructor for a System

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`SystemParams`](../modules.md#systemparams) | the parameters for the system |

#### Defined in

[rapida/src/ecs/system.ts:73](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L73)

## Properties

### \_world

• `Private` `Optional` **\_world**: [`World`](World.md)

The world the system is in

#### Defined in

[rapida/src/ecs/system.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L38)

___

### enabled

• **enabled**: `boolean` = `true`

Whether the system is enabled and should update

#### Defined in

[rapida/src/ecs/system.ts:33](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L33)

___

### events

• `Private` **events**: `EventSystem`

The event system for this system

#### Defined in

[rapida/src/ecs/system.ts:67](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L67)

___

### id

• **id**: `string`

The id for the system

#### Defined in

[rapida/src/ecs/system.ts:28](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L28)

___

### onDestroy

• `Optional` **onDestroy**: () => `void` = `undefined`

#### Type declaration

▸ (): `void`

Logic for destruction of the system. Called on removing a System from a Scene.

##### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:136](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L136)

___

### onInit

• `Optional` **onInit**: () => `void` = `undefined`

#### Type declaration

▸ (): `void`

Logic for initialisation of the system. Called during System construction.

##### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:131](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L131)

___

### onUpdate

• `Optional` **onUpdate**: (`timeElapsed`: `number`) => `void` = `undefined`

#### Type declaration

▸ (`timeElapsed`): `void`

Logic for a systems update loop

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time since the last update |

##### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:142](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L142)

___

### queries

• **queries**: `Object` = `{}`

A map of query names to queries

#### Index signature

▪ [name: `string`]: [`Query`](Query.md)

#### Defined in

[rapida/src/ecs/system.ts:57](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L57)

___

### queryDescriptions

• **queryDescriptions**: `SystemQueries`

A map of query names to query descriptions

#### Defined in

[rapida/src/ecs/system.ts:62](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L62)

## Accessors

### world

• `get` **world**(): [`World`](World.md)

Gets the world

#### Returns

[`World`](World.md)

#### Defined in

[rapida/src/ecs/system.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L43)

• `set` **world**(`w`): `void`

Sets the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | [`World`](World.md) |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:50](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L50)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroy logic for the system

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:101](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L101)

___

### \_init

▸ **_init**(): `void`

Initialises the system

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:81](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L81)

___

### \_update

▸ **_update**(`timeElapsed`): `void`

Updates the system

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeElapsed` | `number` |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:91](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L91)

___

### emit

▸ **emit**<`E`\>(`event`): `void`

Emits an event to the system

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | the event to emit |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:124](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L124)

___

### on

▸ **on**<`E`\>(`eventName`, `handler`): `void`

Adds an event handler for the system

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler)<`E`\> | the event handler |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system.ts:113](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L113)
