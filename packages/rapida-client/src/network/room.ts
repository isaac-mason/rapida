interface Room {
  /**
   * The ID of the room
   */
  id: string;

  /**
   * The endpoint URI for the room, including the port
   */
  endpoint: string;
}

export { Room };
