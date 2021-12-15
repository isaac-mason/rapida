interface Renderer {
  id: string;
  init?: () => void;
  destroy?: () => void;
  onResize?: () => void;
  render?: () => void;
}

export { Renderer };
