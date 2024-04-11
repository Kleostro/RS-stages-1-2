import MEDIATOR_EVENTS from '../../../Mediator/types/enums.ts';
import MediatorModel from '../../../Mediator/model/MediatorModel.ts';
import { EVENT_NAMES } from '../../../types/enums.ts';
import { API_TYPES } from '../types/enums.ts';
import type { Message } from '../../../../utils/isFromServerMessage.ts';
import { isFromServerMessage } from '../../../../utils/isFromServerMessage.ts';

class ServerApiModel {
  private webSocket: WebSocket;

  private isOpen: boolean;

  private eventMediator = MediatorModel.getInstance();

  constructor(webSocket: WebSocket, isOpen: boolean) {
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.getMessage();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private getMessage(): boolean {
    if (!this.isOpen) {
      return false;
    }

    this.webSocket.addEventListener(EVENT_NAMES.MESSAGE, ({ data }) => {
      const message: unknown = JSON.parse(String(data));
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleMessageType(checkedMessage);
      }
    });
    return true;
  }

  private handleMessageType(message: Message): null | boolean {
    switch (message.type) {
      case API_TYPES.USER_LOGIN: {
        this.eventMediator.notify(MEDIATOR_EVENTS.SET_NEW_USER, message);
        return true;
      }
      case API_TYPES.ERROR: {
        this.eventMediator.notify(MEDIATOR_EVENTS.SET_NEW_USER, message);
        return false;
      }
      default: {
        return null;
      }
    }
  }
}

export default ServerApiModel;
