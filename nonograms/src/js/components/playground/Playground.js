import CreateElement from '../../CreateElement';
import gameSection from '../game/gameBox';
import './playground.scss';
import {
  CELL_CLASSES,
  PLAYGROUND_CLASSES,
  changeCrossedClass,
  changePaintedClass,
  highlightCurrentColumnAndRow,
  removeHighlightCells,
} from './utils';

document.body.prepend(gameSection.element);

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

    playGround.addListener('mousemove', (event) => {
      highlightCurrentColumnAndRow(event, playGround);
    });

    playGround.addListener('mouseleave', removeHighlightCells);

    playGround.element.classList.add(this.playGroundSize);

    return playGround.element;
  }

  createCell() {
    let rowCounter = 0;
    let cellCounter = 0;
    let dataCellCounter = 0;

    for (let i = 0; i < this.matrix.length; i += 1) {
      rowCounter += 1;
      dataCellCounter = 0;
      const row = new CreateElement({
        tag: 'div',
        classes: ['playground__row'],
        attrs: {
          'data-row': rowCounter,
        },
        parent: this.playGround,
      });

      for (let j = 0; j < this.matrix[0].length; j += 1) {
        dataCellCounter += 1;
        cellCounter += 1;
        const cell = new CreateElement({
          tag: 'div',
          classes: ['playground__cell'],
          attrs: {
            'data-cell': dataCellCounter,
          },
          parent: row.element,
        });

        if (cellCounter % 5 === 0) cell.element.style.borderBottom = '2px solid #000';
        if (rowCounter % 5 === 0) cell.element.style.borderRight = '2px solid #000';

        cell.element.classList.add(this.cellCount);
      }
    }
  }
}

export default PlayGround;
