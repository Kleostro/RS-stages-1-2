import createBaseElement from '../../../utils/createBaseElement.ts';
import InputModel from '../../../shared/Input/model/InputModel.ts';
import type {
  InputFieldParams,
  InputParams,
  LabelParams,
} from '../types/interfaces';
import { TAG_NAMES } from '../../../shared/types/enums.ts';

class InputFieldView {
  private inputField: InputModel | HTMLLabelElement;

  private label: HTMLLabelElement | null = null;

  private errorField: HTMLSpanElement | null = null;

  private input: InputModel;

  constructor(params: InputFieldParams) {
    this.input = this.createInput(params.inputParams);
    this.inputField = this.createHTML(params);
  }

  public getHTML(): InputModel | HTMLLabelElement {
    return this.inputField;
  }

  public getValue(): string {
    if (this.inputField instanceof InputModel) {
      return this.inputField.getValue();
    }
    return this.input.getValue();
  }

  public getInput(): InputModel {
    return this.input;
  }

  public getErrorField(): HTMLSpanElement | null {
    return this.errorField;
  }

  private createInput(inputParams: InputParams): InputModel {
    const { id, type, placeholder, autocomplete } = inputParams;
    this.input = new InputModel({
      id,
      type,
      placeholder: placeholder || '',
      autocomplete,
    });

    return this.input;
  }

  private createLabel(labelParams: LabelParams): HTMLLabelElement {
    const { for: htmlFor, text } = labelParams;
    this.label = createBaseElement({
      tag: TAG_NAMES.LABEL,
      attributes: {
        for: htmlFor,
      },
      innerContent: text || '',
    });

    return this.label;
  }

  private createErrorField(): HTMLSpanElement {
    this.errorField = createBaseElement({
      tag: TAG_NAMES.SPAN,
    });

    return this.errorField;
  }

  private createHTML(params: InputFieldParams): InputModel | HTMLLabelElement {
    const { labelParams } = params;
    if (labelParams) {
      this.inputField = this.createLabel(labelParams);
      this.errorField = this.createErrorField();
      this.label?.append(this.input.getHTML(), this.errorField);
    } else {
      this.inputField = this.input;
    }

    return this.inputField;
  }
}

export default InputFieldView;
