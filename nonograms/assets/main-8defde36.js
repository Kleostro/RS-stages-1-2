var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
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
var _mediator, _toggleSoundBgClickHandler, toggleSoundBgClickHandler_fn, _toggleSettingsSoundForLS, toggleSettingsSoundForLS_fn, _toggleSettingsSoundClickHandler, toggleSettingsSoundClickHandler_fn, _winnersClickHandler, winnersClickHandler_fn, _toggleThemeHandler, toggleThemeHandler_fn, _toggleThemeAppFromLS, toggleThemeAppFromLS_fn, _createHTML, createHTML_fn, _createHTML2, createHTML_fn2, _createHTML3, createHTML_fn3, _setField, setField_fn, _getField, getField_fn, _setCrossed, setCrossed_fn, _getCrossed, getCrossed_fn, _setEmpty, setEmpty_fn, _createHTML4, createHTML_fn4, _removeHighlightCells, removeHighlightCells_fn, _highlightCurrentColumnAndRow, highlightCurrentColumnAndRow_fn, _cellHasClicked, cellHasClicked_fn, _isWin, isWin_fn, _createHTML5, createHTML_fn5, _createHTML6, createHTML_fn6, _startGameHandler, startGameHandler_fn, _showSolutionHandler, showSolutionHandler_fn, _resetGameHandler, resetGameHandler_fn, _saveGameHandler, saveGameHandler_fn, _continueGameHandler, continueGameHandler_fn, _createCellsToLS, createCellsToLS_fn, _randomGameHandler, randomGameHandler_fn, _getRandomGame, getRandomGame_fn, _undisabledBtns, undisabledBtns_fn, _updateSizeGameField, updateSizeGameField_fn, _updateBtnsSizeContent, updateBtnsSizeContent_fn, _updateBtnsNameContent, updateBtnsNameContent_fn, _updateCurrentMatrix, updateCurrentMatrix_fn, _updateListNames, updateListNames_fn, _createDropListSizes, createDropListSizes_fn, _createDropListNames, createDropListNames_fn, _showSizesDropList, showSizesDropList_fn, _hiddenSizesDropList, hiddenSizesDropList_fn, _showDropListNames, showDropListNames_fn, _hiddenDropListNames, hiddenDropListNames_fn, _createHTML7, createHTML_fn7, _createHTML8, createHTML_fn8, _createHTML9, createHTML_fn9, _createHTML10, createHTML_fn10;
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
const AppEvent = {
  toggleSettingsSound: "toggleSettingsSound",
  toggleSoundBg: "toggleSoundBg",
  settingsClick: "settingsClick",
  soundBg: "soundBg"
};
const _Mediator = class _Mediator {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * @returns {Object} - Mediator class instance
   */
  static getInstance() {
    return __privateGet(_Mediator, _mediator);
  }
  /**
   * @param {string} nameEvent
   * @param {function} listener
   */
  subscribe(nameEvent, listener) {
    if (this.listeners.has(nameEvent)) {
      const listeners = this.listeners.get(nameEvent);
      listeners.push(listener);
    } else {
      const newListeners = [];
      newListeners.push(listener);
      this.listeners.set(nameEvent, newListeners);
    }
  }
  // unsubscribe(nameEvent, listener) {
  // }
  /**
   * @param {string} nameEvent
   * @param {string} params
   */
  notify(nameEvent, params) {
    const eventListeners = this.listeners.get(nameEvent);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(params));
    }
  }
};
_mediator = new WeakMap();
__privateAdd(_Mediator, _mediator, new _Mediator());
let Mediator = _Mediator;
const SOUND_ON_OFF = ["on", "off"];
const [soundOn, soundOff] = SOUND_ON_OFF;
const APP_THEME_NAMES = ["dark", "light"];
const [lightTheme, darkTheme] = APP_THEME_NAMES;
class SettingsAppView {
  constructor(winners) {
    __privateAdd(this, _toggleSoundBgClickHandler);
    __privateAdd(this, _toggleSettingsSoundForLS);
    __privateAdd(this, _toggleSettingsSoundClickHandler);
    /**
    * winners click handler
    */
    __privateAdd(this, _winnersClickHandler);
    /**
    * changes the current application theme click handler
    */
    __privateAdd(this, _toggleThemeHandler);
    /**
    * changes the current application theme from LS
    */
    __privateAdd(this, _toggleThemeAppFromLS);
    /**
    * create HTML settings
    */
    __privateAdd(this, _createHTML);
    this.winners = winners;
    this.soundOnOff = soundOn;
    this.soundBgOnOff = soundOn;
    this.theme = lightTheme;
    this.singletonMediator = Mediator.getInstance();
    __privateMethod(this, _createHTML, createHTML_fn).call(this);
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    if (!(LS == null ? void 0 : LS.theme)) {
      LS.theme = darkTheme;
      localStorage.setItem("kleostro", JSON.stringify(LS));
    }
    if (!LS.sound) {
      LS.sound = soundOn;
      localStorage.setItem("kleostro", JSON.stringify(LS));
    }
    __privateMethod(this, _toggleThemeAppFromLS, toggleThemeAppFromLS_fn).call(this);
    __privateMethod(this, _toggleSettingsSoundForLS, toggleSettingsSoundForLS_fn).call(this);
  }
  /**
  * get HTML settings
  * @returns {Element} HTML-Element settings
  */
  getHTML() {
    return this.settingsAppBox;
  }
}
_toggleSoundBgClickHandler = new WeakSet();
toggleSoundBgClickHandler_fn = function() {
  this.soundBgOnOff = this.soundBgOnOff === soundOff ? soundOn : soundOff;
  this.singletonMediator.notify(AppEvent.toggleSoundBg, this.soundBgOnOff);
  this.soundBgSettingsBtn.textContent = this.soundBgOnOff === soundOff ? soundOff : soundOn;
};
_toggleSettingsSoundForLS = new WeakSet();
toggleSettingsSoundForLS_fn = function() {
  const LS = JSON.parse(localStorage.getItem("kleostro"));
  this.soundOnOff = LS.sound;
  this.soundsSettingsBtn.textContent = this.soundOnOff === soundOn ? soundOff : soundOn;
};
_toggleSettingsSoundClickHandler = new WeakSet();
toggleSettingsSoundClickHandler_fn = function() {
  this.soundOnOff = this.soundOnOff === soundOn ? soundOff : soundOn;
  this.singletonMediator.notify(AppEvent.toggleSettingsSound, this.soundOnOff);
  this.soundsSettingsBtn.textContent = this.soundOnOff === soundOff ? soundOn : soundOff;
  const LS = JSON.parse(localStorage.getItem("kleostro"));
  LS.sound = this.soundOnOff;
  localStorage.setItem("kleostro", JSON.stringify(LS));
};
_winnersClickHandler = new WeakSet();
winnersClickHandler_fn = function() {
  this.winners.show();
};
_toggleThemeHandler = new WeakSet();
toggleThemeHandler_fn = function() {
  this.theme = this.theme === lightTheme ? darkTheme : lightTheme;
  this.themeBtn.textContent = this.theme;
  document.body.classList.toggle(darkTheme);
  document.body.classList.toggle(lightTheme);
  const LS = JSON.parse(localStorage.getItem("kleostro"));
  LS.theme = this.theme;
  localStorage.setItem("kleostro", JSON.stringify(LS));
};
_toggleThemeAppFromLS = new WeakSet();
toggleThemeAppFromLS_fn = function() {
  const LS = JSON.parse(localStorage.getItem("kleostro"));
  this.theme = LS.theme;
  this.themeBtn.textContent = this.theme;
  document.body.classList.toggle(this.theme === lightTheme ? darkTheme : lightTheme);
};
_createHTML = new WeakSet();
createHTML_fn = function() {
  this.settingsAppBox = new CreateElement({ classes: ["header__settings"] });
  this.soundBgSettingsBox = new CreateElement({ classes: ["header__settings-sounds-bg-box"] });
  this.soundBgSettingsText = new CreateElement({ tag: "span", classes: ["header__settings-sounds-bg-text"], textContent: "Background sound:" });
  this.soundBgSettingsBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__settings-sounds-bg-settings-btn"], textContent: soundOn });
  this.soundSettingsBox = new CreateElement({ classes: ["header__settings-sounds-box"] });
  this.soundSettingsText = new CreateElement({ tag: "span", classes: ["header__settings-sounds-text"], textContent: "Settings sound:" });
  this.soundsSettingsBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__settings-sounds-settings-btn"], textContent: soundOff });
  this.winnersBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__settings-winners-btn"], textContent: "Winners" });
  this.themeBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "header__settings-theme-btn"], textContent: lightTheme });
  this.soundBgSettingsBtn.addEventListener("click", () => {
    this.singletonMediator.notify(AppEvent.settingsClick);
    this.singletonMediator.notify(AppEvent.soundBg);
    this.singletonMediator.notify(AppEvent.toggleSoundBg);
    __privateMethod(this, _toggleSoundBgClickHandler, toggleSoundBgClickHandler_fn).apply(this);
  });
  this.soundsSettingsBtn.addEventListener("click", () => {
    __privateMethod(this, _toggleSettingsSoundClickHandler, toggleSettingsSoundClickHandler_fn).apply(this);
    this.singletonMediator.notify(AppEvent.settingsClick);
  });
  this.winnersBtn.addEventListener("click", () => {
    __privateMethod(this, _winnersClickHandler, winnersClickHandler_fn).call(this);
    this.singletonMediator.notify(AppEvent.settingsClick);
  });
  this.themeBtn.addEventListener("click", () => {
    __privateMethod(this, _toggleThemeHandler, toggleThemeHandler_fn).apply(this);
    this.singletonMediator.notify(AppEvent.settingsClick);
  });
  this.soundBgSettingsBox.append(this.soundBgSettingsText, this.soundBgSettingsBtn);
  this.soundSettingsBox.append(this.soundSettingsText, this.soundsSettingsBtn);
  this.settingsAppBox.append(
    this.soundBgSettingsBox,
    this.soundSettingsBox,
    this.winnersBtn,
    this.themeBtn
  );
};
class HeaderView {
  constructor(winners) {
    /**
    * create HTML header
    */
    __privateAdd(this, _createHTML2);
    this.settingsApp = new SettingsAppView(winners);
    this.winners = winners;
    __privateMethod(this, _createHTML2, createHTML_fn2).call(this);
  }
  /**
  * get HTML header
  * @returns {Element} HTML-Element header
  */
  getHTML() {
    return this.header;
  }
}
_createHTML2 = new WeakSet();
createHTML_fn2 = function() {
  this.header = new CreateElement({ tag: "header", classes: ["header"] });
  this.title = new CreateElement({ tag: "h1", classes: ["header__title"], textContent: "Nonograms" });
  this.headerContainer = new CreateElement({ tag: "div", classes: ["header__container", "container"] });
  this.burger = new CreateElement({ tag: "button", classes: ["btn-reset", "burger"] });
  this.burgerLineOne = new CreateElement({ tag: "span", classes: ["burger__line"] });
  this.burgerLineTwo = new CreateElement({ tag: "span", classes: ["burger__line"] });
  this.burgerLineThree = new CreateElement({ tag: "span", classes: ["burger__line"] });
  this.burger.addEventListener("click", () => {
    this.burger.classList.toggle("open");
    this.burger.previousSibling.classList.toggle("open");
    document.body.classList.toggle("stop-scroll");
  });
  this.burger.append(this.burgerLineOne, this.burgerLineTwo, this.burgerLineThree);
  this.headerContainer.append(this.title, this.settingsApp.getHTML(), this.burger);
  this.header.append(this.headerContainer);
};
const audio = "";
const winSound = "" + new URL("win-fa6a458c.mp3", import.meta.url).href;
const fieldSound = "data:audio/mpeg;base64,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uquBdea+1TkVpZZOKxxQaDKz4ZREZErnhhB9Jh5HWd19p79Jv55al1rcYpaOFLgyeCRpSoloUnJvv+T/7rPdyoNQAVZgQl882lnSUMOYQf/7UsQtAwlkyyJHmGXBMZgjyPMMaCQTd35SAnAYtQy1HQ5ZNkBkK2bhGPDBTikqscMgQ4opCIOjpD2zrHuIPIEAVoY0OqauYcAuxpX//6PyK66qACLIAIEk5C52tugXrBJciQVOHGQGjP5KTCwTR+GYZ1PB2zCgOGgmsuCscaQZFQEAlpcdc5xMO54wI0byK5JjHdj/7bVI+in+NRrMQofQ5EUDVgCXCMLNR0M1PlYE54q4KHRMpZdYCiEaCSDe0iit7GqUPJi1di1lmjcaBvYk//tSxD8CSUh3GMeEZkEVh2IE8Yhw6jRotewlVoRe3+4ugzYVaSEt8AfI4x5rENSW8WmIaCwbEzDySpJhULEoavpQ0OB+mQNrXZmaXuN9pPZBVSIO6jd0kq+laFXqSUfrlcAFgogWUkwKua4NDB5AZewHFnkX0UUqFFGHbX7zEmDgaa45N0Bom0k5ntWZiWtCAoyeAXteTLaliVjlumZFA47BV0s/FCNpBCcXMOkGoaokuNReWsUCoWOEg/mA/OPk2WUNYDRzJ11125SpVc9vXCv/+1LEVQNI3E8MJ4RLQR6F4MGHmAjUFHiYsLKkSKdkjvs+r5GW6SFZ1QaU8FYaUHRKxYwGtYwity3Hnkis6IolhosHZHgD5DWFvJIa6BQo6T+RSnZB6CakiJEo+LYso8+NzZo0UKDo6VDJWssUMDBhlyQWFWRVj6wqLP7ahZmoXZ+sUb+pvFhX+Kt//F1MQU1FMy45N1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UsRrg0lIWvoMMGDBIg3YhPMNaFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSxIADwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
const crossedSound = "data:audio/mpeg;base64,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6uB4u34/p/RKPx96xqPhPyimWoWdAIx9pfHNSd5YEzEKE6WCLWxsB85XIuRYwICc+1jcoGRkPZNCNvwwQFz4gmO8gg5YBCOcI4ApDdDCX//7UsQnABNdh5W4KAAZUhatM4YwActhlsZM+IUFkEQJIihHjhJUi5v/qJ9NN1M6CFBJ9q//jKEgmXCYJwvl8+gibG5Iz6M1J4olX//k+QRE3WpkU1JGhfLpkpFFJE1RQwVCIAACAAAC0jUpSwuoZwmY4UcBBD9BCmgYCPY2ZVVVhqUaxma8YMKbnFVVX2b5/l3ZqTCmBf1/wjvxm/4QSbMVlGxQt0YKKP+Gy7h2JI7zTjZoz//4tUAgBHBUVc1YalHQOs6cj488aMoZ6e0NYcmH//tSxA0ACgEpTsYMUeE6m2bNliFh14bMzGq6rRMbX6z6qpZa4Zqqr9VvY761sKJP1nV3USGeZTP/1RyAxPZ1YurdSlUMDE7WmZGRUBrhAGyq2NWcZQsJOwFCI6raCIxPhMFaToexCqzE6ucQH9DWaV5SyUaDr+eTVFXrmaYlIZnFSKbItbaYEFaZlX5X/v9YB60tSWzJnDZf0gCMfAAuN4aCdhh3Zpilq83ZQZV0t4uFStU67hX5lxe2gBNaRi37Nrc19f/BVCwGWMhh40WtVhn/+1LEG4IJVKcuzDEM6SuVJQ2WFZjho8fS21iBZrn865fu6yf3Ygu3iW42AAE2s27F2tIXJvtrqzBjLUWLPoYHTnsn2PZ6ATTUgxUZ0iJJEZlQmsqGlC3GMrSqPdlZCuYvKWYdICdyF3//0f//RT/5Np/+ugDCRtAAAykX7LoBcVOvJZbJ4H/rcrxqr/lirLmh89s2U/wQs9WCiPyYvXgKVWOR4RSmoIeIniJp+oOM7H9n+a9H6fTdbVr7TyXItuYLilJHGAAEhmLjBcbE5xDjhf/7UsQuggmkkyTsPGXBHAwk6YYgIGgAF1Pa2jEHqyQGhe7cY96Qas1NMp1gITkhYTDlJBBAucBZaYEeLGzBJxAA//1f/X9Xd6HdSPVVfkADWxs54vASRCCPq1VTQRc/EXzCTlVCAxWo/S6RIWLVlHHFTAWJrGKrdnT3yL/f2kfnXSP8WWEg1kqwVCTRYceep+8FUdZ1sStSCHiTQpjwyyOAo0UFCUXymqnxqngyaPLVmWqBqJSOoCgEFnBpnQwl/f6+zJbJJnRvaPO0eqPRERVn//tSxEIDSTRrHEwwoUEGh+BJgxgACUSjHuhJ5VVMQU1FMy45N1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1LEWgPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
const emptySound = "data:audio/mpeg;base64,//tQxAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAEEwBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgICAgICAgICAgICAgICAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD///////////////////////////////8AAAA5TEFNRTMuOTcgAaUAAAAALGoAABRAJAYbQgAAQAAABBNKziI+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UMQAAAmxUV4UAoABkCiyNwUAA/+T////Oc76EIc7///185znPIQhznkDgcFFDgcFCEIRjhwOChG1OHA4RlOc7zh8PgcPi6BwAwDD4uehA4Hw+Ln5A4Bw+5BAUDEQAgc5TAYDAYDAYDAYDAYDAQAQP4wTw4jz7edRLn8hpeN/8lCKKJMfv/HPJQyJ8bf/83LRFDIZUPyIH//lkOWDdlEXQc0Z0WeXf//xYgvaJ+D8wuEC8xTBqCrD5wR////lAcozqQ7NWpWXZnhjVmcZIAX/+1LEBIALpNth/IGACW6m6vwwj1FRzddZVkssaFa+OwxHGanGkOHasZeSqVMEev/9VT2PtXZvzO5Z/l1tcqomshtqVIVKMWN1llwJNCpfMoWvcndcoRGhRNEFYmnbOa9S39i+C8/zdv4r1EiBE0yWEpPkZsKinhuI5FbCYhR3MtB/4/SVVciWbVaW4TiOs/9bCq5mqapEcRmzLAKGpSk39/+HyrrcwjZTiDqUDGJNsSYrvN8+v35MEDtQc7dcl3UV95r/XRI2AA44G7FQz0iShv/7UsQGAEt1RT9imHcBRaWlIAMM+YrjBUWFWM9pnI60uPdgZKs1itfHNnM8TOTjf//55Z6lnOeSTbU9pwkNdXoluFUlUmdaueXGmf9VSVROqgmWFzFBWpGKASQKRrFWlQr2gr9YAAnM7OxISNp503N9VX/avP0F0jjQMBBljcNSZc1ja/GZmZsKJjaxlPqgIDAICDCgwqhRJd2FMBCqX/sexdL/aNt6r1WYMBeFpBQHCoiZIKmxAgoIHKCBhI5HcyZrP+yWGv8QSMiMDX/CRkIJ//tSxA2DyRjUrgGE1MAAADSAAAAEGxZRZRxZR8XGszxs0aUWW0nGnAYEBgYEWYeZYJizcXFTLuAhYXZwZCojDLpkWUxBTUUzLjk3VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
const settingsGameClick = "data:audio/mpeg;base64,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";
const bgSound = "" + new URL("bg-sound-2b874188.mp3", import.meta.url).href;
const SOUND_ON = "on";
class AudioModel {
  constructor() {
    __privateAdd(this, _createHTML3);
    this.soundOnOff = SOUND_ON;
    this.BgOnOff = SOUND_ON;
    __privateMethod(this, _createHTML3, createHTML_fn3).call(this);
    const singletonMediator = Mediator.getInstance();
    singletonMediator.subscribe(AppEvent.toggleSettingsSound, this.setSettingsSoundOnOff.bind(this));
    singletonMediator.subscribe(AppEvent.toggleSoundBg, this.setBgSoundOnOff.bind(this));
    singletonMediator.subscribe(AppEvent.settingsClick, this.playSettingsGameClick.bind(this));
    singletonMediator.subscribe(AppEvent.soundBg, this.playBgSound.bind(this));
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    if (LS.sound) {
      this.soundOnOff = LS.sound;
    }
  }
  getHTML() {
    return this.soundBox;
  }
  /**
   * @param {string} value
   */
  setSettingsSoundOnOff(value) {
    this.soundOnOff = value;
  }
  /**
  * @param {string} value
  */
  setBgSoundOnOff(value) {
    this.BgOnOff = value;
  }
  playField() {
    if (this.soundOnOff === SOUND_ON) {
      this.fieldSound.currentTime = 0;
      this.fieldSound.play();
    }
  }
  playCrossed() {
    if (this.soundOnOff === SOUND_ON) {
      this.crossedSound.currentTime = 0;
      this.crossedSound.play();
    }
  }
  playEmpty() {
    if (this.soundOnOff === SOUND_ON) {
      this.emptySound.currentTime = 0;
      this.emptySound.play();
    }
  }
  playModal() {
    if (this.soundOnOff === SOUND_ON) {
      this.winSound.currentTime = 0;
      this.winSound.play();
    }
  }
  playSettingsGameClick() {
    if (this.soundOnOff === SOUND_ON) {
      this.settingsGameSound.currentTime = 0;
      this.settingsGameSound.play();
    }
  }
  playBgSound() {
    if (this.BgOnOff === SOUND_ON) {
      this.bgSound.play();
    } else {
      this.bgSound.pause();
    }
  }
}
_createHTML3 = new WeakSet();
createHTML_fn3 = function() {
  this.soundBox = new CreateElement({ classes: ["sound-box", "visually-hidden"] });
  this.fieldSound = new CreateElement({ tag: "audio", attrs: { src: fieldSound } });
  this.crossedSound = new CreateElement({ tag: "audio", attrs: { src: crossedSound } });
  this.emptySound = new CreateElement({ tag: "audio", attrs: { src: emptySound } });
  this.winSound = new CreateElement({ tag: "audio", attrs: { src: winSound } });
  this.settingsGameSound = new CreateElement({ tag: "audio", attrs: { src: settingsGameClick } });
  this.bgSound = new CreateElement({ tag: "audio", attrs: { src: bgSound, loop: "" } });
  this.soundBox.append(
    this.winSound,
    this.fieldSound,
    this.crossedSound,
    this.emptySound,
    this.settingsGameSound,
    this.bgSound
  );
};
const cellView = "";
class CellView {
  constructor(cellValue, audio2, state = "empty") {
    /**
     * sets the field class to a cell
     * @param {event} event - event
     */
    __privateAdd(this, _setField);
    /**
     * sets the field class to a cell
     */
    __privateAdd(this, _getField);
    /**
     * sets the crossed class to a cell
     * @param {event} event - event
     */
    __privateAdd(this, _setCrossed);
    /**
     * sets the crossed class to a cell
     */
    __privateAdd(this, _getCrossed);
    /**
     * removes the field and crossed classes on a cell
     * @param {event} event - event
     */
    __privateAdd(this, _setEmpty);
    /**
    * create HTML cell
    */
    __privateAdd(this, _createHTML4);
    this.audio = audio2;
    this.cellValue = cellValue;
    this.state = state;
    __privateMethod(this, _createHTML4, createHTML_fn4).call(this);
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
}
_setField = new WeakSet();
setField_fn = function(event) {
  this.audio.playField();
  this.state = "field";
  event.target.classList.add("field");
};
_getField = new WeakSet();
getField_fn = function() {
  if (this.state === "field") {
    this.cell.classList.add("field");
  }
};
_setCrossed = new WeakSet();
setCrossed_fn = function(event) {
  this.audio.playCrossed();
  this.state = "crossed";
  event.target.classList.remove("field");
  event.target.classList.add("crossed");
};
_getCrossed = new WeakSet();
getCrossed_fn = function() {
  if (this.state === "crossed") {
    this.cell.classList.remove("field");
    this.cell.classList.add("crossed");
  }
};
_setEmpty = new WeakSet();
setEmpty_fn = function(event) {
  this.audio.playEmpty();
  this.state = "empty";
  event.target.classList.remove("field", "crossed");
};
_createHTML4 = new WeakSet();
createHTML_fn4 = function() {
  this.cell = new CreateElement({ classes: ["cell"] });
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
const [firstGame] = data;
class GameFieldView {
  constructor(modal, timer, winners, audio2) {
    /**
    * removes cell and row highlighting
    */
    __privateAdd(this, _removeHighlightCells);
    /**
    * adds cell and row highlighting
    * @param {target} - current cell
    */
    __privateAdd(this, _highlightCurrentColumnAndRow);
    /**
    * fills the array of cells with field
    */
    __privateAdd(this, _cellHasClicked);
    /**
    * checks the outcome of the game
    * @param {number[][]} cellValues - two-dimensional array of current cell values
    * @param {number[][]} matrix - two-dimensional array of the original matrix
    */
    __privateAdd(this, _isWin);
    /**
    * create HTML gameField
    */
    __privateAdd(this, _createHTML5);
    this.modal = modal;
    this.timer = timer;
    this.winners = winners;
    this.audio = audio2;
    this.currentNonogramObj = firstGame;
    this.originalMatrix = this.currentNonogramObj.matrix;
    this.originalTitle = this.currentNonogramObj.title;
    this.originalSize = this.currentNonogramObj.size;
    this.cellElements = [];
    this.cellValues = [];
    this.isLockPlayground = false;
    this.isShowSolution = false;
    this.isEndGame = false;
    __privateMethod(this, _createHTML5, createHTML_fn5).call(this);
    this.startGame(this.currentNonogramObj);
    this.playground.addEventListener("click", () => {
      if (!this.timer.isStart) {
        this.timer.startTimer();
      }
      __privateMethod(this, _cellHasClicked, cellHasClicked_fn).call(this);
      __privateMethod(this, _isWin, isWin_fn).call(this, this.cellValues, this.originalMatrix);
    });
    this.playground.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (!this.timer.isStart) {
        this.timer.startTimer();
      }
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
    this.playground.innerHTML = "";
    for (let row = 0; row < matrix.length; row += 1) {
      const rowElem = new CreateElement({ classes: ["playground__row"], attrs: { "data-row": row } });
      this.cellElements[row] = [];
      for (let column = 0; column < matrix[0].length; column += 1) {
        const cell = new CellView(matrix[row][column], this.audio);
        const cellElem = cell.getHTML();
        cellElem.setAttribute("data-cell", column);
        rowElem.append(cellElem);
        this.cellElements[row][column] = cell;
      }
      this.playground.append(rowElem);
    }
  }
  /**
   * start game
   * @param {object} nonogramObj - object for the current game
   */
  startGame(nonogramObj) {
    this.originalMatrix = nonogramObj.matrix;
    this.originalTitle = nonogramObj.title;
    this.originalSize = nonogramObj.size;
    switch (this.originalSize) {
      case "5x5": {
        this.gameField.classList.remove("medium", "large");
        this.gameField.classList.add("small");
        break;
      }
      case "10x10": {
        this.gameField.classList.remove("small", "large");
        this.gameField.classList.add("medium");
        break;
      }
      case "15x15": {
        this.gameField.classList.remove("small", "medium");
        this.gameField.classList.add("large");
        break;
      }
    }
    this.cellElements.length = 0;
    this.cellValues.length = 0;
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
  /**
  * changes the locking of the playground
  */
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
  const rowIndex = Number(currentTarget.parentNode.getAttribute("data-row"));
  const cellIndex = Number(currentTarget.getAttribute("data-cell"));
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
    this.lockPlayground();
    this.isEndGame = true;
    this.winners.addWinner(this.originalTitle, this.originalSize, this.timer.getTime());
    this.audio.playModal();
  }
};
_createHTML5 = new WeakSet();
createHTML_fn5 = function() {
  this.gameFieldSection = new CreateElement({ tag: "section", classes: ["game"] });
  this.gameFieldContainer = new CreateElement({ classes: ["container", "game__container"] });
  this.gameField = new CreateElement({ classes: ["game__field"] });
  this.playground = new CreateElement({ classes: ["playground"] });
  this.leftHintsBox = new CreateElement({ classes: ["left-hints"] });
  this.topHintsBox = new CreateElement({ classes: ["top-hints"] });
  this.gameField.append(
    this.playground,
    this.leftHintsBox,
    this.topHintsBox,
    this.timer.getHTML()
  );
  this.gameFieldContainer.append(this.gameField);
  this.gameFieldSection.append(this.gameFieldContainer);
};
const modalView = "";
class ModalView {
  constructor() {
    /**
    * create HTML modal
    */
    __privateAdd(this, _createHTML6);
    this.message = null;
    this.name = null;
    this.time = null;
    __privateMethod(this, _createHTML6, createHTML_fn6).call(this);
    this.closeBtn.addEventListener("click", () => this.show(this.message, this.name, this.time));
    this.overlay.addEventListener("click", ({ target }) => {
      if (target === this.overlay) {
        this.show(this.message, this.name, this.time);
      }
    });
  }
  /**
  * get HTML modal
  * @returns {Element} HTML-Element modal
  */
  getHTML() {
    return this.modalBox;
  }
  /**
  * show modal
  * @param {string} message - modal message
  * @param {string} name - modal name
  * @param {number} time - modal time
  */
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
_createHTML6 = new WeakSet();
createHTML_fn6 = function() {
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
const MAX_LETTERS_IN_SUBTITLE = 10;
class SettingsGameView {
  constructor(gameField, timer, audio2) {
    /**
     * start current game
     */
    __privateAdd(this, _startGameHandler);
    /**
     * show solution current game
     * @param {number[][]} matrix - matrix for the current game
     * @param {Element[][]} cellElements - matrix for the current cell elements
     */
    __privateAdd(this, _showSolutionHandler);
    /**
     * clears the current gameField
     */
    __privateAdd(this, _resetGameHandler);
    /**
     * save state the current game
     */
    __privateAdd(this, _saveGameHandler);
    /**
     * runs the last saved game
     */
    __privateAdd(this, _continueGameHandler);
    /**
     * create save game cells
     * @param {object[][]} savedCells - two-dimensional array of cell objects
     */
    __privateAdd(this, _createCellsToLS);
    /**
     * runs the random game
     */
    __privateAdd(this, _randomGameHandler);
    /**
     * get random game data
     * @returns {object} - random game data
     */
    __privateAdd(this, _getRandomGame);
    /**
     * unlock the buttons
     * @param {object} - object btns
     */
    __privateAdd(this, _undisabledBtns);
    __privateAdd(this, _updateSizeGameField);
    __privateAdd(this, _updateBtnsSizeContent);
    __privateAdd(this, _updateBtnsNameContent);
    /**
     * find the current matrix by name
     * @returns {object} - current matrix
     */
    __privateAdd(this, _updateCurrentMatrix);
    /**
     * update the list of current titles
     */
    __privateAdd(this, _updateListNames);
    /**
     * create list sizes
     */
    __privateAdd(this, _createDropListSizes);
    /**
     * create list names
     */
    __privateAdd(this, _createDropListNames);
    __privateAdd(this, _showSizesDropList);
    __privateAdd(this, _hiddenSizesDropList);
    __privateAdd(this, _showDropListNames);
    __privateAdd(this, _hiddenDropListNames);
    /**
    * create HTML settings game
    */
    // eslint-disable-next-line max-lines-per-function
    __privateAdd(this, _createHTML7);
    this.gameField = gameField;
    this.timer = timer;
    this.audio = audio2;
    this.sizeBtnsArr = [];
    this.nameBtnsArr = [];
    this.currentName = null;
    this.newOriginalData = null;
    this.isLockListSizes = false;
    this.isLockListNames = false;
    __privateMethod(this, _createHTML7, createHTML_fn7).call(this);
    this.sizeBtnsArr.forEach((btn) => btn.addEventListener("click", ({ target }) => __privateMethod(this, _updateBtnsSizeContent, updateBtnsSizeContent_fn).call(this, target)));
    this.nameBtnsArr.forEach((btn) => btn.addEventListener("click", ({ target }) => __privateMethod(this, _updateBtnsNameContent, updateBtnsNameContent_fn).call(this, target)));
    const LS = JSON.parse(localStorage.getItem("kleostro"));
    if (!LS["current-game"]) {
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
}
_startGameHandler = new WeakSet();
startGameHandler_fn = function() {
  this.audio.playSettingsGameClick();
  this.newOriginalData = __privateMethod(this, _updateCurrentMatrix, updateCurrentMatrix_fn).call(this);
  this.gameField.startGame(this.newOriginalData);
  this.showSolutionBtn.disabled = false;
  this.isShowSolution = false;
  this.settingsSizeSubtitle.textContent = this.newOriginalData.size;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  this.sizeBtnsArr.forEach((btn) => {
    const currentBtn = btn;
    if (this.settingsSizeSubtitle.textContent === btn.textContent) {
      currentBtn.disabled = true;
    }
  });
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  this.settingsNameSubtitle.textContent = this.newOriginalData.title;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  this.nameBtnsArr.forEach((btn) => {
    const currentBtn = btn;
    if (this.settingsNameSubtitle.textContent === btn.textContent) {
      currentBtn.disabled = true;
    }
  });
};
_showSolutionHandler = new WeakSet();
showSolutionHandler_fn = function(matrix, cellElements) {
  this.audio.playSettingsGameClick();
  matrix.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      cellElements[rowIndex][columnIndex].cell.classList.remove("field", "crossed");
      if (cellElements[rowIndex][columnIndex].cellValue === 1 && !this.isShowSolution) {
        cellElements[rowIndex][columnIndex].cell.classList.add("field");
      }
    });
  });
};
_resetGameHandler = new WeakSet();
resetGameHandler_fn = function() {
  this.audio.playSettingsGameClick();
  this.gameField.cellElements.forEach((row) => {
    row.forEach((cell) => {
      const currentCell = cell;
      currentCell.cell.classList.remove("field", "crossed");
      currentCell.state = "empty";
    });
  });
};
_saveGameHandler = new WeakSet();
saveGameHandler_fn = function() {
  this.audio.playSettingsGameClick();
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
  this.audio.playSettingsGameClick();
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
  __privateMethod(this, _updateSizeGameField, updateSizeGameField_fn).call(this);
  this.settingsSizeSubtitle.textContent = JSON.parse(LS["current-game"]).originalSize;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  this.sizeBtnsArr.forEach((btn) => {
    const currentBtn = btn;
    if (this.settingsSizeSubtitle.textContent === btn.textContent) {
      currentBtn.disabled = true;
    }
  });
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  this.settingsNameSubtitle.textContent = JSON.parse(LS["current-game"]).originalTitle;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  this.nameBtnsArr.forEach((btn) => {
    const currentBtn = btn;
    if (this.settingsNameSubtitle.textContent === btn.textContent) {
      currentBtn.disabled = true;
    }
  });
  this.timer.stopTimer();
  this.timer.currentTime = +JSON.parse(LS["current-time"]);
};
_createCellsToLS = new WeakSet();
createCellsToLS_fn = function(savedCells) {
  if (savedCells) {
    this.gameField.cellElements = [];
    this.gameField.cellValues = [];
    this.gameField.playground.innerHTML = "";
    for (let row = 0; row < savedCells.length; row += 1) {
      const rowElem = new CreateElement({ classes: ["playground__row"], attrs: { "data-row": row } });
      this.gameField.cellElements[row] = [];
      this.gameField.cellValues[row] = [];
      for (let column = 0; column < savedCells[0].length; column += 1) {
        const cellParse = JSON.parse(savedCells[row][column]);
        const cell = new CellView(cellParse.cellValue, this.audio, cellParse.state);
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
_randomGameHandler = new WeakSet();
randomGameHandler_fn = function() {
  this.audio.playSettingsGameClick();
  const { matrix, title, size } = __privateMethod(this, _getRandomGame, getRandomGame_fn).call(this);
  this.settingsSizeSubtitle.textContent = size;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  this.sizeBtnsArr.forEach((btn) => {
    const currentBtn = btn;
    if (this.settingsSizeSubtitle.textContent === btn.textContent) {
      currentBtn.disabled = true;
    }
  });
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
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
};
_getRandomGame = new WeakSet();
getRandomGame_fn = function() {
  this.randomIndex = Math.floor(Math.random() * data.length);
  return data[this.randomIndex];
};
_undisabledBtns = new WeakSet();
undisabledBtns_fn = function(btnsArr) {
  btnsArr.forEach((btn) => {
    this.currentBtn = btn;
    this.currentBtn.disabled = false;
  });
};
_updateSizeGameField = new WeakSet();
updateSizeGameField_fn = function() {
  switch (this.gameField.originalSize) {
    case "5x5": {
      this.gameField.gameField.classList.remove("medium", "large");
      this.gameField.gameField.classList.add("small");
      break;
    }
    case "10x10": {
      this.gameField.gameField.classList.remove("small", "large");
      this.gameField.gameField.classList.add("medium");
      break;
    }
    case "15x15": {
      this.gameField.gameField.classList.remove("small", "medium");
      this.gameField.gameField.classList.add("large");
      break;
    }
  }
};
_updateBtnsSizeContent = new WeakSet();
updateBtnsSizeContent_fn = function(target) {
  const currentBtn = target;
  this.audio.playSettingsGameClick();
  this.startGameBtn.disabled = false;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.sizeBtnsArr);
  currentBtn.disabled = true;
  this.settingsSizeSubtitle.textContent = target.textContent;
  __privateMethod(this, _updateListNames, updateListNames_fn).call(this);
  this.currentName = this.settingsNameSubtitle.textContent;
  this.newOriginalData = __privateMethod(this, _updateCurrentMatrix, updateCurrentMatrix_fn).call(this);
};
_updateBtnsNameContent = new WeakSet();
updateBtnsNameContent_fn = function(target) {
  const currentBtn = target;
  this.audio.playSettingsGameClick();
  this.startGameBtn.disabled = false;
  __privateMethod(this, _undisabledBtns, undisabledBtns_fn).call(this, this.nameBtnsArr);
  currentBtn.disabled = true;
  this.currentName = target.textContent;
  if (target.textContent.length > MAX_LETTERS_IN_SUBTITLE) {
    const formattedSubtitle = target.textContent.slice(0, MAX_LETTERS_IN_SUBTITLE);
    this.settingsNameSubtitle.textContent = `${formattedSubtitle}...`;
  } else {
    this.settingsNameSubtitle.textContent = target.textContent;
  }
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
  const dropList = new CreateElement({ tag: "ul", classes: ["size__drop", "list-reset", "hidden"] });
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
  const [firstElement] = uniqueDataArr;
  this.settingsSizeSubtitle.textContent = firstElement;
  return dropList;
};
_createDropListNames = new WeakSet();
createDropListNames_fn = function() {
  const filteredData = data.filter((item) => item.size === this.settingsSizeSubtitle.textContent);
  const dropList = new CreateElement({ tag: "ul", classes: ["name__drop", "list-reset", "hidden"] });
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
  const [firstElement] = filteredData;
  this.settingsNameSubtitle.textContent = firstElement.title;
  return dropList;
};
_showSizesDropList = new WeakSet();
showSizesDropList_fn = function() {
  this.settingsSizeTop.classList.add("active");
  this.settingsSizeDrop.classList.remove("hidden");
};
_hiddenSizesDropList = new WeakSet();
hiddenSizesDropList_fn = function() {
  this.settingsSizeTop.classList.remove("active");
  this.settingsSizeDrop.classList.add("hidden");
};
_showDropListNames = new WeakSet();
showDropListNames_fn = function() {
  this.settingsNameTop.classList.add("active");
  this.settingsNameDrop.classList.remove("hidden");
};
_hiddenDropListNames = new WeakSet();
hiddenDropListNames_fn = function() {
  this.settingsNameTop.classList.remove("active");
  this.settingsNameDrop.classList.add("hidden");
};
_createHTML7 = new WeakSet();
createHTML_fn7 = function() {
  this.settings = new CreateElement({ classes: ["game__settings"] });
  this.settingsContainer = new CreateElement({ classes: ["game__settings-container"] });
  this.settingsSizeBox = new CreateElement({ classes: ["size"] });
  this.settingsSizeTop = new CreateElement({ classes: ["size__top"] });
  this.settingsSizeTitle = new CreateElement({ tag: "h3", classes: ["size__title"], textContent: "Size: " });
  this.settingsSizeSubtitle = new CreateElement({ tag: "span", classes: ["size__subtitle"] });
  this.settingsSizeDrop = __privateMethod(this, _createDropListSizes, createDropListSizes_fn).call(this);
  this.settingsNameBox = new CreateElement({ classes: ["name"] });
  this.settingsNameTop = new CreateElement({ classes: ["name__top"] });
  this.settingsNameTitle = new CreateElement({ tag: "h3", classes: ["name__title"], textContent: "Selected: " });
  this.settingsNameSubtitle = new CreateElement({ tag: "span", classes: ["name__subtitle"] });
  this.settingsNameDrop = __privateMethod(this, _createDropListNames, createDropListNames_fn).call(this);
  this.startGameBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "start-game"], textContent: "Play" });
  this.showSolutionBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "show-solution"], textContent: "Show Solution" });
  this.resetGameBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "reset-game"], textContent: "Reset" });
  this.saveGameBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "save-game"], textContent: "Save game" });
  this.continueGameBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "continue-game"], textContent: "Continue last game" });
  this.randomGameBtn = new CreateElement({ tag: "button", classes: ["btn-reset", "random-game"], textContent: "Random game" });
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
    this.settingsNameBox
  );
  this.settings.append(this.settingsContainer);
  this.gameField.gameFieldContainer.append(this.settings);
  document.addEventListener("click", ({ target }) => {
    if (this.settingsSizeTop.classList.contains("active") && !this.settingsSizeBox.contains(target) && !this.settingsNameBox.contains(target)) {
      this.isLockListSizes = !this.isLockListSizes;
      __privateMethod(this, _hiddenSizesDropList, hiddenSizesDropList_fn).call(this);
    }
    if (this.settingsNameTop.classList.contains("active") && !this.settingsNameBox.contains(target) && !this.settingsSizeBox.contains(target)) {
      this.isLockListNames = !this.isLockListNames;
      __privateMethod(this, _hiddenDropListNames, hiddenDropListNames_fn).call(this);
    }
  });
  this.settingsSizeTop.addEventListener("mouseover", () => {
    if (!this.isLockListSizes) {
      __privateMethod(this, _showSizesDropList, showSizesDropList_fn).call(this);
    }
  });
  this.settingsSizeBox.addEventListener("mouseleave", () => {
    if (!this.isLockListSizes) {
      __privateMethod(this, _hiddenSizesDropList, hiddenSizesDropList_fn).call(this);
    }
  });
  this.settingsSizeTop.addEventListener("click", () => {
    this.audio.playSettingsGameClick();
    this.isLockListSizes = !this.isLockListSizes;
  });
  this.settingsNameTop.addEventListener("mouseover", () => {
    if (!this.isLockListNames) {
      __privateMethod(this, _showDropListNames, showDropListNames_fn).call(this);
    }
  });
  this.settingsNameBox.addEventListener("mouseleave", () => {
    if (!this.isLockListNames) {
      __privateMethod(this, _hiddenDropListNames, hiddenDropListNames_fn).call(this);
    }
  });
  this.settingsNameTop.addEventListener("click", () => {
    this.audio.playSettingsGameClick();
    this.isLockListNames = !this.isLockListNames;
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
      __privateMethod(this, _continueGameHandler, continueGameHandler_fn).apply(this);
    } else {
      this.continueGameBtn.disabled = true;
    }
    const { formattedMin, formattedSec } = this.timer.formattedTime();
    this.timer.timer.textContent = `${formattedMin}:${formattedSec}`;
  });
  this.randomGameBtn.addEventListener("click", __privateMethod(this, _randomGameHandler, randomGameHandler_fn).bind(this));
};
const timerView = "";
const TIMER_INTERVAL = 1e3;
const MAX_MS_IN_SEC$1 = 60;
const MAX_SEC_IN_MIN$1 = 60;
class TimerView {
  constructor() {
    /**
    * create HTML timer
    */
    __privateAdd(this, _createHTML8);
    this.intervalID = null;
    this.currentTime = 0;
    this.isStart = false;
    __privateMethod(this, _createHTML8, createHTML_fn8).call(this);
  }
  /**
  * get HTML timer
  * @returns {Element} HTML-Element timer
  */
  getHTML() {
    return this.timer;
  }
  /**
  * start timer
  * @returns {number} - ID timer
  */
  startTimer() {
    this.isStart = true;
    this.intervalID = setInterval(() => {
      this.currentTime += 1;
      const { formattedMin, formattedSec } = this.formattedTime();
      this.timer.textContent = `${formattedMin}:${formattedSec}`;
    }, TIMER_INTERVAL);
    return this.intervalID;
  }
  /**
  * stop timer
  */
  stopTimer() {
    clearInterval(this.intervalID);
    this.isStart = false;
  }
  /**
  * get current time
  * @returns {number} - current time
  */
  getTime() {
    return this.currentTime;
  }
  /**
  * formatted time
  * @returns {object} - formatted time
  */
  formattedTime() {
    const formattedMin = Math.floor(this.currentTime / MAX_SEC_IN_MIN$1).toString().padStart(2, "0");
    const formattedSec = (this.currentTime % MAX_MS_IN_SEC$1).toString().padStart(2, "0");
    return { formattedMin, formattedSec };
  }
}
_createHTML8 = new WeakSet();
createHTML_fn8 = function() {
  this.timer = new CreateElement({ tag: "span", classes: ["timer"], textContent: "00:00" });
};
const winnersView = "";
const MAX_MS_IN_SEC = 60;
const MAX_SEC_IN_MIN = 60;
const MAX_WINNERS = 5;
class WinnersView {
  constructor() {
    __privateAdd(this, _createHTML9);
    __privateMethod(this, _createHTML9, createHTML_fn9).call(this);
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
    this.LS = JSON.parse(localStorage.getItem("kleostro"));
    return this.LS.winners.sort((a, b) => a.time - b.time);
  }
  show() {
    this.winnersList.innerHTML = "";
    this.winnersBox.classList.toggle("hidden");
    this.overlay.classList.toggle("hidden");
    this.content.classList.toggle("hidden");
    document.body.classList.toggle("stop-scroll");
    const sortedListWinners = this.sortWinners();
    if (sortedListWinners.length === 0) {
      this.winnersList.textContent = "List is empty...";
      return;
    }
    const listIndex = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "№" });
    const listTitle = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Name" });
    const listSize = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Size" });
    const listTime = new CreateElement({ tag: "li", classes: ["winners-modal__list-header"], textContent: "Time" });
    this.winnersList.append(listIndex, listTitle, listSize, listTime);
    sortedListWinners.forEach((winner, index) => {
      const formattedMin = Math.floor(winner.time / MAX_SEC_IN_MIN).toString().padStart(2, "0");
      const formattedSec = (winner.time % MAX_MS_IN_SEC).toString().padStart(2, "0");
      const currentIndex = index + 1;
      const listItem = new CreateElement({ tag: "li", classes: ["winners-modal__list-item"] });
      const winnerIndex = new CreateElement({ tag: "span", classes: ["winners-modal__list-index"], textContent: currentIndex });
      const winnerTitle = new CreateElement({ tag: "span", classes: ["winners-modal__list-title"], textContent: winner.title });
      const winnerSize = new CreateElement({ tag: "span", classes: ["winners-modal__list-size"], textContent: winner.size });
      const winnerTime = new CreateElement({ tag: "span", classes: ["winners-modal__list-time"], textContent: `${formattedMin}:${formattedSec}` });
      listItem.append(winnerIndex, winnerTitle, winnerSize, winnerTime);
      this.winnersList.append(listItem);
    });
  }
}
_createHTML9 = new WeakSet();
createHTML_fn9 = function() {
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
  constructor(mediator) {
    /**
    * create HTML main
    */
    __privateAdd(this, _createHTML10);
    this.mediator = mediator;
    __privateMethod(this, _createHTML10, createHTML_fn10).call(this);
  }
  /**
  * get HTML main
  * @returns {Element} HTML-Element main
  */
  getHTML() {
    return this.main;
  }
}
_createHTML10 = new WeakSet();
createHTML_fn10 = function() {
  this.main = new CreateElement({ tag: "main", classes: ["main"] });
  this.audio = new AudioModel();
  this.modal = new ModalView();
  this.timer = new TimerView();
  this.winners = new WinnersView();
  this.gameField = new GameFieldView(this.modal, this.timer, this.winners, this.audio);
  this.settingsBox = new SettingsGameView(this.gameField, this.timer, this.audio);
  this.main.append(
    this.gameField.getHTML(),
    this.modal.getHTML(),
    this.winners.getHTML(),
    this.audio.getHTML()
  );
};
class App {
  constructor() {
    if (!localStorage.getItem("kleostro")) {
      localStorage.setItem("kleostro", JSON.stringify({}));
    }
    this.mediator = new Mediator();
    this.main = new MainView();
    this.header = new HeaderView(this.main.winners);
    document.body.prepend(
      this.header.getHTML(),
      this.main.getHTML()
    );
  }
}
new App();
//# sourceMappingURL=main-8defde36.js.map
