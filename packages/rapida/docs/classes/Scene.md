# Class: Scene

A thin wrapper around a three js scene

## Table of contents

### Constructors

- [constructor](Scene.md#constructor)

### Properties

- [id](Scene.md#id)
- [threeScene](Scene.md#threescene)

### Methods

- [add](Scene.md#add)
- [remove](Scene.md#remove)

## Constructors

### constructor

• **new Scene**(`params?`)

Constructor for the scene

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`SceneParams`](../modules.md#sceneparams) | the parameters for the scene |

#### Defined in

[rapida/src/scene/scene.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L27)

## Properties

### id

• **id**: `string`

The unique ID for the scene

#### Defined in

[rapida/src/scene/scene.ts:15](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L15)

___

### threeScene

• **threeScene**: `Scene`

The three js scene

#### Defined in

[rapida/src/scene/scene.ts:20](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L20)

## Methods

### add

▸ **add**(`value`): [`Scene`](Scene.md)

Adds to the scene
Used for adding three objects

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object3D`<`Event`\> \| `Object3D`<`Event`\>[] |

#### Returns

[`Scene`](Scene.md)

#### Defined in

[rapida/src/scene/scene.ts:36](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L36)

___

### remove

▸ **remove**(`value`): [`Scene`](Scene.md)

Removes from the scene
Used for removing three objects

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Object3D`<`Event`\> | what should be removed |

#### Returns

[`Scene`](Scene.md)

#### Defined in

[rapida/src/scene/scene.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L53)
