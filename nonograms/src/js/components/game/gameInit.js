import { endGameModal, showModal } from '../endGameModal/endGameModal';
import {
  gameWrapper,
  leftHintsBox,
  playground,
  topHintsBox,
} from './gameLayout';
import {
  changeCrossedClass,
  changePaintedClass,
  createCurrentPlayground,
  createHints,
  highlightCurrentColumnAndRow,
  removeHighlightCells,
  searchCurrentNonogramByTitle,
} from './utils';

const LEFT_HINTS_DIRECTION = 'left';
const TOP_HINTS_DIRECTION = 'top';
const END_GAME_ANIMATION = 500;

const SIZE_PLAYGROUND = {
  '5x5': 'small',
  '10x10': 'medium',
  '15x15': 'large',
};

export let currentPlayground = [];
let currentNonogram = {};
let { matrix, title, size } = currentNonogram;

const startGame = (currTitle = 'camel') => {
  currentNonogram = searchCurrentNonogramByTitle(currTitle);
  matrix = currentNonogram.matrix;
  title = currentNonogram.title;
  size = currentNonogram.size;

  gameWrapper.removeAttribute('class');
  gameWrapper.classList.add('game__wrapper', SIZE_PLAYGROUND[size]);
  currentPlayground = createCurrentPlayground(matrix);
  createHints(matrix, leftHintsBox, LEFT_HINTS_DIRECTION);
  createHints(matrix, topHintsBox, TOP_HINTS_DIRECTION);
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
    if (!currentCell.classList.contains('painted') && !currentCell.classList.contains('crossed')) {
      currentPlayground[currentRowIndex][currentCellIndex] = 1;
    } else {
      currentPlayground[currentRowIndex][currentCellIndex] = 0;
    }
  }

  changePaintedClass(e);
  console.log(currentPlayground, matrix);
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

playground.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  changeCrossedClass(e);
});

showModal();

export default startGame;
