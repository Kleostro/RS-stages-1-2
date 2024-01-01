import BaseCreateElement from '../../BaseCreateElement';
import logo from '../logo/logo';
import title from '../title/title';
import './header.scss';

const header = new BaseCreateElement('header', ['header']);
const headerElem = header.elem;

const headerContainer = new BaseCreateElement('div', ['container', 'header__container']);
const headerContainerElem = headerContainer.elem;

headerContainerElem.append(logo, title);
headerElem.append(headerContainerElem);

export default headerElem;
