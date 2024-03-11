import { TAG_NAMES } from '../../types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import type ButtonAction from '../types/types';

class ButtonView {
  private button: HTMLButtonElement;

  constructor(
    text?: string,
    classes?: string[],
    attrs?: Record<string, string>,
    action?: ButtonAction,
  ) {
    this.button = this.createHTML(action, classes, attrs, text);
  }

  public getHTML(): HTMLButtonElement {
    return this.button;
  }

  private createHTML(
    action?: ButtonAction,
    classes?: string[],
    attrs?: Record<string, string>,
    text?: string,
  ): HTMLButtonElement {
    this.button = createBaseElement({
      tag: TAG_NAMES.button,
      cssClasses: classes,
      attributes: attrs,
      innerContent: text,
    });

    if (action) {
      this.button.addEventListener(action.key, action.value);
    }

    return this.button;
  }
}

export default ButtonView;
