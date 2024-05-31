import type ButtonActionType from './types.ts';

interface ButtonAttributesInterface {
  text?: string;
  classes?: string[];
  attrs?: Record<string, string>;
  action?: ButtonActionType;
}

export default ButtonAttributesInterface;
