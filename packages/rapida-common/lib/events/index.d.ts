/**
 * An event that can be broadcast and consumed by entities and components
 */
interface Event {
    topic: string;
    data: any;
}
/**
 * An event handler that takes an event or a type that extends the event type
 */
declare type EventHandler = <C extends Event | Event>(event: C) => void;
/**
 * A simple event handling system
 */
declare class EventSystem {
    /**
     * Whether the event system is currently processing events
     * If false, events will be put in a buffer for processing
     */
    processing: boolean;
    /**
     * The event handlers
     */
    private handlers;
    /**
     * The events that will be processed on the next update
     */
    private buffer;
    /**
     * Starts processing events and processes all events in the buffer
     */
    start(): void;
    /**
     * Stops processing events.
     * Incoming events are put into a buffer and will be processed on calling start
     */
    stop(): void;
    /**
     * Adds a handler to the event system
     * @param eventName the event name
     * @param handlerName the name of the handler
     * @param handler the handler function
     * @returns the id of the new handler
     */
    on(eventName: string, handler: EventHandler): string;
    /**
     * Removes an event handler by handler id
     * @param eventName the name of the event
     * @param handlerId the id of the event handler
     */
    removeHandler(eventName: string, handlerId: string): void;
    /**
     * Emits an event for handling by the event system
     * @param event the event to broadcast
     */
    emit(event: Event): void;
    /**
     * Processes an event with the given handler
     * @param event the event to process
     */
    private process;
}
export { EventSystem, Event, EventHandler };
