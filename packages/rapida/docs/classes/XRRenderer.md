# Class: XRRenderer

Renderer for VR and AR content

## Implements

- [`Renderer`](../interfaces/Renderer.md)

## Table of contents

### Constructors

- [constructor](XRRenderer.md#constructor)

### Properties

- [buttonDomElement](XRRenderer.md#buttondomelement)
- [camera](XRRenderer.md#camera)
- [domElement](XRRenderer.md#domelement)
- [events](XRRenderer.md#events)
- [frame](XRRenderer.md#frame)
- [id](XRRenderer.md#id)
- [mode](XRRenderer.md#mode)
- [resizeObserver](XRRenderer.md#resizeobserver)
- [scene](XRRenderer.md#scene)
- [three](XRRenderer.md#three)

### Methods

- [\_onResize](XRRenderer.md#_onresize)
- [destroy](XRRenderer.md#destroy)
- [onFrame](XRRenderer.md#onframe)

## Constructors

### constructor

• **new XRRenderer**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`XRRendererParams`](../modules.md#xrrendererparams) |

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:117](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L117)

## Properties

### buttonDomElement

• `Private` `Optional` **buttonDomElement**: `HTMLElement`

The HTML element for the XR interaction button

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L105)

___

### camera

• **camera**: [`Camera`](Camera.md)

The camera to render with

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:90](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L90)

___

### domElement

• **domElement**: `HTMLElement`

The DOM element for the renderer

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:80](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L80)

___

### events

• `Private` **events**: `EventSystem`

Events system for frame events

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:115](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L115)

___

### frame

• `Optional` **frame**: `XRFrame`

The latest xr frame

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:95](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L95)

___

### id

• **id**: `string`

Unique id for the vr renderer

#### Implementation of

[Renderer](../interfaces/Renderer.md).[id](../interfaces/Renderer.md#id)

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:70](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L70)

___

### mode

• `Private` **mode**: [`XRRendererMode`](../enums/XRRendererMode.md)

The mode the renderer is in

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:100](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L100)

___

### resizeObserver

• `Private` **resizeObserver**: `ResizeObserver`

The resize observer for the renderer dom element

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:110](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L110)

___

### scene

• **scene**: [`Scene`](Scene.md)

The scene that should be rendered

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:85](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L85)

___

### three

• **three**: `WebGLRenderer`

The renderer for the vr renderer

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:75](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L75)

## Methods

### \_onResize

▸ **_onResize**(): `void`

Handles resizing of the XR renderer

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[_onResize](../interfaces/Renderer.md#_onresize)

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:195](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L195)

___

### destroy

▸ **destroy**(): `void`

Destroys the XR renderer

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[destroy](../interfaces/Renderer.md#destroy)

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:185](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L185)

___

### onFrame

▸ **onFrame**(`handler`): `Object`

Registers an event handler for new XRFrame frames

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`e`: `FrameEvent`) => `void` | the handler for a new frame |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:212](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L212)
