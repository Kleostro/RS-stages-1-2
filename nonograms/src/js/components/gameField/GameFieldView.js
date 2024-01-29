import CreateElement from '../../CreateElement';
import CellView from './cell/CellView';
import './gameFieldView.scss';
import data from '../../../data/nonograms.json';

const DIRECTIONS = ['left', 'top'];

const MESSAGE = 'Great! You have solved the nonogram: ';

/**
 * @class
 * @param {object} modal - modal class instance
 * @param {object} timer - timer class instance
 */
class GameFieldView {
  constructor(modal, timer) {
    this.modal = modal;
    this.timer = timer;

    this.currentNonogramObj = data[0];
    this.originalMatrix = this.currentNonogramObj.matrix;
    this.originalTitle = this.currentNonogramObj.title;
    this.originalSize = this.currentNonogramObj.size;

    this.cellElements = [];
    this.cellValues = [];

    this.isLockPlayground = false;

    this.#createHTML();
    this.startGame(this.currentNonogramObj);

    this.playground.addEventListener('click', () => {

      if (!this.timer.isStart) {
        this.timer.startTimer();
      }
      this.#cellHasClicked();

      if (this.#isWin(this.cellValues, this.originalMatrix)) {
        this.timer.stopTimer();
        this.modal.show(MESSAGE, this.originalTitle, this.timer.formattedTime());
        this.#toggleIsClickableCell(this.cellElements);
        this.lockPlayground();
      }
    });

    // TODO подумать как исправить смещение из-за бордеров

    // this.playground.addEventListener('mousemove', (event) => {
    //   this.#highlightCurrentColumnAndRow(event);
    // })

    // this.playground.addEventListener('mouseleave', () => {
    //   this.#removeHighlightCells();
    // });

  }

  /**
  * get HTML cell
  * @returns {Element} HTML-Element cell
  */
  getHTML() {
    return this.gameFieldSection;
  }

  // TODO подумать как исправить смещение из-за бордеров

  // #removeHighlightCells() {
  //   this.cellElements.forEach((row) => {
  //     row.forEach((cell) => {
  //       const currentRow = cell.cell.parentNode;
  //       currentRow.classList.remove('highlight');
  //       cell.cell.classList.remove('highlight');
  //     })
  //   })
  // };

  // #highlightCurrentColumnAndRow(event) {
  //   const rect = this.playground.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;

  //   let rowIndex = Math.floor(y / this.cellElements[0][0].cell.clientHeight);
  //   let cellIndex = Math.floor(x / this.cellElements[0][0].cell.offsetWidth);

  //   console.log(this.cellElements[0][0].cell.offsetHeight)

  //   this.#removeHighlightCells();

  //   if (rowIndex > this.cellElements.length - 1) {
  //     rowIndex = this.cellElements.length - 1;
  //   }

  //   if (cellIndex > this.cellElements.length - 1) {
  //     cellIndex = this.cellElements.length - 1;
  //   }

  //   this.cellElements.forEach((row) => {
  //     row.forEach((cell) => {
  //       const currentRow = cell.cell.parentNode;

  //       if (rowIndex === Number(currentRow.getAttribute('data-row'))) {
  //         currentRow.classList.add('highlight');
  //       }

  //       if (cellIndex === Number(cell.cell.getAttribute('data-cell'))) {
  //         cell.cell.classList.add('highlight');
  //       }
  //     })
  //   })
  // };

  /**
   * create hints
   * @param {number[][]} matrix - matrix for the current game
   * @param {string[]} direction - hint box directions array
   */
  createHints(matrix) {
    DIRECTIONS.forEach((direction) => {
      const hintsBox = direction === DIRECTIONS[0] ? this.leftHintsBox : this.topHintsBox;
      hintsBox.innerHTML = '';

      for (let row = 0; row < matrix.length; row += 1) {
        const hints = [];
        let hintValue = 0;

        const hintRow = new CreateElement({ classes: [`${direction}-hints__row`] });
        hintsBox.append(hintRow);

        for (let column = 0; column < matrix[row].length; column += 1) {
          if (direction === DIRECTIONS[0] && matrix[row][column] === 1) {
            hintValue += 1;
          } else if (direction === DIRECTIONS[1] && matrix[column][row] === 1) {
            hintValue += 1;
          } else if (hintValue > 0) {
            hints.push(hintValue);
            hintValue = 0;
          }
        }

        if (hintValue > 0) {
          hints.push(hintValue);
        }

        hints.forEach((hint) => {
          const hintCell = new CreateElement({
            classes: [`${direction}-hints__cell`], textContent: hint,
          });
          hintRow.append(hintCell);
        });
      }
    })
  }

  /**
   * create cells
   * @param {number[][]} matrix - matrix for the current game
   */
  createCells(matrix) {
    console.log(matrix)
    this.playground.innerHTML = '';
    for (let row = 0; row < matrix.length; row += 1) {
      const rowElem = new CreateElement({ classes: ['playground__row'], attrs: { 'data-row': row } });
      this.cellElements[row] = [];
      for (let column = 0; column < matrix[0].length; column += 1) {
        const cell = new CellView(matrix[row][column]);
        const cellElem = cell.getHTML();
        cellElem.setAttribute('data-cell', column);
        rowElem.append(cellElem);
        this.cellElements[row][column] = cell;
      }

      this.playground.append(rowElem);
    }
  }

  startGame(nonogramObj) {
    this.originalMatrix = nonogramObj.matrix;
    this.originalTitle = nonogramObj.title;
    this.originalSize = nonogramObj.size;

    this.cellElements.length = 0;

    this.createHints(this.originalMatrix, DIRECTIONS);
    this.createCells(this.originalMatrix);

    this.modal.isShowSolution = false;
    this.isLockPlayground = false;

    this.lockPlayground();
    this.timer.stopTimer();
  }

  lockPlayground() {
    if (!this.isLockPlayground) {
      this.playground.classList.remove('lock');
    } else {
      this.playground.classList.add('lock');
    }

    this.isLockPlayground = !this.isLockPlayground;

  }

  #cellHasClicked() {
    this.cellElements.forEach((row, rowIndex) => {

      this.cellValues[rowIndex] = [];

      row.forEach((cell, cellIndex) => {

        if (cell.state === 'field') {
          this.cellValues[rowIndex][cellIndex] = 1;
        } else {
          this.cellValues[rowIndex][cellIndex] = 0;
        }

      });
    });
  }

  #isWin(cellValues, matrix) {
    return cellValues.every((_, rowIndex) => cellValues[rowIndex].every((elem, cellIndex) => elem === matrix[rowIndex][cellIndex]))
  }

  #toggleIsClickableCell(cellElements) {
    cellElements.forEach((row) => {
      row.forEach((cell) => {
        cell.setClickable(false);
      });
    });
  }

  #createHTML() {
    this.gameFieldSection = new CreateElement({ tag: 'section', classes: ['game'] });
    this.gameField = new CreateElement({ classes: ['game__field'] });
    this.playground = new CreateElement({ classes: ['playground'] });
    this.leftHintsBox = new CreateElement({ classes: ['left-hints'] });
    this.topHintsBox = new CreateElement({ classes: ['top-hints'] });

    this.gameField.append(this.playground, this.leftHintsBox, this.topHintsBox, this.timer.getHTML());
    this.gameFieldSection.append(this.gameField);
  }
}

export default GameFieldView;
