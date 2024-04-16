import type { User } from '../../../shared/Store/initialData.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
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

  public hideDialogue(): void {
    const innerContent = 'Select user to start messaging';
    this.messagesWrapper.innerHTML = innerContent;
    this.currentUserInfo.classList.add(USER_DIALOGUE_STYLES.hidden);
  }

  public showDialogue(): void {
    this.messagesWrapper.innerHTML = '';
    this.currentUserInfo.classList.remove(USER_DIALOGUE_STYLES.hidden);
  }

  public setCurrentUserInfo(userInfo: User): void {
    this.currentUserInfo.textContent = userInfo.login;
    if (userInfo.isLogined) {
      this.currentUserInfo.classList.remove(USER_DIALOGUE_STYLES.inactive);
      this.currentUserInfo.classList.add(USER_DIALOGUE_STYLES.active);
    } else {
      this.currentUserInfo.classList.remove(USER_DIALOGUE_STYLES.active);
      this.currentUserInfo.classList.add(USER_DIALOGUE_STYLES.inactive);
    }
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
