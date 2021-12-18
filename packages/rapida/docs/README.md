# @rapidajs/rapida

## Table of contents

### Enumerations

- [BodyType](enums/BodyType.md)
- [QueryConditionType](enums/QueryConditionType.md)
- [ViewInteractionEvent](enums/ViewInteractionEvent.md)
- [ViewRectangleParamPlane](enums/ViewRectangleParamPlane.md)
- [ViewRectangleParamType](enums/ViewRectangleParamType.md)
- [XRRendererMode](enums/XRRendererMode.md)

### Classes

- [CSSRenderer](classes/CSSRenderer.md)
- [CSSView](classes/CSSView.md)
- [Camera](classes/Camera.md)
- [Component](classes/Component.md)
- [Engine](classes/Engine.md)
- [Entity](classes/Entity.md)
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
- [XRRenderer](classes/XRRenderer.md)

### Interfaces

- [CannonWorker](interfaces/CannonWorker.md)
- [CompoundBodyParams](interfaces/CompoundBodyParams.md)
- [ConeTwistConstraintOpts](interfaces/ConeTwistConstraintOpts.md)
- [ConstraintOptns](interfaces/ConstraintOptns.md)
- [DistanceConstraintOpts](interfaces/DistanceConstraintOpts.md)
- [Event](interfaces/Event.md)
- [HingeConstraintOpts](interfaces/HingeConstraintOpts.md)
- [PhysicsDebuggerParams](interfaces/PhysicsDebuggerParams.md)
- [PhysicsObjectApi](interfaces/PhysicsObjectApi.md)
- [PointToPointConstraintOpts](interfaces/PointToPointConstraintOpts.md)
- [RaycastVehicleParams](interfaces/RaycastVehicleParams.md)
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
- [AtomicParams](modules.md#atomicparams)
- [BodyParams](modules.md#bodyparams)
- [BodyParamsArgsRequired](modules.md#bodyparamsargsrequired)
- [BodyShapeType](modules.md#bodyshapetype)
- [BoxCreationParams](modules.md#boxcreationparams)
- [BoxParams](modules.md#boxparams)
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
- [ConvexPolyhedronParams](modules.md#convexpolyhedronparams)
- [CylinderArgs](modules.md#cylinderargs)
- [CylinderCreationParams](modules.md#cylindercreationparams)
- [CylinderParams](modules.md#cylinderparams)
- [DebugApi](modules.md#debugapi)
- [DefaultContactMaterial](modules.md#defaultcontactmaterial)
- [EngineParams](modules.md#engineparams)
- [EntityParams](modules.md#entityparams)
- [EventHandler](modules.md#eventhandler)
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
- [QueryDescription](modules.md#querydescription)
- [RayHookOptions](modules.md#rayhookoptions)
- [RayMode](modules.md#raymode)
- [RayhitEvent](modules.md#rayhitevent)
- [Refs](modules.md#refs)
- [SceneParams](modules.md#sceneparams)
- [SerializableBodyParams](modules.md#serializablebodyparams)
- [SetOpName](modules.md#setopname)
- [ShapeType](modules.md#shapetype)
- [SpaceParams](modules.md#spaceparams)
- [SphereCreationParams](modules.md#spherecreationparams)
- [SphereParams](modules.md#sphereparams)
- [SpringApi](modules.md#springapi)
- [Subscription](modules.md#subscription)
- [SubscriptionName](modules.md#subscriptionname)
- [SubscriptionTarget](modules.md#subscriptiontarget)
- [Subscriptions](modules.md#subscriptions)
- [SystemParams](modules.md#systemparams)
- [TrimeshArgs](modules.md#trimeshargs)
- [TrimeshParams](modules.md#trimeshparams)
- [Triplet](modules.md#triplet)
- [VectorApi](modules.md#vectorapi)
- [VectorName](modules.md#vectorname)
- [VectorParams](modules.md#vectorparams)
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
- [XRRendererParams](modules.md#xrrendererparams)

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

packages/rapida-physics/lib/next/types.d.ts:214

___

### Api

Ƭ **Api**: [`Object3D`, [`PhysicsObjectApi`](interfaces/PhysicsObjectApi.md)]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:14

___

### AtomicApi

Ƭ **AtomicApi**: { [K in AtomicName]: Object }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:67

___

### AtomicName

Ƭ **AtomicName**: typeof [`atomicNames`](modules.md#atomicnames)[`number`]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:8

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

packages/rapida-physics/lib/next/types.d.ts:15

___

### BodyParams

Ƭ **BodyParams**<`T`\>: `Partial`<[`AtomicParams`](modules.md#atomicparams)\> & `Partial`<[`VectorParams`](modules.md#vectorparams)\> & { `args?`: `T` ; `type?`: [`BodyType`](enums/BodyType.md) ; `onCollide?`: (`e`: [`CollideEvent`](modules.md#collideevent)) => `void` ; `onCollideBegin?`: (`e`: [`CollideBeginEvent`](modules.md#collidebeginevent)) => `void` ; `onCollideEnd?`: (`e`: [`CollideEndEvent`](modules.md#collideendevent)) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:379

___

### BodyParamsArgsRequired

Ƭ **BodyParamsArgsRequired**<`T`\>: [`BodyParams`](modules.md#bodyparams)<`T`\> & { `args`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:386

___

### BodyShapeType

Ƭ **BodyShapeType**: [`ShapeType`](modules.md#shapetype) \| ``"Compound"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:390

___

### BoxCreationParams

Ƭ **BoxCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `size`: [`Triplet`](modules.md#triplet)  }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:409

___

### BoxParams

Ƭ **BoxParams**: [`BodyParams`](modules.md#bodyparams)<[`Triplet`](modules.md#triplet)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:412

___

### Broadphase

Ƭ **Broadphase**: ``"Naive"`` \| ``"SAP"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:286

___

### Buffers

Ƭ **Buffers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `positions` | `Float32Array` |
| `quaternions` | `Float32Array` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:133

___

### CSSRendererParams

Ƭ **CSSRendererParams**: `Object`

Parameters for creating a CSSRenderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domElementId` | `string` |

#### Defined in

[packages/rapida/src/renderer/css/css-renderer.ts:15](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/css/css-renderer.ts#L15)

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

[packages/rapida/src/renderer/css/css-view.ts:11](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/css/css-view.ts#L11)

___

### CameraParams

Ƭ **CameraParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `camera?` | `three.PerspectiveCamera` \| `three.OrthographicCamera` |
| `id?` | `string` |

#### Defined in

[packages/rapida/src/camera/camera.ts:5](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/camera/camera.ts#L5)

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

packages/rapida-physics/lib/next/types.d.ts:150

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

packages/rapida-physics/lib/next/types.d.ts:155

___

### CollideEvent

Ƭ **CollideEvent**: `Omit`<[`WorkerCollideEvent`](modules.md#workercollideevent)[``"data"``], ``"body"`` \| ``"target"`` \| ``"contact"``\> & { `body`: `Object3D` ; `contact`: `Omit`<`WorkerContact`, ``"bi"`` \| ``"bj"``\> & { `bi`: `Object3D` ; `bj`: `Object3D`  } ; `target`: `Object3D` ; `topic`: `PhysicsEventTopic.COLLIDE`  }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:141

___

### ComponentParams

Ƭ **ComponentParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[packages/rapida/src/ecs/component.ts:6](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/component.ts#L6)

___

### ConstraintApi

Ƭ **ConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `enable`: () => `void`  }]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:93

___

### ConstraintORHingeApi

Ƭ **ConstraintORHingeApi**<`T`\>: `T` extends [`ConstraintTypes`](modules.md#constrainttypes) ? [`ConstraintApi`](modules.md#constraintapi) : [`HingeConstraintApi`](modules.md#hingeconstraintapi)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"Hinge"`` \| [`ConstraintTypes`](modules.md#constrainttypes) |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:124

___

### ConstraintTypes

Ƭ **ConstraintTypes**: ``"PointToPoint"`` \| ``"ConeTwist"`` \| ``"Distance"`` \| ``"Lock"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:123

___

### ConvexPolyhedronArgs

Ƭ **ConvexPolyhedronArgs**<`V`\>: [vertices?: V[], faces?: number[][], normals?: V[], axes?: V[], boundingSphereRadius?: number]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`VectorTypes`](modules.md#vectortypes) = [`VectorTypes`](modules.md#vectortypes) |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:401

___

### ConvexPolyhedronParams

Ƭ **ConvexPolyhedronParams**: [`BodyParams`](modules.md#bodyparams)<[`ConvexPolyhedronArgs`](modules.md#convexpolyhedronargs)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:448

___

### CylinderArgs

Ƭ **CylinderArgs**: [radiusTop?: number, radiusBottom?: number, height?: number, numSegments?: number]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:391

___

### CylinderCreationParams

Ƭ **CylinderCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `height?`: `number` ; `numSegments?`: `number` ; `radiusBottom?`: `number` ; `radiusTop?`: `number`  }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:413

___

### CylinderParams

Ƭ **CylinderParams**: [`BodyParams`](modules.md#bodyparams)<[`CylinderArgs`](modules.md#cylinderargs)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:431

___

### DebugApi

Ƭ **DebugApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`id`: `string`, `params`: [`BodyParams`](modules.md#bodyparams)<`unknown`\>, `type`: [`BodyShapeType`](modules.md#bodyshapetype)) => `void` |
| `remove` | (`id`: `string`) => `void` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:282

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

packages/rapida-physics/lib/next/types.d.ts:516

___

### EngineParams

Ƭ **EngineParams**: `Object`

Parameters for creating a new rapida engine

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |

#### Defined in

[packages/rapida/src/engine/index.ts:9](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/engine/index.ts#L9)

___

### EntityParams

Ƭ **EntityParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components?` | [`Component`](classes/Component.md)[] |
| `id?` | `string` |

#### Defined in

[packages/rapida/src/ecs/entity.ts:10](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/entity.ts#L10)

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

packages/rapida-common/lib/events/event-handler.d.ts:5

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

packages/rapida-physics/lib/next/types.d.ts:299

___

### HeightfieldArgs

Ƭ **HeightfieldArgs**: [data: number[][], options: Object]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:393

___

### HeightfieldParams

Ƭ **HeightfieldParams**: [`BodyParamsArgsRequired`](modules.md#bodyparamsargsrequired)<[`HeightfieldArgs`](modules.md#heightfieldargs)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:447

___

### HingeConstraintApi

Ƭ **HingeConstraintApi**: [`Object3D`, `Object3D`, { `disable`: () => `void` ; `disableMotor`: () => `void` ; `enable`: () => `void` ; `enableMotor`: () => `void` ; `setMotorMaxForce`: (`value`: `number`) => `void` ; `setMotorSpeed`: (`value`: `number`) => `void`  }]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:101

___

### IncomingWorkerMessage

Ƭ **IncomingWorkerMessage**: [`WorkerFrameMessage`](modules.md#workerframemessage) \| [`WorkerEventMessage`](modules.md#workereventmessage)

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:373

___

### LockConstraintOpts

Ƭ **LockConstraintOpts**: [`ConstraintOptns`](interfaces/ConstraintOptns.md)

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:480

___

### Observation

Ƭ **Observation**: { [K in AtomicName]: [id: number, value: PropValue<K\>, type: K] }[[`AtomicName`](modules.md#atomicname)]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:287

___

### ParticleParams

Ƭ **ParticleParams**: [`BodyParams`](modules.md#bodyparams)

Params for creating a particle

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:435

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

packages/rapida-physics/lib/next/types.d.ts:272

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

packages/rapida-physics/lib/next/physics-debugger.d.ts:14

___

### PhysicsDebuggerColor

Ƭ **PhysicsDebuggerColor**: `string` \| `number` \| `Color`

Color for the physics debugger to use

#### Defined in

packages/rapida-physics/lib/next/physics-debugger.d.ts:23

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

packages/rapida-physics/lib/next/types.d.ts:524

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

packages/rapida-physics/lib/next/types.d.ts:543

___

### PlaneParams

Ƭ **PlaneParams**: [`BodyParams`](modules.md#bodyparams)

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:408

___

### PropValue

Ƭ **PropValue**<`T`\>: `T` extends [`AtomicName`](modules.md#atomicname) ? [`AtomicParams`](modules.md#atomicparams)[`T`] : `T` extends [`VectorName`](modules.md#vectorname) ? [`Triplet`](modules.md#triplet) : `T` extends ``"sliding"`` ? `boolean` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubscriptionName`](modules.md#subscriptionname) = [`SubscriptionName`](modules.md#subscriptionname) |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:181

___

### PublicVectorName

Ƭ **PublicVectorName**: `Exclude`<[`VectorName`](modules.md#vectorname), ``"quaternion"``\> \| ``"rotation"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:13

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

[packages/rapida/src/ecs/query.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/query.ts#L12)

___

### RayHookOptions

Ƭ **RayHookOptions**: `Omit`<[`AddRayMessage`](modules.md#addraymessage)[``"params"``], ``"mode"``\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:213

___

### RayMode

Ƭ **RayMode**: ``"Closest"`` \| ``"Any"`` \| ``"All"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:212

___

### RayhitEvent

Ƭ **RayhitEvent**: `Omit`<[`WorkerRayhitEvent`](modules.md#workerrayhitevent)[``"data"``], ``"body"``\> & { `body`: `Object3D` \| ``null`` ; `topic`: `PhysicsEventTopic.RAYHIT`  }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:160

___

### Refs

Ƭ **Refs**: `Object`

#### Index signature

▪ [uuid: `string`]: `Object3D`

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:137

___

### SceneParams

Ƭ **SceneParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Defined in

[packages/rapida/src/scene/scene.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/scene/scene.ts#L4)

___

### SerializableBodyParams

Ƭ **SerializableBodyParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCollide` | `boolean` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:248

___

### SetOpName

Ƭ **SetOpName**<`T`\>: \`set${Capitalize<T\>}\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`AtomicName`](modules.md#atomicname) \| [`VectorName`](modules.md#vectorname) \| [`WorldPropName`](modules.md#worldpropname) |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:182

___

### ShapeType

Ƭ **ShapeType**: ``"Plane"`` \| ``"Box"`` \| ``"Cylinder"`` \| ``"Heightfield"`` \| ``"Particle"`` \| ``"Sphere"`` \| ``"Trimesh"`` \| ``"ConvexPolyhedron"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:389

___

### SpaceParams

Ƭ **SpaceParams**: `Object`

Params for creating a new Space

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | An id for the space, must be unique |

#### Defined in

[packages/rapida/src/ecs/space.ts:17](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/space.ts#L17)

___

### SphereCreationParams

Ƭ **SphereCreationParams**: [`BodyParams`](modules.md#bodyparams) & { `radius`: `number`  }

Params for creating a sphere

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:439

___

### SphereParams

Ƭ **SphereParams**: [`BodyParams`](modules.md#bodyparams)<`number`\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:445

___

### SpringApi

Ƭ **SpringApi**: [`string`, `Object3D`, `Object3D`, { `setDamping`: (`value`: `number`) => `void` ; `setRestLength`: (`value`: `number`) => `void` ; `setStiffness`: (`value`: `number`) => `void`  }]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:113

___

### Subscription

Ƭ **Subscription**: `Partial`<{ [K in SubscriptionName]: Function }\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:175

___

### SubscriptionName

Ƭ **SubscriptionName**: typeof [`subscriptionNames`](modules.md#subscriptionnames)[`number`]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:12

___

### SubscriptionTarget

Ƭ **SubscriptionTarget**: ``"bodies"`` \| ``"vehicles"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:258

___

### Subscriptions

Ƭ **Subscriptions**: `Partial`<{ [id: number]: [`Subscription`](modules.md#subscription);  }\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:178

___

### SystemParams

Ƭ **SystemParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id?` | `string` |
| `queries?` | `SystemQueries` |

#### Defined in

[packages/rapida/src/ecs/system.ts:12](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/ecs/system.ts#L12)

___

### TrimeshArgs

Ƭ **TrimeshArgs**: [vertices: ArrayLike<number\>, indices: ArrayLike<number\>]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:392

___

### TrimeshParams

Ƭ **TrimeshParams**: [`BodyParamsArgsRequired`](modules.md#bodyparamsargsrequired)<[`TrimeshArgs`](modules.md#trimeshargs)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:446

___

### Triplet

Ƭ **Triplet**: [x: number, y: number, z: number]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:4

___

### VectorApi

Ƭ **VectorApi**: { [K in PublicVectorName]: Object }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:73

___

### VectorName

Ƭ **VectorName**: typeof [`vectorNames`](modules.md#vectornames)[`number`]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:10

___

### VectorParams

Ƭ **VectorParams**: `Record`<[`PublicVectorName`](modules.md#publicvectorname), [`Triplet`](modules.md#triplet)\>

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:6

___

### VectorTypes

Ƭ **VectorTypes**: `Vector3` \| [`Triplet`](modules.md#triplet)

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:5

___

### ViewEventName

Ƭ **ViewEventName**<`T`\>: `T` extends keyof [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md) ? [`ViewInteractionEventMap`](interfaces/ViewInteractionEventMap.md)[`T`] : [`Event`](interfaces/Event.md)

Type for a view event name

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[packages/rapida/src/renderer/view.ts:163](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L163)

___

### ViewInteractionEventSubscription

Ƭ **ViewInteractionEventSubscription**: `Object`

A view interaction event subscription that contains a method for unsubscribing

#### Type declaration

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[packages/rapida/src/renderer/view.ts:63](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L63)

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

[packages/rapida/src/renderer/view.ts:85](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L85)

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

[packages/rapida/src/renderer/view.ts:228](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L228)

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

[packages/rapida/src/renderer/view.ts:181](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L181)

___

### ViewRectangleParamInput

Ƭ **ViewRectangleParamInput**: `string` \| `number` \| [`ViewRectangleParam`](modules.md#viewrectangleparam)

A ViewParam, which can either be a:
- decimal percentage (passthrough)
- number of pixels given by a string '<n>px'
- percentage of the dom container given by a string '<n>%'
- percentage of the screen size given by '<n>vw' or '<n>vh'

#### Defined in

[packages/rapida/src/renderer/view.ts:193](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L193)

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

[packages/rapida/src/renderer/view.ts:206](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L206)

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

[packages/rapida/src/renderer/view.ts:218](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L218)

___

### ViewTouch

Ƭ **ViewTouch**: `Touch` & { `relativeX`: `number` ; `relativeY`: `number`  }

#### Defined in

[packages/rapida/src/renderer/view.ts:90](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L90)

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

[packages/rapida/src/renderer/view.ts:105](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L105)

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

[packages/rapida/src/renderer/webgl/webgl-renderer.ts:16](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-renderer.ts#L16)

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

[packages/rapida/src/renderer/webgl/webgl-view.ts:25](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/webgl/webgl-view.ts#L25)

___

### WorkerApi

Ƭ **WorkerApi**: [`AtomicApi`](modules.md#atomicapi) & [`VectorApi`](modules.md#vectorapi) & { `applyForce`: (`force`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `worldPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalForce`: (`force`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyLocalImpulse`: (`impulse`: [`Triplet`](modules.md#triplet), `localPoint`: [`Triplet`](modules.md#triplet)) => `void` ; `applyTorque`: (`torque`: [`Triplet`](modules.md#triplet)) => `void` ; `destroy`: () => `void` ; `sleep`: () => `void` ; `wakeUp`: () => `void`  }

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:80

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

packages/rapida-physics/lib/next/types.d.ts:358

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

packages/rapida-physics/lib/next/types.d.ts:365

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

packages/rapida-physics/lib/next/types.d.ts:307

___

### WorkerEventMessage

Ƭ **WorkerEventMessage**: [`WorkerCollideEvent`](modules.md#workercollideevent) \| [`WorkerRayhitEvent`](modules.md#workerrayhitevent) \| [`WorkerCollideBeginEvent`](modules.md#workercollidebeginevent) \| [`WorkerCollideEndEvent`](modules.md#workercollideendevent)

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:372

___

### WorkerFrameMessage

Ƭ **WorkerFrameMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Buffers`](modules.md#buffers) & { `active`: `boolean` ; `bodies?`: `string`[] ; `observations`: [`Observation`](modules.md#observation)[] ; `topic`: `PhysicsEventTopic.FRAME`  } |
| `topic` | `PhysicsEventTopic.FRAME` |

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:290

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

packages/rapida-physics/lib/next/types.d.ts:333

___

### WorldContext

Ƭ **WorldContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `engine` | [`Engine`](classes/Engine.md) |

#### Defined in

[packages/rapida/src/world/world-provider.ts:4](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/world/world-provider.ts#L4)

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

[packages/rapida/src/world/world.ts:30](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/world/world.ts#L30)

___

### WorldPropName

Ƭ **WorldPropName**: ``"axisIndex"`` \| ``"broadphase"`` \| ``"gravity"`` \| ``"iterations"`` \| ``"tolerance"``

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:266

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

[packages/rapida/src/world/world-provider.ts:8](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/world/world-provider.ts#L8)

___

### XRRendererParams

Ƭ **XRRendererParams**: `Object`

Params for creating a new VRRenderer

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appendButton?` | `boolean` | Whether a VR/AR button should be appended that will launch on click |
| `camera` | [`Camera`](classes/Camera.md) | The camera to render with |
| `domElementId` | `string` | The dom element id for the xr renderer |
| `mode` | [`XRRendererMode`](enums/XRRendererMode.md) | The mode for the xr renderer, VR or AR |
| `renderer?` | `WebGLRenderer` | The three WebGLRenderer to use |
| `scene` | [`Scene`](classes/Scene.md) | The scene to render |

#### Defined in

[packages/rapida/src/renderer/xr/xr-renderer.ts:31](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/xr/xr-renderer.ts#L31)

## Variables

### VIEW\_ALL\_EVENT\_NAMES

• **VIEW\_ALL\_EVENT\_NAMES**: `string`[]

#### Defined in

[packages/rapida/src/renderer/view.ts:27](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L27)

___

### VIEW\_MOUSE\_EVENTS

• **VIEW\_MOUSE\_EVENTS**: `string`[]

#### Defined in

[packages/rapida/src/renderer/view.ts:42](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L42)

___

### VIEW\_TOUCH\_EVENTS

• **VIEW\_TOUCH\_EVENTS**: `string`[]

#### Defined in

[packages/rapida/src/renderer/view.ts:53](https://gitlab.com/rapidajs/rapida/-/blob/795fd7e/packages/rapida/src/renderer/view.ts#L53)

___

### atomicNames

• **atomicNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:7

___

### subscriptionNames

• **subscriptionNames**: readonly [``"allowSleep"``, ``"angularDamping"``, ``"collisionFilterGroup"``, ``"collisionFilterMask"``, ``"collisionResponse"``, ``"fixedRotation"``, ``"isTrigger"``, ``"linearDamping"``, ``"mass"``, ``"material"``, ``"sleepSpeedLimit"``, ``"sleepTimeLimit"``, ``"userData"``, ``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``, ``"sliding"``]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:11

___

### vectorNames

• **vectorNames**: readonly [``"angularFactor"``, ``"angularVelocity"``, ``"linearFactor"``, ``"position"``, ``"quaternion"``, ``"velocity"``]

#### Defined in

packages/rapida-physics/lib/next/types.d.ts:9

## Functions

### uuid

▸ `Const` **uuid**(): `string`

#### Returns

`string`

#### Defined in

packages/rapida-common/lib/util/uuid.d.ts:1
