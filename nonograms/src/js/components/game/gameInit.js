import nonograms from '../nonograms/nonograms';
import { gameWrapper, playground } from './game';
import {
  createCurrentPlayground,
  createHints,
  highlightCurrentColumnAndRow,
  removeHighlightCells,
} from './utils';

const LEFT_HINTS_NAME = 'left';
const TOP_HINTS_NAME = 'top';

let currentPlayground = [];

const currentTitle = 'snowman';
const currentnonogram = nonograms.find((item) => item.title === currentTitle);
const { matrix, title } = currentnonogram;

const startGame = () => {
  currentPlayground = [];

  createHints(matrix, gameWrapper, LEFT_HINTS_NAME);
  createHints(matrix, gameWrapper, TOP_HINTS_NAME);
  currentPlayground = createCurrentPlayground(matrix);
};

playground.addEventListener('click', (e) => {
  const currentCell = e.target;
  const currentRow = currentCell.parentNode;
  const currentCellIndex = currentCell.getAttribute('data-cell');
  const currentRowIndex = currentRow.getAttribute('data-row');

  if (currentRowIndex && currentCellIndex) {
    if (!currentCell.classList.contains('painted')) {
      currentPlayground[currentRowIndex][currentCellIndex] = 1;
    } else {
      currentPlayground[currentRowIndex][currentCellIndex] = 0;
    }
  }

  currentCell.classList.toggle('painted');

  if (currentPlayground
    .every((_, rowIndex) => currentPlayground[rowIndex]
      .every((elem, cellIndex) => elem === matrix[rowIndex][cellIndex]))) {
    console.log('Головоломка разгадана');
    alert('Game over');
  }
});

playground.addEventListener('mousemove', (event) => {
  highlightCurrentColumnAndRow(event, matrix);
});

playground.addEventListener('mouseleave', () => {
  removeHighlightCells();
});

startGame();
