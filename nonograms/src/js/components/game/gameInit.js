import nonograms from '../../../data/nonograms.json';
import { endGameModal, showModal } from '../endGameModal/endGameModal';
import { gameWrapper, playground } from './gameLayout';
import {
  createCurrentPlayground,
  createHints,
  highlightCurrentColumnAndRow,
  removeHighlightCells,
} from './utils';

const LEFT_HINTS_DIRECTION = 'left';
const TOP_HINTS_DIRECTION = 'top';
const END_GAME_ANIMATION = 500;

let currentPlayground = [];

const currentTitle = 'camel';
const currentNonogram = nonograms.find((item) => item.title === currentTitle);
const { matrix, title } = currentNonogram;

const startGame = () => {
  currentPlayground = [];
  showModal();
  currentPlayground = createCurrentPlayground(matrix);
  createHints(matrix, gameWrapper, LEFT_HINTS_DIRECTION);
  createHints(matrix, gameWrapper, TOP_HINTS_DIRECTION);
};

const endGame = () => {
  const copyPlayground = playground.cloneNode(true);
  setTimeout(() => {
    endGameModal(title, copyPlayground);
  }, END_GAME_ANIMATION);
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
    endGame();
  }
});

playground.addEventListener('mousemove', (event) => {
  highlightCurrentColumnAndRow(event, matrix);
});

playground.addEventListener('mouseleave', () => {
  removeHighlightCells();
});

startGame();
