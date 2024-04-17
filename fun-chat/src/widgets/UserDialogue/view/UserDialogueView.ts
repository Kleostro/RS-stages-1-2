import type { User } from '../../../shared/Store/initialData.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import MESSAGES_WRAPPER_CONTENT from '../types/enums.ts';
import USER_DIALOGUE_STYLES from './userDialogue.module.scss';

class UserDialogueView {
  private currentUserInfo: HTMLSpanElement;

  private messagesWrapper: HTMLDivElement;

  private dialogWrapper: HTMLDivElement;

  constructor() {
    this.currentUserInfo = this.createCurrentUserInfo();
    this.messagesWrapper = this.createMessagesWrapper();
    this.dialogWrapper = this.createHTML();
    this.hideDialogue();
  }

  public getHTML(): HTMLDivElement {
    return this.dialogWrapper;
  }

  public getCurrentUserInfo(): HTMLSpanElement {
    return this.currentUserInfo;
  }

  public getMessagesWrapper(): HTMLDivElement {
    return this.messagesWrapper;
  }

  public clearMessagesWrapper(): void {
    this.messagesWrapper.classList.remove(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = '';
  }

  public hideDialogue(): void {
    this.messagesWrapper.classList.add(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = MESSAGES_WRAPPER_CONTENT.NO_USER_SELECT;
    this.currentUserInfo.classList.add(USER_DIALOGUE_STYLES.hidden);
  }

  public showDialogue(): void {
    this.messagesWrapper.innerHTML = '';
    this.currentUserInfo.classList.remove(USER_DIALOGUE_STYLES.hidden);
    this.messagesWrapper.classList.remove(USER_DIALOGUE_STYLES.emptyList);
  }

  public showEmptyDialogue(): void {
    this.messagesWrapper.classList.add(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = MESSAGES_WRAPPER_CONTENT.EMPTY;
  }

  public setCurrentUserInfo(userInfo: User): void {
    const { active, inactive } = USER_DIALOGUE_STYLES;
    this.currentUserInfo.textContent = userInfo.login;
    this.currentUserInfo.classList.toggle(inactive, !userInfo.isLogined);
    this.currentUserInfo.classList.toggle(active, !!userInfo.isLogined);
  }

  private createCurrentUserInfo(): HTMLSpanElement {
    this.currentUserInfo = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [USER_DIALOGUE_STYLES.currentUserInfo],
    });

    return this.currentUserInfo;
  }

  private createMessagesWrapper(): HTMLDivElement {
    this.messagesWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_DIALOGUE_STYLES.messagesWrapper],
    });

    return this.messagesWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.dialogWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_DIALOGUE_STYLES.dialogWrapper],
    });

    this.dialogWrapper.append(this.currentUserInfo, this.messagesWrapper);

    return this.dialogWrapper;
  }
}

export default UserDialogueView;
