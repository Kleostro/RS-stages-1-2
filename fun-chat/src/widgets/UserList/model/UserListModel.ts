import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import UserListView from '../view/UserListView.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import {
  setAllUsers,
  setCurrentAuthorizedUsers,
  setCurrentUnauthorizedUsers,
  setCurrentUserDialogs,
  setSelectedUser,
} from '../../../shared/Store/actions/actions.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';
import isMessage from '../../../utils/isMessage.ts';
import type { Message } from '../../../utils/isMessage.ts';

class UserListModel {
  private view: UserListView = new UserListView();

  private eventMediator = EventMediatorModel.getInstance();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private getActiveUsers(): void {
    const requestMessage = {
      id: '',
      type: API_TYPES.USER_ACTIVE,
      payload: null,
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      requestMessage,
    );
  }

  private getInactiveUsers(): void {
    const requestMessage = {
      id: '',
      type: API_TYPES.USER_INACTIVE,
      payload: null,
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      requestMessage,
    );
  }

  private getAllUsers(): void {
    this.getActiveUsers();
    this.getInactiveUsers();
  }

  private drawUnreadMessages(): void {
    const { currentUserDialogs } = StoreModel.getState();
    if (!currentUserDialogs.length) {
      return;
    }

    currentUserDialogs.forEach((dialog) => {
      const unReadMessages = dialog.messages.filter(
        (message) => !message.status.isReaded,
      );

      this.view.drawUnreadMessagesCount(dialog.login, unReadMessages);
    });
  }

  private drawUsers(): void {
    this.view.clearUserList();
    const { allUsers } = StoreModel.getState();

    if (!allUsers.length) {
      this.view.emptyUserList();
    }

    allUsers.forEach((user) => {
      this.view.drawUser(user);
    });
  }

  private getAllUsersHandler(message: unknown): void {
    const checkedMessage = isFromServerMessage(message);
    if (checkedMessage) {
      const action =
        checkedMessage.type === API_TYPES.USER_ACTIVE
          ? setCurrentAuthorizedUsers
          : setCurrentUnauthorizedUsers;
      StoreModel.dispatch(action(checkedMessage.payload.users));
      const { currentAuthorizedUsers, currentUnauthorizedUsers, currentUser } =
        StoreModel.getState();
      const allUsers = [
        ...currentAuthorizedUsers,
        ...currentUnauthorizedUsers,
      ].filter((user) => user.login !== currentUser?.login);
      StoreModel.dispatch(setAllUsers(allUsers));
      if (currentUser) {
        allUsers.forEach((user) => {
          this.getAllMessages(user.login);
        });
      }
      this.drawUsers();
    }
  }

  private getAllMessages(login: string): void {
    const requestMessage = {
      id: '',
      type: API_TYPES.MSG_FROM_USER,
      payload: {
        user: {
          login,
        },
      },
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      requestMessage,
    );
  }

  private saveMessages(messages: unknown): void {
    const checkedMessage = isFromServerMessage(messages);

    const { currentUserDialogs, currentUser } = StoreModel.getState();
    let from = '';
    let to = '';
    let currentMessages: Message[] = [];

    if (checkedMessage?.payload.message) {
      const newMessage: unknown = checkedMessage.payload.message;
      if (isMessage(newMessage)) {
        currentMessages = [newMessage];
        from = newMessage.from;
        to = newMessage.to;
      }
    } else {
      if (!checkedMessage?.payload.messages.length) {
        return;
      }
      currentMessages = checkedMessage.payload.messages;
      from = currentMessages[0].from;
      to = currentMessages[0].to;
    }

    const userLogin = from === currentUser?.login ? to : from;
    const currentDialog = currentUserDialogs?.find(
      (dialog) => dialog.login === userLogin,
    );

    if (currentDialog) {
      currentDialog.messages = checkedMessage.payload.message
        ? [...currentDialog.messages, ...currentMessages]
        : currentMessages;
    } else {
      currentUserDialogs?.push({
        login: userLogin,
        messages: currentMessages,
      });
    }

    StoreModel.dispatch(setCurrentUserDialogs(currentUserDialogs));
    this.drawUnreadMessages();
  }

  private userListHandler(event: Event): void {
    const { target } = event;
    this.view.selectUser(target);
    const { allUsers } = StoreModel.getState();

    let currentUserInfo = null;
    if (target instanceof HTMLSpanElement) {
      currentUserInfo = allUsers.find(
        (user) => user.login === target.parentElement?.id,
      );
    } else if (target instanceof HTMLLIElement) {
      currentUserInfo = allUsers.find((user) => user.login === target.id);
    }

    if (currentUserInfo) {
      StoreModel.dispatch(setSelectedUser(currentUserInfo));
    }

    this.eventMediator.notify(
      MEDIATOR_EVENTS.OPEN_USER_DIALOGUE,
      currentUserInfo,
    );
  }

  private setUserListHandler(): boolean {
    this.view.getUserList().addEventListener(EVENT_NAMES.CLICK, (event) => {
      this.userListHandler(event);
    });
    return true;
  }

  private redrawUnreadMessagesHandler(message: unknown): boolean {
    const checkedMessage = isFromServerMessage(message);
    const { currentUserDialogs } = StoreModel.getState();
    currentUserDialogs.forEach((dialog) => {
      const deletedMessage = dialog.messages.find(
        (msg) => msg.id === checkedMessage?.payload.message.id,
      );
      if (deletedMessage) {
        const currentDialog = dialog;
        currentDialog.messages = dialog.messages.filter(
          (msg) => msg.id !== deletedMessage.id,
        );
        StoreModel.dispatch(setCurrentUserDialogs(currentUserDialogs));
        this.drawUnreadMessages();
      }
    });

    return true;
  }

  private subscribeToEventMediator(): boolean {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_RESPONSE,
      (message) => {
        this.getAllUsersHandler(message);
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_RESPONSE,
      (message) => {
        this.getAllUsersHandler(message);
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT_RESPONSE,
      this.getAllUsers.bind(this),
    );

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_IN_RESPONSE, () => {
      this.getAllUsers();
    });

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
      this.getAllUsers.bind(this),
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
      this.getAllUsers.bind(this),
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
      (message) => {
        this.saveMessages(message);
      },
    );

    return true;
  }

  private subscribeToEventMediator2(): boolean {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE,
      (message) => {
        this.saveMessages(message);
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_RESPONSE,
      (message) => {
        this.redrawUnreadMessagesHandler(message);
      },
    );
    return true;
  }

  private searchInputHandler(): void {
    const { currentAuthorizedUsers, currentUnauthorizedUsers, currentUser } =
      StoreModel.getState();
    const allUsers = [...currentAuthorizedUsers, ...currentUnauthorizedUsers];

    const inputValue = this.view
      .getSearchInput()
      .getHTML()
      .value.toLowerCase()
      .trim();
    const filteredUsers = allUsers.filter((user) =>
      user.login.toLowerCase().includes(inputValue),
    );

    this.view.clearUserList();

    const currentUsers = filteredUsers.filter(
      (user) => user.login !== currentUser?.login,
    );

    if (!currentUsers.length) {
      this.view.emptyUserList();
    }

    currentUsers.forEach((user) => {
      this.view.drawUser(user);
    });

    this.drawUnreadMessages();
  }

  private setSearchInputHandler(): void {
    this.view
      .getSearchInput()
      .getHTML()
      .addEventListener(EVENT_NAMES.INPUT, this.searchInputHandler.bind(this));
  }

  private init(): void {
    this.setUserListHandler();
    this.setSearchInputHandler();
    this.subscribeToEventMediator();
    this.subscribeToEventMediator2();
  }
}

export default UserListModel;
