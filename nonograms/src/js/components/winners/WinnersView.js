import CreateElement from '../../CreateElement';
import './winnersView.scss';

class WinnersView {
  constructor() {
    this.#createHTML();

    if (!localStorage['winners']) {
      const kleostroLS = JSON.parse(localStorage.kleostro);
      kleostroLS['winners'] = [];
      localStorage.kleostro = JSON.stringify(kleostroLS);
    }

    this.closeBtn.addEventListener('click', () => this.show());

    this.overlay.addEventListener('click', ({ target }) => {
      if (target === this.overlay) {
        this.show();
      }
    });
  }

  getHTML() {
    return this.winnersBox;
  }

  addWinner(...params) {
    const winner = {
      title: params[0],
      size: params[1],
      time: params[2]
    }
    const LS = JSON.parse(localStorage.kleostro);
    LS['winners'].push(winner);
    localStorage.kleostro = JSON.stringify(LS);
  }

  show() {
    this.winnersBox.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.content.classList.toggle('hidden');
    document.body.classList.toggle('stop-scroll');
  }

  #createHTML() {
    this.winnersBox = new CreateElement({ classes: ['winners-modal'] });
    this.overlay = new CreateElement({ classes: ['winners-modal__overlay'] });
    this.content = new CreateElement({ classes: ['winners-modal__content'] });
    this.title = new CreateElement({ tag: 'h3', classes: ['winners-modal__title'], textContent: 'List of winners' });
    this.closeBtn = new CreateElement({ tag: 'btn', classes: ['btn-reset', 'winners-modal__close-btn'] });

    this.content.append(this.title, this.closeBtn);
    this.overlay.append(this.content);
    this.winnersBox.append(this.overlay);
  }
}

export default WinnersView;
