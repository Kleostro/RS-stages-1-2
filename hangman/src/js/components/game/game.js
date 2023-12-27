import BaseCreateElement from '../../BaseCreateElement';
import gallowsElem from './components/gallows/gallows';
import quizBoxElem from './components/quiz/quiz';
import { checkLetter } from './gameStates';

const gameSection = new BaseCreateElement('section', ['game']);
const gameSectionElem = gameSection.elem;

const gameContainer = new BaseCreateElement('div', ['container', 'game__container']);
const gameContainerElem = gameContainer.elem;

const keyboardBox = new BaseCreateElement('div', ['keyboard']);
const keyboardBoxElem = keyboardBox.elem;

for (let i = 65; i <= 90; i += 1) {
  const keyboardBtn = new BaseCreateElement('button', ['btn-reset', 'keyboard__btn']);
  const keyboardBtnElem = keyboardBtn.elem;
  const btnLetter = String.fromCharCode(i);
  keyboardBtnElem.textContent = btnLetter;
  keyboardBtnElem.addEventListener('click', (e) => checkLetter(e.target, btnLetter));
  keyboardBoxElem.append(keyboardBtnElem);
}

gameContainerElem.append(gallowsElem, quizBoxElem, keyboardBoxElem);
gameSectionElem.append(gameContainerElem);
export default gameSectionElem;
