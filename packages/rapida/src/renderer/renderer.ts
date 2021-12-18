interface Renderer {
  id: string;
  init?: () => void;
  destroy?: () => void;
  _onResize?: () => void;
  render?: () => void;
}

export { Renderer };
