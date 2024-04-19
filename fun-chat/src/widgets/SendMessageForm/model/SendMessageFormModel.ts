import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import SendMessageFormView from '../view/SendMessageFormView.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import EmojiListModel from '../../../features/EmojiList/model/EmojiListModel.ts';
import isEmoji from '../../../utils/isEmoji.ts';
import getEmojiData from '../../../utils/getEmojiData.ts';

class SendMessageFormModel {
  private eventMediator = EventMediatorModel.getInstance();

  private view = new SendMessageFormView();

  private emojiList: EmojiListModel | null = null;

  constructor() {
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.view.getHTML();
  }

  private inputFieldHandler(): boolean {
    const inputField = this.view.getInputField();
    const submitFormButton = this.view.getSubmitFormButton();

    if (inputField.value) {
      submitFormButton.setEnabled();
    } else {
      submitFormButton.setDisabled();
    }

    return true;
  }

  private setInputFieldHandlers(): boolean {
    const inputField = this.view.getInputField();
    const ENTER_KEY = 'Enter';
    inputField.addEventListener(
      EVENT_NAMES.INPUT,
      this.inputFieldHandler.bind(this),
    );

    inputField.addEventListener(EVENT_NAMES.KEYDOWN, (event: KeyboardEvent) => {
      if (event.key === ENTER_KEY) {
        event.preventDefault();
      }

      if (event.key === ENTER_KEY && event.shiftKey) {
        const currentValue = inputField.value;
        inputField.value = `${currentValue}\n`;
        inputField.scrollTop = inputField.scrollHeight;
      } else if (
        event.key === ENTER_KEY &&
        !event.shiftKey &&
        inputField.value
      ) {
        this.formSubmitHandler();
      }
    });

    return true;
  }

  private setPreventDefaultToForm(): boolean {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });

    return true;
  }

  private formSubmitHandler(): boolean {
    const inputField = this.view.getInputField();
    const submitFormButton = this.view.getSubmitFormButton();
    if (!inputField.id) {
      this.sendMessage(inputField.value);
    } else {
      this.sendEditedMessage(inputField.value, inputField.id);
      inputField.id = '';
    }
    inputField.value = '';
    submitFormButton.setDisabled();

    return true;
  }

  private sendMessage(text: string): boolean {
    const { selectedUser } = StoreModel.getState();
    const message = {
      id: '',
      type: API_TYPES.MSG_SEND,
      payload: {
        message: {
          to: selectedUser?.login,
          text,
        },
      },
    };

    this.eventMediator.notify(MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST, message);

    return true;
  }

  private sendEditedMessage(text: string, messageID: string): boolean {
    const message = {
      id: '',
      type: API_TYPES.MSG_EDIT,
      payload: {
        message: {
          id: messageID,
          text,
        },
      },
    };

    this.eventMediator.notify(MEDIATOR_EVENTS.EDIT_MESSAGE_REQUEST, message);

    return true;
  }

  private setSubmitButtonHandler(): boolean {
    const submitFormButton = this.view.getSubmitFormButton();
    submitFormButton
      .getHTML()
      .addEventListener(EVENT_NAMES.CLICK, this.formSubmitHandler.bind(this));

    return true;
  }

  private emojiButtonHandler(): boolean {
    const emojiListView = this.emojiList?.getView();
    emojiListView?.switchVisibility();

    return true;
  }

  private setEmojiButtonHandler(): boolean {
    const emojiButtonHTML = this.view.getEmojiButton().getHTML();

    emojiButtonHTML.addEventListener(
      EVENT_NAMES.MOUSEENTER,
      this.emojiButtonHandler.bind(this),
    );

    return true;
  }

  private setEmojiItemHandlers(): boolean {
    const emojiItems = this.emojiList?.getView()?.getEmojiItems();
    emojiItems?.forEach((item: HTMLLIElement) => {
      item.addEventListener(EVENT_NAMES.CLICK, ({ target }) => {
        if (target instanceof HTMLLIElement && target.textContent) {
          this.view.getInputField().value += target.textContent;
          this.view.getSubmitFormButton().setEnabled();
          this.view.getInputField().focus();
        }
      });
    });

    return true;
  }

  private getMessageToEdit(messageID: string): boolean {
    const { currentUserDialogs } = StoreModel.getState();

    currentUserDialogs.forEach((dialog) => {
      const message = dialog.messages.find((msg) => msg.id === messageID);
      if (message) {
        const inputField = this.view.getInputField();
        inputField.value = message.text;
        inputField.id = messageID;
        inputField.focus();
      }
    });

    return true;
  }

  private subscribeToEventMediator(): boolean {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, () => {
      this.view.showForm();
      this.view.getInputField().focus();
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () =>
      this.view.hideForm(),
    );

    this.eventMediator.subscribe(MEDIATOR_EVENTS.EDIT_MESSAGE_OPEN, (message) =>
      this.getMessageToEdit(String(message)),
    );

    return true;
  }

  private init(): boolean {
    getEmojiData()
      .then((data) => {
        if (isEmoji(data)) {
          this.emojiList = new EmojiListModel(data);
          const emojiList = this.emojiList.getView();
          this.view.getHTML().append(emojiList.getHTML());
          this.setEmojiButtonHandler();
          this.setEmojiItemHandlers();
        }
      })
      .catch(() => {});
    this.subscribeToEventMediator();
    this.setPreventDefaultToForm();
    this.setInputFieldHandlers();
    this.setSubmitButtonHandler();

    return true;
  }
}

export default SendMessageFormModel;
