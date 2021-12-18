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

[packages/rapida-physics/src/physics.ts:288](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L288)

## Properties

### \_factories

• `Private` **\_factories**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | <B\>(`type`: [`BodyShapeType`](../modules.md#bodyshapetype), `params`: `B`, `argsFn`: `ArgFn`<`B`[``"args"``]\>, `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `box` | (`params`: [`BoxCreationParams`](../modules.md#boxcreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `compoundBody` | (`params`: [`CompoundBodyParams`](../interfaces/CompoundBodyParams.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `coneTwistConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConeTwistConstraintOpts`](../interfaces/ConeTwistConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `constraint` | <T\>(`type`: `T`, `bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: `any`) => [`ConstraintORHingeApi`](../modules.md#constraintorhingeapi)<`T`\> |
| `convexPolyhedron` | (`params`: [`ConvexPolyhedronParams`](../modules.md#convexpolyhedronparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `cylinder` | (`params`: [`CylinderCreationParams`](../modules.md#cylindercreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `distanceConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`DistanceConstraintOpts`](../interfaces/DistanceConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `heightfield` | (`params`: [`HeightfieldParams`](../modules.md#heightfieldparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `hingeConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`HingeConstraintOpts`](../interfaces/HingeConstraintOpts.md)) => [`HingeConstraintApi`](../modules.md#hingeconstraintapi) |
| `lockConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConstraintOptns`](../interfaces/ConstraintOptns.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `particle` | (`params`: [`ParticleParams`](../modules.md#particleparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `plane` | (`params`: [`PlaneParams`](../modules.md#planeparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `pointToPointConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`PointToPointConstraintOpts`](../interfaces/PointToPointConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `ray` | (`mode`: [`RayMode`](../modules.md#raymode), `options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => (`string` \| { `destroy`: () => `void`  })[] |
| `raycastAll` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastAny` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastClosest` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastVehicle` | (`params`: [`RaycastVehicleParams`](../interfaces/RaycastVehicleParams.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Object3D`<`Event`\>, [`RaycastVehiclePublicApi`](../interfaces/RaycastVehiclePublicApi.md)] |
| `sphere` | (`params`: [`SphereCreationParams`](../modules.md#spherecreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `spring` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`SpringOptns`](../interfaces/SpringOptns.md)) => [`SpringApi`](../modules.md#springapi) |
| `trimesh` | (`params`: [`TrimeshParams`](../modules.md#trimeshparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |

#### Defined in

[packages/rapida-physics/src/physics.ts:387](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L387)

___

### \_worker

• **\_worker**: `Worker`

The physics web worker

#### Defined in

[packages/rapida-physics/src/physics.ts:157](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L157)

___

### bodies

• **bodies**: `Object` = `{}`

A map of body uuids to their ordered position

#### Index signature

▪ [uuid: `string`]: `number`

#### Defined in

[packages/rapida-physics/src/physics.ts:282](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L282)

___

### buffers

• **buffers**: [`Buffers`](../modules.md#buffers)

The buffers that are shared with the worker

#### Defined in

[packages/rapida-physics/src/physics.ts:267](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L267)

___

### config

• **config**: [`PhysicsWorldConfig`](../modules.md#physicsworldconfig)

The physics world parameters

#### Defined in

[packages/rapida-physics/src/physics.ts:147](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L147)

___

### debugger

• **debugger**: `undefined` \| [`DebugApi`](../modules.md#debugapi)

A debugger for the physics world that if set, will be called on adding to and removing from the world

#### Defined in

[packages/rapida-physics/src/physics.ts:152](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L152)

___

### events

• **events**: `CannonEvents` = `{}`

A map of body uuids to event handlers for cannon events

#### Defined in

[packages/rapida-physics/src/physics.ts:272](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L272)

___

### id

• **id**: `string`

A name for the physics world

#### Defined in

[packages/rapida-physics/src/physics.ts:142](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L142)

___

### refs

• **refs**: [`Refs`](../modules.md#refs) = `{}`

A map of body uuids to their reference Object3D objects

#### Defined in

[packages/rapida-physics/src/physics.ts:262](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L262)

___

### subscriptions

• **subscriptions**: `Partial`<{ [id: number]: [`Subscription`](../modules.md#subscription);  }\> = `{}`

Subscriptions to body properties

#### Defined in

[packages/rapida-physics/src/physics.ts:277](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L277)

## Accessors

### axisIndex

• `get` **axisIndex**(): `number`

Sets the axis angle

#### Returns

`number`

#### Defined in

[packages/rapida-physics/src/physics.ts:169](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L169)

• `set` **axisIndex**(`value`): `void`

Sets the axis angle

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:176](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L176)

___

### broadphase

• `get` **broadphase**(): [`Broadphase`](../modules.md#broadphase)

Gets the broadphase for the world

#### Returns

[`Broadphase`](../modules.md#broadphase)

#### Defined in

[packages/rapida-physics/src/physics.ts:184](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L184)

• `set` **broadphase**(`value`): `void`

Sets the broadphase for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Broadphase`](../modules.md#broadphase) |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:191](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L191)

___

### create

• `get` **create**(): `Object`

Retrieves physics factories

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `body` | <B\>(`type`: [`BodyShapeType`](../modules.md#bodyshapetype), `params`: `B`, `argsFn`: `ArgFn`<`B`[``"args"``]\>, `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `box` | (`params`: [`BoxCreationParams`](../modules.md#boxcreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `compoundBody` | (`params`: [`CompoundBodyParams`](../interfaces/CompoundBodyParams.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `coneTwistConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConeTwistConstraintOpts`](../interfaces/ConeTwistConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `constraint` | <T\>(`type`: `T`, `bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: `any`) => [`ConstraintORHingeApi`](../modules.md#constraintorhingeapi)<`T`\> |
| `convexPolyhedron` | (`params`: [`ConvexPolyhedronParams`](../modules.md#convexpolyhedronparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `cylinder` | (`params`: [`CylinderCreationParams`](../modules.md#cylindercreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `distanceConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`DistanceConstraintOpts`](../interfaces/DistanceConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `heightfield` | (`params`: [`HeightfieldParams`](../modules.md#heightfieldparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `hingeConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`HingeConstraintOpts`](../interfaces/HingeConstraintOpts.md)) => [`HingeConstraintApi`](../modules.md#hingeconstraintapi) |
| `lockConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`ConstraintOptns`](../interfaces/ConstraintOptns.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `particle` | (`params`: [`ParticleParams`](../modules.md#particleparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `plane` | (`params`: [`PlaneParams`](../modules.md#planeparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `pointToPointConstraint` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`PointToPointConstraintOpts`](../interfaces/PointToPointConstraintOpts.md)) => [`ConstraintApi`](../modules.md#constraintapi) |
| `ray` | (`mode`: [`RayMode`](../modules.md#raymode), `options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => (`string` \| { `destroy`: () => `void`  })[] |
| `raycastAll` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastAny` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastClosest` | (`options`: [`RayHookOptions`](../modules.md#rayhookoptions), `callback`: (`e`: [`RayhitEvent`](../modules.md#rayhitevent)) => `void`) => `void` |
| `raycastVehicle` | (`params`: [`RaycastVehicleParams`](../interfaces/RaycastVehicleParams.md), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Object3D`<`Event`\>, [`RaycastVehiclePublicApi`](../interfaces/RaycastVehiclePublicApi.md)] |
| `sphere` | (`params`: [`SphereCreationParams`](../modules.md#spherecreationparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |
| `spring` | (`bodyA`: `Object3D`<`Event`\>, `bodyB`: `Object3D`<`Event`\>, `optns`: [`SpringOptns`](../interfaces/SpringOptns.md)) => [`SpringApi`](../modules.md#springapi) |
| `trimesh` | (`params`: [`TrimeshParams`](../modules.md#trimeshparams), `ref`: ``null`` \| `Object3D`<`Event`\>) => [`Api`](../modules.md#api) |

#### Defined in

[packages/rapida-physics/src/physics.ts:383](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L383)

___

### defaultContactMaterial

• `get` **defaultContactMaterial**(): [`DefaultContactMaterial`](../modules.md#defaultcontactmaterial)

Gets the default contact material for the world

#### Returns

[`DefaultContactMaterial`](../modules.md#defaultcontactmaterial)

#### Defined in

[packages/rapida-physics/src/physics.ts:244](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L244)

• `set` **defaultContactMaterial**(`value`): `void`

Sets the default contact material for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`DefaultContactMaterial`](../modules.md#defaultcontactmaterial) |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:251](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L251)

___

### gravity

• `get` **gravity**(): [`Triplet`](../modules.md#triplet)

Gets the gravity for the world

#### Returns

[`Triplet`](../modules.md#triplet)

#### Defined in

[packages/rapida-physics/src/physics.ts:199](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L199)

• `set` **gravity**(`value`): `void`

Sets the gravity for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Triplet`](../modules.md#triplet) |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:206](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L206)

___

### iterations

• `get` **iterations**(): `number`

Gets the iterations for the world

#### Returns

`number`

#### Defined in

[packages/rapida-physics/src/physics.ts:214](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L214)

• `set` **iterations**(`value`): `void`

Sets the iterations for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:221](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L221)

___

### tolerance

• `get` **tolerance**(): `number`

Gets the tolerance for the world

#### Returns

`number`

#### Defined in

[packages/rapida-physics/src/physics.ts:229](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L229)

• `set` **tolerance**(`value`): `void`

Sets the tolerance for the world

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:236](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L236)

___

### worker

• `get` **worker**(): `Worker`

Getter for the physics web worker

#### Returns

`Worker`

#### Defined in

[packages/rapida-physics/src/physics.ts:162](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L162)

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[packages/rapida-physics/src/physics.ts:362](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L362)

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

[packages/rapida-physics/src/physics.ts:864](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L864)

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

[packages/rapida-physics/src/physics.ts:878](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L878)

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

[packages/rapida-physics/src/physics.ts:893](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L893)

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

[packages/rapida-physics/src/physics.ts:830](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L830)

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

[packages/rapida-physics/src/physics.ts:908](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L908)

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

[packages/rapida-physics/src/physics.ts:366](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida-physics/src/physics.ts#L366)
