import { TAG_NAMES } from '../../../shared/types/enums.ts';
import InputFieldModal from '../../../entities/inputField/model/InputFieldModal.ts';
import SubmitButtonModel from '../../../entities/submitBtn/model/SubmitBtnModel.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from '../style.module.scss';
import FIELD_NAMES from '../types/enum.ts';

class LoginFormView {
  private form: HTMLFormElement;

  private inputFields: InputFieldModal[] = [];

  private inputFieldsHTML: HTMLInputElement[] = [];

  private fieldErrors: HTMLSpanElement[] = [];

  private submitBtn: SubmitButtonModel;

  constructor() {
    this.submitBtn = this.createSubmitBtn();
    this.form = this.createHTML();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  public getSubmitBtn(): SubmitButtonModel {
    return this.submitBtn;
  }

  public getInputFields(): InputFieldModal[] {
    return this.inputFields;
  }

  public getFieldErrors(): HTMLSpanElement[] {
    return this.fieldErrors;
  }

  private createFieldBox(input: HTMLInputElement): HTMLLabelElement {
    const labelText = `Enter ${input.name}`;

    const fieldLabel = createBaseElement({
      tag: TAG_NAMES.label,
      cssClasses: [styles.form__label],
      attributes: {
        for: input.id,
      },
      innerContent: labelText,
    });

    const fieldErrorSpan = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.form__span],
      attributes: {
        id: input.id,
      },
    });

    this.fieldErrors.push(fieldErrorSpan);
    fieldLabel.append(input, fieldErrorSpan);
    return fieldLabel;
  }

  private createInputsField(): InputFieldModal[] {
    const inputName = new InputFieldModal(
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

    const inputSurname = new InputFieldModal(
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

  private createSubmitBtn(): SubmitButtonModel {
    const textContentBtn = 'Login';
    const submitBtn = new SubmitButtonModel(
      this.form,
      textContentBtn,
      [styles.form__btn, 'btn-reset'],
      {
        type: 'submit',
      },
    );

    submitBtn.setDisabled();

    return submitBtn;
  }

  private createHTML(): HTMLFormElement {
    this.form = createBaseElement({
      tag: TAG_NAMES.form,
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

    this.form.append(this.submitBtn.getHTML());
    return this.form;
  }
}

export default LoginFormView;
