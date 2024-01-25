import CreateElement from '../../CreateElement';
import nonograms from '../../../data/nonograms.json';
import { playground } from './gameLayout';

let playgroundRowsArr = [];
let playgroundCellsArr = [];
const LEFT_HINTS_DIRECTION = 'left';
const TOP_HINTS_DIRECTION = 'top';

export const createCurrentPlayground = (matrix) => {
  const currentPlayground = [];
  playgroundRowsArr = [];
  playgroundCellsArr = [];
  playground.innerHTML = '';

  for (let row = 0; row < matrix.length; row += 1) {
    const rowElement = new CreateElement({
      tag: 'div',
      classes: ['playground__row'],
      attrs: {
        'data-row': row,
      },
      parent: playground,
    });
    playgroundRowsArr.push(rowElement);
    currentPlayground[row] = [];

    for (let cell = 0; cell < matrix[0].length; cell += 1) {
      const cellElement = new CreateElement({
        tag: 'div',
        classes: ['playground__cell'],
        attrs: {
          'data-cell': cell,
        },
        parent: rowElement,
      });
      playgroundCellsArr.push(cellElement);
      currentPlayground[row][cell] = 0;
    }
  }

  return currentPlayground;
};

export const createHints = (matrix, box, direction) => {
  const hintsBox = box;
  hintsBox.innerHTML = '';
  const rowHints = [];
  const columnHints = [];

  for (let row = 0; row < matrix.length; row += 1) {
    const hints = [];
    let hintCounter = 0;

    const hintRow = new CreateElement({
      tag: 'div',
      classes: [`${direction}-hints__row`],
      parent: hintsBox,
    });

    for (let cell = 0; cell < matrix[row].length; cell += 1) {
      if (direction === LEFT_HINTS_DIRECTION && matrix[row][cell] === 1) {
        hintCounter += 1;
      } else if (direction === TOP_HINTS_DIRECTION && matrix[cell][row] === 1) {
        hintCounter += 1;
      } else if (hintCounter > 0) {
        hints.push(hintCounter);
        hintCounter = 0;
      }
    }

    if (hintCounter > 0) {
      hints.push(hintCounter);
    }

    hints.forEach((hint) => {
      const hintCell = new CreateElement({
        tag: 'div',
        classes: [`${direction}-hints__cell`],
        parent: hintRow,
        textContent: hint,
      });
    });

    if (direction === LEFT_HINTS_DIRECTION) {
      rowHints.push(hints);
    } else if (direction === TOP_HINTS_DIRECTION) {
      columnHints.push(hints);
    }
  }

  return direction === LEFT_HINTS_DIRECTION ? rowHints : columnHints;
};

export const removeHighlightCells = () => {
  playgroundCellsArr.forEach((cell) => {
    cell.classList.remove('cell-highlight');
  });

  playgroundRowsArr.forEach((row) => {
    row.classList.remove('row-highlight');
  });
};

export const highlightCurrentColumnAndRow = (event, matrix) => {
  const rect = playground.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let rowIndex = Math.floor(y / playgroundCellsArr[0].offsetWidth);
  let cellIndex = Math.floor(x / playgroundCellsArr[0].offsetHeight);

  if (rowIndex > matrix.length - 1) {
    rowIndex = matrix.length - 1;
  }

  if (cellIndex > matrix.length - 1) {
    cellIndex = matrix.length - 1;
  }

  removeHighlightCells();

  if (rowIndex < matrix.length && rowIndex >= 0) {
    const currentRow = playgroundRowsArr[rowIndex];
    currentRow.classList.add('row-highlight');
  }

  if (cellIndex < matrix.length && cellIndex >= 0) {
    const currentCells = playgroundCellsArr.filter((cell) => cell.getAttribute('data-cell') === `${cellIndex}`);
    currentCells.forEach((cell) => cell.classList.add('cell-highlight'));
  }
};

export const createUniqueMatrixSizeObj = () => {
  const uniqueMatrixSizeObj = new Set();

  nonograms.forEach((nonogram) => {
    uniqueMatrixSizeObj.add(nonogram.size);
  });

  return uniqueMatrixSizeObj;
};

export const removeDisabledBtn = (btnsArr) => {
  btnsArr.forEach((item) => {
    const otherBtn = item;
    otherBtn.disabled = false;
  });
};

export const searchCurrentNonogramByTitle = (currTitle) => nonograms
  .find((item) => item.title === currTitle);

const searchCurrentNonogramsBySize = (currSize) => nonograms
  .filter((item) => item.size === currSize);

export const updateNonogramsList = (sizesSubtitle, nonogramBtns, nonogramsSubtitle) => {
  const filterNonogramsArr = searchCurrentNonogramsBySize(sizesSubtitle.textContent);
  const subtitle = nonogramsSubtitle;
  removeDisabledBtn(nonogramBtns);

  nonogramBtns.forEach((btn, index) => {
    const currentBtn = btn;
    currentBtn.textContent = filterNonogramsArr[index].title;
    if (index === 0) {
      currentBtn.disabled = true;
      subtitle.textContent = filterNonogramsArr[index].title;
    }
  });
};

export const changePaintedClass = (e) => {
  if (e.target.classList.contains('painted')) e.target.classList.remove('painted');
  else if (e.target.classList.contains('crossed')) e.target.classList.remove('crossed');
  else e.target.classList.add('painted');
};

export const changeCrossedClass = (e) => {
  if (e.target.classList.contains('crossed')) e.target.classList.remove('crossed');
  else {
    e.target.classList.add('crossed');
    e.target.classList.remove('painted');
  }
};
