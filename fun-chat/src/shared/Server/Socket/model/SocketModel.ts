import { EVENT_NAMES } from '../../../types/enums.ts';
import ClientApiModel from '../../ClientApi/model/ClientApiModel.ts';
import ServerApiModel from '../../ServerApi/model/ServerApiModel.ts';
import API_URL from '../../ServerApi/types/enums.ts';

class SocketModel {
  private webSocket = new WebSocket(API_URL);

  private isOpen = false;

  public open(): boolean {
    this.webSocket.addEventListener(EVENT_NAMES.OPEN, () => {
      this.isOpen = true;
      this.init();
    });
    return this.isOpen;
  }

  public isWorks(): boolean {
    return this.isOpen;
  }

  public close(): boolean {
    this.webSocket.addEventListener(EVENT_NAMES.CLOSE, () => {
      this.isOpen = false;
    });

    return this.isOpen;
  }

  private init(): boolean {
    const serverApi = new ServerApiModel(this.webSocket, this.isOpen);
    const clientApi = new ClientApiModel(this.webSocket, this.isOpen);
    clientApi.isWorks();
    serverApi.isWorks();
    return this.isOpen;
  }
}

export default SocketModel;
