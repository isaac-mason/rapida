import { uuid } from '../util/uuid';

/**
 * An event that can be broadcast and consumed by entities and components
 */
interface Event {
  topic: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

/**
 * An event handler that takes an event or a type that extends the event type
 */
type EventHandler = <E extends Event | Event>(event: E) => void;

/**
 * A simple event handling system
 */
class EventSystem {
  /**
   * Whether the event system is currently processing events
   * If false, events will be put in a buffer for processing
   */
  processing = false;

  /**
   * The event handlers
   */
  private handlers: {
    [eventName: string]: { [handlerId: string]: EventHandler };
  } = {};

  /**
   * The events that will be processed on the next update
   */
  private buffer: Event[] = [];

  /**
   * Starts processing events and processes all events in the buffer
   */
  start(): void {
    this.processing = true;
    this.buffer
      .splice(0, this.buffer.length)
      .forEach((e: Event) => this.process(e));
  }

  /**
   * Stops processing events.
   * Incoming events are put into a buffer and will be processed on calling start
   */
  stop(): void {
    this.processing = false;
  }

  /**
   * Adds a handler to the event system
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   * @returns the id of the new handler
   */
  on(eventName: string, handler: EventHandler): string {
    const id = uuid();
    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = {};
    }
    this.handlers[eventName][id] = handler;
    return id;
  }

  /**
   * Removes an event handler by handler id
   * @param eventName the name of the event
   * @param handlerId the id of the event handler
   */
  removeHandler(eventName: string, handlerId: string): void {
    if (this.handlers[eventName] !== undefined) {
      delete this.handlers[eventName][handlerId];
    }
  }

  /**
   * Emits an event for handling by the event system
   * @param event the event to broadcast
   */
  emit(event: Event): void {
    if (this.processing) {
      this.process(event);
    } else {
      this.buffer.push(event);
    }
  }

  /**
   * Processes an event with the given handler
   * @param event the event to process
   */
  private process(event: Event): void {
    const handlers = this.handlers[event.topic];
    if (handlers !== undefined) {
      Object.values(handlers).forEach((handler: EventHandler) =>
        handler(event)
      );
    }
  }
}

export { EventSystem, Event, EventHandler };
