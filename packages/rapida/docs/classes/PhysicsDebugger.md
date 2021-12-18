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

packages/rapida-physics/lib/next/physics-debugger.d.ts:60

## Properties

### color

• **color**: [`PhysicsDebuggerColor`](../modules.md#physicsdebuggercolor)

The color for debug three objects to be displayed as

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:47

___

### debugInfo

• **debugInfo**: [`PhysicsDebugInfo`](../modules.md#physicsdebuginfo)

Physics world debug information

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:59

___

### debugger

• **debugger**: `DebugApi`

The cannon debugger

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:55

___

### physics

• **physics**: [`Physics`](Physics.md)

The physics world for the debugger

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:39

___

### scale

• **scale**: `number`

The scale of the debugger

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:51

___

### scene

• **scene**: `Scene`

The scene that the debugger is adding and removing from

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:43

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

packages/rapida-physics/lib/next/physics-debugger.d.ts:71

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

packages/rapida-physics/lib/next/physics-debugger.d.ts:76

___

### update

▸ **update**(): `void`

Updates the debugger

#### Returns

`void`

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:64
