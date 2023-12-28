import BaseCreateElement from '../../BaseCreateElement';
import gallowsElem from '../gallows/gallows';
import keyboardBoxElem from '../keyboard/keyboard';
import quizBoxElem from '../quiz/quiz';
import './game.scss';

const gameSection = new BaseCreateElement('section', ['game']);
const gameSectionElem = gameSection.elem;

const gameContainer = new BaseCreateElement('div', ['container', 'game__container']);
const gameContainerElem = gameContainer.elem;

gameContainerElem.append(gallowsElem, quizBoxElem, keyboardBoxElem);
gameSectionElem.append(gameContainerElem);
export default gameSectionElem;
