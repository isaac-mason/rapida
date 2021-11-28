# Class: NetworkManager

Network manager for communicating with a rapida server

## Table of contents

### Constructors

- [constructor](NetworkManager.md#constructor)

### Properties

- [clientId](NetworkManager.md#clientid)
- [emitBuffer](NetworkManager.md#emitbuffer)
- [handlers](NetworkManager.md#handlers)
- [processBuffer](NetworkManager.md#processbuffer)
- [room](NetworkManager.md#room)
- [socket](NetworkManager.md#socket)

### Methods

- [emit](NetworkManager.md#emit)
- [join](NetworkManager.md#join)
- [on](NetworkManager.md#on)
- [removeHandler](NetworkManager.md#removehandler)
- [tick](NetworkManager.md#tick)

## Constructors

### constructor

• **new NetworkManager**()

## Properties

### clientId

• `Optional` **clientId**: `string`

The clients unique id. Set after the room has been joined.

#### Defined in

[rapida/src/network/network-manager.ts:17](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L17)

___

### emitBuffer

• `Private` **emitBuffer**: [`Event`](../interfaces/Event.md)[] = `[]`

A buffer of events waiting to be emitted

#### Defined in

[rapida/src/network/network-manager.ts:29](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L29)

___

### handlers

• `Private` **handlers**: `Object` = `{}`

Handlers for the room

#### Index signature

▪ [eventName: `string`]: { [handlerName: string]: [`EventHandler`](../modules.md#eventhandler);  }

#### Defined in

[rapida/src/network/network-manager.ts:22](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L22)

___

### processBuffer

• `Private` **processBuffer**: [`Event`](../interfaces/Event.md)[] = `[]`

A buffer of events waiting to be processed

#### Defined in

[rapida/src/network/network-manager.ts:34](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L34)

___

### room

• `Optional` **room**: `Room`

The current room

#### Defined in

[rapida/src/network/network-manager.ts:12](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L12)

___

### socket

• `Protected` `Optional` **socket**: `Socket`<`DefaultEventsMap`, `DefaultEventsMap`\>

The client socket.io socket

#### Defined in

[rapida/src/network/network-manager.ts:39](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L39)

## Methods

### emit

▸ **emit**<`E`\>(`event`): `void`

Emits an event to the room

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Event`](../interfaces/Event.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `E` | the event to emit |

#### Returns

`void`

#### Defined in

[rapida/src/network/network-manager.ts:135](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L135)

___

### join

▸ **join**(`id`, `endpoint`): `void`

Joins the room

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | the id of the room to join |
| `endpoint` | `string` | the game server endpoint |

#### Returns

`void`

#### Defined in

[rapida/src/network/network-manager.ts:76](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L76)

___

### on

▸ **on**(`eventName`, `handler`): `string`

Adds a room handler

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the event name |
| `handler` | [`EventHandler`](../modules.md#eventhandler) | the handler function |

#### Returns

`string`

the id of the created room handler

#### Defined in

[rapida/src/network/network-manager.ts:111](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L111)

___

### removeHandler

▸ **removeHandler**(`eventName`, `handlerId`): `void`

Removes an event handler by handler id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | the name of the event |
| `handlerId` | `string` | the id of the event handler |

#### Returns

`void`

#### Defined in

[rapida/src/network/network-manager.ts:125](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L125)

___

### tick

▸ **tick**(): `void`

Emits events in the emit buffer, broadcasts events in the process buffer

#### Returns

`void`

#### Defined in

[rapida/src/network/network-manager.ts:44](https://gitlab.com/isaacmason/rapida/-/blob/bdcd146/packages/rapida/src/network/network-manager.ts#L44)
