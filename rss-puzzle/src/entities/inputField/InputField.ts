import { type InputFieldComponentInterface } from './types/interfaces.ts';
import InputComponent from '../../shared/input/Input.ts';

class InputFieldComponent
  extends InputComponent
  implements InputFieldComponentInterface
{
  public form: HTMLFormElement;

  public isValid: boolean;

  public name: string;

  constructor(attrs: Record<string, string>, form: HTMLFormElement) {
    super(attrs);
    this.form = form;
    this.isValid = true;
    this.name = attrs.name;
  }

  public getData(): string {
    return this.input.value;
  }
}

export default InputFieldComponent;
