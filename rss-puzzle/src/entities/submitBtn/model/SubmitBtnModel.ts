import type ButtonAction from '../../../shared/button/types/types.ts';
import ButtonModel from '../../../shared/button/model/ButtonModel.ts';

class SubmitButtonModel extends ButtonModel {
  public form: HTMLFormElement;

  constructor(
    form: HTMLFormElement,
    text?: string,
    classes?: string[],
    attrs?: Record<string, string>,
    action?: ButtonAction,
  ) {
    super(text, classes, attrs, action);

    this.form = form;
  }
}

export default SubmitButtonModel;
