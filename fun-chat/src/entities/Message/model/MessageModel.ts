import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import MessageView from '../view/MessageView.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import type { Message } from '../../../utils/isMessage.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';

class MessageModel {
  private view: MessageView;

  private eventMediator = EventMediatorModel.getInstance();

  private messageID = '';

  constructor(messageParams: Message, messageID: string) {
    this.messageID = messageID;
    this.view = new MessageView(messageParams);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private deleteMessageHandler(): void {
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
  }

  private subscribeToEventMediator(): void {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
      (message) => {
        const checkedMessage = isFromServerMessage(message);

        if (checkedMessage?.payload.message.id === this.messageID) {
          this.view.deliveredMessage();
        }
      },
    );
  }

  private init(): void {
    this.subscribeToEventMediator();

    this.getHTML().addEventListener(EVENT_NAMES.CONTEXTMENU, (event) => {
      event.preventDefault();
      this.deleteMessageHandler();
    });
  }
}

export default MessageModel;
