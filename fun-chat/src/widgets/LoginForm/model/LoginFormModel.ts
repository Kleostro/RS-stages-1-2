import LoginFormView from '../view/LoginFormView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type InputFieldModel from '../../../entities/InputField/model/InputFieldModel.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import type LoginUser from '../../../shared/Server/ServerApi/types/interfaces.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import isKeyOfUser from '../../../utils/isKeyOfUser.ts';

class LoginFormModel {
  private view: LoginFormView = new LoginFormView();

  private messageID = '';

  private userData: User = {
    login: '',
    password: '',
    isLogined: '',
  };

  private inputFields: InputFieldModel[] = [];

  private isValidInputFields: Record<string, boolean> = {};

  private eventMediator = EventMediatorModel.getInstance();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.view.getHTML();
  }

  public getMessageID(): string {
    return this.messageID;
  }

  public getUserData(): User {
    return this.userData;
  }

  private setInputFieldHandlers(inputField: InputFieldModel): boolean {
    const inputHTML = inputField.getView().getInput().getHTML();
    this.isValidInputFields[inputHTML.id] = false;
    inputHTML.addEventListener(EVENT_NAMES.INPUT, () => {
      this.isValidInputFields[inputHTML.id] = inputField.getIsValid();
      this.switchSubmitFormButtonAccess();
    });
    return true;
  }

  private switchSubmitFormButtonAccess(): boolean {
    if (Object.values(this.isValidInputFields).every((value) => value)) {
      this.view.getSubmitFormButton().setEnabled();
    } else {
      this.view.getSubmitFormButton().setDisabled();
    }

    return true;
  }

  private getFormData(): User {
    this.inputFields.forEach((inputField) => {
      const input = inputField.getView().getInput();
      const inputHTML = input.getHTML();
      const inputValue = input.getValue();

      if (isKeyOfUser(this.userData, inputHTML.id)) {
        this.userData[inputHTML.id] = inputValue;
        this.isValidInputFields[inputHTML.id] = false;
      }

      input.clear();
    });

    this.view.getSubmitFormButton().setDisabled();
    return this.userData;
  }

  private submitFormButtonHandler(): boolean {
    this.messageID = crypto.randomUUID();
    const userData: LoginUser = {
      id: this.messageID,
      type: API_TYPES.USER_LOGIN,
      payload: {
        user: this.getFormData(),
      },
    };

    this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_REQUEST, userData);
    return true;
  }

  private setSubmitFormButtonHandler(): boolean {
    const submitFormButton = this.view.getSubmitFormButton().getHTML();
    submitFormButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.submitFormButtonHandler.bind(this),
    );

    return true;
  }

  private setPreventDefaultToForm(): boolean {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });

    return true;
  }

  private init(): boolean {
    this.inputFields = this.view.getInputFields();
    this.inputFields.forEach((inputField) =>
      this.setInputFieldHandlers(inputField),
    );
    this.setSubmitFormButtonHandler();
    this.setPreventDefaultToForm();

    return true;
  }
}

export default LoginFormModel;
