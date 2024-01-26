import CreateElement from '../../CreateElement';
import './game.scss';

export const gameSection = new CreateElement({
  tag: 'section',
  classes: ['game'],
});

export const gameContainer = new CreateElement({
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

export const topHintsBox = new CreateElement({
  tag: 'div',
  classes: ['top-hints'],
  parent: gameWrapper,
});

export const leftHintsBox = new CreateElement({
  tag: 'div',
  classes: ['left-hints'],
  parent: gameWrapper,
});

export const timer = new CreateElement({
  tag: 'span',
  classes: ['timer'],
  parent: gameWrapper,
  textContent: '00:00',
});
