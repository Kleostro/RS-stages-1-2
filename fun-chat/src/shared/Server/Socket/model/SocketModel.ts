import MEDIATOR_EVENTS from '../../../EventMediator/types/enums.ts';
import EventMediatorModel from '../../../EventMediator/model/EventMediatorModel.ts';
import { EVENT_NAMES } from '../../../types/enums.ts';
import ClientApiModel from '../../ClientApi/model/ClientApiModel.ts';
import ServerApiModel from '../../ServerApi/model/ServerApiModel.ts';
import API_URL, { CHECK_INTERVAL } from '../../ServerApi/types/enums.ts';

class SocketModel {
  private webSocket = new WebSocket(API_URL);

  private eventMediator = EventMediatorModel.getInstance();

  private isOpen = false;

  constructor() {
    this.connectWebSocket();
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  private connectWebSocket(): boolean {
    let reconnectTimeout: NodeJS.Timeout;

    this.webSocket = new WebSocket(API_URL);

    const reconnect = (): void => {
      reconnectTimeout = setTimeout(() => {
        this.connectWebSocket();
      }, CHECK_INTERVAL);
    };

    this.webSocket.addEventListener(EVENT_NAMES.OPEN, () => {
      this.isOpen = true;
      this.init();
      clearTimeout(reconnectTimeout);
      this.eventMediator.notify(MEDIATOR_EVENTS.SOCKET_CONNECT, null);
    });

    this.webSocket.addEventListener(EVENT_NAMES.CLOSE, () => {
      this.isOpen = false;
      this.eventMediator.notify(MEDIATOR_EVENTS.SOCKET_DISCONNECT, null);
      reconnect();
    });

    return this.isOpen;
  }

  private init(): boolean {
    const clientApi = new ClientApiModel(this.webSocket, this.isOpen);
    const serverApi = new ServerApiModel(this.webSocket, this.isOpen);
    clientApi.isWorks();
    serverApi.isWorks();
    return this.isOpen;
  }
}

export default SocketModel;
