# Class: Query

Query for entities with given components

Queries can contain a minimum of one and a maximum of three conditions, the `all`, `one`, and `not` QueryConditionType conditions.

## Table of contents

### Constructors

- [constructor](Query.md#constructor)

### Properties

- [componentNames](Query.md#componentnames)
- [entities](Query.md#entities)
- [key](Query.md#key)
- [queryDescription](Query.md#querydescription)

### Methods

- [addEntity](Query.md#addentity)
- [match](Query.md#match)
- [removeEntity](Query.md#removeentity)
- [getDescriptionDedupeString](Query.md#getdescriptiondedupestring)

## Constructors

### constructor

• **new Query**(`queryDescription`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryDescription` | [`QueryDescription`](../modules.md#querydescription) |

#### Defined in

[packages/rapida/src/ecs/query.ts:44](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L44)

## Properties

### componentNames

• **componentNames**: `string`[]

A list of all component names that are involved in the conditions for this query

#### Defined in

[packages/rapida/src/ecs/query.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L37)

___

### entities

• **entities**: `Set`<[`Entity`](Entity.md)\>

The current entities matched by the query

#### Defined in

[packages/rapida/src/ecs/query.ts:32](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L32)

___

### key

• **key**: `string`

The query dedupe string

#### Defined in

[packages/rapida/src/ecs/query.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L27)

___

### queryDescription

• **queryDescription**: [`QueryDescription`](../modules.md#querydescription)

The query description for this query

#### Defined in

[packages/rapida/src/ecs/query.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L42)

## Methods

### addEntity

▸ **addEntity**(`e`): `void`

Adds an entity to the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`Entity`](Entity.md) | the entity to add |

#### Returns

`void`

#### Defined in

[packages/rapida/src/ecs/query.ts:70](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L70)

___

### match

▸ **match**(`e`): `boolean`

Returns whether an entity matches the conditions of the query description

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`Entity`](Entity.md) | the entity to check |

#### Returns

`boolean`

whether an entity matches the conditions of the query description

#### Defined in

[packages/rapida/src/ecs/query.ts:87](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L87)

___

### removeEntity

▸ **removeEntity**(`e`): `void`

Removes an entity from the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | [`Entity`](Entity.md) | the entity to remove |

#### Returns

`void`

#### Defined in

[packages/rapida/src/ecs/query.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L78)

___

### getDescriptionDedupeString

▸ `Static` **getDescriptionDedupeString**(`query`): `string`

Returns a string that identifies a query description

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`QueryDescription`](../modules.md#querydescription) | the query description |

#### Returns

`string`

a string that identifies a query description

#### Defined in

[packages/rapida/src/ecs/query.ts:116](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L116)
