import CreateElement from '../../CreateElement';
import gameSection from '../game/gameBox';
import { PLAYGROUND_CLASSES } from '../playground/utils';

const settingsWrapper = new CreateElement({
  tag: 'div',
  classes: ['settings'],
  parent: gameSection.element,
});

const selectPlaygroundSize = new CreateElement({
  tag: 'select',
  attrs: {
    name: 'playgroundSize',
  },
  classes: ['settings__playground-size'],
  parent: settingsWrapper.element,
});

Object.keys(PLAYGROUND_CLASSES).forEach((key) => {
  const optionPlaygroundSize = new CreateElement({
    tag: 'option',
    attrs: {
      value: key,
    },
    classes: ['settings__playground-size__option'],
    parent: selectPlaygroundSize.element,
    textContent: `${key}x${key}`,
  });
});
