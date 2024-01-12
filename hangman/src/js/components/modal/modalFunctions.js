import { modalContentElem, modalElem, modalOverlayElem, modalSubtitleElem, modalTitleElem } from './modal';

export const showModal = () => {
  if (modalElem.classList.contains('visible')) {
    modalElem.classList.remove('visible');
    modalOverlayElem.classList.remove('visible');
    modalContentElem.classList.remove('visible');
    document.body.classList.remove('stop-scroll');
  } else {
    modalElem.classList.add('visible');
    modalOverlayElem.classList.add('visible');
    modalContentElem.classList.add('visible');
    document.body.classList.add('stop-scroll');
  }
};

export const winModal = (answer) => {
  modalTitleElem.textContent = 'VICTORY!';
  modalSubtitleElem.innerHTML = `You guessed the word: <span class="modal__content-accent">${answer}</span>`;
  showModal();
};

export const defeatModal = (answer) => {
  modalTitleElem.textContent = 'DEFEAT!';
  modalSubtitleElem.innerHTML = `The target word was: <span class="modal__content-accent">${answer}</span>`;
  showModal();
};
