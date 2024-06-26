import InputModel from '../../../shared/Input/model/InputModel.ts';
import type { User } from '../../../shared/Store/initialData.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import USER_LIST_STYLES from './userList.module.scss';
import INPUT_TYPES from '../../../shared/Input/types/enums.ts';
import { SEARCH_INPUT_PLACEHOLDER, EMPTY_USERS_LIST } from '../types/enums.ts';
import type { Message } from '../../../utils/isMessage.ts';

class UserListView {
  private searchInput: InputModel;

  private userList: HTMLUListElement;

  private wrapper: HTMLDivElement;

  constructor() {
    this.searchInput = this.createSearchInput();
    this.userList = this.createUserList();
    this.wrapper = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.wrapper;
  }

  public getSearchInput(): InputModel {
    return this.searchInput;
  }

  public drawUser(userInfo: User): void {
    this.userList.classList.remove(USER_LIST_STYLES.userListEmpty);

    const user = createBaseElement({
      tag: TAG_NAMES.LI,
      cssClasses: [USER_LIST_STYLES.user],
      attributes: {
        id: userInfo.login,
      },
      innerContent: userInfo.login,
    });

    if (userInfo.isLogined) {
      user.classList.add(USER_LIST_STYLES.userActive);
    } else {
      user.classList.add(USER_LIST_STYLES.userInactive);
    }
    this.userList.append(user);
  }

  public clearUserList(): void {
    this.userList.innerHTML = '';
  }

  public getUserList(): HTMLUListElement {
    return this.userList;
  }

  public emptyUserList(): void {
    this.userList.innerHTML = EMPTY_USERS_LIST;
    this.userList.classList.add(USER_LIST_STYLES.userListEmpty);
  }

  public selectUser(target: EventTarget | null): void {
    if (target instanceof HTMLLIElement || target instanceof HTMLSpanElement) {
      const users = this.userList.children;
      Array.from(users).forEach((user) => {
        user.classList.remove(USER_LIST_STYLES.userSelected);
      });
      target.classList.add(USER_LIST_STYLES.userSelected);
    }
  }

  public drawUnreadMessagesCount(login: string, messages: Message[]): void {
    const users = this.userList.children;
    Array.from(users).forEach((item) => {
      if (item.id === login) {
        const currentUser = item;
        const currentUserLogin = item.id;
        const unreadMessages = messages.filter(
          (message) => message.from === currentUserLogin,
        );
        currentUser.innerHTML = '';
        currentUser.textContent = currentUserLogin;
        if (unreadMessages.length) {
          const counter = createBaseElement({
            tag: TAG_NAMES.SPAN,
            cssClasses: [USER_LIST_STYLES.counter],
            innerContent: unreadMessages.length.toString(),
          });

          item.append(counter);
        }
      }
    });
  }

  private createSearchInput(): InputModel {
    this.searchInput = new InputModel({
      placeholder: SEARCH_INPUT_PLACEHOLDER,
      type: INPUT_TYPES.SEARCH,
    });

    this.searchInput
      .getHTML()
      .classList.add(USER_LIST_STYLES.userListSearchInput);

    return this.searchInput;
  }

  private createUserList(): HTMLUListElement {
    this.userList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [USER_LIST_STYLES.userList],
    });
    return this.userList;
  }

  private createHTML(): HTMLDivElement {
    this.wrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_LIST_STYLES.wrapper],
    });

    this.wrapper.append(this.searchInput.getHTML(), this.userList);
    return this.wrapper;
  }
}

export default UserListView;
