import createBaseElement from '../../utils/createBaseElement.ts';
import { type InputComponentInterface } from './types/interfaces.ts';

class InputComponent implements InputComponentInterface {
  public input: HTMLInputElement;

  constructor(attrs: Record<string, string>) {
    this.input = this.createHTML(attrs);
  }

  public getHTML(): HTMLInputElement {
    return this.input;
  }

  private createHTML(attrs: Record<string, string>): HTMLInputElement {
    this.input = createBaseElement({
      tag: 'input',
      attributes: attrs,
    });

    return this.input;
  }
}

export default InputComponent;
