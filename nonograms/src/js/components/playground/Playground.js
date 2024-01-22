import CreateElement from '../../CreateElement';
import gameSection from '../game/gameBox';
import './playground.scss';
import {
  CELL_CLASSES, PLAYGROUND_CLASSES, changeCrossedClass, changePaintedClass,
} from './utils';

class PlayGround {
  constructor(matrix) {
    this.matrix = matrix;
    this.playGroundSize = PLAYGROUND_CLASSES[matrix.length];
    this.cellCount = CELL_CLASSES[matrix.length];
    this.playGround = this.createPlayground();
    this.createCell();
  }

  createPlayground() {
    const playGround = new CreateElement({
      tag: 'div',
      classes: ['playground'],
      parent: gameSection.element,
    });

    playGround.addListener('click', (e) => {
      changePaintedClass(e);
    });

    playGround.addListener('contextmenu', (e) => {
      e.preventDefault();
      changeCrossedClass(e);
    });

    playGround.element.classList.add(this.playGroundSize);

    return playGround.element;
  }

  createCell() {
    let row = 0;
    let column = 0;

    for (let i = 0; i < this.matrix.length; i += 1) {
      row += 1;

      for (let j = 0; j < this.matrix[0].length; j += 1) {
        column += 1;
        const cell = new CreateElement({
          tag: 'div',
          classes: ['playground__cell'],
          parent: this.playGround,
        });

        if (row % 5 === 0) cell.element.style.borderBottom = '2px solid #000';
        if (column % 5 === 0) cell.element.style.borderRight = '2px solid #000';

        cell.element.classList.add(this.cellCount);
      }
    }
  }
}

export default PlayGround;
