# Class: World

A World that can contain systems, spaces containing entities, scenes, physics worlds, and renderers

## Table of contents

### Constructors

- [constructor](World.md#constructor)

### Properties

- [\_add](World.md#_add)
- [\_factories](World.md#_factories)
- [\_gameLoopUpdateDelayMs](World.md#_gameloopupdatedelayms)
- [\_maxGameLoopUpdatesPerSecond](World.md#_maxgameloopupdatespersecond)
- [\_maxPhysicsUpdatesPerSecond](World.md#_maxphysicsupdatespersecond)
- [\_physicsDelta](World.md#_physicsdelta)
- [\_physicsUpdateDelayMs](World.md#_physicsupdatedelayms)
- [\_rendererFactories](World.md#_rendererfactories)
- [cameras](World.md#cameras)
- [engine](World.md#engine)
- [events](World.md#events)
- [id](World.md#id)
- [initialised](World.md#initialised)
- [physics](World.md#physics)
- [queryManager](World.md#querymanager)
- [rendererManager](World.md#renderermanager)
- [scenes](World.md#scenes)
- [spaces](World.md#spaces)
- [systemManager](World.md#systemmanager)

### Accessors

- [add](World.md#add)
- [create](World.md#create)

### Methods

- [destroy](World.md#destroy)
- [emit](World.md#emit)
- [init](World.md#init)
- [on](World.md#on)
- [remove](World.md#remove)
- [removeHandler](World.md#removehandler)
- [render](World.md#render)
- [update](World.md#update)
- [updatePhysics](World.md#updatephysics)

## Constructors

### constructor

• **new World**(`id`)

Constructor for a World

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`WorldParams`](../modules.md#worldparams) | a unique id for the world |

#### Defined in

[rapida/src/world/world.ts:140](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L140)

## Properties

### \_add

• `Private` **\_add**: `Object`

Methods for adding something to the world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `system` | (`system`: [`System`](System.md)) => [`World`](World.md) |

#### Defined in

[rapida/src/world/world.ts:313](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L313)

___

### \_factories

• `Private` **\_factories**: `Object`

Factories for creating something new in a world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `renderer` | `Object` |
| `renderer.css` | [object Object] |
| `renderer.webgl` | [object Object] |
| `renderer.xr` | [object Object] |
| `camera` | (`params?`: [`CameraParams`](../modules.md#cameraparams)) => [`Camera`](Camera.md) |
| `physics` | (`params`: [`PhysicsParams`](../modules.md#physicsparams)) => [`Physics`](Physics.md) |
| `scene` | (`params?`: [`SceneParams`](../modules.md#sceneparams)) => [`Scene`](Scene.md) |
| `space` | (`params?`: [`SpaceParams`](../modules.md#spaceparams)) => [`Space`](Space.md) |

#### Defined in

[rapida/src/world/world.ts:329](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L329)

___

### \_gameLoopUpdateDelayMs

• **\_gameLoopUpdateDelayMs**: `number`

The delay between game loop updates, based on _maxGameLoopUpdatesPerSecond

#### Defined in

[rapida/src/world/world.ts:114](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L114)

___

### \_maxGameLoopUpdatesPerSecond

• **\_maxGameLoopUpdatesPerSecond**: `number`

The maximum game loop updates to run per second

#### Defined in

[rapida/src/world/world.ts:109](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L109)

___

### \_maxPhysicsUpdatesPerSecond

• **\_maxPhysicsUpdatesPerSecond**: `number`

The maximum physics loop updates to run per second

#### Defined in

[rapida/src/world/world.ts:119](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L119)

___

### \_physicsDelta

• `Optional` **\_physicsDelta**: `number`

The delta value for the physics worlds, based on _maxPhysicsUpdatesPerSecond

#### Defined in

[rapida/src/world/world.ts:129](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L129)

___

### \_physicsUpdateDelayMs

• **\_physicsUpdateDelayMs**: `number`

The delay between physics updates, based on _maxPhysicsUpdatesPerSecond

#### Defined in

[rapida/src/world/world.ts:124](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L124)

___

### \_rendererFactories

• `Private` **\_rendererFactories**: `Object`

Factories for creating renderers in the world

#### Type declaration

| Name | Type |
| :------ | :------ |
| `css` | (`params`: [`CSSRendererParams`](../modules.md#cssrendererparams)) => [`CSSRenderer`](CSSRenderer.md) |
| `webgl` | (`params`: [`WebGLRendererParams`](../modules.md#webglrendererparams)) => [`WebGLRenderer`](WebGLRenderer.md) |
| `xr` | (`params`: [`XRRendererParams`](../modules.md#xrrendererparams)) => [`XRRenderer`](XRRenderer.md) |

#### Defined in

[rapida/src/world/world.ts:274](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L274)

___

### cameras

• **cameras**: `Map`<`string`, [`Camera`](Camera.md)\>

Cameras for the world

#### Defined in

[rapida/src/world/world.ts:79](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L79)

___

### engine

• **engine**: [`Engine`](Engine.md)

The engine instance the world is in

#### Defined in

[rapida/src/world/world.ts:104](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L104)

___

### events

• `Private` **events**: `EventSystem`

The event system for the world

#### Defined in

[rapida/src/world/world.ts:134](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L134)

___

### id

• **id**: `string`

A unique id for the world

#### Defined in

[rapida/src/world/world.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L59)

___

### initialised

• **initialised**: `boolean` = `false`

Whether the world has been initialised

#### Defined in

[rapida/src/world/world.ts:99](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L99)

___

### physics

• **physics**: `Map`<`string`, [`Physics`](Physics.md)\>

Physics worlds within the world

#### Defined in

[rapida/src/world/world.ts:74](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L74)

___

### queryManager

• **queryManager**: [`QueryManager`](QueryManager.md)

The query manager for the world

#### Defined in

[rapida/src/world/world.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L89)

___

### rendererManager

• **rendererManager**: [`RendererManager`](RendererManager.md)

The renderer manager for the world

#### Defined in

[rapida/src/world/world.ts:94](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L94)

___

### scenes

• **scenes**: `Map`<`string`, [`Scene`](Scene.md)\>

Scenes in the world

#### Defined in

[rapida/src/world/world.ts:69](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L69)

___

### spaces

• **spaces**: `Map`<`string`, [`Space`](Space.md)\>

Spaces in the world

#### Defined in

[rapida/src/world/world.ts:64](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L64)

___

### systemManager

• **systemManager**: [`SystemManager`](SystemManager.md)

The system manager for the world

#### Defined in

[rapida/src/world/world.ts:84](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L84)

## Accessors

### add

• `get` **add**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `system` | (`system`: [`System`](System.md)) => [`World`](World.md) |

#### Defined in

[rapida/src/world/world.ts:409](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L409)

___

### create

• `get` **create**(): `Object`

Retrieves world factories

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `renderer` | `Object` |
| `renderer.css` | [object Object] |
| `renderer.webgl` | [object Object] |
| `renderer.xr` | [object Object] |
| `camera` | (`params?`: [`CameraParams`](../modules.md#cameraparams)) => [`Camera`](Camera.md) |
| `physics` | (`params`: [`PhysicsParams`](../modules.md#physicsparams)) => [`Physics`](Physics.md) |
| `scene` | (`params?`: [`SceneParams`](../modules.md#sceneparams)) => [`Scene`](Scene.md) |
| `space` | (`params?`: [`SpaceParams`](../modules.md#spaceparams)) => [`Space`](Space.md) |

#### Defined in

[rapida/src/world/world.ts:404](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L404)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:233](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L233)

___

### emit

▸ **emit**<`E`\>(`event`): `void`

Broadcasts an event for handling by the scene

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | the event to broadcast |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:267](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L267)

___

### init

▸ **init**(): `void`

Initialises the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:183](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L183)

___

### on

▸ **on**<`E`\>(`eventName`, `handler`): `string`

Adds a handler for scene events

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler)<`E`\> | the handler function |

#### Returns

`string`

the id of the new handler

#### Defined in

[rapida/src/world/world.ts:247](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L247)

___

### remove

▸ **remove**(`value`): `void`

Removes from the scene

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Physics`](Physics.md) \| [`Camera`](Camera.md) \| [`Space`](Space.md) \| [`System`](System.md) \| [`Scene`](Scene.md) | the value to remove |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:164](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L164)

___

### removeHandler

▸ **removeHandler**(`eventName`, `handlerId`): `void`

Removes an event handler by handler id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the name of the event |
| `handlerId` | `string` | the id of the event handler |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:259](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L259)

___

### render

▸ **render**(): `void`

Renders the world

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:202](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L202)

___

### update

▸ **update**(`timeElapsed`): `void`

Updates the world

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeElapsed` | `number` | the time elapsed in milliseconds |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:210](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L210)

___

### updatePhysics

▸ **updatePhysics**(`timeElapsed`): `void`

Steps the physics world

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeElapsed` | `number` |

#### Returns

`void`

#### Defined in

[rapida/src/world/world.ts:224](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida/src/world/world.ts#L224)
