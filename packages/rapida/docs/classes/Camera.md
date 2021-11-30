# Class: Camera

A camera that can exist in a world

## Table of contents

### Constructors

- [constructor](Camera.md#constructor)

### Properties

- [controls](Camera.md#controls)
- [id](Camera.md#id)
- [initialised](Camera.md#initialised)
- [threeCamera](Camera.md#threecamera)
- [world](Camera.md#world)

### Accessors

- [position](Camera.md#position)

### Methods

- [\_init](Camera.md#_init)
- [destroy](Camera.md#destroy)
- [setControls](Camera.md#setcontrols)

## Constructors

### constructor

• **new Camera**(`world`, `params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `world` | [`World`](World.md) |
| `params?` | [`CameraParams`](../modules.md#cameraparams) |

#### Defined in

[rapida/src/camera/camera.ts:40](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L40)

## Properties

### controls

• `Optional` **controls**: [`CameraControls`](CameraControls.md)

The cameras controls

#### Defined in

[rapida/src/camera/camera.ts:28](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L28)

___

### id

• **id**: `string`

A unique id for the camera

#### Defined in

[rapida/src/camera/camera.ts:18](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L18)

___

### initialised

• `Private` **initialised**: `boolean` = `false`

Whether the camera has been initialised

#### Defined in

[rapida/src/camera/camera.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L38)

___

### threeCamera

• **threeCamera**: `PerspectiveCamera` \| `OrthographicCamera`

The three js camera

#### Defined in

[rapida/src/camera/camera.ts:23](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L23)

___

### world

• **world**: [`World`](World.md)

The world the camera belongs to

#### Defined in

[rapida/src/camera/camera.ts:33](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L33)

## Accessors

### position

• `get` **position**(): `Vector3`

#### Returns

`Vector3`

#### Defined in

[rapida/src/camera/camera.ts:46](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L46)

• `set` **position**(`vector3`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vector3` | `Vector3` |

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera.ts:50](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L50)

## Methods

### \_init

▸ **_init**(): `void`

Initialisation logic for the camera

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera.ts:57](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L57)

___

### destroy

▸ **destroy**(): `void`

Destruction logic for the camera

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera.ts:68](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L68)

___

### setControls

▸ **setControls**(`controls`): `void`

Sets the controls for the camera

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controls` | [`CameraControls`](CameraControls.md) | the controls for the camera |

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera.ts:77](https://gitlab.com/rapidajs/rapida/-/blob/b5e99c9/packages/rapida/src/camera/camera.ts#L77)
