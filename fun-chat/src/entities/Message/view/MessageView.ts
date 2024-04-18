import createBaseElement from '../../../utils/createBaseElement.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import MESSAGE_STYLES from './message.module.scss';
import messageDateFormatting from '../../../utils/messageDateFormatting.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import MESSAGE_STATE from '../types/enums.ts';
import type { Message } from '../../../utils/isMessage.ts';

class MessageView {
  private messageParams: Message;

  private messageText: HTMLSpanElement;

  private messageDate: HTMLSpanElement;

  private messageLogin: HTMLSpanElement;

  private messageStatus: HTMLSpanElement;

  private message: HTMLDivElement;

  constructor(messageParams: Message) {
    this.messageParams = messageParams;
    this.messageText = this.createMessageText();
    this.messageDate = this.createMessageDate();
    this.messageLogin = this.createMessageLogin();
    this.messageStatus = this.createMessageStatus();
    this.message = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.message;
  }

  public deliveredMessage(): void {
    this.messageStatus.innerHTML = MESSAGE_STATE.DELIVERED;
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
    );

    if (this.wasSentByCurrentUser()) {
      this.message.classList.add(MESSAGE_STYLES.currentUser);
      this.messageLogin.textContent = 'You';
    } else {
      this.message.classList.add(MESSAGE_STYLES.otherUser);
      this.messageStatus.textContent = '';
    }

    return this.message;
  }
}

export default MessageView;
