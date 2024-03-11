import FormValidationModel from '../../../features/formValidation/model/FormValidationModel.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import { type UserDataInterface } from '../../../app/Storage/types/interfaces.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import LoginFormView from '../ui/LoginFormView.ts';

class LoginFormModel {
  private form: HTMLFormElement;

  private formView: LoginFormView;

  private formValidation: FormValidationModel;

  private page: PageInterface;

  constructor(page: PageInterface) {
    this.page = page;
    this.formView = new LoginFormView();
    this.form = this.formView.getHTML();
    this.form.addEventListener(EVENT_NAMES.submit, this.submit.bind(this));
    this.formValidation = new FormValidationModel(
      this.formView.getInputFields(),
      this.formView.getFieldErrors(),
      this.formView.getSubmitBtn().getHTML(),
    );
    this.formValidation.initValidation();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  private getData(): UserDataInterface {
    const userData: UserDataInterface = {};

    this.formView.getInputFields().forEach((input) => {
      const key = input.getInputName();
      const value = input.getData();
      userData[key] = value;
    });

    return userData;
  }

  private submit(event: Event): void {
    event.preventDefault();

    if (this.page.saveAuthUser) {
      this.page.saveAuthUser(this.getData());
    }

    this.form.remove();
  }
}

export default LoginFormModel;
