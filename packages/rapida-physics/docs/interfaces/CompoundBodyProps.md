# Interface: CompoundBodyProps

## Hierarchy

- [`BodyParams`](../modules.md#bodyparams)

  ↳ **`CompoundBodyProps`**

## Table of contents

### Properties

- [allowSleep](CompoundBodyProps.md#allowsleep)
- [angularDamping](CompoundBodyProps.md#angulardamping)
- [angularFactor](CompoundBodyProps.md#angularfactor)
- [angularVelocity](CompoundBodyProps.md#angularvelocity)
- [args](CompoundBodyProps.md#args)
- [collisionFilterGroup](CompoundBodyProps.md#collisionfiltergroup)
- [collisionFilterMask](CompoundBodyProps.md#collisionfiltermask)
- [collisionResponse](CompoundBodyProps.md#collisionresponse)
- [fixedRotation](CompoundBodyProps.md#fixedrotation)
- [isTrigger](CompoundBodyProps.md#istrigger)
- [linearDamping](CompoundBodyProps.md#lineardamping)
- [linearFactor](CompoundBodyProps.md#linearfactor)
- [mass](CompoundBodyProps.md#mass)
- [material](CompoundBodyProps.md#material)
- [position](CompoundBodyProps.md#position)
- [rotation](CompoundBodyProps.md#rotation)
- [shapes](CompoundBodyProps.md#shapes)
- [sleepSpeedLimit](CompoundBodyProps.md#sleepspeedlimit)
- [sleepTimeLimit](CompoundBodyProps.md#sleeptimelimit)
- [type](CompoundBodyProps.md#type)
- [userData](CompoundBodyProps.md#userdata)
- [velocity](CompoundBodyProps.md#velocity)

### Methods

- [onCollide](CompoundBodyProps.md#oncollide)
- [onCollideBegin](CompoundBodyProps.md#oncollidebegin)
- [onCollideEnd](CompoundBodyProps.md#oncollideend)

## Properties

### allowSleep

• `Optional` **allowSleep**: `boolean`

#### Inherited from

BodyParams.allowSleep

#### Defined in

[src/types.ts:44](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L44)

___

### angularDamping

• `Optional` **angularDamping**: `number`

#### Inherited from

BodyParams.angularDamping

#### Defined in

[src/types.ts:45](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L45)

___

### angularFactor

• **angularFactor**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.angularFactor

___

### angularVelocity

• **angularVelocity**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.angularVelocity

___

### args

• `Optional` **args**: `unknown`

#### Inherited from

BodyParams.args

#### Defined in

[src/types.ts:468](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L468)

___

### collisionFilterGroup

• `Optional` **collisionFilterGroup**: `number`

#### Inherited from

BodyParams.collisionFilterGroup

#### Defined in

[src/types.ts:46](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L46)

___

### collisionFilterMask

• `Optional` **collisionFilterMask**: `number`

#### Inherited from

BodyParams.collisionFilterMask

#### Defined in

[src/types.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L47)

___

### collisionResponse

• `Optional` **collisionResponse**: `number`

#### Inherited from

BodyParams.collisionResponse

#### Defined in

[src/types.ts:48](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L48)

___

### fixedRotation

• `Optional` **fixedRotation**: `boolean`

#### Inherited from

BodyParams.fixedRotation

#### Defined in

[src/types.ts:49](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L49)

___

### isTrigger

• `Optional` **isTrigger**: `boolean`

#### Inherited from

BodyParams.isTrigger

#### Defined in

[src/types.ts:50](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L50)

___

### linearDamping

• `Optional` **linearDamping**: `number`

#### Inherited from

BodyParams.linearDamping

#### Defined in

[src/types.ts:51](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L51)

___

### linearFactor

• **linearFactor**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.linearFactor

___

### mass

• `Optional` **mass**: `number`

#### Inherited from

BodyParams.mass

#### Defined in

[src/types.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L52)

___

### material

• `Optional` **material**: `string` \| { `friction?`: `number` ; `restitution?`: `number`  }

#### Inherited from

BodyParams.material

#### Defined in

[src/types.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L53)

___

### position

• **position**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.position

___

### rotation

• **rotation**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.rotation

___

### shapes

• **shapes**: `Partial`<[`AtomicProps`](../modules.md#atomicprops)\> & `Partial`<[`VectorProps`](../modules.md#vectorprops)\> & { `args?`: `unknown` ; `type?`: [`BodyType`](../enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](../modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](../modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](../modules.md#collideendevent)) => `void`  } & { `type`: [`ShapeType`](../modules.md#shapetype)  }[]

#### Defined in

[src/types.ts:513](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L513)

___

### sleepSpeedLimit

• `Optional` **sleepSpeedLimit**: `number`

#### Inherited from

BodyParams.sleepSpeedLimit

#### Defined in

[src/types.ts:54](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L54)

___

### sleepTimeLimit

• `Optional` **sleepTimeLimit**: `number`

#### Inherited from

BodyParams.sleepTimeLimit

#### Defined in

[src/types.ts:55](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L55)

___

### type

• `Optional` **type**: [`BodyType`](../enums/BodyType.md)

#### Inherited from

BodyParams.type

#### Defined in

[src/types.ts:469](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L469)

___

### userData

• `Optional` **userData**: `any`

#### Inherited from

BodyParams.userData

#### Defined in

[src/types.ts:56](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L56)

___

### velocity

• **velocity**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.velocity

## Methods

### onCollide

▸ `Optional` **onCollide**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`CollideEvent`](../modules.md#collideevent) |

#### Returns

`void`

#### Inherited from

BodyParams.onCollide

#### Defined in

[src/types.ts:470](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L470)

___

### onCollideBegin

▸ `Optional` **onCollideBegin**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`CollideBeginEvent`](../modules.md#collidebeginevent) |

#### Returns

`void`

#### Inherited from

BodyParams.onCollideBegin

#### Defined in

[src/types.ts:471](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L471)

___

### onCollideEnd

▸ `Optional` **onCollideEnd**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`CollideEndEvent`](../modules.md#collideendevent) |

#### Returns

`void`

#### Inherited from

BodyParams.onCollideEnd

#### Defined in

[src/types.ts:472](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida-physics/src/types.ts#L472)
