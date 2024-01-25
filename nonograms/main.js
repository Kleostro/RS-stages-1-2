import './style.scss';
import header from './src/js/components/header/header';
import './src/js/components/game/settings';
import './src/js/components/game/gameInit';
import CreateElement from './src/js/utils';
import { gameSection } from './src/js/components/game/gameLayout';
import { modal } from './src/js/components/endGameModal/endGameModalLayout';

const main = new CreateElement({
  tag: 'main',
  classes: ['main'],
});

main.append(gameSection);
document.body.append(header, main, modal);
