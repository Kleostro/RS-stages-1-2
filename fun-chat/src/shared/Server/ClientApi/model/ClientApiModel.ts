import MEDIATOR_EVENTS from '../../../EventMediator/types/enums.ts';
import EventMediatorModel from '../../../EventMediator/model/EventMediatorModel.ts';

class ClientApiModel {
  private webSocket: WebSocket;

  private isOpen: boolean;

  private eventMediator = EventMediatorModel.getInstance();

  constructor(webSocket: WebSocket, isOpen: boolean) {
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.unsubscribeToEventMediator();
    this.unsubscribeToEventMediator2();
    this.subscribeToEventMediator();
    this.subscribeToEventMediator2();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private sendMessage(message: unknown): boolean {
    this.webSocket.send(JSON.stringify(message));
    return true;
  }

  private unsubscribeToEventMediator(): boolean {
    const createNewUserListener = (message: unknown): void => {
      this.sendMessage(message);
    };

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.LOG_IN_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.LOG_OUT_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.EDIT_MESSAGE_REQUEST,
      createNewUserListener,
    );

    return true;
  }

  private unsubscribeToEventMediator2(): boolean {
    const createNewUserListener = (message: unknown): void => {
      this.sendMessage(message);
    };

    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.READ_MESSAGE_REQUEST,
      createNewUserListener,
    );

    return true;
  }

  private subscribeToEventMediator(): boolean {
    const createNewUserListener = (message: unknown): void => {
      this.sendMessage(message);
    };

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_IN_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST,
      createNewUserListener,
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EDIT_MESSAGE_REQUEST,
      createNewUserListener,
    );

    return true;
  }

  private subscribeToEventMediator2(): boolean {
    const createNewUserListener = (message: unknown): void => {
      this.sendMessage(message);
    };

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.READ_MESSAGE_REQUEST,
      createNewUserListener,
    );

    return true;
  }
}

export default ClientApiModel;
