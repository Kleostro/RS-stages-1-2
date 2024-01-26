import { timer } from '../game/gameLayout';
import {
  modal,
  modalCloseBtn,
  modalContent,
  modalNonogram,
  modalOverlay,
  modalSubtitle,
  modalTimerTime,
} from './endGameModalLayout';

export const showModal = () => {
  modal.classList.toggle('visible');
  modalOverlay.classList.toggle('visible');
  modalContent.classList.toggle('visible');
};

const showNonogramSolutionInModal = (copyPlayground) => {
  modalNonogram.innerHTML = '';
  const copyPlaygroundRows = Array.from(copyPlayground.children);

  copyPlaygroundRows.forEach((row) => {
    row.removeAttribute('class');
    row.classList.add('modal__nonogram-row');

    Array.from(row.children).forEach((cell) => {
      cell.classList.remove('cell-highlight');
      cell.classList.remove('playground__cell');
      cell.classList.add('modal__nonogram-cell');
    });
  });

  modalNonogram.append(...copyPlaygroundRows);
};

modalCloseBtn.addEventListener('click', showModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    showModal();
  }
});

export const endGameModal = (title, copyPlayground) => {
  modalSubtitle.textContent = title;
  modalTimerTime.textContent = timer.textContent;
  showModal();
  showNonogramSolutionInModal(copyPlayground);
};
