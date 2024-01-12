import BaseCreateElement from '../../BaseCreateElement';
import './modal.scss';

const modal = new BaseCreateElement('div', ['modal', 'visible']);
export const modalElem = modal.elem;

const modalOverlay = new BaseCreateElement('div', ['modal__overlay', 'visible']);
const modalOverlayElem = modalOverlay.elem;

const modalContent = new BaseCreateElement('div', ['modal__content', 'visible']);
const modalContentElem = modalContent.elem;

const modalTitle = new BaseCreateElement('h2', ['modal__content-title']);
const modalTitleElem = modalTitle.elem;

const modalSubtitle = new BaseCreateElement('h3', ['modal__content-subtitle']);
const modalSubtitleElem = modalSubtitle.elem;

const playBtn = new BaseCreateElement('button', ['btn-reset', 'modal__content-btn']);
export const playBtnElem = playBtn.elem;
playBtnElem.textContent = 'Play again';

export const showModal = () => {
  modalElem.classList.toggle('visible');
  modalOverlayElem.classList.toggle('visible');
  modalContentElem.classList.toggle('visible');
};

export const endGameModal = (outcome, answer) => {
  modalTitleElem.textContent = outcome === 'win' ? 'VICTORY!' : 'DEFEAT!';
  modalSubtitleElem.innerHTML = outcome === 'win'
    ? `You guessed the word: <span class="modal__content-accent">${answer}</span>`
    : `The target word was: <span class="modal__content-accent">${answer}</span>`;
  showModal();
};

modalContentElem.append(modalTitleElem, modalSubtitleElem, playBtnElem);
modalOverlayElem.append(modalContentElem);
modalElem.append(modalOverlayElem);

export default modalElem;
