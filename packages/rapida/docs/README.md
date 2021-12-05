# @rapidajs/rapida

## Table of contents

### Enumerations

- [QueryConditionType](enums/QueryConditionType.md)
- [ViewInteractionEvent](enums/ViewInteractionEvent.md)
- [ViewRectangleParamPlane](enums/ViewRectangleParamPlane.md)
- [ViewRectangleParamType](enums/ViewRectangleParamType.md)

### Classes

- [CSSRenderer](classes/CSSRenderer.md)
- [CSSView](classes/CSSView.md)
- [Camera](classes/Camera.md)
- [Component](classes/Component.md)
- [Entity](classes/Entity.md)
- [NetworkManager](classes/NetworkManager.md)
- [Query](classes/Query.md)
- [QueryManager](classes/QueryManager.md)
- [RendererManager](classes/RendererManager.md)
- [Runtime](classes/Runtime.md)
- [Scene](classes/Scene.md)
- [Space](classes/Space.md)
- [System](classes/System.md)
- [SystemManager](classes/SystemManager.md)
- [View](classes/View.md)
- [WebGLRenderer](classes/WebGLRenderer.md)
- [WebGLView](classes/WebGLView.md)
- [World](classes/World.md)

### Interfaces

- [Event](interfaces/Event.md)
- [Renderer](interfaces/Renderer.md)
- [ViewInteractionEventMap](interfaces/ViewInteractionEventMap.md)

### Type aliases

- [CSSRendererParams](modules.md#cssrendererparams)
- [CSSViewParams](modules.md#cssviewparams)
- [CameraParams](modules.md#cameraparams)
- [ComponentParams](modules.md#componentparams)
- [EntityParams](modules.md#entityparams)
- [EventHandler](modules.md#eventhandler)
- [QueryDescription](modules.md#querydescription)
- [RuntimeParams](modules.md#runtimeparams)
- [SceneParams](modules.md#sceneparams)
- [SpaceParams](modules.md#spaceparams)
- [SystemParams](modules.md#systemparams)
- [ViewEventName](modules.md#vieweventname)
- [ViewInteractionEventSubscription](modules.md#viewinteractioneventsubscription)
- [ViewMouseEvent](modules.md#viewmouseevent)
- [ViewRectangle](modules.md#viewrectangle)
- [ViewRectangleParam](modules.md#viewrectangleparam)
- [ViewRectangleParamInput](modules.md#viewrectangleparaminput)
- [ViewRectangleParams](modules.md#viewrectangleparams)
- [ViewSize](modules.md#viewsize)
- [ViewTouch](modules.md#viewtouch)
- [ViewTouchEvent](modules.md#viewtouchevent)
- [WebGLRendererParams](modules.md#webglrendererparams)
- [WebGLViewParams](modules.md#webglviewparams)
- [WorldContext](modules.md#worldcontext)
- [WorldParams](modules.md#worldparams)
- [WorldProvider](modules.md#worldprovider)

### Variables

- [VIEW\_ALL\_EVENT\_NAMES](modules.md#view_all_event_names)
- [VIEW\_MOUSE\_EVENTS](modules.md#view_mouse_events)
- [VIEW\_TOUCH\_EVENTS](modules.md#view_touch_events)

### Functions

- [uuid](modules.md#uuid)

## Type aliases

### CSSRendererParams

Ƭ **CSSRendererParams**: `Object`

Parameters for creating a CSSRenderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domElementId` | `string` |

#### Defined in

[rapida/src/renderer/css-renderer.ts:15](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-renderer.ts#L15)

___

### CSSViewParams

Ƭ **CSSViewParams**: `Object`

Params for creating a css view

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](classes/Camera.md) | The camera for the view |
| `scene` | [`Scene`](classes/Scene.md) | The scene for the view |
| `scissor?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The scissor for the view. Defaults to the full screen. |
| `viewport?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The viewport for the view. Defaults to the full screen. |
| `zIndex?` | `number` | The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on. Defaults to zero. |

#### Defined in

[rapida/src/renderer/css-view.ts:11](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/css-view.ts#L11)

___

### CameraParams

Ƭ **CameraParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `camera?` | `three.PerspectiveCamera` \| `three.OrthographicCamera` |
| `id?` | `string` |

#### Defined in

[rapida/src/camera/camera.ts:5](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/camera/camera.ts#L5)

___

### ComponentParams

Ƭ **ComponentParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/component.ts:6](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/ecs/component.ts#L6)

___

### EntityParams

Ƭ **EntityParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components?` | [`Component`](classes/Component.md)[] |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/entity.ts:10](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/ecs/entity.ts#L10)

___

### EventHandler

Ƭ **EventHandler**<`E`\>: (`event`: `E`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](interfaces/Event.md) \| [`Event`](interfaces/Event.md) |

#### Type declaration

▸ (`event`): `void`

An event handler that takes an event or a type that extends the event type

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

##### Returns

`void`

#### Defined in

rapida-common/lib/events/event-handler.d.ts:5

___

### QueryDescription

Ƭ **QueryDescription**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `all?` | `ComponentConstructor`[] |
| `not?` | `ComponentConstructor`[] |
| `one?` | `ComponentConstructor`[] |

#### Defined in

[rapida/src/ecs/query.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/ecs/query.ts#L12)

___

### RuntimeParams

Ƭ **RuntimeParams**: `Object`

Parameters for creating a new rapida runtime

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |
| `maxUpdatesPerSecond?` | `number` |

#### Defined in

[rapida/src/runtime/index.ts:9](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/runtime/index.ts#L9)

___

### SceneParams

Ƭ **SceneParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/scene/scene.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/scene/scene.ts#L4)

___

### SpaceParams

Ƭ **SpaceParams**: `Object`

Params for creating a new Space

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | An id for the space, must be unique |

#### Defined in

[rapida/src/ecs/space.ts:17](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/ecs/space.ts#L17)

___

### SystemParams

Ƭ **SystemParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `queries?` | `SystemQueries` |

#### Defined in

[rapida/src/ecs/system.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/ecs/system.ts#L12)

___

### ViewEventName

Ƭ **ViewEventName**<`T`\>: `T` extends keyof [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md) ? [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md)[`T`] : [`Event`](interfaces/Event.md)

Type for a view event name

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[rapida/src/renderer/view.ts:163](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L163)

___

### ViewInteractionEventSubscription

Ƭ **ViewInteractionEventSubscription**: `Object`

A view interaction event subscription that contains a method for unsubscribing

#### Type declaration

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[rapida/src/renderer/view.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L63)

___

### ViewMouseEvent

Ƭ **ViewMouseEvent**: `Object`

A mouse event for a webgl view

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `ExtendedMouseEvent` |
| `topic` | typeof [`VIEW_MOUSE_EVENTS`](modules.md#view_mouse_events)[`number`] |

#### Defined in

[rapida/src/renderer/view.ts:85](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L85)

___

### ViewRectangle

Ƭ **ViewRectangle**: `Object`

A view rectangle given by decimal percentage values

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L228)

___

### ViewRectangleParam

Ƭ **ViewRectangleParam**: `Object`

A view rectangle parameter with a type and value

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`ViewRectangleParamType`](enums/ViewRectangleParamType.md) |
| `value` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L181)

___

### ViewRectangleParamInput

Ƭ **ViewRectangleParamInput**: `string` \| `number` \| [`ViewRectangleParam`](modules.md#viewrectangleparam)

A ViewParam, which can either be a:
- decimal percentage (passthrough)
- number of pixels given by a string '<n>px'
- percentage of the dom container given by a string '<n>%'
- percentage of the screen size given by '<n>vw' or '<n>vh'

#### Defined in

[rapida/src/renderer/view.ts:193](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L193)

___

### ViewRectangleParams

Ƭ **ViewRectangleParams**: `Object`

ViewRectangleParams provides parameters for a view rectangle

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `height?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `left?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `right?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `top?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `width?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |

#### Defined in

[rapida/src/renderer/view.ts:206](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L206)

___

### ViewSize

Ƭ **ViewSize**: `Object`

The size of a view in pixels

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:218](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L218)

___

### ViewTouch

Ƭ **ViewTouch**: `Touch` & { `relativeX`: `number` ; `relativeY`: `number`  }

#### Defined in

[rapida/src/renderer/view.ts:90](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L90)

___

### ViewTouchEvent

Ƭ **ViewTouchEvent**: `Object`

A touch event for a webgl view

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.altKey` | `boolean` |
| `data.changedTouches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `data.ctrlKey` | `boolean` |
| `data.metaKey` | `boolean` |
| `data.shiftKey` | `boolean` |
| `data.targetTouches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `data.touches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `topic` | typeof [`VIEW_MOUSE_EVENTS`](modules.md#view_mouse_events)[`number`] |

#### Defined in

[rapida/src/renderer/view.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L105)

___

### WebGLRendererParams

Ƭ **WebGLRendererParams**: `Object`

Params for creating a WebGLRenderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domElementId` | `string` |
| `renderer?` | `ThreeWebGLRenderer` |

#### Defined in

[rapida/src/renderer/webgl-renderer.ts:16](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/webgl-renderer.ts#L16)

___

### WebGLViewParams

Ƭ **WebGLViewParams**: `Object`

Params for creating a webgl view

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](classes/Camera.md) | The camera for the view |
| `clearColor?` | `Color` \| `string` | The clear color for the view |
| `clearDepth?` | `boolean` | Whether depth should be cleared after rendering this view |
| `id?` | `string` | A unique identifier for the view. Defaults to a uuid if unspecified |
| `scene` | [`Scene`](classes/Scene.md) | The scene for the view |
| `scissor?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The scissor for the view. Defaults to the full screen. |
| `viewport?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The viewport for the view. Defaults to the full screen. |
| `zIndex?` | `number` | The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on. Defaults to zero. |

#### Defined in

[rapida/src/renderer/webgl-view.ts:25](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/webgl-view.ts#L25)

___

### WorldContext

Ƭ **WorldContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `runtime` | [`Runtime`](classes/Runtime.md) |

#### Defined in

[rapida/src/world/world-provider.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/world/world-provider.ts#L4)

___

### WorldParams

Ƭ **WorldParams**: `Object`

Params for creating a world

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | The unique id for the world |
| `runtime` | [`Runtime`](classes/Runtime.md) | The runtime the world is in |

#### Defined in

[rapida/src/world/world.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/world/world.ts#L42)

___

### WorldProvider

Ƭ **WorldProvider**: (`worldContext`: [`WorldContext`](modules.md#worldcontext)) => [`World`](classes/World.md)

#### Type declaration

▸ (`worldContext`): [`World`](classes/World.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `worldContext` | [`WorldContext`](modules.md#worldcontext) |

##### Returns

[`World`](classes/World.md)

#### Defined in

[rapida/src/world/world-provider.ts:8](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/world/world-provider.ts#L8)

## Variables

### VIEW\_ALL\_EVENT\_NAMES

• **VIEW\_ALL\_EVENT\_NAMES**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L27)

___

### VIEW\_MOUSE\_EVENTS

• **VIEW\_MOUSE\_EVENTS**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L42)

___

### VIEW\_TOUCH\_EVENTS

• **VIEW\_TOUCH\_EVENTS**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/6cbf5c3/packages/rapida/src/renderer/view.ts#L53)

## Functions

### uuid

▸ `Const` **uuid**(): `string`

#### Returns

`string`

#### Defined in

rapida-common/lib/util/uuid.d.ts:1
