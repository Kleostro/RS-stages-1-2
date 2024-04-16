import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import SendMessageFormView from '../view/SendMessageFormView.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';

class SendMessageFormModel {
  private eventMediator = EventMediatorModel.getInstance();

  private view = new SendMessageFormView();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.view.getHTML();
  }

  private inputFieldHandler(): void {
    const inputField = this.view.getInputField();
    const submitFormButton = this.view.getSubmitFormButton();

    if (inputField.value) {
      submitFormButton.setEnabled();
    } else {
      submitFormButton.setDisabled();
    }
  }

  private setInputFieldHandlers(): void {
    const inputField = this.view.getInputField();
    const ENTER_KEY = 'Enter';
    inputField.addEventListener(
      EVENT_NAMES.INPUT,
      this.inputFieldHandler.bind(this),
    );

    inputField.addEventListener(EVENT_NAMES.KEYDOWN, (event: KeyboardEvent) => {
      if (event.key === ENTER_KEY && event.shiftKey) {
        event.preventDefault();
        const currentValue = inputField.value;
        inputField.value = `${currentValue}\n`;
        inputField.scrollTop = inputField.scrollHeight;
      } else if (event.key === ENTER_KEY && !event.shiftKey) {
        event.preventDefault();
        if (inputField.value) {
          this.formSubmitHandler();
        }
      }
    });
  }

  private setPreventDefaultToForm(): boolean {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });

    return true;
  }

  private formSubmitHandler(): void {
    const inputField = this.view.getInputField();
    const submitFormButton = this.view.getSubmitFormButton();
    // const inputFieldValue = inputField.value;

    inputField.value = '';
    submitFormButton.setDisabled();
  }

  private setSubmitButtonHandler(): void {
    const submitFormButton = this.view.getSubmitFormButton();
    submitFormButton
      .getHTML()
      .addEventListener(EVENT_NAMES.CLICK, this.formSubmitHandler.bind(this));
  }

  private subscribeToEventMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, () =>
      this.view.showForm(),
    );

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () => {
      this.view.hideForm();
    });
  }

  private init(): void {
    this.subscribeToEventMediator();
    this.setPreventDefaultToForm();
    this.setInputFieldHandlers();
    this.setSubmitButtonHandler();
  }
}

export default SendMessageFormModel;
