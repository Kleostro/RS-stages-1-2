import { TAG_NAMES } from '../../types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import MODAL_STYLES from './modal.module.scss';

class ModalView {
  private modalContent: HTMLDivElement;

  private modalOverlay: HTMLDivElement;

  private modal: HTMLDivElement;

  constructor() {
    this.modalContent = this.createModalContent();
    this.modalOverlay = this.createModalOverlay();
    this.modal = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.modal;
  }

  public getModalOverlay(): HTMLDivElement {
    return this.modalOverlay;
  }

  public getModalContent(): HTMLDivElement {
    return this.modalContent;
  }

  private createModalContent(): HTMLDivElement {
    this.modalContent = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modalContent],
    });

    return this.modalContent;
  }

  private createModalOverlay(): HTMLDivElement {
    this.modalOverlay = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modalOverlay],
    });

    return this.modalOverlay;
  }

  private createHTML(): HTMLDivElement {
    this.modal = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modal, MODAL_STYLES.modal_hidden],
    });

    this.modalOverlay.append(this.modalContent);
    this.modal.append(this.modalOverlay);

    return this.modal;
  }
}

export default ModalView;
