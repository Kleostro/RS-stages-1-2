import MEDIATOR_EVENTS from '../../../Mediator/types/enums.ts';
import MediatorModel from '../../../Mediator/model/MediatorModel.ts';
import type ServerApiModel from '../../ServerApi/model/ServerApiModel.ts';

class ClientApiModel {
  private serverApi: ServerApiModel;

  private eventMediator = MediatorModel.getInstance();

  constructor(serverApi: ServerApiModel) {
    this.serverApi = serverApi;
    this.subscribeToEventMediator();
  }

  private subscribeToEventMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CREATE_NEW_USER, (message) => {
      this.serverApi.sendMessage(message);
    });
  }
}

export default ClientApiModel;
