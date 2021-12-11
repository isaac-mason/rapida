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

rapida-physics/lib/types.d.ts:16

___

### angularDamping

• `Optional` **angularDamping**: `number`

#### Inherited from

BodyParams.angularDamping

#### Defined in

rapida-physics/lib/types.d.ts:17

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

rapida-physics/lib/types.d.ts:343

___

### collisionFilterGroup

• `Optional` **collisionFilterGroup**: `number`

#### Inherited from

BodyParams.collisionFilterGroup

#### Defined in

rapida-physics/lib/types.d.ts:18

___

### collisionFilterMask

• `Optional` **collisionFilterMask**: `number`

#### Inherited from

BodyParams.collisionFilterMask

#### Defined in

rapida-physics/lib/types.d.ts:19

___

### collisionResponse

• `Optional` **collisionResponse**: `number`

#### Inherited from

BodyParams.collisionResponse

#### Defined in

rapida-physics/lib/types.d.ts:20

___

### fixedRotation

• `Optional` **fixedRotation**: `boolean`

#### Inherited from

BodyParams.fixedRotation

#### Defined in

rapida-physics/lib/types.d.ts:21

___

### isTrigger

• `Optional` **isTrigger**: `boolean`

#### Inherited from

BodyParams.isTrigger

#### Defined in

rapida-physics/lib/types.d.ts:22

___

### linearDamping

• `Optional` **linearDamping**: `number`

#### Inherited from

BodyParams.linearDamping

#### Defined in

rapida-physics/lib/types.d.ts:23

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

rapida-physics/lib/types.d.ts:24

___

### material

• `Optional` **material**: `string` \| { `friction?`: `number` ; `restitution?`: `number`  }

#### Inherited from

BodyParams.material

#### Defined in

rapida-physics/lib/types.d.ts:25

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

rapida-physics/lib/types.d.ts:380

___

### sleepSpeedLimit

• `Optional` **sleepSpeedLimit**: `number`

#### Inherited from

BodyParams.sleepSpeedLimit

#### Defined in

rapida-physics/lib/types.d.ts:26

___

### sleepTimeLimit

• `Optional` **sleepTimeLimit**: `number`

#### Inherited from

BodyParams.sleepTimeLimit

#### Defined in

rapida-physics/lib/types.d.ts:27

___

### type

• `Optional` **type**: [`BodyType`](../enums/BodyType.md)

#### Inherited from

BodyParams.type

#### Defined in

rapida-physics/lib/types.d.ts:344

___

### userData

• `Optional` **userData**: `any`

#### Inherited from

BodyParams.userData

#### Defined in

rapida-physics/lib/types.d.ts:28

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

rapida-physics/lib/types.d.ts:345

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

rapida-physics/lib/types.d.ts:346

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

rapida-physics/lib/types.d.ts:347
