import InputModel from '../../../shared/Input/model/InputModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import CREATE_CAR_FORM_STYLES from './createCarForm.module.scss';
import INPUT_TYPES from '../../../shared/Input/types/enums.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import BUTTON_TYPES from '../../../shared/Button/types/enums.ts';

class CreateCarFormView {
  private carNameInput: InputModel;

  private carColorInput: InputModel;

  private submitButton: ButtonModel;

  private form: HTMLFormElement;

  constructor() {
    this.carNameInput = this.createCarNameInput();
    this.carColorInput = this.createCarColorInput();
    this.submitButton = this.createSubmitButton();
    this.form = this.createHTML();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  public getCarNameInput(): InputModel {
    return this.carNameInput;
  }

  public getCarColorInput(): InputModel {
    return this.carColorInput;
  }

  public getSubmitButton(): ButtonModel {
    return this.submitButton;
  }

  private createCarNameInput(): InputModel {
    const placeholder = 'Car name';
    this.carNameInput = new InputModel({
      type: INPUT_TYPES.TEXT,
      placeholder,
    });

    return this.carNameInput;
  }

  private createCarColorInput(): InputModel {
    this.carColorInput = new InputModel({
      type: INPUT_TYPES.COLOR,
    });

    return this.carColorInput;
  }

  private createSubmitButton(): ButtonModel {
    const buttonText = 'Create';
    this.submitButton = new ButtonModel({
      text: buttonText,
      classes: [CREATE_CAR_FORM_STYLES['form_submit-button']],
      attrs: {
        type: BUTTON_TYPES.SUBMIT,
      },
    });

    this.submitButton.setDisabled();

    return this.submitButton;
  }

  private createHTML(): HTMLFormElement {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [CREATE_CAR_FORM_STYLES.form],
    });

    this.form.append(
      this.carNameInput.getHTML(),
      this.carColorInput.getHTML(),
      this.submitButton.getHTML(),
    );

    return this.form;
  }
}

export default CreateCarFormView;
