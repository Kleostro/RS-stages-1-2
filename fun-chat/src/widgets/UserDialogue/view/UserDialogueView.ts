import type { User } from '../../../shared/Store/initialData.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import USER_DIALOGUE_STYLES from './userDialogue.module.scss';

class UserDialogueView {
  private currentUserInfo: HTMLSpanElement;

  private dialogWrapper: HTMLDivElement;

  constructor() {
    this.currentUserInfo = this.createCurrentUserInfo();
    this.dialogWrapper = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.dialogWrapper;
  }

  public getCurrentUserInfo(): HTMLSpanElement {
    return this.currentUserInfo;
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

  private createHTML(): HTMLDivElement {
    this.dialogWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_DIALOGUE_STYLES.dialogWrapper],
    });

    this.dialogWrapper.append(this.currentUserInfo);

    return this.dialogWrapper;
  }
}

export default UserDialogueView;
