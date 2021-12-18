# Class: WebGLView

A WebGLView that a WebGLRenderer should render

## Hierarchy

- [`View`](View.md)

  ↳ **`WebGLView`**

## Table of contents

### Constructors

- [constructor](WebGLView.md#constructor)

### Properties

- [\_scissor](WebGLView.md#_scissor)
- [\_scissorParams](WebGLView.md#_scissorparams)
- [\_viewport](WebGLView.md#_viewport)
- [\_viewportParams](WebGLView.md#_viewportparams)
- [camera](WebGLView.md#camera)
- [clearColor](WebGLView.md#clearcolor)
- [clearDepth](WebGLView.md#cleardepth)
- [domElement](WebGLView.md#domelement)
- [domElementListeners](WebGLView.md#domelementlisteners)
- [effectComposer](WebGLView.md#effectcomposer)
- [events](WebGLView.md#events)
- [id](WebGLView.md#id)
- [mouse](WebGLView.md#mouse)
- [renderPass](WebGLView.md#renderpass)
- [renderer](WebGLView.md#renderer)
- [scene](WebGLView.md#scene)
- [scissorSize](WebGLView.md#scissorsize)
- [viewportSize](WebGLView.md#viewportsize)
- [zIndex](WebGLView.md#zindex)

### Accessors

- [rendererDomElement](WebGLView.md#rendererdomelement)
- [scissor](WebGLView.md#scissor)
- [viewport](WebGLView.md#viewport)

### Methods

- [\_addHandler](WebGLView.md#_addhandler)
- [\_destroy](WebGLView.md#_destroy)
- [\_getRelativeMouse](WebGLView.md#_getrelativemouse)
- [\_init](WebGLView.md#_init)
- [\_onResize](WebGLView.md#_onresize)
- [\_removeHandler](WebGLView.md#_removehandler)
- [\_update](WebGLView.md#_update)
- [calculateViewRectangle](WebGLView.md#calculateviewrectangle)
- [on](WebGLView.md#on)

## Constructors

### constructor

• **new WebGLView**(`renderer`, `param1`)

Constructor for a WebGLView

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`WebGLRenderer`](WebGLRenderer.md) | the renderer for the view |
| `param1` | [`WebGLViewParams`](../modules.md#webglviewparams) | parameters for creating the view |

#### Overrides

[View](View.md).[constructor](View.md#constructor)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:211](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L211)

## Properties

### \_scissor

• **\_scissor**: [`ViewRectangle`](../modules.md#viewrectangle)

The current size of the scissor for the view. The shape outside of which nothing can be rendered

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:174](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L174)

___

### \_scissorParams

• `Private` **\_scissorParams**: [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Parameters for the scissor that are used to recalculate the scissor on resize

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:114](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L114)

___

### \_viewport

• **\_viewport**: [`ViewRectangle`](../modules.md#viewrectangle)

The current size of the viewport for the view. Sets how to convert from a shader's clip space to some portion of the canvas's pixel space

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:169](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L169)

___

### \_viewportParams

• `Private` **\_viewportParams**: [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Parameters for the viewport that are used to recalculate the viewport on resize

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:94](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L94)

___

### camera

• **camera**: [`Camera`](Camera.md)

The views camera

#### Overrides

[View](View.md).[camera](View.md#camera)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:79](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L79)

___

### clearColor

• `Optional` **clearColor**: `Color`

The clear color the renderer should use for this view. Defaults to black - 0x000000

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:139](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L139)

___

### clearDepth

• **clearDepth**: `boolean`

Whether clearDepth should be called after rendering this view

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:134](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L134)

___

### domElement

• **domElement**: `HTMLElement`

The dom element for the view

#### Overrides

[View](View.md).[domElement](View.md#domelement)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:154](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L154)

___

### domElementListeners

• `Private` **domElementListeners**: `Map`<`string`, { `handlerIds`: `Set`<`string`\> ; `unsubscribe`: () => `void`  }\>

A map of dom event listener names to data about listeners

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:194](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L194)

___

### effectComposer

• **effectComposer**: `EffectComposer`<`WebGLRenderTarget`\>

The effect composer for the view

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:149](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L149)

___

### events

• `Private` **events**: `EventSystem`

The events system for the view which is used for mouse and touch events

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:189](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L189)

___

### id

• **id**: `string`

A unique identifier for the view

#### Overrides

[View](View.md).[id](View.md#id)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:74](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L74)

___

### mouse

• **mouse**: `Vector2`

The relative mouse position on the view.

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:144](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L144)

___

### renderPass

• `Private` **renderPass**: `RenderPass`

The render pass for the view

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:184](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L184)

___

### renderer

• `Private` **renderer**: [`WebGLRenderer`](WebGLRenderer.md)

The renderer the view belongs to

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:179](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L179)

___

### scene

• **scene**: [`Scene`](Scene.md)

The views scene

#### Overrides

[View](View.md).[scene](View.md#scene)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:84](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L84)

___

### scissorSize

• **scissorSize**: [`ViewRectangle`](../modules.md#viewrectangle)

The size of the scissor in pixels

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:164](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L164)

___

### viewportSize

• **viewportSize**: [`ViewRectangle`](../modules.md#viewrectangle)

The size of the view in pixels

#### Overrides

[View](View.md).[viewportSize](View.md#viewportsize)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:159](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L159)

___

### zIndex

• **zIndex**: `number` = `0`

The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on.

#### Overrides

[View](View.md).[zIndex](View.md#zindex)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L89)

## Accessors

### rendererDomElement

• `get` **rendererDomElement**(): `HTMLElement`

Gets the dom element used by the renderer

#### Returns

`HTMLElement`

#### Overrides

View.rendererDomElement

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:202](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L202)

___

### scissor

• `get` **scissor**(): [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Getter for the scissor params

#### Returns

[`ViewRectangleParams`](../modules.md#viewrectangleparams)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:119](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L119)

• `set` **scissor**(`v`): `void`

Setter for the scissor params. Resizes the view on setting.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ViewRectangleParams`](../modules.md#viewrectangleparams) |

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:126](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L126)

___

### viewport

• `get` **viewport**(): [`ViewRectangleParams`](../modules.md#viewrectangleparams)

Getter for the viewport params

#### Returns

[`ViewRectangleParams`](../modules.md#viewrectangleparams)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:99](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L99)

• `set` **viewport**(`v`): `void`

Setter for the viewport params. Resizes the view on setting.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`ViewRectangleParams`](../modules.md#viewrectangleparams) |

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:106](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L106)

## Methods

### \_addHandler

▸ `Private` **_addHandler**<`T`\>(`eventName`, `handlerId`): `void`

Adds a view event handler and sets up the dom event listener if it does not exist

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `T` | the name of the view event |
| `handlerId` | `string` | the id of the handler |

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:418](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L418)

___

### \_destroy

▸ **_destroy**(): `void`

Destroys the view

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:294](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L294)

___

### \_getRelativeMouse

▸ `Private` **_getRelativeMouse**(`clientX`, `clientY`): `Object`

Returns the relative mouse position for a view given the client x and y

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientX` | `number` | the client x |
| `clientY` | `number` | the client y |

#### Returns

`Object`

the relative mouse position for the view

| Name | Type |
| :------ | :------ |
| `relativeX` | `number` |
| `relativeY` | `number` |

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:376](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L376)

___

### \_init

▸ **_init**(): `void`

Initialises the view

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:280](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L280)

___

### \_onResize

▸ **_onResize**(): `void`

Handles resizing

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:305](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L305)

___

### \_removeHandler

▸ `Private` **_removeHandler**<`T`\>(`eventName`, `handlerId`): `void`

Removes a handler for a view event and removes the dom event listener if there are no handlers

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `T` | the name of the view event |
| `handlerId` | `string` | the id of the handlers |

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:395](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L395)

___

### \_update

▸ **_update**(): `void`

Updates the view

#### Returns

`void`

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:287](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L287)

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

[packages/rapida/src/renderer/view.ts:279](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L279)

___

### on

▸ **on**<`T`\>(`eventName`, `eventHandler`): [`ViewInteractionEventSubscription`](../modules.md#viewinteractioneventsubscription)

Adds an event handler for a view mouse or touch event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `T` | - |
| `eventHandler` | [`EventHandler`](../modules.md#eventhandler)<[`ViewEventName`](../modules.md#vieweventname)<`T`\>\> | the event handler |

#### Returns

[`ViewInteractionEventSubscription`](../modules.md#viewinteractioneventsubscription)

#### Defined in

[packages/rapida/src/renderer/webgl/webgl-view.ts:351](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L351)
