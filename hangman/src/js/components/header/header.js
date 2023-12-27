import BaseCreateElement from '../../Classes/BaseCreateElement';
import logo from './components/logo/logo';
import resultBtnElem from './components/resultsGame/resultGame';
import title from './components/title/title';
import './header.scss';

const header = new BaseCreateElement('header', ['header']);
const headerElem = header.elem;

const headerContainer = new BaseCreateElement('div', ['container', 'header__container']);
const headerContainerElem = headerContainer.elem;

headerContainerElem.append(logo, title, resultBtnElem);
headerElem.append(headerContainerElem);

export default headerElem;
