import CreateElement from '../../CreateElement';
import './endGameModal.scss';

export const modal = new CreateElement({
  tag: 'div',
  classes: ['modal', 'visible'],
});

export const modalOverlay = new CreateElement({
  tag: 'div',
  classes: ['modal__overlay', 'visible'],
  parent: modal,
});

export const modalContent = new CreateElement({
  tag: 'div',
  classes: ['modal__content', 'visible'],
  parent: modalOverlay,
});

const modalTitle = new CreateElement({
  tag: 'h3',
  classes: ['modal__title'],
  parent: modalContent,
  textContent: 'Great! You have solved the nonogram: ',
});

export const modalSubtitle = new CreateElement({
  tag: 'span',
  classes: ['modal__title-accent'],
  parent: modalTitle,
});

const modalTimer = new CreateElement({
  tag: 'h3',
  classes: ['modal__timer'],
  parent: modalContent,
  textContent: 'Time: ',
});

export const modalTimerTime = new CreateElement({
  tag: 'strong',
  classes: ['modal__timer-accent'],
  parent: modalTimer,
});

export const modalCloseBtn = new CreateElement({
  tag: 'button',
  classes: ['btn-reset', 'modal__close-btn'],
  parent: modalContent,
});

export const modalNonogram = new CreateElement({
  tag: 'div',
  classes: ['modal__nonogram'],
  parent: modalContent,
});
