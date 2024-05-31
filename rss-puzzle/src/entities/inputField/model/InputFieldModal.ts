import InputView from '../../../shared/input/view/InputView.ts';

class InputFieldModal extends InputView {
  private form: HTMLFormElement;

  private isValid: boolean;

  private name: string;

  constructor(attrs: Record<string, string>, form: HTMLFormElement) {
    super(attrs);
    this.form = form;
    this.isValid = true;
    this.name = attrs.name;
  }

  public getInputName(): string {
    return this.name;
  }

  public getIsValid(): boolean {
    return this.isValid;
  }

  public setIsValid(isValid: boolean): void {
    this.isValid = isValid;
  }

  public getInputForm(): HTMLFormElement {
    return this.form;
  }

  public getData(): string {
    return this.input.value;
  }
}

export default InputFieldModal;
