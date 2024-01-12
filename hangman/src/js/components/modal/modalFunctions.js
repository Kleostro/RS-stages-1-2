import { modalContentElem, modalElem, modalOverlayElem, modalSubtitleElem, modalTitleElem } from './modal';

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
