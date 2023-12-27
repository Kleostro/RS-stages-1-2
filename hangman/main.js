import gameSectionElem from './src/js/game/game';
import { startGame } from './src/js/game/gameStates';
import modalElem from './src/js/modal/modal';
import headerElem from './src/js/header/header';
import './style.scss';

const app = document.createElement('div');
app.classList.add('site-container');
app.append(headerElem, gameSectionElem, modalElem);
document.body.append(app);
startGame();
