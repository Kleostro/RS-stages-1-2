import { TAG_NAMES } from '../../types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import type ButtonInterface from '../types/interfaces.ts';

class ButtonView {
  private button: HTMLButtonElement;

  constructor({ text, classes, attrs, action }: ButtonInterface) {
    this.button = this.createHTML({ action, classes, attrs, text });
  }

  public getHTML(): HTMLButtonElement {
    return this.button;
  }

  private createHTML(params: ButtonInterface): HTMLButtonElement {
    this.button = createBaseElement({
      tag: TAG_NAMES.BUTTON,
      cssClasses: params.classes,
      attributes: params.attrs,
      innerContent: params.text,
    });

    if (params.action) {
      this.button.addEventListener(params.action.key, params.action.value);
    }

    return this.button;
  }
}

export default ButtonView;
