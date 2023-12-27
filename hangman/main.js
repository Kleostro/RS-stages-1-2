import gameSectionElem from './src/js/components/game/game';
import { startGame } from './src/js/components/game/gameStates';
import modalElem from './src/js/components/modal/modal';
import headerElem from './src/js/components/header/header';
import './style.scss';

const app = document.createElement('div');
app.classList.add('site-container');
app.append(headerElem, gameSectionElem, modalElem);
document.body.append(app);

// document.querySelector('.bts').addEventListener('click', () => startGame());
startGame();
