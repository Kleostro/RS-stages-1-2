import { IS_DISABLED } from '../../types/enums.ts';
import InputView from '../view/InputView.ts';

class InputModel {
  private view: InputView;

  constructor(attrs: Record<string, string>) {
    this.view = new InputView(attrs);
  }

  public getHTML(): HTMLInputElement {
    return this.view.getHTML();
  }

  public getValue(): string {
    return this.view.getHTML().value;
  }

  public setDisabled(): void {
    this.view.getHTML().disabled = IS_DISABLED.DISABLED;
  }

  public setEnabled(): void {
    this.view.getHTML().disabled = IS_DISABLED.ENABLED;
  }

  public clear(): void {
    this.view.getHTML().value = '';
  }
}

export default InputModel;
