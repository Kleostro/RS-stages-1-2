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
const MEDIATOR_EVENTS = {
  CHANGE_PAGE: "changePage",
  CREATE_NEW_USER: "createNewUser",
  SET_NEW_USER: "setNewUser",
  NEW_MESSAGE: "newMessage",
  LOG_IN: "logIn",
  LOG_OUT: "logOut"
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
  BEFOREUNLOAD: "beforeunload",
  OPEN: "open",
  CLOSE: "close",
  MESSAGE: "message"
};
const IS_DISABLED = {
  DISABLED: true,
  ENABLED: false
};
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
const mainPage = "_mainPage_1uy5k_1";
const mainPage_hidden = "_mainPage_hidden_1uy5k_5";
const MAIN_PAGE_STYLES = {
  mainPage,
  mainPage_hidden
};
class MainPageView {
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
      cssClasses: [MAIN_PAGE_STYLES.mainPage]
    });
    this.parent.append(this.page);
    return this.page;
  }
}
const PAGES_IDS = {
  FOR_DEPLOY: "kleostro-JSFE2023Q4/fun-chat/",
  DEFAULT_PAGE: "",
  LOGIN_PAGE: "login",
  MAIN_PAGE: "main",
  ABOUT_PAGE: "about"
};
const STATE_FIELDS = {
  CURRENT_USER: "currentUser",
  CURRENT_AUTHORIZED_USERS: "currentAuthorizedUsers",
  CURRENT_UNAUTHORIZED_USERS: "currentUnauthorizedUsers",
  CURRENT_USER_DIALOGS: "currentUserDialogs"
};
const INITIAL_STATE = {
  currentUser: null,
  currentAuthorizedUsers: [],
  currentUnauthorizedUsers: [],
  currentUserDialogs: []
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case "setCurrentUser":
      return {
        ...state,
        currentUser: action.payload
      };
    case "setCurrentAuthorizedUsers":
      return {
        ...state,
        currentAuthorizedUsers: action.payload
      };
    case "setCurrentUnauthorizedUsers":
      return {
        ...state,
        currentUnauthorizedUsers: action.payload
      };
    case "setCurrentUserDialogs":
      return {
        ...state,
        currentUserDialogs: action.payload
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
__publicField(_StoreModel, "state", INITIAL_STATE);
let StoreModel = _StoreModel;
class MainPageModel {
  constructor(parent, router) {
    __publicField(this, "router");
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    __publicField(this, "mainPageView");
    this.router = router;
    this.mainPageView = new MainPageView(parent);
    this.init();
  }
  getHTML() {
    return this.mainPageView.getHTML();
  }
  show() {
    this.mainPageView.getHTML().classList.remove(MAIN_PAGE_STYLES.mainPage_hidden);
  }
  hide() {
    this.mainPageView.getHTML().classList.add(MAIN_PAGE_STYLES.mainPage_hidden);
  }
  switchPage(params) {
    if (params === PAGES_IDS.MAIN_PAGE) {
      if (StoreModel.getState().currentUser) {
        this.show();
      } else {
        this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
        this.hide();
      }
    }
    return true;
  }
  subscribeToMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.hide();
      this.switchPage(String(params));
    });
  }
  init() {
    this.hide();
    this.subscribeToMediator();
  }
}
const aboutPage = "_aboutPage_kebmh_1";
const aboutPage_hidden = "_aboutPage_hidden_kebmh_5";
const ABOUT_PAGE_STYLES = {
  aboutPage,
  aboutPage_hidden
};
let LoginPageView$1 = class LoginPageView {
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
      cssClasses: [ABOUT_PAGE_STYLES.aboutPage]
    });
    this.parent.append(this.page);
    return this.page;
  }
};
class AboutPageModel {
  constructor(parent) {
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    __publicField(this, "aboutPageView");
    this.aboutPageView = new LoginPageView$1(parent);
    this.init();
  }
  getHTML() {
    return this.aboutPageView.getHTML();
  }
  visible() {
    this.aboutPageView.getHTML().classList.remove(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }
  hidden() {
    this.aboutPageView.getHTML().classList.add(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }
  subscribeToMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.ABOUT_PAGE) {
        this.visible();
      } else {
        this.hidden();
      }
    });
  }
  init() {
    this.subscribeToMediator();
  }
}
const loginPage = "_loginPage_7wf9o_1";
const loginPage_hidden = "_loginPage_hidden_7wf9o_6";
const LOGIN_PAGE_STYLES = {
  loginPage,
  loginPage_hidden
};
class LoginPageView2 {
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
      cssClasses: [LOGIN_PAGE_STYLES.loginPage]
    });
    this.parent.append(this.page);
    return this.page;
  }
}
const BUTTON_TYPES = {
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button"
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
class InputFieldValidatorModel {
  constructor(validParams, isValid) {
    __publicField(this, "validParams");
    __publicField(this, "isValid");
    this.validParams = validParams;
    this.isValid = isValid;
  }
  validate(value) {
    const errors = [
      this.checkRequired(value),
      this.checkNotSpecialSymbols(value),
      this.checkMinLength(value),
      this.checkMaxLength(value),
      this.checkRequiredSymbols(value)
    ];
    const errorMessages = [];
    errors.forEach((error) => {
      if (typeof error === "string") {
        errorMessages.push(error);
      }
    });
    if (errorMessages.length) {
      return errorMessages;
    }
    this.isValid = true;
    return this.isValid;
  }
  checkMinLength(value) {
    if (this.validParams.minLength && value.length < this.validParams.minLength) {
      const errorMessage = `Min length should be at least ${this.validParams.minLength}`;
      return errorMessage;
    }
    return true;
  }
  checkMaxLength(value) {
    if (this.validParams.maxLength && value.length > this.validParams.maxLength) {
      const errorMessage = `Max length should not exceed ${this.validParams.maxLength}`;
      return errorMessage;
    }
    return true;
  }
  checkRequired(value) {
    if (this.validParams.required && value.trim() === "") {
      const errorMessage = "Field is required";
      return errorMessage;
    }
    return true;
  }
  checkRequiredSymbols(value) {
    if (this.validParams.requiredSymbols && !this.validParams.requiredSymbols.pattern.test(value)) {
      const errorMessage = this.validParams.requiredSymbols.message;
      return errorMessage;
    }
    return true;
  }
  checkNotSpecialSymbols(value) {
    if (this.validParams.notSpecialSymbols && !this.validParams.notSpecialSymbols.pattern.test(value)) {
      const errorMessage = this.validParams.notSpecialSymbols.message;
      return errorMessage;
    }
    return true;
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
  getValue() {
    return this.view.getHTML().value;
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
class InputFieldView {
  constructor(params) {
    __publicField(this, "inputField");
    __publicField(this, "label", null);
    __publicField(this, "errorField", null);
    __publicField(this, "input");
    this.input = this.createInput(params.inputParams);
    this.inputField = this.createHTML(params);
  }
  getHTML() {
    return this.inputField;
  }
  getValue() {
    if (this.inputField instanceof InputModel) {
      return this.inputField.getValue();
    }
    return this.input.getValue();
  }
  getInput() {
    return this.input;
  }
  getErrorField() {
    return this.errorField;
  }
  createInput(inputParams) {
    const { id, type, placeholder, autocomplete } = inputParams;
    this.input = new InputModel({
      id,
      type,
      placeholder: placeholder || "",
      autocomplete
    });
    return this.input;
  }
  createLabel(labelParams) {
    const { for: htmlFor, text } = labelParams;
    this.label = createBaseElement({
      tag: TAG_NAMES.LABEL,
      attributes: {
        for: htmlFor
      },
      innerContent: text || ""
    });
    return this.label;
  }
  createErrorField() {
    this.errorField = createBaseElement({
      tag: TAG_NAMES.SPAN
    });
    return this.errorField;
  }
  createHTML(params) {
    var _a;
    const { labelParams } = params;
    if (labelParams) {
      this.inputField = this.createLabel(labelParams);
      this.errorField = this.createErrorField();
      (_a = this.label) == null ? void 0 : _a.append(this.input.getHTML(), this.errorField);
    } else {
      this.inputField = this.input;
    }
    return this.inputField;
  }
}
class InputFieldModel {
  constructor(inputFieldParams, validParams) {
    __publicField(this, "view");
    __publicField(this, "isValid", false);
    __publicField(this, "validator", null);
    this.view = new InputFieldView(inputFieldParams);
    if (validParams) {
      this.validator = new InputFieldValidatorModel(validParams, this.isValid);
      this.setInputHandler();
    }
  }
  getView() {
    return this.view;
  }
  getIsValid() {
    return this.isValid;
  }
  inputHandler() {
    var _a;
    const errorField = this.view.getErrorField();
    const errors = (_a = this.validator) == null ? void 0 : _a.validate(this.view.getValue());
    if (errors === true) {
      if (errorField) {
        errorField.textContent = "";
      }
      this.isValid = true;
    } else {
      if (errorField && errors) {
        const [firstError] = errors;
        errorField.textContent = firstError;
      }
      this.isValid = false;
    }
  }
  setInputHandler() {
    const input = this.view.getInput().getHTML();
    input.addEventListener(EVENT_NAMES.INPUT, () => {
      this.inputHandler();
    });
  }
}
const LOGIN_INPUT_FIELD_PARAMS = {
  inputParams: {
    id: "login",
    type: "text",
    placeholder: "Login",
    autocomplete: "off"
  },
  labelParams: {
    for: "login",
    text: "Enter your login"
  }
};
const PASSWORD_INPUT_FIELD_PARAMS = {
  inputParams: {
    id: "password",
    type: "password",
    placeholder: "Password",
    autocomplete: "off"
  },
  labelParams: {
    for: "password",
    text: "Enter your password"
  }
};
const FORM_INPUT_FIELD_PARAMS = [
  LOGIN_INPUT_FIELD_PARAMS,
  PASSWORD_INPUT_FIELD_PARAMS
];
const LOGIN_INPUT_FIELD_VALIDATE_PARAMS = {
  key: "login",
  minLength: 4,
  maxLength: 16,
  required: true,
  notSpecialSymbols: {
    pattern: /^[a-zA-Z0-9]*$/,
    message: "Login must contain only letters and numbers"
  }
};
const PASSWORD_INPUT_FIELD_VALIDATE_PARAMS = {
  key: "password",
  minLength: 6,
  required: true,
  requiredSymbols: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
    message: "Password must contain English letters, at least 1 upper case letter and at least 1 number"
  },
  notSpecialSymbols: {
    pattern: /^[a-zA-Z0-9]*$/,
    message: "Password must contain only letters and numbers"
  }
};
const INPUT_FIELD_VALIDATION_PARAMS = [
  LOGIN_INPUT_FIELD_VALIDATE_PARAMS,
  PASSWORD_INPUT_FIELD_VALIDATE_PARAMS
];
const loginForm = "_loginForm_1gj2f_1";
const LOGIN_FORM_STYLES = {
  loginForm
};
class LoginFormView {
  constructor() {
    __publicField(this, "submitFormButton");
    __publicField(this, "inputFields", []);
    __publicField(this, "form");
    this.inputFields = this.createInputFields();
    this.submitFormButton = this.createSubmitFormButton();
    this.form = this.createHTML();
  }
  getHTML() {
    return this.form;
  }
  getInputFields() {
    return this.inputFields;
  }
  getSubmitFormButton() {
    return this.submitFormButton;
  }
  createSubmitFormButton() {
    const text = "Login";
    this.submitFormButton = new ButtonModel({
      text,
      attrs: {
        type: BUTTON_TYPES.SUBMIT
      }
    });
    this.submitFormButton.setDisabled();
    return this.submitFormButton;
  }
  createInputFields() {
    FORM_INPUT_FIELD_PARAMS.forEach((inputFieldParams) => {
      const currentValidateParams = INPUT_FIELD_VALIDATION_PARAMS.find(
        (validParams) => validParams.key === inputFieldParams.inputParams.id
      );
      if (currentValidateParams) {
        const inputField = new InputFieldModel(
          inputFieldParams,
          currentValidateParams
        );
        this.inputFields.push(inputField);
      } else {
        this.inputFields.push(new InputFieldModel(inputFieldParams, null));
      }
    });
    return this.inputFields;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [LOGIN_FORM_STYLES.loginForm]
    });
    this.inputFields.forEach((inputField) => {
      const inputFieldElement = inputField.getView().getHTML();
      if (inputFieldElement instanceof HTMLLabelElement) {
        this.form.append(inputFieldElement);
      } else {
        this.form.append(inputFieldElement.getHTML());
      }
    });
    this.form.append(this.submitFormButton.getHTML());
    return this.form;
  }
}
const API_URL = "ws://127.0.0.1:4000";
const API_TYPES = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  ERROR: "ERROR"
};
const isKeyOfUser = (context, key) => Object.hasOwnProperty.call(context, key);
class LoginFormModel {
  constructor() {
    __publicField(this, "view", new LoginFormView());
    __publicField(this, "messageID", "");
    __publicField(this, "userData", {
      login: "",
      password: ""
    });
    __publicField(this, "inputFields", []);
    __publicField(this, "isValidInputFields", {});
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  getMessageID() {
    return this.messageID;
  }
  getUserData() {
    return this.userData;
  }
  setInputFieldHandlers(inputField) {
    const inputHTML = inputField.getView().getInput().getHTML();
    this.isValidInputFields[inputHTML.id] = false;
    inputHTML.addEventListener(EVENT_NAMES.INPUT, () => {
      this.isValidInputFields[inputHTML.id] = inputField.getIsValid();
      this.switchSubmitFormButtonAccess();
    });
  }
  switchSubmitFormButtonAccess() {
    if (Object.values(this.isValidInputFields).every((value) => value)) {
      this.view.getSubmitFormButton().setEnabled();
    } else {
      this.view.getSubmitFormButton().setDisabled();
    }
  }
  getFormData() {
    this.inputFields.forEach((inputField) => {
      const input = inputField.getView().getInput();
      const inputHTML = input.getHTML();
      const inputValue = input.getValue();
      if (isKeyOfUser(this.userData, inputHTML.id)) {
        this.userData[inputHTML.id] = inputValue;
        this.isValidInputFields[inputHTML.id] = false;
      }
      input.clear();
    });
    this.view.getSubmitFormButton().setDisabled();
    return this.userData;
  }
  submitFormButtonHandler() {
    this.messageID = crypto.randomUUID();
    const userData = {
      id: this.messageID,
      type: API_TYPES.USER_LOGIN,
      payload: {
        user: this.getFormData()
      }
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.CREATE_NEW_USER, userData);
  }
  setSubmitFormButtonHandler() {
    const submitFormButton = this.view.getSubmitFormButton().getHTML();
    submitFormButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.submitFormButtonHandler.bind(this)
    );
  }
  setPreventDefaultToForm() {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });
  }
  init() {
    this.inputFields = this.view.getInputFields();
    this.inputFields.forEach(
      (inputField) => this.setInputFieldHandlers(inputField)
    );
    this.setSubmitFormButtonHandler();
    this.setPreventDefaultToForm();
  }
}
const isFromServerMessage = (message) => {
  const isValidMessage = (msg) => typeof msg === "object" && msg !== null && "type" in msg && "id" in msg && "payload" in msg;
  if (isValidMessage(message)) {
    return message;
  }
  return null;
};
const ACTIONS = {
  SET_CURRENT_USER: "setCurrentUser",
  SET_CURRENT_AUTHORIZED_USERS: "setCurrentAuthorizedUsers",
  SET_CURRENT_UNAUTHORIZED_USERS: "setCurrentUnauthorizedUsers",
  SET_CURRENT_USER_DIALOGS: "setCurrentUserDialogs"
};
var STORE_KEYS = /* @__PURE__ */ ((STORE_KEYS2) => {
  STORE_KEYS2["SS_NAME"] = "kleostro";
  STORE_KEYS2["CURRENT_USER"] = "currentUser";
  return STORE_KEYS2;
})(STORE_KEYS || {});
const isUser = (data) => typeof data === "object" && data !== null && "login" in data && "password" in data;
class LoginPageModel {
  constructor(parent, router, storage) {
    __publicField(this, "loginPageView");
    __publicField(this, "router");
    __publicField(this, "storage");
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    __publicField(this, "loginFormModel", new LoginFormModel());
    this.loginPageView = new LoginPageView2(parent);
    this.router = router;
    this.storage = storage;
    this.initPage();
  }
  getHTML() {
    return this.loginPageView.getHTML();
  }
  show() {
    this.loginPageView.getHTML().classList.remove(LOGIN_PAGE_STYLES.loginPage_hidden);
  }
  hide() {
    this.loginPageView.getHTML().classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
  }
  checkAuthorizedUser() {
    const currentUser = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (currentUser && isUser(currentUser)) {
      const userData = {
        id: null,
        type: API_TYPES.USER_LOGIN,
        payload: {
          user: currentUser
        }
      };
      StoreModel.dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: currentUser
      });
      this.eventMediator.notify(MEDIATOR_EVENTS.CREATE_NEW_USER, userData);
      return currentUser;
    }
    return null;
  }
  switchPage(params) {
    if (params === PAGES_IDS.LOGIN_PAGE || params === PAGES_IDS.DEFAULT_PAGE) {
      if (StoreModel.getState().currentUser) {
        this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
        this.hide();
      } else {
        this.show();
      }
    }
    return true;
  }
  handleSuccessMessage() {
    const userData = this.loginFormModel.getUserData();
    StoreModel.dispatch({
      type: ACTIONS.SET_CURRENT_USER,
      payload: userData
    });
    this.storage.add(STORE_KEYS.CURRENT_USER, JSON.stringify(userData));
    this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    this.hide();
  }
  // private handleErrorMessage(checkedMessage: Message): void {
  //   console.error(checkedMessage?.payload?.error);
  // }
  handleMessageFromServer(checkedMessage) {
    const savedUser = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (savedUser && isUser(savedUser)) {
      StoreModel.dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: savedUser
      });
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
      this.hide();
      return;
    }
    if ((checkedMessage == null ? void 0 : checkedMessage.type) !== API_TYPES.ERROR) {
      this.handleSuccessMessage();
    } else if ((checkedMessage == null ? void 0 : checkedMessage.id) === this.loginFormModel.getMessageID())
      ;
  }
  subscribeToMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.switchPage(String(params));
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SET_NEW_USER, (message) => {
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleMessageFromServer(checkedMessage);
      }
    });
  }
  initPage() {
    this.checkAuthorizedUser();
    this.subscribeToMediator();
    this.hide();
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
  }
}
const ROUTER_DETAILS = {
  DEFAULT_SEGMENT: "/",
  NEXT_SEGMENT: 1,
  PATH_SEGMENTS_TO_KEEP: 2,
  CURRENT_SEGMENT: 0
};
class RouterModel {
  constructor() {
    __publicField(this, "pages", /* @__PURE__ */ new Map());
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname.split(ROUTER_DETAILS.DEFAULT_SEGMENT).slice(
        ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT
      ).join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.navigateTo(currentPath);
      this.eventMediator.notify(
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
  setPages(pages) {
    this.pages = pages;
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
      window.location.pathname = `${PAGES_IDS.FOR_DEPLOY}`;
      this.eventMediator.notify(
        MEDIATOR_EVENTS.CHANGE_PAGE,
        PAGES_IDS.DEFAULT_PAGE
      );
      return;
    }
    this.eventMediator.notify(MEDIATOR_EVENTS.CHANGE_PAGE, pathParts.join());
  }
}
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
const APP_NAME = "Fun Chat";
const LOGOUT_BUTTON_TEXT = "Logout";
const header = "_header_u0nmf_1";
const nameApp = "_nameApp_u0nmf_13";
const userLogin = "_userLogin_u0nmf_19";
const logoutButton = "_logoutButton_u0nmf_25";
const HEADER_STYLES = {
  header,
  nameApp,
  userLogin,
  logoutButton
};
class HeaderView {
  constructor() {
    __publicField(this, "nameApp");
    __publicField(this, "userLogin");
    __publicField(this, "logoutButton");
    __publicField(this, "header");
    this.nameApp = this.createNameApp();
    this.userLogin = this.createUserLogin();
    this.logoutButton = this.createLogoutButton();
    this.header = this.createHTML();
  }
  getHTML() {
    return this.header;
  }
  getUserLogin() {
    return this.userLogin;
  }
  getLogoutButton() {
    return this.logoutButton;
  }
  createNameApp() {
    this.nameApp = createBaseElement({
      tag: TAG_NAMES.H1,
      cssClasses: [HEADER_STYLES.nameApp],
      innerContent: APP_NAME
    });
    return this.nameApp;
  }
  createUserLogin() {
    this.userLogin = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [HEADER_STYLES.userLogin]
    });
    return this.userLogin;
  }
  createLogoutButton() {
    this.logoutButton = new ButtonModel({
      classes: [HEADER_STYLES.logoutButton],
      text: LOGOUT_BUTTON_TEXT
    });
    this.logoutButton.setDisabled();
    return this.logoutButton;
  }
  createHTML() {
    this.header = createBaseElement({
      tag: TAG_NAMES.HEADER,
      cssClasses: [HEADER_STYLES.header]
    });
    this.header.append(
      this.nameApp,
      this.userLogin,
      this.logoutButton.getHTML()
    );
    return this.header;
  }
}
class HeaderModel {
  constructor(router, storage) {
    __publicField(this, "view", new HeaderView());
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    __publicField(this, "router");
    __publicField(this, "storage");
    this.router = router;
    this.storage = storage;
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  logoutButtonHandler() {
    var _a, _b;
    const logOutData = {
      id: null,
      type: API_TYPES.USER_LOGOUT,
      payload: {
        user: {
          login: (_a = StoreModel.getState().currentUser) == null ? void 0 : _a.login,
          password: (_b = StoreModel.getState().currentUser) == null ? void 0 : _b.password
        }
      }
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.LOG_OUT, logOutData);
    this.storage.remove(STORE_KEYS.CURRENT_USER);
    StoreModel.dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: null });
    this.view.getLogoutButton().setDisabled();
    this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
  }
  setLogoutButtonHandler() {
    const logoutButton2 = this.view.getLogoutButton().getHTML();
    logoutButton2.addEventListener(
      EVENT_NAMES.CLICK,
      this.logoutButtonHandler.bind(this)
    );
  }
  changeCurrentUserLogin() {
    var _a;
    const userLogin2 = this.view.getUserLogin();
    userLogin2.textContent = ((_a = StoreModel.getState().currentUser) == null ? void 0 : _a.login) || "";
    this.view.getLogoutButton().setEnabled();
  }
  init() {
    this.setLogoutButtonHandler();
    StoreModel.subscribe(
      STATE_FIELDS.CURRENT_USER,
      this.changeCurrentUserLogin.bind(this)
    );
  }
}
class ClientApiModel {
  constructor(webSocket, isOpen) {
    __publicField(this, "webSocket");
    __publicField(this, "isOpen");
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.subscribeToEventMediator();
  }
  isWorks() {
    return this.isOpen;
  }
  sendMessage(message) {
    if (!this.isOpen) {
      return false;
    }
    this.webSocket.send(JSON.stringify(message));
    return true;
  }
  subscribeToEventMediator() {
    if (!this.isOpen) {
      return false;
    }
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CREATE_NEW_USER, (message) => {
      this.sendMessage(message);
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT, (message) => {
      this.sendMessage(message);
    });
    return true;
  }
}
class ServerApiModel {
  constructor(webSocket, isOpen) {
    __publicField(this, "webSocket");
    __publicField(this, "isOpen");
    __publicField(this, "eventMediator", MediatorModel.getInstance());
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.getMessage();
  }
  isWorks() {
    return this.isOpen;
  }
  getMessage() {
    if (!this.isOpen) {
      return false;
    }
    this.webSocket.addEventListener(EVENT_NAMES.MESSAGE, ({ data }) => {
      const message = JSON.parse(String(data));
      const checkedMessage = isFromServerMessage(message);
      if (checkedMessage) {
        this.handleMessageType(checkedMessage);
      }
    });
    return true;
  }
  handleMessageType(message) {
    switch (message.type) {
      case API_TYPES.USER_LOGIN: {
        this.eventMediator.notify(MEDIATOR_EVENTS.SET_NEW_USER, message);
        return true;
      }
      case API_TYPES.ERROR: {
        this.eventMediator.notify(MEDIATOR_EVENTS.SET_NEW_USER, message);
        return false;
      }
      default: {
        return null;
      }
    }
  }
}
class SocketModel {
  constructor() {
    __publicField(this, "webSocket", new WebSocket(API_URL));
    __publicField(this, "isOpen", false);
  }
  open() {
    return new Promise((resolve) => {
      this.webSocket.addEventListener(EVENT_NAMES.OPEN, () => {
        this.isOpen = true;
        this.init();
        resolve(true);
      });
    });
  }
  isWorks() {
    return this.isOpen;
  }
  close() {
    this.webSocket.addEventListener(EVENT_NAMES.CLOSE, () => {
      this.isOpen = false;
    });
    return this.isOpen;
  }
  init() {
    const serverApi = new ServerApiModel(this.webSocket, this.isOpen);
    const clientApi = new ClientApiModel(this.webSocket, this.isOpen);
    clientApi.isWorks();
    serverApi.isWorks();
    return this.isOpen;
  }
}
class SessionStorageModel {
  constructor() {
    __publicField(this, "storage");
    this.storage = this.init();
  }
  get(key) {
    if (key in this.storage) {
      const result = JSON.parse(this.storage[key]);
      return result;
    }
    return null;
  }
  add(key, value) {
    this.storage[key] = value;
    this.save(this.storage);
    return true;
  }
  remove(key) {
    if (key in this.storage) {
      delete this.storage[key];
      this.save(this.storage);
      return true;
    }
    return false;
  }
  clear() {
    sessionStorage.clear();
    this.init();
    return true;
  }
  save(data) {
    sessionStorage.setItem(STORE_KEYS.SS_NAME, JSON.stringify(data));
    this.storage = this.init();
    return true;
  }
  init() {
    const storedData = sessionStorage.getItem(STORE_KEYS.SS_NAME);
    if (storedData) {
      this.storage = JSON.parse(storedData);
    } else {
      sessionStorage.setItem(STORE_KEYS.SS_NAME, "{}");
      this.storage = this.init();
    }
    return this.storage;
  }
}
class AppModel {
  constructor() {
    __publicField(this, "appView", new AppView());
    __publicField(this, "storage", new SessionStorageModel());
    __publicField(this, "serverApi", new SocketModel());
    __publicField(this, "router", new RouterModel());
    this.router.setPages(this.initPages());
    this.serverApi.open().catch(() => {
    });
  }
  getHTML() {
    return this.appView.getHTML();
  }
  initPages() {
    const root = this.getHTML();
    root.prepend(new HeaderModel(this.router, this.storage).getHTML());
    const loginPage2 = new LoginPageModel(root, this.router, this.storage);
    const mainPage2 = new MainPageModel(root, this.router);
    const aboutPage2 = new AboutPageModel(root);
    const pages = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: loginPage2,
        [PAGES_IDS.LOGIN_PAGE]: loginPage2,
        [PAGES_IDS.MAIN_PAGE]: mainPage2,
        [PAGES_IDS.ABOUT_PAGE]: aboutPage2
      })
    );
    return pages;
  }
}
const index = "";
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-497fd511.js.map
