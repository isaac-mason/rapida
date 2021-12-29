export interface Renderer {
  id: string;
  _init?: () => void;
  _destroy?: () => void;
  _onResize?: () => void;
  _render?: () => void;
}
