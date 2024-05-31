export interface InputParams {
  id: string;
  type: 'text' | 'number' | 'email' | 'password' | 'range' | 'date' | 'color';
  placeholder: string | null;
  autocomplete: 'on' | 'off';
}

export interface LabelParams {
  for: string;
  text: string | null;
}

export interface InputFieldParams {
  inputParams: InputParams;
  labelParams?: LabelParams | null;
}
