import BUTTON_STATE from '../types/enums.ts';
import type ButtonAction from '../types/types.ts';
import ButtonView from '../view/ButtonView.ts';

class ButtonModel {
  private view: ButtonView;

  private button: HTMLButtonElement;

  constructor(
    text?: string,
    classes?: string[],
    attrs?: Record<string, string>,
    action?: ButtonAction,
  ) {
    this.view = new ButtonView({ text, classes, attrs, action });
    this.button = this.view.getHTML();
  }

  public getHTML(): HTMLButtonElement {
    return this.button;
  }

  public setDisabled(): void {
    this.button.disabled = BUTTON_STATE.DISABLED;
  }

  public setEnabled(): void {
    this.button.disabled = BUTTON_STATE.ENABLED;
  }
}

export default ButtonModel;
