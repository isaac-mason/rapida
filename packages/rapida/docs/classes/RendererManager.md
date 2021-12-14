# Class: RendererManager

RendererManager managers the render and update loop for renderers

## Table of contents

### Constructors

- [constructor](RendererManager.md#constructor)

### Properties

- [initialised](RendererManager.md#initialised)
- [renderers](RendererManager.md#renderers)
- [renderersWithUpdate](RendererManager.md#rendererswithupdate)

### Methods

- [\_destroy](RendererManager.md#_destroy)
- [\_init](RendererManager.md#_init)
- [\_update](RendererManager.md#_update)
- [addRenderer](RendererManager.md#addrenderer)
- [removeRenderer](RendererManager.md#removerenderer)
- [render](RendererManager.md#render)

## Constructors

### constructor

• **new RendererManager**()

## Properties

### initialised

• `Private` **initialised**: `boolean` = `false`

Whether the renderer manager is initialised

#### Defined in

[rapida/src/renderer/renderer-manager.ts:21](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L21)

___

### renderers

• **renderers**: `Map`<`string`, [`Renderer`](../interfaces/Renderer.md)\>

The renderers in the renderer manager

#### Defined in

[rapida/src/renderer/renderer-manager.ts:11](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L11)

___

### renderersWithUpdate

• `Private` **renderersWithUpdate**: `Map`<`string`, [`Renderer`](../interfaces/Renderer.md)\>

A map of renderers that have an update method

#### Defined in

[rapida/src/renderer/renderer-manager.ts:16](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L16)

## Methods

### \_destroy

▸ **_destroy**(): `void`

Destroys the renderer manager

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L43)

___

### \_init

▸ **_init**(): `void`

Initialises the renderer manager

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:26](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L26)

___

### \_update

▸ **_update**(): `void`

Updates the renderer manager to run renderer and view logic that isn't rendering

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:34](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L34)

___

### addRenderer

▸ **addRenderer**(`renderer`): `void`

Adds a renderer to the RendererManager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`Renderer`](../interfaces/Renderer.md) | the renderer to add |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:58](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L58)

___

### removeRenderer

▸ **removeRenderer**(`renderer`): `void`

Removes a renderer from the RendererManager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`Renderer`](../interfaces/Renderer.md) | the renderer to remove |

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:74](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L74)

___

### render

▸ **render**(): `void`

Calls the render method for all renderers

#### Returns

`void`

#### Defined in

[rapida/src/renderer/renderer-manager.ts:50](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/renderer-manager.ts#L50)
