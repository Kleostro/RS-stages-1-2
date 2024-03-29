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
  DIVIDER: "hr",
  TABLE: "table",
  THEAD: "thead",
  TBODY: "tbody",
  TFOOT: "tfoot",
  TR: "tr",
  TD: "td",
  TH: "th"
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
const MORE_COUNT_CARS = 100;
const GARAGE_BUTTONS_TEXT = {
  START_RACE: "Start race",
  RESET_RACE: "Reset race",
  CREATE_MORE_CARS: "Create 100 cars"
};
const WINNERS_SVG_DETAILS = {
  SVG_URL: "http://www.w3.org/2000/svg",
  CAR_ID: "car"
};
const THEAD_TD_IDS = ["id", "car", "name", "wins", "time"];
const ROUTER_DETAILS = {
  DEFAULT_SEGMENT: "/",
  NEXT_SEGMENT: 1,
  PATH_SEGMENTS_TO_KEEP: 2,
  CURRENT_SEGMENT: 0
};
const _MediatorModel = class _MediatorModel {
  constructor() {
    __publicField(this, "listeners", /* @__PURE__ */ new Map());
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
  CHANGE_PAGE: "changePage",
  GET_CURRENT_CARS: "getCurrentCars",
  GET_CURRENT_WINNERS: "getCurrentWinners",
  DELETE_CAR: "deleteCar",
  DELETE_WINNER: "deleteWinner",
  CREATE_CAR: "createCar",
  CREATE_WINNER: "createWinner",
  CREATE_MORE_CARS: "createMoreCars",
  SELECT_CAR: "selectCar",
  UPDATE_CAR: "updateCar",
  CHANGE_COLOR_PREVIEW_CAR: "changeColorPreviewCar",
  CHANGE_TOTAL_GARAGE_PAGES: "changeTotalGaragePages",
  CHANGE_NAME_PREVIEW_CAR: "changeNamePreviewCar",
  CHANGE_GARAGE_PAGE: "changeGaragePage",
  CHANGE_WINNERS_PAGE: "changeWinnersPage",
  START_RACE: "startRace",
  RESET_RACE: "resetRace",
  NEW_WINNER: "newWinner",
  CAR_BROKEN: "carBroken",
  RESET_CURRENT_CAR: "resetCurrentCar",
  EMPTY_RACE: "emptyRace",
  SINGLE_RACE_START: "singleRaceStart",
  SINGLE_RACE_RESET: "singleRaceReset",
  DRAW_NEW_WINNER: "drawNewWinner"
};
class RouterModel {
  constructor(pages) {
    __publicField(this, "pages");
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    this.pages = pages;
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname.split(ROUTER_DETAILS.DEFAULT_SEGMENT).slice(
        ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT
      ).join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.navigateTo(currentPath);
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_PAGE,
        currentPath.split(ROUTER_DETAILS.DEFAULT_SEGMENT).join()
      );
    });
    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      const currentPath = window.location.pathname.split(ROUTER_DETAILS.DEFAULT_SEGMENT).slice(
        ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT
      ).join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.handleRequest(currentPath);
    });
  }
  navigateTo(route) {
    this.handleRequest(route);
    const pathnameApp = window.location.pathname.split(ROUTER_DETAILS.DEFAULT_SEGMENT).slice(
      ROUTER_DETAILS.NEXT_SEGMENT,
      ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT
    ).join(ROUTER_DETAILS.DEFAULT_SEGMENT);
    const url = `/${pathnameApp}/${route}`;
    window.history.pushState({}, "", url);
  }
  handleRequest(path) {
    const pathParts = path.split(ROUTER_DETAILS.DEFAULT_SEGMENT);
    const hasRoute = this.pages.has(pathParts.join(""));
    if (!hasRoute) {
      window.location.pathname = `winners/${PAGES_IDS.DEFAULT_PAGE}`;
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_PAGE,
        PAGES_IDS.DEFAULT_PAGE
      );
      return;
    }
    this.singletonMediator.notify(
      MEDIATOR_EVENTS.CHANGE_PAGE,
      pathParts.join()
    );
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
  ASC: "ASC",
  DESC: "DESC",
  WINS: "wins",
  TIME: "time",
  ID: "id",
  DEFAULT_PAGE: 1,
  DEFAULT_CARS_LIMIT: 7,
  DEFAULT_WINNERS_LIMIT: 10,
  NO_CARS_LIMIT: 0,
  NO_WINNERS_LIMIT: 0,
  STARTED: "started",
  STOPPED: "stopped",
  DRIVE: "drive"
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
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};
const API_ERRORS = {
  INCORRECT_PARAMS: "Incorrect params"
};
const INITIAL_DATA = {
  cars: [],
  winners: [],
  garagePage: 1,
  totalGaragePages: 1,
  winnersPage: 1,
  totalWinnersPages: 1
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case "getCars":
      return {
        ...state,
        cars: [...action.payload]
      };
    case "getWinners":
      return {
        ...state,
        winners: [...state.winners, ...action.payload]
      };
    case "addNewCar":
      return {
        ...state,
        cars: [...state.cars, ...action.payload]
      };
    case "deleteCar":
      return {
        ...state,
        cars: [...action.payload]
      };
    case "setTotalGaragePages":
      return {
        ...state,
        totalGaragePages: action.payload
      };
    case "changeGaragePage":
      return {
        ...state,
        garagePage: action.payload
      };
    case "setTotalWinnersPages":
      return {
        ...state,
        totalWinnersPages: action.payload
      };
    case "changeWinnersPage":
      return {
        ...state,
        winnersPage: action.payload
      };
    default:
      return state;
  }
};
const _StoreModel = class _StoreModel {
  static dispatch(action) {
    _StoreModel.state = _StoreModel.rootReducer(_StoreModel.state, action);
    _StoreModel.listeners.forEach((_, key) => {
      if (key in _StoreModel.state) {
        const currentListener = _StoreModel.listeners.get(key);
        if (currentListener) {
          currentListener();
        }
      }
    });
    return action;
  }
  static getState() {
    return structuredClone(_StoreModel.state);
  }
  static subscribe(key, listener) {
    _StoreModel.listeners.set(key, listener);
    return () => {
      _StoreModel.listeners.delete(key);
    };
  }
};
__publicField(_StoreModel, "listeners", /* @__PURE__ */ new Map());
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
    this.view = new ButtonView(params);
  }
  getHTML() {
    return this.view.getHTML();
  }
  setDisabled() {
    this.view.getHTML().disabled = IS_DISABLED.DISABLED;
  }
  setEnabled() {
    this.view.getHTML().disabled = IS_DISABLED.ENABLED;
  }
}
const GARAGE_PAGE_STYLES = {
  "garage-page": "_garage-page_oojhp_2",
  "garage-page_top-wrapper": "_garage-page_top-wrapper_oojhp_6",
  "garage-page_bottom-wrapper": "_garage-page_bottom-wrapper_oojhp_18",
  "garage-page_race-result": "_garage-page_race-result_oojhp_24",
  "garage-page_race-result_show": "_garage-page_race-result_show_oojhp_39",
  "garage-page_list": "_garage-page_list_oojhp_42",
  "garage-page_title": "_garage-page_title_oojhp_51",
  "garage-page--hidden": "_garage-page--hidden_oojhp_61",
  "garage-page_more-button": "_garage-page_more-button_oojhp_64",
  "garage-page_race-button": "_garage-page_race-button_oojhp_64",
  "garage-page_more-button_start": "_garage-page_more-button_start_oojhp_77",
  "garage-page_race-button_start": "_garage-page_race-button_start_oojhp_77",
  "garage-page_more-button_reset": "_garage-page_more-button_reset_oojhp_82",
  "garage-page_race-button_reset": "_garage-page_race-button_reset_oojhp_82"
};
class GaragePageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "raceTrackTopWrapper");
    __publicField(this, "raceTrackBottomWrapper");
    __publicField(this, "garageTitle");
    __publicField(this, "moreCarsButton");
    __publicField(this, "raceTracksList");
    __publicField(this, "startRaceButton");
    __publicField(this, "resetRaceButton");
    __publicField(this, "raceResult");
    __publicField(this, "page");
    this.parent = parent;
    this.moreCarsButton = this.createMoreCarsButton();
    this.startRaceButton = this.createStartRaceButton();
    this.resetRaceButton = this.createResetRaceButton();
    this.raceTrackTopWrapper = this.createRaceTrackTopWrapper();
    this.garageTitle = this.createGarageTitle();
    this.raceResult = this.createRaceResult();
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
  clearRaceTracksList() {
    this.raceTracksList.innerHTML = "";
  }
  getGarageTitle() {
    return this.garageTitle;
  }
  getRaceTracksList() {
    return this.raceTracksList;
  }
  getMoreCarsButton() {
    return this.moreCarsButton;
  }
  getStartRaceButton() {
    return this.startRaceButton;
  }
  getResetRaceButton() {
    return this.resetRaceButton;
  }
  getRaceResult() {
    return this.raceResult;
  }
  createGarageTitle() {
    this.garageTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_title"]]
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
  createMoreCarsButton() {
    this.moreCarsButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.CREATE_MORE_CARS,
      classes: [GARAGE_PAGE_STYLES["garage-page_more-button"]]
    });
    return this.moreCarsButton;
  }
  createRaceTrackTopWrapper() {
    this.raceTrackTopWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_top-wrapper"]]
    });
    this.raceTrackTopWrapper.append(
      this.moreCarsButton.getHTML(),
      this.startRaceButton.getHTML(),
      this.resetRaceButton.getHTML()
    );
    return this.raceTrackTopWrapper;
  }
  createRaceTrackBottomWrapper() {
    this.raceTrackBottomWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_bottom-wrapper"]]
    });
    return this.raceTrackBottomWrapper;
  }
  createStartRaceButton() {
    this.startRaceButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.START_RACE,
      classes: [
        GARAGE_PAGE_STYLES["garage-page_race-button"],
        GARAGE_PAGE_STYLES["garage-page_race-button_start"]
      ]
    });
    return this.startRaceButton;
  }
  createResetRaceButton() {
    this.resetRaceButton = new ButtonModel({
      text: GARAGE_BUTTONS_TEXT.RESET_RACE,
      classes: [
        GARAGE_PAGE_STYLES["garage-page_race-button"],
        GARAGE_PAGE_STYLES["garage-page_race-button_reset"]
      ]
    });
    return this.resetRaceButton;
  }
  createRaceResult() {
    this.raceResult = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [GARAGE_PAGE_STYLES["garage-page_race-result"]]
    });
    return this.raceResult;
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
      this.raceTracksList,
      this.raceResult
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
    let url = `${API_URLS.CARS}`;
    if (pageParam && limitParam) {
      url = `${API_URLS.CARS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}`;
    }
    return this.fetchData(url, API_METHODS.GET);
  }
  static async getCarById(id) {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData(url, API_METHODS.GET);
  }
  static async getWinners(params) {
    const pageParam = params.get(QUERY_PARAMS.PAGE);
    const limitParam = params.get(QUERY_PARAMS.LIMIT);
    const sortParam = params.get(QUERY_PARAMS.SORT) ?? QUERY_VALUES.ID;
    const orderParam = params.get(QUERY_PARAMS.ORDER) ?? QUERY_VALUES.ASC;
    let url = `${API_URLS.WINNERS}`;
    if (pageParam && limitParam) {
      url = `${API_URLS.WINNERS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}&${QUERY_PARAMS.SORT}=${sortParam}&${QUERY_PARAMS.ORDER}=${orderParam}`;
    }
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
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}&${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async stopCarEngine(params) {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}&${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async driveCarEngine(params) {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}&${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData(url, API_METHODS.PATCH);
  }
  static async fetchData(url, method, body) {
    return fetch(url, {
      method,
      headers: {
        [API_HEADERS.CONTENT_TYPE]: API_HEADERS.APPLICATION_JSON
      },
      body: body ? JSON.stringify(body) : null
    }).then((response) => response.json()).then((json) => json).catch(() => {
      throw new Error(`${STATUS_CODES.INTERNAL_SERVER_ERROR}`);
    });
  }
}
const ACTIONS = {
  GET_CARS: "getCars",
  GET_WINNERS: "getWinners",
  ADD_NEW_CAR: "addNewCar",
  DELETE_CAR: "deleteCar",
  CHANGE_GARAGE_PAGE: "changeGaragePage",
  SET_TOTAL_GARAGE_PAGES: "setTotalGaragePages",
  CHANGE_WINNERS_PAGE: "changeWinnersPage",
  SET_TOTAL_WINNERS_PAGES: "setTotalWinnersPages"
};
const RACE_TRACK_STYLES = {
  "race-track": "_race-track_1ss8h_1",
  "race-track__top-wrapper": "_race-track__top-wrapper_1ss8h_6",
  "race-track__bottom-wrapper": "_race-track__bottom-wrapper_1ss8h_11",
  "race-track__car-svg-wrapper": "_race-track__car-svg-wrapper_1ss8h_18",
  "race-track_car-button": "_race-track_car-button_1ss8h_24",
  "race-track_engine-button": "_race-track_engine-button_1ss8h_42",
  "race-track__name-car": "_race-track__name-car_1ss8h_61",
  "race-track__flag-img": "_race-track__flag-img_1ss8h_72",
  "race-track__fire-img": "_race-track__fire-img_1ss8h_84",
  "race-track__fire-img--active": "_race-track__fire-img--active_1ss8h_93"
};
const RACE_TRACK_BUTTON_TEXT = {
  SELECT_CAR: "Select",
  REMOVE_CAR: "Remove",
  START_ENGINE: "A",
  STOP_ENGINE: "B"
};
const SINGLE_RACE = "single";
const RACE_TRACK_SVG_DETAILS = {
  SVG_URL: "http://www.w3.org/2000/svg",
  CAR_ID: "car",
  FLAG_ID: "race-flag",
  FIRE_ID: "fire"
};
const TRANSITION_STATE = {
  START: "translateX(0)"
};
const FILL = "forwards";
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
    __publicField(this, "fireSVG");
    __publicField(this, "carSVGWrapper");
    __publicField(this, "raceTrack");
    this.carData = carData;
    this.selectCarButton = this.createSelectCarButton();
    this.removeCarButton = this.createRemoveCarButton();
    this.nameCarSpan = this.createNameCarSpan();
    this.startEngineButton = this.createStartEngineButton();
    this.stopEngineButton = this.createStopEngineButton();
    this.carSVG = this.createCarSVG();
    this.fireSVG = this.createFireSVG();
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
  getStartEngineButton() {
    return this.startEngineButton;
  }
  getStopEngineButton() {
    return this.stopEngineButton;
  }
  getNameCarSpan() {
    return this.nameCarSpan;
  }
  getCarSvgWrapper() {
    return this.carSVGWrapper;
  }
  getCarSvg() {
    return this.carSVG;
  }
  getFireSvg() {
    return this.fireSVG;
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
  createFireSVG() {
    this.fireSVG = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    this.fireSVG.classList.add(RACE_TRACK_STYLES["race-track__fire-img"]);
    this.fireSVG.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.FIRE_ID));
    return this.fireSVG;
  }
  createCarSVG() {
    this.carSVG = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    this.carSVG.classList.add(RACE_TRACK_STYLES["race-track__car-img"]);
    this.carSVG.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.CAR_ID));
    changeSVGFill(this.carSVG, this.carData.color);
    return this.carSVG;
  }
  createCarSVGWrapper() {
    this.carSVGWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [RACE_TRACK_STYLES["race-track__car-svg-wrapper"]]
    });
    this.carSVGWrapper.append(this.carSVG, this.fireSVG);
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
    const raceFlag = document.createElementNS(
      RACE_TRACK_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    raceFlag.classList.add(RACE_TRACK_STYLES["race-track__flag-img"]);
    raceFlag.appendChild(createSVGUse(RACE_TRACK_SVG_DETAILS.FLAG_ID));
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
const loader = "_loader_146rx_1";
const spin = "_spin_146rx_1";
const LOADER_STYLES = {
  loader,
  spin
};
class LoaderView {
  constructor() {
    __publicField(this, "loader");
    this.loader = this.createHTML();
  }
  getHTML() {
    return this.loader;
  }
  createHTML() {
    this.loader = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOADER_STYLES.loader]
    });
    return this.loader;
  }
}
class LoaderModel {
  constructor() {
    __publicField(this, "loaderView");
    this.loaderView = new LoaderView();
  }
  getHTML() {
    return this.loaderView.getHTML();
  }
}
const _Winner = class _Winner {
  constructor(name, wins, time, id) {
    __publicField(this, "id");
    __publicField(this, "wins");
    __publicField(this, "time");
    __publicField(this, "name");
    this.name = name;
    this.wins = wins;
    this.time = time;
    this.id = id;
  }
};
__publicField(_Winner, "isWinner", (winner) => winner instanceof _Winner);
let Winner = _Winner;
class RaceTrackModel {
  constructor(carData) {
    __publicField(this, "carData");
    __publicField(this, "carAnimation", null);
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "raceTrackView");
    __publicField(this, "raceTrack");
    this.carData = carData;
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
  async startEngineHandler(mod) {
    if (!this.carData.id) {
      return;
    }
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STARTED);
    const loader2 = new LoaderModel();
    this.raceTrackView.getStartEngineButton().getHTML().append(loader2.getHTML());
    await ApiModel.stopCarEngine(queryParams).catch(() => {
    });
    await ApiModel.startCarEngine(queryParams).then((data) => {
      if (data) {
        loader2.getHTML().remove();
        const duration = data.distance / data.velocity;
        this.carAnimation = this.createCarAnimation(duration);
        this.driveCarEngine(duration, mod);
      }
    }).catch(() => {
    });
  }
  createCarAnimation(duration) {
    const raceTrackWidth = this.raceTrack.clientWidth;
    const carWidth = this.raceTrackView.getCarSvg().clientWidth;
    const startEngineButtonWidth = this.raceTrackView.getStartEngineButton().getHTML().clientWidth;
    const stopEngineButtonWidth = this.raceTrackView.getStopEngineButton().getHTML().clientWidth;
    const carXPosition = raceTrackWidth - carWidth - startEngineButtonWidth - stopEngineButtonWidth;
    const endTransition = `translateX(${carXPosition}px)`;
    return this.raceTrackView.getCarSvgWrapper().animate(
      [{ transform: TRANSITION_STATE.START }, { transform: endTransition }],
      {
        duration,
        fill: FILL
      }
    );
  }
  switchEngineButtons(mod) {
    this.raceTrackView.getStartEngineButton().setDisabled();
    this.raceTrackView.getStopEngineButton().setEnabled();
    if (!mod) {
      this.raceTrackView.getStopEngineButton().setDisabled();
    }
  }
  getWinnerData(duration) {
    const hundred = 100;
    const ten = 10;
    const time = Math.ceil(duration / hundred) / ten;
    return new Winner(this.carData.name, 1, time, this.carData.id);
  }
  visuallyBrokenCar() {
    var _a;
    this.raceTrackView.getFireSvg().classList.add(RACE_TRACK_STYLES["race-track__fire-img--active"]);
    (_a = this.carAnimation) == null ? void 0 : _a.pause();
  }
  driveCarEngine(duration, mod) {
    if (!this.carData.id) {
      return;
    }
    const driveQueryParams = /* @__PURE__ */ new Map();
    driveQueryParams.set(QUERY_PARAMS.ID, this.carData.id);
    driveQueryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.DRIVE);
    this.switchEngineButtons(mod);
    if (!mod) {
      ApiModel.driveCarEngine(driveQueryParams).then(() => {
        this.singletonMediator.notify(
          MEDIATOR_EVENTS.NEW_WINNER,
          this.getWinnerData(duration)
        );
      }).catch((error) => {
        if (Number(error.message) === STATUS_CODES.INTERNAL_SERVER_ERROR && this.carData.id) {
          this.visuallyBrokenCar();
          ApiModel.stopCarEngine(
            new Map(
              Object.entries({
                [QUERY_PARAMS.ID]: this.carData.id,
                [QUERY_PARAMS.STATUS]: QUERY_VALUES.STOPPED
              })
            )
          ).catch(() => {
          });
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CAR_BROKEN,
            this.carData
          );
        }
      });
    }
  }
  stopEngineHandler(mod) {
    var _a;
    (_a = this.carAnimation) == null ? void 0 : _a.pause();
    if (!this.carData.id) {
      return;
    }
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.ID, this.carData.id);
    queryParams.set(QUERY_PARAMS.STATUS, QUERY_VALUES.STOPPED);
    const loader2 = new LoaderModel();
    this.raceTrackView.getStopEngineButton().getHTML().append(loader2.getHTML());
    this.raceTrackView.getFireSvg().classList.remove(RACE_TRACK_STYLES["race-track__fire-img--active"]);
    ApiModel.stopCarEngine(queryParams).then(() => {
      var _a2;
      loader2.getHTML().remove();
      (_a2 = this.carAnimation) == null ? void 0 : _a2.cancel();
      if (!mod) {
        this.singletonMediator.notify(MEDIATOR_EVENTS.RESET_CURRENT_CAR, "");
      } else {
        this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_RESET, "");
        this.raceTrackView.getStartEngineButton().setEnabled();
        this.raceTrackView.getStopEngineButton().setDisabled();
      }
    }).catch(() => {
    });
  }
  deleteCarHandler() {
    if (this.carData.id) {
      const loader2 = new LoaderModel();
      this.raceTrackView.getRemoveCarButton().getHTML().append(loader2.getHTML());
      ApiModel.deleteCarById(this.carData.id).then(() => {
        loader2.getHTML().remove();
        const { cars } = StoreModel.getState();
        const carsWithoutDeleted = cars.filter(
          (car) => car.id !== this.carData.id
        );
        StoreModel.dispatch({
          type: ACTIONS.DELETE_CAR,
          payload: carsWithoutDeleted
        });
        this.raceTrack.remove();
        this.singletonMediator.notify(MEDIATOR_EVENTS.DELETE_CAR, "");
      }).catch(() => {
      });
      ApiModel.getWinnerById(this.carData.id).then((winner) => {
        if (winner && winner.id) {
          ApiModel.deleteWinnerById(winner.id).then(() => {
            this.singletonMediator.notify(
              MEDIATOR_EVENTS.DELETE_WINNER,
              ""
            );
          }).catch(() => {
          });
        }
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
  resetRace() {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton();
    const stopEngineButton = this.raceTrackView.getStopEngineButton();
    const startEngineButton = this.raceTrackView.getStartEngineButton();
    removeCarButton.setEnabled();
    selectCarButton.setEnabled();
    stopEngineButton.setDisabled();
    startEngineButton.setEnabled();
  }
  subscribeToMediator() {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, (params) => {
      if (this.carData.id === params) {
        this.updateCarView();
        removeCarButton.setEnabled();
      }
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.EMPTY_RACE, () => {
      this.resetRace();
    });
  }
  setHandlerToButtons() {
    const removeCarButton = this.raceTrackView.getRemoveCarButton();
    const selectCarButton = this.raceTrackView.getSelectCarButton();
    const startEngineButton = this.raceTrackView.getStartEngineButton().getHTML();
    const stopEngineButton = this.raceTrackView.getStopEngineButton();
    removeCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, this.deleteCarHandler.bind(this));
    selectCarButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      removeCarButton.setDisabled();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.SELECT_CAR,
        this.carData.id
      );
    });
    startEngineButton.addEventListener(EVENT_NAMES.CLICK, () => {
      this.startEngineHandler(SINGLE_RACE).catch(() => {
      });
      this.singletonMediator.notify(MEDIATOR_EVENTS.SINGLE_RACE_START, "");
    });
    stopEngineButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.stopEngineHandler(SINGLE_RACE);
    });
    this.subscribeToMediator();
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
    this.view = new InputView(attrs);
  }
  getHTML() {
    return this.view.getHTML();
  }
  setDisabled() {
    this.view.getHTML().disabled = IS_DISABLED.DISABLED;
  }
  setEnabled() {
    this.view.getHTML().disabled = IS_DISABLED.ENABLED;
  }
  clear() {
    this.view.getHTML().value = "";
  }
}
const form$1 = "_form_1k1dk_1";
const CREATE_CAR_FORM_STYLES = {
  form: form$1,
  "form_submit-button": "_form_submit-button_1k1dk_39"
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
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "createCarFormView", new CreateCarFormView());
    this.init();
  }
  getHTML() {
    return this.createCarFormView.getHTML();
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
    const loader2 = new LoaderModel();
    submitButton.getHTML().append(loader2.getHTML());
    await ApiModel.createCar(newCarData);
    const carsWithoutCreated = await ApiModel.getCars(/* @__PURE__ */ new Map());
    loader2.getHTML().remove();
    if (!carsWithoutCreated) {
      return;
    }
    StoreModel.dispatch({
      type: ACTIONS.GET_CARS,
      payload: carsWithoutCreated
    });
    carNameInput.clear();
    const initColor = "#000000";
    carColorInput.getHTML().value = initColor;
    submitButton.setDisabled();
    this.singletonMediator.notify(MEDIATOR_EVENTS.CREATE_CAR, "");
  }
  allDisabled() {
    const carNameInput = this.createCarFormView.getCarNameInput();
    const carColorInput = this.createCarFormView.getCarColorInput();
    const submitButton = this.createCarFormView.getSubmitButton();
    carNameInput.setDisabled();
    carColorInput.setDisabled();
    submitButton.setDisabled();
  }
  init() {
    const carNameInput = this.createCarFormView.getCarNameInput();
    const carColorInput = this.createCarFormView.getCarColorInput();
    carNameInput.getHTML().addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
        carNameInput.getHTML().value
      );
    });
    carColorInput.getHTML().addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
        carColorInput.getHTML().value
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
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.START_RACE, () => {
      this.allDisabled();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_START, () => {
      this.allDisabled();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_RESET, () => {
      carColorInput.setEnabled();
      carNameInput.setEnabled();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.EMPTY_RACE, () => {
      carColorInput.setEnabled();
      carNameInput.setEnabled();
    });
  }
}
const PREVIEW_CAR_STYLES = {
  "preview-car": "_preview-car_15z8n_1",
  "preview-car_name": "_preview-car_name_15z8n_7",
  "preview-car_img": "_preview-car_img_15z8n_19"
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
    __publicField(this, "previewCarView", new PreviewCarView());
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    this.init();
  }
  getHTML() {
    return this.previewCarView.getHTML();
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
    const attr = "fill";
    this.previewCarView.getCarSVG().removeAttribute(attr);
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
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.setInitialStateFields();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.setInitialStateFields();
    });
  }
}
const form = "_form_1ncl9_1";
const CHANGE_CAR_FORM_STYLES = {
  form,
  "form_submit-button": "_form_submit-button_1ncl9_39"
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
    const buttonText = "Update";
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
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "selectCar", null);
    __publicField(this, "changeCarFormView", new ChangeCarFormView());
    this.init();
  }
  getHTML() {
    return this.changeCarFormView.getHTML();
  }
  getSelectCar(id) {
    const loader2 = new LoaderModel();
    this.changeCarFormView.getSubmitButton().getHTML().append(loader2.getHTML());
    ApiModel.getCarById(id).then((car) => {
      if (car) {
        loader2.getHTML().remove();
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
    const loader2 = new LoaderModel();
    this.changeCarFormView.getSubmitButton().getHTML().append(loader2.getHTML());
    await ApiModel.updateCarById(this.selectCar.id, newCarData);
    const carWithoutChange = await ApiModel.getCarById(this.selectCar.id);
    loader2.getHTML().remove();
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
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SELECT_CAR, (params) => {
      if (typeof params === "number") {
        this.getSelectCar(params);
      }
    });
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
const pagination_wrapper = "_pagination_wrapper_9d82z_1";
const pagination_current_page = "_pagination_current_page_9d82z_10";
const pagination_button = "_pagination_button_9d82z_15";
const PAGINATION_STYLES = {
  pagination_wrapper,
  pagination_current_page,
  pagination_button
};
class PaginationView {
  constructor() {
    __publicField(this, "paginationWrapper");
    __publicField(this, "currentPageSpan");
    __publicField(this, "prevButton");
    __publicField(this, "nextButton");
    this.currentPageSpan = this.createCurrentPageSpan();
    this.prevButton = this.createPrevButton();
    this.nextButton = this.createNextButton();
    this.paginationWrapper = this.createHTML();
  }
  getHTML() {
    return this.paginationWrapper;
  }
  getCurrentPageSpan() {
    return this.currentPageSpan;
  }
  getPrevButton() {
    return this.prevButton;
  }
  getNextButton() {
    return this.nextButton;
  }
  createCurrentPageSpan() {
    this.currentPageSpan = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [PAGINATION_STYLES.pagination_current_page]
    });
    return this.currentPageSpan;
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
      this.currentPageSpan,
      this.prevButton.getHTML(),
      this.nextButton.getHTML()
    );
    return this.paginationWrapper;
  }
}
const STORE_FIELDS = {
  CARS: "cars",
  WINNERS: "winners",
  GARAGE_PAGE: "garagePage",
  WINNERS_PAGE: "winnersPage",
  TOTAL_GARAGE_PAGES: "totalGaragePages",
  TOTAL_WINNERS_PAGES: "totalWinnersPages"
};
class PaginationModel {
  constructor(pageID) {
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "pageID");
    __publicField(this, "paginationView", new PaginationView());
    __publicField(this, "pagination");
    this.pageID = pageID;
    this.pagination = this.paginationView.getHTML();
    this.init();
  }
  getHTML() {
    return this.pagination;
  }
  loadDataAndSetPageInfo(data, limit) {
    let type;
    if (this.pageID === PAGES_IDS.WINNERS_PAGE) {
      type = ACTIONS.SET_TOTAL_WINNERS_PAGES;
    } else {
      type = ACTIONS.SET_TOTAL_GARAGE_PAGES;
    }
    if (data) {
      const pageSpan = this.paginationView.getCurrentPageSpan();
      const maxPage = Math.ceil(data.length / limit);
      StoreModel.dispatch({
        type,
        payload: maxPage
      });
      const currentPage = type === ACTIONS.SET_TOTAL_GARAGE_PAGES ? StoreModel.getState().garagePage : StoreModel.getState().winnersPage;
      const textContent = `Page: ${currentPage} / ${maxPage} `;
      pageSpan.textContent = textContent;
    }
  }
  initPageInfo() {
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      ApiModel.getCars(/* @__PURE__ */ new Map()).then((cars) => {
        if (cars) {
          this.loadDataAndSetPageInfo(cars, QUERY_VALUES.DEFAULT_CARS_LIMIT);
        }
      }).catch(() => {
      });
    } else {
      ApiModel.getWinners(/* @__PURE__ */ new Map()).then((winners) => {
        if (winners) {
          this.loadDataAndSetPageInfo(
            winners,
            QUERY_VALUES.DEFAULT_WINNERS_LIMIT
          );
        }
      }).catch(() => {
      });
    }
  }
  redrawPageInfo(currentPage) {
    const pageSpan = this.paginationView.getCurrentPageSpan();
    let maxPage = 0;
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      maxPage = StoreModel.getState().totalGaragePages;
    } else {
      maxPage = StoreModel.getState().totalWinnersPages;
    }
    const textContent = `Page: ${currentPage} / ${maxPage} `;
    pageSpan.textContent = textContent;
  }
  prevButtonHandler() {
    const nextButton = this.paginationView.getNextButton();
    nextButton.setEnabled();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const garagePageCountDec = StoreModel.getState().garagePage - 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageCountDec
      });
      this.checkButtons();
      this.redrawPageInfo(garagePageCountDec);
    } else {
      const winnersPageCountDec = StoreModel.getState().winnersPage - 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_WINNERS_PAGE,
        payload: winnersPageCountDec
      });
      this.checkButtons();
      this.redrawPageInfo(winnersPageCountDec);
    }
  }
  nextButtonHandler() {
    const prevButton = this.paginationView.getPrevButton();
    prevButton.setEnabled();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const garagePageCountInc = StoreModel.getState().garagePage + 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: garagePageCountInc
      });
      this.checkButtons();
      this.redrawPageInfo(garagePageCountInc);
    } else {
      const winnersPageCountInc = StoreModel.getState().winnersPage + 1;
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_WINNERS_PAGE,
        payload: winnersPageCountInc
      });
      this.checkButtons();
      this.redrawPageInfo(winnersPageCountInc);
    }
  }
  checkButtons() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      const { garagePage } = StoreModel.getState();
      const { totalGaragePages } = StoreModel.getState();
      if (garagePage === totalGaragePages || totalGaragePages === 0) {
        nextButton.setDisabled();
      } else {
        nextButton.setEnabled();
      }
      if (StoreModel.getState().garagePage === 1) {
        prevButton.setDisabled();
      } else {
        prevButton.setEnabled();
      }
    } else {
      const { winnersPage } = StoreModel.getState();
      const { totalWinnersPages } = StoreModel.getState();
      if (winnersPage === totalWinnersPages || totalWinnersPages === 0) {
        nextButton.setDisabled();
      } else {
        nextButton.setEnabled();
      }
      if (StoreModel.getState().winnersPage === 1) {
        prevButton.setDisabled();
      } else {
        prevButton.setEnabled();
      }
    }
  }
  allDisabledButton() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.setDisabled();
    nextButton.setDisabled();
  }
  setSubscribeToMediatorGarage() {
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.initPageInfo();
      this.checkButtons();
    });
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
      () => {
        this.initPageInfo();
        this.checkButtons();
      }
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.initPageInfo();
      this.checkButtons();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.checkButtons();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.START_RACE, () => {
      this.allDisabledButton();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.EMPTY_RACE, () => {
      this.checkButtons();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_START, () => {
      prevButton.setDisabled();
      nextButton.setDisabled();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_RESET, () => {
      this.checkButtons();
    });
  }
  setSubscribeToMediatorWinners() {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_WINNER, () => {
      this.initPageInfo();
      this.checkButtons();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DRAW_NEW_WINNER, () => {
      this.initPageInfo();
      this.checkButtons();
    });
  }
  init() {
    this.initPageInfo();
    this.checkButtons();
    const prevButton = this.paginationView.getPrevButton();
    const nextButton = this.paginationView.getNextButton();
    prevButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.prevButtonHandler();
      if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, "");
      } else {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE, "");
      }
    });
    nextButton.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
      this.nextButtonHandler();
      if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, "");
      } else {
        this.singletonMediator.notify(MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE, "");
      }
    });
    if (this.pageID === PAGES_IDS.GARAGE_PAGE) {
      this.setSubscribeToMediatorGarage();
    } else {
      this.setSubscribeToMediatorWinners();
    }
    StoreModel.subscribe(STORE_FIELDS.WINNERS_PAGE, () => {
      this.initPageInfo();
      this.checkButtons();
    });
  }
}
class GaragePageModel {
  constructor(parent) {
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "garagePageView");
    __publicField(this, "raceTracks", []);
    __publicField(this, "createCarForm", new CreateCarFormModel());
    __publicField(this, "removeButtons", []);
    __publicField(this, "countCarsInRace", 0);
    __publicField(this, "changeCarForm", new ChangeCarFormModel());
    __publicField(this, "isWinner", false);
    __publicField(this, "winner", {
      id: 0,
      wins: 0,
      time: 0,
      name: ""
    });
    __publicField(this, "previewCar", new PreviewCarModel());
    __publicField(this, "pagination", new PaginationModel(
      PAGES_IDS.GARAGE_PAGE
    ));
    this.garagePageView = new GaragePageView(parent);
    this.init();
  }
  getHTML() {
    return this.garagePageView.getHTML();
  }
  visible() {
    this.garagePageView.getHTML().classList.remove(GARAGE_PAGE_STYLES["garage-page--hidden"]);
  }
  hidden() {
    this.garagePageView.getHTML().classList.add(GARAGE_PAGE_STYLES["garage-page--hidden"]);
  }
  getInitialDataCars() {
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.PAGE, QUERY_VALUES.DEFAULT_PAGE);
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    ApiModel.getCars(queryParams).then((cars) => {
      if (cars) {
        this.drawRaceTracks(cars);
      }
    }).catch(() => {
    });
    this.getAllCars();
  }
  getAllCars() {
    const loader2 = new LoaderModel();
    this.garagePageView.getGarageTitle().append(loader2.getHTML());
    ApiModel.getCars(/* @__PURE__ */ new Map()).then((cars) => {
      if (cars) {
        StoreModel.dispatch({
          type: ACTIONS.GET_CARS,
          payload: cars
        });
        StoreModel.dispatch({
          type: ACTIONS.SET_TOTAL_GARAGE_PAGES,
          payload: Math.ceil(cars.length / QUERY_VALUES.DEFAULT_CARS_LIMIT)
        });
        this.singletonMediator.notify(
          MEDIATOR_EVENTS.CHANGE_TOTAL_GARAGE_PAGES,
          ""
        );
        this.drawGarageTitle();
      }
    }).catch(() => {
    });
  }
  drawGarageTitle() {
    const title = this.garagePageView.getGarageTitle();
    const countCars = StoreModel.getState().cars.length;
    const textContent = `Garage (${countCars})`;
    title.textContent = textContent;
  }
  drawRaceTracks(cars) {
    this.raceTracks = [];
    const countCarsToList = this.garagePageView.getRaceTracksList().children.length;
    if (countCarsToList < QUERY_VALUES.DEFAULT_CARS_LIMIT) {
      cars.forEach((car) => {
        const raceTrack = new RaceTrackModel(car);
        this.raceTracks.push(raceTrack);
        this.removeButtons.push(raceTrack.getView().getRemoveCarButton());
        this.garagePageView.getRaceTracksList().append(raceTrack.getHTML());
      });
    }
  }
  moreCarsHandler() {
    const cars = createRandomDataCars(MORE_COUNT_CARS);
    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: cars
    });
    cars.forEach((car) => {
      this.garagePageView.getStartRaceButton().setDisabled();
      ApiModel.createCar(car).then(() => {
        this.drawRaceTracks([car]);
        this.singletonMediator.notify(MEDIATOR_EVENTS.CREATE_MORE_CARS, "");
        this.garagePageView.getStartRaceButton().setEnabled();
      }).catch(() => {
      });
    });
  }
  redrawCurrentPage() {
    const currentPage = StoreModel.getState().garagePage;
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_CARS_LIMIT);
    if (this.garagePageView.getRaceTracksList().children.length === 0) {
      const prevPage = currentPage - 1;
      queryParams.set(QUERY_PARAMS.PAGE, prevPage);
      StoreModel.dispatch({
        type: ACTIONS.CHANGE_GARAGE_PAGE,
        payload: prevPage
      });
    } else {
      queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    }
    ApiModel.getCars(queryParams).then((data) => {
      if (data) {
        this.garagePageView.clearRaceTracksList();
        this.drawRaceTracks(data);
      }
    }).catch(() => {
    });
  }
  startRaceHandler() {
    this.countCarsInRace = this.raceTracks.length;
    this.allDisabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.startEngineHandler().catch(() => {
      });
    });
    this.singletonMediator.notify(MEDIATOR_EVENTS.START_RACE, "");
  }
  resetRaceHandler() {
    this.garagePageView.getRaceResult().classList.remove(GARAGE_PAGE_STYLES["garage-page_race-result_show"]);
    this.garagePageView.getRaceResult().innerHTML = "";
    this.isWinner = false;
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.stopEngineHandler();
    });
    this.singletonMediator.notify(MEDIATOR_EVENTS.RESET_RACE, "");
  }
  drawWinner() {
    this.garagePageView.getRaceResult().classList.add(GARAGE_PAGE_STYLES["garage-page_race-result_show"]);
    this.garagePageView.getRaceResult().innerHTML = "";
    const text = `Winner: ${this.winner.name} - ${this.winner.time}s`;
    this.garagePageView.getRaceResult().textContent = text;
  }
  hasWinner(winner) {
    if (winner.wins) {
      const currentWinner = {
        id: winner.id,
        wins: winner.wins + 1,
        time: this.winner.time < winner.time ? this.winner.time : winner.time
      };
      if (!currentWinner.id) {
        return;
      }
      ApiModel.updateWinnerById(currentWinner.id, currentWinner).then(() => {
        this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, "");
      }).catch(() => {
      });
    } else {
      if (!this.winner.id) {
        return;
      }
      const newWinnerData = {
        id: this.winner.id,
        wins: this.winner.wins,
        time: this.winner.time
      };
      ApiModel.createWinner(newWinnerData).then(() => {
        this.singletonMediator.notify(MEDIATOR_EVENTS.DRAW_NEW_WINNER, "");
      }).catch(() => {
      });
    }
  }
  addNewWinner() {
    if (!this.winner.id) {
      return;
    }
    ApiModel.getWinnerById(this.winner.id).then((winner) => {
      if (winner) {
        this.hasWinner(winner);
      }
    }).catch(() => {
    });
  }
  allDisabled() {
    this.garagePageView.getMoreCarsButton().setDisabled();
    this.garagePageView.getStartRaceButton().setDisabled();
    this.garagePageView.getResetRaceButton().setDisabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.getView().getSelectCarButton().setDisabled();
      raceTrack.getView().getRemoveCarButton().setDisabled();
    });
  }
  allEnabled() {
    this.garagePageView.getMoreCarsButton().setEnabled();
    this.garagePageView.getStartRaceButton().setEnabled();
    this.garagePageView.getResetRaceButton().setEnabled();
    this.raceTracks.forEach((raceTrack) => {
      raceTrack.getView().getSelectCarButton().setEnabled();
      raceTrack.getView().getRemoveCarButton().setEnabled();
    });
  }
  setSubscribeToMediator() {
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage();
      this.getAllCars();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_MORE_CARS, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage();
      this.getAllCars();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_CAR, () => {
      this.drawGarageTitle();
      this.redrawCurrentPage();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.removeButtons.forEach((button) => {
        button.setEnabled();
      });
      this.redrawCurrentPage();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CHANGE_GARAGE_PAGE, () => {
      this.redrawCurrentPage();
    });
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_START,
      this.allDisabled.bind(this)
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.NEW_WINNER, (params) => {
      this.decCarInRace();
      if (!this.isWinner && Winner.isWinner(params)) {
        this.winner = params;
        this.isWinner = true;
        this.drawWinner();
        this.addNewWinner();
      }
    });
  }
  decCarInRace() {
    this.countCarsInRace -= 1;
    if (this.countCarsInRace === 0) {
      this.garagePageView.getResetRaceButton().setEnabled();
    }
  }
  incCarInRace() {
    this.countCarsInRace += 1;
    if (this.countCarsInRace === this.raceTracks.length) {
      this.garagePageView.getResetRaceButton().setDisabled();
      this.garagePageView.getStartRaceButton().setEnabled();
      this.garagePageView.getMoreCarsButton().setEnabled();
      this.singletonMediator.notify(MEDIATOR_EVENTS.EMPTY_RACE, "");
    }
  }
  setSubscribeToMediator2() {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_PAGE,
      (params) => {
        if (typeof params === "string" && params === PAGES_IDS.GARAGE_PAGE || params === PAGES_IDS.DEFAULT_PAGE) {
          this.visible();
        } else {
          this.hidden();
        }
      }
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CAR_BROKEN, () => {
      this.decCarInRace();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.RESET_CURRENT_CAR, () => {
      this.incCarInRace();
    });
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SINGLE_RACE_RESET, () => {
      this.allEnabled();
    });
  }
  init() {
    this.getInitialDataCars();
    this.setSubscribeToMediator();
    this.setSubscribeToMediator2();
    const moreCarsButton = this.garagePageView.getMoreCarsButton().getHTML();
    moreCarsButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.moreCarsHandler.bind(this)
    );
    const raceTrackTopWrapper = this.garagePageView.getRaceTrackTopWrapper();
    const raceTrackBottomWrapper = this.garagePageView.getRaceTrackBottomWrapper();
    const startRaceButton = this.garagePageView.getStartRaceButton().getHTML();
    startRaceButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.startRaceHandler.bind(this)
    );
    const resetRaceButton = this.garagePageView.getResetRaceButton().getHTML();
    resetRaceButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.resetRaceHandler.bind(this)
    );
    raceTrackBottomWrapper.append(this.pagination.getHTML());
    raceTrackTopWrapper.append(
      this.createCarForm.getHTML(),
      this.previewCar.getHTML(),
      this.changeCarForm.getHTML()
    );
  }
}
const top = "_top_1enh4_49";
const bottom = "_bottom_1enh4_49";
const WINNERS_PAGE_STYLES = {
  "winners-page": "_winners-page_1enh4_2",
  "winners-page_wrapper": "_winners-page_wrapper_1enh4_6",
  "winners-page_title": "_winners-page_title_1enh4_10",
  "winners-page_table": "_winners-page_table_1enh4_18",
  "winners-page_table_head": "_winners-page_table_head_1enh4_23",
  "winners-page_table_head-td": "_winners-page_table_head-td_1enh4_26",
  top,
  bottom,
  "winners-page_table_body": "_winners-page_table_body_1enh4_70",
  "winners-page_table_body-tr": "_winners-page_table_body-tr_1enh4_73",
  "winners-page_table_body-td": "_winners-page_table_body-td_1enh4_81",
  "winners-page--hidden": "_winners-page--hidden_1enh4_98"
};
class WinnersPageView {
  constructor(parent) {
    __publicField(this, "winnersTitle");
    __publicField(this, "winnersTableTbody");
    __publicField(this, "winnersTableTheadTdArr", []);
    __publicField(this, "winnerSvgArr", []);
    __publicField(this, "winnersTableTheadTr");
    __publicField(this, "winnersTableThead");
    __publicField(this, "winnersTable");
    __publicField(this, "pageWrapper");
    __publicField(this, "page");
    this.winnersTitle = this.createWinnersTitle();
    this.winnersTableTbody = this.createWinnersTableTbody();
    this.winnersTableTheadTr = this.createWinnersTableTheadTr();
    this.winnersTableThead = this.createWinnersTableThead();
    this.winnersTable = this.createWinnersTable();
    this.pageWrapper = this.createPageWrapper();
    this.page = this.createHTML(parent);
  }
  getHTML() {
    return this.page;
  }
  getWinnersTitle() {
    return this.winnersTitle;
  }
  getWinnersTable() {
    return this.winnersTable;
  }
  getWinnersTableTbody() {
    return this.winnersTableTbody;
  }
  getWinnersTableTheadTr() {
    return this.winnersTableTheadTr;
  }
  clearWinnersTableTbody() {
    this.winnersTableTbody.innerHTML = "";
  }
  getPageWrapper() {
    return this.pageWrapper;
  }
  createWinnersTableBodyTr(winner) {
    const winnersTableBodyTr = createBaseElement({
      tag: TAG_NAMES.TR,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table_body-tr"]]
    });
    const idTd = this.createWinnersTableTbodyTd();
    idTd.classList.add(WINNERS_PAGE_STYLES["winners-page_table_body-td"]);
    idTd.textContent = winner.id.toString();
    const carTd = this.createWinnersTableTbodyTd();
    carTd.classList.add(WINNERS_PAGE_STYLES["winners-page_table_body-td"]);
    carTd.append(this.createWinnerSvg(winner));
    const nameTd = this.createWinnersTableTbodyTd();
    nameTd.classList.add(WINNERS_PAGE_STYLES["winners-page_table_body-td"]);
    nameTd.textContent = winner.car.name;
    const winsTd = this.createWinnersTableTbodyTd();
    winsTd.classList.add(WINNERS_PAGE_STYLES["winners-page_table_body-td"]);
    winsTd.textContent = winner.wins.toString();
    const timeTd = this.createWinnersTableTbodyTd();
    timeTd.classList.add(WINNERS_PAGE_STYLES["winners-page_table_body-td"]);
    timeTd.textContent = winner.time.toString();
    winnersTableBodyTr.append(idTd, carTd, nameTd, winsTd, timeTd);
    this.winnersTableTbody.append(winnersTableBodyTr);
    return winnersTableBodyTr;
  }
  createWinnerSvg(winner) {
    const carSVG = document.createElementNS(
      WINNERS_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    carSVG.classList.add(
      WINNERS_PAGE_STYLES["winners-page_table_body-td_car-svg"]
    );
    carSVG.appendChild(createSVGUse(WINNERS_SVG_DETAILS.CAR_ID));
    changeSVGFill(carSVG, winner.car.color);
    this.winnerSvgArr.push(carSVG);
    return carSVG;
  }
  createWinnersTableTbodyTd() {
    const winnersTableTbodyTd = createBaseElement({
      tag: TAG_NAMES.TD,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table_body-td"]]
    });
    this.winnersTableTbody.append(winnersTableTbodyTd);
    return winnersTableTbodyTd;
  }
  createWinnersTitle() {
    this.winnersTitle = createBaseElement({
      tag: TAG_NAMES.H2,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_title"]]
    });
    return this.winnersTitle;
  }
  createWinnersTable() {
    this.winnersTable = createBaseElement({
      tag: TAG_NAMES.TABLE,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table"]]
    });
    return this.winnersTable;
  }
  createWinnersTableThead() {
    this.winnersTableThead = createBaseElement({
      tag: TAG_NAMES.THEAD,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table_head"]]
    });
    return this.winnersTableThead;
  }
  createWinnersTableTheadTr() {
    this.winnersTableTheadTr = createBaseElement({
      tag: TAG_NAMES.TR,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table_head-tr"]]
    });
    return this.winnersTableTheadTr;
  }
  createWinnersTableTheadTd(id) {
    const winnersTableTheadTd = createBaseElement({
      tag: TAG_NAMES.TD,
      cssClasses: [
        WINNERS_PAGE_STYLES["winners-page_table_head-td"],
        WINNERS_PAGE_STYLES.top
      ],
      attributes: {
        id
      },
      innerContent: id
    });
    this.winnersTableTheadTdArr.push(winnersTableTheadTd);
  }
  createWinnersTableTbody() {
    this.winnersTableTbody = createBaseElement({
      tag: TAG_NAMES.TBODY,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_table_body"]]
    });
    return this.winnersTableTbody;
  }
  createPageWrapper() {
    this.pageWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page_wrapper"]]
    });
    return this.pageWrapper;
  }
  createHTML(parent) {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [WINNERS_PAGE_STYLES["winners-page"]]
    });
    THEAD_TD_IDS.forEach((id) => {
      this.createWinnersTableTheadTd(id);
    });
    this.winnersTableTheadTr.append(...this.winnersTableTheadTdArr);
    this.winnersTableThead.append(this.winnersTableTheadTr);
    this.winnersTable.append(this.winnersTableThead, this.winnersTableTbody);
    this.pageWrapper.append(this.winnersTitle, this.winnersTable);
    this.page.append(this.pageWrapper);
    parent.append(this.page);
    return this.page;
  }
}
class WinnersPageModel {
  constructor(parent) {
    __publicField(this, "winnersPageView");
    __publicField(this, "pagination", new PaginationModel(
      PAGES_IDS.WINNERS_PAGE
    ));
    __publicField(this, "winnerInfo", {
      id: 0,
      time: 0,
      wins: 0,
      car: {
        id: 0,
        name: "",
        color: ""
      }
    });
    __publicField(this, "bySort", QUERY_VALUES.ID);
    __publicField(this, "byOrder", QUERY_VALUES.ASC);
    __publicField(this, "allWinnersData", []);
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    this.winnersPageView = new WinnersPageView(parent);
    this.init().catch(() => {
    });
  }
  getHTML() {
    return this.winnersPageView.getHTML();
  }
  visible() {
    this.winnersPageView.getHTML().classList.remove(WINNERS_PAGE_STYLES["winners-page--hidden"]);
  }
  hidden() {
    this.winnersPageView.getHTML().classList.add(WINNERS_PAGE_STYLES["winners-page--hidden"]);
  }
  async getWinnerInfo(winner) {
    if (winner.id) {
      const car = await ApiModel.getCarById(winner.id);
      if (car && winner.id) {
        this.winnerInfo = {
          id: winner.id,
          time: winner.time,
          wins: winner.wins,
          car
        };
      }
    }
    return this.winnerInfo;
  }
  async getWinnersData(winners) {
    const winnerPromises = winners.map(
      (winner) => this.getWinnerInfo(winner)
    );
    const winnersData = await Promise.all(winnerPromises);
    return winnersData.filter(
      (winnerInfo) => winnerInfo !== void 0
    );
  }
  async fetchAndDrawWinnersData(queryParams) {
    const winners = await ApiModel.getWinners(queryParams);
    if (!winners) {
      return;
    }
    this.winnersPageView.clearWinnersTableTbody();
    this.allWinnersData = [];
    const winnersData = await this.getWinnersData(winners);
    this.allWinnersData.push(...winnersData);
    this.drawWinnerLines(winnersData);
  }
  drawWinnerLines(winners) {
    const countWinnerLines = this.winnersPageView.getWinnersTableTbody().children.length;
    if (countWinnerLines < QUERY_VALUES.DEFAULT_WINNERS_LIMIT) {
      winners.forEach((winner) => {
        const winnerTr = this.winnersPageView.createWinnersTableBodyTr(winner);
        this.winnersPageView.getWinnersTableTbody().append(winnerTr);
      });
    }
  }
  async redrawCurrentPage() {
    const currentPage = StoreModel.getState().winnersPage;
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT);
    queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    queryParams.set(QUERY_PARAMS.SORT, this.bySort);
    queryParams.set(QUERY_PARAMS.ORDER, this.byOrder);
    await ApiModel.getWinners(queryParams).then((winners) => {
      if (!(winners == null ? void 0 : winners.length)) {
        const prevPage = currentPage - 1;
        queryParams.delete(QUERY_PARAMS.PAGE);
        queryParams.set(QUERY_PARAMS.PAGE, prevPage);
        StoreModel.dispatch({
          type: ACTIONS.CHANGE_WINNERS_PAGE,
          payload: prevPage
        });
      } else {
        queryParams.set(QUERY_PARAMS.PAGE, currentPage);
      }
    }).catch(() => {
    });
    await this.fetchAndDrawWinnersData(queryParams);
  }
  drawWinnersTitle() {
    const winnersTitle = this.winnersPageView.getWinnersTitle();
    ApiModel.getWinners(/* @__PURE__ */ new Map()).then((winners) => {
      const textContent = `Winners (${winners == null ? void 0 : winners.length})`;
      winnersTitle.textContent = textContent;
    }).catch(() => {
    });
  }
  subscribeToMediator() {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_PAGE,
      (params) => {
        if (typeof params === "string" && params === PAGES_IDS.WINNERS_PAGE) {
          this.visible();
        } else {
          this.hidden();
        }
      }
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DRAW_NEW_WINNER, () => {
      this.redrawCurrentPage().catch(() => {
      });
      this.drawWinnersTitle();
    });
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_WINNERS_PAGE,
      () => {
        this.redrawCurrentPage().catch(() => {
        });
      }
    );
    this.singletonMediator.subscribe(MEDIATOR_EVENTS.DELETE_WINNER, () => {
      this.redrawCurrentPage().catch(() => {
      });
      this.drawWinnersTitle();
    });
  }
  setTableHeadHandler() {
    const winnersTableTheadTr = this.winnersPageView.getWinnersTableTheadTr();
    winnersTableTheadTr.addEventListener(
      EVENT_NAMES.CLICK,
      (event) => {
        const { target } = event;
        if (target instanceof HTMLElement) {
          if (target.id === QUERY_VALUES.WINS) {
            this.sortByWinsOrTime(target, target.id).catch(() => {
            });
          } else if (target.id === QUERY_VALUES.TIME) {
            this.sortByWinsOrTime(target, target.id).catch(() => {
            });
          }
        }
      }
    );
  }
  async sortByWinsOrTime(target, sortBy) {
    const currentPage = StoreModel.getState().winnersPage;
    this.bySort = sortBy;
    const queryParams = /* @__PURE__ */ new Map();
    queryParams.set(QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT);
    queryParams.set(QUERY_PARAMS.PAGE, currentPage);
    queryParams.set(QUERY_PARAMS.SORT, this.bySort);
    if (target.classList.contains(WINNERS_PAGE_STYLES.bottom)) {
      this.byOrder = QUERY_VALUES.DESC;
      target.classList.replace(
        WINNERS_PAGE_STYLES.bottom,
        WINNERS_PAGE_STYLES.top
      );
    } else {
      this.byOrder = QUERY_VALUES.ASC;
      target.classList.replace(
        WINNERS_PAGE_STYLES.top,
        WINNERS_PAGE_STYLES.bottom
      );
    }
    queryParams.set(QUERY_PARAMS.ORDER, this.byOrder);
    const fetch2 = await this.fetchAndDrawWinnersData(queryParams);
    return fetch2;
  }
  async init() {
    this.subscribeToMediator();
    this.drawWinnersTitle();
    this.winnersPageView.getPageWrapper().append(this.pagination.getHTML());
    await this.fetchAndDrawWinnersData(
      /* @__PURE__ */ new Map([
        [QUERY_PARAMS.PAGE, StoreModel.getState().winnersPage],
        [QUERY_PARAMS.LIMIT, QUERY_VALUES.DEFAULT_WINNERS_LIMIT]
      ])
    );
    this.setTableHeadHandler();
  }
}
const HEADER_BUTTON_TEXT = {
  GARAGE_BTN: "To winners",
  WINNERS_BTN: "To garage"
};
const header = "_header_19dtq_2";
const HEADER_STYLES = {
  header,
  "header__garage-button": "_header__garage-button_19dtq_12",
  "header__winners-button": "_header__winners-button_19dtq_13"
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
    __publicField(this, "singletonMediator", MediatorModel.getInstance());
    __publicField(this, "headerView", new HeaderView());
    __publicField(this, "router");
    this.router = router;
    this.init();
  }
  getHTML() {
    return this.headerView.getHTML();
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
  allDisabledButton() {
    const garageButton = this.headerView.getGarageButton();
    const winnersButton = this.headerView.getWinnersButton();
    garageButton.setDisabled();
    winnersButton.setDisabled();
  }
  allEnabled() {
    const garageButton = this.headerView.getGarageButton();
    const winnersButton = this.headerView.getWinnersButton();
    garageButton.setEnabled();
    winnersButton.setEnabled();
  }
  subscribeToMediator() {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.START_RACE,
      this.allDisabledButton.bind(this)
    );
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_START,
      this.allDisabledButton.bind(this)
    );
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.EMPTY_RACE,
      this.allEnabled.bind(this)
    );
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_RESET,
      this.allEnabled.bind(this)
    );
  }
  init() {
    this.subscribeToMediator();
    this.setHandlerToButtons();
  }
}
class AppModel {
  constructor() {
    __publicField(this, "appView", new AppView());
    __publicField(this, "router");
    this.router = new RouterModel(this.initPages());
    this.appView.getHTML().prepend(new HeaderModel(this.router).getHTML());
  }
  getHTML() {
    return this.appView.getHTML();
  }
  initPages() {
    const garagePage = new GaragePageModel(this.appView.getHTML());
    const winnersPage = new WinnersPageModel(this.appView.getHTML());
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
//# sourceMappingURL=main-e7664061.js.map
