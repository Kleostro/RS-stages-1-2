import "./modulepreload-polyfill-7faf532e.js";
const style = "";
const CLASS_LIST = {
  // burger.js
  burgerActive: "burger--active",
  menuActive: "header__left--active",
  navActive: "nav--active",
  stopScroll: "stop-scroll",
  // menu-list.js
  menuBtnAddVisible: "menu__btn-add--visible",
  menuListItemHidden: "menu__list-item--hidden",
  menuModalSizeBtnActive: "menu__modal-size-btn--active",
  menuModalSizeNameActive: "menu__modal-size-name--active",
  menuModalAdditivesBtnActive: "menu__modal-additives-btn--active",
  menuModalAdditivesIndexActive: "menu__modal-additives-index--active",
  menuTabsBtnActive: "menu__tabs-btn--active",
  // modal.js
  modalVisible: "modal--visible",
  modalOverlayVisible: "modal__overlay--visible",
  modalContentVisible: "modal__content--visible"
};
const burger = document.querySelector(".burger");
if (burger) {
  const menu = document.querySelector(".header__left");
  const nav = document.querySelector(".nav");
  const menuLinks = menu.querySelectorAll(".nav__list-link");
  const changeBurger = () => {
    burger.classList.toggle(CLASS_LIST.burgerActive);
    menu.classList.toggle(CLASS_LIST.menuActive);
    nav.classList.toggle(CLASS_LIST.navActive);
    document.body.classList.toggle(CLASS_LIST.stopScroll);
  };
  burger.addEventListener("click", () => {
    changeBurger();
  });
  menuLinks.forEach((el) => {
    el.addEventListener("click", () => {
      if (burger.classList.contains(CLASS_LIST.burgerActive)) {
        changeBurger();
        document.body.classList.remove(CLASS_LIST.stopScroll);
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("burger") && !e.target.closest(".header__left") && burger.classList.contains(CLASS_LIST.burgerActive)) {
      changeBurger();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      changeBurger();
    }
  });
}
const data = [
  {
    name: "Irish coffee",
    description: "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    price: "7.00",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Kahlua coffee",
    description: "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
    price: "7.00",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Honey raf",
    description: "Espresso with frothed milk, cream and aromatic honey",
    price: "5.50",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Ice cappuccino",
    description: "Cappuccino with soft thick foam in summer version with ice",
    price: "5.00",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Espresso",
    description: "Classic black coffee",
    price: "4.50",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Latte",
    description: "Espresso coffee with the addition of steamed milk and dense milk foam",
    price: "5.50",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Latte macchiato",
    description: "Espresso with frothed milk and chocolate",
    price: "5.50",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Coffee with cognac",
    description: "Fragrant black coffee with cognac and whipped cream",
    price: "6.50",
    category: "coffee",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Cinnamon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Moroccan",
    description: "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
    price: "4.50",
    category: "tea",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Lemon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Ginger",
    description: "Original black tea with fresh ginger, lemon and honey",
    price: "5.00",
    category: "tea",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Lemon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Cranberry",
    description: "Invigorating black tea with cranberry and honey",
    price: "5.00",
    category: "tea",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Lemon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Sea buckthorn",
    description: "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
    price: "5.50",
    category: "tea",
    sizes: {
      s: {
        size: "200 ml",
        "add-price": "0.00"
      },
      m: {
        size: "300 ml",
        "add-price": "0.50"
      },
      l: {
        size: "400 ml",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Sugar",
        "add-price": "0.50"
      },
      {
        name: "Lemon",
        "add-price": "0.50"
      },
      {
        name: "Syrup",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Marble cheesecake",
    description: "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
    price: "3.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Red velvet",
    description: "Layer cake with cream cheese frosting",
    price: "4.00",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Cheesecakes",
    description: "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
    price: "4.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Creme brulee",
    description: "Delicate creamy dessert in a caramel basket with wild berries",
    price: "4.00",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Pancakes",
    description: "Tender pancakes with strawberry jam and fresh strawberries",
    price: "4.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Honey cake",
    description: "Classic honey cake with delicate custard",
    price: "4.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Chocolate cake",
    description: "Cake with hot chocolate filling and nuts with dried apricots",
    price: "5.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  },
  {
    name: "Black forest",
    description: "A combination of thin sponge cake with cherry jam and light chocolate mousse",
    price: "6.50",
    category: "dessert",
    sizes: {
      s: {
        size: "50 g",
        "add-price": "0.00"
      },
      m: {
        size: "100 g",
        "add-price": "0.50"
      },
      l: {
        size: "200 g",
        "add-price": "1.00"
      }
    },
    additives: [
      {
        name: "Berries",
        "add-price": "0.50"
      },
      {
        name: "Nuts",
        "add-price": "0.50"
      },
      {
        name: "Jam",
        "add-price": "0.50"
      }
    ]
  }
];
const modal = document.querySelector(".menu__modal");
const modalOverlay = document.querySelector(".menu__modal-overlay");
const modalContent$1 = document.querySelector(".menu__modal-content");
let isModalOpen = false;
const toggleModal = () => {
  if (isModalOpen) {
    modal.classList.remove(CLASS_LIST.modalVisible);
    modalOverlay.classList.remove(CLASS_LIST.modalOverlayVisible);
    modalContent$1.classList.remove(CLASS_LIST.modalContentVisible);
    document.body.classList.remove(CLASS_LIST.stopScroll);
    isModalOpen = false;
  } else {
    modal.classList.add(CLASS_LIST.modalVisible);
    modalOverlay.classList.add(CLASS_LIST.modalOverlayVisible);
    modalContent$1.classList.add(CLASS_LIST.modalContentVisible);
    document.body.classList.add(CLASS_LIST.stopScroll);
    isModalOpen = true;
  }
};
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu__modal-content") && !e.target.closest(".menu__list-item") && modalContent$1.classList.contains(CLASS_LIST.modalContentVisible))
    toggleModal();
});
const getModalMarkup = (listItem, item) => `
  <div class="menu__modal-left">
    <div class="menu__modal-img-wrapper">
      <img class="menu__modal-img" src="${listItem.querySelector("img").getAttribute("src")}" alt="${listItem.querySelector("img").getAttribute("alt")}">
    </div>
  </div>
  <div class="menu__modal-right">
    <h3 class="menu__modal-title">${listItem.querySelector("strong").textContent}</h3>
    <p class="menu__modal-descr">${listItem.querySelector("p").textContent}</p>
    <div class="menu__modal-size">
      <span class="menu__modal-size-text">Size</span>
      <div class="menu__modal-size-btns">
        <button class="btn-reset menu__modal-size-btn menu__modal-size-btn--active"><span class="menu__modal-size-name menu__modal-size-name--active">${Object.keys(item.sizes)[0].toUpperCase()}</span>${Object.values(item.sizes)[0].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(item.sizes)[1].toUpperCase()}</span>${Object.values(item.sizes)[1].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(item.sizes)[2].toUpperCase()}</span>${Object.values(item.sizes)[2].size}</button>
      </div>
    </div>
    <div class="menu__modal-additives">
      <span class="menu__modal-additives-text">Additives</span>
      <div class="menu__modal-additives-btns">
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">1</span>${item.additives[0].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">2</span>${item.additives[1].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">3</span>${item.additives[2].name}</button>
      </div>
    </div>
    <div class="menu__modal-total">
      <strong class="menu__modal-total-text">Total:</strong>
      <strong class="menu__modal-total-sum">$${item.price}</strong>
    </div>
    <div class="menu__modal-info">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_268_9737)">
        <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_268_9737">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      <p class="menu__modal-info-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
    </div>
    <button class="btn-reset menu__modal-btn-close">Close</button>
  </div>
  `;
const getMenuListItemMarkup = (currentCategory2, index, item) => `
<article class="menu__card">
  <h2 class="visually-hidden">card</h2>
  <div class="menu__card-top">
    <img class="menu__card-img" src="../img/webp/${currentCategory2}-${index + 1}.webp" alt="${item.name}">
  </div>
  <div class="menu__card-bottom">
    <strong class="menu__card-title">${item.name}</strong>
    <p class="menu__card-descr">${item.description}</p>
    <span class="menu__card-price">$${item.price}</span>
  </div>
</article>
`;
const menuBtns = document.querySelectorAll(".menu__tabs-btn");
const menuList = document.querySelector(".menu__list");
const menuBtnAdd = document.querySelector(".menu__btn-add");
const modalContent = document.querySelector(".menu__modal-content");
const maxWidthTable = 1320;
const opacityIntervalDuration = 500;
const amountOfProductOnTabletAndPhone = 4;
let currentItems = [];
let currentCategory = "coffee";
let lastWindowWidth;
if (window.innerWidth > maxWidthTable) {
  menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
}
const updateTotalPrice = (basePrice, selectedSizePrice) => {
  const initialPriceElement = modalContent.querySelector(".menu__modal-total-sum");
  const totalPrice = basePrice + selectedSizePrice;
  const formattedPrice = totalPrice.toFixed(2);
  initialPriceElement.textContent = `$${formattedPrice}`;
};
const createLoader = (element, classNameImgWrapper, classNameImg) => {
  const loader = document.createElement("div");
  loader.classList.add("menu__loader");
  const imgWrapper = element.querySelector(classNameImgWrapper);
  imgWrapper.append(loader);
  const img = element.querySelector(classNameImg);
  img.style.display = "none";
  img.addEventListener("load", () => {
    img.style.display = "block";
    loader.remove();
  });
};
const createMenuItemModal = (listItem, item) => {
  modalContent.innerHTML = getModalMarkup(listItem, item);
  createLoader(modalContent, ".menu__modal-img-wrapper", ".menu__modal-img");
  const sizeButtons = modalContent.querySelectorAll(".menu__modal-size-btn");
  const additiveButtons = modalContent.querySelectorAll(".menu__modal-additives-btn");
  let basePrice = parseFloat(item.price);
  let selectedSizePrice = parseFloat(Object.values(item.sizes)[0]["add-price"]);
  modalContent.querySelector(".menu__modal-btn-close").addEventListener("click", toggleModal);
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const newSize = button.querySelector(".menu__modal-size-name");
      const newSizeText = newSize.textContent;
      sizeButtons.forEach((btn) => {
        btn.classList.remove(CLASS_LIST.menuModalSizeBtnActive);
        btn.querySelector(".menu__modal-size-name").classList.remove(CLASS_LIST.menuModalSizeNameActive);
      });
      button.classList.add(CLASS_LIST.menuModalSizeBtnActive);
      newSize.classList.add(CLASS_LIST.menuModalSizeNameActive);
      selectedSizePrice = parseFloat(item.sizes[newSizeText.toLowerCase()]["add-price"]);
      updateTotalPrice(basePrice, selectedSizePrice);
    });
  });
  additiveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.classList.contains(CLASS_LIST.menuModalAdditivesBtnActive);
      const additiveIndex = button.querySelector(".menu__modal-additives-index");
      const additiveIndexValue = Number(additiveIndex.textContent) - 1;
      const additiveAddPrice = parseFloat(item.additives[additiveIndexValue]["add-price"]);
      button.classList.toggle(CLASS_LIST.menuModalAdditivesBtnActive);
      additiveIndex.classList.toggle(CLASS_LIST.menuModalAdditivesIndexActive);
      if (selected) {
        basePrice -= additiveAddPrice;
      } else {
        basePrice += additiveAddPrice;
      }
      updateTotalPrice(basePrice, selectedSizePrice);
    });
  });
  updateTotalPrice(basePrice, selectedSizePrice);
};
const createMenuListItem = (item, index) => {
  const listItem = document.createElement("li");
  listItem.classList.add("menu__list-item");
  listItem.innerHTML = getMenuListItemMarkup(currentCategory, index, item);
  listItem.addEventListener("click", () => {
    toggleModal();
    createMenuItemModal(listItem, item);
  });
  createLoader(listItem, ".menu__card-top", ".menu__card-img");
  menuList.append(listItem);
};
const hideRemainingItems = () => {
  Array.from(menuList.children).slice(amountOfProductOnTabletAndPhone).forEach((child) => child.classList.add(CLASS_LIST.menuListItemHidden));
};
const showRemainingItems = () => {
  Array.from(menuList.children).forEach((child) => child.classList.remove(CLASS_LIST.menuListItemHidden));
};
const render = (items) => {
  menuList.innerHTML = "";
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
window.addEventListener("resize", () => {
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
menuBtnAdd.addEventListener("click", () => {
  menuBtnAdd.classList.remove(CLASS_LIST.menuBtnAddVisible);
  showRemainingItems();
});
const getCurrentItems = () => {
  currentItems = data.filter((item) => item.category === currentCategory);
};
menuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuBtns.forEach((currentBtn) => currentBtn.classList.remove(CLASS_LIST.menuTabsBtnActive));
    btn.classList.add(CLASS_LIST.menuTabsBtnActive);
    currentCategory = btn.innerText.replace(/\p{Emoji}/gu, "").trim().toLowerCase();
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
//# sourceMappingURL=menu-284045a2.js.map
