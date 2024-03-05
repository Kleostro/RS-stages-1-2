import { type InputComponentInterface } from '../../../shared/input/types/interfaces.ts';

export interface InputFieldComponentInterface extends InputComponentInterface {
  isValid: boolean;
  form: HTMLFormElement;
}
