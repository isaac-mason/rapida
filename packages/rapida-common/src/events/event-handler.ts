import Event from './event';

/**
 * An event handler that takes an event or a type that extends the event type
 */
type EventHandler = <E extends Event | Event>(event: E) => void;

export default EventHandler;
