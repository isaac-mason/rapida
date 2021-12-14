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

[src/types.ts:133](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L133)

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

[src/types.ts:130](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L130)

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

[src/types.ts:131](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L131)

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

[src/types.ts:132](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L132)
