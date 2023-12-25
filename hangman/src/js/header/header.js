import logoSrc from '../../img/svg/logo.svg';

const app = document.createElement('div');
app.classList.add('site-container');
document.body.append(app);

const header = document.createElement('header');
header.classList.add('header');
app.append(header);

const logo = document.createElement('a');
logo.classList.add('logo');
header.append(logo);

const logoImg = document.createElement('img');
logoImg.classList.add('logo__img');
logoImg.src = logoSrc;
logo.append(logoImg);
