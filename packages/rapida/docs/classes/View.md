# Class: View

A view that the runtime should render

## Table of contents

### Constructors

- [constructor](View.md#constructor)

### Properties

- [camera](View.md#camera)
- [clearColor](View.md#clearcolor)
- [clearDepth](View.md#cleardepth)
- [effectComposer](View.md#effectcomposer)
- [id](View.md#id)
- [mouse](View.md#mouse)
- [renderPass](View.md#renderpass)
- [scene](View.md#scene)
- [scissor](View.md#scissor)
- [size](View.md#size)
- [viewport](View.md#viewport)
- [world](View.md#world)

### Accessors

- [renderer](View.md#renderer)

### Methods

- [\_destroy](View.md#_destroy)
- [\_init](View.md#_init)
- [\_onResize](View.md#_onresize)
- [getBoundingRect](View.md#getboundingrect)
- [setCamera](View.md#setcamera)

## Constructors

### constructor

• **new View**(`world`, `__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `world` | [`World`](World.md) |
| `__namedParameters` | [`ViewParams`](../modules.md#viewparams) |

#### Defined in

[rapida/src/view/view.ts:137](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L137)

## Properties

### camera

• **camera**: [`Camera`](Camera.md)

The views camera

#### Defined in

[rapida/src/view/view.ts:71](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L71)

___

### clearColor

• **clearColor**: `Color`

The clear color the renderer should use for this view. Defaults to black - 0x000000

#### Defined in

[rapida/src/view/view.ts:96](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L96)

___

### clearDepth

• **clearDepth**: `boolean`

Whether clearDepth should be called after rendering this view

#### Defined in

[rapida/src/view/view.ts:91](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L91)

___

### effectComposer

• **effectComposer**: `EffectComposer`<`WebGLRenderTarget`\>

The effect composer for the view

#### Defined in

[rapida/src/view/view.ts:121](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L121)

___

### id

• **id**: `string`

A unique identifier for the view

#### Defined in

[rapida/src/view/view.ts:66](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L66)

___

### mouse

• **mouse**: `Vector2`

The relative mouse position on the view.

#### Defined in

[rapida/src/view/view.ts:101](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L101)

___

### renderPass

• `Private` **renderPass**: `RenderPass`

The render pass for the view

#### Defined in

[rapida/src/view/view.ts:131](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L131)

___

### scene

• **scene**: [`Scene`](Scene.md)

The views scene

#### Defined in

[rapida/src/view/view.ts:76](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L76)

___

### scissor

• **scissor**: `Scissor`

The scissor for the view. The shape outside of which nothing can be rendered

#### Defined in

[rapida/src/view/view.ts:86](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L86)

___

### size

• **size**: `Object`

The current size of the viewport in pixels

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `left` | `number` |
| `top` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/view/view.ts:106](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L106)

___

### viewport

• **viewport**: `Viewport`

The viewport for the view. Sets how to convert from a shader's clip space to some portion of the canvas's pixel space

#### Defined in

[rapida/src/view/view.ts:81](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L81)

___

### world

• `Private` **world**: [`World`](World.md)

The world the view belongs to

#### Defined in

[rapida/src/view/view.ts:126](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L126)

## Accessors

### renderer

• `Private` `get` **renderer**(): `WebGLRenderer`

#### Returns

`WebGLRenderer`

#### Defined in

[rapida/src/view/view.ts:133](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L133)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroys the view

#### Returns

`void`

#### Defined in

[rapida/src/view/view.ts:193](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L193)

___

### \_init

▸ **_init**(): `void`

#### Returns

`void`

#### Defined in

[rapida/src/view/view.ts:172](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L172)

___

### \_onResize

▸ **_onResize**(): `void`

#### Returns

`void`

#### Defined in

[rapida/src/view/view.ts:198](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L198)

___

### getBoundingRect

▸ `Private` **getBoundingRect**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `left` | `number` |
| `top` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/view/view.ts:210](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L210)

___

### setCamera

▸ **setCamera**(`camera`): `void`

Sets the camera for the view to use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](Camera.md) | the new camera for the view |

#### Returns

`void`

#### Defined in

[rapida/src/view/view.ts:168](https://gitlab.com/isaacmason/rapida/-/blob/dccb014/packages/rapida/src/view/view.ts#L168)
