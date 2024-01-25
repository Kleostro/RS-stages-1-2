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
import { formattedTitleMatrixList, removeDisabledBtn, updateNonogramsList } from '../game/utils';
import './settings.scss';

let newMatrixTitle = 'camel';
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
    removeDisabledBtn(sizeBtns);

    e.target.disabled = true;
    sizesSubtitle.textContent = e.target.textContent;
    updateNonogramsList(sizesSubtitle, nonogramBtns);
    newMatrixTitle = nonogramBtns[0].textContent;
    nonogramsSubtitle.textContent = formattedTitleMatrixList(nonogramBtns[0].textContent);
  });
});

nonogramBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    removeDisabledBtn(nonogramBtns);

    e.target.disabled = true;
    newMatrixTitle = e.target.textContent;
    nonogramsSubtitle.textContent = formattedTitleMatrixList(e.target.textContent);
  });
});

startGameBtn.addEventListener('click', () => {
  console.log(newMatrixTitle);
  startGame(newMatrixTitle);
});
