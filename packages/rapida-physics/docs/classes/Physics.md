# Class: Physics

Cannon Physics World that runs in a web worker

## Table of contents

### Constructors

- [constructor](Physics.md#constructor)

### Properties

- [\_factories](Physics.md#_factories)
- [\_worker](Physics.md#_worker)
- [bodies](Physics.md#bodies)
- [buffers](Physics.md#buffers)
- [config](Physics.md#config)
- [debugger](Physics.md#debugger)
- [events](Physics.md#events)
- [id](Physics.md#id)
- [refs](Physics.md#refs)
- [subscriptions](Physics.md#subscriptions)

### Accessors

- [axisIndex](Physics.md#axisindex)
- [broadphase](Physics.md#broadphase)
- [create](Physics.md#create)
- [defaultContactMaterial](Physics.md#defaultcontactmaterial)
- [gravity](Physics.md#gravity)
- [iterations](Physics.md#iterations)
- [tolerance](Physics.md#tolerance)
- [worker](Physics.md#worker)

### Methods

- [destroy](Physics.md#destroy)
- [handleCollide](Physics.md#handlecollide)
- [handleCollideBegin](Physics.md#handlecollidebegin)
- [handleCollideEnd](Physics.md#handlecollideend)
- [handleFrame](Physics.md#handleframe)
- [handleRayhit](Physics.md#handlerayhit)
- [step](Physics.md#step)

## Constructors

### constructor

• **new Physics**(`params`)

Constructor for a Physics world

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PhysicsParams`](../modules.md#physicsparams) |

#### Defined in

[src/physics.ts:285](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L285)

## Properties

### \_factories

• `Private` **\_factories**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | <B\>(`type`: [`BodyShapeType`](../modules.md#bodyshapetype), `params`: `B`, `argsFn`: `ArgFn`<`B`[``"args"``]\>, `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `box` | (`params`: [`BoxProps`](../modules.md#boxprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `compoundBody` | (`params`: [`CompoundBodyProps`](../interfaces/CompoundBodyProps.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `coneTwistConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConeTwistConstraintOpts`](../interfaces/ConeTwistConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `constraint` | <T\>(`type`: `T`, `bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: `any`) => [`ConstraintORHingeApi`](../modules.md#constraintorhingeapi)<`T`\> |
| `convexPolyhedron` | (`params`: [`ConvexPolyhedronProps`](../modules.md#convexpolyhedronprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `cylinder` | (`params`: [`CylinderProps`](../modules.md#cylinderprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `distanceConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`DistanceConstraintOpts`](../interfaces/DistanceConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `heightfield` | (`params`: [`HeightfieldProps`](../modules.md#heightfieldprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `hingeConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`HingeConstraintOpts`](../interfaces/HingeConstraintOpts.md)) => [`HingeConstraintApi`](../modules.md#hingeconstraintapi) |
| `lockConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConstraintOptns`](../interfaces/ConstraintOptns.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `particle` | (`params`: [`ParticleProps`](../modules.md#particleprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `plane` | (`params`: [`PlaneProps`](../modules.md#planeprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `pointToPointConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`PointToPointConstraintOpts`](../interfaces/PointToPointConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `ray` | (`mode`: [`RayMode`](../modules.md#raymode), `options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => (`string` \| { `destroy`: () => `void`  })[] |
| `raycastAll` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastAny` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastClosest` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastVehicle` | (`params`: [`RaycastVehicleProps`](../interfaces/RaycastVehicleProps.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Object3D`<`Event`\>, [`RaycastVehiclePublicApi`](../interfaces/RaycastVehiclePublicApi.md)] |
| `sphere` | (`params`: [`SphereProps`](../modules.md#sphereprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `spring` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`SpringOptns`](../interfaces/SpringOptns.md)) => [`SpringApi`](../modules.md#springapi) |
| `trimesh` | (`params`: [`TrimeshProps`](../modules.md#trimeshprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |

#### Defined in

[src/physics.ts:384](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L384)

___

### \_worker

• **\_worker**: `Worker`

The physics web worker

#### Defined in

[src/physics.ts:154](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L154)

___

### bodies

• **bodies**: `Object` = `{}`

A map of body uuids to their ordered position

#### Index signature

▪ [uuid: `string`]: `number`

#### Defined in

[src/physics.ts:279](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L279)

___

### buffers

• **buffers**: [`Buffers`](../modules.md#buffers)

The buffers that are shared with the worker

#### Defined in

[src/physics.ts:264](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L264)

___

### config

• **config**: [`PhysicsWorldConfig`](../modules.md#physicsworldconfig)

The physics world parameters

#### Defined in

[src/physics.ts:144](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L144)

___

### debugger

• **debugger**: `undefined` \| [`DebugApi`](../modules.md#debugapi)

A debugger for the physics world that if set, will be called on adding to and removing from the world

#### Defined in

[src/physics.ts:149](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L149)

___

### events

• **events**: `CannonEvents` = `{}`

A map of body uuids to event handlers for cannon events

#### Defined in

[src/physics.ts:269](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L269)

___

### id

• **id**: `string`

A name for the physics world

#### Defined in

[src/physics.ts:139](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L139)

___

### refs

• **refs**: [`Refs`](../modules.md#refs) = `{}`

A map of body uuids to their reference Object3D objects

#### Defined in

[src/physics.ts:259](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L259)

___

### subscriptions

• **subscriptions**: `Partial`<{ [id: number]: [`Subscription`](../modules.md#subscription);  }\> = `{}`

Subscriptions to body properties

#### Defined in

[src/physics.ts:274](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L274)

## Accessors

### axisIndex

• `get` **axisIndex**(): `number`

Sets the axis angle

#### Returns

`number`

#### Defined in

[src/physics.ts:166](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L166)

• `set` **axisIndex**(`value`): `void`

Sets the axis angle

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[src/physics.ts:173](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L173)

___

### broadphase

• `get` **broadphase**(): [`Broadphase`](../modules.md#broadphase)

Gets the broadphase for the world

#### Returns

[`Broadphase`](../modules.md#broadphase)

#### Defined in

[src/physics.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L181)

• `set` **broadphase**(`value`): `void`

Sets the broadphase for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Broadphase`](../modules.md#broadphase) |

#### Returns

`void`

#### Defined in

[src/physics.ts:188](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L188)

___

### create

• `get` **create**(): `Object`

Retrieves physics factories

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `body` | <B\>(`type`: [`BodyShapeType`](../modules.md#bodyshapetype), `params`: `B`, `argsFn`: `ArgFn`<`B`[``"args"``]\>, `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `box` | (`params`: [`BoxProps`](../modules.md#boxprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `compoundBody` | (`params`: [`CompoundBodyProps`](../interfaces/CompoundBodyProps.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `coneTwistConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConeTwistConstraintOpts`](../interfaces/ConeTwistConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `constraint` | <T\>(`type`: `T`, `bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: `any`) => [`ConstraintORHingeApi`](../modules.md#constraintorhingeapi)<`T`\> |
| `convexPolyhedron` | (`params`: [`ConvexPolyhedronProps`](../modules.md#convexpolyhedronprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `cylinder` | (`params`: [`CylinderProps`](../modules.md#cylinderprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `distanceConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`DistanceConstraintOpts`](../interfaces/DistanceConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `heightfield` | (`params`: [`HeightfieldProps`](../modules.md#heightfieldprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `hingeConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`HingeConstraintOpts`](../interfaces/HingeConstraintOpts.md)) => [`HingeConstraintApi`](../modules.md#hingeconstraintapi) |
| `lockConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConstraintOptns`](../interfaces/ConstraintOptns.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `particle` | (`params`: [`ParticleProps`](../modules.md#particleprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `plane` | (`params`: [`PlaneProps`](../modules.md#planeprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `pointToPointConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`PointToPointConstraintOpts`](../interfaces/PointToPointConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `ray` | (`mode`: [`RayMode`](../modules.md#raymode), `options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => (`string` \| { `destroy`: () => `void`  })[] |
| `raycastAll` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastAny` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastClosest` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastVehicle` | (`params`: [`RaycastVehicleProps`](../interfaces/RaycastVehicleProps.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Object3D`<`Event`\>, [`RaycastVehiclePublicApi`](../interfaces/RaycastVehiclePublicApi.md)] |
| `sphere` | (`params`: [`SphereProps`](../modules.md#sphereprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `spring` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`SpringOptns`](../interfaces/SpringOptns.md)) => [`SpringApi`](../modules.md#springapi) |
| `trimesh` | (`params`: [`TrimeshProps`](../modules.md#trimeshprops), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |

#### Defined in

[src/physics.ts:380](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L380)

___

### defaultContactMaterial

• `get` **defaultContactMaterial**(): [`DefaultContactMaterial`](../modules.md#defaultcontactmaterial)

Gets the default contact material for the world

#### Returns

[`DefaultContactMaterial`](../modules.md#defaultcontactmaterial)

#### Defined in

[src/physics.ts:241](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L241)

• `set` **defaultContactMaterial**(`value`): `void`

Sets the default contact material for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`DefaultContactMaterial`](../modules.md#defaultcontactmaterial) |

#### Returns

`void`

#### Defined in

[src/physics.ts:248](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L248)

___

### gravity

• `get` **gravity**(): [`Triplet`](../modules.md#triplet)

Gets the gravity for the world

#### Returns

[`Triplet`](../modules.md#triplet)

#### Defined in

[src/physics.ts:196](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L196)

• `set` **gravity**(`value`): `void`

Sets the gravity for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Defined in

[src/physics.ts:203](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L203)

___

### iterations

• `get` **iterations**(): `number`

Gets the iterations for the world

#### Returns

`number`

#### Defined in

[src/physics.ts:211](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L211)

• `set` **iterations**(`value`): `void`

Sets the iterations for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[src/physics.ts:218](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L218)

___

### tolerance

• `get` **tolerance**(): `number`

Gets the tolerance for the world

#### Returns

`number`

#### Defined in

[src/physics.ts:226](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L226)

• `set` **tolerance**(`value`): `void`

Sets the tolerance for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[src/physics.ts:233](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L233)

___

### worker

• `get` **worker**(): `Worker`

Getter for the physics web worker

#### Returns

`Worker`

#### Defined in

[src/physics.ts:159](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L159)

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/physics.ts:359](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L359)

___

### handleCollide

▸ `Private` **handleCollide**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`WorkerCollideEvent`](../modules.md#workercollideevent) |

#### Returns

`void`

#### Defined in

[src/physics.ts:840](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L840)

___

### handleCollideBegin

▸ `Private` **handleCollideBegin**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`WorkerCollideBeginEvent`](../modules.md#workercollidebeginevent) |

#### Returns

`void`

#### Defined in

[src/physics.ts:854](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L854)

___

### handleCollideEnd

▸ `Private` **handleCollideEnd**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`WorkerCollideEndEvent`](../modules.md#workercollideendevent) |

#### Returns

`void`

#### Defined in

[src/physics.ts:869](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L869)

___

### handleFrame

▸ `Private` **handleFrame**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`WorkerFrameMessage`](../modules.md#workerframemessage) |

#### Returns

`void`

#### Defined in

[src/physics.ts:806](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L806)

___

### handleRayhit

▸ `Private` **handleRayhit**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`WorkerRayhitEvent`](../modules.md#workerrayhitevent) |

#### Returns

`void`

#### Defined in

[src/physics.ts:884](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L884)

___

### step

▸ **step**(`timeElapsed?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeElapsed?` | `number` |

#### Returns

`void`

#### Defined in

[src/physics.ts:363](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics.ts#L363)
