import LoginFormView from '../view/LoginFormView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type InputFieldModel from '../../../entities/InputField/model/InputFieldModel.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import { LOGIN_INPUT_FIELD_PARAMS } from '../types/enums.ts';

class LoginFormModel {
  private view: LoginFormView = new LoginFormView();

  private inputFields: InputFieldModel[] = [];

  private isValidInputFields: Record<string, boolean> = {};

  constructor() {
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.view.getHTML();
  }

  private setInputFieldHandlers(inputField: InputFieldModel): void {
    const inputHTML = inputField.getView().getInput().getHTML();
    this.isValidInputFields[inputHTML.id] = false;
    inputHTML.addEventListener(EVENT_NAMES.INPUT, () => {
      this.isValidInputFields[inputHTML.id] = inputField.getIsValid();
      this.switchSubmitFormButtonAccess();
    });
  }

  private switchSubmitFormButtonAccess(): void {
    if (Object.values(this.isValidInputFields).every((value) => value)) {
      this.view.getSubmitFormButton().setEnabled();
    } else {
      this.view.getSubmitFormButton().setDisabled();
    }
  }

  private submitFormButtonHandler(): User {
    const formData: User = {
      login: '',
      password: '',
    };

    this.inputFields.forEach((inputField) => {
      const input = inputField.getView().getInput();
      const inputValue = input.getValue();

      if (input.getHTML().id === LOGIN_INPUT_FIELD_PARAMS.inputParams.id) {
        formData.login = inputValue;
      } else {
        formData.password = inputValue;
      }
    });

    return formData;
  }

  private setSubmitFormButtonHandler(): void {
    const submitFormButton = this.view.getSubmitFormButton().getHTML();
    submitFormButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.submitFormButtonHandler.bind(this),
    );
  }

  private setPreventDefaultToForm(): void {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });
  }

  private init(): void {
    this.inputFields = this.view.getInputFields();
    this.inputFields.forEach((inputField) =>
      this.setInputFieldHandlers(inputField),
    );
    this.setSubmitFormButtonHandler();
    this.setPreventDefaultToForm();
  }
}

export default LoginFormModel;
