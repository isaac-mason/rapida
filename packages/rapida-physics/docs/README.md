# @rapidajs/rapida-physics

## Table of contents

### Enumerations

- [BodyType](enums/BodyType.md)

### Classes

- [Physics](classes/Physics.md)
- [PhysicsDebugger](classes/PhysicsDebugger.md)

### Interfaces

- [CannonWorker](interfaces/CannonWorker.md)
- [CompoundBodyParams](interfaces/CompoundBodyParams.md)
- [ConeTwistConstraintOpts](interfaces/ConeTwistConstraintOpts.md)
- [ConstraintOptns](interfaces/ConstraintOptns.md)
- [DistanceConstraintOpts](interfaces/DistanceConstraintOpts.md)
- [HingeConstraintOpts](interfaces/HingeConstraintOpts.md)
- [PhysicsDebuggerParams](interfaces/PhysicsDebuggerParams.md)
- [PhysicsObjectApi](interfaces/PhysicsObjectApi.md)
- [PointToPointConstraintOpts](interfaces/PointToPointConstraintOpts.md)
- [RaycastVehicleParams](interfaces/RaycastVehicleParams.md)
- [RaycastVehiclePublicApi](interfaces/RaycastVehiclePublicApi.md)
- [SpringOptns](interfaces/SpringOptns.md)
- [WheelInfoOptions](interfaces/WheelInfoOptions.md)

### Type aliases

- [AddRayMessage](modules.md#addraymessage)
- [Api](modules.md#api)
- [AtomicApi](modules.md#atomicapi)
- [AtomicName](modules.md#atomicname)
- [AtomicParams](modules.md#atomicparams)
- [BodyParams](modules.md#bodyparams)
- [BodyParamsArgsRequired](modules.md#bodyparamsargsrequired)
- [BodyShapeType](modules.md#bodyshapetype)
- [BoxCreationParams](modules.md#boxcreationparams)
- [BoxParams](modules.md#boxparams)
- [Broadphase](modules.md#broadphase)
- [Buffers](modules.md#buffers)
- [CollideBeginEvent](modules.md#collidebeginevent)
- [CollideEndEvent](modules.md#collideendevent)
- [CollideEvent](modules.md#collideevent)
- [ConstraintApi](modules.md#constraintapi)
- [ConstraintORHingeApi](modules.md#constraintorhingeapi)
- [ConstraintTypes](modules.md#constrainttypes)
- [ConvexPolyhedronArgs](modules.md#convexpolyhedronargs)
- [ConvexPolyhedronParams](modules.md#convexpolyhedronparams)
- [CylinderArgs](modules.md#cylinderargs)
- [CylinderCreationParams](modules.md#cylindercreationparams)
- [CylinderParams](modules.md#cylinderparams)
- [DebugApi](modules.md#debugapi)
- [DefaultContactMaterial](modules.md#defaultcontactmaterial)
- [FrameMessage](modules.md#framemessage)
- [HeightfieldArgs](modules.md#heightfieldargs)
- [HeightfieldParams](modules.md#heightfieldparams)
- [HingeConstraintApi](modules.md#hingeconstraintapi)
- [IncomingWorkerMessage](modules.md#incomingworkermessage)
- [LockConstraintOpts](modules.md#lockconstraintopts)
- [Observation](modules.md#observation)
- [ParticleParams](modules.md#particleparams)
- [PhysicsContext](modules.md#physicscontext)
- [PhysicsDebugInfo](modules.md#physicsdebuginfo)
- [PhysicsDebuggerColor](modules.md#physicsdebuggercolor)
- [PhysicsParams](modules.md#physicsparams)
- [PhysicsWorldConfig](modules.md#physicsworldconfig)
- [PlaneParams](modules.md#planeparams)
- [PropValue](modules.md#propvalue)
- [PublicVectorName](modules.md#publicvectorname)
- [RayHookOptions](modules.md#rayhookoptions)
- [RayMode](modules.md#raymode)
- [RayhitEvent](modules.md#rayhitevent)
- [Refs](modules.md#refs)
- [SerializableBodyParams](modules.md#serializablebodyparams)
- [SetOpName](modules.md#setopname)
- [ShapeType](modules.md#shapetype)
- [SphereCreationParams](modules.md#spherecreationparams)
- [SphereParams](modules.md#sphereparams)
- [SpringApi](modules.md#springapi)
- [Subscription](modules.md#subscription)
- [SubscriptionName](modules.md#subscriptionname)
- [SubscriptionTarget](modules.md#subscriptiontarget)
- [Subscriptions](modules.md#subscriptions)
- [TrimeshArgs](modules.md#trimeshargs)
- [TrimeshParams](modules.md#trimeshparams)
- [Triplet](modules.md#triplet)
- [VectorApi](modules.md#vectorapi)
- [VectorName](modules.md#vectorname)
- [VectorParams](modules.md#vectorparams)
- [VectorTypes](modules.md#vectortypes)
- [WorkerApi](modules.md#workerapi)
- [WorkerCollideBeginEvent](modules.md#workercollidebeginevent)
- [WorkerCollideEndEvent](modules.md#workercollideendevent)
- [WorkerCollideEvent](modules.md#workercollideevent)
- [WorkerEventMessage](modules.md#workereventmessage)
- [WorkerFrameMessage](modules.md#workerframemessage)
- [WorkerRayhitEvent](modules.md#workerrayhitevent)
- [WorldPropName](modules.md#worldpropname)

### Variables

- [atomicNames](modules.md#atomicnames)
- [subscriptionNames](modules.md#subscriptionnames)
- [vectorNames](modules.md#vectornames)

## Type aliases

### AddRayMessage

Ƭ **AddRayMessage**: `WithUUID`<``"addRay"``, { `from?`: [`Triplet`](modules.md#triplet) ; `mode`: [`RayMode`](modules.md#raymode) ; `to?`: [`Triplet`](modules.md#triplet)  } & `Pick`<`RayOptions`, ``"checkCollisionResponse"`` \| ``"collisionFilterGroup"`` \| ``"collisionFilterMask"`` \| ``"skipBackfaces"``\>\>

#### Defined in

[src/types.ts:290](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L290)

___

### Api

Ƭ **Api**: [`Object3D`, [`PhysicsObjectApi`](interfaces/PhysicsObjectApi.md)]

#### Defined in

[src/types.ts:41](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L41)

___

### AtomicApi

Ƭ **AtomicApi**: { [K in AtomicName]: Object }

#### Defined in

[src/types.ts:108](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L108)

___

### AtomicName

Ƭ **AtomicName**: typeof [`atomicNames`](modules.md#atomicnames)[`number`]

#### Defined in

[src/types.ts:24](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L24)

___

### AtomicParams

Ƭ **AtomicParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowSleep` | `boolean` | If true, the body will automatically fall to sleep. |
| `angularDamping` | `number` | How much to damp the body angular velocity each step. It can go from 0 to 1. |
| `collisionFilterGroup` | `number` | The collision group the body belongs to. |
| `collisionFilterMask` | `number` | The collision group the body can collide with. |
| `collisionResponse` | `number` | Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled - i.e. "collide" events will be raised, but forces will not be altered. |
| `fixedRotation` | `boolean` | Set to true if you don't want the body to rotate |
| `isTrigger` | `boolean` | When true the body behaves like a trigger. It does not collide with other bodies but collision events are still triggered. |
| `linearDamping` | `number` | How much to damp the body velocity each step. It can go from 0 to 1. |
| `mass` | `number` | The mass of the body |
| `material` | `MaterialOptions` | The material for the body |
| `sleepSpeedLimit` | `number` | If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy. |
| `sleepTimeLimit` | `number` | If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping. |
| `userData` | `any` | - |

#### Defined in

[src/types.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L43)

___

### BodyParams

Ƭ **BodyParams**<`T`\>: `Partial`<[`AtomicParams`](modules.md#atomicparams)\> & `Partial`<[`VectorParams`](modules.md#vectorparams)\> & { `args?`: `T` ; `type?`: [`BodyType`](enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](modules.md#collideendevent)) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/types.ts:515](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L515)

___

### BodyParamsArgsRequired

Ƭ **BodyParamsArgsRequired**<`T`\>: [`BodyParams`](modules.md#bodyparams)<`T`\> & { `args`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/types.ts:524](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L524)

___

### BodyShapeType

Ƭ **BodyShapeType**: [`ShapeType`](modules.md#shapetype) \| ``"Compound"``

#### Defined in

[src/types.ts:537](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L537)

___

### BoxCreationParams

Ƭ **BoxCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `size`: [`Triplet`](modules.md#triplet)  }

#### Defined in

[src/types.ts:558](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L558)

___

### BoxParams

Ƭ **BoxParams**: [`BodyParams`](modules.md#bodyparams)<[`Triplet`](modules.md#triplet)\>

#### Defined in

[src/types.ts:560](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L560)

___

### Broadphase

Ƭ **Broadphase**: ``"Naive"`` \| ``"SAP"``

#### Defined in

[src/types.ts:414](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L414)

___

### Buffers

Ƭ **Buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `positions` | `Float32Array` |
| `quaternions` | `Float32Array` |

#### Defined in

[src/types.ts:187](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L187)

___

### CollideBeginEvent

Ƭ **CollideBeginEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `Object3D` |
| `target` | `Object3D` |
| `topic` | `PhysicsEventTopic.COLLIDE_BEGIN` |

#### Defined in

[src/types.ts:203](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L203)

___

### CollideEndEvent

Ƭ **CollideEndEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `Object3D` |
| `target` | `Object3D` |
| `topic` | `PhysicsEventTopic.COLLIDE_END` |

#### Defined in

[src/types.ts:209](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L209)

___

### CollideEvent

Ƭ **CollideEvent**: `Omit`<[`WorkerCollideEvent`](modules.md#workercollideevent)[``"data"``], ``"body"`` \| ``"target"`` \| ``"contact"``\> & { `body`: `Object3D` ; `contact`: `Omit`<`WorkerContact`, ``"bi"`` \| ``"bj"``\> & { `bi`: `Object3D` ; `bj`: `Object3D`  } ; `target`: `Object3D` ; `topic`: `PhysicsEventTopic.COLLIDE`  }

#### Defined in

[src/types.ts:193](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L193)

___

### ConstraintApi

Ƭ **ConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `enable`: () => `void`  }]

#### Defined in

[src/types.ts:139](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L139)

___

### ConstraintORHingeApi

Ƭ **ConstraintORHingeApi**<`T`\>: `T` extends [`ConstraintTypes`](modules.md#constrainttypes) ? [`ConstraintApi`](modules.md#constraintapi) : [`HingeConstraintApi`](modules.md#hingeconstraintapi)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"Hinge"`` \| [`ConstraintTypes`](modules.md#constrainttypes) |

#### Defined in

[src/types.ts:174](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L174)

___

### ConstraintTypes

Ƭ **ConstraintTypes**: ``"PointToPoint"`` \| ``"ConeTwist"`` \| ``"Distance"`` \| ``"Lock"``

#### Defined in

[src/types.ts:172](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L172)

___

### ConvexPolyhedronArgs

Ƭ **ConvexPolyhedronArgs**<`V`\>: [vertices?: V[], faces?: number[][], normals?: V[], axes?: V[], boundingSphereRadius?: number]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`VectorTypes`](modules.md#vectortypes) = [`VectorTypes`](modules.md#vectortypes) |

#### Defined in

[src/types.ts:548](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L548)

___

### ConvexPolyhedronParams

Ƭ **ConvexPolyhedronParams**: [`BodyParams`](modules.md#bodyparams)<[`ConvexPolyhedronArgs`](modules.md#convexpolyhedronargs)\>

#### Defined in

[src/types.ts:605](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L605)

___

### CylinderArgs

Ƭ **CylinderArgs**: [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number]

#### Defined in

[src/types.ts:539](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L539)

___

### CylinderCreationParams

Ƭ **CylinderCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `height?`: `number` ; `numSegments?`: `number` ; `radiusBottom?`: `number` ; `radiusTop?`: `number`  }

#### Defined in

[src/types.ts:562](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L562)

___

### CylinderParams

Ƭ **CylinderParams**: [`BodyParams`](modules.md#bodyparams)<[`CylinderArgs`](modules.md#cylinderargs)\>

#### Defined in

[src/types.ts:584](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L584)

___

### DebugApi

Ƭ **DebugApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`id`: `string`, `params`: [`BodyParams`](modules.md#bodyparams)<`unknown`\>, `type`: [`BodyShapeType`](modules.md#bodyshapetype)) => `void` |
| `remove` | (`id`: `string`) => `void` |

#### Defined in

[src/types.ts:409](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L409)

___

### DefaultContactMaterial

Ƭ **DefaultContactMaterial**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contactEquationRelaxation?` | `number` |
| `contactEquationStiffness?` | `number` |
| `friction?` | `number` |
| `frictionEquationRelaxation?` | `number` |
| `frictionEquationStiffness?` | `number` |
| `restitution?` | `number` |

#### Defined in

[src/types.ts:680](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L680)

___

### FrameMessage

Ƭ **FrameMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |
| `bodies?` | `string`[] |
| `observations` | [`Observation`](modules.md#observation)[] |
| `positions` | `Float32Array` |
| `quaternions` | `Float32Array` |
| `topic` | `PhysicsEventTopic.FRAME` |

#### Defined in

[src/types.ts:428](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L428)

___

### HeightfieldArgs

Ƭ **HeightfieldArgs**: [data: number[][], options: Object]

#### Defined in

[src/types.ts:543](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L543)

___

### HeightfieldParams

Ƭ **HeightfieldParams**: [`BodyParamsArgsRequired`](modules.md#bodyparamsargsrequired)<[`HeightfieldArgs`](modules.md#heightfieldargs)\>

#### Defined in

[src/types.ts:604](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L604)

___

### HingeConstraintApi

Ƭ **HingeConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `disableMotor`: () => `void` ; `enable`: () => `void` ; `enableMotor`: () => `void` ; `setMotorMaxForce`: (`value`: `number`) => `void` ; `setMotorSpeed`: (`value`: `number`) => `void`  }]

#### Defined in

[src/types.ts:148](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L148)

___

### IncomingWorkerMessage

Ƭ **IncomingWorkerMessage**: [`WorkerFrameMessage`](modules.md#workerframemessage) \| [`WorkerEventMessage`](modules.md#workereventmessage)

#### Defined in

[src/types.ts:507](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L507)

___

### LockConstraintOpts

Ƭ **LockConstraintOpts**: [`ConstraintOptns`](interfaces/ConstraintOptns.md)

#### Defined in

[src/types.ts:640](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L640)

___

### Observation

Ƭ **Observation**: { [K in AtomicName]: [id: number, value: PropValue<K\>, type: K] }[[`AtomicName`](modules.md#atomicname)]

#### Defined in

[src/types.ts:416](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L416)

___

### ParticleParams

Ƭ **ParticleParams**: [`BodyParams`](modules.md#bodyparams)

Params for creating a particle

#### Defined in

[src/types.ts:589](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L589)

___

### PhysicsContext

Ƭ **PhysicsContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bodies` | `Object` |
| `buffers` | [`Buffers`](modules.md#buffers) |
| `events` | `CannonEvents` |
| `refs` | [`Refs`](modules.md#refs) |
| `subscriptions` | [`Subscriptions`](modules.md#subscriptions) |
| `worker` | [`CannonWorker`](interfaces/CannonWorker.md) |

#### Defined in

[src/types.ts:400](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L400)

___

### PhysicsDebugInfo

Ƭ **PhysicsDebugInfo**: `Object`

Debugging information available to a debugger

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bodies` | `Body`[] |
| `refs` | `Object` |

#### Defined in

[src/physics-debugger.ts:18](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/physics-debugger.ts#L18)

___

### PhysicsDebuggerColor

Ƭ **PhysicsDebuggerColor**: `string` \| `number` \| `Color`

Color for the physics debugger to use

#### Defined in

[src/physics-debugger.ts:23](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/physics-debugger.ts#L23)

___

### PhysicsParams

Ƭ **PhysicsParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowSleep?` | `boolean` | - |
| `axisIndex?` | `number` | - |
| `broadphase?` | [`Broadphase`](modules.md#broadphase) | - |
| `defaultContactMaterial?` | [`DefaultContactMaterial`](modules.md#defaultcontactmaterial) | - |
| `delta?` | `number` | - |
| `gravity?` | [`Triplet`](modules.md#triplet) | - |
| `id?` | `string` | An optional id for the physics world |
| `iterations?` | `number` | - |
| `maxSubSteps?` | `number` | - |
| `quatNormalizeFast?` | `boolean` | - |
| `quatNormalizeSkip?` | `number` | - |
| `size?` | `number` | - |
| `solver?` | ``"GS"`` \| ``"Split"`` | - |
| `tolerance?` | `number` | - |

#### Defined in

[src/types.ts:689](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L689)

___

### PhysicsWorldConfig

Ƭ **PhysicsWorldConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allowSleep` | `boolean` |
| `axisIndex` | `number` |
| `broadphase` | [`Broadphase`](modules.md#broadphase) |
| `defaultContactMaterial` | `Object` |
| `defaultContactMaterial.contactEquationRelaxation?` | `number` |
| `defaultContactMaterial.contactEquationStiffness?` | `number` |
| `defaultContactMaterial.friction?` | `number` |
| `defaultContactMaterial.frictionEquationRelaxation?` | `number` |
| `defaultContactMaterial.frictionEquationStiffness?` | `number` |
| `defaultContactMaterial.restitution?` | `number` |
| `delta` | `number` |
| `gravity` | [`Triplet`](modules.md#triplet) |
| `iterations` | `number` |
| `maxSubSteps` | `number` |
| `quatNormalizeFast` | `boolean` |
| `quatNormalizeSkip` | `number` |
| `size` | `number` |
| `solver` | ``"GS"`` \| ``"Split"`` |
| `tolerance` | `number` |

#### Defined in

[src/types.ts:709](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L709)

___

### PlaneParams

Ƭ **PlaneParams**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

[src/types.ts:556](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L556)

___

### PropValue

Ƭ **PropValue**<`T`\>: `T` extends [`AtomicName`](modules.md#atomicname) ? [`AtomicParams`](modules.md#atomicparams)[`T`] : `T` extends [`VectorName`](modules.md#vectorname) ? [`Triplet`](modules.md#triplet) : `T` extends ``"sliding"`` ? `boolean` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubscriptionName`](modules.md#subscriptionname) = [`SubscriptionName`](modules.md#subscriptionname) |

#### Defined in

[src/types.ts:233](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L233)

___

### PublicVectorName

Ƭ **PublicVectorName**: `Exclude`<[`VectorName`](modules.md#vectorname), ``"quaternion"``\> \| ``"rotation"``

#### Defined in

[src/types.ts:39](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L39)

___

### RayHookOptions

Ƭ **RayHookOptions**: `Omit`<[`AddRayMessage`](modules.md#addraymessage)[``"params"``], ``"mode"``\>

#### Defined in

[src/types.ts:288](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L288)

___

### RayMode

Ƭ **RayMode**: ``"Closest"`` \| ``"Any"`` \| ``"All"``

#### Defined in

[src/types.ts:286](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L286)

___

### RayhitEvent

Ƭ **RayhitEvent**: `Omit`<[`WorkerRayhitEvent`](modules.md#workerrayhitevent)[``"data"``], ``"body"``\> & { `body`: `Object3D` \| ``null`` ; `topic`: `PhysicsEventTopic.RAYHIT`  }

#### Defined in

[src/types.ts:215](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L215)

___

### Refs

Ƭ **Refs**: `Object`

#### Index signature

▪ [uuid: `string`]: `Object3D`

#### Defined in

[src/types.ts:189](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L189)

___

### SerializableBodyParams

Ƭ **SerializableBodyParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCollide` | `boolean` |

#### Defined in

[src/types.ts:351](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L351)

___

### SetOpName

Ƭ **SetOpName**<`T`\>: \`set${Capitalize<T\>}\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AtomicName`](modules.md#atomicname) \| [`VectorName`](modules.md#vectorname) \| [`WorldPropName`](modules.md#worldpropname) |

#### Defined in

[src/types.ts:241](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L241)

___

### ShapeType

Ƭ **ShapeType**: ``"Plane"`` \| ``"Box"`` \| ``"Cylinder"`` \| ``"Heightfield"`` \| ``"Particle"`` \| ``"Sphere"`` \| ``"Trimesh"`` \| ``"ConvexPolyhedron"``

#### Defined in

[src/types.ts:528](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L528)

___

### SphereCreationParams

Ƭ **SphereCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `radius`: `number`  }

Params for creating a sphere

#### Defined in

[src/types.ts:594](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L594)

___

### SphereParams

Ƭ **SphereParams**: [`BodyParams`](modules.md#bodyparams)<`number`\>

#### Defined in

[src/types.ts:601](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L601)

___

### SpringApi

Ƭ **SpringApi**: [`string`, `Object3D`, `Object3D`, { `setDamping`: (`value`: `number`) => `void` ; `setRestLength`: (`value`: `number`) => `void` ; `setStiffness`: (`value`: `number`) => `void`  }]

#### Defined in

[src/types.ts:161](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L161)

___

### Subscription

Ƭ **Subscription**: `Partial`<{ [K in SubscriptionName]: Function }\>

#### Defined in

[src/types.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L228)

___

### SubscriptionName

Ƭ **SubscriptionName**: typeof [`subscriptionNames`](modules.md#subscriptionnames)[`number`]

#### Defined in

[src/types.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L37)

___

### SubscriptionTarget

Ƭ **SubscriptionTarget**: ``"bodies"`` \| ``"vehicles"``

#### Defined in

[src/types.ts:363](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L363)

___

### Subscriptions

Ƭ **Subscriptions**: `Partial`<{ [id: number]: [`Subscription`](modules.md#subscription);  }\>

#### Defined in

[src/types.ts:229](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L229)

___

### TrimeshArgs

Ƭ **TrimeshArgs**: [vertices: ArrayLike<number\>, indices: ArrayLike<number\>]

#### Defined in

[src/types.ts:541](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L541)

___

### TrimeshParams

Ƭ **TrimeshParams**: [`BodyParamsArgsRequired`](modules.md#bodyparamsargsrequired)<[`TrimeshArgs`](modules.md#trimeshargs)\>

#### Defined in

[src/types.ts:603](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L603)

___

### Triplet

Ƭ **Triplet**: [x: number, y: number, z: number]

#### Defined in

[src/types.ts:5](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L5)

___

### VectorApi

Ƭ **VectorApi**: { [K in PublicVectorName]: Object }

#### Defined in

[src/types.ts:115](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L115)

___

### VectorName

Ƭ **VectorName**: typeof [`vectorNames`](modules.md#vectornames)[`number`]

#### Defined in

[src/types.ts:34](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L34)

___

### VectorParams

Ƭ **VectorParams**: `Record`<[`PublicVectorName`](modules.md#publicvectorname), [`Triplet`](modules.md#triplet)\>

#### Defined in

[src/types.ts:7](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L7)

___

### VectorTypes

Ƭ **VectorTypes**: `Vector3` \| [`Triplet`](modules.md#triplet)

#### Defined in

[src/types.ts:6](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L6)

___

### WorkerApi

Ƭ **WorkerApi**: [`AtomicApi`](modules.md#atomicapi) & [`VectorApi`](modules.md#vectorapi) & { `applyForce`: (`force`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalForce`: (`force`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyTorque`: (`torque`: [`Triplet`](modules.md#triplet)) => `void` ; `destroy`: () => `void` ; `sleep`: () => `void` ; `wakeUp`: () => `void`  }

#### Defined in

[src/types.ts:123](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L123)

___

### WorkerCollideBeginEvent

Ƭ **WorkerCollideBeginEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.bodyA` | `string` |
| `data.bodyB` | `string` |
| `data.topic` | `PhysicsEventTopic.COLLIDE_BEGIN` |

#### Defined in

[src/types.ts:488](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L488)

___

### WorkerCollideEndEvent

Ƭ **WorkerCollideEndEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.bodyA` | `string` |
| `data.bodyB` | `string` |
| `data.topic` | `PhysicsEventTopic.COLLIDE_END` |

#### Defined in

[src/types.ts:495](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L495)

___

### WorkerCollideEvent

Ƭ **WorkerCollideEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.body` | `string` |
| `data.collisionFilters` | `Object` |
| `data.collisionFilters.bodyFilterGroup` | `number` |
| `data.collisionFilters.bodyFilterMask` | `number` |
| `data.collisionFilters.targetFilterGroup` | `number` |
| `data.collisionFilters.targetFilterMask` | `number` |
| `data.contact` | `Object` |
| `data.contact.bi` | `string` |
| `data.contact.bj` | `string` |
| `data.contact.contactNormal` | `number`[] |
| `data.contact.contactPoint` | `number`[] |
| `data.contact.id` | `string` |
| `data.contact.impactVelocity` | `number` |
| `data.contact.ni` | `number`[] |
| `data.contact.ri` | `number`[] |
| `data.contact.rj` | `number`[] |
| `data.target` | `string` |
| `data.topic` | `PhysicsEventTopic.COLLIDE` |

#### Defined in

[src/types.ts:437](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L437)

___

### WorkerEventMessage

Ƭ **WorkerEventMessage**: [`WorkerCollideEvent`](modules.md#workercollideevent) \| [`WorkerRayhitEvent`](modules.md#workerrayhitevent) \| [`WorkerCollideBeginEvent`](modules.md#workercollidebeginevent) \| [`WorkerCollideEndEvent`](modules.md#workercollideendevent)

#### Defined in

[src/types.ts:502](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L502)

___

### WorkerFrameMessage

Ƭ **WorkerFrameMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Buffers`](modules.md#buffers) & { `active`: `boolean` ; `bodies?`: `string`[] ; `observations`: [`Observation`](modules.md#observation)[] ; `topic`: `PhysicsEventTopic.FRAME`  } |
| `topic` | `PhysicsEventTopic.FRAME` |

#### Defined in

[src/types.ts:418](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L418)

___

### WorkerRayhitEvent

Ƭ **WorkerRayhitEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.body` | `string` \| ``null`` |
| `data.distance` | `number` |
| `data.hasHit` | `boolean` |
| `data.hitFaceIndex` | `number` |
| `data.hitNormalWorld` | `number`[] |
| `data.hitPointWorld` | `number`[] |
| `data.ray` | `Object` |
| `data.ray.collisionFilterGroup` | `number` |
| `data.ray.collisionFilterMask` | `number` |
| `data.ray.direction` | `number`[] |
| `data.ray.from` | `number`[] |
| `data.ray.to` | `number`[] |
| `data.ray.uuid` | `string` |
| `data.rayFromWorld` | `number`[] |
| `data.rayToWorld` | `number`[] |
| `data.shape` | `Omit`<`Shape`, ``"body"``\> & { `body`: `string`  } \| ``null`` |
| `data.shouldStop` | `boolean` |
| `data.topic` | `PhysicsEventTopic.RAYHIT` |

#### Defined in

[src/types.ts:464](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L464)

___

### WorldPropName

Ƭ **WorldPropName**: ``"axisIndex"`` \| ``"broadphase"`` \| ``"gravity"`` \| ``"iterations"`` \| ``"tolerance"``

#### Defined in

[src/types.ts:377](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L377)

## Variables

### atomicNames

• **atomicNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``]

#### Defined in

[src/types.ts:9](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L9)

___

### subscriptionNames

• **subscriptionNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``, ``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``, ``"sliding"``]

#### Defined in

[src/types.ts:36](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L36)

___

### vectorNames

• **vectorNames**: readonly [``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``]

#### Defined in

[src/types.ts:26](https://gitlab.com/rapidajs/rapida/-/blob/7269310/packages/rapida-physics/src/types.ts#L26)
