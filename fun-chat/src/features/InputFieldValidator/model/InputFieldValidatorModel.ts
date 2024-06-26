import type InputFieldValidatorParams from '../types/interfaces.ts';

class InputFieldValidatorModel {
  private validParams;

  private isValid: boolean;

  constructor(validParams: InputFieldValidatorParams, isValid: boolean) {
    this.validParams = validParams;
    this.isValid = isValid;
  }

  public validate(value: string): boolean | string[] {
    const errors = [
      this.checkRequired(value),
      this.checkNotSpecialSymbols(value),
      this.checkMinLength(value),
      this.checkMaxLength(value),
      this.checkRequiredSymbols(value),
    ];

    const errorMessages: string[] = [];
    errors.forEach((error) => {
      if (typeof error === 'string') {
        errorMessages.push(error);
      }
    });

    if (errorMessages.length) {
      return errorMessages;
    }

    this.isValid = true;
    return this.isValid;
  }

  private checkMinLength(value: string): boolean | string {
    if (
      this.validParams.minLength &&
      value.length < this.validParams.minLength
    ) {
      const errorMessage = `Min length should be at least ${this.validParams.minLength}`;
      return errorMessage;
    }

    return true;
  }

  private checkMaxLength(value: string): boolean | string {
    if (
      this.validParams.maxLength &&
      value.length > this.validParams.maxLength
    ) {
      const errorMessage = `Max length should not exceed ${this.validParams.maxLength}`;
      return errorMessage;
    }

    return true;
  }

  private checkRequired(value: string): boolean | string {
    if (this.validParams.required && value.trim() === '') {
      const errorMessage = 'Field is required';
      return errorMessage;
    }

    return true;
  }

  private checkRequiredSymbols(value: string): boolean | string {
    if (
      this.validParams.requiredSymbols &&
      !this.validParams.requiredSymbols.pattern.test(value)
    ) {
      const errorMessage = this.validParams.requiredSymbols.message;
      return errorMessage;
    }

    return true;
  }

  private checkNotSpecialSymbols(value: string): boolean | string {
    if (
      this.validParams.notSpecialSymbols &&
      !this.validParams.notSpecialSymbols.pattern.test(value)
    ) {
      const errorMessage = this.validParams.notSpecialSymbols.message;
      return errorMessage;
    }

    return true;
  }
}

export default InputFieldValidatorModel;
