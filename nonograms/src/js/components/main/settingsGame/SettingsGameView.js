import CreateElement from '../../../CreateElement';
import './settingsGameView.scss';
import data from '../../../../data/nonograms.json';
import CellView from '../gameField/cell/CellView';

const MAX_LETTERS_IN_SUBTITLE = 10;

/** Create a settings
* @class
* @param {object} gameField - gameField class instance
* @param {object} timer - timer class instance
*/
class SettingsGameView {
  constructor(gameField, timer, audio) {
    this.gameField = gameField;
    this.timer = timer;
    this.audio = audio;

    this.sizeBtnsArr = [];
    this.nameBtnsArr = [];

    this.currentName = null;
    this.newOriginalData = null;

    this.isLockListSizes = false;
    this.isLockListNames = false;

    this.#createHTML();

    this.sizeBtnsArr.forEach((btn) => btn.addEventListener('click', ({ target }) => this.#updateBtnsSizeContent(target)));
    this.nameBtnsArr.forEach((btn) => btn.addEventListener('click', ({ target }) => this.#updateBtnsNameContent(target)));

    const LS = JSON.parse(localStorage.getItem('kleostro'));
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

  /**
   * start current game
   */
  #startGameHandler() {
    this.audio.playSettingsGameClick();
    this.newOriginalData = this.#updateCurrentMatrix();
    this.gameField.startGame(this.newOriginalData);
    this.showSolutionBtn.disabled = false;
    this.isShowSolution = false;
    this.settingsSizeSubtitle.textContent = this.newOriginalData.size;
    this.#undisabledBtns(this.sizeBtnsArr);
    this.sizeBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsSizeSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });

    this.#updateListNames();
    this.settingsNameSubtitle.textContent = this.newOriginalData.title;
    this.#undisabledBtns(this.nameBtnsArr);
    this.nameBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsNameSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });
  }

  /**
   * show solution current game
   * @param {number[][]} matrix - matrix for the current game
   * @param {Element[][]} cellElements - matrix for the current cell elements
   */
  #showSolutionHandler(matrix, cellElements) {
    this.audio.playSettingsGameClick();
    matrix.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        cellElements[rowIndex][columnIndex].cell.classList.remove('field', 'crossed');
        if (cellElements[rowIndex][columnIndex].cellValue === 1 && !this.isShowSolution) {
          cellElements[rowIndex][columnIndex].cell.classList.add('field');
        }
      });
    });
  }

  /**
   * clears the current gameField
   */
  #resetGameHandler() {
    this.audio.playSettingsGameClick();
    this.gameField.cellElements.forEach((row) => {
      row.forEach((cell) => {
        const currentCell = cell;
        currentCell.cell.classList.remove('field', 'crossed');
        currentCell.state = 'empty';
      });
    });
  }

  /**
   * save state the current game
   */
  #saveGameHandler() {
    this.audio.playSettingsGameClick();
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
    });

    localStorage.kleostro = JSON.stringify(LS);
  }

  /**
   * runs the last saved game
   */
  #continueGameHandler() {
    this.audio.playSettingsGameClick();
    if (!this.gameField.isLockPlayground) {
      this.gameField.lockPlayground();
    }
    this.gameField.isEndGame = false;

    const LS = JSON.parse(localStorage.kleostro);
    const savedCells = JSON.parse(LS['saved-cells']);
    this.#createCellsToLS(savedCells);

    this.gameField.leftHintsBox.innerHTML = LS['left-hints'];
    this.gameField.topHintsBox.innerHTML = LS['top-hints'];

    this.gameField.originalMatrix = JSON.parse(LS['current-game']).originalMatrix;
    this.gameField.originalTitle = JSON.parse(LS['current-game']).originalTitle;
    this.gameField.originalSize = JSON.parse(LS['current-game']).originalSize;

    this.#updateSizeGameField();

    this.settingsSizeSubtitle.textContent = JSON.parse(LS['current-game']).originalSize;
    this.#undisabledBtns(this.sizeBtnsArr);
    this.sizeBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsSizeSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });

    this.#updateListNames();
    this.settingsNameSubtitle.textContent = JSON.parse(LS['current-game']).originalTitle;
    this.#undisabledBtns(this.nameBtnsArr);
    this.nameBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsNameSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });
    this.timer.stopTimer();
    this.timer.currentTime = +JSON.parse(LS['current-time']);
  }

  /**
   * create save game cells
   * @param {object[][]} savedCells - two-dimensional array of cell objects
   */
  #createCellsToLS(savedCells) {
    if (savedCells) {
      this.gameField.cellElements = [];
      this.gameField.cellValues = [];
      this.gameField.playground.innerHTML = '';

      for (let row = 0; row < savedCells.length; row += 1) {
        const rowElem = new CreateElement({ classes: ['playground__row'], attrs: { 'data-row': row } });
        this.gameField.cellElements[row] = [];
        this.gameField.cellValues[row] = [];

        for (let column = 0; column < savedCells[0].length; column += 1) {
          const cellParse = JSON.parse(savedCells[row][column]);

          const cell = new CellView(cellParse.cellValue, this.audio, cellParse.state);

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

  /**
   * runs the random game
   */
  #randomGameHandler() {
    this.audio.playSettingsGameClick();
    const { matrix, title, size } = this.#getRandomGame();
    this.settingsSizeSubtitle.textContent = size;

    this.#undisabledBtns(this.sizeBtnsArr);
    this.sizeBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsSizeSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });

    this.#updateListNames();

    this.#undisabledBtns(this.nameBtnsArr);
    this.settingsNameSubtitle.textContent = title;
    this.nameBtnsArr.forEach((btn) => {
      const currentBtn = btn;
      if (this.settingsNameSubtitle.textContent === btn.textContent) {
        currentBtn.disabled = true;
      }
    });

    this.currentName = title;
    this.gameField.startGame({ matrix, title, size });
    this.showSolutionBtn.disabled = false;
    this.resetGameBtn.disabled = false;
    this.saveGameBtn.disabled = false;
    this.continueGameBtn.disabled = false;
  }

  /**
   * get random game data
   * @returns {object} - random game data
   */
  #getRandomGame() {
    this.randomIndex = Math.floor(Math.random() * data.length);
    return data[this.randomIndex];
  }

  /**
   * unlock the buttons
   * @param {object} - object btns
   */
  #undisabledBtns(btnsArr) {
    btnsArr.forEach((btn) => {
      this.currentBtn = btn;
      this.currentBtn.disabled = false;
    });
  }

  #updateSizeGameField() {
    switch (this.gameField.originalSize) {
      case '5x5': {
        this.gameField.gameField.classList.remove('medium', 'large');
        this.gameField.gameField.classList.add('small');
        break;
      }
      case '10x10': {
        this.gameField.gameField.classList.remove('small', 'large');
        this.gameField.gameField.classList.add('medium');
        break;
      }
      case '15x15': {
        this.gameField.gameField.classList.remove('small', 'medium');
        this.gameField.gameField.classList.add('large');
        break;
      }
    }
  }

  #updateBtnsSizeContent(target) {
    const currentBtn = target;

    this.audio.playSettingsGameClick();
    this.startGameBtn.disabled = false;
    this.#undisabledBtns(this.sizeBtnsArr);
    currentBtn.disabled = true;
    this.settingsSizeSubtitle.textContent = target.textContent;
    this.#updateListNames();
    this.currentName = this.settingsNameSubtitle.textContent;
    this.newOriginalData = this.#updateCurrentMatrix();
  }

  #updateBtnsNameContent(target) {
    const currentBtn = target;

    this.audio.playSettingsGameClick();
    this.startGameBtn.disabled = false;
    this.#undisabledBtns(this.nameBtnsArr);
    currentBtn.disabled = true;
    this.currentName = target.textContent;

    if (target.textContent.length > MAX_LETTERS_IN_SUBTITLE) {
      const formattedSubtitle = target.textContent.slice(0, MAX_LETTERS_IN_SUBTITLE);
      this.settingsNameSubtitle.textContent = `${formattedSubtitle}...`;
    } else {
      this.settingsNameSubtitle.textContent = target.textContent;
    }
  }

  /**
   * find the current matrix by name
   * @returns {object} - current matrix
   */
  #updateCurrentMatrix() {
    return data.find((item) => item.title === this.currentName);
  }

  /**
   * update the list of current titles
   */
  #updateListNames() {
    const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);

    this.#undisabledBtns(this.nameBtnsArr);

    filteredData.forEach((item, index) => {
      if (index === 0) {
        this.settingsNameSubtitle.textContent = item.title;
        this.nameBtnsArr[index].disabled = true;
      }

      this.nameBtnsArr[index].textContent = item.title;
    });
  }

  /**
   * create list sizes
   */
  #createDropListSizes() {
    const uniqueDataObj = new Set();
    data.forEach((item) => {
      uniqueDataObj.add(item.size);
    });

    const uniqueDataArr = Array.from(uniqueDataObj);

    const dropList = new CreateElement({ tag: 'ul', classes: ['size__drop', 'list-reset', 'hidden'] });
    uniqueDataArr.forEach((item, index) => {
      const listItem = new CreateElement({ tag: 'li', classes: ['size__drop-item'] });
      const btn = new CreateElement({ tag: 'button', classes: ['size__drop-btn', 'btn-reset'], textContent: item });

      if (index === 0) {
        btn.disabled = true;
      }

      this.sizeBtnsArr.push(btn);
      listItem.append(btn);
      dropList.append(listItem);
    });

    const [firstElement] = uniqueDataArr;
    this.settingsSizeSubtitle.textContent = firstElement;
    return dropList;
  }

  /**
   * create list names
   */
  #createDropListNames() {
    const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);

    const dropList = new CreateElement({ tag: 'ul', classes: ['name__drop', 'list-reset', 'hidden'] });
    filteredData.forEach((item, index) => {
      const listItem = new CreateElement({ tag: 'li', classes: ['name__drop-item'] });
      const btn = new CreateElement({ tag: 'button', classes: ['name__drop-btn', 'btn-reset'], textContent: item.title });

      if (index === 0) {
        btn.disabled = true;
        this.currentName = btn.textContent;
      }

      this.nameBtnsArr.push(btn);
      listItem.append(btn);
      dropList.append(listItem);
    });

    const [firstElement] = filteredData;
    this.settingsNameSubtitle.textContent = firstElement.title;
    return dropList;
  }

  #showSizesDropList() {
    this.settingsSizeTop.classList.add('active');
    this.settingsSizeDrop.classList.remove('hidden');
  }

  #hiddenSizesDropList() {
    this.settingsSizeTop.classList.remove('active');
    this.settingsSizeDrop.classList.add('hidden');
  }

  #showDropListNames() {
    this.settingsNameTop.classList.add('active');
    this.settingsNameDrop.classList.remove('hidden');
  }

  #hiddenDropListNames() {
    this.settingsNameTop.classList.remove('active');
    this.settingsNameDrop.classList.add('hidden');
  }

  /**
  * create HTML settings game
  */
  // eslint-disable-next-line max-lines-per-function
  #createHTML() {
    this.settings = new CreateElement({ classes: ['game__settings'] });
    this.settingsContainer = new CreateElement({ classes: ['game__settings-container'] });
    this.settingsSizeBox = new CreateElement({ classes: ['size'] });
    this.settingsSizeTop = new CreateElement({ classes: ['size__top'] });
    this.settingsSizeTitle = new CreateElement({ tag: 'h3', classes: ['size__title'], textContent: 'Size: ' });
    this.settingsSizeSubtitle = new CreateElement({ tag: 'span', classes: ['size__subtitle'] });
    this.settingsSizeDrop = this.#createDropListSizes();
    this.settingsNameBox = new CreateElement({ classes: ['name'] });
    this.settingsNameTop = new CreateElement({ classes: ['name__top'] });
    this.settingsNameTitle = new CreateElement({ tag: 'h3', classes: ['name__title'], textContent: 'Selected: ' });
    this.settingsNameSubtitle = new CreateElement({ tag: 'span', classes: ['name__subtitle'] });
    this.settingsNameDrop = this.#createDropListNames();
    this.startGameBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'start-game'], textContent: 'Play' });
    this.showSolutionBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'show-solution'], textContent: 'Show Solution' });
    this.resetGameBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'reset-game'], textContent: 'Reset' });
    this.saveGameBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'save-game'], textContent: 'Save game' });
    this.continueGameBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'continue-game'], textContent: 'Continue last game' });
    this.randomGameBtn = new CreateElement({ tag: 'button', classes: ['btn-reset', 'random-game'], textContent: 'Random game' });
    this.settingsSizeTitle.append(this.settingsSizeSubtitle);
    this.settingsSizeTop.append(this.settingsSizeTitle);
    this.settingsSizeBox.append(this.settingsSizeTop, this.settingsSizeDrop);
    this.settingsNameTitle.append(this.settingsNameSubtitle);
    this.settingsNameTop.append(this.settingsNameTitle);
    this.settingsNameBox.append(this.settingsNameTop, this.settingsNameDrop);
    this.settingsContainer.append(
      this.startGameBtn,
      this.showSolutionBtn,
      this.resetGameBtn,
      this.saveGameBtn,
      this.continueGameBtn,
      this.randomGameBtn,
      this.settingsSizeBox,
      this.settingsNameBox,
    );
    this.settings.append(this.settingsContainer);
    this.gameField.gameFieldContainer.append(this.settings);

    document.addEventListener('click', ({ target }) => {
      if (this.settingsSizeTop.classList.contains('active') && !this.settingsSizeBox.contains(target) && !this.settingsNameBox.contains(target)) {
        this.isLockListSizes = !this.isLockListSizes;
        this.#hiddenSizesDropList();
      }

      if (this.settingsNameTop.classList.contains('active') && !this.settingsNameBox.contains(target) && !this.settingsSizeBox.contains(target)) {
        this.isLockListNames = !this.isLockListNames;
        this.#hiddenDropListNames();
      }
    });

    this.settingsSizeTop.addEventListener('mouseover', () => {
      if (!this.isLockListSizes) {
        this.#showSizesDropList();
      }
    });
    this.settingsSizeBox.addEventListener('mouseleave', () => {
      if (!this.isLockListSizes) {
        this.#hiddenSizesDropList();
      }
    });
    this.settingsSizeTop.addEventListener('click', () => {
      this.audio.playSettingsGameClick();
      this.isLockListSizes = !this.isLockListSizes;
    });
    this.settingsNameTop.addEventListener('mouseover', () => {
      if (!this.isLockListNames) {
        this.#showDropListNames();
      }
    });
    this.settingsNameBox.addEventListener('mouseleave', () => {
      if (!this.isLockListNames) {
        this.#hiddenDropListNames();
      }
    });
    this.settingsNameTop.addEventListener('click', () => {
      this.audio.playSettingsGameClick();
      this.isLockListNames = !this.isLockListNames;
    });
    this.startGameBtn.addEventListener('click', () => {
      this.#startGameHandler.apply(this);
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;
      this.continueGameBtn.disabled = false;
    });
    this.showSolutionBtn.addEventListener('click', () => {
      if (!this.gameField.isShowSolution && !this.gameField.isEndGame) {
        this.#showSolutionHandler.apply(this, [this.gameField.originalMatrix, this.gameField.cellElements]);
        this.gameField.lockPlayground();
      }
      this.showSolutionBtn.disabled = true;
      this.saveGameBtn.disabled = true;
      this.resetGameBtn.disabled = true;
      this.continueGameBtn.disabled = true;
    });
    this.resetGameBtn.addEventListener('click', this.#resetGameHandler.bind(this));
    this.saveGameBtn.addEventListener('click', this.#saveGameHandler.bind(this));
    this.continueGameBtn.addEventListener('click', () => {
      this.showSolutionBtn.disabled = false;
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;
      const LS = JSON.parse(localStorage.getItem('kleostro'));
      if (LS['current-game']) {
        this.#continueGameHandler.apply(this);
      } else {
        this.continueGameBtn.disabled = true;
      }
      const { formattedMin, formattedSec } = this.timer.formattedTime();
      this.timer.timer.textContent = `${formattedMin}:${formattedSec}`;
    });
    this.randomGameBtn.addEventListener('click', this.#randomGameHandler.bind(this));
  }
}

export default SettingsGameView;
