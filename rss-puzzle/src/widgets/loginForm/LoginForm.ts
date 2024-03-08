import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import InputFieldComponent from '../../entities/inputField/InputField.ts';
import SubmitButtonComponent from '../../entities/submitBtn/SubmitBtn.ts';
import FormValidation from '../../features/formValidation/FormValidation.ts';
import FIELD_NAMES from './types/enum.ts';
import type PageInterface from '../../pages/types/interfaces.ts';
import { type UserDataInterface } from '../../app/Storage/types/interfaces.ts';
import EVENT_NAMES from '../../shared/types/enums.ts';

class LoginForm {
  private form: HTMLFormElement;

  protected inputFields: InputFieldComponent[] = [];

  protected inputFieldsHTML: HTMLInputElement[] = [];

  protected fieldErrors: HTMLSpanElement[] = [];

  protected submitBtn: SubmitButtonComponent;

  private formValidation: FormValidation;

  private page: PageInterface;

  constructor(page: PageInterface) {
    this.page = page;
    this.submitBtn = this.createSubmitBtn();
    this.form = this.createHTML();
    this.formValidation = new FormValidation(
      this.inputFields,
      this.fieldErrors,
      this.submitBtn.getHTML(),
    );
    this.formValidation.initValidation();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  private getData(): UserDataInterface {
    const userData: UserDataInterface = {};

    this.inputFields.forEach((input) => {
      const key = input.name;
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

  private createFieldBox(input: HTMLInputElement): HTMLLabelElement {
    const labelText = `Enter ${input.name}`;

    const fieldLabel = createBaseElement({
      tag: 'label',
      cssClasses: [styles.form__label],
      attributes: {
        for: input.id,
      },
      innerContent: labelText,
    });

    const fieldErrorSpan = createBaseElement({
      tag: 'span',
      cssClasses: [styles.form__span],
      attributes: {
        id: input.id,
      },
    });

    this.fieldErrors.push(fieldErrorSpan);
    fieldLabel.append(input, fieldErrorSpan);
    return fieldLabel;
  }

  private createInputsField(): InputFieldComponent[] {
    const inputName = new InputFieldComponent(
      {
        type: 'text',
        name: FIELD_NAMES.NAME,
        id: FIELD_NAMES.NAME,
        placeholder: 'Ivan',
        class: styles.form__input,
        autocomplete: 'off',
      },
      this.form,
    );

    const inputSurname = new InputFieldComponent(
      {
        type: 'text',
        name: FIELD_NAMES.SURNAME,
        id: FIELD_NAMES.SURNAME,
        placeholder: 'Ivanov',
        class: styles.form__input,
        autocomplete: 'off',
      },
      this.form,
    );

    this.inputFieldsHTML.push(inputName.getHTML(), inputSurname.getHTML());
    return [inputName, inputSurname];
  }

  private createSubmitBtn(): SubmitButtonComponent {
    const submitBtn = new SubmitButtonComponent(
      this.form,
      'Login',
      [styles.form__btn, 'btn-reset'],
      {
        type: 'submit',
        disabled: 'true',
      },
    );

    return submitBtn;
  }

  private createHTML(): HTMLFormElement {
    this.form = createBaseElement({
      tag: 'form',
      cssClasses: [styles.form],
      attributes: {
        action: '#',
        method: 'post',
      },
    });

    this.inputFields = this.createInputsField();

    this.inputFieldsHTML.forEach((input) => {
      const fieldBox = this.createFieldBox(input);
      this.form.append(fieldBox);
    });

    this.form.addEventListener(EVENT_NAMES.submit, this.submit.bind(this));
    this.form.append(this.submitBtn.getHTML());
    return this.form;
  }
}

export default LoginForm;
