import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import type { Message } from '../../../shared/Store/initialData.ts';
import MessageView from '../view/MessageView.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';

class MessageModel {
  private view: MessageView;

  private eventMediator = EventMediatorModel.getInstance();

  constructor(messageParams: Message) {
    this.view = new MessageView(messageParams);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private subscribeToEvents(): void {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
      () => this.view.deliveredMessage(),
    );
  }

  private init(): void {
    this.subscribeToEvents();
  }
}

export default MessageModel;
