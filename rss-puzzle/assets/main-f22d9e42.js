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
const form = "_form_1xx9g_1";
const form__label = "_form__label_1xx9g_15";
const form__input = "_form__input_1xx9g_23";
const form__input__error = "_form__input__error_1xx9g_32";
const form__input__success = "_form__input__success_1xx9g_35";
const form__span = "_form__span_1xx9g_42";
const form__span__visually = "_form__span__visually_1xx9g_48";
const form__span__hidden = "_form__span__hidden_1xx9g_51";
const form__btn = "_form__btn_1xx9g_54";
const styles$6 = {
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
    fieldHTML.classList.remove(styles$6.form__input__success);
    fieldHTML.classList.add(styles$6.form__input__error);
    const currentSpan = span;
    currentSpan.classList.remove(styles$6.form__span__hidden);
    currentSpan.classList.add(styles$6.form__span__visually);
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
      fieldHTML.classList.add(styles$6.form__input__success);
      fieldHTML.classList.remove(styles$6.form__input__error);
      currentSpan.textContent = "";
      currentSpan.classList.add(styles$6.form__span__hidden);
      currentSpan.classList.remove(styles$6.form__span__visually);
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
  img: "img"
};
const EVENT_NAMES = {
  hashchange: "hashchange",
  click: "click",
  submit: "submit"
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
    const labelText = `Enter ${input.name}`;
    const fieldLabel = createBaseElement({
      tag: TAG_NAMES.label,
      cssClasses: [styles$6.form__label],
      attributes: {
        for: input.id
      },
      innerContent: labelText
    });
    const fieldErrorSpan = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles$6.form__span],
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
        class: styles$6.form__input,
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
        class: styles$6.form__input,
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
      [styles$6.form__btn, "btn-reset"],
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
      cssClasses: [styles$6.form],
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
  MAIN: "main"
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
  return STORE_KEYS2;
})(STORE_KEYS || {});
const AppEvents = {
  newUser: "newUser",
  changeHash: "changeHash"
};
const page$2 = "_page_1gm9x_1";
const styles$5 = {
  page: page$2
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
      cssClasses: [styles$5.page],
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
const page$1 = "_page_4l1ls_1";
const page__title = "_page__title_4l1ls_9";
const page__descr = "_page__descr_4l1ls_14";
const page__btn = "_page__btn_4l1ls_19";
const styles$4 = {
  page: page$1,
  page__title,
  page__descr,
  page__btn
};
const BUTTONS_TEXT_CONTENT$1 = {
  loginBtn: "Log in",
  startBtn: "Start"
};
class StartPageView {
  constructor(id, parent) {
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "title");
    __publicField(this, "subtitle");
    __publicField(this, "descr");
    __publicField(this, "startBtn");
    __publicField(this, "logOutBtn");
    this.title = this.createTitle();
    this.subtitle = this.createSubtitle();
    this.descr = this.createDescr();
    this.startBtn = this.createStartBtn();
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
  createTitle() {
    this.title = createBaseElement({
      tag: TAG_NAMES.h1,
      cssClasses: [styles$4.page__title],
      innerContent: "RSS Puzzle"
    });
    return this.title;
  }
  createSubtitle() {
    this.subtitle = createBaseElement({
      tag: TAG_NAMES.h2,
      cssClasses: [styles$4.page__subtitle]
    });
    return this.subtitle;
  }
  createDescr() {
    this.descr = createBaseElement({
      tag: TAG_NAMES.p,
      cssClasses: [styles$4.page__descr],
      innerContent: "Your RSS reader"
    });
    return this.descr;
  }
  createStartBtn() {
    this.startBtn = new ButtonModel(BUTTONS_TEXT_CONTENT$1.startBtn, [
      styles$4.page__btn,
      "btn-reset"
    ]);
    return this.startBtn;
  }
  createLogOutBtn() {
    this.logOutBtn = new ButtonModel(BUTTONS_TEXT_CONTENT$1.loginBtn, [
      styles$4.page__btn,
      "btn-reset"
    ]);
    return this.logOutBtn;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$4.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.page.append(
      this.title,
      this.subtitle,
      this.descr,
      this.startBtn.getHTML(),
      this.logOutBtn.getHTML()
    );
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
    __publicField(this, "logOutBtn");
    __publicField(this, "singletonMediator");
    this.id = id;
    this.pageView = new StartPageView(id, parent);
    this.page = this.pageView.getHTML();
    this.subtitle = this.pageView.getSubTitle();
    this.startBtn = this.pageView.getStartBtn();
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
    this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
  }
  setHandlers() {
    this.logOutBtn.getHTML().addEventListener(EVENT_NAMES.click, this.logOut.bind(this));
    this.startBtn.getHTML().addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.MAIN);
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
  fadeOutAndIn(currentPage, nextPage, duration = this.duration) {
    let start = performance.now();
    const fadeIn = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, MAX_OPACITY);
      const page2 = nextPage.getHTML();
      page2.style.opacity = `${progress}`;
      page2.style.display = PAGES_STATE.VISIBLE;
      if (elapsed < duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };
    const fadeOut = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, MAX_OPACITY);
      const opacity = MAX_OPACITY - progress;
      const page2 = currentPage.getHTML();
      page2.style.opacity = `${opacity}`;
      if (elapsed < duration) {
        window.requestAnimationFrame(fadeOut);
      } else {
        Object.entries(this.pages).filter(([key]) => key !== this.currentPage.getHTML().id).forEach(([key]) => {
          this.pages[key].getHTML().style.display = PAGES_STATE.HIDDEN;
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
    if (hash !== this.pages[hash].getID()) {
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
const API_URLS = {
  levelData: "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel"
};
class ApiModel {
  constructor() {
    __publicField(this, "response");
    this.response = null;
  }
  async getData(url) {
    const data = await this.fetchResponse(url);
    return data;
  }
  fetchResponse(url) {
    this.response = fetch(url).then((response) => response.json()).then((json) => json);
    return this.response;
  }
}
class PlaygroundApi {
  constructor() {
    __publicField(this, "api");
    __publicField(this, "levelInfo");
    __publicField(this, "levelInfoReceived");
    this.api = new ApiModel();
    this.levelInfo = null;
    this.levelInfoReceived = false;
    this.receiveLevelInfo(1).catch(() => {
    });
  }
  async getLevelData() {
    if (!this.levelInfoReceived) {
      await this.receiveLevelInfo(1);
    }
    if (!this.levelInfo) {
      throw new Error("No level info");
    }
    return this.levelInfo;
  }
  async receiveLevelInfo(currentLvl) {
    const url = `${API_URLS.levelData}${currentLvl}.json`;
    await this.api.getData(url).then((data) => {
      this.levelInfo = data;
      this.levelInfoReceived = true;
    }).catch(() => {
      this.levelInfoReceived = false;
    });
  }
}
const randomIndex = 0.5;
const BUTTONS_TEXT_CONTENT = {
  continueBtn: "Continue",
  checkBtn: "Check",
  autocompleteBtn: "Autocomplete"
};
const playground = "_playground_sw2dr_1";
const source_data = "_source_data_sw2dr_7";
const game_board = "_game_board_sw2dr_8";
const line = "_line_sw2dr_30";
const copy_puzzle__error = "_copy_puzzle__error_sw2dr_37";
const copy_puzzle__success = "_copy_puzzle__success_sw2dr_40";
const continue_btn = "_continue_btn_sw2dr_44";
const check_btn = "_check_btn_sw2dr_45";
const autocomplete_btn = "_autocomplete_btn_sw2dr_46";
const btn__hidden = "_btn__hidden_sw2dr_79";
const styles$3 = {
  playground,
  source_data,
  game_board,
  line,
  copy_puzzle__error,
  copy_puzzle__success,
  continue_btn,
  check_btn,
  autocomplete_btn,
  btn__hidden
};
class PlaygroundView {
  constructor() {
    __publicField(this, "playground");
    __publicField(this, "gameBoard");
    __publicField(this, "sourceBlock");
    __publicField(this, "continueBtn");
    __publicField(this, "checkBtn");
    __publicField(this, "autocompleteBtn");
    this.gameBoard = this.createGameBoard();
    this.sourceBlock = this.createSourceBlock();
    this.continueBtn = this.createContinueBtn();
    this.checkBtn = this.createCheckBtn();
    this.autocompleteBtn = this.createAutocompleteBtn();
    this.playground = this.createHTML();
  }
  getHTML() {
    return this.playground;
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
  createGameBoard() {
    this.gameBoard = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.game_board]
    });
    return this.gameBoard;
  }
  createSourceBlock() {
    this.sourceBlock = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.source_data]
    });
    return this.sourceBlock;
  }
  createContinueBtn() {
    this.continueBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.continueBtn, [
      styles$3.continue_btn,
      styles$3.btn__hidden
    ]);
    return this.continueBtn;
  }
  createCheckBtn() {
    this.checkBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.checkBtn, [
      styles$3.check_btn
    ]);
    this.checkBtn.setDisabled();
    return this.checkBtn;
  }
  createAutocompleteBtn() {
    this.autocompleteBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.autocompleteBtn,
      [styles$3.autocomplete_btn]
    );
    return this.autocompleteBtn;
  }
  createHTML() {
    this.playground = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$3.playground]
    });
    this.playground.append(
      this.gameBoard,
      this.sourceBlock,
      this.continueBtn.getHTML(),
      this.checkBtn.getHTML(),
      this.autocompleteBtn.getHTML()
    );
    return this.playground;
  }
}
const puzzle = "_puzzle_nriic_1";
const puzzle_placeholder = "_puzzle_placeholder_nriic_12";
const styles$2 = {
  puzzle,
  puzzle_placeholder
};
const PUZZLE_STYLE = {
  none: "none",
  auto: "auto",
  opacity_on: "1",
  opacity_off: "0",
  fill: "forwards"
};
const COPY_PUZZLE_ANIMATION_OPTIONS = {
  duration: 1e3,
  iterations: 1,
  fill: PUZZLE_STYLE.fill
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
  calculateSizePuzzle(elem) {
    const currentElem = elem;
    const wordLength = this.word.length;
    const paddingX = 1;
    const paddingY = 0.5;
    const pivotFont = 5;
    const minFontSize = 1;
    const maxFontSize = 1.2;
    const fontSize = wordLength > pivotFont ? minFontSize : maxFontSize;
    currentElem.style.padding = `${paddingY}dvw ${paddingX}dvw`;
    currentElem.style.fontSize = `${fontSize}dvw`;
  }
  createDuplicateWordElement() {
    const copyWord = createBaseElement({
      tag: "div",
      cssClasses: [styles$2.puzzle],
      attributes: {},
      innerContent: this.word
    });
    this.calculateSizePuzzle(copyWord);
    return copyWord;
  }
  clickPuzzleCopyHandler(copyWord) {
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.auto;
    this.puzzle.classList.remove(styles$2.puzzle_placeholder);
    const newWordsInCurrentLine = this.playground.getWordsInCurrentLine().filter((word) => word !== this.word);
    this.playground.setWordsInCurrentLine(newWordsInCurrentLine);
    const newCopyPuzzles = this.playground.getCopyPuzzles().filter((copy) => copy !== copyWord);
    this.playground.setCopyPuzzles(newCopyPuzzles);
    const continueBtn = this.playgroundView.getContinueBtn();
    continueBtn.setDisabled();
    const checkBtn = this.playgroundView.getCheckBtn();
    checkBtn.setDisabled();
    this.playground.checkLine();
    copyWord.remove();
  }
  setPuzzleAnimation(copyWord) {
    const linesArr = this.playground.getWordLinesHTML();
    const currentRound = this.playground.getCurrentRound();
    const lineRect = linesArr[currentRound].getBoundingClientRect();
    const gameBoard = this.playgroundView.getGameBoardHTML();
    const gameBoardRect = gameBoard.getBoundingClientRect();
    const sourceBlock = this.playgroundView.getSourceBlockHTML();
    const horizontallyTransform = 0;
    const verticallyTransform = gameBoardRect.height - lineRect.height + sourceBlock.clientHeight;
    const startTransformTranslate = `translate(${horizontallyTransform}px, ${verticallyTransform}px)`;
    const endTransformTranslate = `translate(${0}, ${0})`;
    const COPY_PUZZLE_ANIMATION_PROPERTY = [
      { transform: startTransformTranslate },
      { transform: endTransformTranslate }
    ];
    copyWord.animate(
      COPY_PUZZLE_ANIMATION_PROPERTY,
      COPY_PUZZLE_ANIMATION_OPTIONS
    );
  }
  clickPuzzleHandler() {
    const wordsInCurrentLine = this.playground.getWordsInCurrentLine();
    wordsInCurrentLine.push(this.word);
    this.playground.checkLine();
    const words = this.playground.getWords();
    const currentRound = this.playground.getCurrentRound();
    const checkBtn = this.playgroundView.getCheckBtn();
    const copyPuzzles = this.playground.getCopyPuzzles();
    if (wordsInCurrentLine.length === words[currentRound].length) {
      checkBtn.switchDisabled();
    }
    const copyWord = this.createDuplicateWordElement();
    copyPuzzles.push(copyWord);
    copyWord.addEventListener(EVENT_NAMES.click, () => {
      this.clickPuzzleCopyHandler.bind(this, copyWord)();
    });
    this.setPuzzleAnimation(copyWord);
    copyWord.replaceWith(this.puzzle);
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.none;
    this.puzzle.classList.add(styles$2.puzzle_placeholder);
    const wordLines = this.playground.getWordLinesHTML();
    wordLines[currentRound].append(copyWord);
  }
  createHTML(word) {
    this.puzzle = createBaseElement({
      tag: "div",
      cssClasses: [styles$2.puzzle],
      attributes: {},
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
class PlaygroundModel {
  constructor() {
    __publicField(this, "view");
    __publicField(this, "api");
    __publicField(this, "words", []);
    __publicField(this, "shuffledWords");
    __publicField(this, "currentRoundLvl", 0);
    __publicField(this, "currentRound", 0);
    __publicField(this, "wordsInCurrentLine", []);
    __publicField(this, "puzzles", []);
    __publicField(this, "copyPuzzles", []);
    __publicField(this, "wordLinesHTML", []);
    this.view = new PlaygroundView();
    this.api = new PlaygroundApi();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  getWordsInCurrentLine() {
    return this.wordsInCurrentLine;
  }
  setWordsInCurrentLine(words) {
    this.wordsInCurrentLine = words;
  }
  getCopyPuzzles() {
    return this.copyPuzzles;
  }
  setCopyPuzzles(copyPuzzles) {
    this.copyPuzzles = copyPuzzles;
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
  checkLine() {
    if (this.wordsInCurrentLine.length === this.words[this.currentRound].length && this.wordsInCurrentLine.every(
      (word, index2) => this.words[this.currentRound][index2] === word
    )) {
      const continueBtn = this.view.getContinueBtn();
      continueBtn.switchDisabled();
    }
  }
  async setWords() {
    const levelData = await this.api.getLevelData();
    const currentWords = levelData.rounds[this.currentRoundLvl].words;
    currentWords.forEach((word) => {
      this.words.push(word.textExample.split(" "));
    });
    return this.words;
  }
  shuffleWords() {
    this.shuffledWords = this.words.map(
      (wordArr) => [...wordArr].sort(() => Math.random() - randomIndex)
    );
    return this.shuffledWords;
  }
  startNextLvl() {
    this.currentRoundLvl += 1;
    this.currentRound = 0;
    this.wordsInCurrentLine = [];
    this.puzzles = [];
    this.wordLinesHTML = [];
    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.setWords().then(() => {
      this.shuffleWords();
      this.createWordLines();
      this.startNextRound();
    }).catch(() => {
    });
  }
  incrementCurrentRound() {
    this.currentRound += 1;
  }
  checkMatchingPuzzles() {
    this.wordsInCurrentLine.forEach((word, index2) => {
      const isMatching = word === this.words[this.currentRound][index2];
      const copyPuzzle = this.copyPuzzles[index2];
      copyPuzzle.classList.toggle(styles$3.copy_puzzle__error, !isMatching);
      copyPuzzle.classList.toggle(styles$3.copy_puzzle__success, isMatching);
      const continueBtnHTML = this.view.getContinueBtn().getHTML();
      const checkBtnHTML = this.view.getCheckBtn().getHTML();
      const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();
      continueBtnHTML.classList.toggle(styles$3.btn__hidden, !isMatching);
      checkBtnHTML.classList.toggle(styles$3.btn__hidden, isMatching);
      autoCompleteBtnHTML.disabled = isMatching;
    });
  }
  startNextRound() {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    this.incrementCurrentRound();
    continueBtn.getHTML().classList.add(styles$3.btn__hidden);
    checkBtn.getHTML().classList.remove(styles$3.btn__hidden);
    if (this.currentRound === this.words.length) {
      this.startNextLvl();
      return;
    }
    this.wordsInCurrentLine = [];
    continueBtn.switchDisabled();
    checkBtn.switchDisabled();
    autoCompleteBtn.setEnabled();
    this.copyPuzzles.forEach((copyWord) => {
      copyWord.classList.remove(
        styles$3.copy_puzzle__success,
        styles$3.copy_puzzle__error
      );
    });
    this.copyPuzzles = [];
    this.view.clearSourceBlockHTML();
    this.fillSourcedBlock();
  }
  autoCompleteLine() {
    this.wordLinesHTML[this.currentRound].innerHTML = "";
    this.words[this.currentRound].forEach((word) => {
      const puzzle2 = new PuzzleComponent(word, this, this.view);
      this.wordLinesHTML[this.currentRound].appendChild(puzzle2.getHTML());
    });
    const checkBtnHTML = this.view.getCheckBtn();
    const continueBtnHTML = this.view.getContinueBtn();
    checkBtnHTML.setEnabled();
    continueBtnHTML.setEnabled();
    this.startNextRound();
  }
  setHandlersToButtons() {
    const checkBtnHTML = this.view.getCheckBtn().getHTML();
    const continueBtnHTML = this.view.getContinueBtn().getHTML();
    const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();
    checkBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.checkMatchingPuzzles.bind(this)
    );
    continueBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextRound.bind(this)
    );
    autoCompleteBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.autoCompleteLine.bind(this)
    );
  }
  createWordLines() {
    this.words.forEach(() => {
      const wordsLine = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles$3.line]
      });
      this.wordLinesHTML.push(wordsLine);
    });
    this.view.getGameBoardHTML().append(...this.wordLinesHTML);
    return this.wordLinesHTML;
  }
  createPuzzleElements() {
    this.shuffledWords.forEach((wordsLine) => {
      const lineArr = [];
      wordsLine.forEach((word) => {
        const puzzle2 = new PuzzleComponent(word, this, this.view);
        lineArr.push(puzzle2);
      });
      this.puzzles.push(lineArr);
    });
    return this.puzzles;
  }
  fillSourcedBlock() {
    this.puzzles[this.currentRound].forEach((puzzle2) => {
      this.view.getSourceBlockHTML().append(puzzle2.getHTML());
    });
  }
  init() {
    this.setWords().then(() => {
      this.shuffleWords();
      this.createWordLines();
      this.createPuzzleElements();
      this.setHandlersToButtons();
      this.fillSourcedBlock();
    }).catch(() => {
    });
  }
}
const page = "_page_1jkgl_1";
const game_wrapper = "_game_wrapper_1jkgl_5";
const styles$1 = {
  page,
  game_wrapper
};
class MainPageView {
  constructor(id, parent) {
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "playground");
    this.id = id;
    this.parent = parent;
    this.playground = new PlaygroundModel();
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
      cssClasses: [styles$1.page],
      attributes: { id }
    });
    const wrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles$1.game_wrapper]
    });
    this.page.append(wrapper);
    wrapper.append(this.playground.getHTML());
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}
class MainPageModel {
  constructor(id, parent) {
    __publicField(this, "id");
    __publicField(this, "pageView");
    __publicField(this, "page");
    this.id = id;
    this.pageView = new MainPageView(id, parent);
    this.page = this.pageView.getHTML();
  }
  getHTML() {
    return this.page;
  }
  getID() {
    return this.id;
  }
}
const app = "_app_gnf8p_1";
const styles = {
  app
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
      cssClasses: [styles.pagesContainer]
    });
    return this.pagesContainer;
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
      main: new MainPageModel(PAGES_IDS.MAIN, this.appView.getHTML())
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
//# sourceMappingURL=main-f22d9e42.js.map
