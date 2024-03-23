import { IS_DISABLED } from '../../types/enums.ts';
import InputView from '../view/InputView.ts';

class InputModel {
  private view: InputView;

  private input: HTMLInputElement;

  constructor(attrs: Record<string, string>) {
    this.view = new InputView(attrs);
    this.input = this.view.getHTML();
  }

  public getHTML(): HTMLInputElement {
    return this.input;
  }

  public setDisabled(): void {
    this.input.disabled = IS_DISABLED.DISABLED;
  }

  public setEnabled(): void {
    this.input.disabled = IS_DISABLED.ENABLED;
  }

  public clear(): void {
    this.input.value = '';
  }
}

export default InputModel;
