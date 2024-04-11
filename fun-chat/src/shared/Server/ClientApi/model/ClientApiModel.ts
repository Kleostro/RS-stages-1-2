import MEDIATOR_EVENTS from '../../../Mediator/types/enums.ts';
import MediatorModel from '../../../Mediator/model/MediatorModel.ts';

class ClientApiModel {
  private webSocket: WebSocket;

  private isOpen: boolean;

  private eventMediator = MediatorModel.getInstance();

  constructor(webSocket: WebSocket, isOpen: boolean) {
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.subscribeToEventMediator();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private sendMessage(message: unknown): boolean {
    if (!this.isOpen) {
      return false;
    }

    this.webSocket.send(JSON.stringify(message));
    return true;
  }

  private subscribeToEventMediator(): boolean {
    if (!this.isOpen) {
      return false;
    }

    this.eventMediator.subscribe(MEDIATOR_EVENTS.CREATE_NEW_USER, (message) => {
      this.sendMessage(message);
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT, (message) => {
      this.sendMessage(message);
    });
    return true;
  }
}

export default ClientApiModel;
