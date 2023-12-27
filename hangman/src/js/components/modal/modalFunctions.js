export const showModal = () => {
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalContent = document.querySelector('.modal__content');

  if (modal.classList.contains('visible')) {
    modal.classList.remove('visible');
    modalOverlay.classList.remove('visible');
    modalContent.classList.remove('visible');
    document.body.classList.add('stop-scroll');
  } else {
    modal.classList.add('visible');
    modalOverlay.classList.add('visible');
    modalContent.classList.add('visible');
    document.body.classList.add('stop-scroll');
  }
};

export const winModal = (answer) => {
  const modalTitle = document.querySelector('.modal__content-title');
  modalTitle.textContent = 'VICTORY!';

  const modalSubtitle = document.querySelector('.modal__content-subtitle');
  modalSubtitle.innerHTML = `You guessed the word: <span class="modal__content-accent">${answer}</span>`;

  showModal();
};

export const defeatModal = (answer) => {
  const modalTitle = document.querySelector('.modal__content-title');
  modalTitle.textContent = 'DEFEAT!!';

  const modalSubtitle = document.querySelector('.modal__content-subtitle');
  modalSubtitle.innerHTML = `The target word was: <span class="modal__content-accent">${answer}</span>`;

  showModal();
};
