# Class: View

Common interface for a rapida view

## Hierarchy

- **`View`**

  ↳ [`WebGLView`](WebGLView.md)

  ↳ [`CSSView`](CSSView.md)

## Table of contents

### Constructors

- [constructor](View.md#constructor)

### Properties

- [camera](View.md#camera)
- [domElement](View.md#domelement)
- [id](View.md#id)
- [scene](View.md#scene)
- [viewportSize](View.md#viewportsize)
- [zIndex](View.md#zindex)

### Accessors

- [rendererDomElement](View.md#rendererdomelement)

### Methods

- [calculateViewRectangle](View.md#calculateviewrectangle)

## Constructors

### constructor

• **new View**()

## Properties

### camera

• `Abstract` **camera**: [`Camera`](Camera.md)

The views camera

#### Defined in

[packages/rapida/src/renderer/view.ts:247](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L247)

___

### domElement

• `Abstract` **domElement**: `HTMLElement`

The dom element used by the views renderer

#### Defined in

[packages/rapida/src/renderer/view.ts:267](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L267)

___

### id

• `Abstract` **id**: `string`

A unique identifier for the view

#### Defined in

[packages/rapida/src/renderer/view.ts:242](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L242)

___

### scene

• `Abstract` **scene**: [`Scene`](Scene.md)

The views scene

#### Defined in

[packages/rapida/src/renderer/view.ts:252](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L252)

___

### viewportSize

• `Abstract` **viewportSize**: [`ViewSize`](../modules.md#viewsize)

The size of the view in pixels

#### Defined in

[packages/rapida/src/renderer/view.ts:272](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L272)

___

### zIndex

• `Abstract` **zIndex**: `number`

The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on.

#### Defined in

[packages/rapida/src/renderer/view.ts:257](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L257)

## Accessors

### rendererDomElement

• `Abstract` `get` **rendererDomElement**(): `HTMLElement`

The renderers dom element

#### Returns

`HTMLElement`

#### Defined in

[packages/rapida/src/renderer/view.ts:262](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L262)

## Methods

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

#### Defined in

[packages/rapida/src/renderer/view.ts:279](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L279)
