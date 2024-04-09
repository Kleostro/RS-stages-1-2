interface InputFieldValidatorParams {
  key: string;
  minLength?: number | null;
  maxLength?: number | null;
  required?: boolean | null;
  requiredSymbols?: {
    pattern: RegExp;
    message: string;
  } | null;
  notSpecialSymbols?: {
    pattern: RegExp;
    message: string;
  } | null;
}

export default InputFieldValidatorParams;
