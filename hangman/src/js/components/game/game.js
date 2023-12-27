import gallowsSrc from '../../../img/png/gallows.png';
import firstPart from '../../../img/png/firstPart.png';
import secondPart from '../../../img/png/secondPart.png';
import thirdPart from '../../../img/png/thirdPart.png';
import fourthPart from '../../../img/png/fourthPart.png';
import fifthPart from '../../../img/png/fifthPart.png';
import sixthPart from '../../../img/png/sixthPart.png';
import BaseCreateElement from '../../BaseCreateElement';
import { checkLetter } from './gameStates';

const gameSection = new BaseCreateElement('section', ['game']);
const gameSectionElem = gameSection.elem;

const gameContainer = new BaseCreateElement('div', ['container', 'game__container']);
const gameContainerElem = gameContainer.elem;

const gallows = new BaseCreateElement('div', ['gallows']);
const gallowsElem = gallows.elem;
gallowsElem.style.backgroundImage = `url(${gallowsSrc})`;

const firstPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const firstPartOfManElem = firstPartOfMan.elem;
firstPartOfManElem.style.backgroundImage = `url(${firstPart})`;

const secondPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const secondPartOfManElem = secondPartOfMan.elem;
secondPartOfManElem.style.backgroundImage = `url(${secondPart})`;

const thirdPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const thirdPartOfManElem = thirdPartOfMan.elem;
thirdPartOfManElem.style.backgroundImage = `url(${thirdPart})`;

const fourthPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const fourthPartOfManElem = fourthPartOfMan.elem;
fourthPartOfManElem.style.backgroundImage = `url(${fourthPart})`;

const fifthPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const fifthPartOfManElem = fifthPartOfMan.elem;
fifthPartOfManElem.style.backgroundImage = `url(${fifthPart})`;

const sixthPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const sixthPartOfManElem = sixthPartOfMan.elem;
sixthPartOfManElem.style.backgroundImage = `url(${sixthPart})`;

const keyboardBox = new BaseCreateElement('div', ['keyboard']);
const keyboardBoxElem = keyboardBox.elem;

const quizBox = new BaseCreateElement('div', ['quiz']);
const quizBoxElem = quizBox.elem;

const questionTitle = new BaseCreateElement('h2', ['quiz__question']);
const questionTitleElem = questionTitle.elem;

const answerBox = new BaseCreateElement('div', ['quiz__answer']);
const answerBoxElem = answerBox.elem;

for (let i = 65; i <= 90; i += 1) {
  const keyboardBtn = new BaseCreateElement('button', ['btn-reset', 'keyboard__btn']);
  const keyboardBtnElem = keyboardBtn.elem;
  const btnLetter = String.fromCharCode(i);
  keyboardBtnElem.textContent = btnLetter;
  keyboardBtnElem.addEventListener('click', (e) => checkLetter(e.target, btnLetter));
  keyboardBoxElem.append(keyboardBtnElem);
}

gallowsElem.append(
  firstPartOfManElem,
  secondPartOfManElem,
  thirdPartOfManElem,
  fourthPartOfManElem,
  fifthPartOfManElem,
  sixthPartOfManElem,
);
quizBoxElem.append(questionTitleElem, answerBoxElem);
gameContainerElem.append(gallowsElem, quizBoxElem, keyboardBoxElem);
gameSectionElem.append(gameContainerElem);
export default gameSectionElem;
