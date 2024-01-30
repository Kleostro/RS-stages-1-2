import CreateElement from '../../CreateElement';
import './settingsGameView.scss';
import data from '../../../data/nonograms.json';
import CellView from '../gameField/cell/CellView';

/** Create a settings
* @class
* @param {object} gameField - gameField class instance
* @param {object} timer - timer class instance
*/
class SettingsGameView {
  constructor(gameField, timer) {
    this.gameField = gameField;
    this.timer = timer;

    this.sizeBtnsArr = [];
    this.nameBtnsArr = [];

    this.currentName = null;
    this.newOriginalData = null;

    this.#createHTML();

    this.sizeBtnsArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.#undisabledBtns(this.sizeBtnsArr);
        btn.disabled = true;
        this.settingsSizeSubtitle.textContent = btn.textContent;
        this.#updateListNames();
        this.currentName = this.settingsNameSubtitle.textContent;
        this.newOriginalData = this.#updateCurrentMatrix();
      });
    })

    this.nameBtnsArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.#undisabledBtns(this.nameBtnsArr);
        btn.disabled = true;
        this.currentName = btn.textContent;
        this.settingsNameSubtitle.textContent = btn.textContent;
      });
    })

    this.startGameBtn.addEventListener('click', () => {
      this.#startGameHandler.apply(this);
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;
    });

    this.showSolutionBtn.addEventListener('click', () => {
      if (!this.gameField.isShowSolution) {
        this.#showSolutionHandler.apply(this, [this.gameField.originalMatrix, this.gameField.cellElements]);
        this.gameField.lockPlayground();
      }
      this.showSolutionBtn.disabled = true;
      this.saveGameBtn.disabled = true;
      this.resetGameBtn.disabled = true;
    });

    this.resetGameBtn.addEventListener('click', this.#resetGameHandler.bind(this));
    this.saveGameBtn.addEventListener('click', this.#saveGameHandler.bind(this));

    this.continueGameBtn.addEventListener('click', () => {
      this.showSolutionBtn.disabled = false;
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;

      if (localStorage.length) {
        this.#continueGameHandler.apply(this);
      } else {
        this.continueGameBtn.disabled = true;
      }

      const { formattedMin, formattedSec } = this.timer.formattedTime();
      this.timer.timer.textContent = `${formattedMin}:${formattedSec}`;
    });

    const LS = JSON.parse(localStorage.kleostro);

    if (!LS['current-game']) {
      this.continueGameBtn.disabled = true;
    }
  }

  /**
 * get HTML settings section
 * @returns {Element} HTML-Element settings section
 */
  getHTML() {
    return this.settings;
  }

  #startGameHandler() {
    this.newOriginalData = this.#updateCurrentMatrix();
    this.gameField.startGame(this.newOriginalData);
    this.showSolutionBtn.disabled = false;
    this.isShowSolution = false;
  }

  #showSolutionHandler(matrix, cellElements) {
    matrix.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        cellElements[rowIndex][columnIndex].cell.classList.remove('field');
        if (cellElements[rowIndex][columnIndex].cellValue === 1 && !this.isShowSolution) {
          cellElements[rowIndex][columnIndex].cell.classList.add('field');
          cellElements[rowIndex][columnIndex].cell.classList.remove('crossed');
        }
      })
    })
  }

  #resetGameHandler() {
    this.gameField.cellElements.forEach((row) => {
      row.forEach((cell) => {
        cell.cell.classList.remove('field', 'crossed');
        cell.state = 'empty';
      })
    })
  }

  #saveGameHandler() {
    const LS = JSON.parse(localStorage.kleostro);
    LS['current-game'] = JSON.stringify(this.gameField);
    LS['left-hints'] = this.gameField.leftHintsBox.innerHTML;
    LS['top-hints'] = this.gameField.topHintsBox.innerHTML;
    LS['current-playground'] = this.gameField.playground.innerHTML;
    LS['current-time'] = this.timer.getTime();

    const savedArr = [];
    this.gameField.cellElements.forEach((row) => {
      const rowArr = [];

      row.forEach((cell) => {
        rowArr.push(JSON.stringify(cell));
      });

      savedArr.push(rowArr);
      LS['saved-cells'] = JSON.stringify(savedArr);

      this.continueGameBtn.disabled = false;
    })

    localStorage.kleostro = JSON.stringify(LS);
  }

  #continueGameHandler() {
    if (!this.gameField.isLockPlayground) {
      this.gameField.lockPlayground();
    }

    const LS = JSON.parse(localStorage.kleostro);
    const savedCells = JSON.parse(LS['saved-cells'])
    this.#createCellsToLS(savedCells)


    this.gameField.leftHintsBox.innerHTML = LS['left-hints'];
    this.gameField.topHintsBox.innerHTML = LS['top-hints'];

    this.gameField.originalMatrix = JSON.parse(LS['current-game']).originalMatrix;
    this.gameField.originalTitle = JSON.parse(LS['current-game']).originalTitle;
    this.gameField.originalSize = JSON.parse(LS['current-game']).originalSize;

    this.settingsSizeSubtitle.textContent = JSON.parse(LS['current-game']).originalSize;
    this.#undisabledBtns(this.sizeBtnsArr);
    this.sizeBtnsArr.forEach((btn) => {
      if (this.settingsSizeSubtitle.textContent === btn.textContent) {
        btn.disabled = true;
      }
    });

    this.#updateListNames();
    this.settingsNameSubtitle.textContent = JSON.parse(LS['current-game']).originalTitle;
    this.#undisabledBtns(this.nameBtnsArr);
    this.nameBtnsArr.forEach((btn) => {
      if (this.settingsNameSubtitle.textContent === btn.textContent) {
        btn.disabled = true;
      }
    });

    this.timer.currentTime = +JSON.parse(LS['current-time']);
  }

  #createCellsToLS(savedCells) {
    if (savedCells) {
      console.log(savedCells)
      this.gameField.cellElements = [];
      this.gameField.cellValues = [];
      this.gameField.playground.innerHTML = '';

      for (let row = 0; row < savedCells.length; row += 1) {

        const rowElem = new CreateElement({ classes: ['playground__row'], attrs: { 'data-row': row } });
        this.gameField.cellElements[row] = [];
        this.gameField.cellValues[row] = [];

        for (let column = 0; column < savedCells[0].length; column += 1) {
          const cellParse = JSON.parse(savedCells[row][column]);

          const cell = new CellView(cellParse.cellValue, cellParse.state, cellParse.isClickable);

          const cellElem = cell.getHTML();
          cellElem.setAttribute('data-cell', column);

          rowElem.append(cellElem);
          this.gameField.cellElements[row][column] = cell;
          this.gameField.cellValues[row] = cellParse.cellValue;
        }

        this.gameField.playground.append(rowElem);
      }
    }
  }

  #undisabledBtns(btnsArr) {
    btnsArr.forEach((btn) => btn.disabled = false)
  }

  #updateCurrentMatrix() {
    return data.find((item) => item.title === this.currentName)
  }

  #updateListNames() {
    const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);

    this.#undisabledBtns(this.nameBtnsArr);

    filteredData.forEach((item, index) => {

      if (index === 0) {
        this.settingsNameSubtitle.textContent = item.title;
        this.nameBtnsArr[index].disabled = true;
      }

      this.nameBtnsArr[index].textContent = item.title;
    })
  }

  #createDropListSizes() {
    const uniqueDataObj = new Set();
    data.forEach((item) => {
      uniqueDataObj.add(item.size);
    })

    const uniqueDataArr = Array.from(uniqueDataObj);

    const dropList = new CreateElement({ tag: 'ul', classes: ['size__drop', 'list-reset'] });
    uniqueDataArr.forEach((item, index) => {
      const listItem = new CreateElement({ tag: 'li', classes: ['size__drop-item'] });;
      const btn = new CreateElement({ tag: 'button', classes: ['size__drop-btn', 'btn-reset'], textContent: item });

      if (index === 0) {
        btn.disabled = true;
      }

      this.sizeBtnsArr.push(btn);
      listItem.append(btn);
      dropList.append(listItem);
    })
    this.settingsSizeSubtitle.textContent = uniqueDataArr[0];
    return dropList;
  }

  #createDropListNames() {
    const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);

    const dropList = new CreateElement({ tag: 'ul', classes: ['name__drop', 'list-reset'] });
    filteredData.forEach((item, index) => {
      const listItem = new CreateElement({ tag: 'li', classes: ['name__drop-item'] });;
      const btn = new CreateElement({ tag: 'button', classes: ['name__drop-btn', 'btn-reset'], textContent: item.title });

      if (index === 0) {
        btn.disabled = true;
        this.currentName = btn.textContent;
      }

      this.nameBtnsArr.push(btn);
      listItem.append(btn);
      dropList.append(listItem);
    });
    this.settingsNameSubtitle.textContent = filteredData[0].title;
    return dropList;
  }

  #createHTML() {
    this.settings = new CreateElement({ classes: ['settings'] });
    this.settingsContainer = new CreateElement({ classes: ['settings__container'] });

    this.settingsSizeBox = new CreateElement({ classes: ['size'] });
    this.settingsSizeTop = new CreateElement({ classes: ['size__top'] });
    this.settingsSizeTitle = new CreateElement({ tag: 'span', classes: ['size__title'], textContent: 'Size: ' });
    this.settingsSizeSubtitle = new CreateElement({ tag: 'span', classes: ['size__subtitle'] });
    this.settingsSizeDrop = this.#createDropListSizes();

    this.settingsNameBox = new CreateElement({ classes: ['name'] });
    this.settingsNameTop = new CreateElement({ classes: ['name__top'] });
    this.settingsNameTitle = new CreateElement({ tag: 'span', classes: ['name__title'] });
    this.settingsNameSubtitle = new CreateElement({ tag: 'span', classes: ['name__subtitle'] });
    this.settingsNameDrop = this.#createDropListNames();

    this.startGameBtn = new CreateElement({ tag: 'button', classes: ['start-game'], textContent: 'Play' });
    this.showSolutionBtn = new CreateElement({ tag: 'button', classes: ['show-solution'], textContent: 'Show Solution' });
    this.resetGameBtn = new CreateElement({ tag: 'button', classes: ['reset-game'], textContent: 'Reset' });
    this.saveGameBtn = new CreateElement({ tag: 'button', classes: ['save-game'], textContent: 'Save game' });
    this.continueGameBtn = new CreateElement({ tag: 'button', classes: ['continue-game'], textContent: 'Continue last game' });


    this.settingsSizeTop.append(this.settingsSizeTitle, this.settingsSizeSubtitle);
    this.settingsSizeBox.append(this.settingsSizeTop, this.settingsSizeDrop);

    this.settingsNameTop.append(this.settingsNameTitle, this.settingsNameSubtitle);
    this.settingsNameBox.append(this.settingsNameTop, this.settingsNameDrop);

    this.settingsContainer.append(this.settingsNameBox, this.settingsSizeBox, this.startGameBtn, this.showSolutionBtn, this.resetGameBtn, this.saveGameBtn, this.continueGameBtn);
    this.settings.append(this.settingsContainer);
    this.gameField.gameFieldSection.append(this.settings);
  }
}

export default SettingsGameView;
