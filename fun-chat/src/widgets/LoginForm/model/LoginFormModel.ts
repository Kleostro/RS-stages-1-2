import LoginFormView from '../view/LoginFormView.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type InputFieldModel from '../../../entities/InputField/model/InputFieldModel.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import type LoginUser from '../../../shared/Server/ServerApi/types/interfaces.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';

class LoginFormModel {
  private view: LoginFormView = new LoginFormView();

  private inputFields: InputFieldModel[] = [];

  private isValidInputFields: Record<string, boolean> = {};

  private eventMediator = MediatorModel.getInstance();

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

  private getFormData(): User {
    const formData: User = {
      login: '',
      password: '',
    };

    this.inputFields.forEach((inputField) => {
      const input = inputField.getView().getInput();
      const inputHTML = input.getHTML();
      const inputValue = input.getValue();

      function isKeyOfUser(key: string): key is keyof User {
        return Object.prototype.hasOwnProperty.call(formData, key);
      }

      if (isKeyOfUser(inputHTML.id)) {
        formData[inputHTML.id] = inputValue;
      }

      input.clear();
      this.isValidInputFields[inputHTML.id] = false;
    });
    this.view.getSubmitFormButton().setDisabled();
    return formData;
  }

  private saveNewUser(data: LoginUser): void {
    StoreModel.dispatch({
      type: ACTIONS.SET_CURRENT_USER,
      payload: data.payload.user,
    });
    this.eventMediator.notify(MEDIATOR_EVENTS.CHANGE_PAGE, PAGES_IDS.MAIN_PAGE);
  }

  private submitFormButtonHandler(): void {
    const userData: LoginUser = {
      id: crypto.randomUUID(),
      type: API_TYPES.USER_LOGIN,
      payload: {
        user: this.getFormData(),
      },
    };

    this.eventMediator.notify(MEDIATOR_EVENTS.CREATE_NEW_USER, userData);

    this.eventMediator.subscribe(MEDIATOR_EVENTS.SET_NEW_USER, (message) => {
      if (message.type !== API_TYPES.ERROR) {
        this.saveNewUser(userData);
      } else {
        console.log(message.payload.error);
      }
    });
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
