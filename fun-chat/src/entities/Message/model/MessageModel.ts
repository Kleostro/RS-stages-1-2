import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import type { Message } from '../../../shared/Store/initialData.ts';
import MessageView from '../view/MessageView.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';

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

  private subscribeToEvents(): void {
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
    this.subscribeToEvents();
  }
}

export default MessageModel;
