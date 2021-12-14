# Class: SystemManager

SystemManager that manages systems in a world and calls their lifecycle hooks.

Handles adding and removing systems and providing them with queries via the `QueryManager`.

Maintains the usage of queries by systems and removes queries from the `QueryManager` if no systems are
using a query.

## Table of contents

### Constructors

- [constructor](SystemManager.md#constructor)

### Properties

- [initialised](SystemManager.md#initialised)
- [queryToSystems](SystemManager.md#querytosystems)
- [systems](SystemManager.md#systems)
- [world](SystemManager.md#world)

### Methods

- [\_destroy](SystemManager.md#_destroy)
- [\_init](SystemManager.md#_init)
- [\_update](SystemManager.md#_update)
- [addSystem](SystemManager.md#addsystem)
- [addSystemToQuery](SystemManager.md#addsystemtoquery)
- [removeSystem](SystemManager.md#removesystem)
- [removeSystemFromQuery](SystemManager.md#removesystemfromquery)

## Constructors

### constructor

• **new SystemManager**(`world`)

Constructor for the SystemManager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `world` | [`World`](World.md) | the world for the SystemManager |

#### Defined in

[rapida/src/ecs/system-manager.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L38)

## Properties

### initialised

• **initialised**: `boolean` = `false`

Whether the system manager has been initialised

#### Defined in

[rapida/src/ecs/system-manager.ts:22](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L22)

___

### queryToSystems

• `Private` **queryToSystems**: `Map`<`string`, `Set`<[`System`](System.md)\>\>

A map of query ids to systems using the query

#### Defined in

[rapida/src/ecs/system-manager.ts:32](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L32)

___

### systems

• **systems**: `Map`<`string`, [`System`](System.md)\>

Systems in the System Manager

#### Defined in

[rapida/src/ecs/system-manager.ts:17](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L17)

___

### world

• `Private` **world**: [`World`](World.md)

The world the system manager belongs in

#### Defined in

[rapida/src/ecs/system-manager.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L27)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroys all systems

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system-manager.ts:111](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L111)

___

### \_init

▸ **_init**(): `void`

Initialises the system manager

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system-manager.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L89)

___

### \_update

▸ **_update**(`timeElapsed`): `void`

Updates systems in the system manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time elapsed in milliseconds |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system-manager.ts:100](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L100)

___

### addSystem

▸ **addSystem**(`system`): [`SystemManager`](SystemManager.md)

Adds a system to the system manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `system` | [`System`](System.md) | the system to add |

#### Returns

[`SystemManager`](SystemManager.md)

#### Defined in

[rapida/src/ecs/system-manager.ts:46](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L46)

___

### addSystemToQuery

▸ `Private` **addSystemToQuery**(`query`, `system`): `void`

Adds a system to a query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`Query`](Query.md) | the query |
| `system` | [`System`](System.md) | the system |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system-manager.ts:120](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L120)

___

### removeSystem

▸ **removeSystem**(`system`): [`SystemManager`](SystemManager.md)

Removes a system from the system manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `system` | [`System`](System.md) | the system to remove |

#### Returns

[`SystemManager`](SystemManager.md)

#### Defined in

[rapida/src/ecs/system-manager.ts:70](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L70)

___

### removeSystemFromQuery

▸ `Private` **removeSystemFromQuery**(`query`, `system`): `void`

Removes a system from a query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`Query`](Query.md) | the query |
| `system` | [`System`](System.md) | the system |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/system-manager.ts:136](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/system-manager.ts#L136)
