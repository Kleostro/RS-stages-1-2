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
class RouterModel {
  constructor(pages) {
    __publicField(this, "pages");
    __publicField(this, "currentPage");
    __publicField(this, "pathSegmentsToKeep", 2);
    this.pages = pages;
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname.split("/").slice(this.pathSegmentsToKeep + 1).join("/");
      this.navigateTo(currentPath);
    });
    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      const currentPath = window.location.pathname.split("/").slice(this.pathSegmentsToKeep + 1).join("/");
      this.handleRequest(currentPath);
    });
  }
  navigateTo(route) {
    this.handleRequest(route);
    const pathnameApp = window.location.pathname.split("/").slice(1, this.pathSegmentsToKeep + 1).join("/");
    const url = `/${pathnameApp}/${route}`;
    window.history.pushState({}, "", url);
  }
  handleRequest(path) {
    var _a, _b;
    const pathParts = path.split("/");
    const hasRoute = this.pages.has(pathParts[0]);
    if (!hasRoute) {
      window.location.pathname = PAGES_IDS.DEFAULT_PAGE;
      return;
    }
    (_a = this.currentPage) == null ? void 0 : _a.hide();
    this.currentPage = this.pages.get(path);
    (_b = this.currentPage) == null ? void 0 : _b.show();
  }
}
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
  DEFAULT_WINNERS_LIMIT: 10,
  NO_CARS_LIMIT: 0,
  NO_WINNERS_LIMIT: 0
};
const API_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  APPLICATION_JSON: "application/json"
};
const API_URLS = {
  CARS: "http://127.0.0.1:3000/garage/",
  WINNERS: "http://127.0.0.1:3000/winners/",
  ENGINE: "http://127.0.0.1:3000/engine/"
};
const API_ERRORS = {
  INCORRECT_PARAMS: "Incorrect params"
};
const INITIAL_DATA = {
  cars: [],
  winners: [],
  garagePage: 1,
  totalPages: 1
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case "getCars":
      return {
        ...state,
        cars: [...state.cars, ...action.payload]
      };
    case "getWinners":
      return {
        ...state,
        winners: [...state.winners, ...action.payload]
      };
    case "addNewCar":
      return {
        ...state,
        cars: [...action.payload]
      };
    case "deleteCar":
      return {
        ...state,
        cars: [...action.payload]
      };
    case "setTotalGaragePages":
      return {
        ...state,
        totalPages: action.payload
      };
    case "changeGaragePage":
      return {
        ...state,
        garagePage: action.payload
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
const GARAGE_PAGE_STYLES = {
  "garage-page": "_garage-page_3cu24_1",
  "garage-page_top-wrapper": "_garage-page_top-wrapper_3cu24_6",
  "garage-page_bottom-wrapper": "_garage-page_bottom-wrapper_3cu24_15",
  "garage-page_more-button": "_garage-page_more-button_3cu24_20",
  "garage-page_list": "_garage-page_list_3cu24_35",
  "garage-page_title": "_garage-page_title_3cu24_42",
  "garage-page_info": "_garage-page_info_3cu24_46",
  "garage-page--hidden": "_garage-page--hidden_3cu24_50"
};
class GaragePageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "raceTrackTopWrapper");
    __publicField(this, "raceTrackBottomWrapper");
    __publicField(this, "garageTitle");
    __publicField(this, "pageInfo");
    __publicField(this, "moreCarsButton");
    __publicField(this, "raceTracksList");
    __publicField(this, "page");
    this.parent = parent;
    this.moreCarsButton = this.createMoreCarsButton();
    this.raceTrackTopWrapper = this.createRaceTrackTopWrapper();
    this.garageTitle = this.createGarageTitle();
    this.pageInfo = this.createPageInfo();
    this.raceTracksList = this.createRaceTracksList();
    this.raceTrackBottomWrapper = this.createRaceTrackBottomWrapper();
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  getRaceTrackTopWrapper() {
    return this.raceTrackTopWrapper;
  }
  getRaceTrackBottomWrapper() {
    return this.raceTrackBottomWrapper;
  }
  getGarageTitle() {
    return this.garageTitle;
  }
  getPageInfo() {
    return this.pageInfo;
  }
  getRaceTracksList() {
    return this.raceTracksList;
  }
  getMoreCarsButton() {
    return this.moreCarsButton;
  }
  createGarageTitle() {
    this.garageTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_title"]]
    });
    return this.garageTitle;
  }
  createPageInfo() {
    this.pageInfo = createBaseElement({
      tag: TAG_NAMES.H3,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_info"]]
    });
    return this.pageInfo;
  }
  createRaceTracksList() {
    this.raceTracksList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_list"]]
    });
    return this.raceTracksList;
  }
  createMoreCarsButton() {
    const buttonText = "Create 100 cars";
    this.moreCarsButton = new ButtonModel({
      text: buttonText,
      classes: [GARAGE_PAGE_STYLES["garage-page_more-button"]]
    });
    return this.moreCarsButton;
  }
  createRaceTrackTopWrapper() {
    this.raceTrackTopWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_top-wrapper"]]
    });
    this.raceTrackTopWrapper.append(this.moreCarsButton.getHTML());
    return this.raceTrackTopWrapper;
  }
  createRaceTrackBottomWrapper() {
    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_bottom-wrapper"]]
    });
    return this.raceTrackBottomWrapper;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page"]]
    });
    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_bottom-wrapper"]]
    });
    this.raceTrackBottomWrapper.append(
      this.garageTitle,
      this.pageInfo,
      this.raceTracksList
    );
    this.page.append(this.raceTrackTopWrapper, this.raceTrackBottomWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
class ApiModel {
  static async getCars(params) {
    const pageParam = params.get(QUERY_PARAMS.PAGE);
    const limitParam = params.get(QUERY_PARAMS.LIMIT);
    let url = "";
    if (!pageParam || !limitParam) {
      url = `${API_URLS.CARS}/`;
    } else {
      url = `${API_URLS.CARS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}`;
    }
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
      params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.NO_WINNERS_LIMIT
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
    return fetch(url, {
      method,
      headers: {
        [API_HEADERS.CONTENT_TYPE]: API_HEADERS.APPLICATION_JSON
      },
      body: body ? JSON.stringify(body) : null
    }).then((response) => response.json()).then((json) => json).catch(() => void 0);
  }
}
const ACTIONS = {
  GET_CARS: "getCars",
  GET_WINNERS: "getWinners",
  ADD_NEW_CAR: "addNewCar",
  DELETE_CAR: "deleteCar",
  CHANGE_GARAGE_PAGE: "changeGaragePage",
  setTotalGaragePages: "setTotalGaragePages"
};
const RACE_TRACK_STYLES = {
  "race-track": "_race-track_v0cb4_1",
  "race-track__top-wrapper": "_race-track__top-wrapper_v0cb4_6",
  "race-track__bottom-wrapper": "_race-track__bottom-wrapper_v0cb4_11",
  "race-track__car-svg-wrapper": "_race-track__car-svg-wrapper_v0cb4_18",
  "race-track_car-button": "_race-track_car-button_v0cb4_23",
  "race-track_engine-button": "_race-track_engine-button_v0cb4_40",
  "race-track__name-car": "_race-track__name-car_v0cb4_58",
  "race-track__flag-img": "_race-track__flag-img_v0cb4_63"
};
const RACE_TRACK_BUTTON_TEXT = {
  SELECT_CAR: "Select",
  REMOVE_CAR: "Remove",
  START_ENGINE: "A",
  STOP_ENGINE: "B"
};
const createSVGUse = (id) => {
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${id}`);
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
  getSelectCarButton() {
    return this.selectCarButton;
  }
  getRemoveCarButton() {
    return this.removeCarButton;
  }
  getNameCarSpan() {
    return this.nameCarSpan;
  }
  getCarSvg() {
    return this.carSVG;
  }
  createSelectCarButton() {
    this.selectCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.SELECT_CAR,
      classes: [RACE_TRACK_STYLES["race-track_car-button"]]
    });
    return this.selectCarButton;
  }
  createRemoveCarButton() {
    this.removeCarButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.REMOVE_CAR,
      classes: [RACE_TRACK_STYLES["race-track_car-button"]]
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
      classes: [RACE_TRACK_STYLES["race-track_engine-button"]]
    });
    return this.startEngineButton;
  }
  createStopEngineButton() {
    this.stopEngineButton = new ButtonModel({
      text: RACE_TRACK_BUTTON_TEXT.STOP_ENGINE,
      classes: [RACE_TRACK_STYLES["race-track_engine-button"]]
    });
    this.stopEngineButton.setDisabled();
    return this.stopEngineButton;
  }
  createCarSVG() {
    const svgURL = "http://www.w3.org/2000/svg";
    const carID = "car";
    this.carSVG = document.createElementNS(svgURL, TAG_NAMES.SVG);
    this.carSVG.classList.add(RACE_TRACK_STYLES["race-track__car-img"]);
    this.carSVG.appendChild(createSVGUse(carID));
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
    const svgURL = "http://www.w3.org/2000/svg";
    const flagID = "race-flag";
    const raceFlag = document.createElementNS(svgURL, TAG_NAMES.SVG);
    raceFlag.classList.add(RACE_TRACK_STYLES["race-track__flag-img"]);
    raceFlag.appendChild(createSVGUse(flagID));
    bottomRaceTrackWrapper.append(
      this.startEngineButton.getHTML(),
      this.stopEngineButton.getHTML(),
      this.carSVGWrapper,
      raceFlag
    );
    this.raceTrack.append(topRaceTrackWrapper, bottomRaceTrackWrapper);
    return this.raceTrack;
  }
}
const _MediatorModel = class _MediatorModel {
  constructor() {
    __publicField(this, "listeners");
    this.listeners = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return _MediatorModel.mediator;
  }
  subscribe(eventName, listener) {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName);
      listeners == null ? void 0 : listeners.push(listener);
    } else {
      const newListeners = [];
      newListeners.push(listener);
      this.listeners.set(eventName, newListeners);
    }
  }
  notify(eventName, params) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(params));
    }
  }
  unsubscribe(eventName, listener) {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName);
      const index2 = listeners == null ? void 0 : listeners.indexOf(listener);
      if (index2 && index2 !== -1) {
        listeners == null ? void 0 : listeners.splice(index2, 1);
      }
    }
  }
};
__publicField(_MediatorModel, "mediator", new _MediatorModel());
let MediatorModel = _MediatorModel;
const MEDIATOR_EVENTS = {
  GET_CURRENT_CARS: "getCurrentCars",
  GET_CURRENT_WINNERS: "getCurrentWinners",
  DELETE_CAR: "deleteCar",
  DELETE_WINNER: "deleteWinner",
  NEW_CAR: "newCar",
  NEW_WINNER: "newWinner",
  SELECT_CAR: "selectCar",
  UPDATE_CAR: "updateCar",
  CHANGE_COLOR_PREVIEW_CAR: "changeColorPreviewCar",
  CHANGE_NAME_PREVIEW_CAR: "changeNamePreviewCar",
  CHANGE_GARAGE_PAGE: "changeGaragePage",
  CHANGE_WINNER_PAGE: "changeWinnerPage"
};
class RaceTrackModel {
  constructor(carData) {
    __publicField(this, "carData");
    __publicField(this, "singletonMediator");
    __publicField(this, "raceTrackView");
    __publicField(this, "raceTrack");
    this.carData = carData;
    this.singletonMediator = MediatorModel.getInstance();
    this.raceTrackView = new RaceTrackView(this.carData);
    this.raceTrack = this.raceTrackView.getHTML();
    this.setHandlerToButtons();
  }
  getHTML() {
    return this.raceTrack;
  }
  getView() {
    return this.raceTrackView;
  }
  deleteCarHandler() {
    if (this.carData.id) {
      ApiModel.deleteCarById(this.carData.id).then(() => {
        const { cars } = StoreModel.getState();
        const carsWithoutDeleted = cars.filter(
          (car) => car.id !== this.carData.id
        );
        StoreModel.dispatch({
          type: ACTIONS.DELETE_CAR,
          payload: carsWithoutDeleted
        });
        this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_CAR, "");
        this.raceTrack.remove();
      }).catch(() => {
      });
    }
  }
  updateCarView() {
    if (!this.carData.id) {
      return;
    }
    const carNameSpan = this.raceTrackView.getNameCarSpan();
    const carSVG = this.raceTrackView.getCarSvg();
    const carState = StoreModel.getState().cars.find(
      (car) => car.id === this.carData.id
    );
    carNameSpan.textContent = (carState == null ? void 0 : carState.name) || this.carData.name;
    changeSVGFill(carSVG, (carState == null ? void 0 : carState.color) || this.carData.color);
  }
  setHandlerToButtons() {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton().getHTML();
    removeCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, this.deleteCarHandler.bind(this));
    selectCarButton.addEventListener(EVENT_NAMES.CLICK, () => {
      removeCarButton.setDisabled();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.SELECT_CAR,
        this.carData.id
      );
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        removeCarButton.setEnabled();
      }
    });
  }
}
class InputView {
  constructor(attrs) {
    __publicField(this, "input");
    this.input = this.createHTML(attrs);
  }
  getHTML() {
    return this.input;
  }
  createHTML(attrs) {
    this.input = createBaseElement({
      tag: TAG_NAMES.INPUT,
      attributes: attrs
    });
    return this.input;
  }
}
class InputModel {
  constructor(attrs) {
    __publicField(this, "view");
    __publicField(this, "input");
    this.view = new InputView(attrs);
    this.input = this.view.getHTML();
  }
  getHTML() {
    return this.input;
  }
  setDisabled() {
    this.input.disabled = IS_DISABLED.DISABLED;
  }
  setEnabled() {
    this.input.disabled = IS_DISABLED.ENABLED;
  }
  clear() {
    this.input.value = "";
  }
}
const form$1 = "_form_d3y50_1";
const CREATE_CAR_FORM_STYLES = {
  form: form$1,
  "form_submit-button": "_form_submit-button_d3y50_34"
};
const INPUT_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
  RANGE: "range",
  DATE: "date",
  COLOR: "color"
};
const BUTTON_TYPES = {
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button"
};
class CreateCarFormView {
  constructor() {
    __publicField(this, "carNameInput");
    __publicField(this, "carColorInput");
    __publicField(this, "submitButton");
    __publicField(this, "form");
    this.carNameInput = this.createCarNameInput();
    this.carColorInput = this.createCarColorInput();
    this.submitButton = this.createSubmitButton();
    this.form = this.createHTML();
  }
  getHTML() {
    return this.form;
  }
  getCarNameInput() {
    return this.carNameInput;
  }
  getCarColorInput() {
    return this.carColorInput;
  }
  getSubmitButton() {
    return this.submitButton;
  }
  createCarNameInput() {
    const placeholder = "Car name";
    this.carNameInput = new InputModel({
      type: INPUT_TYPES.TEXT,
      placeholder
    });
    return this.carNameInput;
  }
  createCarColorInput() {
    this.carColorInput = new InputModel({
      type: INPUT_TYPES.COLOR
    });
    return this.carColorInput;
  }
  createSubmitButton() {
    const buttonText = "Create";
    this.submitButton = new ButtonModel({
      text: buttonText,
      classes: [CREATE_CAR_FORM_STYLES["form_submit-button"]],
      attrs: {
        type: BUTTON_TYPES.SUBMIT
      }
    });
    this.submitButton.setDisabled();
    return this.submitButton;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [CREATE_CAR_FORM_STYLES.form]
    });
    this.form.append(
      this.carNameInput.getHTML(),
      this.carColorInput.getHTML(),
      this.submitButton.getHTML()
    );
    return this.form;
  }
}
const formatText = (text) => text.trim().split(" ").map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
class CreateCarFormModel {
  constructor() {
    __publicField(this, "singletonMediator");
    __publicField(this, "createCarFormView");
    __publicField(this, "form");
    this.singletonMediator = MediatorModel.getInstance();
    this.createCarFormView = new CreateCarFormView();
    this.form = this.createCarFormView.getHTML();
    this.init();
  }
  getHTML() {
    return this.form;
  }
  checkForm() {
    const carNameInput = this.createCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.createCarFormView.getCarColorInput().getHTML();
    const submitButton = this.createCarFormView.getSubmitButton();
    if (!carNameInput.value.length || !carColorInput.value.length) {
      submitButton.setDisabled();
    } else {
      submitButton.setEnabled();
    }
  }
  async submitHandler() {
    const carNameInput = this.createCarFormView.getCarNameInput();
    const carColorInput = this.createCarFormView.getCarColorInput();
    const submitButton = this.createCarFormView.getSubmitButton();
    const newCarData = {
      name: formatText(carNameInput.getHTML().value),
      color: formatText(carColorInput.getHTML().value)
    };
    await ApiModel.createCar(newCarData);
    const carsWithoutCreated = await ApiModel.getCars(/* @__PURE__ */ new Map());
    if (!carsWithoutCreated) {
      return;
    }
    StoreModel.dispatch({
      type: ACTIONS.GET_CARS,
      payload: [newCarData]
    });
    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: carsWithoutCreated
    });
    carNameInput.clear();
    const initColor = "#000000";
    carColorInput.getHTML().value = initColor;
    submitButton.setDisabled();
    this.singletonMediator.notify(MEDIATOR_EVENTS.NEW_CAR, "");
  }
  init() {
    const carNameInput = this.createCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.createCarFormView.getCarColorInput().getHTML();
    carNameInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
        carNameInput.value
      );
    });
    carColorInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
        carColorInput.value
      );
    });
    this.getHTML().addEventListener(
      EVENT_NAMES.SUBMIT,
      (event) => {
        event.preventDefault();
        this.submitHandler().catch(() => {
        });
      }
    );
  }
}
const PREVIEW_CAR_STYLES = {
  "preview-car": "_preview-car_109cx_1",
  "preview-car_name": "_preview-car_name_109cx_6",
  "preview-car_img": "_preview-car_img_109cx_18"
};
class PreviewCarView {
  constructor() {
    __publicField(this, "carName");
    __publicField(this, "carSVG");
    __publicField(this, "previewCar");
    this.carName = this.createCarName();
    this.carSVG = this.createCarSVG();
    this.previewCar = this.createHTML();
  }
  getHTML() {
    return this.previewCar;
  }
  getCarSVG() {
    return this.carSVG;
  }
  getCarName() {
    return this.carName;
  }
  createCarName() {
    this.carName = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [PREVIEW_CAR_STYLES["preview-car_name"]]
    });
    return this.carName;
  }
  createCarSVG() {
    const svgURL = "http://www.w3.org/2000/svg";
    const carID = "car";
    this.carSVG = document.createElementNS(svgURL, TAG_NAMES.SVG);
    this.carSVG.classList.add(PREVIEW_CAR_STYLES["preview-car_img"]);
    this.carSVG.appendChild(createSVGUse(carID));
    return this.carSVG;
  }
  createHTML() {
    this.previewCar = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [PREVIEW_CAR_STYLES["preview-car"]]
    });
    this.previewCar.append(this.carSVG, this.carName);
    return this.previewCar;
  }
}
class PreviewCarModel {
  constructor() {
    __publicField(this, "previewCarView");
    __publicField(this, "singletonMediator");
    __publicField(this, "previewCar");
    this.previewCarView = new PreviewCarView();
    this.singletonMediator = MediatorModel.getInstance();
    this.previewCar = this.previewCarView.getHTML();
    this.init();
  }
  getHTML() {
    return this.previewCar;
  }
  setColorCar(color) {
    const carSvg = this.previewCarView.getCarSVG();
    changeSVGFill(carSvg, color);
  }
  setNameCar(name) {
    this.previewCarView.getCarName().textContent = name;
  }
  setInitialStateFields() {
    this.previewCarView.getCarName().textContent = "";
    this.previewCarView.getCarSVG().removeAttribute("fill");
  }
  init() {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
      (params) => {
        if (typeof params === "string") {
          this.setColorCar(params);
        }
      }
    );
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
      (params) => {
        if (typeof params === "string") {
          this.setNameCar(params);
        }
      }
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.NEW_CAR, () => {
      this.setInitialStateFields();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.setInitialStateFields();
    });
  }
}
const form = "_form_193dy_1";
const CHANGE_CAR_FORM_STYLES = {
  form,
  "form_submit-button": "_form_submit-button_193dy_38"
};
class ChangeCarFormView {
  constructor() {
    __publicField(this, "carNameInput");
    __publicField(this, "carColorInput");
    __publicField(this, "submitButton");
    __publicField(this, "form");
    this.carNameInput = this.createCarNameInput();
    this.carColorInput = this.createCarColorInput();
    this.submitButton = this.createSubmitButton();
    this.form = this.createHTML();
  }
  getHTML() {
    return this.form;
  }
  getCarNameInput() {
    return this.carNameInput;
  }
  getCarColorInput() {
    return this.carColorInput;
  }
  getSubmitButton() {
    return this.submitButton;
  }
  createCarNameInput() {
    const placeholder = "Car name";
    this.carNameInput = new InputModel({
      type: INPUT_TYPES.TEXT,
      placeholder
    });
    this.carNameInput.setDisabled();
    return this.carNameInput;
  }
  createCarColorInput() {
    this.carColorInput = new InputModel({
      type: INPUT_TYPES.COLOR
    });
    this.carColorInput.setDisabled();
    return this.carColorInput;
  }
  createSubmitButton() {
    const buttonText = "Save";
    this.submitButton = new ButtonModel({
      text: buttonText,
      classes: [CHANGE_CAR_FORM_STYLES["form_submit-button"]],
      attrs: {
        type: BUTTON_TYPES.SUBMIT
      }
    });
    this.submitButton.setDisabled();
    return this.submitButton;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [CHANGE_CAR_FORM_STYLES.form]
    });
    this.form.append(
      this.carNameInput.getHTML(),
      this.carColorInput.getHTML(),
      this.submitButton.getHTML()
    );
    return this.form;
  }
}
class ChangeCarFormModel {
  constructor() {
    __publicField(this, "singletonMediator");
    __publicField(this, "selectCar", null);
    __publicField(this, "changeCarFormView");
    __publicField(this, "form");
    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SELECT_CAR, (params) => {
      this.getSelectCar(params);
    });
    this.changeCarFormView = new ChangeCarFormView();
    this.form = this.changeCarFormView.getHTML();
    this.init();
  }
  getHTML() {
    return this.form;
  }
  getSelectCar(id) {
    if (typeof id === "number") {
      ApiModel.getCarById(id).then((car) => {
        if (car) {
          this.selectCar = car;
          this.unDisableForm();
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
            car.name
          );
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
            car.color
          );
        }
      }).catch(() => {
      });
    }
  }
  unDisableForm() {
    var _a, _b;
    const carNameInput = this.changeCarFormView.getCarNameInput();
    const carColorInput = this.changeCarFormView.getCarColorInput();
    const submitButton = this.changeCarFormView.getSubmitButton();
    carNameInput.setEnabled();
    carColorInput.setEnabled();
    submitButton.setEnabled();
    carNameInput.getHTML().value = ((_a = this.selectCar) == null ? void 0 : _a.name) || "";
    carColorInput.getHTML().value = ((_b = this.selectCar) == null ? void 0 : _b.color) || "";
  }
  checkForm() {
    const carNameInput = this.changeCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.changeCarFormView.getCarColorInput().getHTML();
    const submitButton = this.changeCarFormView.getSubmitButton();
    if (!carNameInput.value.length || !carColorInput.value.length) {
      submitButton.setDisabled();
    } else {
      submitButton.setEnabled();
    }
  }
  async submitHandler() {
    const carNameInput = this.changeCarFormView.getCarNameInput();
    const carColorInput = this.changeCarFormView.getCarColorInput();
    const submitButton = this.changeCarFormView.getSubmitButton();
    const newCarData = {
      name: formatText(carNameInput.getHTML().value),
      color: formatText(carColorInput.getHTML().value)
    };
    if (!this.selectCar || !this.selectCar.id) {
      return;
    }
    await ApiModel.updateCarById(this.selectCar.id, newCarData);
    const carWithoutChange = await ApiModel.getCarById(this.selectCar.id);
    if (!carWithoutChange || !carWithoutChange.id) {
      return;
    }
    const { cars } = StoreModel.getState();
    const updateCar = cars.find((car) => car.id === carWithoutChange.id);
    if (updateCar) {
      updateCar.name = newCarData.name;
      updateCar.color = newCarData.color;
    }
    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: cars
    });
    carNameInput.clear();
    const initColor = "#000000";
    carColorInput.getHTML().value = initColor;
    carNameInput.setDisabled();
    carColorInput.setDisabled();
    submitButton.setDisabled();
    this.singletonMediator.notify(MEDIATOR_EVENTS.UPDATE_CAR, updateCar == null ? void 0 : updateCar.id);
  }
  init() {
    const carNameInput = this.changeCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.changeCarFormView.getCarColorInput().getHTML();
    carNameInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
        carNameInput.value
      );
    });
    carColorInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
        carColorInput.value
      );
    });
    this.getHTML().addEventListener(
      EVENT_NAMES.SUBMIT,
      (event) => {
        event.preventDefault();
        this.submitHandler().catch(() => {
        });
      }
    );
  }
}
const getRandomIndex = (max) => Math.floor(Math.random() * max);
var CarModel = /* @__PURE__ */ ((CarModel2) => {
  CarModel2["Model 3"] = "Model 3";
  CarModel2["Model S"] = "Model S";
  CarModel2["Model X"] = "Model X";
  CarModel2["Model Y"] = "Model Y";
  CarModel2["Roadster"] = "Roadster";
  CarModel2["Cybertruck"] = "Cybertruck";
  CarModel2["Bolt EV"] = "Bolt EV";
  CarModel2["I-Pace"] = "I-Pace";
  CarModel2["Kona Electric"] = "Kona Electric";
  CarModel2["Taycan Turbo"] = "Taycan Turbo";
  CarModel2["Taycan Turbo S"] = "Taycan Turbo S";
  CarModel2["e-Golf"] = "e-Golf";
  CarModel2["Soul Electric"] = "Soul Electric";
  CarModel2["e6"] = "e6";
  CarModel2["Leaf"] = "Leaf";
  CarModel2["Zoe"] = "Zoe";
  CarModel2["i3"] = "i3";
  CarModel2["dolphin"] = "dolphin";
  CarModel2["eQ"] = "eQ";
  return CarModel2;
})(CarModel || {});
var CarBrand = /* @__PURE__ */ ((CarBrand2) => {
  CarBrand2["Tesla"] = "Tesla";
  CarBrand2["Chevrolet"] = "Chevrolet";
  CarBrand2["Hyundai"] = "Hyundai";
  CarBrand2["Kia"] = "Kia";
  CarBrand2["Jaguar"] = "Jaguar";
  CarBrand2["Porche"] = "Porche";
  CarBrand2["BYD"] = "BYD";
  CarBrand2["Volkswagen"] = "Volkswagen";
  CarBrand2["Nissan"] = "Nissan";
  CarBrand2["Renault"] = "Renault";
  CarBrand2["Chery"] = "Chery";
  CarBrand2["BMW"] = "BMW";
  return CarBrand2;
})(CarBrand || {});
const createRandomDataCars = (countCars) => {
  const cars = [];
  const getRandomBrand = () => Object.keys(CarBrand)[getRandomIndex(Object.keys(CarBrand).length)];
  const getRandomModel = () => Object.keys(CarModel)[getRandomIndex(Object.keys(CarModel).length)];
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  for (let i = 0; i < countCars; i += 1) {
    cars.push({
      name: `${getRandomBrand()} ${getRandomModel()}`,
      color: getRandomColor()
    });
  }
  return cars;
};
const pagination_wrapper = "_pagination_wrapper_ywqiz_1";
const pagination_button = "_pagination_button_ywqiz_7";
const PAGINATION_STYLES = {
  pagination_wrapper,
  pagination_button
};
class PaginationView {
  constructor() {
    __publicField(this, "paginationWrapper");
    __publicField(this, "prevButton");
    __publicField(this, "nextButton");
    this.prevButton = this.createPrevButton();
    this.nextButton = this.createNextButton();
    this.paginationWrapper = this.createHTML();
  }
  getHTML() {
    return this.paginationWrapper;
  }
  getPrevButton() {
    return this.prevButton;
  }
  getNextButton() {
    return this.nextButton;
  }
  createPrevButton() {
    const text = "prev";
    this.prevButton = new ButtonModel({
      text,
      classes: [PAGINATION_STYLES.pagination_button]
    });
    this.prevButton.setDisabled();
    return this.prevButton;
  }
  createNextButton() {
    const text = "next";
    this.nextButton = new ButtonModel({
      text,
      classes: [PAGINATION_STYLES.pagination_button]
    });
    return this.nextButton;
  }
  createHTML() {
    this.paginationWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [PAGINATION_STYLES.pagination_wrapper]
    });
    this.paginationWrapper.append(
      this.prevButton.getHTML(),
      this.nextButton.getHTML()
    );
    return this.paginationWrapper;
  }
}
class PaginationModel {
  constructor() {
    __publicField(this, "singletonMediator");
    __publicField(this, "paginationView");
    __publicField(this, "pagination");
    this.singletonMediator = MediatorModel.getInstance();
    this.paginationView = new PaginationView();
    this.pagination = this.paginationView.getHTML();
    this.init();
  }
  getHTML() {
    return this.pagination;
  }
  prevButtonHandler() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    nextButton.setEnabled();
    const garagePageCountDec = StoreModel.getState().garagePage - 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountDec
    });
    if (StoreModel.getState().garagePage === 0) {
      const garagePageDefault = 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageDefault
      });
      prevButton.setDisabled();
    }
  }
  nextButtonHandler() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.setEnabled();
    const garagePageCountInc = StoreModel.getState().garagePage + 1;
    StoreModel.dispatch({
      type: ACTIONS.CHANGE_GARAGE_PAGE,
      payload: garagePageCountInc
    });
    if (StoreModel.getState().garagePage > StoreModel.getState().totalPages) {
      const garagePageDefault = StoreModel.getState().totalPages;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageDefault
      });
      nextButton.setDisabled();
    }
  }
  init() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.prevButtonHandler();
      this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, "");
    });
    nextButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.nextButtonHandler();
      this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, "");
    });
  }
}
class GaragePageModel {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "singletonMediator");
    __publicField(this, "garagePageView");
    __publicField(this, "createCarForm");
    __publicField(this, "removeButtons", []);
    __publicField(this, "changeCarForm");
    __publicField(this, "previewCar");
    __publicField(this, "pagination");
    __publicField(this, "page");
    this.parent = parent;
    this.singletonMediator = MediatorModel.getInstance();
    this.garagePageView = new GaragePageView(this.parent);
    this.createCarForm = new CreateCarFormModel();
    this.changeCarForm = new ChangeCarFormModel();
    this.previewCar = new PreviewCarModel();
    this.pagination = new PaginationModel();
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
    ApiModel.getCars(
      new Map(
        Object.entries({
          [QUERY_PARAMS.PAGE]: QUERY_VALUES.DEFAULT_PAGE,
          [QUERY_PARAMS.LIMIT]: QUERY_VALUES.DEFAULT_CARS_LIMIT
        })
      )
    ).then((data) => {
      if (data) {
        this.drawRaceTracks(data);
      }
      return data;
    }).catch(() => {
    });
    ApiModel.getCars(/* @__PURE__ */ new Map()).then((cars) => {
      if (cars) {
        StoreModel.dispatch({
          type: ACTIONS.GET_CARS,
          payload: cars
        });
        this.drawGarageTitle(cars.length);
        this.drawPageInfo();
      }
    }).catch(() => {
    });
  }
  drawGarageTitle(countCars) {
    const title = this.garagePageView.getGarageTitle();
    const textContent = `Garage (${countCars})`;
    title.textContent = textContent;
  }
  drawPageInfo() {
    const pageInfo = this.garagePageView.getPageInfo();
    ApiModel.getCars(/* @__PURE__ */ new Map()).then((cars) => {
      if (cars) {
        const maxPage = Math.ceil(
          cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT
        );
        StoreModel.dispatch({
          type: ACTIONS.setTotalGaragePages,
          payload: maxPage
        });
        const currentPage = StoreModel.getState().garagePage;
        const textContent = `Page: ${currentPage} / ${maxPage} `;
        pageInfo.textContent = textContent;
      }
    }).catch(() => {
    });
  }
  drawRaceTracks(cars) {
    if (this.garagePageView.getRaceTracksList().children.length < QUERY_VALUES.DEFAULT_CARS_LIMIT) {
      cars.forEach((car) => {
        const raceTrack = new RaceTrackModel(car);
        this.removeButtons.push(raceTrack.getView().getRemoveCarButton());
        this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
      });
    }
  }
  redrawCarsInfo() {
    const allCarsCount = StoreModel.getState().cars.length;
    this.drawGarageTitle(allCarsCount);
    this.drawPageInfo();
  }
  moreCarsHandler() {
    const carsCount = 100;
    const cars = createRandomDataCars(carsCount);
    cars.forEach((car) => {
      ApiModel.createCar(car).then(() => {
        StoreModel.dispatch({
          type: ACTIONS.GET_CARS,
          payload: [car]
        });
        this.drawRaceTracks([car]);
      }).then(() => {
        this.redrawCarsInfo();
      }).catch(() => {
      });
    });
  }
  drawCurrentPage() {
    const currentPage = StoreModel.getState().garagePage;
    const textContent = `Page: ${currentPage} / ${StoreModel.getState().totalPages} `;
    const pageInfo = this.garagePageView.getPageInfo();
    pageInfo.textContent = textContent;
    ApiModel.getCars(
      new Map(
        Object.entries({
          [QUERY_PARAMS.PAGE]: currentPage,
          [QUERY_PARAMS.LIMIT]: QUERY_VALUES.DEFAULT_CARS_LIMIT
        })
      )
    ).then((data) => {
      if (data) {
        this.garagePageView.getRaceTracksList().innerHTML = "";
        this.drawRaceTracks(data);
      }
      return data;
    }).catch(() => {
    });
  }
  init() {
    this.hide();
    this.getInitialDataCars();
    const moreCarsButton = this.garagePageView.getMoreCarsButton().getHTML();
    moreCarsButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.moreCarsHandler.bind(this)
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.NEW_CAR, () => {
      const allCars = StoreModel.getState().cars;
      const newCar = [allCars[allCars.length - 1]];
      this.redrawCarsInfo();
      this.drawRaceTracks(newCar);
    });
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_CAR,
      this.redrawCarsInfo.bind(this)
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.removeButtons.forEach((button) => {
        button.setEnabled();
      });
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.drawCurrentPage();
    });
    const raceTrackTopWrapper = this.garagePageView.getRaceTrackTopWrapper();
    const raceTrackBottomWrapper = this.garagePageView.getRaceTrackBottomWrapper();
    raceTrackBottomWrapper.append(this.pagination.getHTML());
    raceTrackTopWrapper.append(
      this.createCarForm.getHTML(),
      this.previewCar.getHTML(),
      this.changeCarForm.getHTML()
    );
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
  constructor(router) {
    __publicField(this, "headerView");
    __publicField(this, "header");
    __publicField(this, "router");
    this.router = router;
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
      this.router.navigateTo(PAGES_IDS.WINNERS_PAGE);
    });
    winnersButton.addEventListener(EVENT_NAMES.CLICK, () => {
      this.router.navigateTo(PAGES_IDS.GARAGE_PAGE);
    });
  }
}
class AppModel {
  constructor() {
    __publicField(this, "appView");
    __publicField(this, "parent");
    __publicField(this, "router");
    this.appView = new AppView();
    this.parent = this.appView.getHTML();
    const routes = this.initPages();
    this.router = new RouterModel(routes);
    const header2 = new HeaderModel(this.router);
    this.parent.prepend(header2.getHTML());
  }
  getHTML() {
    return this.parent;
  }
  initPages() {
    const garagePage = new GaragePageModel(this.parent);
    const winnersPage = new WinnersPageModel(this.parent);
    const pages = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: garagePage,
        [PAGES_IDS.GARAGE_PAGE]: garagePage,
        [PAGES_IDS.WINNERS_PAGE]: winnersPage
      })
    );
    return pages;
  }
}
const index = "";
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-5c4c1ab1.js.map
