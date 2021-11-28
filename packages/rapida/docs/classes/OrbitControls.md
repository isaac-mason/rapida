# Class: OrbitControls

A component that creates three js orbit controls

## Hierarchy

- [`CameraControls`](CameraControls.md)

  ↳ **`OrbitControls`**

## Table of contents

### Constructors

- [constructor](OrbitControls.md#constructor)

### Properties

- [orbitControls](OrbitControls.md#orbitcontrols)
- [params](OrbitControls.md#params)

### Accessors

- [camera](OrbitControls.md#camera)
- [rendererElement](OrbitControls.md#rendererelement)

### Methods

- [destroy](OrbitControls.md#destroy)
- [init](OrbitControls.md#init)
- [update](OrbitControls.md#update)

## Constructors

### constructor

• **new OrbitControls**(`params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `OrbitControlsCreationParams` |

#### Overrides

[CameraControls](CameraControls.md).[constructor](CameraControls.md#constructor)

#### Defined in

[rapida/src/camera/orbit-controls.ts:35](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L35)

## Properties

### orbitControls

• `Optional` **orbitControls**: `OrbitControls`

The three js orbit controls

#### Defined in

[rapida/src/camera/orbit-controls.ts:28](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L28)

___

### params

• `Private` **params**: `OrbitControlsParams`

Params for creating the orbit controls

#### Defined in

[rapida/src/camera/orbit-controls.ts:33](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L33)

## Accessors

### camera

• `get` **camera**(): [`Camera`](Camera.md)

#### Returns

[`Camera`](Camera.md)

#### Inherited from

CameraControls.camera

#### Defined in

[rapida/src/camera/camera-controls.ts:6](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/camera-controls.ts#L6)

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

[rapida/src/camera/camera-controls.ts:10](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/camera-controls.ts#L10)

___

### rendererElement

• `get` **rendererElement**(): `HTMLCanvasElement`

#### Returns

`HTMLCanvasElement`

#### Inherited from

CameraControls.rendererElement

#### Defined in

[rapida/src/camera/camera-controls.ts:14](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/camera-controls.ts#L14)

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

[CameraControls](CameraControls.md).[destroy](CameraControls.md#destroy)

#### Defined in

[rapida/src/camera/orbit-controls.ts:61](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L61)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Overrides

[CameraControls](CameraControls.md).[init](CameraControls.md#init)

#### Defined in

[rapida/src/camera/orbit-controls.ts:46](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L46)

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

[rapida/src/camera/orbit-controls.ts:57](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/orbit-controls.ts#L57)
