import logoSrc from '../../../img/svg/logo.svg';
import BaseCreateElement from '../../BaseCreateElement';
import './logo.scss';

const logo = new BaseCreateElement('a', ['logo']);
const logoElem = logo.elem;
logoElem.href = './';

const logoImg = new BaseCreateElement('img', ['logo__img'], { src: logoSrc, alt: 'logo' });
const logoImgElem = logoImg.elem;

logoElem.append(logoImgElem);

export default logoElem;
