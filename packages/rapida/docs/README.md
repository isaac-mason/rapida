# @rapidajs/rapida

## Table of contents

### Enumerations

- [BodyType](enums/BodyType.md)
- [QueryConditionType](enums/QueryConditionType.md)
- [ViewInteractionEvent](enums/ViewInteractionEvent.md)
- [ViewRectangleParamPlane](enums/ViewRectangleParamPlane.md)
- [ViewRectangleParamType](enums/ViewRectangleParamType.md)

### Classes

- [CSSRenderer](classes/CSSRenderer.md)
- [CSSView](classes/CSSView.md)
- [Camera](classes/Camera.md)
- [Component](classes/Component.md)
- [Engine](classes/Engine.md)
- [Entity](classes/Entity.md)
- [NetworkManager](classes/NetworkManager.md)
- [Physics](classes/Physics.md)
- [PhysicsDebugger](classes/PhysicsDebugger.md)
- [Query](classes/Query.md)
- [QueryManager](classes/QueryManager.md)
- [RendererManager](classes/RendererManager.md)
- [Scene](classes/Scene.md)
- [Space](classes/Space.md)
- [System](classes/System.md)
- [SystemManager](classes/SystemManager.md)
- [View](classes/View.md)
- [WebGLRenderer](classes/WebGLRenderer.md)
- [WebGLView](classes/WebGLView.md)
- [World](classes/World.md)

### Interfaces

- [CannonWorker](interfaces/CannonWorker.md)
- [CompoundBodyProps](interfaces/CompoundBodyProps.md)
- [ConeTwistConstraintOpts](interfaces/ConeTwistConstraintOpts.md)
- [ConstraintOptns](interfaces/ConstraintOptns.md)
- [DistanceConstraintOpts](interfaces/DistanceConstraintOpts.md)
- [Event](interfaces/Event.md)
- [HingeConstraintOpts](interfaces/HingeConstraintOpts.md)
- [PhysicsDebuggerParams](interfaces/PhysicsDebuggerParams.md)
- [PhysicsObjectApi](interfaces/PhysicsObjectApi.md)
- [PointToPointConstraintOpts](interfaces/PointToPointConstraintOpts.md)
- [RaycastVehicleProps](interfaces/RaycastVehicleProps.md)
- [RaycastVehiclePublicApi](interfaces/RaycastVehiclePublicApi.md)
- [Renderer](interfaces/Renderer.md)
- [SpringOptns](interfaces/SpringOptns.md)
- [ViewInteractionEventMap](interfaces/ViewInteractionEventMap.md)
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
- [CSSRendererParams](modules.md#cssrendererparams)
- [CSSViewParams](modules.md#cssviewparams)
- [CameraParams](modules.md#cameraparams)
- [CollideBeginEvent](modules.md#collidebeginevent)
- [CollideEndEvent](modules.md#collideendevent)
- [CollideEvent](modules.md#collideevent)
- [ComponentParams](modules.md#componentparams)
- [ConstraintApi](modules.md#constraintapi)
- [ConstraintORHingeApi](modules.md#constraintorhingeapi)
- [ConstraintTypes](modules.md#constrainttypes)
- [ConvexPolyhedronArgs](modules.md#convexpolyhedronargs)
- [ConvexPolyhedronProps](modules.md#convexpolyhedronprops)
- [CylinderArgs](modules.md#cylinderargs)
- [CylinderProps](modules.md#cylinderprops)
- [DebugApi](modules.md#debugapi)
- [DefaultContactMaterial](modules.md#defaultcontactmaterial)
- [EngineParams](modules.md#engineparams)
- [EntityParams](modules.md#entityparams)
- [EventHandler](modules.md#eventhandler)
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
- [QueryDescription](modules.md#querydescription)
- [RayHookOptions](modules.md#rayhookoptions)
- [RayMode](modules.md#raymode)
- [RayhitEvent](modules.md#rayhitevent)
- [Refs](modules.md#refs)
- [SceneParams](modules.md#sceneparams)
- [SerializableBodyProps](modules.md#serializablebodyprops)
- [SetOpName](modules.md#setopname)
- [ShapeType](modules.md#shapetype)
- [SpaceParams](modules.md#spaceparams)
- [SphereProps](modules.md#sphereprops)
- [SpringApi](modules.md#springapi)
- [Subscription](modules.md#subscription)
- [SubscriptionName](modules.md#subscriptionname)
- [SubscriptionTarget](modules.md#subscriptiontarget)
- [Subscriptions](modules.md#subscriptions)
- [SystemParams](modules.md#systemparams)
- [TrimeshArgs](modules.md#trimeshargs)
- [TrimeshProps](modules.md#trimeshprops)
- [Triplet](modules.md#triplet)
- [VectorApi](modules.md#vectorapi)
- [VectorName](modules.md#vectorname)
- [VectorProps](modules.md#vectorprops)
- [VectorTypes](modules.md#vectortypes)
- [ViewEventName](modules.md#vieweventname)
- [ViewInteractionEventSubscription](modules.md#viewinteractioneventsubscription)
- [ViewMouseEvent](modules.md#viewmouseevent)
- [ViewRectangle](modules.md#viewrectangle)
- [ViewRectangleParam](modules.md#viewrectangleparam)
- [ViewRectangleParamInput](modules.md#viewrectangleparaminput)
- [ViewRectangleParams](modules.md#viewrectangleparams)
- [ViewSize](modules.md#viewsize)
- [ViewTouch](modules.md#viewtouch)
- [ViewTouchEvent](modules.md#viewtouchevent)
- [WebGLRendererParams](modules.md#webglrendererparams)
- [WebGLViewParams](modules.md#webglviewparams)
- [WorkerApi](modules.md#workerapi)
- [WorkerCollideBeginEvent](modules.md#workercollidebeginevent)
- [WorkerCollideEndEvent](modules.md#workercollideendevent)
- [WorkerCollideEvent](modules.md#workercollideevent)
- [WorkerEventMessage](modules.md#workereventmessage)
- [WorkerFrameMessage](modules.md#workerframemessage)
- [WorkerRayhitEvent](modules.md#workerrayhitevent)
- [WorldContext](modules.md#worldcontext)
- [WorldParams](modules.md#worldparams)
- [WorldPropName](modules.md#worldpropname)
- [WorldProvider](modules.md#worldprovider)

### Variables

- [VIEW\_ALL\_EVENT\_NAMES](modules.md#view_all_event_names)
- [VIEW\_MOUSE\_EVENTS](modules.md#view_mouse_events)
- [VIEW\_TOUCH\_EVENTS](modules.md#view_touch_events)
- [atomicNames](modules.md#atomicnames)
- [subscriptionNames](modules.md#subscriptionnames)
- [vectorNames](modules.md#vectornames)

### Functions

- [uuid](modules.md#uuid)

## Type aliases

### AddRayMessage

Ƭ **AddRayMessage**: `WithUUID`<``"addRay"``, { `from?`: [`Triplet`](modules.md#triplet) ; `mode`: [`RayMode`](modules.md#raymode) ; `to?`: [`Triplet`](modules.md#triplet)  } & `Pick`<`RayOptions`, ``"checkCollisionResponse"`` \| ``"collisionFilterGroup"`` \| ``"collisionFilterMask"`` \| ``"skipBackfaces"``\>\>

#### Defined in

rapida-physics/lib/types.d.ts:177

___

### Api

Ƭ **Api**: [`Object3D`, [`PhysicsObjectApi`](interfaces/PhysicsObjectApi.md)]

#### Defined in

rapida-physics/lib/types.d.ts:14

___

### AtomicApi

Ƭ **AtomicApi**: { [K in AtomicName]: Object }

#### Defined in

rapida-physics/lib/types.d.ts:30

___

### AtomicName

Ƭ **AtomicName**: typeof [`atomicNames`](modules.md#atomicnames)[`number`]

#### Defined in

rapida-physics/lib/types.d.ts:8

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

rapida-physics/lib/types.d.ts:15

___

### BodyParams

Ƭ **BodyParams**<`T`\>: `Partial`<[`AtomicProps`](modules.md#atomicprops)\> & `Partial`<[`VectorProps`](modules.md#vectorprops)\> & { `args?`: `T` ; `type?`: [`BodyType`](enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](modules.md#collideendevent)) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

rapida-physics/lib/types.d.ts:342

___

### BodyPropsArgsRequired

Ƭ **BodyPropsArgsRequired**<`T`\>: [`BodyParams`](modules.md#bodyparams)<`T`\> & { `args`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

rapida-physics/lib/types.d.ts:349

___

### BodyShapeType

Ƭ **BodyShapeType**: [`ShapeType`](modules.md#shapetype) \| ``"Compound"``

#### Defined in

rapida-physics/lib/types.d.ts:353

___

### BoxProps

Ƭ **BoxProps**: [`BodyParams`](modules.md#bodyparams)<[`Triplet`](modules.md#triplet)\>

#### Defined in

rapida-physics/lib/types.d.ts:372

___

### Broadphase

Ƭ **Broadphase**: ``"Naive"`` \| ``"SAP"``

#### Defined in

rapida-physics/lib/types.d.ts:249

___

### Buffers

Ƭ **Buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `positions` | `Float32Array` |
| `quaternions` | `Float32Array` |

#### Defined in

rapida-physics/lib/types.d.ts:96

___

### CSSRendererParams

Ƭ **CSSRendererParams**: `Object`

Parameters for creating a CSSRenderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domElementId` | `string` |

#### Defined in

[rapida/src/renderer/css-renderer.ts:15](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/css-renderer.ts#L15)

___

### CSSViewParams

Ƭ **CSSViewParams**: `Object`

Params for creating a css view

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](classes/Camera.md) | The camera for the view |
| `scene` | [`Scene`](classes/Scene.md) | The scene for the view |
| `scissor?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The scissor for the view. Defaults to the full screen. |
| `viewport?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The viewport for the view. Defaults to the full screen. |
| `zIndex?` | `number` | The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on. Defaults to zero. |

#### Defined in

[rapida/src/renderer/css-view.ts:11](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/css-view.ts#L11)

___

### CameraParams

Ƭ **CameraParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `camera?` | `three.PerspectiveCamera` \| `three.OrthographicCamera` |
| `id?` | `string` |

#### Defined in

[rapida/src/camera/camera.ts:5](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/camera/camera.ts#L5)

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

rapida-physics/lib/types.d.ts:113

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

rapida-physics/lib/types.d.ts:118

___

### CollideEvent

Ƭ **CollideEvent**: `Omit`<[`WorkerCollideEvent`](modules.md#workercollideevent)[``"data"``], ``"body"`` \| ``"target"`` \| ``"contact"``\> & { `body`: `Object3D` ; `contact`: `Omit`<`WorkerContact`, ``"bi"`` \| ``"bj"``\> & { `bi`: `Object3D` ; `bj`: `Object3D`  } ; `target`: `Object3D` ; `topic`: `PhysicsEventTopic.COLLIDE`  }

#### Defined in

rapida-physics/lib/types.d.ts:104

___

### ComponentParams

Ƭ **ComponentParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/component.ts:6](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/component.ts#L6)

___

### ConstraintApi

Ƭ **ConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `enable`: () => `void`  }]

#### Defined in

rapida-physics/lib/types.d.ts:56

___

### ConstraintORHingeApi

Ƭ **ConstraintORHingeApi**<`T`\>: `T` extends [`ConstraintTypes`](modules.md#constrainttypes) ? [`ConstraintApi`](modules.md#constraintapi) : [`HingeConstraintApi`](modules.md#hingeconstraintapi)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"Hinge"`` \| [`ConstraintTypes`](modules.md#constrainttypes) |

#### Defined in

rapida-physics/lib/types.d.ts:87

___

### ConstraintTypes

Ƭ **ConstraintTypes**: ``"PointToPoint"`` \| ``"ConeTwist"`` \| ``"Distance"`` \| ``"Lock"``

#### Defined in

rapida-physics/lib/types.d.ts:86

___

### ConvexPolyhedronArgs

Ƭ **ConvexPolyhedronArgs**<`V`\>: [vertices?: V[], faces?: number[][], normals?: V[], axes?: V[], boundingSphereRadius?: number]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`VectorTypes`](modules.md#vectortypes) = [`VectorTypes`](modules.md#vectortypes) |

#### Defined in

rapida-physics/lib/types.d.ts:364

___

### ConvexPolyhedronProps

Ƭ **ConvexPolyhedronProps**: [`BodyParams`](modules.md#bodyparams)<[`ConvexPolyhedronArgs`](modules.md#convexpolyhedronargs)\>

#### Defined in

rapida-physics/lib/types.d.ts:378

___

### CylinderArgs

Ƭ **CylinderArgs**: [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number]

#### Defined in

rapida-physics/lib/types.d.ts:354

___

### CylinderProps

Ƭ **CylinderProps**: [`BodyParams`](modules.md#bodyparams)<[`CylinderArgs`](modules.md#cylinderargs)\>

#### Defined in

rapida-physics/lib/types.d.ts:373

___

### DebugApi

Ƭ **DebugApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`id`: `string`, `params`: [`BodyParams`](modules.md#bodyparams)<`unknown`\>, `type`: [`BodyShapeType`](modules.md#bodyshapetype)) => `void` |
| `remove` | (`id`: `string`) => `void` |

#### Defined in

rapida-physics/lib/types.d.ts:245

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

rapida-physics/lib/types.d.ts:446

___

### EngineParams

Ƭ **EngineParams**: `Object`

Parameters for creating a new rapida engine

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |

#### Defined in

rapida/src/engine/index.ts:9

___

### EntityParams

Ƭ **EntityParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components?` | [`Component`](classes/Component.md)[] |
| `id?` | `string` |

#### Defined in

[rapida/src/ecs/entity.ts:10](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/entity.ts#L10)

___

### EventHandler

Ƭ **EventHandler**<`E`\>: (`event`: `E`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](interfaces/Event.md) \| [`Event`](interfaces/Event.md) |

#### Type declaration

▸ (`event`): `void`

An event handler that takes an event or a type that extends the event type

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

##### Returns

`void`

#### Defined in

rapida-common/lib/events/event-handler.d.ts:5

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

rapida-physics/lib/types.d.ts:262

___

### HeightfieldArgs

Ƭ **HeightfieldArgs**: [data: number[][], options: Object]

#### Defined in

rapida-physics/lib/types.d.ts:356

___

### HeightfieldProps

Ƭ **HeightfieldProps**: [`BodyPropsArgsRequired`](modules.md#bodypropsargsrequired)<[`HeightfieldArgs`](modules.md#heightfieldargs)\>

#### Defined in

rapida-physics/lib/types.d.ts:377

___

### HingeConstraintApi

Ƭ **HingeConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `disableMotor`: () => `void` ; `enable`: () => `void` ; `enableMotor`: () => `void` ; `setMotorMaxForce`: (`value`: `number`) => `void` ; `setMotorSpeed`: (`value`: `number`) => `void`  }]

#### Defined in

rapida-physics/lib/types.d.ts:64

___

### IncomingWorkerMessage

Ƭ **IncomingWorkerMessage**: [`WorkerFrameMessage`](modules.md#workerframemessage) \| [`WorkerEventMessage`](modules.md#workereventmessage)

#### Defined in

rapida-physics/lib/types.d.ts:336

___

### LockConstraintOpts

Ƭ **LockConstraintOpts**: [`ConstraintOptns`](interfaces/ConstraintOptns.md)

#### Defined in

rapida-physics/lib/types.d.ts:410

___

### Observation

Ƭ **Observation**: { [K in AtomicName]: [id: number, value: PropValue<K\>, type: K] }[[`AtomicName`](modules.md#atomicname)]

#### Defined in

rapida-physics/lib/types.d.ts:250

___

### ParticleProps

Ƭ **ParticleProps**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

rapida-physics/lib/types.d.ts:374

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

rapida-physics/lib/types.d.ts:235

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

rapida-physics/lib/physics-debugger.d.ts:14

___

### PhysicsDebuggerColor

Ƭ **PhysicsDebuggerColor**: `string` \| `number` \| `Color`

Color for the physics debugger to use

#### Defined in

rapida-physics/lib/physics-debugger.d.ts:23

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

rapida-physics/lib/types.d.ts:454

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

rapida-physics/lib/types.d.ts:473

___

### PlaneProps

Ƭ **PlaneProps**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

rapida-physics/lib/types.d.ts:371

___

### PropValue

Ƭ **PropValue**<`T`\>: `T` extends [`AtomicName`](modules.md#atomicname) ? [`AtomicProps`](modules.md#atomicprops)[`T`] : `T` extends [`VectorName`](modules.md#vectorname) ? [`Triplet`](modules.md#triplet) : `T` extends ``"sliding"`` ? `boolean` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubscriptionName`](modules.md#subscriptionname) = [`SubscriptionName`](modules.md#subscriptionname) |

#### Defined in

rapida-physics/lib/types.d.ts:144

___

### PublicVectorName

Ƭ **PublicVectorName**: `Exclude`<[`VectorName`](modules.md#vectorname), ``"quaternion"``\> \| ``"rotation"``

#### Defined in

rapida-physics/lib/types.d.ts:13

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

[rapida/src/ecs/query.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/query.ts#L12)

___

### RayHookOptions

Ƭ **RayHookOptions**: `Omit`<[`AddRayMessage`](modules.md#addraymessage)[``"params"``], ``"mode"``\>

#### Defined in

rapida-physics/lib/types.d.ts:176

___

### RayMode

Ƭ **RayMode**: ``"Closest"`` \| ``"Any"`` \| ``"All"``

#### Defined in

rapida-physics/lib/types.d.ts:175

___

### RayhitEvent

Ƭ **RayhitEvent**: `Omit`<[`WorkerRayhitEvent`](modules.md#workerrayhitevent)[``"data"``], ``"body"``\> & { `body`: `Object3D` \| ``null`` ; `topic`: `PhysicsEventTopic.RAYHIT`  }

#### Defined in

rapida-physics/lib/types.d.ts:123

___

### Refs

Ƭ **Refs**: `Object`

#### Index signature

▪ [uuid: `string`]: `Object3D`

#### Defined in

rapida-physics/lib/types.d.ts:100

___

### SceneParams

Ƭ **SceneParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[rapida/src/scene/scene.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/scene/scene.ts#L4)

___

### SerializableBodyProps

Ƭ **SerializableBodyProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCollide` | `boolean` |

#### Defined in

rapida-physics/lib/types.d.ts:211

___

### SetOpName

Ƭ **SetOpName**<`T`\>: \`set${Capitalize<T\>}\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AtomicName`](modules.md#atomicname) \| [`VectorName`](modules.md#vectorname) \| [`WorldPropName`](modules.md#worldpropname) |

#### Defined in

rapida-physics/lib/types.d.ts:145

___

### ShapeType

Ƭ **ShapeType**: ``"Plane"`` \| ``"Box"`` \| ``"Cylinder"`` \| ``"Heightfield"`` \| ``"Particle"`` \| ``"Sphere"`` \| ``"Trimesh"`` \| ``"ConvexPolyhedron"``

#### Defined in

rapida-physics/lib/types.d.ts:352

___

### SpaceParams

Ƭ **SpaceParams**: `Object`

Params for creating a new Space

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | An id for the space, must be unique |

#### Defined in

[rapida/src/ecs/space.ts:17](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/space.ts#L17)

___

### SphereProps

Ƭ **SphereProps**: [`BodyParams`](modules.md#bodyparams)<`number`\>

#### Defined in

rapida-physics/lib/types.d.ts:375

___

### SpringApi

Ƭ **SpringApi**: [`string`, `Object3D`, `Object3D`, { `setDamping`: (`value`: `number`) => `void` ; `setRestLength`: (`value`: `number`) => `void` ; `setStiffness`: (`value`: `number`) => `void`  }]

#### Defined in

rapida-physics/lib/types.d.ts:76

___

### Subscription

Ƭ **Subscription**: `Partial`<{ [K in SubscriptionName]: Function }\>

#### Defined in

rapida-physics/lib/types.d.ts:138

___

### SubscriptionName

Ƭ **SubscriptionName**: typeof [`subscriptionNames`](modules.md#subscriptionnames)[`number`]

#### Defined in

rapida-physics/lib/types.d.ts:12

___

### SubscriptionTarget

Ƭ **SubscriptionTarget**: ``"bodies"`` \| ``"vehicles"``

#### Defined in

rapida-physics/lib/types.d.ts:221

___

### Subscriptions

Ƭ **Subscriptions**: `Partial`<{ [id: number]: [`Subscription`](modules.md#subscription);  }\>

#### Defined in

rapida-physics/lib/types.d.ts:141

___

### SystemParams

Ƭ **SystemParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `queries?` | `SystemQueries` |

#### Defined in

[rapida/src/ecs/system.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/ecs/system.ts#L12)

___

### TrimeshArgs

Ƭ **TrimeshArgs**: [vertices: ArrayLike<number\>, indices: ArrayLike<number\>]

#### Defined in

rapida-physics/lib/types.d.ts:355

___

### TrimeshProps

Ƭ **TrimeshProps**: [`BodyPropsArgsRequired`](modules.md#bodypropsargsrequired)<[`TrimeshArgs`](modules.md#trimeshargs)\>

#### Defined in

rapida-physics/lib/types.d.ts:376

___

### Triplet

Ƭ **Triplet**: [x: number, y: number, z: number]

#### Defined in

rapida-physics/lib/types.d.ts:4

___

### VectorApi

Ƭ **VectorApi**: { [K in PublicVectorName]: Object }

#### Defined in

rapida-physics/lib/types.d.ts:36

___

### VectorName

Ƭ **VectorName**: typeof [`vectorNames`](modules.md#vectornames)[`number`]

#### Defined in

rapida-physics/lib/types.d.ts:10

___

### VectorProps

Ƭ **VectorProps**: `Record`<[`PublicVectorName`](modules.md#publicvectorname), [`Triplet`](modules.md#triplet)\>

#### Defined in

rapida-physics/lib/types.d.ts:6

___

### VectorTypes

Ƭ **VectorTypes**: `Vector3` \| [`Triplet`](modules.md#triplet)

#### Defined in

rapida-physics/lib/types.d.ts:5

___

### ViewEventName

Ƭ **ViewEventName**<`T`\>: `T` extends keyof [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md) ? [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md)[`T`] : [`Event`](interfaces/Event.md)

Type for a view event name

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[rapida/src/renderer/view.ts:163](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L163)

___

### ViewInteractionEventSubscription

Ƭ **ViewInteractionEventSubscription**: `Object`

A view interaction event subscription that contains a method for unsubscribing

#### Type declaration

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[rapida/src/renderer/view.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L63)

___

### ViewMouseEvent

Ƭ **ViewMouseEvent**: `Object`

A mouse event for a webgl view

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `ExtendedMouseEvent` |
| `topic` | typeof [`VIEW_MOUSE_EVENTS`](modules.md#view_mouse_events)[`number`] |

#### Defined in

[rapida/src/renderer/view.ts:85](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L85)

___

### ViewRectangle

Ƭ **ViewRectangle**: `Object`

A view rectangle given by decimal percentage values

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L228)

___

### ViewRectangleParam

Ƭ **ViewRectangleParam**: `Object`

A view rectangle parameter with a type and value

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`ViewRectangleParamType`](enums/ViewRectangleParamType.md) |
| `value` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L181)

___

### ViewRectangleParamInput

Ƭ **ViewRectangleParamInput**: `string` \| `number` \| [`ViewRectangleParam`](modules.md#viewrectangleparam)

A ViewParam, which can either be a:
- decimal percentage (passthrough)
- number of pixels given by a string '<n>px'
- percentage of the dom container given by a string '<n>%'
- percentage of the screen size given by '<n>vw' or '<n>vh'

#### Defined in

[rapida/src/renderer/view.ts:193](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L193)

___

### ViewRectangleParams

Ƭ **ViewRectangleParams**: `Object`

ViewRectangleParams provides parameters for a view rectangle

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `height?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `left?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `right?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `top?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |
| `width?` | [`ViewRectangleParamInput`](modules.md#viewrectangleparaminput) |

#### Defined in

[rapida/src/renderer/view.ts:206](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L206)

___

### ViewSize

Ƭ **ViewSize**: `Object`

The size of a view in pixels

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `number` |
| `height` | `number` |
| `left` | `number` |
| `width` | `number` |

#### Defined in

[rapida/src/renderer/view.ts:218](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L218)

___

### ViewTouch

Ƭ **ViewTouch**: `Touch` & { `relativeX`: `number` ; `relativeY`: `number`  }

#### Defined in

[rapida/src/renderer/view.ts:90](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L90)

___

### ViewTouchEvent

Ƭ **ViewTouchEvent**: `Object`

A touch event for a webgl view

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.altKey` | `boolean` |
| `data.changedTouches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `data.ctrlKey` | `boolean` |
| `data.metaKey` | `boolean` |
| `data.shiftKey` | `boolean` |
| `data.targetTouches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `data.touches` | [`ViewTouch`](modules.md#viewtouch)[] |
| `topic` | typeof [`VIEW_MOUSE_EVENTS`](modules.md#view_mouse_events)[`number`] |

#### Defined in

[rapida/src/renderer/view.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L105)

___

### WebGLRendererParams

Ƭ **WebGLRendererParams**: `Object`

Params for creating a WebGLRenderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domElementId` | `string` |
| `renderer?` | `ThreeWebGLRenderer` |

#### Defined in

[rapida/src/renderer/webgl-renderer.ts:16](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/webgl-renderer.ts#L16)

___

### WebGLViewParams

Ƭ **WebGLViewParams**: `Object`

Params for creating a webgl view

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](classes/Camera.md) | The camera for the view |
| `clearColor?` | `Color` \| `string` | The clear color for the view |
| `clearDepth?` | `boolean` | Whether depth should be cleared after rendering this view |
| `id?` | `string` | A unique identifier for the view. Defaults to a uuid if unspecified |
| `scene` | [`Scene`](classes/Scene.md) | The scene for the view |
| `scissor?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The scissor for the view. Defaults to the full screen. |
| `viewport?` | [`ViewRectangleParams`](modules.md#viewrectangleparams) | The viewport for the view. Defaults to the full screen. |
| `zIndex?` | `number` | The z index for the view. Determines what order the views are rendered in, therefore what layer the view is on. Defaults to zero. |

#### Defined in

[rapida/src/renderer/webgl-view.ts:25](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/webgl-view.ts#L25)

___

### WorkerApi

Ƭ **WorkerApi**: [`AtomicApi`](modules.md#atomicapi) & [`VectorApi`](modules.md#vectorapi) & { `applyForce`: (`force`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalForce`: (`force`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyTorque`: (`torque`: [`Triplet`](modules.md#triplet)) => `void` ; `destroy`: () => `void` ; `sleep`: () => `void` ; `wakeUp`: () => `void`  }

#### Defined in

rapida-physics/lib/types.d.ts:43

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

rapida-physics/lib/types.d.ts:321

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

rapida-physics/lib/types.d.ts:328

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

rapida-physics/lib/types.d.ts:270

___

### WorkerEventMessage

Ƭ **WorkerEventMessage**: [`WorkerCollideEvent`](modules.md#workercollideevent) \| [`WorkerRayhitEvent`](modules.md#workerrayhitevent) \| [`WorkerCollideBeginEvent`](modules.md#workercollidebeginevent) \| [`WorkerCollideEndEvent`](modules.md#workercollideendevent)

#### Defined in

rapida-physics/lib/types.d.ts:335

___

### WorkerFrameMessage

Ƭ **WorkerFrameMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Buffers`](modules.md#buffers) & { `active`: `boolean` ; `bodies?`: `string`[] ; `observations`: [`Observation`](modules.md#observation)[] ; `topic`: `PhysicsEventTopic.FRAME`  } |
| `topic` | `PhysicsEventTopic.FRAME` |

#### Defined in

rapida-physics/lib/types.d.ts:253

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

rapida-physics/lib/types.d.ts:296

___

### WorldContext

Ƭ **WorldContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `engine` | [`Engine`](classes/Engine.md) |

#### Defined in

[rapida/src/world/world-provider.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world-provider.ts#L4)

___

### WorldParams

Ƭ **WorldParams**: `Object`

Params for creating a world

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `engine` | [`Engine`](classes/Engine.md) | The engine instance the world is in |
| `id?` | `string` | The unique id for the world |
| `maxGameLoopUpdatesPerSecond?` | `number` | The maximum game loop updates to run per second |
| `maxPhysicsUpdatesPerSecond?` | `number` | The maximum physics loop updates to run per second |

#### Defined in

[rapida/src/world/world.ts:29](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world.ts#L29)

___

### WorldPropName

Ƭ **WorldPropName**: ``"axisIndex"`` \| ``"broadphase"`` \| ``"gravity"`` \| ``"iterations"`` \| ``"tolerance"``

#### Defined in

rapida-physics/lib/types.d.ts:229

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

[rapida/src/world/world-provider.ts:8](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/world/world-provider.ts#L8)

## Variables

### VIEW\_ALL\_EVENT\_NAMES

• **VIEW\_ALL\_EVENT\_NAMES**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L27)

___

### VIEW\_MOUSE\_EVENTS

• **VIEW\_MOUSE\_EVENTS**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L42)

___

### VIEW\_TOUCH\_EVENTS

• **VIEW\_TOUCH\_EVENTS**: `string`[]

#### Defined in

[rapida/src/renderer/view.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida/src/renderer/view.ts#L53)

___

### atomicNames

• **atomicNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``]

#### Defined in

rapida-physics/lib/types.d.ts:7

___

### subscriptionNames

• **subscriptionNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``, ``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``, ``"sliding"``]

#### Defined in

rapida-physics/lib/types.d.ts:11

___

### vectorNames

• **vectorNames**: readonly [``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``]

#### Defined in

rapida-physics/lib/types.d.ts:9

## Functions

### uuid

▸ `Const` **uuid**(): `string`

#### Returns

`string`

#### Defined in

rapida-common/lib/util/uuid.d.ts:1
