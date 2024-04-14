import MEDIATOR_EVENTS from '../../../EventMediator/types/enums.ts';
import EventMediatorModel from '../../../EventMediator/model/EventMediatorModel.ts';

class ClientApiModel {
  private webSocket: WebSocket;

  private isOpen: boolean;

  private eventMediator = EventMediatorModel.getInstance();

  constructor(webSocket: WebSocket, isOpen: boolean) {
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.subscribeToEventMediator();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private sendMessage(message: unknown): boolean {
    this.webSocket.send(JSON.stringify(message));
    return true;
  }

  private subscribeToEventMediator(): boolean {
    const createNewUserListener = (message: unknown): void => {
      this.sendMessage(message);
    };

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.CREATE_NEW_USER,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.LOG_OUT,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.CREATE_NEW_USER,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT,
      createNewUserListener,
    );

    return true;
  }
}

export default ClientApiModel;
