import CreateElement from '../../../CreateElement';
import './winnersView.scss';

const MAX_MS_IN_SEC = 60;
const MAX_SEC_IN_MIN = 60;

const MAX_WINNERS = 5;
class WinnersView {
  constructor() {
    this.#createHTML();

    const LS = JSON.parse(localStorage.getItem('kleostro'));

    if (!LS?.winners) {
      LS.winners = [];
      localStorage.setItem('kleostro', JSON.stringify(LS));
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
      time: params[2],
    };
    const LS = JSON.parse(localStorage.getItem('kleostro'));
    if (LS.winners.length >= MAX_WINNERS) {
      LS.winners.shift();
      LS.winners.push(winner);
    } else {
      LS.winners.push(winner);
    }
    localStorage.setItem('kleostro', JSON.stringify(LS));
    this.sortWinners();
  }

  sortWinners() {
    this.LS = JSON.parse(localStorage.getItem('kleostro'));
    return this.LS.winners.sort((a, b) => a.time - b.time);
  }

  show() {
    this.winnersList.innerHTML = '';
    this.winnersBox.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.content.classList.toggle('hidden');
    document.body.classList.toggle('stop-scroll');

    const sortedListWinners = this.sortWinners();

    if (sortedListWinners.length === 0) {
      this.winnersList.textContent = 'List is empty...';
      return;
    }

    const listIndex = new CreateElement({
      tag: 'li',
      classes: ['winners-modal__list-header'],
      textContent: '№',
    });
    const listTitle = new CreateElement({
      tag: 'li',
      classes: ['winners-modal__list-header'],
      textContent: 'Name',
    });
    const listSize = new CreateElement({
      tag: 'li',
      classes: ['winners-modal__list-header'],
      textContent: 'Size',
    });
    const listTime = new CreateElement({
      tag: 'li',
      classes: ['winners-modal__list-header'],
      textContent: 'Time',
    });

    this.winnersList.append(listIndex, listTitle, listSize, listTime);

    sortedListWinners.forEach((winner, index) => {
      const formattedMin = Math.floor(winner.time / MAX_SEC_IN_MIN)
        .toString()
        .padStart(2, '0');
      const formattedSec = (winner.time % MAX_MS_IN_SEC)
        .toString()
        .padStart(2, '0');
      const currentIndex = index + 1;

      const listItem = new CreateElement({
        tag: 'li',
        classes: ['winners-modal__list-item'],
      });
      const winnerIndex = new CreateElement({
        tag: 'span',
        classes: ['winners-modal__list-index'],
        textContent: currentIndex,
      });
      const winnerTitle = new CreateElement({
        tag: 'span',
        classes: ['winners-modal__list-title'],
        textContent: winner.title,
      });
      const winnerSize = new CreateElement({
        tag: 'span',
        classes: ['winners-modal__list-size'],
        textContent: winner.size,
      });
      const winnerTime = new CreateElement({
        tag: 'span',
        classes: ['winners-modal__list-time'],
        textContent: `${formattedMin}:${formattedSec}`,
      });

      listItem.append(winnerIndex, winnerTitle, winnerSize, winnerTime);
      this.winnersList.append(listItem);
    });
  }

  #createHTML() {
    this.winnersBox = new CreateElement({ classes: ['winners-modal'] });
    this.overlay = new CreateElement({ classes: ['winners-modal__overlay'] });
    this.content = new CreateElement({ classes: ['winners-modal__content'] });
    this.title = new CreateElement({
      tag: 'h3',
      classes: ['winners-modal__title'],
      textContent: 'List of winners',
    });
    this.closeBtn = new CreateElement({
      tag: 'btn',
      classes: ['btn-reset', 'winners-modal__close-btn'],
    });

    this.winnersList = new CreateElement({
      tag: 'ul',
      classes: ['list-reset', 'winners-modal__list'],
    });

    this.content.append(this.title, this.winnersList, this.closeBtn);
    this.overlay.append(this.content);
    this.winnersBox.append(this.overlay);
  }
}

export default WinnersView;
