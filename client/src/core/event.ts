/**
 * An event that can be broadcast and consumed by entities and components
 */
interface Event {
  topic: string;
  data: any;
}

export default Event;
