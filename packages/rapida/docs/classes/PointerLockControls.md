# Class: PointerLockControls

A component that creates three js orbit controls

## Hierarchy

- [`CameraControls`](CameraControls.md)

  ↳ **`PointerLockControls`**

## Table of contents

### Constructors

- [constructor](PointerLockControls.md#constructor)

### Properties

- [params](PointerLockControls.md#params)
- [pointerLockControls](PointerLockControls.md#pointerlockcontrols)

### Accessors

- [camera](PointerLockControls.md#camera)
- [rendererElement](PointerLockControls.md#rendererelement)

### Methods

- [destroy](PointerLockControls.md#destroy)
- [init](PointerLockControls.md#init)
- [update](PointerLockControls.md#update)

## Constructors

### constructor

• **new PointerLockControls**(`params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `undefined` |

#### Overrides

[CameraControls](CameraControls.md).[constructor](CameraControls.md#constructor)

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:23](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L23)

## Properties

### params

• `Private` **params**: `undefined`

Params for creating the pointer lock controls

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:21](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L21)

___

### pointerLockControls

• `Optional` **pointerLockControls**: `PointerLockControls`

The three js pointer lock controls

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:16](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L16)

## Accessors

### camera

• `get` **camera**(): [`Camera`](Camera.md)

#### Returns

[`Camera`](Camera.md)

#### Inherited from

CameraControls.camera

#### Defined in

[rapida/src/camera/camera-controls.ts:6](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L6)

• `set` **camera**(`c`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Camera`](Camera.md) |

#### Returns

`void`

#### Inherited from

CameraControls.camera

#### Defined in

[rapida/src/camera/camera-controls.ts:10](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L10)

___

### rendererElement

• `get` **rendererElement**(): `HTMLCanvasElement`

#### Returns

`HTMLCanvasElement`

#### Inherited from

CameraControls.rendererElement

#### Defined in

[rapida/src/camera/camera-controls.ts:14](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/camera-controls.ts#L14)

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

[CameraControls](CameraControls.md).[destroy](CameraControls.md#destroy)

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:37](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L37)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Overrides

[CameraControls](CameraControls.md).[init](CameraControls.md#init)

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:28](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L28)

___

### update

▸ **update**(`_timeElapsed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_timeElapsed` | `number` |

#### Returns

`void`

#### Overrides

CameraControls.update

#### Defined in

[rapida/src/camera/pointer-lock-controls.ts:35](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/camera/pointer-lock-controls.ts#L35)
