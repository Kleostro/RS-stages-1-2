import MEDIATOR_EVENTS from '../../../EventMediator/types/enums.ts';
import EventMediatorModel from '../../../EventMediator/model/EventMediatorModel.ts';
import { EVENT_NAMES } from '../../../types/enums.ts';
import { API_TYPES } from '../types/enums.ts';
import type { MessageFromServer } from '../../../../utils/isFromServerMessage.ts';
import { isFromServerMessage } from '../../../../utils/isFromServerMessage.ts';

class ServerApiModel {
  private webSocket: WebSocket;

  private isOpen: boolean;

  private eventMediator = EventMediatorModel.getInstance();

  constructor(webSocket: WebSocket, isOpen: boolean) {
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.getMessage();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private getMessage(): boolean {
    this.webSocket.addEventListener(EVENT_NAMES.MESSAGE, ({ data }) => {
      const message: unknown = JSON.parse(String(data));
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleAuthentication(checkedMessage);
      }
    });
    return true;
  }

  private handleAuthentication(message: MessageFromServer): null | boolean {
    switch (message.type) {
      case API_TYPES.USER_LOGIN: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_RESPONSE, message);
        return true;
      }
      case API_TYPES.ERROR: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_RESPONSE, message);
        return false;
      }
      case API_TYPES.USER_LOGOUT: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, message);
        return true;
      }
      default: {
        this.handleUserState(message);
        return null;
      }
    }
  }

  private handleUserState(message: MessageFromServer): null | boolean {
    switch (message.type) {
      case API_TYPES.USER_ACTIVE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_RESPONSE,
          message,
        );
        return true;
      }
      case API_TYPES.USER_INACTIVE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_RESPONSE,
          message,
        );
        return true;
      }
      default: {
        this.handlerUserExternal(message);
        return null;
      }
    }
  }

  private handlerUserExternal(message: MessageFromServer): null | boolean {
    switch (message.type) {
      case API_TYPES.USER_EXTERNAL_LOGIN: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
          message,
        );
        return true;
      }
      case API_TYPES.USER_EXTERNAL_LOGOUT: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
          message,
        );
        return true;
      }
      default: {
        this.handlerHistoryMessages(message);
        return null;
      }
    }
  }

  private handlerHistoryMessages(message: MessageFromServer): null | boolean {
    switch (message.type) {
      case API_TYPES.MSG_FROM_USER: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
          message,
        );
        return true;
      }
      default: {
        this.handlerMessages(message);
        return null;
      }
    }
  }

  private handlerMessages(message: MessageFromServer): null | boolean {
    switch (message.type) {
      case API_TYPES.MSG_SEND: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE,
          message,
        );
        return true;
      }
      case API_TYPES.MSG_DELIVER: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
          message,
        );
        return true;
      }
      case API_TYPES.MSG_DELETE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.DELETE_MESSAGE_RESPONSE,
          message,
        );
        return true;
      }
      case API_TYPES.MSG_EDIT: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.EDIT_MESSAGE_RESPONSE,
          message,
        );
        return true;
      }
      default: {
        return null;
      }
    }
  }
}

export default ServerApiModel;
