import { TAG_NAMES } from '../../types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';

class InputView {
  private input: HTMLInputElement;

  constructor(attrs: Record<string, string>) {
    this.input = this.createHTML(attrs);
  }

  public getHTML(): HTMLInputElement {
    return this.input;
  }

  private createHTML(attrs: Record<string, string>): HTMLInputElement {
    this.input = createBaseElement({
      tag: TAG_NAMES.INPUT,
      attributes: attrs,
    });

    return this.input;
  }
}

export default InputView;
