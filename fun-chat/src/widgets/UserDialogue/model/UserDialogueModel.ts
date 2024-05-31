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
import { EVENT_NAMES } from '../../../shared/types/enums.ts';

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

  private retrieveMessagesWithCurrentUser(data: unknown): boolean {
    const checkedData = isFromServerMessage(data);
    if (checkedData?.id === this.messageID && checkedData.id !== '') {
      const messageWrapper = this.view.getMessagesWrapper();
      messageWrapper.scrollTop = messageWrapper.scrollHeight;
      this.hasMessages(checkedData.payload.messages);
    }

    return true;
  }

  private drawMessagesWithCurrentUser(messages: Message[]): boolean {
    this.view.clearMessagesWrapper();
    const messageWrapper = this.view.getMessagesWrapper();
    const unreadMessagesLine = this.view.getUnreadMessagesLine();
    const { currentUser } = StoreModel.getState();
    let firstUnreadMessage: unknown = null;

    messages.forEach((message) => {
      const newMessage = new MessageModel(message);
      messageWrapper.append(newMessage.getHTML());

      if (
        !message.status.isReaded &&
        !firstUnreadMessage &&
        message.from !== currentUser?.login
      ) {
        firstUnreadMessage = newMessage;
      }
    });

    if (
      firstUnreadMessage instanceof MessageModel &&
      !messageWrapper.contains(unreadMessagesLine)
    ) {
      firstUnreadMessage.getHTML().before(this.view.getUnreadMessagesLine());
      messageWrapper.scrollBy(
        0,
        this.view.getUnreadMessagesLine().getBoundingClientRect().top -
          messageWrapper.clientHeight,
      );
    }

    return true;
  }

  private hasMessages(messages: Message[]): boolean {
    if (messages.length) {
      this.drawMessagesWithCurrentUser(messages);
    } else if (StoreModel.getState().selectedUser) {
      this.view.showEmptyDialogue();
    }

    return true;
  }

  private requestMessagesWithCurrentUser(userLogin: string): boolean {
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

    return true;
  }

  private subscribeToEventMediator(): boolean {
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
      this.messageScrollHandler();
      const messagesWrapper = this.view.getMessagesWrapper();
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    });

    return true;
  }

  private updateStatusCurrentUser(users: User[]): boolean {
    const currentUser = users.find(
      (user) => user.login === this.view.getCurrentUserInfo().textContent,
    );
    if (currentUser) {
      this.view.setCurrentUserInfo(currentUser);
    }

    return true;
  }

  private messageScrollHandler(): boolean {
    const { currentUserDialogs, selectedUser } = StoreModel.getState();
    const unreadMessagesLine = this.view.getUnreadMessagesLine();
    if (unreadMessagesLine) {
      unreadMessagesLine.remove();
    }

    const currentDialog = currentUserDialogs.find(
      (dialog) => dialog.login === selectedUser?.login,
    );

    if (currentDialog) {
      const { messages } = currentDialog;
      const unreadMessages = messages.filter(
        (message) =>
          !message.status.isReaded && message.from === selectedUser?.login,
      );

      if (unreadMessages.length) {
        unreadMessages.forEach((message) => {
          const messageFromServer = {
            id: '',
            type: API_TYPES.MSG_READ,
            payload: {
              message: {
                id: message.id,
              },
            },
          };
          this.eventMediator.notify(
            MEDIATOR_EVENTS.READ_MESSAGE_REQUEST,
            messageFromServer,
          );
        });
      }
    }

    return true;
  }

  private init(): boolean {
    this.subscribeToEventMediator();
    this.view.getHTML().append(this.sendMessageForm.getHTML());

    StoreModel.subscribe(ACTIONS.SET_ALL_USERS, () => {
      const { allUsers } = StoreModel.getState();
      this.updateStatusCurrentUser(allUsers);
    });
    const messageWrapper = this.view.getMessagesWrapper();

    StoreModel.subscribe(ACTIONS.SET_CURRENT_USER_DIALOGS, () => {
      const { currentUserDialogs, selectedUser } = StoreModel.getState();
      const currentDialog = currentUserDialogs.find(
        (dialog) => dialog.login === selectedUser?.login,
      );
      this.hasMessages(currentDialog?.messages || []);
    });

    messageWrapper.addEventListener(EVENT_NAMES.MOUSEWHEEL, () =>
      this.messageScrollHandler(),
    );

    messageWrapper.addEventListener(EVENT_NAMES.CLICK, () =>
      this.messageScrollHandler(),
    );

    return true;
  }
}

export default UserDialogueModel;
