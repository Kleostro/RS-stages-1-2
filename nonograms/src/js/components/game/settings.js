import startGame from './gameInit';
import {
  nonogramBtns,
  nonograms,
  nonogramsBox,
  nonogramsDropList,
  nonogramsTitle,
  nonogramsSubtitle,
  sizeBtns,
  sizes,
  sizesBox,
  sizesDropList,
  sizesSubtitle,
  startGameBtn,
} from './settingsLayout';
import { updateNonogramsList } from './utils';

const MAX_LETTERS_IN_TITLE = 10;

let newMatrixTitle = '';
let isLockSizes = false;

const showSizesDropList = () => {
  sizesBox.classList.add('active');
  sizesDropList.classList.remove('hidden');
};

const hiddenSizesDropList = () => {
  sizesBox.classList.remove('active');
  sizesDropList.classList.add('hidden');
};

sizes.addEventListener('mouseover', () => {
  if (!isLockSizes) {
    showSizesDropList();
  }
});

sizes.addEventListener('mouseleave', () => {
  if (!isLockSizes) {
    hiddenSizesDropList();
  }
});

sizesBox.addEventListener('click', () => {
  isLockSizes = !isLockSizes;
});

let isLockNonograms = false;

const showNonogramsDropList = () => {
  nonogramsBox.classList.add('active');
  nonogramsDropList.classList.remove('hidden');
};

const hiddenNonogramsDropList = () => {
  nonogramsBox.classList.remove('active');
  nonogramsDropList.classList.add('hidden');
};

nonograms.addEventListener('mouseover', () => {
  if (!isLockNonograms) {
    showNonogramsDropList();
  }
});

nonograms.addEventListener('mouseleave', () => {
  if (!isLockNonograms) {
    hiddenNonogramsDropList();
  }
});

nonogramsBox.addEventListener('click', () => {
  isLockNonograms = !isLockNonograms;
});

sizeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    sizeBtns.forEach((item) => {
      const otherBtn = item;
      otherBtn.disabled = false;
    });

    e.target.disabled = true;
    sizesSubtitle.textContent = e.target.textContent;
    updateNonogramsList(sizesSubtitle, nonogramBtns);
    nonogramsSubtitle.textContent = e.target.textContent;
  });
});

nonogramBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    nonogramBtns.forEach((item) => {
      const otherBtn = item;
      otherBtn.disabled = false;
    });

    e.target.disabled = true;
    let currentTitle = e.target.textContent.slice(0, MAX_LETTERS_IN_TITLE);
    if (currentTitle.length < e.target.textContent.length) {
      currentTitle += '...';
    }
    newMatrixTitle = e.target.textContent;
    nonogramsTitle.innerHTML = `Selected: <span class="nonograms__subtitle">${currentTitle}</span>`;
  });
});

startGameBtn.addEventListener('click', () => {
  startGame(newMatrixTitle);
});
