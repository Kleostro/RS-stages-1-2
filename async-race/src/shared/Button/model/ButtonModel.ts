import { IS_DISABLED } from '../../types/enums.ts';
import type ButtonInterface from '../types/interfaces.ts';
import ButtonView from '../view/ButtonView.ts';

class ButtonModel {
  private view: ButtonView;

  constructor(params: ButtonInterface) {
    this.view = new ButtonView(params);
  }

  public getHTML(): HTMLButtonElement {
    return this.view.getHTML();
  }

  public setDisabled(): void {
    this.view.getHTML().disabled = IS_DISABLED.DISABLED;
  }

  public setEnabled(): void {
    this.view.getHTML().disabled = IS_DISABLED.ENABLED;
  }
}

export default ButtonModel;
