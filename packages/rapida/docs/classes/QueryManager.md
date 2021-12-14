# Class: QueryManager

QueryManager that manages Query class instances

## Table of contents

### Constructors

- [constructor](QueryManager.md#constructor)

### Properties

- [\_entityQueries](QueryManager.md#_entityqueries)
- [queries](QueryManager.md#queries)
- [world](QueryManager.md#world)

### Methods

- [getEntityQueries](QueryManager.md#getentityqueries)
- [getQuery](QueryManager.md#getquery)
- [hasQuery](QueryManager.md#hasquery)
- [onEntityComponentAdded](QueryManager.md#onentitycomponentadded)
- [onEntityComponentRemoved](QueryManager.md#onentitycomponentremoved)
- [onEntityRemoved](QueryManager.md#onentityremoved)
- [removeQuery](QueryManager.md#removequery)
- [updateQueryForEntity](QueryManager.md#updatequeryforentity)

## Constructors

### constructor

• **new QueryManager**(`world`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `world` | [`World`](World.md) |

#### Defined in

[rapida/src/ecs/query-manager.ts:23](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L23)

## Properties

### \_entityQueries

• `Private` **\_entityQueries**: `Map`<`string`, `Set`<[`Query`](Query.md)\>\>

A map of entity ids and a set of queries the entity is part of

#### Defined in

[rapida/src/ecs/query-manager.ts:21](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L21)

___

### queries

• **queries**: `Map`<`string`, [`Query`](Query.md)\>

A map of query dedupe strings to query instances

#### Defined in

[rapida/src/ecs/query-manager.ts:11](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L11)

___

### world

• `Private` **world**: [`World`](World.md)

The world the query manager is in

#### Defined in

[rapida/src/ecs/query-manager.ts:16](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L16)

## Methods

### getEntityQueries

▸ `Private` **getEntityQueries**(`entity`): `Set`<[`Query`](Query.md)\>

Gets a set of queries an entity is part of

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the entity |

#### Returns

`Set`<[`Query`](Query.md)\>

a set of queries an entity is part of

#### Defined in

[rapida/src/ecs/query-manager.ts:140](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L140)

___

### getQuery

▸ **getQuery**(`queryDescription`): [`Query`](Query.md)

Retrieves a query by a query description
Adds a query to the query manager if one with the description does not already exist
If the query already exists, it is returned

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDescription` | [`QueryDescription`](../modules.md#querydescription) | the query to add |

#### Returns

[`Query`](Query.md)

#### Defined in

[rapida/src/ecs/query-manager.ts:33](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L33)

___

### hasQuery

▸ **hasQuery**(`queryDescription`): `boolean`

Returns whether the query manager has the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDescription` | [`QueryDescription`](../modules.md#querydescription) | the query description to check for |

#### Returns

`boolean`

#### Defined in

[rapida/src/ecs/query-manager.ts:70](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L70)

___

### onEntityComponentAdded

▸ **onEntityComponentAdded**(`entity`, `component`): `void`

Updates queries after a component has been added to an entity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the query |
| `component` | [`Component`](Component.md) | the component added to the query |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/query-manager.ts:94](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L94)

___

### onEntityComponentRemoved

▸ **onEntityComponentRemoved**(`entity`, `component`): `void`

Updates queries after a component has been removed from an entity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the query |
| `component` | [`Component`](Component.md) | the component added to the query |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/query-manager.ts:107](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L107)

___

### onEntityRemoved

▸ **onEntityRemoved**(`entity`): `void`

Updates queries after a query has been removed from the world

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the query |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/query-manager.ts:79](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L79)

___

### removeQuery

▸ **removeQuery**(`query`): `void`

Removes a query from the query manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`Query`](Query.md) | the query to remove |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/query-manager.ts:62](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L62)

___

### updateQueryForEntity

▸ `Private` **updateQueryForEntity**(`query`, `entity`): `void`

Updates a query for an entity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`Query`](Query.md) | the query |
| `entity` | [`Entity`](Entity.md) | the entity |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/query-manager.ts:120](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/ecs/query-manager.ts#L120)
