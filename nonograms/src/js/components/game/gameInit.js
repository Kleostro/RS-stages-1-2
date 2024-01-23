import nonograms from '../nonograms/nonograms';
import { gameWrapper, playground } from './game';
import {
  createCurrentPlayground,
  createHints,
  highlightCurrentColumnAndRow,
  removeHighlightCells,
} from './utils';

let currentPlayground = [];

const currentTitle = 'snowman';
const currentnonogram = nonograms.find((item) => item.title === currentTitle);
const { matrix, title } = currentnonogram;

const startGame = () => {
  currentPlayground = [];

  createHints(matrix, gameWrapper, 'left');
  createHints(matrix, gameWrapper, 'top');
  currentPlayground = createCurrentPlayground(matrix);
};

playground.addEventListener('click', (e) => {
  const currentCell = e.target;
  const currentRow = currentCell.parentNode;
  const currentCellIndex = currentCell.getAttribute('data-cell');
  const currentRowIndex = currentRow.getAttribute('data-row');

  if (currentRowIndex && currentCellIndex && !currentCell.classList.contains('painted')) {
    currentPlayground[currentRowIndex][currentCellIndex] = 1;
  } else {
    currentPlayground[currentRowIndex][currentCellIndex] = 0;
  }

  currentCell.classList.toggle('painted');

  if (currentPlayground.every((_, i) => currentPlayground[i].every((v, j) => v === matrix[i][j]))) {
    console.log('Головоломка разгадана');
    alert('Game over');
  }
});

playground.addEventListener('mousemove', (event) => {
  highlightCurrentColumnAndRow(event);
});

playground.addEventListener('mouseleave', () => {
  removeHighlightCells();
});

startGame();
