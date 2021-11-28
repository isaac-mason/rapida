# Class: Component

A component of an entity that has data and behaviour

## Table of contents

### Constructors

- [constructor](Component.md#constructor)

### Properties

- [\_entity](Component.md#_entity)
- [id](Component.md#id)
- [onDestroy](Component.md#ondestroy)
- [onInit](Component.md#oninit)
- [onUpdate](Component.md#onupdate)

### Accessors

- [entity](Component.md#entity)
- [space](Component.md#space)
- [world](Component.md#world)

## Constructors

### constructor

• **new Component**(`params?`)

Constructor for a Component

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`ComponentParams`](../modules.md#componentparams) |

#### Defined in

[rapida/src/ecs/component.ts:57](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L57)

## Properties

### \_entity

• `Private` `Optional` **\_entity**: [`Entity`](Entity.md)

The entity this component belongs to. Set on adding to an Entity.

#### Defined in

[rapida/src/ecs/component.ts:22](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L22)

___

### id

• **id**: `string`

This component instances unique id

#### Defined in

[rapida/src/ecs/component.ts:17](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L17)

___

### onDestroy

• **onDestroy**: `undefined` \| () => `void` = `undefined`

Destruction logic

#### Defined in

[rapida/src/ecs/component.ts:76](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L76)

___

### onInit

• **onInit**: `undefined` \| () => `void` = `undefined`

Initialisation logic. The entity will be available in this method.

#### Defined in

[rapida/src/ecs/component.ts:64](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L64)

___

### onUpdate

• **onUpdate**: `undefined` \| (`timeElapsed`: `number`) => `void` = `undefined`

Update logic for the component
If this method is not implemented in a component it will not be added to the update job pool

**`param`** the time since the last update for this component in milliseconds

#### Defined in

[rapida/src/ecs/component.ts:71](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L71)

## Accessors

### entity

• `get` **entity**(): [`Entity`](Entity.md)

Gets the entity for the component. Available during init call.

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/component.ts:27](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L27)

• `set` **entity**(`entity`): `void`

Sets what entity the component belongs to

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the entity |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/component.ts:35](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L35)

___

### space

• `get` **space**(): [`Space`](Space.md)

The Space the components entity is in

#### Returns

[`Space`](Space.md)

#### Defined in

[rapida/src/ecs/component.ts:42](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L42)

___

### world

• `get` **world**(): [`World`](World.md)

The World the components entity is in

#### Returns

[`World`](World.md)

#### Defined in

[rapida/src/ecs/component.ts:49](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L49)
