import { uuid } from '../util/uuid';

/**
 * An event that can be broadcast and consumed by entities and components
 */
export interface Event {
  topic: string;
}

/**
 * An event subscription
 */
export type EventSubscription = {
  id: string;
  unsubscribe: () => void;
};

/**
 * An event handler that takes an event or a type that extends the event type
 */
export type EventHandler<E extends Event | Event> = (event: E) => void;

/**
 * A simple event handling system
 */
export class EventSystem {
  /**
   * The event handlers
   */
  private handlers: {
    [eventName: string]: { [handlerId: string]: EventHandler<Event> };
  } = {};

  /**
   * The events that will be processed on the next update
   */
  private buffer: Event[] = [];

  /**
   * Processes all events currently in the buffer
   */
  tick(): void {
    this.buffer
      .splice(0, this.buffer.length)
      .forEach((e: Event) => this.process(e));
  }

  /**
   * Adds a handler to the event system
   * @param eventName the event name
   * @param handlerName the name of the handler
   * @param handler the handler function
   * @returns the id of the new handler
   */
  on<E extends Event | Event>(
    eventName: string,
    handler: EventHandler<E>
  ): EventSubscription {
    const id = uuid();
    if (this.handlers[eventName] === undefined) {
      this.handlers[eventName] = {};
    }
    this.handlers[eventName][id] = handler as EventHandler<Event>;

    return {
      id,
      unsubscribe: () => this.removeHandler(eventName, id),
    };
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
   * The event will not be handled immediately, but will be put in the buffer for processing on the next tick
   * @param event the event to broadcast
   */
  emit(event: Event): void {
    this.buffer.push(event);
  }

  /**
   * Resets the event system
   */
  reset(): void {
    this.handlers = {};
    this.buffer = [];
  }

  /**
   * Processes an event with the given handler
   * @param event the event to process
   */
  private process(event: Event): void {
    const handlers = this.handlers[event.topic];
    if (handlers !== undefined) {
      Object.values(handlers).forEach((handler: EventHandler<Event>) =>
        handler(event)
      );
    }
  }
}
