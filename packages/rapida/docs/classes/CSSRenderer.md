# Class: CSSRenderer

CSSRenderer is a thin wrapper around the CSS3DRenderer three js class with support for multiple views

## Implements

- [`Renderer`](../interfaces/Renderer.md)

## Table of contents

### Constructors

- [constructor](CSSRenderer.md#constructor)

### Properties

- [\_factories](CSSRenderer.md#_factories)
- [domElement](CSSRenderer.md#domelement)
- [id](CSSRenderer.md#id)
- [initialised](CSSRenderer.md#initialised)
- [rendererRootDomElement](CSSRenderer.md#rendererrootdomelement)
- [views](CSSRenderer.md#views)

### Accessors

- [create](CSSRenderer.md#create)

### Methods

- [addView](CSSRenderer.md#addview)
- [destroy](CSSRenderer.md#destroy)
- [init](CSSRenderer.md#init)
- [onResize](CSSRenderer.md#onresize)
- [removeView](CSSRenderer.md#removeview)
- [render](CSSRenderer.md#render)

## Constructors

### constructor

• **new CSSRenderer**(`params`)

Constructor for a CSSRenderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CSSRendererParams`](../modules.md#cssrendererparams) | the params for the css renderer |

#### Defined in

[rapida/src/renderer/css-renderer.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L52)

## Properties

### \_factories

• `Private` **\_factories**: `CSSRendererFactories`

Factories for creating objects within the renderer

#### Defined in

[rapida/src/renderer/css-renderer.ts:124](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L124)

___

### domElement

• **domElement**: `HTMLElement`

The DOM element for the renderer

#### Defined in

[rapida/src/renderer/css-renderer.ts:36](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L36)

___

### id

• **id**: `string`

A unique id for the css renderer

#### Implementation of

[Renderer](../interfaces/Renderer.md).[id](../interfaces/Renderer.md#id)

#### Defined in

[rapida/src/renderer/css-renderer.ts:26](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L26)

___

### initialised

• `Private` **initialised**: `boolean` = `false`

Whether the view manager is initialised

#### Defined in

[rapida/src/renderer/css-renderer.ts:46](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L46)

___

### rendererRootDomElement

• `Private` **rendererRootDomElement**: `HTMLElement`

The renderer root dom element

#### Defined in

[rapida/src/renderer/css-renderer.ts:41](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L41)

___

### views

• **views**: `Map`<`string`, [`CSSView`](CSSView.md)\>

Views for the webgl renderer

#### Defined in

[rapida/src/renderer/css-renderer.ts:31](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L31)

## Accessors

### create

• `get` **create**(): `CSSRendererFactories`

Retrieves renderer factories

#### Returns

`CSSRendererFactories`

#### Defined in

[rapida/src/renderer/css-renderer.ts:136](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L136)

## Methods

### addView

▸ **addView**(`view`): `void`

Adds a view to the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`CSSView`](CSSView.md) | the view to add |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-renderer.ts:86](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L86)

___

### destroy

▸ **destroy**(): `void`

Destroys all css views

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[destroy](../interfaces/Renderer.md#destroy)

#### Defined in

[rapida/src/renderer/css-renderer.ts:76](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L76)

___

### init

▸ **init**(): `void`

Initialises all css views

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[init](../interfaces/Renderer.md#init)

#### Defined in

[rapida/src/renderer/css-renderer.ts:65](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L65)

___

### onResize

▸ **onResize**(): `void`

Resizes all css views

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[onResize](../interfaces/Renderer.md#onresize)

#### Defined in

[rapida/src/renderer/css-renderer.ts:106](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L106)

___

### removeView

▸ **removeView**(`view`): `void`

Removes a view from the renderer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`CSSView`](CSSView.md) | the view to remove |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-renderer.ts:98](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L98)

___

### render

▸ **render**(): `void`

Renders all of the views in the renderer

#### Returns

`void`

#### Implementation of

[Renderer](../interfaces/Renderer.md).[render](../interfaces/Renderer.md#render)

#### Defined in

[rapida/src/renderer/css-renderer.ts:115](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L115)
