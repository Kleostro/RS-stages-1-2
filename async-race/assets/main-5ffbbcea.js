var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
const TAG_NAMES = {
  MAIN: "main",
  HEADER: "header",
  FOOTER: "footer",
  NAV: "nav",
  SECTION: "section",
  ARTICLE: "article",
  ASIDE: "aside",
  BUTTON: "button",
  FORM: "form",
  INPUT: "input",
  LABEL: "label",
  SELECT: "select",
  TEXTAREA: "textarea",
  SPAN: "span",
  DIV: "div",
  SVG: "svg",
  I: "i",
  P: "p",
  UL: "ul",
  OL: "ol",
  LI: "li",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  IMG: "img",
  VIDEO: "video",
  AUDIO: "audio",
  SOURCE: "source",
  TRACK: "track",
  CANVAS: "canvas",
  MAP: "map",
  MARK: "mark",
  DETAILS: "details",
  SUMMARY: "summary",
  PRE: "pre",
  BLOCKQUOTE: "blockquote",
  ADDRESS: "address",
  DIVIDER: "hr"
};
const EVENT_NAMES = {
  CLICK: "click",
  CHANGE: "change",
  INPUT: "input",
  SUBMIT: "submit",
  KEYUP: "keyup",
  KEYDOWN: "keydown",
  SCROLL: "scroll",
  RESIZE: "resize",
  FOCUS: "focus",
  BLUR: "blur",
  CONTEXTMENU: "contextmenu",
  DOM_CONTENT_LOADED: "DOMContentLoaded",
  LOAD: "load",
  ERROR: "error",
  ANIMATIONSTART: "animationstart",
  ANIMATIONEND: "animationend",
  ANIMATIONITERATION: "animationiteration",
  TRANSITIONEND: "transitionend",
  POPSTATE: "popstate",
  HASHCHANGE: "hashchange",
  BEFOREUNLOAD: "beforeunload"
};
const IS_DISABLED = {
  DISABLED: true,
  ENABLED: false
};
const PAGES_IDS = {
  DEFAULT_PAGE: "",
  GARAGE_PAGE: "garage",
  WINNERS_PAGE: "winners"
};
const _RouterModel = class _RouterModel {
  constructor() {
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname.split("/").slice(_RouterModel.pathSegmentsToKeep + 1).join("/");
      _RouterModel.navigateTo(currentPath);
    });
    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      _RouterModel.handleRequest(window.location.pathname);
    });
  }
  static setPages(pages) {
    _RouterModel.pages = pages;
  }
  static navigateTo(route) {
    this.handleRequest(route);
    const pathnameApp = window.location.pathname.split("/").slice(1, this.pathSegmentsToKeep + 1).join("/");
    window.history.pushState({}, "", `/${pathnameApp}/${route}`);
  }
  static handleRequest(path) {
    var _a, _b;
    const pathParts = path.split("/");
    const hasRoute = _RouterModel.pages.has(pathParts[0]);
    if (!hasRoute) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
      return;
    }
    (_a = _RouterModel.currentPage) == null ? void 0 : _a.hide();
    _RouterModel.currentPage = _RouterModel.pages.get(path);
    (_b = _RouterModel.currentPage) == null ? void 0 : _b.show();
  }
};
__publicField(_RouterModel, "pages");
__publicField(_RouterModel, "currentPage");
__publicField(_RouterModel, "pathSegmentsToKeep", 2);
let RouterModel = _RouterModel;
const createBaseElement = ({
  tag,
  cssClasses = [],
  attributes = {},
  innerContent = ""
}) => {
  const elem = document.createElement(tag);
  elem.classList.add(...cssClasses);
  Object.entries(attributes).forEach(([attrName, attrValue]) => {
    elem.setAttribute(attrName, attrValue);
  });
  elem.innerHTML = innerContent;
  return elem;
};
const APP_STYLES = {};
class AppView {
  constructor() {
    __publicField(this, "pagesContainer");
    this.pagesContainer = this.createHTML();
  }
  getHTML() {
    return this.pagesContainer;
  }
  createHTML() {
    this.pagesContainer = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [APP_STYLES["site-wrapper"]]
    });
    return this.pagesContainer;
  }
}
const INITIAL_DATA = {
  currentCars: [],
  currentWinners: []
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case "getCurrentCars":
      return {
        ...state,
        currentCars: [...state.currentCars, ...action.payload]
      };
    case "getCurrentWinners":
      return {
        ...state,
        currentWinners: [...state.currentWinners, ...action.payload]
      };
    default:
      return state;
  }
};
const _StoreModel = class _StoreModel {
  static dispatch(action) {
    _StoreModel.state = _StoreModel.rootReducer(_StoreModel.state, action);
    _StoreModel.listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  static getState() {
    return structuredClone(_StoreModel.state);
  }
  static subscribe(listener) {
    _StoreModel.listeners.add(listener);
    return () => {
      _StoreModel.listeners.delete(listener);
    };
  }
};
__publicField(_StoreModel, "listeners", /* @__PURE__ */ new Set());
__publicField(_StoreModel, "rootReducer", rootReducer);
__publicField(_StoreModel, "state", INITIAL_DATA);
let StoreModel = _StoreModel;
const GARAGE_PAGE_STYLES = {
  "garage-page": "_garage-page_13l4w_1",
  "garage-page_list": "_garage-page_list_13l4w_5",
  "garage-page--hidden": "_garage-page--hidden_13l4w_10"
};
class GaragePageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "garageTitle");
    __publicField(this, "raceTracksList");
    __publicField(this, "page");
    this.parent = parent;
    this.garageTitle = this.createGarageTitle();
    this.raceTracksList = this.createRaceTracksList();
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  getGarageTitle() {
    return this.garageTitle;
  }
  getRaceTracksList() {
    return this.raceTracksList;
  }
  createGarageTitle() {
    this.garageTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [GARAGE_PAGE_STYLES.title]
    });
    return this.garageTitle;
  }
  createRaceTracksList() {
    this.raceTracksList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_list"]]
    });
    return this.raceTracksList;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES.page]
    });
    const garageBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["bottom-wrapper"]]
    });
    garageBottomWrapper.append(this.garageTitle, this.raceTracksList);
    this.page.append(garageBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};
const QUERY_PARAMS = {
  PAGE: "_page",
  LIMIT: "_limit",
  SORT: "_sort",
  ORDER: "_order",
  ID: "id",
  STATUS: "status"
};
const QUERY_VALUES = {
  ASC: "asc",
  DESC: "desc",
  WINS: "wins",
  TIME: "time",
  ID: "id",
  DEFAULT_PAGE: 1,
  DEFAULT_CARS_LIMIT: 7,
  DEFAULT_WINNERS_LIMIT: 10
};
const API_URLS = {
  CARS: "http://127.0.0.1:3000/garage/",
  WINNERS: "http://127.0.0.1:3000/winners/",
  ENGINE: "http://127.0.0.1:3000/engine/"
};
const API_ERRORS = {
  INCORRECT_PARAMS: "Incorrect params"
};
class ApiModel {
  static async getCars(params) {
    const pageParam = params.get(QUERY_PARAMS.PAGE) ?? QUERY_VALUES.DEFAULT_PAGE;
    const limitParam = params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.DEFAULT_CARS_LIMIT;
    const url = `${API_URLS.CARS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}`;
    return this.fetchData(url, API_METHODS.GET);
  }
  static async getCarById(id) {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData(url, API_METHODS.GET);
  }
  static async getWinners(params) {
    const pageParam = Number(
      params.get(QUERY_PARAMS.PAGE) ?? QUERY_VALUES.DEFAULT_PAGE
    );
    const limitParam = Number(
      params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.DEFAULT_WINNERS_LIMIT
    );
    const sortParam = String(params.get(QUERY_PARAMS.SORT) ?? QUERY_VALUES.ID);
    const orderParam = String(
      params.get(QUERY_PARAMS.ORDER) ?? QUERY_VALUES.ASC
    );
    const url = `${API_URLS.WINNERS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}&${QUERY_PARAMS.SORT}=${sortParam}&${QUERY_PARAMS.ORDER}=${orderParam}`;
    return this.fetchData(url, API_METHODS.GET);
  }
  static async getWinnerById(id) {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData(url, API_METHODS.GET);
  }
  static async createCar(car) {
    const url = API_URLS.CARS;
    return this.fetchData(url, API_METHODS.POST, car);
  }
  static async createWinner(winner) {
    const url = API_URLS.WINNERS;
    return this.fetchData(url, API_METHODS.POST, winner);
  }
  static async deleteCarById(id) {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData(url, API_METHODS.DELETE);
  }
  static async deleteWinnerById(id) {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData(url, API_METHODS.DELETE);
  }
  static async updateCarById(id, car) {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData(url, API_METHODS.PUT, car);
  }
  static async updateWinnerById(id, winner) {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData(url, API_METHODS.PUT, winner);
  }
  static async startCarEngine(params) {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async stopCarEngine(params) {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async driveCarEngine(params) {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async fetchData(url, method, body) {
    const data = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null
    }).then((response) => response.json()).then((json) => json).catch(() => null);
    return data;
  }
}
const ACTIONS = {
  GET_CURRENT_CARS: "getCurrentCars",
  GET_CURRENT_WINNERS: "getCurrentWinners"
};
class ButtonView {
  constructor(params) {
    __publicField(this, "button");
    this.button = this.createHTML(params);
  }
  getHTML() {
    return this.button;
  }
  createHTML(params) {
    this.button = createBaseElement({
      tag: TAG_NAMES.BUTTON,
      cssClasses: params.classes,
      attributes: params.attrs,
      innerContent: params.text
    });
    if (params.action) {
      this.button.addEventListener(params.action.key, params.action.value);
    }
    return this.button;
  }
}
class ButtonModel {
  constructor(params) {
    __publicField(this, "view");
    __publicField(this, "button");
    this.view = new ButtonView(params);
    this.button = this.view.getHTML();
  }
  getHTML() {
    return this.button;
  }
  setDisabled() {
    this.button.disabled = IS_DISABLED.DISABLED;
  }
  setEnabled() {
    this.button.disabled = IS_DISABLED.ENABLED;
  }
}
const RACE_TRACK_STYLES = {
  "race-track__bottom-wrapper": "_race-track__bottom-wrapper_ow0gl_1",
  "race-track__car-svg-wrapper": "_race-track__car-svg-wrapper_ow0gl_6"
};
const RACE_TRACK_BUTTON_TEXT = {
  SELECT_CAR: "Select",
  REMOVE_CAR: "Remove",
  START_ENGINE: "A",
  STOP_ENGINE: "B"
};
const sprite = "" + new URL("sprite-ee48f508.svg", import.meta.url).href;
const createSVGUse = (id) => {
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `${sprite}#${id}`
  );
  return use;
};
const changeSVGFill = (svg, color) => {
  svg.setAttribute("fill", color);
};
class RaceTrackView {
  constructor(carData) {
    __publicField(this, "carData");
    __publicField(this, "selectCarButton");
    __publicField(this, "removeCarButton");
    __publicField(this, "nameCarSpan");
    __publicField(this, "startEngineButton");
    __publicField(this, "stopEngineButton");
    __publicField(this, "carSVG");
    __publicField(this, "carSVGWrapper");
    __publicField(this, "raceTrack");
    this.carData = carData;
    this.selectCarButton = this.createSelectCarButton();
    this.removeCarButton = this.createRemoveCarButton();
    this.nameCarSpan = this.createNameCarSpan();
    this.startEngineButton = this.createStartEngineButton();
    this.stopEngineButton = this.createStopEngineButton();
    this.carSVG = this.createCarSVG();
    this.carSVGWrapper = this.createCarSVGWrapper();
    this.raceTrack = this.createHTML();
  }
  getHTML() {
    return this.raceTrack;
  }
  createSelectCarButton() {
    this.selectCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.SELECT_CAR,
      classes: [RACE_TRACK_STYLES["race-track_button"]]
    });
    return this.selectCarButton;
  }
  createRemoveCarButton() {
    this.removeCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.REMOVE_CAR,
      classes: [RACE_TRACK_STYLES["race-track_button"]]
    });
    return this.removeCarButton;
  }
  createNameCarSpan() {
    this.nameCarSpan = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [RACE_TRACK_STYLES["race-track__name-car"]],
      innerContent: this.carData.name
    });
    return this.nameCarSpan;
  }
  createStartEngineButton() {
    this.startEngineButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.START_ENGINE,
      classes: [RACE_TRACK_STYLES["race-track_button"]]
    });
    return this.startEngineButton;
  }
  createStopEngineButton() {
    this.stopEngineButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.STOP_ENGINE,
      classes: [RACE_TRACK_STYLES["race-track_button"]]
    });
    return this.stopEngineButton;
  }
  createCarSVG() {
    this.carSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.carSVG.classList.add(RACE_TRACK_STYLES["race-track__car-img"]);
    this.carSVG.appendChild(createSVGUse("car"));
    changeSVGFill(this.carSVG, this.carData.color);
    return this.carSVG;
  }
  createCarSVGWrapper() {
    this.carSVGWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES["race-track__car-svg-wrapper"]]
    });
    this.carSVGWrapper.append(this.carSVG);
    return this.carSVGWrapper;
  }
  createHTML() {
    this.raceTrack = createBaseElement({
      tag: TAG_NAMES.LI,
      cssClasses: [RACE_TRACK_STYLES["race-track"]]
    });
    const topRaceTrackWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES["race-track__top-wrapper"]]
    });
    topRaceTrackWrapper.append(
      this.selectCarButton.getHTML(),
      this.removeCarButton.getHTML(),
      this.nameCarSpan
    );
    const bottomRaceTrackWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES["race-track__bottom-wrapper"]]
    });
    bottomRaceTrackWrapper.append(
      this.startEngineButton.getHTML(),
      this.stopEngineButton.getHTML(),
      this.carSVGWrapper
    );
    this.raceTrack.append(topRaceTrackWrapper, bottomRaceTrackWrapper);
    return this.raceTrack;
  }
}
class RaceTrackModel {
  constructor(carData) {
    __publicField(this, "carData");
    __publicField(this, "raceTrackView");
    __publicField(this, "raceTrack");
    this.carData = carData;
    this.raceTrackView = new RaceTrackView(this.carData);
    this.raceTrack = this.raceTrackView.getHTML();
  }
  getHTML() {
    return this.raceTrack;
  }
}
class GaragePageModel {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "garagePageView");
    __publicField(this, "page");
    this.parent = parent;
    this.garagePageView = new GaragePageView(this.parent);
    this.page = this.garagePageView.getHTML();
    this.init();
  }
  getHTML() {
    return this.page;
  }
  hide() {
    this.page.classList.add(GARAGE_PAGE_STYLES["garage-page--hidden"]);
  }
  show() {
    this.page.classList.remove(GARAGE_PAGE_STYLES["garage-page--hidden"]);
  }
  getInitialDataCars() {
    ApiModel.getCars(/* @__PURE__ */ new Map()).then((data) => {
      if (data) {
        StoreModel.dispatch({
          type: ACTIONS.GET_CURRENT_CARS,
          payload: data
        });
        this.drawRaceTracks(data);
        console.log(StoreModel.getState());
      }
      return data;
    }).catch(() => {
    });
  }
  drawRaceTracks(cars) {
    cars.forEach((car) => {
      const raceTrack = new RaceTrackModel(car);
      this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
    });
  }
  init() {
    this.hide();
    this.getInitialDataCars();
  }
}
const WINNERS_PAGE_STYLES = {
  "winners-page": "_winners-page_1umj9_1",
  "winners-page--hidden": "_winners-page--hidden_1umj9_5"
};
class WinnersPageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "page");
    this.parent = parent;
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page"]]
    });
    const h1 = createBaseElement({
      tag: TAG_NAMES.H1,
      innerContent: "Winners"
    });
    h1.style.color = "white";
    this.page.append(h1);
    this.parent.append(this.page);
    return this.page;
  }
}
class WinnersPageModel {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "winnersPageView");
    __publicField(this, "page");
    this.parent = parent;
    this.winnersPageView = new WinnersPageView(this.parent);
    this.page = this.winnersPageView.getHTML();
    this.hide();
  }
  getHTML() {
    return this.page;
  }
  hide() {
    this.getHTML().classList.add(WINNERS_PAGE_STYLES["winners-page--hidden"]);
  }
  show() {
    this.getHTML().classList.remove(
      WINNERS_PAGE_STYLES["winners-page--hidden"]
    );
  }
}
const HEADER_BUTTON_TEXT = {
  GARAGE_BTN: "To winners",
  WINNERS_BTN: "To garage"
};
const header = "_header_36v5w_1";
const HEADER_STYLES = {
  header,
  "header__garage-button": "_header__garage-button_36v5w_10",
  "header__winners-button": "_header__winners-button_36v5w_11"
};
class HeaderView {
  constructor() {
    __publicField(this, "garageButton");
    __publicField(this, "winnersButton");
    __publicField(this, "header");
    this.garageButton = this.createGarageButton();
    this.winnersButton = this.createWinnersButton();
    this.header = this.createHTML();
  }
  getHTML() {
    return this.header;
  }
  getGarageButton() {
    return this.garageButton;
  }
  getWinnersButton() {
    return this.winnersButton;
  }
  createGarageButton() {
    this.garageButton = new ButtonModel({
      text: HEADER_BUTTON_TEXT.GARAGE_BTN,
      classes: [HEADER_STYLES["header__garage-button"]]
    });
    return this.garageButton;
  }
  createWinnersButton() {
    this.winnersButton = new ButtonModel({
      text: HEADER_BUTTON_TEXT.WINNERS_BTN,
      classes: [HEADER_STYLES["header__winners-button"]]
    });
    return this.winnersButton;
  }
  createHTML() {
    this.header = createBaseElement({
      tag: TAG_NAMES.HEADER,
      cssClasses: [HEADER_STYLES.header]
    });
    this.header.append(
      this.winnersButton.getHTML(),
      this.garageButton.getHTML()
    );
    return this.header;
  }
}
class HeaderModel {
  constructor() {
    __publicField(this, "headerView");
    __publicField(this, "header");
    this.headerView = new HeaderView();
    this.header = this.headerView.getHTML();
    this.setHandlerToButtons();
  }
  getHTML() {
    return this.header;
  }
  setHandlerToButtons() {
    const garageButton = this.headerView.getGarageButton().getHTML();
    const winnersButton = this.headerView.getWinnersButton().getHTML();
    garageButton.addEventListener(EVENT_NAMES.CLICK, () => {
      RouterModel.navigateTo(PAGES_IDS.WINNERS_PAGE);
    });
    winnersButton.addEventListener(EVENT_NAMES.CLICK, () => {
      RouterModel.navigateTo(PAGES_IDS.GARAGE_PAGE);
    });
  }
}
class AppModel {
  constructor() {
    __publicField(this, "appView");
    __publicField(this, "parent");
    this.appView = new AppView();
    this.parent = this.appView.getHTML();
    RouterModel.setPages(this.initPages());
  }
  getHTML() {
    return this.parent;
  }
  initPages() {
    const header2 = new HeaderModel();
    const garagePage = new GaragePageModel(this.parent);
    const winnersPage = new WinnersPageModel(this.parent);
    const pages = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: garagePage,
        [PAGES_IDS.GARAGE_PAGE]: garagePage,
        [PAGES_IDS.WINNERS_PAGE]: winnersPage
      })
    );
    this.parent.prepend(header2.getHTML());
    return pages;
  }
}
const index = "";
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-5ffbbcea.js.map
