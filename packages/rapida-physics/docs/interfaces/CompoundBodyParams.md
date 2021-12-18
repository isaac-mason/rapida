# Interface: CompoundBodyParams

## Hierarchy

- [`BodyParams`](../modules.md#bodyparams)

  ↳ **`CompoundBodyParams`**

## Table of contents

### Properties

- [allowSleep](CompoundBodyParams.md#allowsleep)
- [angularDamping](CompoundBodyParams.md#angulardamping)
- [angularFactor](CompoundBodyParams.md#angularfactor)
- [angularVelocity](CompoundBodyParams.md#angularvelocity)
- [args](CompoundBodyParams.md#args)
- [collisionFilterGroup](CompoundBodyParams.md#collisionfiltergroup)
- [collisionFilterMask](CompoundBodyParams.md#collisionfiltermask)
- [collisionResponse](CompoundBodyParams.md#collisionresponse)
- [fixedRotation](CompoundBodyParams.md#fixedrotation)
- [isTrigger](CompoundBodyParams.md#istrigger)
- [linearDamping](CompoundBodyParams.md#lineardamping)
- [linearFactor](CompoundBodyParams.md#linearfactor)
- [mass](CompoundBodyParams.md#mass)
- [material](CompoundBodyParams.md#material)
- [position](CompoundBodyParams.md#position)
- [rotation](CompoundBodyParams.md#rotation)
- [shapes](CompoundBodyParams.md#shapes)
- [sleepSpeedLimit](CompoundBodyParams.md#sleepspeedlimit)
- [sleepTimeLimit](CompoundBodyParams.md#sleeptimelimit)
- [type](CompoundBodyParams.md#type)
- [userData](CompoundBodyParams.md#userdata)
- [velocity](CompoundBodyParams.md#velocity)

### Methods

- [onCollide](CompoundBodyParams.md#oncollide)
- [onCollideBegin](CompoundBodyParams.md#oncollidebegin)
- [onCollideEnd](CompoundBodyParams.md#oncollideend)

## Properties

### allowSleep

• `Optional` **allowSleep**: `boolean`

If true, the body will automatically fall to sleep.

#### Inherited from

BodyParams.allowSleep

#### Defined in

[packages/rapida-physics/src/types.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L47)

___

### angularDamping

• `Optional` **angularDamping**: `number`

How much to damp the body angular velocity each step. It can go from 0 to 1.

#### Inherited from

BodyParams.angularDamping

#### Defined in

[packages/rapida-physics/src/types.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L52)

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

[packages/rapida-physics/src/types.ts:517](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L517)

___

### collisionFilterGroup

• `Optional` **collisionFilterGroup**: `number`

The collision group the body belongs to.

#### Inherited from

BodyParams.collisionFilterGroup

#### Defined in

[packages/rapida-physics/src/types.ts:57](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L57)

___

### collisionFilterMask

• `Optional` **collisionFilterMask**: `number`

The collision group the body can collide with.

#### Inherited from

BodyParams.collisionFilterMask

#### Defined in

[packages/rapida-physics/src/types.ts:62](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L62)

___

### collisionResponse

• `Optional` **collisionResponse**: `number`

Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled - i.e. "collide" events will be raised, but forces will not be altered.

#### Inherited from

BodyParams.collisionResponse

#### Defined in

[packages/rapida-physics/src/types.ts:67](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L67)

___

### fixedRotation

• `Optional` **fixedRotation**: `boolean`

Set to true if you don't want the body to rotate

#### Inherited from

BodyParams.fixedRotation

#### Defined in

[packages/rapida-physics/src/types.ts:72](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L72)

___

### isTrigger

• `Optional` **isTrigger**: `boolean`

When true the body behaves like a trigger. It does not collide
with other bodies but collision events are still triggered.

#### Inherited from

BodyParams.isTrigger

#### Defined in

[packages/rapida-physics/src/types.ts:78](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L78)

___

### linearDamping

• `Optional` **linearDamping**: `number`

How much to damp the body velocity each step. It can go from 0 to 1.

#### Inherited from

BodyParams.linearDamping

#### Defined in

[packages/rapida-physics/src/types.ts:83](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L83)

___

### linearFactor

• **linearFactor**: `undefined` \| [`Triplet`](../modules.md#triplet)

#### Inherited from

BodyParams.linearFactor

___

### mass

• `Optional` **mass**: `number`

The mass of the body

#### Inherited from

BodyParams.mass

#### Defined in

[packages/rapida-physics/src/types.ts:88](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L88)

___

### material

• `Optional` **material**: `string` \| { `friction?`: `number` ; `restitution?`: `number`  }

The material for the body

#### Inherited from

BodyParams.material

#### Defined in

[packages/rapida-physics/src/types.ts:93](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L93)

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

• **shapes**: `Partial`<[`AtomicParams`](../modules.md#atomicparams)\> & `Partial`<[`VectorParams`](../modules.md#vectorparams)\> & { `args?`: `unknown` ; `type?`: [`BodyType`](../enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](../modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](../modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](../modules.md#collideendevent)) => `void`  } & { `type`: [`ShapeType`](../modules.md#shapetype)  }[]

#### Defined in

[packages/rapida-physics/src/types.ts:607](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L607)

___

### sleepSpeedLimit

• `Optional` **sleepSpeedLimit**: `number`

If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.

#### Inherited from

BodyParams.sleepSpeedLimit

#### Defined in

[packages/rapida-physics/src/types.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L98)

___

### sleepTimeLimit

• `Optional` **sleepTimeLimit**: `number`

If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.

#### Inherited from

BodyParams.sleepTimeLimit

#### Defined in

[packages/rapida-physics/src/types.ts:103](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L103)

___

### type

• `Optional` **type**: [`BodyType`](../enums/BodyType.md)

#### Inherited from

BodyParams.type

#### Defined in

[packages/rapida-physics/src/types.ts:518](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L518)

___

### userData

• `Optional` **userData**: `any`

#### Inherited from

BodyParams.userData

#### Defined in

[packages/rapida-physics/src/types.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L105)

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

[packages/rapida-physics/src/types.ts:519](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L519)

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

[packages/rapida-physics/src/types.ts:520](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L520)

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

[packages/rapida-physics/src/types.ts:521](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/types.ts#L521)
