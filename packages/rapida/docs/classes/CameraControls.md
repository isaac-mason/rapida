# Class: CameraControls

## Hierarchy

- **`CameraControls`**

  ↳ [`OrbitControls`](OrbitControls.md)

  ↳ [`PointerLockControls`](PointerLockControls.md)

## Table of contents

### Constructors

- [constructor](CameraControls.md#constructor)

### Properties

- [\_camera](CameraControls.md#_camera)
- [update](CameraControls.md#update)

### Accessors

- [camera](CameraControls.md#camera)
- [rendererElement](CameraControls.md#rendererelement)

### Methods

- [destroy](CameraControls.md#destroy)
- [init](CameraControls.md#init)

## Constructors

### constructor

• **new CameraControls**()

## Properties

### \_camera

• `Private` `Optional` **\_camera**: [`Camera`](Camera.md)

#### Defined in

[rapida/src/camera/camera-controls.ts:4](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L4)

___

### update

• `Abstract` **update**: (`timeElapsed`: `number`) => `undefined` \| `void`

#### Type declaration

▸ (`timeElapsed`): `undefined` \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `timeElapsed` | `number` |

##### Returns

`undefined` \| `void`

#### Defined in

[rapida/src/camera/camera-controls.ts:20](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L20)

## Accessors

### camera

• `get` **camera**(): [`Camera`](Camera.md)

#### Returns

[`Camera`](Camera.md)

#### Defined in

[rapida/src/camera/camera-controls.ts:6](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L6)

• `set` **camera**(`c`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Camera`](Camera.md) |

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera-controls.ts:10](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L10)

___

### rendererElement

• `get` **rendererElement**(): `HTMLCanvasElement`

#### Returns

`HTMLCanvasElement`

#### Defined in

[rapida/src/camera/camera-controls.ts:14](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L14)

## Methods

### destroy

▸ `Abstract` **destroy**(): `void`

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera-controls.ts:22](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L22)

___

### init

▸ `Abstract` **init**(): `void`

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera-controls.ts:18](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L18)
