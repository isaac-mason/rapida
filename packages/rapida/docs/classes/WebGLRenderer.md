# Class: WebGLRenderer

WebGLRenderer is a wrapper around the three js WebGLRenderer class that also supports view functionality

## Implements

- [`Renderer`](../interfaces/Renderer.md)

## Table of contents

### Constructors

- [constructor](WebGLRenderer.md#constructor)

### Properties

- [\_factories](WebGLRenderer.md#_factories)
- [domElement](WebGLRenderer.md#domelement)
- [id](WebGLRenderer.md#id)
- [initialised](WebGLRenderer.md#initialised)
- [orderedViews](WebGLRenderer.md#orderedviews)
- [resizeObserver](WebGLRenderer.md#resizeobserver)
- [three](WebGLRenderer.md#three)
- [views](WebGLRenderer.md#views)

### Accessors

- [create](WebGLRenderer.md#create)

### Methods

- [\_onResize](WebGLRenderer.md#_onresize)
- [addView](WebGLRenderer.md#addview)
- [destroy](WebGLRenderer.md#destroy)
- [init](WebGLRenderer.md#init)
- [removeView](WebGLRenderer.md#removeview)
- [render](WebGLRenderer.md#render)
- [sortViews](WebGLRenderer.md#sortviews)
- [update](WebGLRenderer.md#update)

## Constructors

### constructor

• **new WebGLRenderer**(`params`)

Constructor for a WebGLRenderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`WebGLRendererParams`](../modules.md#webglrendererparams) | the params for the new renderer |

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:64](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L64)

## Properties

### \_factories

• `Private` **\_factories**: `WebGLRendererFactories`

Factories for creating new objects within the renderer

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:209](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L209)

___

### domElement

• **domElement**: `HTMLElement`

The DOM element for the renderer

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L43)

___

### id

• **id**: `string`

The id for the renderer

#### Implementation of

[Renderer](../interfaces/Renderer.md).[id](../interfaces/Renderer.md#id)

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:28](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L28)

___

### initialised

• `Private` **initialised**: `boolean` = `false`

Whether the view manager is initialised

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:58](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L58)

___

### orderedViews

• `Private` **orderedViews**: [`WebGLView`](WebGLView.md)[] = `[]`

The ordered views according the views zIndex values

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:48](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L48)

___

### resizeObserver

• `Private` **resizeObserver**: `ResizeObserver`

The resize observer for the renderer dom element

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L53)

___

### three

• **three**: `WebGLRenderer`

The three js renderer

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:33](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L33)

___

### views

• **views**: `Map`<`string`, [`WebGLView`](WebGLView.md)\>

Views for the webgl renderer

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:38](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L38)

## Accessors

### create

• `get` **create**(): `WebGLRendererFactories`

Retrieves renderer factories

#### Returns

`WebGLRendererFactories`

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:221](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L221)

## Methods

### \_onResize

▸ **_onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[_onResize](../interfaces/Renderer.md#_onresize)

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:128](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L128)

___

### addView

▸ **addView**(`view`): `void`

Adds a view to the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`WebGLView`](WebGLView.md) | the view to add |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:141](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L141)

___

### destroy

▸ **destroy**(): `void`

Destroys the renderer and all views

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[destroy](../interfaces/Renderer.md#destroy)

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:116](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L116)

___

### init

▸ **init**(): `void`

Initialises views

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[init](../interfaces/Renderer.md#init)

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L98)

___

### removeView

▸ **removeView**(`view`): `void`

Removes a view from the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`WebGLView`](WebGLView.md) | the view to remove |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:159](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L159)

___

### render

▸ **render**(): `void`

Renders all views for the renderer

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[render](../interfaces/Renderer.md#render)

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:169](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L169)

___

### sortViews

▸ `Private` **sortViews**(): `void`

Sorts the views in the renderer by their z index

#### Returns

`void`

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:202](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L202)

___

### update

▸ **update**(): `void`

Updates views to process interaction events

#### Returns

`void`

#### Defined in

[rapida/src/renderer/webgl/webgl-renderer.ts:109](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L109)
