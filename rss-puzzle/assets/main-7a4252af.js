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
const app = "_app_gnf8p_1";
const styles$4 = {
  app
};
const page$2 = "_page_1gm9x_1";
const styles$3 = {
  page: page$2
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
const form = "_form_1xx9g_1";
const form__label = "_form__label_1xx9g_15";
const form__input = "_form__input_1xx9g_23";
const form__input__error = "_form__input__error_1xx9g_32";
const form__input__success = "_form__input__success_1xx9g_35";
const form__span = "_form__span_1xx9g_42";
const form__span__visually = "_form__span__visually_1xx9g_48";
const form__span__hidden = "_form__span__hidden_1xx9g_51";
const form__btn = "_form__btn_1xx9g_54";
const styles$2 = {
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
class InputComponent {
  constructor(attrs) {
    __publicField(this, "input");
    this.input = this.createHTML(attrs);
  }
  getHTML() {
    return this.input;
  }
  createHTML(attrs) {
    this.input = createBaseElement({
      tag: "input",
      attributes: attrs
    });
    return this.input;
  }
}
class InputFieldComponent extends InputComponent {
  constructor(attrs, form2) {
    super(attrs);
    __publicField(this, "form");
    __publicField(this, "isValid");
    this.form = form2;
    this.isValid = true;
  }
}
class ButtonComponent {
  constructor(text, classes, attrs, action) {
    __publicField(this, "button");
    this.button = this.createHTML(action, classes, attrs, text);
  }
  getHTML() {
    return this.button;
  }
  createHTML(action, classes, attrs, text) {
    this.button = createBaseElement({
      tag: "button",
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
class SubmitButtonComponent extends ButtonComponent {
  constructor(form2, text, classes, attrs, action) {
    super(text, classes, attrs, action);
    __publicField(this, "form");
    this.form = form2;
  }
}
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
class FormValidation {
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
      (field) => !field.isValid
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
    currentField.isValid = true;
    const fieldHTML = currentField.getHTML();
    fieldHTML.classList.remove(styles$2.form__input__success);
    fieldHTML.classList.add(styles$2.form__input__error);
    const currentSpan = span;
    currentSpan.classList.remove(styles$2.form__span__hidden);
    currentSpan.classList.add(styles$2.form__span__visually);
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
      currentField.isValid = false;
      fieldHTML.classList.add(styles$2.form__input__success);
      fieldHTML.classList.remove(styles$2.form__input__error);
      currentSpan.textContent = "";
      currentSpan.classList.add(styles$2.form__span__hidden);
      currentSpan.classList.remove(styles$2.form__span__visually);
      this.updateBtnState();
    }
  }
}
var FIELD_NAMES = /* @__PURE__ */ ((FIELD_NAMES2) => {
  FIELD_NAMES2["NAME"] = "name";
  FIELD_NAMES2["SURNAME"] = "surname";
  return FIELD_NAMES2;
})(FIELD_NAMES || {});
const PAGES_IDS = {
  START: "start",
  LOG_IN: "logIn",
  MAIN: "main"
};
const PAGES_STATE = {
  VISIBLE: "flex",
  HIDDEN: "none"
};
class LoginForm {
  constructor(page2) {
    __publicField(this, "form");
    __publicField(this, "inputFields", []);
    __publicField(this, "inputFieldsHTML", []);
    __publicField(this, "fieldErrors", []);
    __publicField(this, "submitBtn");
    __publicField(this, "userData", {});
    __publicField(this, "formValidation");
    __publicField(this, "page");
    this.page = page2;
    this.submitBtn = this.createSubmitBtn();
    this.form = this.createHTML();
    this.formValidation = new FormValidation(
      this.inputFields,
      this.fieldErrors,
      this.submitBtn.getHTML()
    );
    this.formValidation.initValidation();
  }
  getHTML() {
    return this.form;
  }
  submit(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const nameData = formData.get(FIELD_NAMES.NAME);
    const surnameData = formData.get(FIELD_NAMES.SURNAME);
    this.userData.name = nameData;
    this.userData.surname = surnameData;
    window.location.hash = PAGES_IDS.START;
    if (this.page.saveAuthUser) {
      this.page.saveAuthUser(this.userData);
    }
    const newLoginForm = new LoginForm(this.page);
    const currentForm = this.getHTML();
    const { parentElement } = currentForm;
    if (parentElement) {
      parentElement.replaceChild(newLoginForm.getHTML(), currentForm);
    }
  }
  createFieldBox(input) {
    const fieldLabel = createBaseElement({
      tag: "label",
      cssClasses: [styles$2.form__label],
      attributes: {
        for: input.id
      },
      innerContent: `Enter ${input.name}`
    });
    const fieldErrorSpan = createBaseElement({
      tag: "span",
      cssClasses: [styles$2.form__span],
      attributes: {
        id: input.id
      }
    });
    this.fieldErrors.push(fieldErrorSpan);
    fieldLabel.append(input, fieldErrorSpan);
    return fieldLabel;
  }
  createInputsField() {
    const inputName = new InputFieldComponent(
      {
        type: "text",
        name: FIELD_NAMES.NAME,
        id: FIELD_NAMES.NAME,
        placeholder: "Ivan",
        class: styles$2.form__input,
        autocomplete: "off"
      },
      this.form
    );
    const inputSurname = new InputFieldComponent(
      {
        type: "text",
        name: FIELD_NAMES.SURNAME,
        id: FIELD_NAMES.SURNAME,
        placeholder: "Ivanov",
        class: styles$2.form__input,
        autocomplete: "off"
      },
      this.form
    );
    this.inputFieldsHTML.push(inputName.getHTML(), inputSurname.getHTML());
    return [inputName, inputSurname];
  }
  createSubmitBtn() {
    const submitBtn = new SubmitButtonComponent(
      this.form,
      "Login",
      [styles$2.form__btn, "btn-reset"],
      {
        type: "submit",
        disabled: "true"
      }
    );
    return submitBtn;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: "form",
      cssClasses: [styles$2.form],
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
    this.form.addEventListener("submit", this.submit.bind(this));
    this.form.append(this.submitBtn.getHTML());
    return this.form;
  }
}
const _Mediator = class _Mediator {
  constructor() {
    __publicField(this, "listeners");
    this.listeners = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return _Mediator.mediator;
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
__publicField(_Mediator, "mediator", new _Mediator());
let Mediator = _Mediator;
var STORE_KEYS = /* @__PURE__ */ ((STORE_KEYS2) => {
  STORE_KEYS2["LS_NAME"] = "kleostro";
  STORE_KEYS2["USER"] = "user";
  return STORE_KEYS2;
})(STORE_KEYS || {});
const AppEvents = {
  newUser: "newUser",
  changeHash: "changeHash"
};
class LogInPage {
  constructor(id, parent, storage) {
    __publicField(this, "storage");
    __publicField(this, "id");
    __publicField(this, "parent");
    __publicField(this, "singletonMediator");
    __publicField(this, "page");
    this.id = id;
    this.parent = parent;
    this.storage = storage;
    this.singletonMediator = Mediator.getInstance();
    this.page = this.createHTML(this.id);
  }
  getHTML() {
    return this.page;
  }
  checkAuthUser() {
    const userData = this.storage.get(STORE_KEYS.USER);
    if (userData.name !== "") {
      this.singletonMediator.notify(AppEvents.newUser, userData);
    } else {
      return false;
    }
    return true;
  }
  saveAuthUser(userData) {
    this.storage.add(STORE_KEYS.USER, JSON.stringify(userData));
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: "div",
      cssClasses: [styles$3.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    const loginForm = new LoginForm(this);
    this.page.append(loginForm.getHTML());
    this.parent.append(this.page);
    return this.page;
  }
}
class StorageComponent {
  constructor() {
    __publicField(this, "storage");
    this.storage = this.init();
  }
  get(key) {
    let result = { name: "", surname: "" };
    if (key in this.storage) {
      result = JSON.parse(this.storage[key]);
    }
    return result;
  }
  add(key, value) {
    this.storage[key] = value;
    this.save(this.storage);
  }
  remove(key) {
    const data = this.init();
    delete data[key];
    this.save(data);
  }
  clear() {
    localStorage.clear();
    this.init();
  }
  save(data) {
    localStorage.setItem(STORE_KEYS.LS_NAME, JSON.stringify(data));
    return this.storage;
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
const styles$1 = {
  page: page$1,
  page__title,
  page__descr,
  page__btn
};
class StartPage {
  constructor(id, parent, storage) {
    __publicField(this, "id");
    __publicField(this, "storage");
    __publicField(this, "parent");
    __publicField(this, "page");
    __publicField(this, "title");
    __publicField(this, "subtitle");
    __publicField(this, "descr");
    __publicField(this, "startBtn");
    __publicField(this, "logOutBtn");
    __publicField(this, "singletonMediator");
    this.id = id;
    this.parent = parent;
    this.storage = storage;
    this.title = null;
    this.subtitle = createBaseElement({ tag: "h2" });
    this.descr = null;
    this.startBtn = null;
    this.logOutBtn = null;
    this.singletonMediator = Mediator.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.newUser,
      this.greeting.bind(this)
    );
    this.page = this.createHTML(this.id);
  }
  getHTML() {
    return this.page;
  }
  greeting() {
    const userData = this.storage.get(STORE_KEYS.USER);
    const { name, surname } = userData;
    const greeting = `Hello, ${name} ${surname}!`;
    this.subtitle.textContent = greeting;
    return greeting;
  }
  logOut() {
    this.storage.remove(STORE_KEYS.USER);
    window.location.hash = PAGES_IDS.LOG_IN;
  }
  createTitle() {
    this.title = createBaseElement({
      tag: "h1",
      cssClasses: [styles$1.page__title],
      innerContent: "RSS Puzzle"
    });
    return this.title;
  }
  createSubtitle() {
    this.subtitle = createBaseElement({
      tag: "h2",
      cssClasses: [styles$1.page__subtitle],
      innerContent: this.greeting()
    });
    return this.subtitle;
  }
  createDescr() {
    this.descr = createBaseElement({
      tag: "p",
      cssClasses: [styles$1.page__descr],
      innerContent: "Your RSS reader"
    });
    return this.descr;
  }
  moveToMainPage() {
    window.location.hash = PAGES_IDS.MAIN;
  }
  createStartBtn() {
    this.startBtn = new ButtonComponent(
      "Start",
      [styles$1.page__btn, "btn-reset"],
      {},
      {
        key: "click",
        value: () => {
          this.moveToMainPage();
        }
      }
    );
    return this.startBtn;
  }
  createLogOutBtn() {
    this.logOutBtn = new ButtonComponent(
      "Log out",
      [styles$1.page__btn, "btn-reset"],
      {},
      {
        key: "click",
        value: () => {
          this.logOut();
        }
      }
    );
    return this.logOutBtn;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: "div",
      cssClasses: [styles$1.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.title = this.createTitle();
    this.subtitle = this.createSubtitle();
    this.descr = this.createDescr();
    this.startBtn = this.createStartBtn();
    this.logOutBtn = this.createLogOutBtn();
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
const PAGE_DELAY = 500;
const maxOpacity = 1;
class Router {
  constructor(pages) {
    __publicField(this, "pages");
    __publicField(this, "currentPage");
    __publicField(this, "duration");
    this.pages = pages;
    this.currentPage = this.setCurrentPage();
    this.duration = PAGE_DELAY;
    window.addEventListener("hashchange", this.hashChangeHandler.bind(this));
  }
  init() {
    this.hashChangeHandler();
  }
  setCurrentPage() {
    const currentHash = window.location.hash.slice(1);
    if (currentHash in this.pages) {
      this.currentPage = this.pages[currentHash];
    } else if (currentHash === "") {
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
      const progress = Math.min(elapsed / duration, maxOpacity);
      const page2 = nextPage.getHTML();
      page2.style.opacity = `${progress}`;
      page2.style.display = PAGES_STATE.VISIBLE;
      if (elapsed < duration) {
        window.requestAnimationFrame(fadeIn);
      }
    };
    const fadeOut = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, maxOpacity);
      const page2 = currentPage.getHTML();
      page2.style.opacity = `${maxOpacity - progress}`;
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
    var _a;
    const loginPage = this.pages[PAGES_IDS.LOG_IN];
    if (loginPage.checkAuthUser) {
      if (loginPage.checkAuthUser()) {
        const hash = window.location.hash.slice(1);
        if (hash === "" || hash === PAGES_IDS.LOG_IN) {
          window.location.hash = PAGES_IDS.START;
          this.renderNewPage(PAGES_IDS.START);
        } else if (hash !== ((_a = this.pages[hash]) == null ? void 0 : _a.id)) {
          window.location.hash = PAGES_IDS.START;
          this.renderNewPage(PAGES_IDS.START);
          throw new Error("Wrong hash");
        } else {
          this.renderNewPage(hash);
        }
      } else {
        window.location.hash = PAGES_IDS.LOG_IN;
        this.renderNewPage(PAGES_IDS.LOG_IN);
      }
    }
  }
}
const page = "_page_1gm9x_1";
const styles = {
  page
};
class MainPage {
  constructor(id, parent, storage) {
    __publicField(this, "id");
    __publicField(this, "storage");
    __publicField(this, "parent");
    __publicField(this, "page");
    this.id = id;
    this.parent = parent;
    this.storage = storage;
    this.page = this.createHTML(this.id);
  }
  getHTML() {
    return this.page;
  }
  createHTML(id) {
    this.page = createBaseElement({
      tag: "div",
      cssClasses: [styles.page],
      attributes: { id }
    });
    this.page.style.display = PAGES_STATE.HIDDEN;
    this.parent.append(this.page);
    return this.page;
  }
}
class App {
  constructor() {
    __publicField(this, "pagesContainer");
    __publicField(this, "storage");
    __publicField(this, "pages");
    __publicField(this, "router");
    this.pagesContainer = this.createHTML();
    this.storage = new StorageComponent();
    this.pages = {
      logIn: new LogInPage(PAGES_IDS.LOG_IN, this.pagesContainer, this.storage),
      start: new StartPage(PAGES_IDS.START, this.pagesContainer, this.storage),
      main: new MainPage(PAGES_IDS.MAIN, this.pagesContainer, this.storage)
    };
    this.router = new Router(this.pages);
    this.router.init();
  }
  createHTML() {
    this.pagesContainer = createBaseElement({
      tag: "div",
      cssClasses: [styles$4.pagesContainer]
    });
    return this.pagesContainer;
  }
}
const myApp = new App();
document.body.append(myApp.pagesContainer);
//# sourceMappingURL=main-7a4252af.js.map
