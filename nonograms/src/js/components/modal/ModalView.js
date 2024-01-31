import CreateElement from '../../CreateElement';
import './modalView.scss';

class ModalView {
  constructor() {
    this.message = null;
    this.name = null;
    this.time = null;

    this.#createHTML()

    this.closeBtn.addEventListener('click', () => this.show(this.message, this.name, this.time));

    this.overlay.addEventListener('click', ({ target }) => {
      if (target === this.overlay) {
        this.show(this.message, this.name, this.time);
      }
    });
  }

  /**
  * get HTML modal
  * @returns {Element} HTML-Element modal
  */
  getHTML() {
    return this.modalBox;
  }

  /**
  * show modal
  * @param {string} message - modal message
  * @param {string} name - modal name
  * @param {number} time - modal time
  */
  show(message, name, time) {
    this.message = message;
    this.name = name;
    this.time = time;

    const { formattedMin, formattedSec } = this.time;

    this.title.innerHTML = `${this.message}<span class="modal__title--accent">${this.name}</span>`;
    this.subtitle.innerHTML = `Time: <span class="modal__subtitle--accent">${formattedMin}:${formattedSec}</span>`;

    this.modalBox.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.content.classList.toggle('hidden');
    document.body.classList.toggle('stop-scroll');
  }

  /**
  * create HTML modal
  */
  #createHTML() {
    this.modalBox = new CreateElement({ classes: ['modal'] });
    this.overlay = new CreateElement({ classes: ['modal__overlay'] });
    this.content = new CreateElement({ classes: ['modal__content'] });
    this.title = new CreateElement({ tag: 'h3', classes: ['modal__title'] });
    this.subtitle = new CreateElement({ tag: 'h3', classes: ['modal__subtitle'] });
    this.closeBtn = new CreateElement({ tag: 'btn', classes: ['btn-reset', 'modal__close-btn'] });

    this.content.append(this.title, this.subtitle, this.closeBtn);
    this.overlay.append(this.content);
    this.modalBox.append(this.overlay);
  }
}

export default ModalView;
