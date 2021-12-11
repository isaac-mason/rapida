# Interface: CannonWorker

## Hierarchy

- `Worker`

  ↳ **`CannonWorker`**

## Table of contents

### Properties

- [onerror](CannonWorker.md#onerror)
- [onmessage](CannonWorker.md#onmessage)
- [onmessageerror](CannonWorker.md#onmessageerror)

### Methods

- [addEventListener](CannonWorker.md#addeventlistener)
- [dispatchEvent](CannonWorker.md#dispatchevent)
- [postMessage](CannonWorker.md#postmessage)
- [removeEventListener](CannonWorker.md#removeeventlistener)
- [terminate](CannonWorker.md#terminate)

## Properties

### onerror

• **onerror**: ``null`` \| (`ev`: `ErrorEvent`) => `any`

#### Inherited from

Worker.onerror

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:1970

___

### onmessage

• **onmessage**: ``null`` \| (`ev`: `MessageEvent`<`any`\>) => `any`

#### Inherited from

Worker.onmessage

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17432

___

### onmessageerror

• **onmessageerror**: ``null`` \| (`ev`: `MessageEvent`<`any`\>) => `any`

#### Inherited from

Worker.onmessageerror

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17433

## Methods

### addEventListener

▸ **addEventListener**<`K`\>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `WorkerEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`ev`: `WorkerEventMap`[`K`]) => `any` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.addEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17443

▸ **addEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.addEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17444

▸ **addEventListener**<`K`\>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `WorkerEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`ev`: `WorkerEventMap`[`K`]) => `any` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.addEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:5389

▸ **addEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.addEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:5390

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

Worker.dispatchEvent

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:5210

▸ **dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

Worker.dispatchEvent

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:1480

___

### postMessage

▸ **postMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |

#### Returns

`void`

#### Overrides

Worker.postMessage

#### Defined in

rapida-physics/lib/types.d.ts:233

___

### removeEventListener

▸ **removeEventListener**<`K`\>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `WorkerEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`ev`: `WorkerEventMap`[`K`]) => `any` |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.removeEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17445

▸ **removeEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.removeEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17446

▸ **removeEventListener**<`K`\>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `WorkerEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`ev`: `WorkerEventMap`[`K`]) => `any` |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.removeEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:5391

▸ **removeEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

Worker.removeEventListener

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:5392

___

### terminate

▸ **terminate**(): `void`

Aborts worker's associated global environment.

#### Returns

`void`

#### Inherited from

Worker.terminate

#### Defined in

rapida/node_modules/typescript/lib/lib.dom.d.ts:17442

▸ **terminate**(): `void`

Aborts worker's associated global environment.

#### Returns

`void`

#### Inherited from

Worker.terminate

#### Defined in

rapida/node_modules/typescript/lib/lib.webworker.d.ts:5388
