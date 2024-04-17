import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import UserListView from '../view/UserListView.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import {
  setCurrentAuthorizedUsers,
  setCurrentUnauthorizedUsers,
  setSelectedUser,
} from '../../../shared/Store/actions/actions.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import { API_TYPES } from '../../../shared/Server/ServerApi/types/enums.ts';

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

  private drawUsers(): void {
    this.view.clearUserList();
    const { currentAuthorizedUsers, currentUnauthorizedUsers, currentUser } =
      StoreModel.getState();

    const currentUsers = [
      ...currentAuthorizedUsers,
      ...currentUnauthorizedUsers,
    ].filter((user) => user.login !== currentUser?.login);

    if (!currentUsers.length) {
      this.view.emptyUserList();
    }

    currentUsers.forEach((user) => {
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
      this.drawUsers();
    }
  }

  private userListHandler(event: Event): void {
    const { target } = event;
    if (target instanceof HTMLLIElement) {
      this.view.selectUser(target);
      const allUsers = [
        ...StoreModel.getState().currentAuthorizedUsers,
        ...StoreModel.getState().currentUnauthorizedUsers,
      ];
      const currentUserInfo = allUsers.find(
        (user) => user.login === target.textContent,
      );

      if (currentUserInfo) {
        StoreModel.dispatch(setSelectedUser(currentUserInfo));
      }

      this.eventMediator.notify(
        MEDIATOR_EVENTS.OPEN_USER_DIALOGUE,
        currentUserInfo,
      );
    }
  }

  private setUserListHandler(): boolean {
    this.view.getUserList().addEventListener(EVENT_NAMES.CLICK, (event) => {
      this.userListHandler(event);
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

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_IN_RESPONSE,
      this.getAllUsers.bind(this),
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
      this.getAllUsers.bind(this),
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
      this.getAllUsers.bind(this),
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

    currentUsers.forEach((user) => this.view.drawUser(user));
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
  }
}

export default UserListModel;
