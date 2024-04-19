import createBaseElement from '../../../utils/createBaseElement.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import MESSAGE_STYLES from './message.module.scss';
import messageDateFormatting from '../../../utils/messageDateFormatting.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import { MESSAGE_STATE, MESSAGE_BUTTONS_TEXT } from '../types/enums.ts';
import type { Message } from '../../../utils/isMessage.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import type { MessageFromServer } from '../../../utils/isFromServerMessage.ts';

class MessageView {
  private messageParams: Message;

  private editButton: ButtonModel;

  private deleteButton: ButtonModel;

  private editWrapper: HTMLDivElement;

  private messageText: HTMLSpanElement;

  private messageDate: HTMLSpanElement;

  private messageLogin: HTMLSpanElement;

  private messageStatus: HTMLSpanElement;

  private messageEdited: HTMLSpanElement;

  private message: HTMLDivElement;

  constructor(messageParams: Message) {
    this.messageParams = messageParams;
    this.editButton = this.createEditButton();
    this.deleteButton = this.createDeleteButton();
    this.editWrapper = this.createEditWrapper();
    this.messageText = this.createMessageText();
    this.messageDate = this.createMessageDate();
    this.messageLogin = this.createMessageLogin();
    this.messageStatus = this.createMessageStatus();
    this.messageEdited = this.createMessageEdited();
    this.message = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.message;
  }

  public deliveredMessage(): void {
    this.messageStatus.innerHTML = MESSAGE_STATE.DELIVERED;
  }

  public editedMessage(checkedMessage: MessageFromServer): void {
    this.messageEdited.textContent = MESSAGE_STATE.EDITED;
    this.messageText.textContent = checkedMessage?.payload?.message?.text;
  }

  public getEditWrapper(): HTMLDivElement {
    return this.editWrapper;
  }

  public getDeleteButton(): ButtonModel {
    return this.deleteButton;
  }

  public getEditButton(): ButtonModel {
    return this.editButton;
  }

  public switchVisibleEditWrapper(): void {
    this.editWrapper.classList.toggle(MESSAGE_STYLES.hidden);
  }

  public hideEditWrapper(): void {
    this.editWrapper.classList.add(MESSAGE_STYLES.hidden);
  }

  private createEditButton(): ButtonModel {
    this.editButton = new ButtonModel({
      text: MESSAGE_BUTTONS_TEXT.EDIT,
      classes: [MESSAGE_STYLES.editButton],
    });

    return this.editButton;
  }

  private createDeleteButton(): ButtonModel {
    this.deleteButton = new ButtonModel({
      text: MESSAGE_BUTTONS_TEXT.DELETE,
      classes: [MESSAGE_STYLES.deleteButton],
    });

    return this.deleteButton;
  }

  private createEditWrapper(): HTMLDivElement {
    this.editWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MESSAGE_STYLES.editWrapper, MESSAGE_STYLES.hidden],
    });

    this.editWrapper.append(
      this.editButton.getHTML(),
      this.deleteButton.getHTML(),
    );

    return this.editWrapper;
  }

  private createMessageText(): HTMLSpanElement {
    this.messageText = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.text],
      innerContent: this.messageParams.text,
    });

    return this.messageText;
  }

  private createMessageLogin(): HTMLSpanElement {
    this.messageLogin = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.login],
      innerContent: this.messageParams.from,
    });

    return this.messageLogin;
  }

  private createMessageDate(): HTMLSpanElement {
    this.messageDate = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.date],
      innerContent: messageDateFormatting(this.messageParams.datetime),
    });

    return this.messageDate;
  }

  private createMessageStatus(): HTMLSpanElement {
    const { isDelivered } = this.messageParams.status;
    this.messageStatus = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.status],
      innerContent: isDelivered
        ? MESSAGE_STATE.DELIVERED
        : MESSAGE_STATE.SENDED,
    });

    return this.messageStatus;
  }

  private createMessageEdited(): HTMLSpanElement {
    const { isEdited } = this.messageParams.status;
    this.messageEdited = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.edited],
      innerContent: isEdited ? MESSAGE_STATE.EDITED : '',
    });

    return this.messageEdited;
  }

  private wasSentByCurrentUser(): boolean {
    return this.messageParams.from === StoreModel.getState().currentUser?.login;
  }

  private createHTML(): HTMLDivElement {
    this.message = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MESSAGE_STYLES.message],
    });

    this.message.append(
      this.messageText,
      this.messageDate,
      this.messageLogin,
      this.messageStatus,
      this.messageEdited,
    );

    if (this.wasSentByCurrentUser()) {
      this.message.classList.add(MESSAGE_STYLES.currentUser);
      this.messageLogin.textContent = 'You';
      this.message.prepend(this.editWrapper);
    } else {
      this.message.classList.add(MESSAGE_STYLES.otherUser);
      this.messageStatus.textContent = '';
    }

    return this.message;
  }
}

export default MessageView;
