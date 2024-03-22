import { IS_DISABLED } from '../../types/enums.ts';
import type ButtonInterface from '../types/interfaces.ts';
import ButtonView from '../view/ButtonView.ts';

class ButtonModel {
  private view: ButtonView;

  private button: HTMLButtonElement;

  constructor(params: ButtonInterface) {
    this.view = new ButtonView(params);
    this.button = this.view.getHTML();
  }

  public getHTML(): HTMLButtonElement {
    return this.button;
  }

  public setDisabled(): void {
    this.button.disabled = IS_DISABLED.DISABLED;
  }

  public setEnabled(): void {
    this.button.disabled = IS_DISABLED.ENABLED;
  }
}

export default ButtonModel;
