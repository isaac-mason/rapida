# Class: Camera

A camera that can exist in a world

## Table of contents

### Constructors

- [constructor](Camera.md#constructor)

### Properties

- [id](Camera.md#id)
- [threeCamera](Camera.md#threecamera)
- [world](Camera.md#world)

### Accessors

- [position](Camera.md#position)

## Constructors

### constructor

• **new Camera**(`world`, `params?`)

Constructor for a camera

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `world` | [`World`](World.md) | the world the camera exists in |
| `params?` | [`CameraParams`](../modules.md#cameraparams) | params for creating the camera |

#### Defined in

[rapida/src/camera/camera.ts:34](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L34)

## Properties

### id

• **id**: `string`

A unique id for the camera

#### Defined in

[rapida/src/camera/camera.ts:17](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L17)

___

### threeCamera

• **threeCamera**: `PerspectiveCamera` \| `OrthographicCamera`

The three js camera

#### Defined in

[rapida/src/camera/camera.ts:22](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L22)

___

### world

• **world**: [`World`](World.md)

The world the camera belongs to

#### Defined in

[rapida/src/camera/camera.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L27)

## Accessors

### position

• `get` **position**(): `Vector3`

#### Returns

`Vector3`

#### Defined in

[rapida/src/camera/camera.ts:40](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L40)

• `set` **position**(`vector3`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vector3` | `Vector3` |

#### Returns

`void`

#### Defined in

[rapida/src/camera/camera.ts:44](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida/src/camera/camera.ts#L44)
