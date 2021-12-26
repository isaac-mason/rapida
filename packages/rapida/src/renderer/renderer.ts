export interface Renderer {
  id: string;
  init?: () => void;
  _destroy?: () => void;
  _onResize?: () => void;
  render?: () => void;
}
