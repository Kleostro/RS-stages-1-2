import BUTTON_TYPES from '../../../shared/Button/types/enums.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import InputFieldModel from '../../../entities/InputField/model/InputFieldModel.ts';
import {
  FORM_INPUT_FIELD_PARAMS,
  INPUT_FIELD_VALIDATION_PARAMS,
} from '../types/enums.ts';
import LOGIN_FORM_STYLES from './loginForm.module.scss';

class LoginFormView {
  private submitFormButton: ButtonModel;

  private inputFields: InputFieldModel[] = [];

  private form: HTMLFormElement;

  constructor() {
    this.inputFields = this.createInputFields();
    this.submitFormButton = this.createSubmitFormButton();
    this.form = this.createHTML();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  public getInputFields(): InputFieldModel[] {
    return this.inputFields;
  }

  public getSubmitFormButton(): ButtonModel {
    return this.submitFormButton;
  }

  private createSubmitFormButton(): ButtonModel {
    const text = 'Login';
    this.submitFormButton = new ButtonModel({
      text,
      attrs: {
        type: BUTTON_TYPES.SUBMIT,
      },
    });

    this.submitFormButton.setDisabled();

    return this.submitFormButton;
  }

  private createInputFields(): InputFieldModel[] {
    FORM_INPUT_FIELD_PARAMS.forEach((inputFieldParams) => {
      const currentValidateParams = INPUT_FIELD_VALIDATION_PARAMS.find(
        (validParams) => validParams.key === inputFieldParams.inputParams.id,
      );

      if (currentValidateParams) {
        const inputField = new InputFieldModel(
          inputFieldParams,
          currentValidateParams,
        );
        this.inputFields.push(inputField);
      } else {
        this.inputFields.push(new InputFieldModel(inputFieldParams, null));
      }
    });

    return this.inputFields;
  }

  private createHTML(): HTMLFormElement {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [LOGIN_FORM_STYLES.loginForm],
    });

    this.inputFields.forEach((inputField) => {
      const inputFieldElement = inputField.getView().getHTML();

      if (inputFieldElement instanceof HTMLLabelElement) {
        this.form.append(inputFieldElement);
      } else {
        this.form.append(inputFieldElement.getHTML());
      }
    });

    this.form.append(this.submitFormButton.getHTML());
    return this.form;
  }
}

export default LoginFormView;
