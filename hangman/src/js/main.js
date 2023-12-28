import gameSectionElem from './components/game/game';
import { startGame } from './components/game/gameStates';
import modalElem from './components/modal/modal';
import headerElem from './components/header/header';

const app = document.createElement('div');
app.classList.add('site-container');
app.append(headerElem, gameSectionElem, modalElem);
document.body.append(app);
startGame();
