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
const index = "";
const form = "_form_1hjyt_1";
const form__label = "_form__label_1hjyt_17";
const form__input = "_form__input_1hjyt_26";
const form__input__error = "_form__input__error_1hjyt_37";
const form__input__success = "_form__input__success_1hjyt_40";
const form__span = "_form__span_1hjyt_46";
const form__span__visually = "_form__span__visually_1hjyt_52";
const form__span__hidden = "_form__span__hidden_1hjyt_55";
const form__btn = "_form__btn_1hjyt_58";
const styles$8 = {
  form,
  form__label,
  form__input,
  form__input__error,
  form__input__success,
  form__span,
  form__span__visually,
  form__span__hidden,
  form__btn
};
var ERRORS_NAME = /* @__PURE__ */ ((ERRORS_NAME2) => {
  ERRORS_NAME2["FIRST_CHAR"] = "firstChar";
  ERRORS_NAME2["EMPTY_FIELD"] = "emptyField";
  ERRORS_NAME2["MANY_CHARS"] = "manyChars";
  ERRORS_NAME2["OTHER_CHARS"] = "otherChars";
  return ERRORS_NAME2;
})(ERRORS_NAME || {});
const FIELD_INFO = {
  name: {
    name: "name",
    minChars: 3
  },
  surname: {
    name: "surname",
    minChars: 4
  }
};
const INPUT_STATE = {
  DISABLED: true,
  ENABLED: false
};
class FormValidationModel {
  constructor(fields, fieldErrors, button) {
    __publicField(this, "fields", []);
    __publicField(this, "errorMessages", {});
    __publicField(this, "fieldErrors", []);
    __publicField(this, "button");
    this.fields = fields;
    this.fieldErrors = fieldErrors;
    this.button = button;
  }
  initValidation() {
    this.fields.forEach((field) => {
      const fieldHTML = field.getHTML();
      const options = {};
      options.minChars = fieldHTML.name === FIELD_INFO.name.name ? FIELD_INFO.name.minChars : FIELD_INFO.surname.minChars;
      fieldHTML.addEventListener(
        "input",
        () => this.fieldCheck(field, fieldHTML, options)
      );
    });
  }
  updateBtnState() {
    const isValidFields = Object.values(this.fields).every(
      (field) => !field.getIsValid()
    );
    this.button.disabled = !isValidFields;
  }
  getErrorMessage(error, options, name) {
    this.errorMessages = {
      firstChar: "The first letter must be in uppercase",
      otherChars: 'Only letters of the Latin alphabet and "-" are allowed',
      emptyField: "The field can`t be empty",
      manyChars: `The ${name} field must contain more than ${options == null ? void 0 : options.minChars} characters`
    };
    return this.errorMessages[error];
  }
  setError(field, span, error, options, name) {
    const currentField = field;
    currentField.setIsValid(INPUT_STATE.DISABLED);
    const fieldHTML = currentField.getHTML();
    fieldHTML.classList.remove(styles$8.form__input__success);
    fieldHTML.classList.add(styles$8.form__input__error);
    const currentSpan = span;
    currentSpan.classList.remove(styles$8.form__span__hidden);
    currentSpan.classList.add(styles$8.form__span__visually);
    currentSpan.textContent = this.getErrorMessage(error, options, name);
    this.updateBtnState();
  }
  fieldCheck(field, fieldHTML, options) {
    const currentField = field;
    const { value } = fieldHTML;
    const { name } = fieldHTML;
    const currentErrorSpan = this.fieldErrors.filter(
      (item) => item.id === currentField.getHTML().id
    );
    const currentSpan = currentErrorSpan[0];
    if (value !== "" && value[0] !== value[0].toUpperCase()) {
      const errorCode = ERRORS_NAME.FIRST_CHAR;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }
    if (!/^[A-Za-z-]*$/.test(value)) {
      const errorCode = ERRORS_NAME.OTHER_CHARS;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }
    if (value === "") {
      const errorCode = ERRORS_NAME.EMPTY_FIELD;
      this.setError(currentField, currentSpan, errorCode);
      return;
    }
    if (value.length < options.minChars) {
      const errorCode = ERRORS_NAME.MANY_CHARS;
      this.setError(currentField, currentSpan, errorCode, options, name);
    } else {
      currentField.setIsValid(INPUT_STATE.ENABLED);
      fieldHTML.classList.add(styles$8.form__input__success);
      fieldHTML.classList.remove(styles$8.form__input__error);
      currentSpan.textContent = "";
      currentSpan.classList.add(styles$8.form__span__hidden);
      currentSpan.classList.remove(styles$8.form__span__visually);
      this.updateBtnState();
    }
  }
}
const TAG_NAMES = {
  div: "div",
  button: "button",
  form: "form",
  input: "input",
  textarea: "textarea",
  label: "label",
  span: "span",
  p: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  ul: "ul",
  li: "li",
  a: "a",
  img: "img",
  svg: "svg"
};
const EVENT_NAMES = {
  hashchange: "hashchange",
  click: "click",
  submit: "submit",
  dragOver: "dragover",
  dragDrop: "drop",
  dragStart: "dragstart",
  dragEnd: "dragend",
  dragLeave: "dragleave",
  dragEnter: "dragenter",
  input: "input",
  ended: "ended"
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
      tag: TAG_NAMES.input,
      attributes: attrs
    });
    return this.input;
  }
}
class InputFieldModal extends InputView {
  constructor(attrs, form2) {
    super(attrs);
    __publicField(this, "form");
    __publicField(this, "isValid");
    __publicField(this, "name");
    this.form = form2;
    this.isValid = true;
    this.name = attrs.name;
  }
  getInputName() {
    return this.name;
  }
  getIsValid() {
    return this.isValid;
  }
  setIsValid(isValid) {
    this.isValid = isValid;
  }
  getInputForm() {
    return this.form;
  }
  getData() {
    return this.input.value;
  }
}
const BUTTON_STATE = {
  DISABLED: true,
  ENABLED: false
};
class ButtonView {
  constructor(text, classes, attrs, action) {
    __publicField(this, "button");
    this.button = this.createHTML(action, classes, attrs, text);
  }
  getHTML() {
    return this.button;
  }
  createHTML(action, classes, attrs, text) {
    this.button = createBaseElement({
      tag: TAG_NAMES.button,
      cssClasses: classes,
      attributes: attrs,
      innerContent: text
    });
    if (action) {
      this.button.addEventListener(action.key, action.value);
    }
    return this.button;
  }
}
class ButtonModel {
  constructor(text, classes, attrs, action) {
    __publicField(this, "view");
    __publicField(this, "button");
    this.view = new ButtonView(text, classes, attrs, action);
    this.button = this.view.getHTML();
  }
  getHTML() {
    return this.button;
  }
  setDisabled() {
    this.button.disabled = BUTTON_STATE.DISABLED;
  }
  setEnabled() {
    this.button.disabled = BUTTON_STATE.ENABLED;
  }
  switchDisabled() {
    this.button.disabled = !this.button.disabled;
  }
}
class SubmitButtonModel extends ButtonModel {
  constructor(form2, text, classes, attrs, action) {
    super(text, classes, attrs, action);
    __publicField(this, "form");
    this.form = form2;
  }
}
var FIELD_NAMES = /* @__PURE__ */ ((FIELD_NAMES2) => {
  FIELD_NAMES2["NAME"] = "name";
  FIELD_NAMES2["SURNAME"] = "surname";
  return FIELD_NAMES2;
})(FIELD_NAMES || {});
const formattedText = (text) => text.split(" ").map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
class LoginFormView {
  constructor() {
    __publicField(this, "form");
    __publicField(this, "inputFields", []);
    __publicField(this, "inputFieldsHTML", []);
    __publicField(this, "fieldErrors", []);
    __publicField(this, "submitBtn");
    this.submitBtn = this.createSubmitBtn();
    this.form = this.createHTML();
  }
  getHTML() {
    return this.form;
  }
  getSubmitBtn() {
    return this.submitBtn;
  }
  getInputFields() {
    return this.inputFields;
  }
  getFieldErrors() {
    return this.fieldErrors;
  }
  createFieldBox(input) {
    const labelText = formattedText(input.name);
    const fieldLabel = createBaseElement({
      tag: TAG_NAMES.label,
      cssClasses: [styles$8.form__label],
      attributes: {
        for: input.id
      },
      innerContent: labelText
    });
    const fieldErrorSpan = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$8.form__span],
      attributes: {
        id: input.id
      }
    });
    this.fieldErrors.push(fieldErrorSpan);
    fieldLabel.append(input, fieldErrorSpan);
    return fieldLabel;
  }
  createInputsField() {
    const inputName = new InputFieldModal(
      {
        type: "text",
        name: FIELD_NAMES.NAME,
        id: FIELD_NAMES.NAME,
        placeholder: "Ivan",
        class: styles$8.form__input,
        autocomplete: "off"
      },
      this.form
    );
    const inputSurname = new InputFieldModal(
      {
        type: "text",
        name: FIELD_NAMES.SURNAME,
        id: FIELD_NAMES.SURNAME,
        placeholder: "Ivanov",
        class: styles$8.form__input,
        autocomplete: "off"
      },
      this.form
    );
    this.inputFieldsHTML.push(inputName.getHTML(), inputSurname.getHTML());
    return [inputName, inputSurname];
  }
  createSubmitBtn() {
    const textContentBtn = "Login";
    const submitBtn = new SubmitButtonModel(
      this.form,
      textContentBtn,
      [styles$8.form__btn, "btn-reset"],
      {
        type: "submit"
      }
    );
    submitBtn.setDisabled();
    return submitBtn;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: TAG_NAMES.form,
      cssClasses: [styles$8.form],
      attributes: {
        action: "#",
        method: "post"
      }
    });
    this.inputFields = this.createInputsField();
    this.inputFieldsHTML.forEach((input) => {
      const fieldBox = this.createFieldBox(input);
      this.form.append(fieldBox);
    });
    this.form.append(this.submitBtn.getHTML());
    return this.form;
  }
}
class LoginFormModel {
  constructor(page2) {
    __publicField(this, "form");
    __publicField(this, "formView");
    __publicField(this, "formValidation");
    __publicField(this, "page");
    this.page = page2;
    this.formView = new LoginFormView();
    this.form = this.formView.getHTML();
    this.form.addEventListener(EVENT_NAMES.submit, this.submit.bind(this));
    this.formValidation = new FormValidationModel(
      this.formView.getInputFields(),
      this.formView.getFieldErrors(),
      this.formView.getSubmitBtn().getHTML()
    );
    this.formValidation.initValidation();
  }
  getHTML() {
    return this.form;
  }
  getData() {
    const userData = {};
    this.formView.getInputFields().forEach((input) => {
      const key = input.getInputName();
      const value = input.getData();
      userData[key] = value;
    });
    return userData;
  }
  submit(event) {
    event.preventDefault();
    if (this.page.saveAuthUser) {
      this.page.saveAuthUser(this.getData());
    }
    this.form.remove();
  }
}
const PAGES_IDS = {
  START: "start",
  LOG_IN: "logIn",
  BLANK: "",
  CHOICE_GAME: "choiceGame",
  MAIN: "main",
  STATISTICS: "statistics"
};
const PAGES_STATE = {
  VISIBLE: "flex",
  HIDDEN: "none"
};
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
var STORE_KEYS = /* @__PURE__ */ ((STORE_KEYS2) => {
  STORE_KEYS2["LS_NAME"] = "kleostro";
  STORE_KEYS2["USER"] = "user";
  STORE_KEYS2["COMPLETED_ROUND"] = "completedRounds";
  STORE_KEYS2["LAST_ROUND"] = "lastRound";
  STORE_KEYS2["LISTEN_VISIBLE"] = "switchListenVisible";
  STORE_KEYS2["BACKGROUND_HINT"] = "switchBackgroundHintVisible";
  STORE_KEYS2["TRANSLATE_VISIBLE"] = "switchTranslateVisible";
  return STORE_KEYS2;
})(STORE_KEYS || {});
const AppEvents = {
  newUser: "newUser",
  logOut: "logOut",
  changeHash: "changeHash",
  switchTranslateVisible: "switchTranslateVisible",
  switchListenVisible: "switchListenVisible",
  switchBackgroundHintVisible: "switchBackgroundHintVisible",
  newGame: "newGame",
  newCompletedRound: "newCompletedRound",
  nextRound: "nextRound",
  switchDisableNextRoundBtn: "switchDisableNextRoundBtn",
  endRound: "endRound"
};
const page$3 = "_page_1gm9x_1";
const styles$7 = {
  page: page$3
};
class LoginPageView {
  constructor(id, parent) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "hidden", () => {
      this.page.style.display = PAGES_STATE.HIDDEN;
    });
    this.id = id;
    this.parent = parent;
    this.page = this.createHTML(this.id);
    this.hidden();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$7.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}
class LogInPageModel {
  constructor(id, parent, storage) {
    __publicField(this, "storage");
    __publicField(this, "id");
    __publicField(this, "singletonMediator");
    __publicField(this, "pageView");
    __publicField(this, "page");
    __publicField(this, "hidden", () => {
      this.page.style.display = PAGES_STATE.HIDDEN;
    });
    this.id = id;
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.pageView = new LoginPageView(id, parent);
    this.page = this.pageView.getHTML();
    this.drawForm();
    this.hidden();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  checkAuthUser() {
    const userData = this.storage.get(STORE_KEYS.USER);
    if (userData) {
      this.singletonMediator.notify(AppEvents.newUser, userData);
    } else {
      return false;
    }
    return true;
  }
  saveAuthUser(userData) {
    this.storage.add(STORE_KEYS.USER, JSON.stringify(userData));
    this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.START);
    this.drawForm();
  }
  drawForm() {
    const loginForm = new LoginFormModel(this);
    this.page.append(loginForm.getHTML());
  }
}
class StorageModel {
  constructor() {
    __publicField(this, "storage");
    this.storage = this.init();
  }
  get(key) {
    if (key in this.storage) {
      const result = JSON.parse(this.storage[key]);
      return result;
    }
    return void 0;
  }
  add(key, value) {
    this.storage[key] = value;
    this.save(this.storage);
  }
  remove(key) {
    delete this.storage[key];
    this.save(this.storage);
  }
  clear() {
    localStorage.clear();
    this.init();
  }
  save(data) {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
    this.storage = this.init();
  }
  init() {
    const storedData = localStorage.getItem(STORE_KEYS.LS_NAME);
    const safeJsonParse = (str) => {
      try {
        const jsonValue = JSON.parse(str);
        return jsonValue;
      } catch {
        throw new Error("I need help >_<");
      }
    };
    if (storedData) {
      this.storage = safeJsonParse(storedData);
    } else {
      localStorage.setItem(STORE_KEYS.LS_NAME, "{}");
      this.storage = this.init();
    }
    return this.storage;
  }
}
const page$2 = "_page_19h0a_1";
const page__title = "_page__title_19h0a_9";
const page__subtitle = "_page__subtitle_19h0a_17";
const page__descr = "_page__descr_19h0a_23";
const page__btns = "_page__btns_19h0a_34";
const page__btn$1 = "_page__btn_19h0a_34";
const styles$6 = {
  page: page$2,
  page__title,
  page__subtitle,
  page__descr,
  page__btns,
  page__btn: page__btn$1
};
const BUTTONS_TEXT_CONTENT$1 = {
  loginBtn: "Log in",
  logOutBtn: "Log out",
  startBtn: "Start",
  choiceGameBtn: "Choose game"
};
class StartPageView {
  constructor(id, parent) {
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "title");
    __publicField(this, "subtitle");
    __publicField(this, "descr");
    __publicField(this, "startBtn");
    __publicField(this, "choiceGameBtn");
    __publicField(this, "logOutBtn");
    this.title = this.createTitle();
    this.subtitle = this.createSubtitle();
    this.descr = this.createDescr();
    this.startBtn = this.createStartBtn();
    this.choiceGameBtn = this.createChoiceGameBtn();
    this.logOutBtn = this.createLogOutBtn();
    this.parent = parent;
    this.page = this.createHTML(id);
  }
  getHTML() {
    return this.page;
  }
  getSubTitle() {
    return this.subtitle;
  }
  getLogOutBtn() {
    return this.logOutBtn;
  }
  getStartBtn() {
    return this.startBtn;
  }
  getChoiceGameBtn() {
    return this.choiceGameBtn;
  }
  createTitle() {
    const titleTextContent = "RSS Puzzle";
    this.title = createBaseElement({
      tag: TAG_NAMES.h1,
      cssClasses: [styles$6.page__title],
      innerContent: titleTextContent
    });
    return this.title;
  }
  createSubtitle() {
    this.subtitle = createBaseElement({
      tag: TAG_NAMES.h2,
      cssClasses: [styles$6.page__subtitle]
    });
    return this.subtitle;
  }
  createDescr() {
    const descrTextContent = "Embark on a wonderful journey of learning English by assembling jigsaw puzzles of paintings by great artists";
    this.descr = createBaseElement({
      tag: TAG_NAMES.p,
      cssClasses: [styles$6.page__descr],
      innerContent: descrTextContent
    });
    return this.descr;
  }
  createStartBtn() {
    this.startBtn = new ButtonModel(BUTTONS_TEXT_CONTENT$1.startBtn, [
      styles$6.page__btn,
      "btn-reset"
    ]);
    return this.startBtn;
  }
  createChoiceGameBtn() {
    this.choiceGameBtn = new ButtonModel(BUTTONS_TEXT_CONTENT$1.choiceGameBtn, [
      styles$6.page__btn,
      "btn-reset"
    ]);
    return this.choiceGameBtn;
  }
  createLogOutBtn() {
    this.logOutBtn = new ButtonModel(BUTTONS_TEXT_CONTENT$1.logOutBtn, [
      styles$6.page__btn,
      "btn-reset"
    ]);
    return this.logOutBtn;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$6.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    const btnsWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$6.page__btns]
    });
    btnsWrapper.append(
      this.startBtn.getHTML(),
      this.choiceGameBtn.getHTML(),
      this.logOutBtn.getHTML()
    );
    this.page.append(this.title, this.subtitle, this.descr, btnsWrapper);
    this.parent.append(this.page);
    return this.page;
  }
}
class StartPageModel {
  constructor(id, parent, storage) {
    __publicField(this, "storage");
    __publicField(this, "id");
    __publicField(this, "pageView");
    __publicField(this, "page");
    __publicField(this, "subtitle");
    __publicField(this, "startBtn");
    __publicField(this, "choiceGameBtn");
    __publicField(this, "logOutBtn");
    __publicField(this, "singletonMediator");
    this.id = id;
    this.pageView = new StartPageView(id, parent);
    this.page = this.pageView.getHTML();
    this.subtitle = this.pageView.getSubTitle();
    this.startBtn = this.pageView.getStartBtn();
    this.choiceGameBtn = this.pageView.getChoiceGameBtn();
    this.logOutBtn = this.pageView.getLogOutBtn();
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.newUser,
      this.greeting.bind(this)
    );
    this.setHandlers();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  greeting() {
    const userData = this.storage.get(STORE_KEYS.USER);
    const greeting = `Hello, ${userData == null ? void 0 : userData.name} ${userData == null ? void 0 : userData.surname}!`;
    this.subtitle.textContent = greeting;
    return greeting;
  }
  logOut() {
    this.storage.remove(STORE_KEYS.USER);
    this.storage.remove(STORE_KEYS.COMPLETED_ROUND);
    this.storage.remove(STORE_KEYS.LAST_ROUND);
    this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
    this.singletonMediator.notify(AppEvents.logOut, "");
  }
  setHandlers() {
    this.logOutBtn.getHTML().addEventListener(EVENT_NAMES.click, this.logOut.bind(this));
    this.startBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
    });
    this.choiceGameBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(
        AppEvents.changeHash,
        PAGES_IDS.CHOICE_GAME
      );
    });
  }
}
const PAGE_DELAY = 500;
const MAX_OPACITY = 1;
class RouterModel {
  constructor(pages) {
    __publicField(this, "pages");
    __publicField(this, "currentPage");
    __publicField(this, "duration");
    __publicField(this, "singletonMediator");
    __publicField(this, "renderNewPageCallback", (hash) => {
      if (typeof hash === "string") {
        window.location.hash = hash;
        this.renderNewPage(hash);
      }
    });
    this.pages = pages;
    this.currentPage = this.setCurrentPage();
    this.duration = PAGE_DELAY;
    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.changeHash,
      this.renderNewPageCallback
    );
    window.addEventListener(
      EVENT_NAMES.hashchange,
      this.hashChangeHandler.bind(this)
    );
  }
  init() {
    const loginPage = this.pages[PAGES_IDS.LOG_IN];
    if (loginPage.checkAuthUser) {
      if (loginPage.checkAuthUser()) {
        this.renderNewPageCallback(PAGES_IDS.START);
      } else {
        this.renderNewPageCallback(PAGES_IDS.LOG_IN);
      }
    }
  }
  setCurrentPage() {
    const currentHash = window.location.hash.slice(1);
    if (currentHash in this.pages) {
      this.currentPage = this.pages[currentHash];
    } else if (currentHash === PAGES_IDS.BLANK) {
      this.currentPage = this.pages[PAGES_IDS.LOG_IN];
    }
    return this.currentPage;
  }
  renderNewPage(pageID) {
    const formattedTitle = pageID[0].toUpperCase() + pageID.slice(1);
    document.title = formattedTitle;
    this.fadeOutAndIn(this.currentPage, this.pages[pageID]);
    this.currentPage = this.pages[pageID];
  }
  fadeOutAndIn(currentPage, nextPage) {
    let start = performance.now();
    const fadeIn = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / this.duration, MAX_OPACITY);
      const page2 = nextPage.getHTML();
      page2.style.opacity = `${progress}`;
      page2.style.display = PAGES_STATE.VISIBLE;
      if (elapsed < this.duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };
    const fadeOut = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / this.duration, MAX_OPACITY);
      const opacity = MAX_OPACITY - progress;
      const page2 = currentPage.getHTML();
      page2.style.opacity = `${opacity}`;
      if (elapsed < this.duration) {
        window.requestAnimationFrame(fadeOut);
      } else {
        Object.entries(this.pages).forEach(([key, value]) => {
          if (key !== this.currentPage.getHTML().id && value.getHTML()) {
            const val = value.getHTML();
            val.style.display = PAGES_STATE.HIDDEN;
          }
        });
        page2.style.display = PAGES_STATE.HIDDEN;
        start = performance.now();
        window.requestAnimationFrame(fadeIn);
      }
    };
    window.requestAnimationFrame(fadeOut);
  }
  hashChangeHandler() {
    const loginPage = this.pages[PAGES_IDS.LOG_IN];
    const hash = window.location.hash.slice(1);
    if (!loginPage.checkAuthUser) {
      return;
    }
    if (!(hash in this.pages)) {
      if (loginPage.checkAuthUser()) {
        this.renderNewPageCallback(PAGES_IDS.START);
      } else {
        this.renderNewPageCallback(PAGES_IDS.LOG_IN);
      }
      return;
    }
    if (loginPage.checkAuthUser()) {
      if (hash !== PAGES_IDS.BLANK && hash !== PAGES_IDS.LOG_IN) {
        this.renderNewPageCallback(hash);
      } else {
        window.location.hash = this.currentPage.getID();
      }
    } else {
      this.renderNewPageCallback(PAGES_IDS.LOG_IN);
    }
  }
}
const randomIndex = 0.5;
const BUTTONS_TEXT_CONTENT = {
  continueBtn: "Continue",
  checkBtn: "Check",
  autocompleteBtn: "Autocomplete",
  translateBtn: "Translate",
  nextRoundBtn: "Next round",
  statisticsBtn: "Statistics"
};
const EVENT_ACCESSIBILITY = {
  none: "none",
  auto: "auto"
};
const AUDIO_SRC = "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/";
const playground = "_playground_1ghg4_1";
const translate_wrapper = "_translate_wrapper_1ghg4_9";
const translate_sentence = "_translate_sentence_1ghg4_19";
const translate_sentence_hidden = "_translate_sentence_hidden_1ghg4_29";
const translate_btn = "_translate_btn_1ghg4_34";
const translate_btn_active = "_translate_btn_active_1ghg4_46";
const zoom = "_zoom_1ghg4_1";
const translate_word = "_translate_word_1ghg4_73";
const open = "_open_1ghg4_76";
const source_data = "_source_data_1ghg4_80";
const game_board = "_game_board_1ghg4_81";
const game_board__complete = "_game_board__complete_1ghg4_104";
const line = "_line_1ghg4_113";
const line_complete = "_line_complete_1ghg4_125";
const copy_puzzle__error = "_copy_puzzle__error_1ghg4_131";
const copy_puzzle__success = "_copy_puzzle__success_1ghg4_134";
const line_hovered = "_line_hovered_1ghg4_138";
const no_drop = "_no_drop_1ghg4_142";
const continue_btn = "_continue_btn_1ghg4_146";
const check_btn = "_check_btn_1ghg4_147";
const autocomplete_btn = "_autocomplete_btn_1ghg4_148";
const nextRound_btn = "_nextRound_btn_1ghg4_149";
const statistics_btn = "_statistics_btn_1ghg4_150";
const btn__hidden = "_btn__hidden_1ghg4_186";
const translate_listen_hidden = "_translate_listen_hidden_1ghg4_190";
const game_board_title = "_game_board_title_1ghg4_195";
const game_board_description = "_game_board_description_1ghg4_201";
const game_board_wrapper = "_game_board_wrapper_1ghg4_209";
const game_board__image = "_game_board__image_1ghg4_214";
const styles$5 = {
  playground,
  translate_wrapper,
  translate_sentence,
  translate_sentence_hidden,
  translate_btn,
  translate_btn_active,
  zoom,
  translate_word,
  open,
  source_data,
  game_board,
  game_board__complete,
  line,
  line_complete,
  copy_puzzle__error,
  copy_puzzle__success,
  line_hovered,
  no_drop,
  continue_btn,
  check_btn,
  autocomplete_btn,
  nextRound_btn,
  statistics_btn,
  btn__hidden,
  translate_listen_hidden,
  game_board_title,
  game_board_description,
  game_board_wrapper,
  game_board__image
};
const volumeOn = `<?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M218.9,77.1a71.9,71.9,0,0,1,0,101.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="80" x2="80" y1="88" y2="168"/><path d="M190.6,105.4a31.9,31.9,0,0,1,0,45.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`;
const volumeOff = `<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#101820;}</style></defs><title/><g data-name="Layer 35" id="Layer_35"><path class="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z"/><path class="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z"/><rect class="cls-1" height="12" transform="translate(-3.77 22.9) rotate(-45)" width="2" x="24.76" y="10"/><rect class="cls-1" height="2" transform="translate(-3.77 22.9) rotate(-45)" width="12" x="19.76" y="15"/></g></svg>`;
const IMG_SRC$1 = {
  volumeOn,
  volumeOff
};
class PlaygroundView {
  constructor() {
    __publicField(this, "translateSentence");
    __publicField(this, "translateListenBtn");
    __publicField(this, "audio");
    __publicField(this, "translateWrapper");
    __publicField(this, "playground");
    __publicField(this, "gameBoard");
    __publicField(this, "sourceBlock");
    __publicField(this, "continueBtn");
    __publicField(this, "checkBtn");
    __publicField(this, "autocompleteBtn");
    __publicField(this, "nextRound");
    __publicField(this, "statisticsBtn");
    __publicField(this, "roundTitle");
    __publicField(this, "roundDescription");
    this.audio = new Audio();
    this.translateSentence = this.createTranslateSentence();
    this.translateListenBtn = this.createTranslateListenBtn();
    this.translateWrapper = this.createTranslateWrapper();
    this.gameBoard = this.createGameBoard();
    this.sourceBlock = this.createSourceBlock();
    this.continueBtn = this.createContinueBtn();
    this.checkBtn = this.createCheckBtn();
    this.autocompleteBtn = this.createAutocompleteBtn();
    this.nextRound = this.createNextRoundBtn();
    this.statisticsBtn = this.createStatisticsBtn();
    this.roundTitle = this.createRoundTitle();
    this.roundDescription = this.createRoundDescription();
    this.playground = this.createHTML();
  }
  getHTML() {
    return this.playground;
  }
  getTranslateSentenceHTML() {
    return this.translateSentence;
  }
  getTranslateSentenceWrapperHTML() {
    return this.translateWrapper;
  }
  getTranslateListenBtn() {
    return this.translateListenBtn;
  }
  getAudioElement() {
    return this.audio;
  }
  getGameBoardHTML() {
    return this.gameBoard;
  }
  clearGameBoardHTML() {
    this.gameBoard.innerHTML = "";
  }
  getSourceBlockHTML() {
    return this.sourceBlock;
  }
  clearSourceBlockHTML() {
    this.sourceBlock.innerHTML = "";
  }
  getContinueBtn() {
    return this.continueBtn;
  }
  getCheckBtn() {
    return this.checkBtn;
  }
  getAutocompleteBtn() {
    return this.autocompleteBtn;
  }
  getNextRoundBtn() {
    return this.nextRound;
  }
  getStatisticsBtn() {
    return this.statisticsBtn;
  }
  getRoundTitle() {
    return this.roundTitle;
  }
  getRoundDescription() {
    return this.roundDescription;
  }
  createTranslateListenBtn() {
    this.translateListenBtn = new ButtonModel("", [styles$5.translate_btn]);
    this.translateListenBtn.getHTML().innerHTML = IMG_SRC$1.volumeOff;
    return this.translateListenBtn;
  }
  createTranslateSentence() {
    this.translateSentence = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$5.translate_sentence]
    });
    return this.translateSentence;
  }
  createTranslateWrapper() {
    this.translateWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$5.translate_wrapper]
    });
    this.translateWrapper.append(
      this.audio,
      this.translateListenBtn.getHTML(),
      this.translateSentence
    );
    return this.translateWrapper;
  }
  createGameBoard() {
    this.gameBoard = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$5.game_board]
    });
    return this.gameBoard;
  }
  createSourceBlock() {
    this.sourceBlock = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$5.source_data]
    });
    return this.sourceBlock;
  }
  createContinueBtn() {
    this.continueBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.continueBtn, [
      styles$5.continue_btn,
      styles$5.btn__hidden
    ]);
    return this.continueBtn;
  }
  createCheckBtn() {
    this.checkBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.checkBtn, [
      styles$5.check_btn
    ]);
    this.checkBtn.setDisabled();
    return this.checkBtn;
  }
  createNextRoundBtn() {
    this.nextRound = new ButtonModel(BUTTONS_TEXT_CONTENT.continueBtn, [
      styles$5.nextRound_btn,
      styles$5.btn__hidden
    ]);
    return this.nextRound;
  }
  createStatisticsBtn() {
    this.statisticsBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.statisticsBtn, [
      styles$5.statistics_btn,
      styles$5.btn__hidden
    ]);
    return this.statisticsBtn;
  }
  createAutocompleteBtn() {
    this.autocompleteBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.autocompleteBtn,
      [styles$5.autocomplete_btn]
    );
    return this.autocompleteBtn;
  }
  createRoundTitle() {
    this.roundTitle = createBaseElement({
      tag: TAG_NAMES.h2,
      cssClasses: [styles$5.game_board_title]
    });
    return this.roundTitle;
  }
  createRoundDescription() {
    this.roundDescription = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$5.game_board_description]
    });
    return this.roundDescription;
  }
  createHTML() {
    this.playground = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$5.playground]
    });
    this.playground.append(
      this.translateWrapper,
      this.gameBoard,
      this.sourceBlock,
      this.continueBtn.getHTML(),
      this.checkBtn.getHTML(),
      this.nextRound.getHTML(),
      this.statisticsBtn.getHTML(),
      this.autocompleteBtn.getHTML()
    );
    return this.playground;
  }
}
const puzzle_wrapper = "_puzzle_wrapper_tcfy0_1";
const puzzle = "_puzzle_tcfy0_1";
const puzzle_placeholder = "_puzzle_placeholder_tcfy0_21";
const puzzle_completed = "_puzzle_completed_tcfy0_28";
const puzzleStyles = {
  puzzle_wrapper,
  puzzle,
  puzzle_placeholder,
  puzzle_completed
};
class PuzzleComponent {
  constructor(word, playground2, playgroundView) {
    __publicField(this, "puzzle");
    __publicField(this, "word");
    __publicField(this, "playground");
    __publicField(this, "playgroundView");
    this.word = word;
    this.playground = playground2;
    this.playgroundView = playgroundView;
    this.puzzle = this.createHTML(this.word);
  }
  getHTML() {
    return this.puzzle;
  }
  getWord() {
    return this.word;
  }
  calculateSizePuzzle(elem) {
    const currentElem = elem;
    const wordLength = this.word.length;
    const paddingX = 2;
    const paddingY = 1;
    const pivotFont = 5;
    const minFontSize = 75;
    const maxFontSize = 85;
    const calcFontSize = wordLength > pivotFont ? minFontSize : maxFontSize;
    const padding = `${paddingY}% ${paddingX}%`;
    const fontSize = `${calcFontSize}%`;
    currentElem.style.padding = padding;
    currentElem.style.fontSize = fontSize;
  }
  clickPuzzleHandler() {
    const wordsInCurrentLine = this.playground.getWordsInCurrentLine();
    const words = this.playground.getWords();
    const currentRound = this.playground.getCurrentRound();
    const checkBtn = this.playgroundView.getCheckBtn();
    const wordLines = this.playground.getWordLinesHTML();
    if (this.puzzle.parentNode !== wordLines[currentRound]) {
      this.handlePuzzleNotInCurrentLine(
        words,
        currentRound,
        checkBtn,
        wordLines,
        wordsInCurrentLine
      );
    } else {
      this.handlePuzzleInCurrentLine(
        words,
        currentRound,
        checkBtn,
        wordsInCurrentLine,
        wordLines
      );
    }
  }
  handlePuzzleNotInCurrentLine(words, currentRound, checkBtn, wordLines, wordsInCurrentLine) {
    wordLines[currentRound].append(this.puzzle);
    wordsInCurrentLine.push(this.word);
    if (wordsInCurrentLine.length === words[currentRound].length) {
      checkBtn.setEnabled();
    } else {
      checkBtn.setDisabled();
    }
  }
  handlePuzzleInCurrentLine(words, currentRound, checkBtn, wordsInCurrentLine, wordLines) {
    const puzzlesArr = wordLines[currentRound].children;
    Array.from(puzzlesArr).forEach((puzzle2) => {
      puzzle2.classList.remove(
        styles$5.copy_puzzle__error,
        styles$5.copy_puzzle__success
      );
    });
    const index2 = wordsInCurrentLine.indexOf(this.word);
    if (index2 > -1) {
      wordsInCurrentLine.splice(index2, 1);
    }
    this.playground.setWordsInCurrentLine(wordsInCurrentLine);
    this.playgroundView.getSourceBlockHTML().append(this.puzzle);
    if (wordsInCurrentLine.length !== words[currentRound].length) {
      checkBtn.setDisabled();
    } else {
      checkBtn.setEnabled();
    }
  }
  createHTML(word) {
    const isDraggable = "true";
    this.puzzle = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [puzzleStyles.puzzle],
      attributes: {
        draggable: isDraggable,
        id: word
      },
      innerContent: word
    });
    this.calculateSizePuzzle(this.puzzle);
    this.puzzle.addEventListener(
      EVENT_NAMES.click,
      this.clickPuzzleHandler.bind(this)
    );
    return this.puzzle;
  }
}
const isNewData = (data) => {
  if (typeof data === "object" && data !== null && "currentRound" in data && typeof data.currentRound === "number" && "currentLVL" in data && typeof data.currentLVL === "number" && "gameData" in data && data.gameData !== null && Array.isArray(data.gameData) && data.gameData.every(
    (round) => "rounds" in round && Array.isArray(round.rounds) && "roundsCount" in round && typeof round.roundsCount === "number"
  )) {
    return true;
  }
  return false;
};
const API_URLS = {
  levelData: "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel",
  cutImg: "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/"
};
const shuffleArr = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
class PlaygroundModel {
  constructor(storage) {
    __publicField(this, "storage");
    __publicField(this, "view");
    __publicField(this, "gameData", []);
    __publicField(this, "levelData", null);
    __publicField(this, "audio");
    __publicField(this, "singletonMediator");
    __publicField(this, "words", []);
    __publicField(this, "translateSentence", "");
    __publicField(this, "shuffledWords");
    __publicField(this, "lvl", 1);
    __publicField(this, "currentRoundLvl", 0);
    __publicField(this, "currentRound", 0);
    __publicField(this, "wordsInCurrentLine", []);
    __publicField(this, "puzzles", []);
    __publicField(this, "wordLinesHTML", []);
    __publicField(this, "dragWrapper");
    __publicField(this, "knowLines", /* @__PURE__ */ new Map());
    __publicField(this, "dontKnowLines", /* @__PURE__ */ new Map());
    __publicField(this, "imageRound", null);
    __publicField(this, "pictureInfo", {
      src: "",
      title: "",
      info: ""
    });
    this.storage = storage;
    this.view = new PlaygroundView();
    this.singletonMediator = MediatorModel.getInstance();
    this.audio = this.view.getAudioElement();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.dragWrapper = this.view.getSourceBlockHTML();
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  getView() {
    return this.view;
  }
  getWordsInCurrentLine() {
    return this.wordsInCurrentLine;
  }
  setWordsInCurrentLine(words) {
    this.wordsInCurrentLine = words;
  }
  getWordLinesHTML() {
    return this.wordLinesHTML;
  }
  getCurrentRound() {
    return this.currentRound;
  }
  getWords() {
    return this.words;
  }
  getPuzzles() {
    return this.puzzles;
  }
  getImageRound() {
    return this.imageRound;
  }
  switchTranslateListen() {
    const translateListenHTML = this.view.getTranslateListenBtn().getHTML();
    translateListenHTML.innerHTML = IMG_SRC$1.volumeOn;
    translateListenHTML.classList.add(styles$5.translate_btn_active);
    this.audio.src = this.getCurrentAudioURL();
    this.audio.play().catch(() => {
    });
  }
  setDragsForSourceBlock() {
    const sourceBlock = this.view.getSourceBlockHTML();
    sourceBlock.addEventListener(
      EVENT_NAMES.dragOver,
      (event) => event.preventDefault()
    );
    sourceBlock.addEventListener(EVENT_NAMES.dragDrop, (event) => {
      this.setDragDrop(event, sourceBlock);
    });
  }
  checkLine() {
    if (this.wordsInCurrentLine.length === this.words[this.currentRound].length && this.wordsInCurrentLine.every(
      (word, index2) => this.words[this.currentRound][index2] === word
    )) {
      const continueBtn = this.view.getContinueBtn();
      continueBtn.setEnabled();
      const currentWordLine = this.wordLinesHTML[this.currentRound];
      const filterStyle = "grayscale(0)";
      currentWordLine.style.backdropFilter = filterStyle;
      currentWordLine.style.pointerEvents = EVENT_ACCESSIBILITY.none;
      this.puzzles[this.currentRound].forEach((puzzle2) => {
        const currentPuzzle = puzzle2.getHTML();
        currentPuzzle.classList.remove(puzzleStyles.puzzle_placeholder);
      });
      const translateSentenceHTML = this.view.getTranslateSentenceHTML();
      translateSentenceHTML.classList.remove(styles$5.translate_sentence_hidden);
      const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
      translateListenBtn.classList.remove(styles$5.translate_listen_hidden);
      this.addKnowLine();
      return true;
    }
    return false;
  }
  addKnowLine() {
    var _a;
    const currentLine = (_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].words[this.currentRound];
    const currentLineData = {
      audioCurrentLineSrc: this.getCurrentAudioURL(),
      sentenceCurrentLine: currentLine == null ? void 0 : currentLine.textExample
    };
    this.knowLines.set(this.currentRound, currentLineData);
  }
  addDontKnowLine() {
    var _a;
    const currentLine = (_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].words[this.currentRound];
    const currentLineData = {
      audioCurrentLineSrc: this.getCurrentAudioURL(),
      sentenceCurrentLine: currentLine == null ? void 0 : currentLine.textExample
    };
    this.dontKnowLines.set(this.currentRound, currentLineData);
  }
  clearRoundInfo() {
    this.currentRound = 0;
    this.words = [];
    this.wordsInCurrentLine = [];
    this.puzzles = [];
    this.wordLinesHTML = [];
    this.shuffledWords = [];
    this.wordsInCurrentLine = [];
    this.knowLines.clear();
    this.dontKnowLines.clear();
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const nextRoundBtn = this.view.getNextRoundBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    const statisticsBtn = this.view.getStatisticsBtn();
    nextRoundBtn.getHTML().classList.add(styles$5.btn__hidden);
    checkBtn.getHTML().classList.remove(styles$5.btn__hidden);
    autoCompleteBtn.getHTML().classList.remove(styles$5.btn__hidden);
    statisticsBtn.getHTML().classList.add(styles$5.btn__hidden);
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    autoCompleteBtn.setEnabled();
  }
  setCurrentWords() {
    var _a;
    const currentWords = (_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].words;
    currentWords == null ? void 0 : currentWords.forEach((word) => {
      this.words.push(word.textExample.split(" "));
    });
  }
  checkLimitSaveGame() {
    if (this.levelData && this.currentRoundLvl === this.levelData.roundsCount) {
      this.lvl = this.lvl === this.gameData.length - 1 ? 0 : this.lvl += 1;
      this.levelData = this.gameData[this.lvl];
      this.currentRoundLvl = 0;
    }
  }
  checkVisibleBackgroundHint() {
    this.puzzles.forEach((line2) => {
      line2.forEach((puzzle2) => {
        const currentPuzzle = puzzle2.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          this.storage.get(STORE_KEYS.BACKGROUND_HINT) === false
        );
      });
    });
  }
  setCurrentRoundImg() {
    var _a;
    const imgRoundSrc = `${API_URLS.cutImg}${(_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].levelData.imageSrc}`;
    this.imageRound = new Image();
    this.imageRound.src = imgRoundSrc;
    this.imageRound.classList.add(styles$5.game_board__image);
    this.imageRound.onload = async () => {
      const gameBoard = this.view.getGameBoardHTML();
      if (this.imageRound) {
        gameBoard.append(this.imageRound);
      }
      await this.waitForImageClientWidth();
      this.addBackgroundToPuzzle();
    };
  }
  waitForImageClientWidth() {
    return new Promise((resolve) => {
      const checkClientWidth = () => {
        var _a;
        if ((_a = this.imageRound) == null ? void 0 : _a.clientWidth) {
          resolve();
        } else {
          const time = 100;
          setTimeout(checkClientWidth, time);
        }
      };
      checkClientWidth();
    });
  }
  redrawPlayground() {
    this.view.getGameBoardHTML().classList.remove(styles$5.game_board__complete);
    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.setCurrentWords();
    this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.createPuzzleElements();
    this.checkVisibleBackgroundHint();
    this.fillSourcedBlock();
    this.setDragListenersToNextRound();
    this.setTranslateSentence();
    this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
    this.wordLinesHTML[this.currentRound].style.pointerEvents = EVENT_ACCESSIBILITY.auto;
    this.setCurrentRoundImg();
  }
  setTranslateSentence() {
    var _a;
    let translateSentence = (_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].words[this.currentRound].textExampleTranslate;
    if (!translateSentence) {
      translateSentence = "";
    }
    this.translateSentence = translateSentence;
    return this.translateSentence;
  }
  shuffleWords() {
    this.shuffledWords = this.words.map(
      (wordArr) => [...wordArr].sort(() => Math.random() - randomIndex)
    );
    return this.shuffledWords;
  }
  saveCompletedRound() {
    let completedRounds = this.storage.get(STORE_KEYS.COMPLETED_ROUND) || [];
    if (!completedRounds) {
      completedRounds = [];
    }
    const formattedLVL = this.lvl + 1;
    const completedRoundData = {
      lvl: formattedLVL,
      round: this.currentRoundLvl
    };
    completedRounds.push(completedRoundData);
    this.storage.add(
      STORE_KEYS.COMPLETED_ROUND,
      JSON.stringify(completedRounds)
    );
    this.singletonMediator.notify(AppEvents.newCompletedRound, "");
  }
  saveLastRound() {
    const lastRoundData = {
      currentLVL: this.lvl + 1,
      currentRound: this.currentRoundLvl + 1,
      gameData: this.gameData
    };
    this.storage.add(STORE_KEYS.LAST_ROUND, JSON.stringify(lastRoundData));
  }
  checkLimitGames() {
    if (this.levelData && this.currentRoundLvl === this.levelData.roundsCount - 1) {
      this.lvl = this.lvl === this.gameData.length - 1 ? 0 : this.lvl += 1;
      this.levelData = this.gameData[this.lvl];
      this.currentRoundLvl = 0;
    } else {
      this.currentRoundLvl += 1;
    }
  }
  setGameData(data) {
    if (isNewData(data)) {
      this.lvl = data.currentLVL - 1;
      this.currentRoundLvl = data.currentRound;
      this.gameData = data.gameData;
      this.levelData = data.gameData[this.lvl];
      this.checkLimitSaveGame();
      this.clearRoundInfo();
      this.redrawPlayground();
    }
  }
  startNextLine() {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    const nextRoundBtn = this.view.getNextRoundBtn();
    const statisticsBtn = this.view.getStatisticsBtn();
    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();
    this.cleanAllUnmatchedPuzzles();
    this.currentRound += 1;
    if (this.wordLinesHTML[this.currentRound]) {
      this.wordLinesHTML[this.currentRound].style.pointerEvents = EVENT_ACCESSIBILITY.auto;
    }
    continueBtn.getHTML().classList.add(styles$5.btn__hidden);
    nextRoundBtn.getHTML().classList.add(styles$5.btn__hidden);
    statisticsBtn.getHTML().classList.add(styles$5.btn__hidden);
    checkBtn.getHTML().classList.remove(styles$5.btn__hidden);
    if (this.currentRound === this.words.length) {
      this.endRound();
      return;
    }
    this.setDragListenersToNextRound();
    this.setTranslateSentence();
    this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
    this.wordsInCurrentLine = [];
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    autoCompleteBtn.setEnabled();
    this.view.clearSourceBlockHTML();
    this.fillSourcedBlock();
  }
  startNextRound() {
    this.view.getGameBoardHTML().classList.remove(styles$5.game_board__complete);
    this.view.getCheckBtn().setDisabled();
    this.view.getCheckBtn().getHTML().classList.remove(styles$5.btn__hidden);
    this.view.getNextRoundBtn().getHTML().classList.add(styles$5.btn__hidden);
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    autoCompleteBtn.setEnabled();
    this.saveCompletedRound();
    this.clearRoundInfo();
    this.checkLimitGames();
    this.redrawPlayground();
    this.view.getTranslateSentenceHTML().classList.toggle(
      styles$5.translate_sentence_hidden,
      this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE)
    );
    this.view.getTranslateListenBtn().getHTML().classList.toggle(
      styles$5.translate_listen_hidden,
      this.storage.get(STORE_KEYS.LISTEN_VISIBLE)
    );
  }
  getCurrentRoundInfo() {
    var _a, _b, _c, _d;
    const imgSrc = `${API_URLS.cutImg}${(_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].levelData.cutSrc}`;
    const titleTextContent = ((_b = this.levelData) == null ? void 0 : _b.rounds[this.currentRoundLvl].levelData.author) ?? "";
    const pictureNameText = ((_c = this.levelData) == null ? void 0 : _c.rounds[this.currentRoundLvl].levelData.name) ?? "";
    const pictureYearText = ((_d = this.levelData) == null ? void 0 : _d.rounds[this.currentRoundLvl].levelData.year) ?? "";
    const formattedTitle = formattedText(titleTextContent);
    const formattedPictureName = formattedText(pictureNameText);
    const formattedPictureYear = formattedText(pictureYearText);
    const imgInfo = `- ${formattedPictureName} (${formattedPictureYear})`;
    return {
      src: imgSrc,
      title: formattedTitle,
      info: imgInfo
    };
  }
  endRound() {
    this.puzzles.forEach((line2) => {
      line2.forEach((puzzle2) => {
        const currentPuzzle = puzzle2.getHTML();
        currentPuzzle.style.backgroundImage = "";
      });
    });
    this.saveCompletedRound();
    this.saveLastRound();
    this.createContentForCompleteRound();
    this.view.getTranslateSentenceHTML().classList.add(styles$5.translate_sentence_hidden);
    this.view.getTranslateListenBtn().getHTML().classList.add(styles$5.translate_listen_hidden);
    const continueBtn = this.view.getContinueBtn().getHTML();
    continueBtn.classList.add(styles$5.btn__hidden);
    const checkBtn = this.view.getCheckBtn().getHTML();
    checkBtn.classList.add(styles$5.btn__hidden);
    const nextRoundBtn = this.view.getNextRoundBtn().getHTML();
    nextRoundBtn.classList.remove(styles$5.btn__hidden);
    const statisticsBtn = this.view.getStatisticsBtn().getHTML();
    statisticsBtn.classList.remove(styles$5.btn__hidden);
    const autoCompleteBtn = this.view.getAutocompleteBtn().getHTML();
    autoCompleteBtn.classList.add(styles$5.btn__hidden);
    this.pictureInfo = this.getCurrentRoundInfo();
    this.singletonMediator.notify(AppEvents.endRound, [
      this.knowLines,
      this.dontKnowLines,
      this.pictureInfo
    ]);
  }
  getCurrentAudioURL() {
    var _a;
    const currentAudioSrc = (_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].words[this.currentRound].audioExample;
    const url = `${AUDIO_SRC}${currentAudioSrc}`;
    return url;
  }
  addBackgroundToPuzzle() {
    const imageWidth = this.view.getGameBoardHTML().clientWidth ?? 0;
    const imageHeight = this.view.getGameBoardHTML().clientHeight ?? 0;
    const maxLines = 10;
    this.words.forEach((line2, lineIndex) => {
      line2.forEach((_, puzzleIndex) => {
        this.puzzles.forEach((lineArr) => {
          lineArr.forEach((puzzle2) => {
            var _a;
            const puzzleLine = puzzle2.getHTML().getAttribute("line");
            const puzzleWord = puzzle2.getHTML().getAttribute("word");
            const currentPuzzle = puzzle2.getHTML();
            if (puzzleLine === String(lineIndex) && puzzleWord === String(puzzleIndex)) {
              if (!currentPuzzle.style.backgroundImage) {
                let backgroundPositionX = 0;
                let backgroundPositionY = 0;
                if (puzzleIndex > 0) {
                  backgroundPositionX = -(puzzleIndex * (imageWidth / line2.length));
                }
                if (lineIndex > 0) {
                  backgroundPositionY = -(lineIndex * (imageHeight / maxLines));
                }
                currentPuzzle.style.backgroundImage = `url(${(_a = this.imageRound) == null ? void 0 : _a.src})`;
                currentPuzzle.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
                currentPuzzle.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
              }
            }
          });
        });
      });
    });
  }
  checkMatchingPuzzles() {
    this.wordsInCurrentLine.forEach((word, index2) => {
      const isMatching = word === this.words[this.currentRound][index2];
      const currentLine = this.wordLinesHTML[this.currentRound];
      const currentLineChildren = Array.from(currentLine.children);
      currentLineChildren[index2].classList.toggle(
        styles$5.copy_puzzle__error,
        !isMatching
      );
      currentLineChildren[index2].classList.toggle(
        styles$5.copy_puzzle__success,
        isMatching
      );
      const continueBtnHTML = this.view.getContinueBtn().getHTML();
      const checkBtnHTML = this.view.getCheckBtn().getHTML();
      this.view.getCheckBtn().setDisabled();
      const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();
      continueBtnHTML.classList.toggle(styles$5.btn__hidden, !this.checkLine());
      checkBtnHTML.classList.toggle(styles$5.btn__hidden, this.checkLine());
      autoCompleteBtnHTML.disabled = this.checkLine();
    });
  }
  cleanAllUnmatchedPuzzles() {
    const currentLine = this.wordLinesHTML[this.currentRound];
    const currentLineChildren = Array.from(currentLine.children);
    currentLineChildren.forEach((children) => {
      children.classList.remove(
        styles$5.copy_puzzle__success,
        styles$5.copy_puzzle__error
      );
    });
  }
  setDragListenersToNextRound() {
    this.puzzles[this.currentRound].forEach((puzzle2) => {
      const currentPuzzle = puzzle2.getHTML();
      const puzzleWord = puzzle2.getWord();
      currentPuzzle.addEventListener(
        EVENT_NAMES.dragStart,
        (event) => {
          this.setDragStartForPuzzle(currentPuzzle, event, puzzleWord);
          const parent = currentPuzzle.parentElement;
          if (parent) {
            this.dragWrapper = parent;
          }
        }
      );
      currentPuzzle.addEventListener(EVENT_NAMES.dragEnd, () => {
        this.setDragEndForPuzzle(currentPuzzle);
      });
    });
  }
  createContentForCompleteRound() {
    var _a, _b, _c;
    this.wordLinesHTML.forEach((wordsLine) => {
      const currentWordsLine = wordsLine;
      currentWordsLine.classList.add(styles$5.line_complete);
      const wordsLineChildren = Array.from(wordsLine.children);
      wordsLineChildren.forEach((puzzle2) => {
        const puzzleHTML = puzzle2;
        puzzleHTML.classList.add(puzzleStyles.puzzle_completed);
        if (puzzleHTML instanceof HTMLDivElement) {
          const fontSize = "0px";
          puzzleHTML.style.fontSize = fontSize;
        }
      });
    });
    const titleTextContent = ((_a = this.levelData) == null ? void 0 : _a.rounds[this.currentRoundLvl].levelData.author) ?? "";
    const pictureNameText = ((_b = this.levelData) == null ? void 0 : _b.rounds[this.currentRoundLvl].levelData.name) ?? "";
    const pictureYearText = ((_c = this.levelData) == null ? void 0 : _c.rounds[this.currentRoundLvl].levelData.year) ?? "";
    const formattedTitle = formattedText(titleTextContent);
    const formattedPictureName = formattedText(pictureNameText);
    const formattedPictureYear = formattedText(pictureYearText);
    const imgInfo = `- ${formattedPictureName} (${formattedPictureYear})`;
    const gameBoardHTML = this.view.getGameBoardHTML();
    const title = this.view.getRoundTitle();
    const description = this.view.getRoundDescription();
    gameBoardHTML.classList.add(styles$5.game_board__complete);
    title.textContent = formattedTitle;
    description.textContent = imgInfo;
    gameBoardHTML.append(title, description);
  }
  autoCompleteLine() {
    this.wordLinesHTML[this.currentRound].innerHTML = "";
    this.wordLinesHTML[this.currentRound].style.pointerEvents = EVENT_ACCESSIBILITY.none;
    this.view.clearSourceBlockHTML();
    const wordsCopy = [...this.words[this.currentRound]];
    const puzzlesCopy = [...this.puzzles[this.currentRound]];
    wordsCopy.forEach((word, index2) => {
      const puzzle2 = puzzlesCopy.find(
        (item) => item.getHTML().id === word && item.getHTML().getAttribute("word") === String(index2)
      );
      if (puzzle2) {
        this.wordLinesHTML[this.currentRound].appendChild(puzzle2.getHTML());
      }
    });
    this.puzzles[this.currentRound].forEach((puzzle2) => {
      const currentPuzzle = puzzle2.getHTML();
      currentPuzzle.classList.remove(puzzleStyles.puzzle_placeholder);
    });
    const checkBtnHTML = this.view.getCheckBtn();
    const continueBtnHTML = this.view.getContinueBtn();
    const nextRoundBtnHTML = this.view.getNextRoundBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    continueBtnHTML.getHTML().classList.remove(styles$5.btn__hidden);
    nextRoundBtnHTML.getHTML().classList.add(styles$5.btn__hidden);
    checkBtnHTML.getHTML().classList.add(styles$5.btn__hidden);
    autoCompleteBtn.setDisabled();
    checkBtnHTML.setEnabled();
    continueBtnHTML.setEnabled();
    this.view.getTranslateSentenceHTML().classList.remove(styles$5.translate_sentence_hidden);
    this.view.getTranslateListenBtn().getHTML().classList.remove(styles$5.translate_listen_hidden);
    this.addDontKnowLine();
  }
  switchInitialTranslateSentence() {
    const isVisible = this.storage.get(AppEvents.switchTranslateVisible);
    const translateSentenceHTML = this.view.getTranslateSentenceHTML();
    if (typeof isVisible === "boolean") {
      translateSentenceHTML.classList.toggle(
        styles$5.translate_sentence_hidden,
        isVisible
      );
    }
  }
  switchVisibleTranslateSentence(isVisible) {
    const translateSentenceHTML = this.view.getTranslateSentenceHTML();
    if (typeof isVisible === "boolean") {
      translateSentenceHTML.classList.toggle(
        styles$5.translate_sentence_hidden,
        !isVisible
      );
    }
  }
  switchInitialTranslateListen() {
    const isVisible = this.storage.get(AppEvents.switchListenVisible);
    const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
    if (typeof isVisible === "boolean") {
      translateListenBtn.classList.toggle(
        styles$5.translate_listen_hidden,
        isVisible
      );
    }
  }
  switchVisibleTranslateListen(isVisible) {
    const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
    if (typeof isVisible === "boolean") {
      translateListenBtn.classList.toggle(
        styles$5.translate_listen_hidden,
        !isVisible
      );
    }
  }
  switchVisibleBackgroundHint(isVisible) {
    if (typeof isVisible === "boolean") {
      this.puzzles[this.currentRound].forEach((puzzle2) => {
        const currentPuzzle = puzzle2.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          !isVisible
        );
      });
    }
  }
  setHandlersToButtons() {
    const checkBtnHTML = this.view.getCheckBtn().getHTML();
    const continueBtnHTML = this.view.getContinueBtn().getHTML();
    const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();
    const nextRoundBtnHTML = this.view.getNextRoundBtn().getHTML();
    const statisticsBtnHTML = this.view.getStatisticsBtn().getHTML();
    checkBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.checkMatchingPuzzles.bind(this)
    );
    continueBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextLine.bind(this)
    );
    autoCompleteBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.autoCompleteLine.bind(this)
    );
    nextRoundBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextRound.bind(this)
    );
    statisticsBtnHTML.addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.STATISTICS);
      this.singletonMediator.notify(AppEvents.switchDisableNextRoundBtn, "");
    });
  }
  createWordLines() {
    this.shuffledWords.forEach((_, index2) => {
      const wordsLine = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles$5.line]
      });
      wordsLine.style.pointerEvents = EVENT_ACCESSIBILITY.none;
      wordsLine.style.top = `${index2}0%`;
      this.wordLinesHTML.push(wordsLine);
      wordsLine.addEventListener(EVENT_NAMES.dragOver, (event) => {
        event.preventDefault();
      });
      wordsLine.addEventListener(EVENT_NAMES.dragDrop, (event) => {
        this.setDragDrop(event, wordsLine);
      });
    });
    this.view.getGameBoardHTML().append(...this.wordLinesHTML);
    return this.wordLinesHTML;
  }
  setDragDrop(event, element) {
    if (this.dragWrapper === element) {
      return;
    }
    if (event.dataTransfer) {
      element.classList.remove(styles$5.line_hovered);
      const draggedElementId = event.dataTransfer.getData("id");
      const index2 = this.puzzles[this.currentRound].findIndex(
        (puz) => puz.getHTML().id === draggedElementId
      );
      if (index2 !== -1) {
        const puzzle2 = this.puzzles[this.currentRound][index2];
        this.puzzles[this.currentRound].splice(index2, 1);
        if (puzzle2.getHTML().parentNode !== element) {
          puzzle2.clickPuzzleHandler();
          element.append(puzzle2.getHTML());
          this.puzzles[this.currentRound].push(puzzle2);
        }
      }
    }
  }
  createPuzzleElements() {
    this.shuffledWords.forEach((wordsLine, lineIndex) => {
      const lineArr = [];
      wordsLine.forEach((_, wordIndex) => {
        const puzzle2 = new PuzzleComponent(
          this.words[lineIndex][wordIndex],
          this,
          this.view
        );
        puzzle2.getHTML().setAttribute("line", `${lineIndex}`);
        puzzle2.getHTML().setAttribute("word", `${wordIndex}`);
        lineArr.push(puzzle2);
      });
      this.puzzles.push(lineArr);
    });
    return this.puzzles;
  }
  fillSourcedBlock() {
    const sourcedBlockHTML = this.view.getSourceBlockHTML();
    const shuffledPuzzles = shuffleArr(this.puzzles[this.currentRound]);
    shuffledPuzzles.forEach((puzzle2) => {
      if (puzzle2 instanceof PuzzleComponent) {
        const puzzleHTML = puzzle2.getHTML();
        sourcedBlockHTML.append(puzzleHTML);
      }
    });
    shuffledPuzzles.forEach((puzzle2) => {
      if (puzzle2 instanceof PuzzleComponent) {
        const currentPuzzle = puzzle2.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          this.storage.get(STORE_KEYS.BACKGROUND_HINT) === true
        );
      }
    });
    const gridTemplateColumns = `repeat(${this.puzzles[this.currentRound].length}, auto)`;
    sourcedBlockHTML.style.gridTemplateColumns = gridTemplateColumns;
    this.wordLinesHTML[this.currentRound].style.gridTemplateColumns = gridTemplateColumns;
  }
  setDragStartForPuzzle(currentPuzzle, event, puzzleWord) {
    const { target } = event;
    const currentLine = this.wordLinesHTML[this.currentRound];
    const sourceBlock = this.view.getSourceBlockHTML();
    if (currentPuzzle.parentElement === sourceBlock) {
      currentLine.classList.add(styles$5.line_hovered);
    } else {
      sourceBlock.classList.add(styles$5.line_hovered);
    }
    if (event.dataTransfer && target instanceof HTMLElement && target.id) {
      event.dataTransfer.setData("id", puzzleWord);
    }
    currentPuzzle.classList.add(styles$5.puzzle_placeholder);
  }
  setDragEndForPuzzle(currentPuzzle) {
    const currentLine = this.wordLinesHTML[this.currentRound];
    const sourceBlock = this.view.getSourceBlockHTML();
    if (currentPuzzle.parentElement === sourceBlock) {
      currentLine.classList.remove(styles$5.line_hovered);
    } else {
      sourceBlock.classList.remove(styles$5.line_hovered);
    }
    currentPuzzle.classList.remove(styles$5.puzzle_placeholder);
  }
  init() {
    this.singletonMediator.subscribe(
      AppEvents.switchTranslateVisible,
      this.switchVisibleTranslateSentence.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.switchListenVisible,
      this.switchVisibleTranslateListen.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.switchBackgroundHintVisible,
      this.switchVisibleBackgroundHint.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.newGame,
      this.setGameData.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.nextRound,
      this.startNextRound.bind(this)
    );
    this.setHandlersToButtons();
    this.setDragsForSourceBlock();
    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();
    const translateListenHTML = this.view.getTranslateListenBtn().getHTML();
    translateListenHTML.addEventListener(
      EVENT_NAMES.click,
      this.switchTranslateListen.bind(this)
    );
    this.audio.addEventListener(EVENT_NAMES.ended, () => {
      translateListenHTML.innerHTML = IMG_SRC$1.volumeOff;
      translateListenHTML.classList.remove(styles$5.translate_btn_active);
    });
  }
}
const page$1 = "_page_8wdyu_1";
const game_wrapper = "_game_wrapper_8wdyu_5";
const styles$4 = {
  page: page$1,
  game_wrapper
};
class MainPageView {
  constructor(id, parent, playground2, gameSettings) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "playgroundView");
    __publicField(this, "gameSettingsView");
    __publicField(this, "page");
    this.id = id;
    this.parent = parent;
    this.playgroundView = playground2;
    this.gameSettingsView = gameSettings;
    this.page = this.createHTML(this.id);
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$4.page],
      attributes: { id }
    });
    const wrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$4.game_wrapper]
    });
    this.page.append(wrapper);
    wrapper.append(
      this.playgroundView.getHTML(),
      this.gameSettingsView.getHTML()
    );
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}
const game_settings = "_game_settings_11pn6_1";
const translate_sentence_img = "_translate_sentence_img_11pn6_11";
const translate_listen_img = "_translate_listen_img_11pn6_12";
const game_settings_item = "_game_settings_item_11pn6_26";
const styles$3 = {
  game_settings,
  translate_sentence_img,
  translate_listen_img,
  game_settings_item
};
const translateOn = `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.34315 3.65686L1 7.00001L4.34315 10.3432C7.46734 13.4674 12.5327 13.4674 15.6569 10.3432L19 7.00001L15.6569 3.65687C12.5327 0.532674 7.46734 0.53267 4.34315 3.65686Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 7.00001C12 8.10458 11.1046 9.00001 10 9.00001C8.89543 9.00001 8 8.10458 8 7.00001C8 5.89544 8.89543 5.00001 10 5.00001C11.1046 5.00001 12 5.89544 12 7.00001Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const translateOff = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.58579 8.58579C8.94772 8.22386 9.44771 8 10 8C11.1046 8 12 8.89543 12 10C12 10.5523 11.7761 11.0523 11.4142 11.4142M8.58579 8.58579L11.4142 11.4142M8.58579 8.58579L5.61839 5.61839M11.4142 11.4142L14.3816 14.3816M19 19L14.3816 14.3816M14.3816 14.3816C14.8327 14.0858 15.2604 13.7396 15.6569 13.3431L19 10L15.6569 6.65685C12.9291 3.92913 8.72168 3.58297 5.61839 5.61839M5.61839 5.61839L1 1M3 8L1 10L4.34315 13.3431C6.1601 15.1601 8.63361 15.9204 11 15.6239" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const chooseGameImg = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 8C10.1046 8 11 8.89543 11 10C11 11.1046 10.1046 12 9 12C7.89543 12 7 11.1046 7 10C7 8.89543 7.89543 8 9 8Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.90136 4.7469C2.96492 4.20624 1.76749 4.52709 1.22684 5.46353L1.1851 5.53583C0.644237 6.47263 0.965207 7.67051 1.902 8.21137L2.1448 8.35155C2.71742 8.68215 3 9.3388 3 10C3 10.6612 2.71742 11.3179 2.1448 11.6485L1.902 11.7886C0.965208 12.3295 0.644237 13.5274 1.1851 14.4642L1.22684 14.5365C1.7675 15.4729 2.96492 15.7938 3.90136 15.2531L4.14546 15.1122C4.71803 14.7816 5.42331 14.863 5.9953 15.1946C6.56711 15.526 7 16.1005 7 16.7614V17.0427C7 18.1237 7.8763 19 8.95728 19H9.04273C10.1237 19 11 18.1237 11 17.0427V16.7614C11 16.1005 11.4329 15.5261 12.0047 15.1946C12.5767 14.863 13.282 14.7816 13.8545 15.1122L14.0986 15.2531C15.0351 15.7938 16.2325 15.4729 16.7732 14.5365L16.8149 14.4642C17.3558 13.5274 17.0348 12.3295 16.098 11.7886L15.8552 11.6485C15.2826 11.3179 15 10.6612 15 10C15 9.3388 15.2826 8.68215 15.8552 8.35155L16.098 8.21137C17.0348 7.6705 17.3558 6.47262 16.8149 5.53581L16.7732 5.46353C16.2325 4.52709 15.0351 4.20623 14.0986 4.74689L13.8545 4.88783C13.282 5.2184 12.5767 5.13699 12.0047 4.80541C11.4329 4.47395 11 3.89952 11 3.23859V2.95728C11 1.8763 10.1237 1 9.04273 1L8.95728 1C7.8763 1 7 1.8763 7 2.95727V3.23858C7 3.89952 6.56711 4.47395 5.9953 4.80542C5.42331 5.13699 4.71803 5.2184 4.14546 4.88783L3.90136 4.7469Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const logOutImg = `<svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 13H7C3.68629 13 1 15.6863 1 19M12 14L15 17M15 17L18 20M15 17L18 14M15 17L12 20M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const IMG_SRC = {
  translateOn,
  translateOff,
  chooseGameImg,
  logOutImg
};
class GameSettingsView {
  constructor() {
    __publicField(this, "gameSettings");
    __publicField(this, "translateSentenceWrapper");
    __publicField(this, "translateSentenceImg");
    __publicField(this, "translateListenWrapper");
    __publicField(this, "translateListenImg");
    __publicField(this, "choiceGameWrapper");
    __publicField(this, "choiceGameImg");
    __publicField(this, "backgroundHintImg");
    __publicField(this, "backgroundHintWrapper");
    __publicField(this, "logOutWrapper");
    __publicField(this, "logOutImg");
    this.translateSentenceImg = this.createTranslateSentenceImg();
    this.translateSentenceWrapper = this.createTranslateSentenceWrapper();
    this.translateListenImg = this.createTranslateListenImg();
    this.translateListenWrapper = this.createTranslateListenWrapper();
    this.choiceGameImg = this.createChoiceGameImg();
    this.choiceGameWrapper = this.createChoiceGameWrapper();
    this.backgroundHintImg = this.createBackgroundHintImg();
    this.backgroundHintWrapper = this.createBackgroundHintWrapper();
    this.logOutImg = this.createLogOutImg();
    this.logOutWrapper = this.createLogOutWrapper();
    this.gameSettings = this.createHTML();
  }
  getHTML() {
    return this.gameSettings;
  }
  getTranslateSentenceWrapper() {
    return this.translateSentenceWrapper;
  }
  getTranslateSentenceImg() {
    return this.translateSentenceImg;
  }
  getTranslateListenWrapper() {
    return this.translateListenWrapper;
  }
  getTranslateListenImg() {
    return this.translateListenImg;
  }
  getBackgroundHintWrapper() {
    return this.backgroundHintWrapper;
  }
  getBackgroundHintImg() {
    return this.backgroundHintImg;
  }
  getChoiceGameWrapper() {
    return this.choiceGameWrapper;
  }
  getChoiceGameImg() {
    return this.choiceGameImg;
  }
  getLogOutWrapper() {
    return this.logOutWrapper;
  }
  createTranslateSentenceImg() {
    this.translateSentenceImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.translate_sentence_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff
    });
    return this.translateSentenceImg;
  }
  createTranslateSentenceWrapper() {
    this.translateSentenceWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings_item]
    });
    const textContent = "Translate";
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.game_settings_item_text],
      innerContent: textContent
    });
    this.translateSentenceWrapper.append(this.translateSentenceImg, textElem);
    return this.translateSentenceWrapper;
  }
  createTranslateListenImg() {
    this.translateListenImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff
    });
    return this.translateListenImg;
  }
  createTranslateListenWrapper() {
    this.translateListenWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings_item]
    });
    const textContent = "Listen";
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.game_settings_item_text],
      innerContent: textContent
    });
    this.translateListenWrapper.append(this.translateListenImg, textElem);
    return this.translateListenWrapper;
  }
  createChoiceGameImg() {
    this.choiceGameImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.chooseGameImg
    });
    return this.choiceGameImg;
  }
  createChoiceGameWrapper() {
    this.choiceGameWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings_item]
    });
    const textContent = "Choice Game";
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.game_settings_item_text],
      innerContent: textContent
    });
    this.choiceGameWrapper.append(this.choiceGameImg, textElem);
    return this.choiceGameWrapper;
  }
  createLogOutImg() {
    this.logOutImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.logOutImg
    });
    return this.logOutImg;
  }
  createBackgroundHintWrapper() {
    this.backgroundHintWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings_item]
    });
    const textContent = "Background Hint";
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.game_settings_item_text],
      innerContent: textContent
    });
    this.backgroundHintWrapper.append(this.backgroundHintImg, textElem);
    return this.backgroundHintWrapper;
  }
  createBackgroundHintImg() {
    this.backgroundHintImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff
    });
    return this.backgroundHintImg;
  }
  createLogOutWrapper() {
    this.logOutWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings_item]
    });
    const textContent = "Log Out";
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$3.game_settings_item_text],
      innerContent: textContent
    });
    this.logOutWrapper.append(this.logOutImg, textElem);
    return this.logOutWrapper;
  }
  createHTML() {
    this.gameSettings = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_settings]
    });
    this.gameSettings.append(
      this.translateSentenceWrapper,
      this.translateListenWrapper,
      this.backgroundHintWrapper,
      this.choiceGameWrapper,
      this.logOutWrapper
    );
    return this.gameSettings;
  }
}
const IS_VISIBLE = {
  visible: true,
  hidden: false
};
class GameSettingsModel {
  constructor(storage) {
    __publicField(this, "storage");
    __publicField(this, "singletonMediator");
    __publicField(this, "gameSettingsView");
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.gameSettingsView = new GameSettingsView();
    this.init();
    this.checkSentence();
    this.checkListen();
    this.checkBackgroundHint();
    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.resetStates.bind(this)
    );
  }
  getHTML() {
    return this.gameSettingsView.getHTML();
  }
  getView() {
    return this.gameSettingsView;
  }
  checkSentence() {
    if (typeof this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE) === "undefined") {
      this.storage.add(STORE_KEYS.TRANSLATE_VISIBLE, `${IS_VISIBLE.visible}`);
    }
  }
  checkListen() {
    if (typeof this.storage.get(STORE_KEYS.LISTEN_VISIBLE) === "undefined") {
      this.storage.add(STORE_KEYS.LISTEN_VISIBLE, `${IS_VISIBLE.visible}`);
    }
  }
  checkBackgroundHint() {
    if (typeof this.storage.get(STORE_KEYS.BACKGROUND_HINT) === "undefined") {
      this.storage.add(STORE_KEYS.BACKGROUND_HINT, `${IS_VISIBLE.visible}`);
    }
  }
  resetStates() {
    this.storage.add(STORE_KEYS.TRANSLATE_VISIBLE, `${IS_VISIBLE.hidden}`);
    this.storage.add(STORE_KEYS.LISTEN_VISIBLE, `${IS_VISIBLE.hidden}`);
    this.storage.add(STORE_KEYS.BACKGROUND_HINT, `${IS_VISIBLE.hidden}`);
  }
  toggleVisibilityState(wrapper, img, event) {
    const currentImg = img;
    const isVisible = this.storage.get(event);
    if (isVisible) {
      currentImg.innerHTML = IMG_SRC.translateOff;
      this.storage.add(event, `${IS_VISIBLE.hidden}`);
    } else {
      currentImg.innerHTML = IMG_SRC.translateOn;
      this.storage.add(event, `${IS_VISIBLE.visible}`);
    }
    this.singletonMediator.notify(event, isVisible);
    wrapper.classList.toggle(styles$3.active);
  }
  translateSentenceHandler() {
    const translateSentenceWrapper = this.gameSettingsView.getTranslateSentenceWrapper();
    const translateSentenceImg = this.gameSettingsView.getTranslateSentenceImg();
    this.toggleVisibilityState(
      translateSentenceWrapper,
      translateSentenceImg,
      AppEvents.switchTranslateVisible
    );
  }
  translateListenHandler() {
    const translateListenWrapper = this.gameSettingsView.getTranslateListenWrapper();
    const translateListenImg = this.gameSettingsView.getTranslateListenImg();
    this.toggleVisibilityState(
      translateListenWrapper,
      translateListenImg,
      AppEvents.switchListenVisible
    );
  }
  translateBackgroundHintHandler() {
    const backgroundHintWrapper = this.gameSettingsView.getBackgroundHintWrapper();
    const backgroundHintImg = this.gameSettingsView.getBackgroundHintImg();
    this.toggleVisibilityState(
      backgroundHintWrapper,
      backgroundHintImg,
      AppEvents.switchBackgroundHintVisible
    );
  }
  switchInitTranslateSentence() {
    const translateSentenceImg = this.gameSettingsView.getTranslateSentenceImg();
    if (this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE) === IS_VISIBLE.visible) {
      translateSentenceImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateSentenceImg.innerHTML = IMG_SRC.translateOff;
    }
  }
  switchInitTranslateListen() {
    const translateListenImg = this.gameSettingsView.getTranslateListenImg();
    if (this.storage.get(STORE_KEYS.LISTEN_VISIBLE) === IS_VISIBLE.visible) {
      translateListenImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateListenImg.innerHTML = IMG_SRC.translateOff;
    }
  }
  switchInitBackgroundHintListen() {
    const backgroundHintImg = this.gameSettingsView.getBackgroundHintImg();
    if (this.storage.get(STORE_KEYS.BACKGROUND_HINT) === IS_VISIBLE.visible) {
      backgroundHintImg.innerHTML = IMG_SRC.translateOn;
    } else {
      backgroundHintImg.innerHTML = IMG_SRC.translateOff;
    }
  }
  init() {
    const translateSentenceWrapper = this.gameSettingsView.getTranslateSentenceWrapper();
    this.switchInitTranslateSentence();
    this.switchInitTranslateListen();
    this.switchInitBackgroundHintListen();
    const translateListenWrapper = this.gameSettingsView.getTranslateListenWrapper();
    translateSentenceWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateSentenceHandler.bind(this)
    );
    translateListenWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateListenHandler.bind(this)
    );
    const backgroundHintWrapper = this.gameSettingsView.getBackgroundHintWrapper();
    backgroundHintWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateBackgroundHintHandler.bind(this)
    );
    const choiceGameWrapper = this.gameSettingsView.getChoiceGameWrapper();
    choiceGameWrapper.addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(
        AppEvents.changeHash,
        PAGES_IDS.CHOICE_GAME
      );
    });
    const logOutWrapper = this.gameSettingsView.getLogOutWrapper();
    logOutWrapper.addEventListener(EVENT_NAMES.click, () => {
      this.storage.remove(STORE_KEYS.USER);
      this.storage.remove(STORE_KEYS.COMPLETED_ROUND);
      this.storage.remove(STORE_KEYS.LAST_ROUND);
      this.singletonMediator.notify(AppEvents.logOut, "");
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
    });
  }
}
class MainPageModel {
  constructor(id, parent, storage) {
    __publicField(this, "id");
    __publicField(this, "storage");
    __publicField(this, "pageView");
    __publicField(this, "page");
    __publicField(this, "playgroundModel");
    __publicField(this, "gameSettingsModel");
    this.id = id;
    this.storage = storage;
    this.playgroundModel = new PlaygroundModel(this.storage);
    this.gameSettingsModel = new GameSettingsModel(this.storage);
    this.pageView = new MainPageView(
      id,
      parent,
      this.playgroundModel.getView(),
      this.gameSettingsModel.getView()
    );
    this.page = this.pageView.getHTML();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
}
const app = "_app_7y78l_1";
const pagesContainer = "_pagesContainer_7y78l_5";
const styles$2 = {
  app,
  pagesContainer
};
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
      tag: TAG_NAMES.div,
      cssClasses: [styles$2.pagesContainer]
    });
    return this.pagesContainer;
  }
}
const page = "_page_ije10_1";
const choice_game_wrapper = "_choice_game_wrapper_ije10_8";
const page_aside = "_page_aside_ije10_31";
const aside__btn = "_aside__btn_ije10_39";
const page__lvl_wrapper = "_page__lvl_wrapper_ije10_56";
const page__lvl = "_page__lvl_ije10_56";
const beginner = "_beginner_ije10_64";
const page__lvl_description = "_page__lvl_description_ije10_64";
const novice = "_novice_ije10_67";
const intermediate = "_intermediate_ije10_71";
const advanced = "_advanced_ije10_75";
const master = "_master_ije10_79";
const expert = "_expert_ije10_82";
const page__btn = "_page__btn_ije10_86";
const styles$1 = {
  page,
  choice_game_wrapper,
  page_aside,
  aside__btn,
  page__lvl_wrapper,
  page__lvl,
  beginner,
  page__lvl_description,
  novice,
  intermediate,
  advanced,
  master,
  expert,
  page__btn
};
const BTN_OPTIONS = {
  offset: 15,
  direction: 1,
  displacement: 0,
  maxDisplacementElements: 5
};
const DESCRIPTIONS = [
  `Level 1: "Welcome to the world of 'Word Builder'! In this level you will have to make your first sentence from the words 'Hello', 'World', 'Funny', 'Adventure'. Let's see what you come up with!"`,
  `Level 2: "In this level you will collect sentences to help the hero overcome the 'Mountain of Vowels' and the 'Forest of Consonants'. Be careful, the 'Evil Punctuation Mark' may be waiting for you around every corner!"`,
  `Level 3: "Welcome to the 'English Circus'! Here you'll have to put together a sentence to make English words do incredible tricks. Are you ready for a circus show of language?"`,
  `Level 4: "In this level, you'll collect sentences to help characters from classic books say their famous phrases. Get ready to meet 'Shakespeare,' 'Dickens,' and 'Jane Austen'!"`,
  `Level 5: "Welcome to 'Flying Alphabet'! You will have to collect sentences to launch a rocket of words in English. Fly on the wings of words!"`,
  `Level 6: "In this level, you will collect sentences to unravel the secret code of the English language and open the door to a world of fluent English communication. Get ready for 'Solving Speech Puzzles'!"`
];
const COMPLEXITY_COLORS = [
  "beginner",
  "novice",
  "intermediate",
  "advanced",
  "master",
  "expert"
];
class ChoiceGamePageView {
  constructor(id, parent, gameData) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "gameData");
    __publicField(this, "pageWrapper", null);
    __publicField(this, "aside");
    __publicField(this, "roundBtns");
    __publicField(this, "descriptionsHTML", []);
    __publicField(this, "backToRoundBtn");
    __publicField(this, "logOutBtn");
    __publicField(this, "BTNS_OPTIONS");
    this.id = id;
    this.parent = parent;
    this.gameData = gameData;
    this.roundBtns = [];
    this.backToRoundBtn = this.createBackToRoundBtn();
    this.logOutBtn = this.createLogOutBtn();
    this.aside = this.createAside();
    this.pageWrapper = null;
    this.BTNS_OPTIONS = BTN_OPTIONS;
  }
  getRoundBtns() {
    return this.roundBtns;
  }
  getID() {
    return this.id;
  }
  getLogOutBtn() {
    return this.logOutBtn;
  }
  getBackToRoundBtn() {
    return this.backToRoundBtn;
  }
  updateDisplacement() {
    this.BTNS_OPTIONS.displacement += this.BTNS_OPTIONS.offset * this.BTNS_OPTIONS.direction;
  }
  addStylesForBtn(currentID, btn, LVLRoundsLength) {
    if (currentID !== LVLRoundsLength) {
      this.updateDisplacement();
    }
    if (currentID % this.BTNS_OPTIONS.maxDisplacementElements === 0) {
      this.BTNS_OPTIONS.direction *= -1;
    }
    const btnHTML = btn.getHTML();
    const transform = `translateX(${this.BTNS_OPTIONS.displacement}px)`;
    btnHTML.style.transform = transform;
  }
  createLVLsHTML() {
    const LVLsWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$1.page__lvl_wrapper]
    });
    this.gameData.forEach((LVL, index2) => {
      const currentLVL = (index2 + 1).toString();
      const currentLvlWrapper = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles$1.page__lvl],
        attributes: {
          id: `${index2}`
        }
      });
      const descriptionWrapper = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles$1.page__lvl_description]
      });
      this.descriptionsHTML.push(descriptionWrapper);
      currentLvlWrapper.append(descriptionWrapper);
      const LVLRounds = LVL.rounds;
      LVLRounds.forEach((_, id) => {
        const currentID = id + 1;
        const btnTextContent = `${id + 1}`;
        const btn = this.createRoundBtn(btnTextContent);
        btn.getHTML().setAttribute("currentLVL", currentLVL);
        btn.getHTML().setAttribute("currentRound", id.toString());
        this.addStylesForBtn(currentID, btn, LVLRounds.length);
        currentLvlWrapper.append(btn.getHTML());
      });
      LVLsWrapper.append(currentLvlWrapper);
    });
    return LVLsWrapper;
  }
  createRoundBtn(id) {
    const btn = new ButtonModel(id, [styles$1.page__btn, "btn-reset"]);
    this.roundBtns.push(btn);
    return btn;
  }
  fillDescriptions() {
    this.descriptionsHTML.forEach((description, index2) => {
      const currentDescr = description;
      currentDescr.innerHTML = DESCRIPTIONS[index2];
    });
  }
  createAside() {
    this.aside = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$1.page_aside]
    });
    return this.aside;
  }
  createBackToRoundBtn() {
    const textContent = "Back to round";
    this.backToRoundBtn = new ButtonModel(textContent, [
      styles$1.aside__btn,
      "btn-reset"
    ]);
    return this.backToRoundBtn;
  }
  createLogOutBtn() {
    const textContent = "Log Out";
    this.logOutBtn = new ButtonModel(textContent, [
      styles$1.aside__btn,
      "btn-reset"
    ]);
    return this.logOutBtn;
  }
  initHTML(gameData) {
    var _a;
    this.gameData = gameData;
    const LVLsWrapper = this.createLVLsHTML();
    this.fillDescriptions();
    (_a = this.pageWrapper) == null ? void 0 : _a.append(LVLsWrapper);
  }
  createHTML(id) {
    const page2 = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$1.page],
      attributes: { id }
    });
    this.pageWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$1.choice_game_wrapper]
    });
    this.aside.append(this.backToRoundBtn.getHTML(), this.logOutBtn.getHTML());
    page2.style.display = PAGES_STATE.HIDDEN;
    page2.append(this.pageWrapper, this.aside);
    this.parent.append(page2);
    return page2;
  }
}
const getData = async (url) => {
  const data = await fetch(url).then((response) => response.json()).then((json) => json).catch(() => null);
  return data;
};
const MAX_LEVEL = 6;
class ChoiceGameApi {
  constructor() {
    __publicField(this, "levelInfo");
    __publicField(this, "levelInfoReceived");
    this.levelInfo = null;
    this.levelInfoReceived = false;
  }
  isLevelInfoReceived() {
    return this.levelInfoReceived;
  }
  async getGameData() {
    const promises = [];
    for (let index2 = 1; index2 <= MAX_LEVEL; index2 += 1) {
      promises.push(this.receiveLevelInfo(index2));
    }
    const results = await Promise.all(promises);
    return results;
  }
  async receiveLevelInfo(currentLvl) {
    const url = `${API_URLS.levelData}${currentLvl}.json`;
    await getData(url).then((data) => {
      this.levelInfo = data;
      this.levelInfoReceived = true;
    }).catch(() => {
      this.levelInfoReceived = false;
    });
    if (!this.levelInfo) {
      throw new Error("No level info");
    }
    return this.levelInfo;
  }
}
const getComplexityColor = (lvl) => {
  const complexityColors = [
    "beginner",
    "novice",
    "intermediate",
    "advanced",
    "master",
    "expert"
  ];
  return complexityColors[lvl - 1];
};
class ChoiceGamePageModel {
  constructor(id, parent, storage) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "api");
    __publicField(this, "storage");
    __publicField(this, "singletonMediator");
    __publicField(this, "pageView");
    __publicField(this, "page");
    __publicField(this, "gameData", []);
    this.id = id;
    this.parent = parent;
    this.api = new ChoiceGameApi();
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.newCompletedRound,
      this.switchCompletedRound.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.setGameData.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.switchCompletedRound.bind(this)
    );
    this.pageView = new ChoiceGamePageView(this.id, this.parent, this.gameData);
    this.page = this.init();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  async getGameData() {
    this.gameData = [];
    const gameData = await this.api.getGameData();
    return gameData;
  }
  switchParentClassByButtonClass() {
    const btns = this.pageView.getRoundBtns();
    const btnsHTML = [];
    btns.forEach((item) => {
      btnsHTML.push(item.getHTML());
    });
    const groupedByParent = /* @__PURE__ */ new Map();
    btnsHTML.forEach((btn) => {
      var _a;
      const parent = btn.parentElement;
      if (parent) {
        if (groupedByParent.has(parent)) {
          (_a = groupedByParent.get(parent)) == null ? void 0 : _a.push(btn);
        } else {
          groupedByParent.set(parent, [btn]);
        }
      }
    });
    groupedByParent.forEach((buttons, parent) => {
      const lvl = Number(parent.getAttribute("id"));
      const hasAnyClass = (classes) => buttons.every(
        (btn) => btn.classList.contains(styles$1[classes[Number(lvl)]])
      );
      const allButtonsHaveClass = hasAnyClass(COMPLEXITY_COLORS);
      if (allButtonsHaveClass) {
        parent.classList.add(styles$1[COMPLEXITY_COLORS[Number(lvl)]]);
      } else {
        parent.classList.remove(styles$1[COMPLEXITY_COLORS[Number(lvl)]]);
      }
    });
  }
  switchCompletedRound() {
    const completedRounds = this.storage.get(
      STORE_KEYS.COMPLETED_ROUND
    );
    const btns = this.pageView.getRoundBtns();
    btns.forEach((btn) => {
      const lvl = btn.getHTML().getAttribute("currentLVL");
      const round = btn.getHTML().getAttribute("currentRound");
      const complexity = getComplexityColor(Number(lvl));
      if (completedRounds == null ? void 0 : completedRounds.some(
        (obj) => obj.lvl.toString() === lvl && obj.round.toString() === round
      )) {
        btn.getHTML().classList.add(styles$1[complexity]);
      } else {
        btn.getHTML().classList.remove(styles$1[complexity]);
      }
    });
    this.switchParentClassByButtonClass();
  }
  setHandlersForBtns() {
    const btns = this.pageView.getRoundBtns();
    btns.forEach((btn) => {
      btn.getHTML().addEventListener(EVENT_NAMES.click, () => {
        const currentLVL = Number(btn.getHTML().getAttribute("currentLVL"));
        const currentRound = Number(btn.getHTML().getAttribute("currentRound"));
        const currentDataLVL = {
          gameData: this.gameData,
          currentRound,
          currentLVL
        };
        this.singletonMediator.notify(AppEvents.newGame, currentDataLVL);
        this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
      });
    });
    const backToRoundBtn = this.pageView.getBackToRoundBtn();
    backToRoundBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
    });
    const logOutBtn = this.pageView.getLogOutBtn();
    logOutBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.storage.remove(STORE_KEYS.USER);
      this.storage.remove(STORE_KEYS.COMPLETED_ROUND);
      this.storage.remove(STORE_KEYS.LAST_ROUND);
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
      this.singletonMediator.notify(AppEvents.logOut, "");
    });
  }
  setGameData() {
    const lastRoundData = this.storage.get(
      STORE_KEYS.LAST_ROUND
    );
    if (lastRoundData) {
      const currentDataLVL = {
        gameData: this.gameData,
        currentRound: lastRoundData.currentRound,
        currentLVL: lastRoundData.currentLVL
      };
      this.singletonMediator.notify(AppEvents.newGame, currentDataLVL);
    } else {
      const data = {
        gameData: this.gameData,
        currentRound: 0,
        currentLVL: 1
      };
      this.singletonMediator.notify(AppEvents.newGame, data);
    }
  }
  init() {
    this.getGameData().then((data) => {
      this.gameData = data;
    }).then(() => {
      this.pageView.initHTML(this.gameData);
      this.setHandlersForBtns();
      this.switchCompletedRound();
      this.switchParentClassByButtonClass();
      this.setGameData();
    }).catch(() => {
    });
    this.page = this.pageView.createHTML(this.id);
    return this.page;
  }
}
const styles = {};
const setListenersLineBtn = (btn, audio) => {
  const currentBtn = btn;
  let btnSvg = currentBtn.firstChild;
  if (btnSvg && !(btnSvg instanceof SVGElement)) {
    btnSvg = btnSvg.nextSibling;
  }
  currentBtn.addEventListener(EVENT_NAMES.click, () => {
    if (btnSvg && btnSvg instanceof SVGElement) {
      btnSvg.innerHTML = IMG_SRC$1.volumeOn;
    }
    audio.play().catch(() => {
    });
  });
  audio.addEventListener(EVENT_NAMES.ended, () => {
    if (btnSvg && btnSvg instanceof SVGElement) {
      btnSvg.innerHTML = IMG_SRC$1.volumeOff;
    }
  });
};
class StatisticsPageView {
  constructor(id, parent) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "nextRoundBtn");
    __publicField(this, "roundInfoWrapper");
    __publicField(this, "knowList");
    __publicField(this, "dontKnowList");
    __publicField(this, "liArr", []);
    __publicField(this, "roundPictureImg");
    __publicField(this, "roundPictureAuthor");
    __publicField(this, "roundPictureInfo");
    __publicField(this, "roundPictureWrapper");
    this.id = id;
    this.parent = parent;
    this.nextRoundBtn = this.createNextRoundBtn();
    this.knowList = this.createKnowList();
    this.dontKnowList = this.createDontKnowList();
    this.roundPictureInfo = this.createRoundPictureInfo();
    this.roundPictureAuthor = this.createRoundPictureAuthor();
    this.roundPictureImg = this.createRoundPictureElement();
    this.roundPictureWrapper = this.createRoundPictureWrapper();
    this.roundInfoWrapper = this.createRoundInfoWrapper();
    this.page = this.createHTML(this.id);
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  getNextRoundBtn() {
    return this.nextRoundBtn;
  }
  getKnowList() {
    return this.knowList;
  }
  clearKnowList() {
    this.knowList.innerHTML = "";
  }
  getRoundPictureImg() {
    return this.roundPictureImg;
  }
  getRoundPictureAuthor() {
    return this.roundPictureAuthor;
  }
  getRoundPictureInfo() {
    return this.roundPictureInfo;
  }
  getDontKnowList() {
    return this.dontKnowList;
  }
  clearDontKnowList() {
    this.dontKnowList.innerHTML = "";
  }
  createListItem(value, listItemStyle, textItemStyle) {
    const li = createBaseElement({
      tag: TAG_NAMES.li,
      cssClasses: [listItemStyle]
    });
    const btn = new ButtonModel("", [`${listItemStyle}_btn`]);
    const audio = new Audio(value.audioCurrentLineSrc);
    const text = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [textItemStyle],
      innerContent: `${value.sentenceCurrentLine}`
    });
    const btnHTML = btn.getHTML();
    btnHTML.innerHTML = IMG_SRC$1.volumeOff;
    setListenersLineBtn(btnHTML, audio);
    btnHTML.append(audio);
    li.append(btnHTML, text);
    this.liArr.push(li);
    return li;
  }
  createRoundPictureWrapper() {
    this.roundPictureWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.round_picture_wrapper]
    });
    const imgWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.round_picture_wrapper]
    });
    imgWrapper.append(this.roundPictureImg);
    this.roundPictureWrapper.append(
      imgWrapper,
      this.roundPictureAuthor,
      this.roundPictureInfo
    );
    return this.roundPictureWrapper;
  }
  createRoundPictureElement() {
    this.roundPictureImg = createBaseElement({
      tag: TAG_NAMES.img,
      cssClasses: [styles.round_picture]
    });
    return this.roundPictureImg;
  }
  createRoundPictureAuthor() {
    this.roundPictureAuthor = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.round_picture_author]
    });
    return this.roundPictureAuthor;
  }
  createRoundPictureInfo() {
    this.roundPictureInfo = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.round_picture_info]
    });
    return this.roundPictureInfo;
  }
  createRoundInfoWrapper() {
    this.roundInfoWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.round_info_wrapper]
    });
    return this.roundInfoWrapper;
  }
  createNextRoundBtn() {
    this.nextRoundBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.continueBtn,
      [styles.nextRound_btn],
      { disabled: `${BUTTON_STATE.DISABLED}` }
    );
    return this.nextRoundBtn;
  }
  createKnowList() {
    this.knowList = createBaseElement({
      tag: TAG_NAMES.ul,
      cssClasses: [styles.know_list]
    });
    return this.knowList;
  }
  createDontKnowList() {
    this.dontKnowList = createBaseElement({
      tag: TAG_NAMES.ul,
      cssClasses: [styles.dont_know_list]
    });
    return this.dontKnowList;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.page],
      attributes: { id }
    });
    const wrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.statistics_wrapper]
    });
    this.roundInfoWrapper.append(
      this.roundPictureWrapper,
      this.knowList,
      this.dontKnowList,
      this.nextRoundBtn.getHTML()
    );
    wrapper.append(this.roundInfoWrapper);
    this.page.append(wrapper);
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}
const isPictureInfo = (obj) => typeof obj === "object" && obj !== null && "src" in obj && "title" in obj && "info" in obj;
const isMapOfLineInfoArr = (arr) => Array.isArray(arr) && arr.length === 3 && arr[0] instanceof Map && arr[1] instanceof Map && isPictureInfo(arr[2]);
const isMapOfLineInfo = (obj) => obj instanceof Map;
const createListTitle = (title) => {
  const span = createBaseElement({
    tag: TAG_NAMES.span,
    innerContent: title
  });
  return span;
};
const LIST_TITLES = {
  KNOW_LIST: "I know",
  DONT_KNOW_LIST: "I don't know"
};
class StatisticsPageModel {
  constructor(id, parent) {
    __publicField(this, "id");
    __publicField(this, "page");
    __publicField(this, "pageView");
    __publicField(this, "singletonMediator");
    __publicField(this, "KNOW_LIST_INDEX", 0);
    __publicField(this, "DONT_KNOW_LIST_INDEX", 1);
    __publicField(this, "ROUND_INFO_INDEX", 2);
    this.id = id;
    this.pageView = new StatisticsPageView(id, parent);
    this.singletonMediator = MediatorModel.getInstance();
    this.page = this.pageView.getHTML();
    this.init();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
  switchDisableNextRoundBtn() {
    const nextRoundBtn = this.pageView.getNextRoundBtn();
    nextRoundBtn.switchDisabled();
  }
  fillKnowList(params) {
    const knowList = this.pageView.getKnowList();
    const title = createListTitle(LIST_TITLES.KNOW_LIST);
    knowList.append(title);
    params.forEach((value) => {
      const li = this.pageView.createListItem(
        value,
        styles.know_list_item,
        styles.know_list_item__text
      );
      knowList.append(li);
    });
  }
  fillDontKnowList(params) {
    const dontKnow = this.pageView.getDontKnowList();
    const title = createListTitle(LIST_TITLES.DONT_KNOW_LIST);
    dontKnow.append(title);
    params.forEach((value) => {
      const li = this.pageView.createListItem(
        value,
        styles.dont_know_list_item,
        styles.dont_know_list_item__text
      );
      dontKnow.append(li);
    });
  }
  fillPictureInfo(params) {
    const pictureImg = this.pageView.getRoundPictureImg();
    const pictureAuthor = this.pageView.getRoundPictureAuthor();
    const pictureInfo = this.pageView.getRoundPictureInfo();
    pictureAuthor.textContent = params.title;
    pictureInfo.textContent = params.info;
    pictureImg.src = params.src;
    pictureImg.alt = params.info;
  }
  drawRoundInfo(params) {
    if (isMapOfLineInfoArr(params)) {
      this.pageView.clearKnowList();
      this.pageView.clearDontKnowList();
      const knowListData = params[this.KNOW_LIST_INDEX];
      const dontKnowListData = params[this.DONT_KNOW_LIST_INDEX];
      const pictureInfo = params[this.ROUND_INFO_INDEX];
      if (isPictureInfo(pictureInfo)) {
        this.fillPictureInfo(pictureInfo);
      }
      if (isMapOfLineInfo(knowListData) && isMapOfLineInfo(dontKnowListData)) {
        this.fillKnowList(knowListData);
        this.fillDontKnowList(dontKnowListData);
      }
    }
  }
  init() {
    const nextRoundBtn = this.pageView.getNextRoundBtn();
    nextRoundBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.nextRound, "");
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
      nextRoundBtn.setDisabled();
    });
    this.singletonMediator.subscribe(
      AppEvents.switchDisableNextRoundBtn,
      this.switchDisableNextRoundBtn.bind(this)
    );
    this.singletonMediator.subscribe(
      AppEvents.endRound,
      this.drawRoundInfo.bind(this)
    );
  }
}
class AppModel {
  constructor() {
    __publicField(this, "appView");
    __publicField(this, "app");
    __publicField(this, "storage");
    __publicField(this, "pages");
    __publicField(this, "router");
    this.appView = new AppView();
    this.app = this.appView.getHTML();
    this.storage = new StorageModel();
    this.pages = {
      logIn: new LogInPageModel(
        PAGES_IDS.LOG_IN,
        this.appView.getHTML(),
        this.storage
      ),
      start: new StartPageModel(
        PAGES_IDS.START,
        this.appView.getHTML(),
        this.storage
      ),
      choiceGame: new ChoiceGamePageModel(
        PAGES_IDS.CHOICE_GAME,
        this.appView.getHTML(),
        this.storage
      ),
      main: new MainPageModel(
        PAGES_IDS.MAIN,
        this.appView.getHTML(),
        this.storage
      ),
      statistics: new StatisticsPageModel(
        PAGES_IDS.STATISTICS,
        this.appView.getHTML()
      )
    };
    this.router = new RouterModel(this.pages);
    this.router.init();
  }
  getHTML() {
    return this.app;
  }
}
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-50aee821.js.map
