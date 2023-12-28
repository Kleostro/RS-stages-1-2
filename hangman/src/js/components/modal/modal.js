import BaseCreateElement from '../../BaseCreateElement';
import { startGame } from '../game/gameStates';
import './modal.scss';

const modal = new BaseCreateElement('div', ['modal', 'visible']);
const modalElem = modal.elem;

const modalOverlay = new BaseCreateElement('div', ['modal__overlay', 'visible']);
const modalOverlayElem = modalOverlay.elem;

const modalContent = new BaseCreateElement('div', ['modal__content', 'visible']);
const modalContentElem = modalContent.elem;

const modalTitle = new BaseCreateElement('h2', ['modal__content-title']);
const modalTitleElem = modalTitle.elem;

const modalSubtitle = new BaseCreateElement('h3', ['modal__content-subtitle']);
const modalSubtitleElem = modalSubtitle.elem;

const playBtn = new BaseCreateElement('button', ['btn-reset', 'modal__content-btn']);
const playBtnElem = playBtn.elem;
playBtnElem.textContent = 'Play again';
playBtnElem.addEventListener('click', () => startGame());

modalContentElem.append(modalTitleElem, modalSubtitleElem, playBtnElem);
modalOverlayElem.append(modalContentElem);
modalElem.append(modalOverlayElem);

export default modalElem;
