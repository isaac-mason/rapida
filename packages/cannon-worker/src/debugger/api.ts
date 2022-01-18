import { BodyProps } from '../types/body';
import { BodyShapeType } from '../types/shapes';

export type DebuggerApi = {
  add: (id: string, params: BodyProps, type: BodyShapeType) => void;
  remove: (id: string) => void;
  update: () => void;
};
