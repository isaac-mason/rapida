# @isaacmason/rapida

## Table of contents

### Enumerations

- [QueryConditionType](enums/QueryConditionType.md)

### Classes

- [Camera](classes/Camera.md)
- [CameraControls](classes/CameraControls.md)
- [Component](classes/Component.md)
- [Entity](classes/Entity.md)
- [NetworkManager](classes/NetworkManager.md)
- [OrbitControls](classes/OrbitControls.md)
- [PointerLockControls](classes/PointerLockControls.md)
- [Query](classes/Query.md)
- [Runtime](classes/Runtime.md)
- [Scene](classes/Scene.md)
- [Space](classes/Space.md)
- [System](classes/System.md)
- [View](classes/View.md)
- [World](classes/World.md)

### Interfaces

- [Event](interfaces/Event.md)

### Type aliases

- [CameraParams](modules.md#cameraparams)
- [ComponentParams](modules.md#componentparams)
- [EntityParams](modules.md#entityparams)
- [EventHandler](modules.md#eventhandler)
- [QueryDescription](modules.md#querydescription)
- [RuntimeParams](modules.md#runtimeparams)
- [SceneParams](modules.md#sceneparams)
- [SpaceParams](modules.md#spaceparams)
- [SystemParams](modules.md#systemparams)
- [ViewParams](modules.md#viewparams)
- [WorldContext](modules.md#worldcontext)
- [WorldParams](modules.md#worldparams)
- [WorldProvider](modules.md#worldprovider)

### Functions

- [uuid](modules.md#uuid)

## Type aliases

### CameraParams

Ƭ **CameraParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `camera?` | `three.PerspectiveCamera` \| `three.OrthographicCamera` |
| `id?` | `string` |

#### Defined in

[rapida/src/camera/camera.ts:6](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/camera/camera.ts#L6)

___

### ComponentParams

Ƭ **ComponentParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/component.ts:6](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/component.ts#L6)

___

### EntityParams

Ƭ **EntityParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components?` | [`Component`](classes/Component.md)[] |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/entity.ts:10](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/entity.ts#L10)

___

### EventHandler

Ƭ **EventHandler**: <E\>(`event`: `E`) => `void`

#### Type declaration

▸ <`E`\>(`event`): `void`

An event handler that takes an event or a type that extends the event type

##### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](interfaces/Event.md) \| [`Event`](interfaces/Event.md) |

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

[rapida/src/ecs/query.ts:12](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/query.ts#L12)

___

### RuntimeParams

Ƭ **RuntimeParams**: `Object`

Parameters for creating a new rapida runtime

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |
| `domId` | `string` |
| `maxUpdatesPerSecond?` | `number` |
| `renderer?` | `three.WebGLRenderer` |

#### Defined in

[rapida/src/runtime/index.ts:11](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/runtime/index.ts#L11)

___

### SceneParams

Ƭ **SceneParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/scene/scene.ts:4](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/scene/scene.ts#L4)

___

### SpaceParams

Ƭ **SpaceParams**: `Object`

Params for creating a new Space

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/space.ts:17](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/space.ts#L17)

___

### SystemParams

Ƭ **SystemParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `queries?` | `SystemQueries` |

#### Defined in

[rapida/src/ecs/system.ts:12](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/ecs/system.ts#L12)

___

### ViewParams

Ƭ **ViewParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](classes/Camera.md) | The camera for the view |
| `clearColor?` | `Color` \| `string` | The clear color for the view |
| `clearDepth?` | `boolean` | Whether depth should be cleared after rendering this view |
| `id?` | `string` | A unique identifier for the view. Defaults to a uuid if unspecified |
| `scene` | [`Scene`](classes/Scene.md) | The scene for the view |
| `scissor?` | `Scissor` | The scissor for the view. Defaults to the full screen. |
| `viewport?` | `Viewport` | The viewport for the view. Defaults to the full screen. |

#### Defined in

[rapida/src/view/view.ts:28](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/view/view.ts#L28)

___

### WorldContext

Ƭ **WorldContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `runtime` | [`Runtime`](classes/Runtime.md) |

#### Defined in

[rapida/src/world/world-provider.ts:4](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world-provider.ts#L4)

___

### WorldParams

Ƭ **WorldParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `runtime` | [`Runtime`](classes/Runtime.md) |

#### Defined in

[rapida/src/world/world.ts:31](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world.ts#L31)

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

[rapida/src/world/world-provider.ts:8](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/world/world-provider.ts#L8)

## Functions

### uuid

▸ `Const` **uuid**(): `string`

#### Returns

`string`

#### Defined in

rapida-common/lib/util/uuid.d.ts:1
