import BaseCreateElement from '../../../../Classes/BaseCreateElement';
import './title.scss';

const title = new BaseCreateElement('h1', ['header__title']);
const titleElem = title.elem;
titleElem.textContent = 'Hangman';

export default titleElem;
