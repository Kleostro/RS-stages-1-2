import { type InputFieldComponentInterface } from './types/interfaces.ts';
import InputComponent from '../../shared/input/Input.ts';

class InputFieldComponent
  extends InputComponent
  implements InputFieldComponentInterface
{
  public form: HTMLFormElement;

  public isValid: boolean;

  constructor(attrs: Record<string, string>, form: HTMLFormElement) {
    super(attrs);
    this.form = form;
    this.isValid = true;
  }
}

export default InputFieldComponent;
