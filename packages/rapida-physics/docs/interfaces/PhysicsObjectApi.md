# Interface: PhysicsObjectApi

## Hierarchy

- [`WorkerApi`](../modules.md#workerapi)

  ↳ **`PhysicsObjectApi`**

## Table of contents

### Properties

- [allowSleep](PhysicsObjectApi.md#allowsleep)
- [angularDamping](PhysicsObjectApi.md#angulardamping)
- [angularFactor](PhysicsObjectApi.md#angularfactor)
- [angularVelocity](PhysicsObjectApi.md#angularvelocity)
- [collisionFilterGroup](PhysicsObjectApi.md#collisionfiltergroup)
- [collisionFilterMask](PhysicsObjectApi.md#collisionfiltermask)
- [collisionResponse](PhysicsObjectApi.md#collisionresponse)
- [fixedRotation](PhysicsObjectApi.md#fixedrotation)
- [isTrigger](PhysicsObjectApi.md#istrigger)
- [linearDamping](PhysicsObjectApi.md#lineardamping)
- [linearFactor](PhysicsObjectApi.md#linearfactor)
- [mass](PhysicsObjectApi.md#mass)
- [material](PhysicsObjectApi.md#material)
- [position](PhysicsObjectApi.md#position)
- [rotation](PhysicsObjectApi.md#rotation)
- [sleepSpeedLimit](PhysicsObjectApi.md#sleepspeedlimit)
- [sleepTimeLimit](PhysicsObjectApi.md#sleeptimelimit)
- [userData](PhysicsObjectApi.md#userdata)
- [velocity](PhysicsObjectApi.md#velocity)

### Methods

- [applyForce](PhysicsObjectApi.md#applyforce)
- [applyImpulse](PhysicsObjectApi.md#applyimpulse)
- [applyLocalForce](PhysicsObjectApi.md#applylocalforce)
- [applyLocalImpulse](PhysicsObjectApi.md#applylocalimpulse)
- [applyTorque](PhysicsObjectApi.md#applytorque)
- [at](PhysicsObjectApi.md#at)
- [destroy](PhysicsObjectApi.md#destroy)
- [sleep](PhysicsObjectApi.md#sleep)
- [wakeUp](PhysicsObjectApi.md#wakeup)

## Properties

### allowSleep

• **allowSleep**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.allowSleep

___

### angularDamping

• **angularDamping**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.angularDamping

___

### angularFactor

• **angularFactor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.angularFactor

___

### angularVelocity

• **angularVelocity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.angularVelocity

___

### collisionFilterGroup

• **collisionFilterGroup**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.collisionFilterGroup

___

### collisionFilterMask

• **collisionFilterMask**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.collisionFilterMask

___

### collisionResponse

• **collisionResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.collisionResponse

___

### fixedRotation

• **fixedRotation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.fixedRotation

___

### isTrigger

• **isTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.isTrigger

___

### linearDamping

• **linearDamping**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.linearDamping

___

### linearFactor

• **linearFactor**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.linearFactor

___

### mass

• **mass**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.mass

___

### material

• **material**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.material

___

### position

• **position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.position

___

### rotation

• **rotation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.rotation

___

### sleepSpeedLimit

• **sleepSpeedLimit**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.sleepSpeedLimit

___

### sleepTimeLimit

• **sleepTimeLimit**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.sleepTimeLimit

___

### userData

• **userData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `set` | (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void` |
| `subscribe` | (`callback`: (`value`: [`AtomicParams`](../modules.md#atomicparams)[`K`]) => `void`) => () => `void` |

#### Inherited from

WorkerApi.userData

___

### velocity

• **velocity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copy` | (`__namedParameters`: `Vector3` \| `Euler`) => `void` |
| `set` | (`x`: `number`, `y`: `number`, `z`: `number`) => `void` |
| `subscribe` | (`callback`: (`value`: [`Triplet`](../modules.md#triplet)) => `void`) => () => `void` |

#### Inherited from

WorkerApi.velocity

## Methods

### applyForce

▸ **applyForce**(`force`, `worldPoint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `force` | [`Triplet`](../modules.md#triplet) |
| `worldPoint` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Inherited from

WorkerApi.applyForce

#### Defined in

[src/types.ts:125](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L125)

___

### applyImpulse

▸ **applyImpulse**(`impulse`, `worldPoint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `impulse` | [`Triplet`](../modules.md#triplet) |
| `worldPoint` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Inherited from

WorkerApi.applyImpulse

#### Defined in

[src/types.ts:126](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L126)

___

### applyLocalForce

▸ **applyLocalForce**(`force`, `localPoint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `force` | [`Triplet`](../modules.md#triplet) |
| `localPoint` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Inherited from

WorkerApi.applyLocalForce

#### Defined in

[src/types.ts:127](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L127)

___

### applyLocalImpulse

▸ **applyLocalImpulse**(`impulse`, `localPoint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `impulse` | [`Triplet`](../modules.md#triplet) |
| `localPoint` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Inherited from

WorkerApi.applyLocalImpulse

#### Defined in

[src/types.ts:128](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L128)

___

### applyTorque

▸ **applyTorque**(`torque`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `torque` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Inherited from

WorkerApi.applyTorque

#### Defined in

[src/types.ts:129](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L129)

___

### at

▸ **at**(`index`): [`WorkerApi`](../modules.md#workerapi)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`WorkerApi`](../modules.md#workerapi)

#### Defined in

[src/types.ts:136](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L136)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

WorkerApi.destroy

#### Defined in

[src/types.ts:132](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L132)

___

### sleep

▸ **sleep**(): `void`

#### Returns

`void`

#### Inherited from

WorkerApi.sleep

#### Defined in

[src/types.ts:131](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L131)

___

### wakeUp

▸ **wakeUp**(): `void`

#### Returns

`void`

#### Inherited from

WorkerApi.wakeUp

#### Defined in

[src/types.ts:130](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L130)
