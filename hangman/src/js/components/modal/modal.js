import BaseCreateElement from '../../BaseCreateElement';
import { startGame } from '../game/gameStates';
import './modal.scss';

const modal = new BaseCreateElement('div', ['modal', 'visible']);
export const modalElem = modal.elem;

const modalOverlay = new BaseCreateElement('div', ['modal__overlay', 'visible']);
export const modalOverlayElem = modalOverlay.elem;

const modalContent = new BaseCreateElement('div', ['modal__content', 'visible']);
export const modalContentElem = modalContent.elem;

const modalTitle = new BaseCreateElement('h2', ['modal__content-title']);
export const modalTitleElem = modalTitle.elem;

const modalSubtitle = new BaseCreateElement('h3', ['modal__content-subtitle']);
export const modalSubtitleElem = modalSubtitle.elem;

const playBtn = new BaseCreateElement('button', ['btn-reset', 'modal__content-btn']);
export const playBtnElem = playBtn.elem;
playBtnElem.textContent = 'Play again';
playBtnElem.addEventListener('click', () => startGame());

modalContentElem.append(modalTitleElem, modalSubtitleElem, playBtnElem);
modalOverlayElem.append(modalContentElem);
modalElem.append(modalOverlayElem);

export default modalElem;
