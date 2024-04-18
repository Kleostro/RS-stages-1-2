import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import SendMessageFormModel from '../../SendMessageForm/model/SendMessageFormModel.ts';
import UserDialogueView from '../view/UserDialogueView.ts';
import { isSavedUser } from '../../../utils/isUser.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import MessageModel from '../../../entities/Message/model/MessageModel.ts';
import type { Message } from '../../../utils/isMessage.ts';

class UserDialogueModel {
  private view = new UserDialogueView();

  private eventMediator = EventMediatorModel.getInstance();

  private sendMessageForm = new SendMessageFormModel();

  private messageID = '';

  constructor() {
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private retrieveMessagesWithCurrentUser(data: unknown): void {
    const checkedData = isFromServerMessage(data);
    if (
      checkedData &&
      checkedData.id === this.messageID &&
      checkedData.id !== ''
    ) {
      this.hasMessages(checkedData.payload.messages);
    }
  }

  private drawMessagesWithCurrentUser(messages: Message[]): void {
    this.view.clearMessagesWrapper();
    const messageWrapper = this.view.getMessagesWrapper();
    messages.forEach((message) => {
      const messageModel = new MessageModel(message, message.id);
      messageWrapper.append(messageModel.getHTML());
    });

    messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }

  private hasMessages(messages: Message[]): void {
    if (messages.length) {
      this.drawMessagesWithCurrentUser(messages);
    } else if (StoreModel.getState().selectedUser) {
      this.view.showEmptyDialogue();
    }
  }

  private requestMessagesWithCurrentUser(userLogin: string): void {
    this.messageID = crypto.randomUUID();
    const message = {
      id: this.messageID,
      type: API_TYPES.MSG_FROM_USER,
      payload: {
        user: {
          login: userLogin,
        },
      },
    };

    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      message,
    );
  }

  private subscribeToEventMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, (data) => {
      if (isSavedUser(data)) {
        this.view.setCurrentUserInfo(data);
        this.view.showDialogue();
        this.requestMessagesWithCurrentUser(data.login);
      }
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () =>
      this.view.hideDialogue(),
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
      (data) => this.retrieveMessagesWithCurrentUser(data),
    );

    this.eventMediator.subscribe(MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE, () => {
      const { selectedUser } = StoreModel.getState();
      if (selectedUser) {
        this.requestMessagesWithCurrentUser(selectedUser?.login);
      }
    });
  }

  private updateStatusCurrentUser(users: User[]): void {
    const currentUser = users.find(
      (user) => user.login === this.view.getCurrentUserInfo().textContent,
    );
    if (currentUser) {
      this.view.setCurrentUserInfo(currentUser);
    }
  }

  private init(): void {
    this.subscribeToEventMediator();
    this.view.getHTML().append(this.sendMessageForm.getHTML());

    StoreModel.subscribe(ACTIONS.SET_ALL_USERS, () => {
      const { allUsers } = StoreModel.getState();
      this.updateStatusCurrentUser(allUsers);
    });

    StoreModel.subscribe(ACTIONS.SET_CURRENT_USER_DIALOGS, () => {
      const { currentUserDialogs, selectedUser } = StoreModel.getState();
      const currentDialog = currentUserDialogs.find(
        (dialog) => dialog.login === selectedUser?.login,
      );
      this.hasMessages(currentDialog?.messages || []);
    });
  }
}

export default UserDialogueModel;
