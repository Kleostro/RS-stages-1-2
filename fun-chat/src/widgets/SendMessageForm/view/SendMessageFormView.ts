import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import {
  SEND_MESSAGE_INPUT_FIELD_PARAMS,
  SEND_MESSAGE_FORM_SVG_DETAILS,
} from '../types/enums.ts';
import SEND_MESSAGE_FORM_STYLES from './sendMessageForm.module.scss';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import BUTTON_TYPES from '../../../shared/Button/types/enums.ts';
import createSVGUse from '../../../utils/createSVGUse.ts';

class SendMessageFormView {
  private emojiButton: ButtonModel;

  private submitFormButton: ButtonModel;

  private inputField: HTMLTextAreaElement;

  private form: HTMLFormElement;

  constructor() {
    this.emojiButton = this.createEmojiButton();
    this.submitFormButton = this.createSubmitFormButton();
    this.inputField = this.createInputField();
    this.form = this.createHTML();
    this.hideForm();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  public getInputField(): HTMLTextAreaElement {
    return this.inputField;
  }

  public getSubmitFormButton(): ButtonModel {
    return this.submitFormButton;
  }

  public getEmojiButton(): ButtonModel {
    return this.emojiButton;
  }

  public hideForm(): void {
    this.form.classList.add(SEND_MESSAGE_FORM_STYLES.hidden);
  }

  public showForm(): void {
    this.form.classList.remove(SEND_MESSAGE_FORM_STYLES.hidden);
  }

  private createEmojiButton(): ButtonModel {
    this.emojiButton = new ButtonModel({
      text: '😀',
      classes: [SEND_MESSAGE_FORM_STYLES.emojiButton],
    });

    return this.emojiButton;
  }

  private createInputField(): HTMLTextAreaElement {
    this.inputField = createBaseElement({
      tag: TAG_NAMES.TEXTAREA,
      cssClasses: [SEND_MESSAGE_FORM_STYLES.inputField],
      attributes: {
        placeholder: SEND_MESSAGE_INPUT_FIELD_PARAMS.placeholder,
        autocomplete: SEND_MESSAGE_INPUT_FIELD_PARAMS.autocomplete,
      },
    });
    return this.inputField;
  }

  private createSubmitFormButton(): ButtonModel {
    this.submitFormButton = new ButtonModel({
      classes: [SEND_MESSAGE_FORM_STYLES.submitFormButton],
      attrs: {
        type: BUTTON_TYPES.SUBMIT,
      },
    });

    const svg = document.createElementNS(
      SEND_MESSAGE_FORM_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG,
    );

    svg.append(createSVGUse(SEND_MESSAGE_FORM_SVG_DETAILS.SEND_ID));

    this.submitFormButton.getHTML().append(svg);

    this.submitFormButton.setDisabled();

    return this.submitFormButton;
  }

  private createHTML(): HTMLFormElement {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [SEND_MESSAGE_FORM_STYLES.form],
    });

    this.form.append(
      this.inputField,
      this.emojiButton.getHTML(),
      this.submitFormButton.getHTML(),
    );
    return this.form;
  }
}

export default SendMessageFormView;
