# @rapidajs/rapida-physics

## Table of contents

### Enumerations

- [BodyType](enums/BodyType.md)

### Classes

- [Physics](classes/Physics.md)
- [PhysicsDebugger](classes/PhysicsDebugger.md)

### Interfaces

- [CannonWorker](interfaces/CannonWorker.md)
- [CompoundBodyProps](interfaces/CompoundBodyProps.md)
- [ConeTwistConstraintOpts](interfaces/ConeTwistConstraintOpts.md)
- [ConstraintOptns](interfaces/ConstraintOptns.md)
- [DistanceConstraintOpts](interfaces/DistanceConstraintOpts.md)
- [HingeConstraintOpts](interfaces/HingeConstraintOpts.md)
- [PhysicsDebuggerParams](interfaces/PhysicsDebuggerParams.md)
- [PhysicsObjectApi](interfaces/PhysicsObjectApi.md)
- [PointToPointConstraintOpts](interfaces/PointToPointConstraintOpts.md)
- [RaycastVehicleProps](interfaces/RaycastVehicleProps.md)
- [RaycastVehiclePublicApi](interfaces/RaycastVehiclePublicApi.md)
- [SpringOptns](interfaces/SpringOptns.md)
- [WheelInfoOptions](interfaces/WheelInfoOptions.md)

### Type aliases

- [AddRayMessage](modules.md#addraymessage)
- [Api](modules.md#api)
- [AtomicApi](modules.md#atomicapi)
- [AtomicName](modules.md#atomicname)
- [AtomicProps](modules.md#atomicprops)
- [BodyParams](modules.md#bodyparams)
- [BodyPropsArgsRequired](modules.md#bodypropsargsrequired)
- [BodyShapeType](modules.md#bodyshapetype)
- [BoxProps](modules.md#boxprops)
- [Broadphase](modules.md#broadphase)
- [Buffers](modules.md#buffers)
- [CollideBeginEvent](modules.md#collidebeginevent)
- [CollideEndEvent](modules.md#collideendevent)
- [CollideEvent](modules.md#collideevent)
- [ConstraintApi](modules.md#constraintapi)
- [ConstraintORHingeApi](modules.md#constraintorhingeapi)
- [ConstraintTypes](modules.md#constrainttypes)
- [ConvexPolyhedronArgs](modules.md#convexpolyhedronargs)
- [ConvexPolyhedronProps](modules.md#convexpolyhedronprops)
- [CylinderArgs](modules.md#cylinderargs)
- [CylinderProps](modules.md#cylinderprops)
- [DebugApi](modules.md#debugapi)
- [DefaultContactMaterial](modules.md#defaultcontactmaterial)
- [FrameMessage](modules.md#framemessage)
- [HeightfieldArgs](modules.md#heightfieldargs)
- [HeightfieldProps](modules.md#heightfieldprops)
- [HingeConstraintApi](modules.md#hingeconstraintapi)
- [IncomingWorkerMessage](modules.md#incomingworkermessage)
- [LockConstraintOpts](modules.md#lockconstraintopts)
- [Observation](modules.md#observation)
- [ParticleProps](modules.md#particleprops)
- [PhysicsContext](modules.md#physicscontext)
- [PhysicsDebugInfo](modules.md#physicsdebuginfo)
- [PhysicsDebuggerColor](modules.md#physicsdebuggercolor)
- [PhysicsParams](modules.md#physicsparams)
- [PhysicsWorldConfig](modules.md#physicsworldconfig)
- [PlaneProps](modules.md#planeprops)
- [PropValue](modules.md#propvalue)
- [PublicVectorName](modules.md#publicvectorname)
- [RayHookOptions](modules.md#rayhookoptions)
- [RayMode](modules.md#raymode)
- [RayhitEvent](modules.md#rayhitevent)
- [Refs](modules.md#refs)
- [SerializableBodyProps](modules.md#serializablebodyprops)
- [SetOpName](modules.md#setopname)
- [ShapeType](modules.md#shapetype)
- [SphereProps](modules.md#sphereprops)
- [SpringApi](modules.md#springapi)
- [Subscription](modules.md#subscription)
- [SubscriptionName](modules.md#subscriptionname)
- [SubscriptionTarget](modules.md#subscriptiontarget)
- [Subscriptions](modules.md#subscriptions)
- [TrimeshArgs](modules.md#trimeshargs)
- [TrimeshProps](modules.md#trimeshprops)
- [Triplet](modules.md#triplet)
- [VectorApi](modules.md#vectorapi)
- [VectorName](modules.md#vectorname)
- [VectorProps](modules.md#vectorprops)
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

[src/types.ts:241](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L241)

___

### Api

Ƭ **Api**: [`Object3D`, [`PhysicsObjectApi`](interfaces/PhysicsObjectApi.md)]

#### Defined in

[src/types.ts:41](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L41)

___

### AtomicApi

Ƭ **AtomicApi**: { [K in AtomicName]: Object }

#### Defined in

[src/types.ts:59](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L59)

___

### AtomicName

Ƭ **AtomicName**: typeof [`atomicNames`](modules.md#atomicnames)[`number`]

#### Defined in

[src/types.ts:24](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L24)

___

### AtomicProps

Ƭ **AtomicProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allowSleep` | `boolean` |
| `angularDamping` | `number` |
| `collisionFilterGroup` | `number` |
| `collisionFilterMask` | `number` |
| `collisionResponse` | `number` |
| `fixedRotation` | `boolean` |
| `isTrigger` | `boolean` |
| `linearDamping` | `number` |
| `mass` | `number` |
| `material` | `MaterialOptions` |
| `sleepSpeedLimit` | `number` |
| `sleepTimeLimit` | `number` |
| `userData` | `any` |

#### Defined in

[src/types.ts:43](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L43)

___

### BodyParams

Ƭ **BodyParams**<`T`\>: `Partial`<[`AtomicProps`](modules.md#atomicprops)\> & `Partial`<[`VectorProps`](modules.md#vectorprops)\> & { `args?`: `T` ; `type?`: [`BodyType`](enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](modules.md#collideendevent)) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/types.ts:466](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L466)

___

### BodyPropsArgsRequired

Ƭ **BodyPropsArgsRequired**<`T`\>: [`BodyParams`](modules.md#bodyparams)<`T`\> & { `args`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/types.ts:475](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L475)

___

### BodyShapeType

Ƭ **BodyShapeType**: [`ShapeType`](modules.md#shapetype) \| ``"Compound"``

#### Defined in

[src/types.ts:488](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L488)

___

### BoxProps

Ƭ **BoxProps**: [`BodyParams`](modules.md#bodyparams)<[`Triplet`](modules.md#triplet)\>

#### Defined in

[src/types.ts:505](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L505)

___

### Broadphase

Ƭ **Broadphase**: ``"Naive"`` \| ``"SAP"``

#### Defined in

[src/types.ts:365](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L365)

___

### Buffers

Ƭ **Buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `positions` | `Float32Array` |
| `quaternions` | `Float32Array` |

#### Defined in

[src/types.ts:138](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L138)

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

[src/types.ts:154](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L154)

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

[src/types.ts:160](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L160)

___

### CollideEvent

Ƭ **CollideEvent**: `Omit`<[`WorkerCollideEvent`](modules.md#workercollideevent)[``"data"``], ``"body"`` \| ``"target"`` \| ``"contact"``\> & { `body`: `Object3D` ; `contact`: `Omit`<`WorkerContact`, ``"bi"`` \| ``"bj"``\> & { `bi`: `Object3D` ; `bj`: `Object3D`  } ; `target`: `Object3D` ; `topic`: `PhysicsEventTopic.COLLIDE`  }

#### Defined in

[src/types.ts:144](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L144)

___

### ConstraintApi

Ƭ **ConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `enable`: () => `void`  }]

#### Defined in

[src/types.ts:90](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L90)

___

### ConstraintORHingeApi

Ƭ **ConstraintORHingeApi**<`T`\>: `T` extends [`ConstraintTypes`](modules.md#constrainttypes) ? [`ConstraintApi`](modules.md#constraintapi) : [`HingeConstraintApi`](modules.md#hingeconstraintapi)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"Hinge"`` \| [`ConstraintTypes`](modules.md#constrainttypes) |

#### Defined in

[src/types.ts:125](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L125)

___

### ConstraintTypes

Ƭ **ConstraintTypes**: ``"PointToPoint"`` \| ``"ConeTwist"`` \| ``"Distance"`` \| ``"Lock"``

#### Defined in

[src/types.ts:123](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L123)

___

### ConvexPolyhedronArgs

Ƭ **ConvexPolyhedronArgs**<`V`\>: [vertices?: V[], faces?: number[][], normals?: V[], axes?: V[], boundingSphereRadius?: number]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`VectorTypes`](modules.md#vectortypes) = [`VectorTypes`](modules.md#vectortypes) |

#### Defined in

[src/types.ts:496](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L496)

___

### ConvexPolyhedronProps

Ƭ **ConvexPolyhedronProps**: [`BodyParams`](modules.md#bodyparams)<[`ConvexPolyhedronArgs`](modules.md#convexpolyhedronargs)\>

#### Defined in

[src/types.ts:511](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L511)

___

### CylinderArgs

Ƭ **CylinderArgs**: [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number]

#### Defined in

[src/types.ts:490](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L490)

___

### CylinderProps

Ƭ **CylinderProps**: [`BodyParams`](modules.md#bodyparams)<[`CylinderArgs`](modules.md#cylinderargs)\>

#### Defined in

[src/types.ts:506](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L506)

___

### DebugApi

Ƭ **DebugApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`id`: `string`, `params`: [`BodyParams`](modules.md#bodyparams)<`unknown`\>, `type`: [`BodyShapeType`](modules.md#bodyshapetype)) => `void` |
| `remove` | (`id`: `string`) => `void` |

#### Defined in

[src/types.ts:360](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L360)

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

[src/types.ts:586](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L586)

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

[src/types.ts:379](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L379)

___

### HeightfieldArgs

Ƭ **HeightfieldArgs**: [data: number[][], options: Object]

#### Defined in

[src/types.ts:492](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L492)

___

### HeightfieldProps

Ƭ **HeightfieldProps**: [`BodyPropsArgsRequired`](modules.md#bodypropsargsrequired)<[`HeightfieldArgs`](modules.md#heightfieldargs)\>

#### Defined in

[src/types.ts:510](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L510)

___

### HingeConstraintApi

Ƭ **HingeConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `disableMotor`: () => `void` ; `enable`: () => `void` ; `enableMotor`: () => `void` ; `setMotorMaxForce`: (`value`: `number`) => `void` ; `setMotorSpeed`: (`value`: `number`) => `void`  }]

#### Defined in

[src/types.ts:99](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L99)

___

### IncomingWorkerMessage

Ƭ **IncomingWorkerMessage**: [`WorkerFrameMessage`](modules.md#workerframemessage) \| [`WorkerEventMessage`](modules.md#workereventmessage)

#### Defined in

[src/types.ts:458](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L458)

___

### LockConstraintOpts

Ƭ **LockConstraintOpts**: [`ConstraintOptns`](interfaces/ConstraintOptns.md)

#### Defined in

[src/types.ts:546](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L546)

___

### Observation

Ƭ **Observation**: { [K in AtomicName]: [id: number, value: PropValue<K\>, type: K] }[[`AtomicName`](modules.md#atomicname)]

#### Defined in

[src/types.ts:367](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L367)

___

### ParticleProps

Ƭ **ParticleProps**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

[src/types.ts:507](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L507)

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

[src/types.ts:351](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L351)

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

[src/physics-debugger.ts:18](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L18)

___

### PhysicsDebuggerColor

Ƭ **PhysicsDebuggerColor**: `string` \| `number` \| `Color`

Color for the physics debugger to use

#### Defined in

[src/physics-debugger.ts:23](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/physics-debugger.ts#L23)

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

[src/types.ts:595](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L595)

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

[src/types.ts:615](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L615)

___

### PlaneProps

Ƭ **PlaneProps**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

[src/types.ts:504](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L504)

___

### PropValue

Ƭ **PropValue**<`T`\>: `T` extends [`AtomicName`](modules.md#atomicname) ? [`AtomicProps`](modules.md#atomicprops)[`T`] : `T` extends [`VectorName`](modules.md#vectorname) ? [`Triplet`](modules.md#triplet) : `T` extends ``"sliding"`` ? `boolean` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubscriptionName`](modules.md#subscriptionname) = [`SubscriptionName`](modules.md#subscriptionname) |

#### Defined in

[src/types.ts:184](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L184)

___

### PublicVectorName

Ƭ **PublicVectorName**: `Exclude`<[`VectorName`](modules.md#vectorname), ``"quaternion"``\> \| ``"rotation"``

#### Defined in

[src/types.ts:39](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L39)

___

### RayHookOptions

Ƭ **RayHookOptions**: `Omit`<[`AddRayMessage`](modules.md#addraymessage)[``"params"``], ``"mode"``\>

#### Defined in

[src/types.ts:239](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L239)

___

### RayMode

Ƭ **RayMode**: ``"Closest"`` \| ``"Any"`` \| ``"All"``

#### Defined in

[src/types.ts:237](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L237)

___

### RayhitEvent

Ƭ **RayhitEvent**: `Omit`<[`WorkerRayhitEvent`](modules.md#workerrayhitevent)[``"data"``], ``"body"``\> & { `body`: `Object3D` \| ``null`` ; `topic`: `PhysicsEventTopic.RAYHIT`  }

#### Defined in

[src/types.ts:166](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L166)

___

### Refs

Ƭ **Refs**: `Object`

#### Index signature

▪ [uuid: `string`]: `Object3D`

#### Defined in

[src/types.ts:140](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L140)

___

### SerializableBodyProps

Ƭ **SerializableBodyProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCollide` | `boolean` |

#### Defined in

[src/types.ts:302](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L302)

___

### SetOpName

Ƭ **SetOpName**<`T`\>: \`set${Capitalize<T\>}\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AtomicName`](modules.md#atomicname) \| [`VectorName`](modules.md#vectorname) \| [`WorldPropName`](modules.md#worldpropname) |

#### Defined in

[src/types.ts:192](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L192)

___

### ShapeType

Ƭ **ShapeType**: ``"Plane"`` \| ``"Box"`` \| ``"Cylinder"`` \| ``"Heightfield"`` \| ``"Particle"`` \| ``"Sphere"`` \| ``"Trimesh"`` \| ``"ConvexPolyhedron"``

#### Defined in

[src/types.ts:479](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L479)

___

### SphereProps

Ƭ **SphereProps**: [`BodyParams`](modules.md#bodyparams)<`number`\>

#### Defined in

[src/types.ts:508](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L508)

___

### SpringApi

Ƭ **SpringApi**: [`string`, `Object3D`, `Object3D`, { `setDamping`: (`value`: `number`) => `void` ; `setRestLength`: (`value`: `number`) => `void` ; `setStiffness`: (`value`: `number`) => `void`  }]

#### Defined in

[src/types.ts:112](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L112)

___

### Subscription

Ƭ **Subscription**: `Partial`<{ [K in SubscriptionName]: Function }\>

#### Defined in

[src/types.ts:179](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L179)

___

### SubscriptionName

Ƭ **SubscriptionName**: typeof [`subscriptionNames`](modules.md#subscriptionnames)[`number`]

#### Defined in

[src/types.ts:37](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L37)

___

### SubscriptionTarget

Ƭ **SubscriptionTarget**: ``"bodies"`` \| ``"vehicles"``

#### Defined in

[src/types.ts:314](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L314)

___

### Subscriptions

Ƭ **Subscriptions**: `Partial`<{ [id: number]: [`Subscription`](modules.md#subscription);  }\>

#### Defined in

[src/types.ts:180](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L180)

___

### TrimeshArgs

Ƭ **TrimeshArgs**: [vertices: ArrayLike<number\>, indices: ArrayLike<number\>]

#### Defined in

[src/types.ts:491](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L491)

___

### TrimeshProps

Ƭ **TrimeshProps**: [`BodyPropsArgsRequired`](modules.md#bodypropsargsrequired)<[`TrimeshArgs`](modules.md#trimeshargs)\>

#### Defined in

[src/types.ts:509](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L509)

___

### Triplet

Ƭ **Triplet**: [x: number, y: number, z: number]

#### Defined in

[src/types.ts:5](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L5)

___

### VectorApi

Ƭ **VectorApi**: { [K in PublicVectorName]: Object }

#### Defined in

[src/types.ts:66](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L66)

___

### VectorName

Ƭ **VectorName**: typeof [`vectorNames`](modules.md#vectornames)[`number`]

#### Defined in

[src/types.ts:34](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L34)

___

### VectorProps

Ƭ **VectorProps**: `Record`<[`PublicVectorName`](modules.md#publicvectorname), [`Triplet`](modules.md#triplet)\>

#### Defined in

[src/types.ts:7](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L7)

___

### VectorTypes

Ƭ **VectorTypes**: `Vector3` \| [`Triplet`](modules.md#triplet)

#### Defined in

[src/types.ts:6](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L6)

___

### WorkerApi

Ƭ **WorkerApi**: [`AtomicApi`](modules.md#atomicapi) & [`VectorApi`](modules.md#vectorapi) & { `applyForce`: (`force`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalForce`: (`force`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyTorque`: (`torque`: [`Triplet`](modules.md#triplet)) => `void` ; `destroy`: () => `void` ; `sleep`: () => `void` ; `wakeUp`: () => `void`  }

#### Defined in

[src/types.ts:74](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L74)

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

[src/types.ts:439](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L439)

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

[src/types.ts:446](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L446)

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

[src/types.ts:388](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L388)

___

### WorkerEventMessage

Ƭ **WorkerEventMessage**: [`WorkerCollideEvent`](modules.md#workercollideevent) \| [`WorkerRayhitEvent`](modules.md#workerrayhitevent) \| [`WorkerCollideBeginEvent`](modules.md#workercollidebeginevent) \| [`WorkerCollideEndEvent`](modules.md#workercollideendevent)

#### Defined in

[src/types.ts:453](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L453)

___

### WorkerFrameMessage

Ƭ **WorkerFrameMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Buffers`](modules.md#buffers) & { `active`: `boolean` ; `bodies?`: `string`[] ; `observations`: [`Observation`](modules.md#observation)[] ; `topic`: `PhysicsEventTopic.FRAME`  } |
| `topic` | `PhysicsEventTopic.FRAME` |

#### Defined in

[src/types.ts:369](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L369)

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

[src/types.ts:415](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L415)

___

### WorldPropName

Ƭ **WorldPropName**: ``"axisIndex"`` \| ``"broadphase"`` \| ``"gravity"`` \| ``"iterations"`` \| ``"tolerance"``

#### Defined in

[src/types.ts:328](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L328)

## Variables

### atomicNames

• **atomicNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``]

#### Defined in

[src/types.ts:9](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L9)

___

### subscriptionNames

• **subscriptionNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``, ``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``, ``"sliding"``]

#### Defined in

[src/types.ts:36](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L36)

___

### vectorNames

• **vectorNames**: readonly [``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``]

#### Defined in

[src/types.ts:26](https://gitlab.com/rapidajs/rapida/-/blob/a60706c/packages/rapida-physics/src/types.ts#L26)
