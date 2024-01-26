import startGame from '../game/gameInit';
import {
  nonogramBtns,
  nonograms,
  nonogramsBox,
  nonogramsDropList,
  nonogramsSubtitle,
  sizeBtns,
  sizes,
  sizesBox,
  sizesDropList,
  sizesSubtitle,
  startGameBtn,
} from './settingsLayout';
import { removeDisabledBtn, updateNonogramsList } from '../game/utils';
import './settings.scss';

let newMatrixTitle = 'camel';
let isLockSizes = false;
let isLockNonograms = false;

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
  btn.addEventListener('click', () => {
    const currentBtn = btn;
    removeDisabledBtn(sizeBtns);

    currentBtn.disabled = true;
    sizesSubtitle.textContent = currentBtn.textContent;
    updateNonogramsList(sizesSubtitle, nonogramBtns, nonogramsSubtitle);
    newMatrixTitle = nonogramBtns[0].textContent;
  });
});

nonogramBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentBtn = btn;
    removeDisabledBtn(nonogramBtns);

    currentBtn.disabled = true;
    newMatrixTitle = currentBtn.textContent;
    nonogramsSubtitle.textContent = newMatrixTitle;
  });
});

startGameBtn.addEventListener('click', () => {
  startGame(newMatrixTitle);
});
