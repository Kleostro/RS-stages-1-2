import CreateElement from '../../CreateElement';

const gameSection = new CreateElement({
  tag: 'section',
  classes: ['game'],
});

document.body.prepend(gameSection.element);

export default gameSection;
