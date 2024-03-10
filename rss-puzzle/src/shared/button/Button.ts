import createBaseElement from '../../utils/createBaseElement.ts';
import type ButtonAction from './types/types.ts';

class ButtonComponent {
  public button: HTMLButtonElement;

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

  public switchDisabled(): void {
    this.button.disabled = !this.button.disabled;
  }

  private createHTML(
    action?: ButtonAction,
    classes?: string[],
    attrs?: Record<string, string>,
    text?: string,
  ): HTMLButtonElement {
    this.button = createBaseElement({
      tag: 'button',
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

export default ButtonComponent;
