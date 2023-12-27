import gameSectionElem from './src/js/components/game/game';
import headerElem from './src/js/components/header/header';
import './style.scss';

const app = document.createElement('div');
app.classList.add('site-container');
app.append(headerElem, gameSectionElem);
document.body.append(app);
