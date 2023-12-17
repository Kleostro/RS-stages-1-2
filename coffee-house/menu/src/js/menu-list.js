import data from '../data/data.json';
import { toggleModal } from './modal';
import getModalMarkup from './modal-markup';
import getMenuListItemMarkup from './menu-list-item-markup';
import CLASS_LIST from './class-list';

const menuBtns = document.querySelectorAll('.menu__tabs-btn');
const menuList = document.querySelector('.menu__list');
const menuBtnAdd = document.querySelector('.menu__btn-add');
const modalContent = document.querySelector('.menu__modal-content');

const maxWidthTable = 1320;
const opacityIntervalDuration = 500;
const amountOfProductOnTabletAndPhone = 4;

let currentItems = [];
let currentCategory = 'coffee';
let lastWindowWidth;

if (window.innerWidth > maxWidthTable) {
  menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
}

const updateTotalPrice = (basePrice, selectedSizePrice) => {
  const initialPriceElement = modalContent.querySelector('.menu__modal-total-sum');
  const totalPrice = basePrice + selectedSizePrice;
  const formattedPrice = totalPrice.toFixed(2);
  initialPriceElement.textContent = `$${formattedPrice}`;
};

const createLoader = (element, classNameImgWrapper, classNameImg) => {
  const loader = document.createElement('div');
  loader.classList.add('menu__loader');

  const imgWrapper = element.querySelector(classNameImgWrapper);
  imgWrapper.append(loader);

  const img = element.querySelector(classNameImg);
  img.style.display = 'none';

  img.addEventListener('load', () => {
    img.style.display = 'block';
    loader.remove();
  });
};

const createMenuItemModal = (listItem, item) => {
  modalContent.innerHTML = getModalMarkup(listItem, item);

  createLoader(modalContent, '.menu__modal-img-wrapper', '.menu__modal-img');

  const sizeButtons = modalContent.querySelectorAll('.menu__modal-size-btn');
  const additiveButtons = modalContent.querySelectorAll('.menu__modal-additives-btn');

  let basePrice = parseFloat(item.price);
  let selectedSizePrice = parseFloat(Object.values(item.sizes)[0]['add-price']);

  modalContent.querySelector('.menu__modal-btn-close').addEventListener('click', toggleModal);

  sizeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const newSize = button.querySelector('.menu__modal-size-name');
      const newSizeText = newSize.textContent;

      sizeButtons.forEach((btn) => {
        btn.classList.remove(CLASS_LIST.menuModalSizeBtnActive);
        btn.querySelector('.menu__modal-size-name').classList.remove(CLASS_LIST.menuModalSizeNameActive);
      });

      button.classList.add(CLASS_LIST.menuModalSizeBtnActive);
      newSize.classList.add(CLASS_LIST.menuModalSizeNameActive);

      selectedSizePrice = parseFloat(item.sizes[newSizeText.toLowerCase()]['add-price']);
      updateTotalPrice(basePrice, selectedSizePrice);
    });
  });

  additiveButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.classList.contains(CLASS_LIST.menuModalAdditivesBtnActive);
      const additiveIndex = button.querySelector('.menu__modal-additives-index');
      const additiveIndexValue = Number(additiveIndex.textContent) - 1;
      const additiveAddPrice = parseFloat(item.additives[additiveIndexValue]['add-price']);

      button.classList.toggle(CLASS_LIST.menuModalAdditivesBtnActive);
      additiveIndex.classList.toggle(CLASS_LIST.menuModalAdditivesIndexActive);

      if (selected) {
        basePrice -= additiveAddPrice;
      } else {
        basePrice += additiveAddPrice;
      }

      updateTotalPrice(basePrice, selectedSizePrice, modalContent);
    });
  });

  updateTotalPrice(basePrice, selectedSizePrice);
};

const createMenuListItem = (item, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('menu__list-item');
  listItem.innerHTML = getMenuListItemMarkup(currentCategory, index, item);
  listItem.addEventListener('click', () => {
    toggleModal();
    createMenuItemModal(listItem, item);
  });

  createLoader(listItem, '.menu__card-top', '.menu__card-img');

  menuList.append(listItem);
};

const hideRemainingItems = () => {
  Array.from(menuList.children)
    .slice(amountOfProductOnTabletAndPhone)
    .forEach((child) => child.classList.add(CLASS_LIST.menuListItemHidden));
};

const showRemainingItems = () => {
  Array.from(menuList.children)
    .forEach((child) => child.classList.remove(CLASS_LIST.menuListItemHidden));
};

const render = (items) => {
  menuList.innerHTML = '';
  items.forEach((item, index) => {
    createMenuListItem(item, index);

    if (window.innerWidth < maxWidthTable) {
      if (menuList.children.length > amountOfProductOnTabletAndPhone) {
        menuBtnAdd.classList.add(CLASS_LIST.menuBtnAddVisible);
      } else {
        menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
      }

      hideRemainingItems();
    }
  });
};

window.addEventListener('resize', () => {
  if (window.innerWidth !== lastWindowWidth) {
    if (window.innerWidth < maxWidthTable) {
      if (menuList.children.length > amountOfProductOnTabletAndPhone) {
        menuBtnAdd.classList.add(CLASS_LIST.menuBtnAddVisible);
      } else {
        menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
      }

      hideRemainingItems();
    } else {
      menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
      showRemainingItems();
    }
  }
  lastWindowWidth = window.innerWidth;
});

menuBtnAdd.addEventListener('click', () => {
  menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
  showRemainingItems();
});

const getCurrentItems = () => {
  currentItems = data.filter((item) => item.category === currentCategory);
};

menuBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    menuBtns.forEach((currentBtn) => currentBtn.classList.remove(CLASS_LIST.menuTabsBtnActive));
    btn.classList.add(CLASS_LIST.menuTabsBtnActive);
    currentCategory = btn.innerText.replace(/\p{Emoji}/gu, '').trim().toLowerCase();
    menuList.style.opacity = 0;
    setTimeout(() => {
      getCurrentItems();
      render(currentItems);
      menuList.style.opacity = 1;
    }, opacityIntervalDuration);
  });
});

getCurrentItems();
render(currentItems);
