import type ButtonActionType from './types.ts';

interface ButtonInterface {
  text?: string;
  classes?: string[];
  attrs?: Record<string, string>;
  action?: ButtonActionType;
}

export default ButtonInterface;
