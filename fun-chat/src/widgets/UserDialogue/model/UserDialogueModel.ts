import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import SendMessageFormModel from '../../SendMessageForm/model/SendMessageFormModel.ts';
import UserDialogueView from '../view/UserDialogueView.ts';
import { isSavedUser } from '../../../utils/isUser.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import type { User } from '../../../shared/Store/initialData.ts';

class UserDialogueModel {
  private view = new UserDialogueView();

  private eventMediator = EventMediatorModel.getInstance();

  private sendMessageForm = new SendMessageFormModel();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private subscribeToEventMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, (data) => {
      if (isSavedUser(data)) {
        this.view.setCurrentUserInfo(data);
        this.view.showDialogue();
      }
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () => {
      this.view.hideDialogue();
    });
  }

  private updateStatusCurrentUser(users: User[]): void {
    const currentUser = users.filter(
      (user) => user.login === this.view.getCurrentUserInfo().textContent,
    );
    if (currentUser.length) {
      this.view.setCurrentUserInfo(currentUser[0]);
    }
  }

  private init(): void {
    this.subscribeToEventMediator();
    this.view.getHTML().append(this.sendMessageForm.getHTML());

    StoreModel.subscribe(ACTIONS.SET_CURRENT_AUTHORIZED_USERS, () => {
      const { currentAuthorizedUsers } = StoreModel.getState();
      this.updateStatusCurrentUser(currentAuthorizedUsers);
    });

    StoreModel.subscribe(ACTIONS.SET_CURRENT_UNAUTHORIZED_USERS, () => {
      const { currentUnauthorizedUsers } = StoreModel.getState();
      this.updateStatusCurrentUser(currentUnauthorizedUsers);
    });
  }
}

export default UserDialogueModel;
