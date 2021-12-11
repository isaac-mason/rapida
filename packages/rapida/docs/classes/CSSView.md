# Class: CSSView

A CSSView within a CSSRenderer.

Each CSSView actually has its own three-stdlib CSS3DRenderer.

## Hierarchy

- [`View`](View.md)

  ↳ **`CSSView`**

## Table of contents

### Constructors

- [constructor](CSSView.md#constructor)

### Properties

- [\_scissor](CSSView.md#_scissor)
- [\_scissorParams](CSSView.md#_scissorparams)
- [\_viewport](CSSView.md#_viewport)
- [\_viewportParams](CSSView.md#_viewportparams)
- [camera](CSSView.md#camera)
- [css3DRenderer](CSSView.md#css3drenderer)
- [domElement](CSSView.md#domelement)
- [id](CSSView.md#id)
- [renderer](CSSView.md#renderer)
- [resizeObserver](CSSView.md#resizeobserver)
- [scene](CSSView.md#scene)
- [scissorElement](CSSView.md#scissorelement)
- [scissorSize](CSSView.md#scissorsize)
- [viewportElement](CSSView.md#viewportelement)
- [viewportSize](CSSView.md#viewportsize)
- [zIndex](CSSView.md#zindex)

### Accessors

- [rendererDomElement](CSSView.md#rendererdomelement)
- [scissor](CSSView.md#scissor)
- [viewport](CSSView.md#viewport)

### Methods

- [\_destroy](CSSView.md#_destroy)
- [\_init](CSSView.md#_init)
- [\_onResize](CSSView.md#_onresize)
- [calculateViewRectangle](CSSView.md#calculateviewrectangle)

## Constructors

### constructor

• **new CSSView**(`renderer`, `params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | [`CSSRenderer`](CSSRenderer.md) |
| `params` | [`CSSViewParams`](../modules.md#cssviewparams) |

#### Overrides

[View](View.md).[constructor](View.md#constructor)

#### Defined in

[rapida/src/renderer/css-view.ts:161](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L161)

## Properties

### \_scissor

• **\_scissor**: [`ViewRectangle`](../modules.md#viewrectangle)

The scissor for the css view rectangle

#### Defined in

[rapida/src/renderer/css-view.ts:122](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L122)

___

### \_scissorParams

• `Private` **\_scissorParams**: [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Parameters for the scissor that are used to recalculate the scissor on resize

#### Defined in

[rapida/src/renderer/css-view.ts:97](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L97)

___

### \_viewport

• **\_viewport**: [`ViewRectangle`](../modules.md#viewrectangle)

The viewport for the css view rectangle

#### Defined in

[rapida/src/renderer/css-view.ts:117](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L117)

___

### \_viewportParams

• `Private` **\_viewportParams**: [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Parameters for the viewport that are used to recalculate the viewport on resize

#### Defined in

[rapida/src/renderer/css-view.ts:77](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L77)

___

### camera

• **camera**: [`Camera`](Camera.md)

The camera for the view

#### Overrides

[View](View.md).[camera](View.md#camera)

#### Defined in

[rapida/src/renderer/css-view.ts:52](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L52)

___

### css3DRenderer

• **css3DRenderer**: `CSS3DRenderer`

The css renderer for the view

#### Defined in

[rapida/src/renderer/css-view.ts:149](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L149)

___

### domElement

• **domElement**: `HTMLElement`

The dom element for the view

#### Overrides

[View](View.md).[domElement](View.md#domelement)

#### Defined in

[rapida/src/renderer/css-view.ts:134](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L134)

___

### id

• **id**: `string`

The id for the view

#### Overrides

[View](View.md).[id](View.md#id)

#### Defined in

[rapida/src/renderer/css-view.ts:47](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L47)

___

### renderer

• `Private` **renderer**: [`CSSRenderer`](CSSRenderer.md)

The renderer the view is part of

#### Defined in

[rapida/src/renderer/css-view.ts:159](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L159)

___

### resizeObserver

• `Private` **resizeObserver**: `ResizeObserver`

The resize observer for the renderer dom element

#### Defined in

[rapida/src/renderer/css-view.ts:154](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L154)

___

### scene

• **scene**: [`Scene`](Scene.md)

The scene for the view

#### Overrides

[View](View.md).[scene](View.md#scene)

#### Defined in

[rapida/src/renderer/css-view.ts:57](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L57)

___

### scissorElement

• `Private` **scissorElement**: `HTMLElement`

The dom element for the css view scissor

#### Defined in

[rapida/src/renderer/css-view.ts:144](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L144)

___

### scissorSize

• **scissorSize**: [`ViewSize`](../modules.md#viewsize)

The current size of the scissor in pixels

#### Defined in

[rapida/src/renderer/css-view.ts:72](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L72)

___

### viewportElement

• `Private` **viewportElement**: `HTMLElement`

The dom element for the css view viewport

#### Defined in

[rapida/src/renderer/css-view.ts:139](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L139)

___

### viewportSize

• **viewportSize**: [`ViewSize`](../modules.md#viewsize)

The current size of the viewport in pixels

#### Overrides

[View](View.md).[viewportSize](View.md#viewportsize)

#### Defined in

[rapida/src/renderer/css-view.ts:67](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L67)

___

### zIndex

• **zIndex**: `number` = `0`

The zIndex for the view

#### Overrides

[View](View.md).[zIndex](View.md#zindex)

#### Defined in

[rapida/src/renderer/css-view.ts:62](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L62)

## Accessors

### rendererDomElement

• `get` **rendererDomElement**(): `HTMLElement`

Gets the dom element used by the renderer

#### Returns

`HTMLElement`

#### Overrides

View.rendererDomElement

#### Defined in

[rapida/src/renderer/css-view.ts:127](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L127)

___

### scissor

• `get` **scissor**(): [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Getter for the scissor params

#### Returns

[`ViewRectangleParams`](../modules.md#viewrectangleparams)

#### Defined in

[rapida/src/renderer/css-view.ts:102](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L102)

• `set` **scissor**(`v`): `void`

Setter for the scissor params. Resizes the view on setting.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ViewRectangleParams`](../modules.md#viewrectangleparams) |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-view.ts:109](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L109)

___

### viewport

• `get` **viewport**(): [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Getter for the viewport params

#### Returns

[`ViewRectangleParams`](../modules.md#viewrectangleparams)

#### Defined in

[rapida/src/renderer/css-view.ts:82](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L82)

• `set` **viewport**(`v`): `void`

Setter for the viewport params. Resizes the view on setting.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ViewRectangleParams`](../modules.md#viewrectangleparams) |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-view.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L89)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroys the view

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-view.ts:223](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L223)

___

### \_init

▸ **_init**(): `void`

Initialises the view

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-view.ts:215](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L215)

___

### \_onResize

▸ **_onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Defined in

[rapida/src/renderer/css-view.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/css-view.ts#L228)

___

### calculateViewRectangle

▸ `Protected` **calculateViewRectangle**(`params`): [`ViewRectangle`](../modules.md#viewrectangle)

Calculates a view rectangle from given view rectangle params

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`ViewRectangleParams`](../modules.md#viewrectangleparams) | the view rectangle params |

#### Returns

[`ViewRectangle`](../modules.md#viewrectangle)

a view rectangle of decimal percentages

#### Inherited from

[View](View.md).[calculateViewRectangle](View.md#calculateviewrectangle)

#### Defined in

[rapida/src/renderer/view.ts:279](https://gitlab.com/rapidajs/rapida/-/blob/67ba736/packages/rapida/src/renderer/view.ts#L279)
