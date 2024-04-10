import MEDIATOR_EVENTS from '../../../Mediator/types/enums.ts';
import MediatorModel from '../../../Mediator/model/MediatorModel.ts';
import { EVENT_NAMES } from '../../../types/enums.ts';
import ClientApiModel from '../../ClientApi/model/ClientApiModel.ts';
import API_URL, { API_TYPES } from '../types/enums.ts';

class ServerApiModel {
  private webSocket = new WebSocket(API_URL);

  private isOpen = false;

  private eventMediator = MediatorModel.getInstance();

  constructor() {
    const clientApi = new ClientApiModel(this);
    this.close();
    this.getMessage();
    if (!this.isOpen) {
      this.open();
    }
  }

  public open(): void {
    this.webSocket.addEventListener(EVENT_NAMES.OPEN, () => {
      this.isOpen = true;
    });
  }

  public sendMessage(message: unknown): void {
    this.webSocket.send(JSON.stringify(message));
  }

  private getMessage(): void {
    this.webSocket.addEventListener(EVENT_NAMES.MESSAGE, ({ data }) => {
      const message: unknown = JSON.parse(String(data));
      switch (message.type) {
        case API_TYPES.USER_LOGIN: {
          this.eventMediator.notify(MEDIATOR_EVENTS.SET_NEW_USER, message);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  private close(): void {
    this.webSocket.addEventListener(EVENT_NAMES.CLOSE, () => {
      this.isOpen = false;
    });
  }
}

export default ServerApiModel;
