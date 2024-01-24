import './style.scss';
import header from './src/js/components/header/header';
import './src/js/components/game/gameInit';
import { main } from './src/js/components/game/gameElements';

document.body.append(header, main);
