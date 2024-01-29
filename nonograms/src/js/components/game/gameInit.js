import { endGameModal, showModal } from '../endGameModal/endGameModal';
import {
  continueGameBtn,
  nonogramBtns,
  nonogramsSubtitle,
  resetBtn,
  saveGameBtn,
  sizeBtns,
  sizesSubtitle,
} from '../settingsGame/settingsLayout';
import {
  gameWrapper,
  leftHintsBox,
  playground,
  timer,
  topHintsBox,
} from './gameLayout';
import {
  changeCrossedClass,
  changePaintedClass,
  createCurrentPlayground,
  createHints,
  highlightCurrentColumnAndRow,
  removeDisabledBtn,
  removeHighlightCells,
  resetCurrentGame,
  searchCurrentNonogramByTitle,
  updateArrsLastGame,
  updateNonogramsList,
} from './utils';

const LEFT_HINTS_DIRECTION = 'left';
const TOP_HINTS_DIRECTION = 'top';
const INIT_TIMER_TEXT_CONTENT = '00:00';

const SIZE_PLAYGROUND = {
  '5x5': 'small',
  '10x10': 'medium',
  '15x15': 'large',
};

const TIMER_MILLISECONDS_IN_SECOND = 1000;
const TIMER_MILLISECONDS_IN_MINUTE = 60000;

let elapsedTimerTime = 0;
let startTimerTime = null;
let isTimerRunning = false;

let currentPlayground = [];
let currentNonogram = {};

let { matrix, title, size } = currentNonogram;

const startGameTimer = (timeStamp) => {
  if (!startTimerTime) {
    startTimerTime = timeStamp;
  }

  elapsedTimerTime = timeStamp - startTimerTime;

  const minutes = Math.floor(elapsedTimerTime / TIMER_MILLISECONDS_IN_MINUTE);
  const seconds = Math.floor((
    elapsedTimerTime % TIMER_MILLISECONDS_IN_MINUTE)
    / TIMER_MILLISECONDS_IN_SECOND);

  const formattedSec = String(seconds).padStart(2, '0');
  const formattedMin = String(minutes).padStart(2, '0');
  timer.textContent = `${formattedMin}:${formattedSec}`;

  if (isTimerRunning) {
    requestAnimationFrame(startGameTimer);
  }
};

const startGame = () => {
  isTimerRunning = false;
  startTimerTime = null;
  timer.textContent = INIT_TIMER_TEXT_CONTENT;

  resetBtn.disabled = false;
  saveGameBtn.disabled = false;

  if (!localStorage.getItem('current-matrix')) {
    continueGameBtn.disabled = true;
  } else {
    continueGameBtn.disabled = false;
  }

  playground.classList.remove('lock');

  currentNonogram = searchCurrentNonogramByTitle(nonogramsSubtitle.textContent);
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
  isTimerRunning = false;

  playground.classList.add('lock');
  const copyPlayground = playground.cloneNode(true);

  endGameModal(title, copyPlayground);
  resetBtn.disabled = true;
  saveGameBtn.disabled = true;
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

  if (!isTimerRunning) {
    isTimerRunning = true;
    startTimerTime = null;
    requestAnimationFrame(startGameTimer);
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

resetBtn.addEventListener('click', () => {
  resetCurrentGame(currentPlayground);
});

const saveDataCurrentGame = () => {
  localStorage['current-game'] = JSON.stringify(currentPlayground);
  localStorage['left-hints'] = leftHintsBox.innerHTML;
  localStorage['top-hints'] = topHintsBox.innerHTML;
  localStorage['current-playground'] = playground.innerHTML;
  localStorage['current-matrix'] = JSON.stringify(matrix);
  localStorage['current-title'] = JSON.stringify(title);
  localStorage['current-size'] = JSON.stringify(size);
};

saveGameBtn.addEventListener('click', () => {
  saveDataCurrentGame(currentPlayground);

  if (!localStorage.getItem('current-matrix')) {
    continueGameBtn.disabled = true;
  } else {
    continueGameBtn.disabled = false;
  }
});

const readDataLastGame = () => {
  matrix = JSON.parse(localStorage['current-matrix']);
  title = JSON.parse(localStorage['current-title']);
  size = JSON.parse(localStorage['current-size']);
  currentPlayground = JSON.parse(localStorage['current-game']);
};

const continueLastGame = () => {
  readDataLastGame();
  createCurrentPlayground(JSON.parse(localStorage['current-game']));

  const savedLeftHints = localStorage['left-hints'];
  if (savedLeftHints) {
    leftHintsBox.innerHTML = savedLeftHints;
  }

  const savedTopHints = localStorage['top-hints'];
  if (savedTopHints) {
    topHintsBox.innerHTML = savedTopHints;
  }

  const savedPlayground = localStorage['current-playground'];
  if (savedPlayground) {
    playground.innerHTML = savedPlayground;
  }

  gameWrapper.removeAttribute('class');
  gameWrapper.classList.add('game__wrapper', SIZE_PLAYGROUND[size]);
  updateArrsLastGame();

  removeDisabledBtn(sizeBtns);

  sizeBtns.forEach((btn) => {
    const currentBtn = btn;
    if (currentBtn.textContent === size) {
      currentBtn.disabled = true;
      sizesSubtitle.textContent = size;
    }
  });

  updateNonogramsList(sizesSubtitle, nonogramBtns, nonogramsSubtitle);
  removeDisabledBtn(nonogramBtns);

  nonogramBtns.forEach((btn) => {
    const currentBtn = btn;
    if (currentBtn.textContent === title) {
      currentBtn.disabled = true;
      nonogramsSubtitle.textContent = title;
    }
  });
};

continueGameBtn.addEventListener('click', () => {
  continueLastGame();
  playground.classList.remove('lock');
  resetBtn.disabled = false;
});

showModal();

export default startGame;
