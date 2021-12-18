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

[src/types.ts:182](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L182)

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

[src/types.ts:179](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L179)

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

[src/types.ts:180](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L180)

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

[src/types.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L181)
