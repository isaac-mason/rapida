# Class: PhysicsDebugger

Debugger for Physics that adds physics object representations to a three scene

## Table of contents

### Constructors

- [constructor](PhysicsDebugger.md#constructor)

### Properties

- [color](PhysicsDebugger.md#color)
- [debugInfo](PhysicsDebugger.md#debuginfo)
- [debugger](PhysicsDebugger.md#debugger)
- [physics](PhysicsDebugger.md#physics)
- [scale](PhysicsDebugger.md#scale)
- [scene](PhysicsDebugger.md#scene)

### Methods

- [add](PhysicsDebugger.md#add)
- [remove](PhysicsDebugger.md#remove)
- [update](PhysicsDebugger.md#update)

## Constructors

### constructor

• **new PhysicsDebugger**(`physics`, `params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `physics` | [`Physics`](Physics.md) |
| `params?` | [`PhysicsDebuggerParams`](../interfaces/PhysicsDebuggerParams.md) |

#### Defined in

[src/physics-debugger.ts:72](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L72)

## Properties

### color

• **color**: [`PhysicsDebuggerColor`](../modules.md#physicsdebuggercolor)

The color for debug three objects to be displayed as

#### Defined in

[src/physics-debugger.ts:55](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L55)

___

### debugInfo

• **debugInfo**: [`PhysicsDebugInfo`](../modules.md#physicsdebuginfo)

Physics world debug information

#### Defined in

[src/physics-debugger.ts:70](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L70)

___

### debugger

• **debugger**: `DebugApi`

The cannon debugger

#### Defined in

[src/physics-debugger.ts:65](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L65)

___

### physics

• **physics**: [`Physics`](Physics.md)

The physics world for the debugger

#### Defined in

[src/physics-debugger.ts:45](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L45)

___

### scale

• **scale**: `number`

The scale of the debugger

#### Defined in

[src/physics-debugger.ts:60](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L60)

___

### scene

• **scene**: `Scene`

The scene that the debugger is adding and removing from

#### Defined in

[src/physics-debugger.ts:50](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L50)

## Methods

### add

▸ **add**(`id`, `params`, `type`): `void`

Adds a body to the debugger

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the body |
| `params` | [`BodyParams`](../modules.md#bodyparams)<`unknown`\> | params for the body |
| `type` | [`BodyShapeType`](../modules.md#bodyshapetype) | the body shape type |

#### Returns

`void`

#### Defined in

[src/physics-debugger.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L105)

___

### remove

▸ **remove**(`id`): `void`

Removes a body from the debugger

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the body |

#### Returns

`void`

#### Defined in

[src/physics-debugger.ts:115](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L115)

___

### update

▸ **update**(): `void`

Updates the debugger

#### Returns

`void`

#### Defined in

[src/physics-debugger.ts:89](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L89)
