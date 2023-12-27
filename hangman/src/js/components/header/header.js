import BaseCreateElement from '../../Classes/BaseCreateElement';
import logo from './components/logo/logo';
import resultBtnElem from './components/resultsGame/resultsGame';
import title from './components/title/title';

const header = new BaseCreateElement('header', ['header']);
const headerElem = header.elem;

const headerContainer = new BaseCreateElement('div', ['container', 'header__container']);
const headerContainerElem = headerContainer.elem;

headerContainerElem.append(logo, title, resultBtnElem);
headerElem.append(headerContainerElem);

export default headerElem;
