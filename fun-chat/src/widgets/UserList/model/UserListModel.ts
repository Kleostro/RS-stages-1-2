import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import UserListView from '../view/UserListView.ts';
import { isFromServerMessage } from '../../../utils/isFromServerMessage.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import {
  setCurrentAuthorizedUsers,
  setCurrentUnauthorizedUsers,
} from '../../../shared/Store/actions/actions.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';

class UserListModel {
  private view: UserListView = new UserListView();

  private eventMediator = EventMediatorModel.getInstance();

  constructor() {
    this.subscribeToEventMediator();
    this.setSearchInputHandler();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private getActiveUsers(): void {
    const requestMessage = {
      id: '',
      type: 'USER_ACTIVE',
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
      type: 'USER_INACTIVE',
      payload: null,
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      requestMessage,
    );
  }

  private drawUsers(): void {
    this.view.clearUserList();
    const allUsers = [
      ...StoreModel.getState().currentAuthorizedUsers,
      ...StoreModel.getState().currentUnauthorizedUsers,
    ];
    const currentAuthUserLogin = StoreModel.getState().currentUser?.login;
    const currentUsers = allUsers.filter(
      (user) => user.login !== currentAuthUserLogin,
    );
    currentUsers.forEach((user) => {
      this.view.drawUser(user);
    });
  }

  private getAllAuthenticatedUsersHandler(message: unknown): void {
    const checkedMessage = isFromServerMessage(message);
    if (checkedMessage) {
      StoreModel.dispatch(
        setCurrentAuthorizedUsers(checkedMessage.payload.users),
      );
      this.drawUsers();
    }
  }

  private getAllUnauthenticatedUsersHandler(message: unknown): void {
    const checkedMessage = isFromServerMessage(message);
    if (checkedMessage) {
      StoreModel.dispatch(
        setCurrentUnauthorizedUsers(checkedMessage.payload.users),
      );
      this.drawUsers();
    }
  }

  private subscribeToEventMediator(): boolean {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_RESPONSE,
      (message) => {
        this.getAllAuthenticatedUsersHandler(message);
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_RESPONSE,
      (message) => {
        this.getAllUnauthenticatedUsersHandler(message);
      },
    );

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () => {
      this.getActiveUsers();
      this.getInactiveUsers();
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_IN_RESPONSE, () => {
      this.getActiveUsers();
      this.getInactiveUsers();
    });

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
      () => {
        this.getActiveUsers();
        this.getInactiveUsers();
      },
    );

    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
      () => {
        this.getActiveUsers();
        this.getInactiveUsers();
      },
    );

    return true;
  }

  private searchInputHandler(): void {
    const allUsers = [
      ...StoreModel.getState().currentAuthorizedUsers,
      ...StoreModel.getState().currentUnauthorizedUsers,
    ];

    const input = this.view.getSearchInput().getHTML();
    const inputValue = input.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      user.login.toLowerCase().includes(inputValue),
    );
    this.view.clearUserList();
    const currentAuthUserLogin = StoreModel.getState().currentUser?.login;
    const currentUsers = filteredUsers.filter(
      (user) => user.login !== currentAuthUserLogin,
    );

    if (!currentUsers.length) {
      this.view.emptyUserList();
    }

    currentUsers.forEach((user) => {
      this.view.drawUser(user);
    });
  }

  private setSearchInputHandler(): void {
    this.view
      .getSearchInput()
      .getHTML()
      .addEventListener(EVENT_NAMES.INPUT, this.searchInputHandler.bind(this));
  }
}

export default UserListModel;
