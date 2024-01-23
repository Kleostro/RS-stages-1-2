import CreateElement from '../../utils';
import './header.scss';
import logoSrc from '../../../img/svg/logo.svg';

const header = new CreateElement({
  tag: 'header',
  classes: ['header'],
});

const headerContainer = new CreateElement({
  tag: 'div',
  classes: ['header__container', 'container'],
  parent: header,
});

const logo = new CreateElement({
  tag: 'a',
  classes: ['header__logo'],
  attrs: {
    href: '#',
  },
  parent: headerContainer,
});

const logoImg = new CreateElement({
  tag: 'img',
  classes: ['header__logo-img'],
  attrs: {
    src: logoSrc,
    alt: 'logo',
  },
  parent: logo,
});

const title = new CreateElement({
  tag: 'h1',
  classes: ['header__title'],
  parent: headerContainer,
  textContent: 'Nonograms',
});

export default header;
