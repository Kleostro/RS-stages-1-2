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

export const modalTitle = new CreateElement({
  tag: 'h2',
  classes: ['modal__title'],
  parent: modalContent,
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
