import CreateElement from '../../utils';
import './game.scss';

export const main = new CreateElement({
  tag: 'main',
  classes: ['main'],
});

const gameSection = new CreateElement({
  tag: 'section',
  classes: ['game'],
  parent: main,
});

const gameContainer = new CreateElement({
  tag: 'div',
  classes: ['game__container', 'container'],
  parent: gameSection,
});

export const gameWrapper = new CreateElement({
  tag: 'div',
  classes: ['game__wrapper'],
  parent: gameContainer,
});

export const playground = new CreateElement({
  tag: 'div',
  classes: ['playground'],
  parent: gameWrapper,
});