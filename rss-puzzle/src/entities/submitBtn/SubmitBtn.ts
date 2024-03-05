import type ButtonAction from '../../shared/button/types/types.ts';
import ButtonComponent from '../../shared/button/Button.ts';

class SubmitButtonComponent extends ButtonComponent {
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

export default SubmitButtonComponent;
