# Interface: RaycastVehiclePublicApi

## Table of contents

### Properties

- [sliding](RaycastVehiclePublicApi.md#sliding)

### Methods

- [applyEngineForce](RaycastVehiclePublicApi.md#applyengineforce)
- [setBrake](RaycastVehiclePublicApi.md#setbrake)
- [setSteeringValue](RaycastVehiclePublicApi.md#setsteeringvalue)

## Properties

### sliding

• **sliding**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `subscribe` | (`callback`: (`sliding`: `boolean`) => `void`) => `void` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:129

## Methods

### applyEngineForce

▸ **applyEngineForce**(`value`, `wheelIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `wheelIndex` | `number` |

#### Returns

`void`

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:126

___

### setBrake

▸ **setBrake**(`brake`, `wheelIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `brake` | `number` |
| `wheelIndex` | `number` |

#### Returns

`void`

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:127

___

### setSteeringValue

▸ **setSteeringValue**(`value`, `wheelIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `wheelIndex` | `number` |

#### Returns

`void`

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:128
