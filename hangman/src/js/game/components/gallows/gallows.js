import gallowsSrc from '../../../../img/png/gallows.png';
import firstPart from '../../../../img/png/firstPart.png';
import secondPart from '../../../../img/png/secondPart.png';
import thirdPart from '../../../../img/png/thirdPart.png';
import fourthPart from '../../../../img/png/fourthPart.png';
import fifthPart from '../../../../img/png/fifthPart.png';
import sixthPart from '../../../../img/png/sixthPart.png';
import BaseCreateElement from '../../../BaseCreateElement';

const gallows = new BaseCreateElement('div', ['gallows']);
const gallowsElem = gallows.elem;
gallowsElem.style.backgroundImage = `url(${gallowsSrc})`;

const firstPartOfMan = new BaseCreateElement('div', ['man-part']);
const firstPartOfManElem = firstPartOfMan.elem;
firstPartOfManElem.style.backgroundImage = `url(${firstPart})`;
firstPartOfManElem.style.opacity = 0;

const secondPartOfMan = new BaseCreateElement('div', ['man-part']);
const secondPartOfManElem = secondPartOfMan.elem;
secondPartOfManElem.style.backgroundImage = `url(${secondPart})`;
secondPartOfManElem.style.opacity = 0;

const thirdPartOfMan = new BaseCreateElement('div', ['man-part']);
const thirdPartOfManElem = thirdPartOfMan.elem;
thirdPartOfManElem.style.backgroundImage = `url(${thirdPart})`;
thirdPartOfManElem.style.opacity = 0;

const fourthPartOfMan = new BaseCreateElement('div', ['man-part']);
const fourthPartOfManElem = fourthPartOfMan.elem;
fourthPartOfManElem.style.backgroundImage = `url(${fourthPart})`;
fourthPartOfManElem.style.opacity = 0;

const fifthPartOfMan = new BaseCreateElement('div', ['man-part']);
const fifthPartOfManElem = fifthPartOfMan.elem;
fifthPartOfManElem.style.backgroundImage = `url(${fifthPart})`;
fifthPartOfManElem.style.opacity = 0;

const sixthPartOfMan = new BaseCreateElement('div', ['man-part', 'hidden']);
const sixthPartOfManElem = sixthPartOfMan.elem;
sixthPartOfManElem.style.backgroundImage = `url(${sixthPart})`;
sixthPartOfManElem.style.opacity = 0;

gallowsElem.append(
  firstPartOfManElem,
  secondPartOfManElem,
  thirdPartOfManElem,
  fourthPartOfManElem,
  fifthPartOfManElem,
  sixthPartOfManElem,
);

export default gallowsElem;
