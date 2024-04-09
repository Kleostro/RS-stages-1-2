export const LOGIN_INPUT_FIELD_PARAMS = {
  inputParams: {
    id: 'login',
    type: 'text',
    placeholder: 'Login',
    autocomplete: 'off',
  },
  labelParams: {
    for: 'login',
    text: 'Enter your login',
  },
} as const;

export const PASSWORD_INPUT_FIELD_PARAMS = {
  inputParams: {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    autocomplete: 'off',
  },
  labelParams: {
    for: 'password',
    text: 'Enter your password',
  },
} as const;

export const FORM_INPUT_FIELD_PARAMS = [
  LOGIN_INPUT_FIELD_PARAMS,
  PASSWORD_INPUT_FIELD_PARAMS,
];

const LOGIN_INPUT_FIELD_VALIDATE_PARAMS = {
  key: 'login',
  minLength: 4,
  maxLength: 16,
  required: true,
  notSpecialSymbols: {
    pattern: /^[a-zA-Z0-9]*$/,
    message: 'Login must contain only letters and numbers',
  },
} as const;

const PASSWORD_INPUT_FIELD_VALIDATE_PARAMS = {
  key: 'password',
  minLength: 6,
  required: true,
  requiredSymbols: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
    message:
      'Password must contain English letters, at least 1 upper case letter and at least 1 number',
  },
  notSpecialSymbols: {
    pattern: /^[a-zA-Z0-9]*$/,
    message: 'Password must contain only letters and numbers',
  },
} as const;

export const INPUT_FIELD_VALIDATION_PARAMS = [
  LOGIN_INPUT_FIELD_VALIDATE_PARAMS,
  PASSWORD_INPUT_FIELD_VALIDATE_PARAMS,
];
