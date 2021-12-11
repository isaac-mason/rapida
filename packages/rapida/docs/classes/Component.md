# Class: Component

Component that has data and behavior through lifecycle hooks, and can be added to an entity.

This class should be extended to add fields for data, and to set the methods `onInit`, `onUpdate`, and `onDestroy`.

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

[rapida/src/ecs/component.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L59)

## Properties

### \_entity

• `Private` `Optional` **\_entity**: [`Entity`](Entity.md)

The entity this component belongs to. Set on adding to an Entity.

#### Defined in

[rapida/src/ecs/component.ts:24](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L24)

___

### id

• **id**: `string`

This component instances unique id

#### Defined in

[rapida/src/ecs/component.ts:19](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L19)

___

### onDestroy

• **onDestroy**: `undefined` \| () => `void` = `undefined`

Destruction logic

#### Defined in

[rapida/src/ecs/component.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L78)

___

### onInit

• **onInit**: `undefined` \| () => `void` = `undefined`

Initialisation logic. The entity will be available in this method.

#### Defined in

[rapida/src/ecs/component.ts:66](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L66)

___

### onUpdate

• **onUpdate**: `undefined` \| (`timeElapsed`: `number`) => `void` = `undefined`

Update logic for the component
If this method is not implemented in a component it will not be added to the update job pool

**`param`** the time since the last update for this component in milliseconds

#### Defined in

[rapida/src/ecs/component.ts:73](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L73)

## Accessors

### entity

• `get` **entity**(): [`Entity`](Entity.md)

Gets the entity for the component. Available during init call.

#### Returns

[`Entity`](Entity.md)

#### Defined in

[rapida/src/ecs/component.ts:29](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L29)

• `set` **entity**(`entity`): `void`

Sets what entity the component belongs to

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | [`Entity`](Entity.md) | the entity |

#### Returns

`void`

#### Defined in

[rapida/src/ecs/component.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L37)

___

### space

• `get` **space**(): [`Space`](Space.md)

The Space the components entity is in

#### Returns

[`Space`](Space.md)

#### Defined in

[rapida/src/ecs/component.ts:44](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L44)

___

### world

• `get` **world**(): [`World`](World.md)

The World the components entity is in

#### Returns

[`World`](World.md)

#### Defined in

[rapida/src/ecs/component.ts:51](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/ecs/component.ts#L51)
