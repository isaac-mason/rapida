/**
 * An event that can be broadcast and consumed by entities and components
 */
interface Event {
  topic: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default Event;
