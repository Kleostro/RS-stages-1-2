import styles from './style.module.scss';
import createBaseElement from '../../utils/createBaseElement.ts';
import InputFieldComponent from '../../entities/inputField/InputField.ts';
import SubmitButtonComponent from '../../entities/submitBtn/SubmitBtn.ts';
import FormValidation from '../../features/formValidation/FormValidation.ts';
import FIELD_NAMES from './types/enum.ts';
import type { StorageComponentInterface } from '../../app/Storage/types/interfaces.ts';
import STORE_KEYS from '../../app/Storage/types/enums.ts';
import type PageInterface from '../../pages/types/interfaces.ts';
import { PAGES_IDS } from '../../pages/types/enums.ts';

class LoginForm {
  private form: HTMLFormElement;

  protected inputFields: InputFieldComponent[] = [];

  protected inputFieldsHTML: HTMLInputElement[] = [];

  protected fieldErrors: HTMLSpanElement[] = [];

  protected submitBtn: SubmitButtonComponent;

  private userData: { [key: string]: FormDataEntryValue | null } = {};

  private formValidation: FormValidation;

  private storage: StorageComponentInterface;

  private page: PageInterface;

  constructor(page: PageInterface) {
    this.page = page;
    this.storage = this.page.storage;
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

  private submit(event: Event): void {
    event.preventDefault();
    const formData = new FormData(this.form);
    const nameData = formData.get(FIELD_NAMES.NAME);
    const surnameData = formData.get(FIELD_NAMES.SURNAME);
    this.userData.name = nameData;
    this.userData.surname = surnameData;

    window.location.hash = PAGES_IDS.START;

    this.storage.add(STORE_KEYS.USER, JSON.stringify(this.userData));

    const newLoginForm = new LoginForm(this.page);
    const currentForm = this.getHTML();
    const { parentElement } = currentForm;

    if (parentElement) {
      parentElement.replaceChild(newLoginForm.getHTML(), currentForm);
    }
  }

  private createFieldBox(input: HTMLInputElement): HTMLLabelElement {
    const fieldLabel = createBaseElement({
      tag: 'label',
      cssClasses: [styles.form__label],
      attributes: {
        for: input.id,
      },
      innerContent: `Enter ${input.name}`,
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

    this.form.addEventListener('submit', this.submit.bind(this));
    this.form.append(this.submitBtn.getHTML());
    return this.form;
  }
}

export default LoginForm;
