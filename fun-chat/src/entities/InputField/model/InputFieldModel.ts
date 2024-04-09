import type InputFieldValidatorParams from '../../../features/InputFieldValidator/types/interfaces.ts';
import InputFieldValidatorModel from '../../../features/InputFieldValidator/model/InputFieldValidatorModel.ts';
import type { InputFieldParams } from '../types/interfaces.ts';
import InputFieldView from '../view/InputFieldView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';

class InputFieldModel {
  private view: InputFieldView;

  private isValid = false;

  private validator: InputFieldValidatorModel | null = null;

  constructor(
    inputFieldParams: InputFieldParams,
    validParams: InputFieldValidatorParams | null,
  ) {
    this.view = new InputFieldView(inputFieldParams);

    if (validParams) {
      this.validator = new InputFieldValidatorModel(validParams, this.isValid);
      this.setInputHandler();
    }
  }

  public getView(): InputFieldView {
    return this.view;
  }

  public getIsValid(): boolean {
    return this.isValid;
  }

  private inputHandler(): void {
    const errorField = this.view.getErrorField();
    const errors = this.validator?.validate(this.view.getValue());
    if (errors === true) {
      if (errorField) {
        errorField.textContent = '';
      }
      this.isValid = true;
    } else {
      if (errorField && errors) {
        const [firstError] = errors;
        errorField.textContent = firstError;
      }
      this.isValid = false;
    }
  }

  private setInputHandler(): void {
    const input = this.view.getInput().getHTML();
    input.addEventListener(EVENT_NAMES.INPUT, () => {
      this.inputHandler();
    });
  }
}

export default InputFieldModel;
