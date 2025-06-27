import { CursorCommand } from './CursorCommand';
import { SelectionCommand } from './SelectionCommand';

export type Feature = {
  selection?: {
    [action: string]: SelectionCommand;
  };
  cursor?: {
    [action: string]: CursorCommand;
  };
};
