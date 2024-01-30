var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _toggleThemeHandler, toggleThemeHandler_fn, _createHTML, createHTML_fn, _winnersClickHandler, winnersClickHandler_fn, _createHTML2, createHTML_fn2, _setField, setField_fn, _getField, getField_fn, _setCrossed, setCrossed_fn, _getCrossed, getCrossed_fn, _setEmpty, setEmpty_fn, _removeHighlightCells, removeHighlightCells_fn, _highlightCurrentColumnAndRow, highlightCurrentColumnAndRow_fn, _cellHasClicked, cellHasClicked_fn, _isWin, isWin_fn, _toggleIsClickableCell, toggleIsClickableCell_fn, _createHTML3, createHTML_fn3, _createHTML4, createHTML_fn4, _startGameHandler, startGameHandler_fn, _showSolutionHandler, showSolutionHandler_fn, _resetGameHandler, resetGameHandler_fn, _saveGameHandler, saveGameHandler_fn, _continueGameHandler, continueGameHandler_fn, _randomGameHandler, randomGameHandler_fn, _getRandomGame, getRandomGame_fn, _createCellsToLS, createCellsToLS_fn, _undisabledBtns, undisabledBtns_fn, _updateCurrentMatrix, updateCurrentMatrix_fn, _updateListNames, updateListNames_fn, _createDropListSizes, createDropListSizes_fn, _createDropListNames, createDropListNames_fn, _createHTML5, createHTML_fn5, _createHTML6, createHTML_fn6, _createHTML7, createHTML_fn7, _createHTML8, createHTML_fn8;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
function CreateElement({
  tag = "div",
  classes = [],
  attrs = {},
  textContent
}) {
  this.tag = tag;
  this.classes = classes;
  this.attrs = attrs;
  this.textContent = textContent;
  const elem = document.createElement(this.tag);
  if (this.classes) {
    elem.classList.add(...this.classes);
  }
  if (this.attrs) {
    Object.entries(this.attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });
  }
  if (this.textContent) {
    elem.textContent = this.textContent;
  }
  return elem;
}
const headerView = "";
const settingsAppView = "";
const APP_THEME_NAMES = ["light", "dark"];
class SettingsAppView {
  constructor() {
    __privateAdd(this, _toggleThemeHandler);
    __privateAdd(this, _createHTML);
    __privateMethod(this, _createHTML, createHTML_fn).call(this);
    this.theme = APP_THEME_NAMES[0];
    this.themeBtn.addEventListener("click", __privateMethod(this, _toggleThemeHandler, toggleThemeHandler_fn).bind(this));
  }
  getHTML() {
    return this.themeBtn;
  }
}
_toggleThemeHandler = new WeakSet();
toggleThemeHandler_fn = function() {
  this.theme = this.theme === APP_THEME_NAMES[0] ? APP_THEME_NAMES[1] : APP_THEME_NAMES[0];
  this.themeBtn.textContent = this.theme;
  document.body.classList.toggle(APP_THEME_NAMES[1]);
  document.body.classList.toggle(APP_THEME_NAMES[0]);
};
_createHTML = new WeakSet();
createHTML_fn = function() {
  this.themeBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__theme-btn"], textContent: APP_THEME_NAMES[0] });
};
class HeaderView {
  constructor(winners) {
    __privateAdd(this, _winnersClickHandler);
    __privateAdd(this, _createHTML2);
    this.settingsApp = new SettingsAppView();
    this.winners = winners;
    __privateMethod(this, _createHTML2, createHTML_fn2).call(this);
    this.winnersBtn.addEventListener("click", __privateMethod(this, _winnersClickHandler, winnersClickHandler_fn).bind(this));
  }
  /**
  * get HTML header
  * @returns {Element} HTML-Element header
  */
  getHTML() {
    return this.header;
  }
}
_winnersClickHandler = new WeakSet();
winnersClickHandler_fn = function() {
  this.winners.show();
};
_createHTML2 = new WeakSet();
createHTML_fn2 = function() {
  this.header = new CreateElement({ tag: "header", classes: ["header"] });
  this.headerContainer = new CreateElement({ tag: "div", classes: ["header__container", "container"] });
  this.title = new CreateElement({ tag: "h1", classes: ["header__title"], textContent: "Nonograms" });
  this.winnersBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__winners-btn"], textContent: "Winners" });
  this.headerContainer.append(this.title, this.winnersBtn, this.settingsApp.getHTML());
  this.header.append(this.headerContainer);
};
const cellView = "";
class CellView {
  constructor(cellValue, state = "empty", isClickable = true) {
    __privateAdd(this, _setField);
    __privateAdd(this, _getField);
    __privateAdd(this, _setCrossed);
    __privateAdd(this, _getCrossed);
    __privateAdd(this, _setEmpty);
    this.state = state;
    this.isClickable = isClickable;
    this.cellValue = cellValue;
    this.cell = new CreateElement({ classes: ["cell"] });
    __privateMethod(this, _getField, getField_fn).call(this);
    __privateMethod(this, _getCrossed, getCrossed_fn).call(this);
    this.cell.addEventListener("click", (event) => {
      switch (this.state) {
        case "empty":
          __privateMethod(this, _setField, setField_fn).call(this, event);
          break;
        case "field":
          __privateMethod(this, _setEmpty, setEmpty_fn).call(this, event);
          break;
        case "crossed":
          __privateMethod(this, _setEmpty, setEmpty_fn).call(this, event);
          break;
      }
    });
    this.cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (this.cell.classList.contains("crossed")) {
        __privateMethod(this, _setEmpty, setEmpty_fn).call(this, event);
      } else {
        __privateMethod(this, _setCrossed, setCrossed_fn).call(this, event);
      }
    });
  }
  /**
   * get HTML cell
   * @returns {Element} HTML-Element cell
   */
  getHTML() {
    return this.cell;
  }
  /**
   * get cell value
   * @returns {number} cell value
   */
  getCellValue() {
    return this.cellValue;
  }
  /**
   * set isClickable property
   * @param {boolean} isClick - flag that indicates the clickability of the cell
   */
  setClickable(isClick) {
    this.isClickable = isClick;
  }
}
_setField = new WeakSet();
setField_fn = function(event) {
  if (this.isClickable) {
    this.state = "field";
    event.target.classList.add("field");
  }
};
_getField = new WeakSet();
getField_fn = function() {
  if (this.isClickable && this.state === "field") {
    this.cell.classList.add("field");
  }
};
_setCrossed = new WeakSet();
setCrossed_fn = function(event) {
  if (this.isClickable) {
    this.state = "crossed";
    event.target.classList.remove("field");
    event.target.classList.add("crossed");
  }
};
_getCrossed = new WeakSet();
getCrossed_fn = function() {
  if (this.isClickable && this.state === "crossed") {
    this.cell.classList.remove("field");
    this.cell.classList.add("crossed");
  }
};
_setEmpty = new WeakSet();
setEmpty_fn = function(event) {
  if (this.isClickable) {
    this.state = "empty";
    event.target.classList.remove("field", "crossed");
  }
};
const gameFieldView = "";
const data = [
  {
    matrix: [
      [
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ]
    ],
    title: "camel",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0
      ]
    ],
    title: "bomb",
    size: "5x5"
  },
  {
    matrix: [
      [
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        1
      ]
    ],
    title: "turtle",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        1,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        1,
        0,
        1
      ]
    ],
    title: "kitten",
    size: "5x5"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0
      ]
    ],
    title: "dinosaur",
    size: "5x5"
  },
  {
    matrix: [
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ]
    ],
    title: "snowman",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1
      ]
    ],
    title: "turnip",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ]
    ],
    title: "face with tongue out",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ]
    ],
    title: "mushroom",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        0
      ]
    ],
    title: "dog",
    size: "10x10"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "Mickey Mouse",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "pegasus",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1
      ]
    ],
    title: "cupid",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        0
      ]
    ],
    title: "cherry",
    size: "15x15"
  },
  {
    matrix: [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0
      ]
    ],
    title: "paw print",
    size: "15x15"
  }
];
const DIRECTIONS = ["left", "top"];
const MESSAGE = "Great! You have solved the nonogram: ";
class GameFieldView {
  constructor(modal, timer, winners) {
    __privateAdd(this, _removeHighlightCells);
    __privateAdd(this, _highlightCurrentColumnAndRow);
    __privateAdd(this, _cellHasClicked);
    __privateAdd(this, _isWin);
    __privateAdd(this, _toggleIsClickableCell);
    __privateAdd(this, _createHTML3);
    this.modal = modal;
    this.timer = timer;
    this.winners = winners;
    this.currentNonogramObj = data[0];
    this.originalMatrix = this.currentNonogramObj.matrix;
    this.originalTitle = this.currentNonogramObj.title;
    this.originalSize = this.currentNonogramObj.size;
    this.cellElements = [];
    this.cellValues = [];
    this.isLockPlayground = false;
    this.isShowSolution = false;
    this.isEndGame = false;
    __privateMethod(this, _createHTML3, createHTML_fn3).call(this);
    this.startGame(this.currentNonogramObj);
    this.playground.addEventListener("click", () => {
      if (!this.timer.isStart) {
        this.timer.startTimer();
      }
      __privateMethod(this, _cellHasClicked, cellHasClicked_fn).call(this);
      __privateMethod(this, _isWin, isWin_fn).call(this, this.cellValues, this.originalMatrix);
    });
    this.playground.addEventListener("mousemove", ({ target }) => {
      if (target !== this.playground) {
        __privateMethod(this, _highlightCurrentColumnAndRow, highlightCurrentColumnAndRow_fn).call(this, target);
      }
    });
    this.playground.addEventListener("mouseleave", () => {
      __privateMethod(this, _removeHighlightCells, removeHighlightCells_fn).call(this);
    });
  }
  /**
  * get HTML cell
  * @returns {Element} HTML-Element cell
  */
  getHTML() {
    return this.gameFieldSection;
  }
  /**
   * create hints
   * @param {number[][]} matrix - matrix for the current game
   * @param {string[]} direction - hint box directions array
   */
  createHints(matrix) {
    DIRECTIONS.forEach((direction) => {
      const hintsBox = direction === DIRECTIONS[0] ? this.leftHintsBox : this.topHintsBox;
      hintsBox.innerHTML = "";
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
            classes: [`${direction}-hints__cell`],
            textContent: hint
          });
          hintRow.append(hintCell);
        });
      }
    });
  }
  /**
   * create cells
   * @param {number[][]} matrix - matrix for the current game
   */
  createCells(matrix) {
    console.log(matrix);
    this.playground.innerHTML = "";
    for (let row = 0; row < matrix.length; row += 1) {
      const rowElem = new CreateElement({ classes: ["playground__row"], attrs: { "data-row": row } });
      this.cellElements[row] = [];
      for (let column = 0; column < matrix[0].length; column += 1) {
        const cell = new CellView(matrix[row][column]);
        const cellElem = cell.getHTML();
        cellElem.setAttribute("data-cell", column);
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
    this.timer.currentTime = 0;
    this.timer.timer.textContent = "00:00";
    this.isEndGame = false;
  }
  lockPlayground() {
    if (!this.isLockPlayground) {
      this.playground.classList.remove("lock");
    } else {
      this.playground.classList.add("lock");
    }
    this.isLockPlayground = !this.isLockPlayground;
  }
}
_removeHighlightCells = new WeakSet();
removeHighlightCells_fn = function() {
  this.cellElements.forEach((row) => {
    row.forEach((cell) => {
      const currentRow = cell.cell.parentNode;
      currentRow.classList.remove("highlight");
      cell.cell.classList.remove("highlight");
    });
  });
};
_highlightCurrentColumnAndRow = new WeakSet();
highlightCurrentColumnAndRow_fn = function(target) {
  let currentTarget = target;
  this.cellElements.forEach((row) => {
    row.forEach((cell) => {
      if (cell === target) {
        currentTarget = cell;
      }
    });
  });
  __privateMethod(this, _removeHighlightCells, removeHighlightCells_fn).call(this);
  let rowIndex = Number(currentTarget.parentNode.getAttribute("data-row"));
  let cellIndex = Number(currentTarget.getAttribute("data-cell"));
  this.cellElements.forEach((row) => {
    row.forEach((cell) => {
      const currentRow = cell.cell.parentNode;
      if (rowIndex === Number(currentRow.getAttribute("data-row"))) {
        currentRow.classList.add("highlight");
      }
      if (cellIndex === Number(cell.cell.getAttribute("data-cell"))) {
        cell.cell.classList.add("highlight");
      }
    });
  });
};
_cellHasClicked = new WeakSet();
cellHasClicked_fn = function() {
  this.cellElements.forEach((row, rowIndex) => {
    this.cellValues[rowIndex] = [];
    row.forEach((cell, cellIndex) => {
      if (cell.state === "field") {
        this.cellValues[rowIndex][cellIndex] = 1;
      } else {
        this.cellValues[rowIndex][cellIndex] = 0;
      }
    });
  });
};
_isWin = new WeakSet();
isWin_fn = function(cellValues, matrix) {
  if (cellValues.every((_, rowIndex) => cellValues[rowIndex].every((elem, cellIndex) => elem === matrix[rowIndex][cellIndex]))) {
    this.timer.stopTimer();
    this.modal.show(MESSAGE, this.originalTitle, this.timer.formattedTime());
    __privateMethod(this, _toggleIsClickableCell, toggleIsClickableCell_fn).call(this, this.cellElements);
    this.lockPlayground();
    this.isEndGame = true;
    this.winners.addWinner(this.originalTitle, this.originalSize, this.timer.getTime());
  }
};
_toggleIsClickableCell = new WeakSet();
toggleIsClickableCell_fn = function(cellElements) {
  cellElements.forEach((row) => {
    row.forEach((cell) => {
      cell.setClickable(false);
    });
  });
};
_createHTML3 = new WeakSet();
createHTML_fn3 = function() {
  this.gameFieldSection = new CreateElement({ tag: "section", classes: ["game"] });
  this.gameField = new CreateElement({ classes: ["game__field"] });
  this.playground = new CreateElement({ classes: ["playground"] });
  this.leftHintsBox = new CreateElement({ classes: ["left-hints"] });
  this.topHintsBox = new CreateElement({ classes: ["top-hints"] });
  this.gameField.append(this.playground, this.leftHintsBox, this.topHintsBox, this.timer.getHTML());
  this.gameFieldSection.append(this.gameField);
};
const modalView = "";
class ModalView {
  constructor() {
    __privateAdd(this, _createHTML4);
    this.message = null;
    this.name = null;
    this.time = null;
    __privateMethod(this, _createHTML4, createHTML_fn4).call(this);
    this.closeBtn.addEventListener("click", () => this.show(this.message, this.name, this.time));
    this.overlay.addEventListener("click", ({ target }) => {
      if (target === this.overlay) {
        this.show(this.message, this.name, this.time);
      }
    });
  }
  getHTML() {
    return this.modalBox;
  }
  show(message, name, time) {
    this.message = message;
    this.name = name;
    this.time = time;
    const { formattedMin, formattedSec } = this.time;
    this.title.innerHTML = `${this.message}<span class="modal__title--accent">${this.name}</span>`;
    this.subtitle.innerHTML = `Time: <span class="modal__subtitle--accent">${formattedMin}:${formattedSec}</span>`;
    this.modalBox.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
    this.content.classList.toggle("hidden");
    document.body.classList.toggle("stop-scroll");
  }
}
_createHTML4 = new WeakSet();
createHTML_fn4 = function() {
  this.modalBox = new CreateElement({ classes: ["modal"] });
  this.overlay = new CreateElement({ classes: ["modal__overlay"] });
  this.content = new CreateElement({ classes: ["modal__content"] });
  this.title = new CreateElement({ tag: "h3", classes: ["modal__title"] });
  this.subtitle = new CreateElement({ tag: "h3", classes: ["modal__subtitle"] });
  this.closeBtn = new CreateElement({ tag: "btn", classes: ["btn-reset", "modal__close-btn"] });
  this.content.append(this.title, this.subtitle, this.closeBtn);
  this.overlay.append(this.content);
  this.modalBox.append(this.overlay);
};
const settingsGameView = "";
class SettingsGameView {
  constructor(gameField, timer) {
    __privateAdd(this, _startGameHandler);
    __privateAdd(this, _showSolutionHandler);
    __privateAdd(this, _resetGameHandler);
    __privateAdd(this, _saveGameHandler);
    __privateAdd(this, _continueGameHandler);
    __privateAdd(this, _randomGameHandler);
    __privateAdd(this, _getRandomGame);
    __privateAdd(this, _createCellsToLS);
    __privateAdd(this, _undisabledBtns);
    __privateAdd(this, _updateCurrentMatrix);
    __privateAdd(this, _updateListNames);
    __privateAdd(this, _createDropListSizes);
    __privateAdd(this, _createDropListNames);
    __privateAdd(this, _createHTML5);
    this.gameField = gameField;
    this.timer = timer;
    this.sizeBtnsArr = [];
    this.nameBtnsArr = [];
    this.currentName = null;
    this.newOriginalData = null;
    __privateMethod(this, _createHTML5, createHTML_fn5).call(this);
    this.sizeBtnsArr.forEach((btn) => {
      btn.addEventListener("click", () => {
        __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
        btn.disabled = true;
        this.settingsSizeSubtitle.textContent = btn.textContent;
        __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
        this.currentName = this.settingsNameSubtitle.textContent;
        this.newOriginalData = __privateMethod(this, _updateCurrentMatrix, updateCurrentMatrix_fn).call(this);
      });
    });
    this.nameBtnsArr.forEach((btn) => {
      btn.addEventListener("click", () => {
        __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
        btn.disabled = true;
        this.currentName = btn.textContent;
        this.settingsNameSubtitle.textContent = btn.textContent;
      });
    });
    this.startGameBtn.addEventListener("click", () => {
      __privateMethod(this, _startGameHandler, startGameHandler_fn).apply(this);
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;
      this.continueGameBtn.disabled = false;
    });
    this.showSolutionBtn.addEventListener("click", () => {
      if (!this.gameField.isShowSolution && !this.gameField.isEndGame) {
        __privateMethod(this, _showSolutionHandler, showSolutionHandler_fn).apply(this, [this.gameField.originalMatrix, this.gameField.cellElements]);
        this.gameField.lockPlayground();
      }
      this.showSolutionBtn.disabled = true;
      this.saveGameBtn.disabled = true;
      this.resetGameBtn.disabled = true;
      this.continueGameBtn.disabled = true;
    });
    this.resetGameBtn.addEventListener("click", __privateMethod(this, _resetGameHandler, resetGameHandler_fn).bind(this));
    this.saveGameBtn.addEventListener("click", __privateMethod(this, _saveGameHandler, saveGameHandler_fn).bind(this));
    this.continueGameBtn.addEventListener("click", () => {
      this.showSolutionBtn.disabled = false;
      this.resetGameBtn.disabled = false;
      this.saveGameBtn.disabled = false;
      const LS = JSON.parse(localStorage.getItem("kleostro"));
      if (LS["current-game"]) {
        console.log("попал сюда");
        __privateMethod(this, _continueGameHandler, continueGameHandler_fn).apply(this);
      } else {
        this.continueGameBtn.disabled = true;
      }
      const { formattedMin, formattedSec } = this.timer.formattedTime();
      this.timer.timer.textContent = `${formattedMin}:${formattedSec}`;
    });
    this.randomGameBtn.addEventListener("click", __privateMethod(this, _randomGameHandler, randomGameHandler_fn).bind(this));
  }
  /**
  * get HTML settings section
  * @returns {Element} HTML-Element settings section
  */
  getHTML() {
    return this.settings;
  }
}
_startGameHandler = new WeakSet();
startGameHandler_fn = function() {
  this.newOriginalData = __privateMethod(this, _updateCurrentMatrix, updateCurrentMatrix_fn).call(this);
  this.gameField.startGame(this.newOriginalData);
  this.showSolutionBtn.disabled = false;
  this.isShowSolution = false;
};
_showSolutionHandler = new WeakSet();
showSolutionHandler_fn = function(matrix, cellElements) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      cellElements[rowIndex][columnIndex].cell.classList.remove("field");
      if (cellElements[rowIndex][columnIndex].cellValue === 1 && !this.isShowSolution) {
        cellElements[rowIndex][columnIndex].cell.classList.add("field");
        cellElements[rowIndex][columnIndex].cell.classList.remove("crossed");
      }
    });
  });
};
_resetGameHandler = new WeakSet();
resetGameHandler_fn = function() {
  this.gameField.cellElements.forEach((row) => {
    row.forEach((cell) => {
      cell.cell.classList.remove("field", "crossed");
      cell.state = "empty";
    });
  });
};
_saveGameHandler = new WeakSet();
saveGameHandler_fn = function() {
  const LS = JSON.parse(localStorage.kleostro);
  LS["current-game"] = JSON.stringify(this.gameField);
  LS["left-hints"] = this.gameField.leftHintsBox.innerHTML;
  LS["top-hints"] = this.gameField.topHintsBox.innerHTML;
  LS["current-playground"] = this.gameField.playground.innerHTML;
  LS["current-time"] = this.timer.getTime();
  const savedArr = [];
  this.gameField.cellElements.forEach((row) => {
    const rowArr = [];
    row.forEach((cell) => {
      rowArr.push(JSON.stringify(cell));
    });
    savedArr.push(rowArr);
    LS["saved-cells"] = JSON.stringify(savedArr);
    this.continueGameBtn.disabled = false;
  });
  localStorage.kleostro = JSON.stringify(LS);
};
_continueGameHandler = new WeakSet();
continueGameHandler_fn = function() {
  if (!this.gameField.isLockPlayground) {
    this.gameField.lockPlayground();
  }
  this.gameField.isEndGame = false;
  const LS = JSON.parse(localStorage.kleostro);
  const savedCells = JSON.parse(LS["saved-cells"]);
  __privateMethod(this, _createCellsToLS, createCellsToLS_fn).call(this, savedCells);
  this.gameField.leftHintsBox.innerHTML = LS["left-hints"];
  this.gameField.topHintsBox.innerHTML = LS["top-hints"];
  this.gameField.originalMatrix = JSON.parse(LS["current-game"]).originalMatrix;
  this.gameField.originalTitle = JSON.parse(LS["current-game"]).originalTitle;
  this.gameField.originalSize = JSON.parse(LS["current-game"]).originalSize;
  this.settingsSizeSubtitle.textContent = JSON.parse(LS["current-game"]).originalSize;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  this.sizeBtnsArr.forEach((btn) => {
    if (this.settingsSizeSubtitle.textContent === btn.textContent) {
      btn.disabled = true;
    }
  });
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  this.settingsNameSubtitle.textContent = JSON.parse(LS["current-game"]).originalTitle;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  this.nameBtnsArr.forEach((btn) => {
    if (this.settingsNameSubtitle.textContent === btn.textContent) {
      btn.disabled = true;
    }
  });
  this.timer.currentTime = +JSON.parse(LS["current-time"]);
};
_randomGameHandler = new WeakSet();
randomGameHandler_fn = function() {
  const { matrix, title, size } = __privateMethod(this, _getRandomGame, getRandomGame_fn).call(this);
  this.settingsSizeSubtitle.textContent = size;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  this.sizeBtnsArr.forEach((btn) => {
    if (this.settingsSizeSubtitle.textContent === btn.textContent) {
      btn.disabled = true;
    }
  });
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  this.settingsNameSubtitle.textContent = title;
  this.nameBtnsArr.forEach((btn) => {
    if (this.settingsNameSubtitle.textContent === btn.textContent) {
      btn.disabled = true;
    }
  });
  this.currentName = title;
  this.gameField.startGame({ matrix, title, size });
  this.showSolutionBtn.disabled = false;
  this.resetGameBtn.disabled = false;
  this.saveGameBtn.disabled = false;
  this.continueGameBtn.disabled = false;
};
_getRandomGame = new WeakSet();
getRandomGame_fn = function() {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};
_createCellsToLS = new WeakSet();
createCellsToLS_fn = function(savedCells) {
  if (savedCells) {
    console.log(savedCells);
    this.gameField.cellElements = [];
    this.gameField.cellValues = [];
    this.gameField.playground.innerHTML = "";
    for (let row = 0; row < savedCells.length; row += 1) {
      const rowElem = new CreateElement({ classes: ["playground__row"], attrs: { "data-row": row } });
      this.gameField.cellElements[row] = [];
      this.gameField.cellValues[row] = [];
      for (let column = 0; column < savedCells[0].length; column += 1) {
        const cellParse = JSON.parse(savedCells[row][column]);
        const cell = new CellView(cellParse.cellValue, cellParse.state, cellParse.isClickable);
        const cellElem = cell.getHTML();
        cellElem.setAttribute("data-cell", column);
        rowElem.append(cellElem);
        this.gameField.cellElements[row][column] = cell;
        this.gameField.cellValues[row] = cellParse.cellValue;
      }
      this.gameField.playground.append(rowElem);
    }
  }
};
_undisabledBtns = new WeakSet();
undisabledBtns_fn = function(btnsArr) {
  btnsArr.forEach((btn) => btn.disabled = false);
};
_updateCurrentMatrix = new WeakSet();
updateCurrentMatrix_fn = function() {
  return data.find((item) => item.title === this.currentName);
};
_updateListNames = new WeakSet();
updateListNames_fn = function() {
  const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  filteredData.forEach((item, index) => {
    if (index === 0) {
      this.settingsNameSubtitle.textContent = item.title;
      this.nameBtnsArr[index].disabled = true;
    }
    this.nameBtnsArr[index].textContent = item.title;
  });
};
_createDropListSizes = new WeakSet();
createDropListSizes_fn = function() {
  const uniqueDataObj = /* @__PURE__ */ new Set();
  data.forEach((item) => {
    uniqueDataObj.add(item.size);
  });
  const uniqueDataArr = Array.from(uniqueDataObj);
  const dropList = new CreateElement({ tag: "ul", classes: ["size__drop", "list-reset"] });
  uniqueDataArr.forEach((item, index) => {
    const listItem = new CreateElement({ tag: "li", classes: ["size__drop-item"] });
    const btn = new CreateElement({ tag: "button", classes: ["size__drop-btn", "btn-reset"], textContent: item });
    if (index === 0) {
      btn.disabled = true;
    }
    this.sizeBtnsArr.push(btn);
    listItem.append(btn);
    dropList.append(listItem);
  });
  this.settingsSizeSubtitle.textContent = uniqueDataArr[0];
  return dropList;
};
_createDropListNames = new WeakSet();
createDropListNames_fn = function() {
  const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);
  const dropList = new CreateElement({ tag: "ul", classes: ["name__drop", "list-reset"] });
  filteredData.forEach((item, index) => {
    const listItem = new CreateElement({ tag: "li", classes: ["name__drop-item"] });
    const btn = new CreateElement({ tag: "button", classes: ["name__drop-btn", "btn-reset"], textContent: item.title });
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
};
_createHTML5 = new WeakSet();
createHTML_fn5 = function() {
  this.settings = new CreateElement({ classes: ["settings"] });
  this.settingsContainer = new CreateElement({ classes: ["settings__container"] });
  this.settingsSizeBox = new CreateElement({ classes: ["size"] });
  this.settingsSizeTop = new CreateElement({ classes: ["size__top"] });
  this.settingsSizeTitle = new CreateElement({ tag: "span", classes: ["size__title"], textContent: "Size: " });
  this.settingsSizeSubtitle = new CreateElement({ tag: "span", classes: ["size__subtitle"] });
  this.settingsSizeDrop = __privateMethod(this, _createDropListSizes, createDropListSizes_fn).call(this);
  this.settingsNameBox = new CreateElement({ classes: ["name"] });
  this.settingsNameTop = new CreateElement({ classes: ["name__top"] });
  this.settingsNameTitle = new CreateElement({ tag: "span", classes: ["name__title"], textContent: "Selected: " });
  this.settingsNameSubtitle = new CreateElement({ tag: "span", classes: ["name__subtitle"] });
  this.settingsNameDrop = __privateMethod(this, _createDropListNames, createDropListNames_fn).call(this);
  this.startGameBtn = new CreateElement({ tag: "button", classes: ["start-game"], textContent: "Play" });
  this.showSolutionBtn = new CreateElement({ tag: "button", classes: ["show-solution"], textContent: "Show Solution" });
  this.resetGameBtn = new CreateElement({ tag: "button", classes: ["reset-game"], textContent: "Reset" });
  this.saveGameBtn = new CreateElement({ tag: "button", classes: ["save-game"], textContent: "Save game" });
  this.continueGameBtn = new CreateElement({ tag: "button", classes: ["continue-game"], textContent: "Continue last game" });
  this.randomGameBtn = new CreateElement({ tag: "button", classes: ["random-game"], textContent: "Random game" });
  this.settingsSizeTop.append(this.settingsSizeTitle, this.settingsSizeSubtitle);
  this.settingsSizeBox.append(this.settingsSizeTop, this.settingsSizeDrop);
  this.settingsNameTop.append(this.settingsNameTitle, this.settingsNameSubtitle);
  this.settingsNameBox.append(this.settingsNameTop, this.settingsNameDrop);
  this.settingsContainer.append(this.settingsNameBox, this.settingsSizeBox, this.startGameBtn, this.showSolutionBtn, this.resetGameBtn, this.saveGameBtn, this.continueGameBtn, this.randomGameBtn);
  this.settings.append(this.settingsContainer);
  this.gameField.gameFieldSection.append(this.settings);
};
const timerView = "";
const TIMER_INTERVAL = 1e3;
const MAX_MS_IN_SEC$1 = 60;
const MAX_SEC_IN_MIN$1 = 60;
class TimerView {
  constructor() {
    __privateAdd(this, _createHTML6);
    this.intervalID = null;
    this.currentTime = 0;
    this.isStart = false;
    __privateMethod(this, _createHTML6, createHTML_fn6).call(this);
  }
  getHTML() {
    return this.timer;
  }
  startTimer() {
    this.isStart = true;
    return this.intervalID = setInterval(() => {
      this.currentTime += 1;
      const { formattedMin, formattedSec } = this.formattedTime();
      this.timer.textContent = `${formattedMin}:${formattedSec}`;
    }, TIMER_INTERVAL);
  }
  stopTimer() {
    clearInterval(this.intervalID);
    this.isStart = false;
  }
  getTime() {
    return this.currentTime;
  }
  formattedTime() {
    const formattedMin = Math.floor(this.currentTime / MAX_SEC_IN_MIN$1).toString().padStart(2, "0");
    const formattedSec = (this.currentTime % MAX_MS_IN_SEC$1).toString().padStart(2, "0");
    return { formattedMin, formattedSec };
  }
}
_createHTML6 = new WeakSet();
createHTML_fn6 = function() {
  this.timer = new CreateElement({ tag: "span", classes: ["timer"], textContent: "00:00" });
};
const winnersView = "";
const MAX_MS_IN_SEC = 60;
const MAX_SEC_IN_MIN = 60;
const MAX_WINNERS = 5;
class WinnersView {
  constructor() {
    __privateAdd(this, _createHTML7);
    __privateMethod(this, _createHTML7, createHTML_fn7).call(this);
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    if (!(LS == null ? void 0 : LS.winners)) {
      LS.winners = [];
      localStorage.setItem("kleostro", JSON.stringify(LS));
    }
    this.closeBtn.addEventListener("click", () => this.show());
    this.overlay.addEventListener("click", ({ target }) => {
      if (target === this.overlay) {
        this.show();
      }
    });
  }
  getHTML() {
    return this.winnersBox;
  }
  addWinner(...params) {
    const winner = {
      title: params[0],
      size: params[1],
      time: params[2]
    };
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    if (LS.winners.length >= MAX_WINNERS) {
      LS.winners.shift();
      LS.winners.push(winner);
    } else {
      LS.winners.push(winner);
    }
    localStorage.setItem("kleostro", JSON.stringify(LS));
    this.sortWinners();
  }
  sortWinners() {
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    return LS.winners.sort((a, b) => a.time - b.time);
  }
  show() {
    this.winnersList.innerHTML = "";
    this.winnersBox.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
    this.content.classList.toggle("hidden");
    document.body.classList.toggle("stop-scroll");
    const sortedListWinners = this.sortWinners();
    const listHeader = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"] });
    const listIndex = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "№" });
    const listTitle = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Name" });
    const listSize = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Size" });
    const listTime = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Time" });
    this.winnersList.append(listHeader, listIndex, listTitle, listSize, listTime);
    sortedListWinners.forEach((winner, index) => {
      const formattedMin = Math.floor(winner.time / MAX_SEC_IN_MIN).toString().padStart(2, "0");
      const formattedSec = (winner.time % MAX_MS_IN_SEC).toString().padStart(2, "0");
      const listItem = new CreateElement({ tag: "li", classes: ["winners-modal__list-item"] });
      const winnerIndex = new CreateElement({ tag: "span", classes: ["winners-modal__list-index"], textContent: index += 1 });
      const winnerTitle = new CreateElement({ tag: "span", classes: ["winners-modal__list-title"], textContent: winner.title });
      const winnerSize = new CreateElement({ tag: "span", classes: ["winners-modal__list-size"], textContent: winner.size });
      const winnerTime = new CreateElement({ tag: "span", classes: ["winners-modal__list-time"], textContent: `${formattedMin}:${formattedSec}` });
      listItem.append(winnerIndex, winnerTitle, winnerSize, winnerTime);
      this.winnersList.append(listItem);
    });
  }
}
_createHTML7 = new WeakSet();
createHTML_fn7 = function() {
  this.winnersBox = new CreateElement({ classes: ["winners-modal"] });
  this.overlay = new CreateElement({ classes: ["winners-modal__overlay"] });
  this.content = new CreateElement({ classes: ["winners-modal__content"] });
  this.title = new CreateElement({ tag: "h3", classes: ["winners-modal__title"], textContent: "List of winners" });
  this.closeBtn = new CreateElement({ tag: "btn", classes: ["btn-reset", "winners-modal__close-btn"] });
  this.winnersList = new CreateElement({ tag: "ul", classes: ["list-reset", "winners-modal__list"] });
  this.content.append(this.title, this.winnersList, this.closeBtn);
  this.overlay.append(this.content);
  this.winnersBox.append(this.overlay);
};
const mainView = "";
class MainView {
  constructor() {
    __privateAdd(this, _createHTML8);
    __privateMethod(this, _createHTML8, createHTML_fn8).call(this);
  }
  /**
  * get HTML main
  * @returns {Element} HTML-Element main
  */
  getHTML() {
    return this.main;
  }
}
_createHTML8 = new WeakSet();
createHTML_fn8 = function() {
  this.main = new CreateElement({ tag: "main", classes: ["main"] });
  this.modal = new ModalView();
  this.timer = new TimerView();
  this.winners = new WinnersView();
  this.gameField = new GameFieldView(this.modal, this.timer, this.winners);
  this.settingsBox = new SettingsGameView(this.gameField, this.timer);
  this.main.append(this.gameField.getHTML(), this.modal.getHTML(), this.winners.getHTML());
};
class App {
  constructor() {
    if (!localStorage.getItem("kleostro")) {
      localStorage.setItem("kleostro", JSON.stringify({}));
    }
    this.main = new MainView();
    this.header = new HeaderView(this.main.winners);
    document.body.prepend(
      this.header.getHTML(),
      this.main.getHTML()
    );
    document.body.classList.add("light");
  }
}
new App();
//# sourceMappingURL=main-6e05e103.js.map
