import ModalView from '../view/ModalView.ts';
import MODAL_STYLES from '../view/modal.module.scss';

class ModalModel {
  private view = new ModalView();

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  public setModalText(text: string): void {
    this.view.getModalContent().textContent = text;
  }

  public show(): void {
    const modal = this.getHTML();
    const modalOverlay = this.view.getModalOverlay();
    const modalContent = this.view.getModalContent();
    modal.classList.remove(MODAL_STYLES.modal_hidden);
    modalOverlay.classList.remove(MODAL_STYLES.modalOverlay_hidden);
    modalContent.classList.remove(MODAL_STYLES.modalContent_hidden);
    document.body.classList.add('stop-scroll');
  }

  public hide(): void {
    const modal = this.getHTML();
    const modalOverlay = this.view.getModalOverlay();
    const modalContent = this.view.getModalContent();
    modal.classList.add(MODAL_STYLES.modal_hidden);
    modalOverlay.classList.add(MODAL_STYLES.modalOverlay_hidden);
    modalContent.classList.add(MODAL_STYLES.modalContent_hidden);
    document.body.classList.remove('stop-scroll');
  }
}

export default ModalModel;
