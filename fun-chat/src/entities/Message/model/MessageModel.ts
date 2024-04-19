import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import MessageView from '../view/MessageView.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import type { MessageFromServer } from '../../../utils/isFromServerMessage.ts';
import type { Message } from '../../../utils/isMessage.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import { setCurrentUserDialogs } from '../../../shared/Store/actions/actions.ts';

class MessageModel {
  private view: MessageView;

  private eventMediator = EventMediatorModel.getInstance();

  private messageID = '';

  constructor(messageParams: Message) {
    this.messageID = messageParams.id;
    this.view = new MessageView(messageParams);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private deleteMessageHandler(): boolean {
    const message = {
      id: this.messageID,
      type: API_TYPES.MSG_DELETE,
      payload: {
        message: {
          id: this.messageID,
        },
      },
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST, message);

    return true;
  }

  private editMessageHandler(checkedMessage: MessageFromServer): boolean {
    this.view.editedMessage(checkedMessage);
    const { currentUserDialogs } = StoreModel.getState();
    currentUserDialogs.forEach((dialog) => {
      const currentMessage = dialog.messages.find(
        (msg) => msg.id === this.messageID,
      );
      if (currentMessage) {
        currentMessage.status.isEdited = true;
        currentMessage.text = checkedMessage?.payload.message.text;
        StoreModel.dispatch(setCurrentUserDialogs(currentUserDialogs));
      }
    });

    return true;
  }

  private subscribeToEventMediator(): boolean {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
      (message) => {
        const checkedMessage = isFromServerMessage(message);

        if (checkedMessage?.payload.message.id === this.messageID) {
          this.view.deliveredMessage();
        }
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EDIT_MESSAGE_RESPONSE,
      (message) => {
        const checkedMessage = isFromServerMessage(message);
        if (checkedMessage?.payload.message.id === this.messageID) {
          this.editMessageHandler(checkedMessage);
        }
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.READ_MESSAGE_RESPONSE,
      (message) => {
        const checkedMessage = isFromServerMessage(message);
        if (checkedMessage?.payload.message.id === this.messageID) {
          this.view.readMessage();
        }
      },
    );

    return true;
  }

  private init(): boolean {
    this.subscribeToEventMediator();

    const message = this.getHTML();
    const editWrapper = this.view.getEditWrapper();
    const deleteButton = this.view.getDeleteButton().getHTML();
    const editButton = this.view.getEditButton().getHTML();

    message.addEventListener(EVENT_NAMES.CLICK, (event) => {
      event.preventDefault();
      this.view.switchVisibleEditWrapper();
    });

    message.addEventListener(EVENT_NAMES.CONTEXTMENU, (event) => {
      event.preventDefault();
      this.view.switchVisibleEditWrapper();
    });

    editWrapper.addEventListener(EVENT_NAMES.MOUSELEAVE, () =>
      this.view.hideEditWrapper(),
    );

    deleteButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.deleteMessageHandler.bind(this),
    );

    editButton.addEventListener(EVENT_NAMES.CLICK, () =>
      this.eventMediator.notify(
        MEDIATOR_EVENTS.EDIT_MESSAGE_OPEN,
        this.messageID,
      ),
    );

    return true;
  }
}

export default MessageModel;
