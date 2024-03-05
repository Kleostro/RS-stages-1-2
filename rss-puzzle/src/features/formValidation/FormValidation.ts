import { type InputFieldComponentInterface } from '../../entities/inputField/types/interfaces.ts';
import styles from '../../widgets/loginForm/style.module.scss';
import ERRORS_NAME from './types/enum.ts';
import FIELD_INFO from './const.ts';

class FormValidation {
  private fields: InputFieldComponentInterface[] = [];

  private errorMessages: Record<string, string> = {};

  private fieldErrors: HTMLSpanElement[] = [];

  private button: HTMLButtonElement;

  constructor(
    fields: InputFieldComponentInterface[],
    fieldErrors: HTMLSpanElement[],
    button: HTMLButtonElement,
  ) {
    this.fields = fields;
    this.fieldErrors = fieldErrors;
    this.button = button;
  }

  public initValidation(): void {
    this.fields.forEach((field) => {
      const fieldHTML = field.getHTML();

      const options: Record<string, number> = {};
      options.minChars =
        fieldHTML.name === FIELD_INFO.name.name
          ? FIELD_INFO.name.minChars
          : FIELD_INFO.surname.minChars;

      fieldHTML.addEventListener('input', () =>
        this.fieldCheck(field, fieldHTML, options),
      );
    });
  }

  private updateBtnState(): void {
    const isValidFields = Object.values(this.fields).every(
      (field) => !field.isValid,
    );
    this.button.disabled = !isValidFields;
  }

  private getErrorMessage(
    error: string,
    options?: Record<string, number>,
    name?: string,
  ): string {
    this.errorMessages = {
      firstChar: 'The first letter must be in uppercase',
      otherChars: 'Only letters of the Latin alphabet and "-" are allowed',
      emptyField: 'The field can`t be empty',
      manyChars: `The ${name} field must contain more than ${options?.minChars} characters`,
    };

    return this.errorMessages[error];
  }

  private setError(
    field: InputFieldComponentInterface,
    span: HTMLSpanElement,
    error: string,
    options?: Record<string, number>,
    name?: string,
  ): void {
    const currentField = field;
    currentField.isValid = true;

    const fieldHTML = currentField.getHTML();
    fieldHTML.classList.remove(styles.form__input__success);
    fieldHTML.classList.add(styles.form__input__error);

    const currentSpan = span;
    currentSpan.classList.remove(styles.form__span__hidden);
    currentSpan.classList.add(styles.form__span__visually);
    currentSpan.textContent = this.getErrorMessage(error, options, name);

    this.updateBtnState();
  }

  private fieldCheck(
    field: InputFieldComponentInterface,
    fieldHTML: HTMLInputElement,
    options: Record<string, number>,
  ): void {
    const currentField = field;
    const { value } = fieldHTML;
    const { name } = fieldHTML;

    const currentErrorSpan = this.fieldErrors.filter(
      (item) => item.id === currentField.getHTML().id,
    );

    const currentSpan = currentErrorSpan[0];

    if (value !== '' && value[0] !== value[0].toUpperCase()) {
      const errorCode = ERRORS_NAME.FIRST_CHAR;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }

    if (!/^[A-Za-z-]*$/.test(value)) {
      const errorCode = ERRORS_NAME.OTHER_CHARS;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }

    if (value === '') {
      const errorCode = ERRORS_NAME.EMPTY_FIELD;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }

    if (value.length < options.minChars) {
      const errorCode = ERRORS_NAME.MANY_CHARS;
      this.setError(currentField, currentSpan, errorCode, options, name);
    } else {
      currentField.isValid = false;
      fieldHTML.classList.add(styles.form__input__success);
      fieldHTML.classList.remove(styles.form__input__error);

      currentSpan.textContent = '';
      currentSpan.classList.add(styles.form__span__hidden);
      currentSpan.classList.remove(styles.form__span__visually);

      this.updateBtnState();
    }
  }
}

export default FormValidation;
