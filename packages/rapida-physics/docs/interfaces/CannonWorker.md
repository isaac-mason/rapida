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

node_modules/typescript/lib/lib.dom.d.ts:1922

___

### onmessage

• **onmessage**: ``null`` \| (`ev`: `MessageEvent`<`any`\>) => `any`

#### Inherited from

Worker.onmessage

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:16320

___

### onmessageerror

• **onmessageerror**: ``null`` \| (`ev`: `MessageEvent`<`any`\>) => `any`

#### Inherited from

Worker.onmessageerror

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:16321

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

node_modules/typescript/lib/lib.dom.d.ts:16327

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

node_modules/typescript/lib/lib.dom.d.ts:16328

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

node_modules/typescript/lib/lib.dom.d.ts:4983

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

[src/types.ts:348](https://gitlab.com/rapidajs/rapida/-/blob/ac79872/packages/rapida-physics/src/types.ts#L348)

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

node_modules/typescript/lib/lib.dom.d.ts:16329

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

node_modules/typescript/lib/lib.dom.d.ts:16330

___

### terminate

▸ **terminate**(): `void`

Aborts worker's associated global environment.

#### Returns

`void`

#### Inherited from

Worker.terminate

#### Defined in

node_modules/typescript/lib/lib.dom.d.ts:16326
