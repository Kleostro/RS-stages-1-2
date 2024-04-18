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
  LOG_IN_REQUEST: "logInRequest",
  LOG_IN_RESPONSE: "logInResponse",
  LOG_OUT_REQUEST: "logOutRequest",
  LOG_OUT_RESPONSE: "logOutResponse",
  SOCKET_CONNECT: "socketConnect",
  SOCKET_DISCONNECT: "socketDisconnect",
  GET_ALL_AUTHENTICATED_USERS_REQUEST: "getAllAuthenticatedUsersRequest",
  GET_ALL_AUTHENTICATED_USERS_RESPONSE: "getAllAuthenticatedUsersResponse",
  GET_ALL_UNAUTHENTICATED_USERS_REQUEST: "getAllUnauthenticatedUsersRequest",
  GET_ALL_UNAUTHENTICATED_USERS_RESPONSE: "getAllUnauthenticatedUsersResponse",
  GET_HISTORY_MESSAGES_REQUEST: "getHistoryMessagesRequest",
  GET_HISTORY_MESSAGES_RESPONSE: "getHistoryMessagesResponse",
  GET_ALL_HISTORY_MESSAGE_FOR_CURRENT_USER_REQUEST: "getAllHistoryMessageForCurrentUserRequest",
  GET_ALL_HISTORY_MESSAGE_FOR_CURRENT_USER_RESPONSE: "getAllHistoryMessageForCurrentUserResponse",
  SEND_MESSAGE_REQUEST: "sendMessageRequest",
  SEND_MESSAGE_RESPONSE: "sendMessageResponse",
  DELETE_MESSAGE_REQUEST: "deleteMessageRequest",
  DELETE_MESSAGE_RESPONSE: "deleteMessageResponse",
  DELIVERED_MESSAGE_RESPONSE: "deliveredMessageResponse",
  EXTERNAL_LOGIN_RESPONSE: "externalLoginResponse",
  EXTERNAL_LOGOUT_RESPONSE: "externalLogoutResponse",
  OPEN_USER_DIALOGUE: "openUserDialogue"
};
const _EventMediatorModel = class _EventMediatorModel {
  constructor() {
    __publicField(this, "listeners", /* @__PURE__ */ new Map());
  }
  static getInstance() {
    return _EventMediatorModel.mediator;
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
      const index2 = listeners == null ? void 0 : listeners.findIndex(
        (l) => l.toString() === listener.toString()
      );
      if (index2 !== void 0 && index2 !== -1) {
        listeners == null ? void 0 : listeners.splice(index2, 1);
        if (listeners) {
          this.listeners.set(eventName, listeners);
        }
      }
    }
  }
};
__publicField(_EventMediatorModel, "mediator", new _EventMediatorModel());
let EventMediatorModel = _EventMediatorModel;
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
  A: "a",
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
  MESSAGE: "message",
  MOUSEENTER: "mouseenter",
  MOUSELEAVE: "mouseleave"
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
const mainPage = "_mainPage_1s168_1";
const mainPage_hidden = "_mainPage_hidden_1s168_7";
const chatWrapper = "_chatWrapper_1s168_11";
const MAIN_PAGE_STYLES = {
  mainPage,
  mainPage_hidden,
  chatWrapper
};
class MainPageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "chatWrapper");
    __publicField(this, "page");
    this.parent = parent;
    this.chatWrapper = this.createChatWrapper();
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  getChatWrapper() {
    return this.chatWrapper;
  }
  createChatWrapper() {
    this.chatWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MAIN_PAGE_STYLES.chatWrapper]
    });
    return this.chatWrapper;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MAIN_PAGE_STYLES.mainPage]
    });
    this.page.append(this.chatWrapper);
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
const AUTHENTICATION_ANIMATE_PARAMS = [
  { transform: "translateX(110%)" },
  { transform: "translateX(-10%)" },
  { transform: "translateX(-10%)" },
  { transform: "translateX(-10%)", opacity: 1 },
  { transform: "translate(-10%, -110%)", opacity: 0 }
];
const AUTHENTICATION_ANIMATE_DETAILS = {
  params: AUTHENTICATION_ANIMATE_PARAMS,
  duration: 5500,
  easing: "cubic-bezier(0, 0.2, 0.58, 0.7)"
};
const ABOUT_INFO_TEXT = {
  text: "This project was created for educational purposes.",
  backButtonText: "Go back"
};
const INITIAL_STATE = {
  currentUser: null,
  selectedUser: null,
  allUsers: [],
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
    case "setSelectedUser":
      return {
        ...state,
        selectedUser: action.payload
      };
    case "setAllUsers":
      return {
        ...state,
        allUsers: action.payload
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
      if (key === action.type) {
        const currentListeners = _StoreModel.listeners.get(key);
        if (currentListeners) {
          currentListeners.forEach((currentListener) => currentListener());
        }
      }
    });
    return action;
  }
  static getState() {
    return structuredClone(_StoreModel.state);
  }
  static subscribe(key, listener) {
    const currentListeners = _StoreModel.listeners.get(key) || [];
    currentListeners.push(listener);
    _StoreModel.listeners.set(key, currentListeners);
    return () => {
      _StoreModel.listeners.delete(key);
    };
  }
};
__publicField(_StoreModel, "listeners", /* @__PURE__ */ new Map());
__publicField(_StoreModel, "rootReducer", rootReducer);
__publicField(_StoreModel, "state", INITIAL_STATE);
let StoreModel = _StoreModel;
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
const wrapper = "_wrapper_14equ_1";
const userList = "_userList_14equ_7";
const counter = "_counter_14equ_37";
const userListEmpty = "_userListEmpty_14equ_52";
const userListSearchInput = "_userListSearchInput_14equ_56";
const user = "_user_14equ_7";
const userActive = "_userActive_14equ_146";
const userInactive = "_userInactive_14equ_153";
const userSelected = "_userSelected_14equ_160";
const USER_LIST_STYLES = {
  wrapper,
  userList,
  counter,
  userListEmpty,
  userListSearchInput,
  user,
  userActive,
  userInactive,
  userSelected
};
const INPUT_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
  RANGE: "range",
  DATE: "date",
  COLOR: "color",
  SEARCH: "search"
};
const SEARCH_INPUT_PLACEHOLDER = "Search...";
const EMPTY_USERS_LIST = "There are no users in the list";
class UserListView {
  constructor() {
    __publicField(this, "searchInput");
    __publicField(this, "userList");
    __publicField(this, "wrapper");
    this.searchInput = this.createSearchInput();
    this.userList = this.createUserList();
    this.wrapper = this.createHTML();
  }
  getHTML() {
    return this.wrapper;
  }
  getSearchInput() {
    return this.searchInput;
  }
  drawUser(userInfo) {
    this.userList.classList.remove(USER_LIST_STYLES.userListEmpty);
    const user2 = createBaseElement({
      tag: TAG_NAMES.LI,
      cssClasses: [USER_LIST_STYLES.user],
      attributes: {
        id: userInfo.login
      },
      innerContent: userInfo.login
    });
    if (userInfo.isLogined) {
      user2.classList.add(USER_LIST_STYLES.userActive);
    } else {
      user2.classList.add(USER_LIST_STYLES.userInactive);
    }
    this.userList.append(user2);
  }
  clearUserList() {
    this.userList.innerHTML = "";
  }
  getUserList() {
    return this.userList;
  }
  emptyUserList() {
    this.userList.innerHTML = EMPTY_USERS_LIST;
    this.userList.classList.add(USER_LIST_STYLES.userListEmpty);
  }
  selectUser(target) {
    if (target instanceof HTMLLIElement || target instanceof HTMLSpanElement) {
      const users = this.userList.children;
      Array.from(users).forEach((user2) => {
        user2.classList.remove(USER_LIST_STYLES.userSelected);
      });
      target.classList.add(USER_LIST_STYLES.userSelected);
    }
  }
  drawUnreadMessagesCount(login2, messages) {
    const users = this.userList.children;
    Array.from(users).forEach((item) => {
      if (item.id === login2) {
        const currentUser2 = item;
        const currentUserLogin = item.id;
        const unreadMessages = messages.filter(
          (message2) => message2.from === currentUserLogin
        );
        currentUser2.innerHTML = "";
        currentUser2.textContent = currentUserLogin;
        if (unreadMessages.length) {
          const counter2 = createBaseElement({
            tag: TAG_NAMES.SPAN,
            cssClasses: [USER_LIST_STYLES.counter],
            innerContent: unreadMessages.length.toString()
          });
          item.append(counter2);
        }
      }
    });
  }
  createSearchInput() {
    this.searchInput = new InputModel({
      placeholder: SEARCH_INPUT_PLACEHOLDER,
      type: INPUT_TYPES.SEARCH
    });
    this.searchInput.getHTML().classList.add(USER_LIST_STYLES.userListSearchInput);
    return this.searchInput;
  }
  createUserList() {
    this.userList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [USER_LIST_STYLES.userList]
    });
    return this.userList;
  }
  createHTML() {
    this.wrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_LIST_STYLES.wrapper]
    });
    this.wrapper.append(this.searchInput.getHTML(), this.userList);
    return this.wrapper;
  }
}
const isFromServerMessage = (message2) => {
  const isValidMessage = (msg) => typeof msg === "object" && msg !== null && "type" in msg && "id" in msg && "payload" in msg;
  if (isValidMessage(message2)) {
    return message2;
  }
  return null;
};
const ACTIONS = {
  SET_CURRENT_USER: "setCurrentUser",
  SET_SELECTED_USER: "setSelectedUser",
  SET_ALL_USERS: "setAllUsers",
  SET_CURRENT_AUTHORIZED_USERS: "setCurrentAuthorizedUsers",
  SET_CURRENT_UNAUTHORIZED_USERS: "setCurrentUnauthorizedUsers",
  SET_CURRENT_USER_DIALOGS: "setCurrentUserDialogs"
};
const setCurrentUser = (value) => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_USER
});
const setSelectedUser = (value) => ({
  payload: value,
  type: ACTIONS.SET_SELECTED_USER
});
const setCurrentAuthorizedUsers = (value) => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_AUTHORIZED_USERS
});
const setAllUsers = (value) => ({
  payload: value,
  type: ACTIONS.SET_ALL_USERS
});
const setCurrentUnauthorizedUsers = (value) => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_UNAUTHORIZED_USERS
});
const setCurrentUserDialogs = (value) => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_USER_DIALOGS
});
const API_URL = "ws://127.0.0.1:4000";
const API_TYPES = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  USER_ACTIVE: "USER_ACTIVE",
  USER_INACTIVE: "USER_INACTIVE",
  USER_EXTERNAL_LOGIN: "USER_EXTERNAL_LOGIN",
  USER_EXTERNAL_LOGOUT: "USER_EXTERNAL_LOGOUT",
  ERROR: "ERROR",
  MSG_FROM_USER: "MSG_FROM_USER",
  MSG_SEND: "MSG_SEND",
  MSG_DELETE: "MSG_DELETE",
  MSG_DELIVER: "MSG_DELIVER"
};
const CHECK_INTERVAL = 5e3;
const isMessage = (value) => typeof value === "object" && value !== null && "from" in value && "to" in value && "text" in value && "datetime" in value && "status" in value;
class UserListModel {
  constructor() {
    __publicField(this, "view", new UserListView());
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  getActiveUsers() {
    const requestMessage = {
      id: "",
      type: API_TYPES.USER_ACTIVE,
      payload: null
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      requestMessage
    );
  }
  getInactiveUsers() {
    const requestMessage = {
      id: "",
      type: API_TYPES.USER_INACTIVE,
      payload: null
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      requestMessage
    );
  }
  getAllUsers() {
    this.getActiveUsers();
    this.getInactiveUsers();
  }
  drawUnreadMessages() {
    const { currentUserDialogs } = StoreModel.getState();
    if (!currentUserDialogs.length) {
      return;
    }
    currentUserDialogs.forEach((dialog) => {
      const unReadMessages = dialog.messages.filter(
        (message2) => !message2.status.isReaded
      );
      this.view.drawUnreadMessagesCount(dialog.login, unReadMessages);
    });
  }
  drawUsers() {
    this.view.clearUserList();
    const { allUsers } = StoreModel.getState();
    if (!allUsers.length) {
      this.view.emptyUserList();
    }
    allUsers.forEach((user2) => {
      this.view.drawUser(user2);
    });
  }
  getAllUsersHandler(message2) {
    const checkedMessage = isFromServerMessage(message2);
    if (checkedMessage) {
      const action = checkedMessage.type === API_TYPES.USER_ACTIVE ? setCurrentAuthorizedUsers : setCurrentUnauthorizedUsers;
      StoreModel.dispatch(action(checkedMessage.payload.users));
      const { currentAuthorizedUsers, currentUnauthorizedUsers, currentUser: currentUser2 } = StoreModel.getState();
      const allUsers = [
        ...currentAuthorizedUsers,
        ...currentUnauthorizedUsers
      ].filter((user2) => user2.login !== (currentUser2 == null ? void 0 : currentUser2.login));
      StoreModel.dispatch(setAllUsers(allUsers));
      if (currentUser2) {
        allUsers.forEach((user2) => {
          this.getAllMessages(user2.login);
        });
      }
      this.drawUsers();
    }
  }
  getAllMessages(login2) {
    const requestMessage = {
      id: "",
      type: API_TYPES.MSG_FROM_USER,
      payload: {
        user: {
          login: login2
        }
      }
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      requestMessage
    );
  }
  saveMessages(messages) {
    const checkedMessage = isFromServerMessage(messages);
    const { currentUserDialogs, currentUser: currentUser2 } = StoreModel.getState();
    let from = "";
    let to = "";
    let currentMessages = [];
    if (checkedMessage == null ? void 0 : checkedMessage.payload.message) {
      const newMessage = checkedMessage.payload.message;
      if (isMessage(newMessage)) {
        currentMessages = [newMessage];
        from = newMessage.from;
        to = newMessage.to;
      }
    } else {
      if (!(checkedMessage == null ? void 0 : checkedMessage.payload.messages.length)) {
        return;
      }
      currentMessages = checkedMessage.payload.messages;
      from = currentMessages[0].from;
      to = currentMessages[0].to;
    }
    const userLogin2 = from === (currentUser2 == null ? void 0 : currentUser2.login) ? to : from;
    const currentDialog = currentUserDialogs == null ? void 0 : currentUserDialogs.find(
      (dialog) => dialog.login === userLogin2
    );
    if (currentDialog) {
      currentDialog.messages = checkedMessage.payload.message ? [...currentDialog.messages, ...currentMessages] : currentMessages;
    } else {
      currentUserDialogs == null ? void 0 : currentUserDialogs.push({
        login: userLogin2,
        messages: currentMessages
      });
    }
    StoreModel.dispatch(setCurrentUserDialogs(currentUserDialogs));
    this.drawUnreadMessages();
  }
  userListHandler(event) {
    const { target } = event;
    this.view.selectUser(target);
    const { allUsers } = StoreModel.getState();
    let currentUserInfo2 = null;
    if (target instanceof HTMLSpanElement) {
      currentUserInfo2 = allUsers.find(
        (user2) => {
          var _a;
          return user2.login === ((_a = target.parentElement) == null ? void 0 : _a.id);
        }
      );
    } else if (target instanceof HTMLLIElement) {
      currentUserInfo2 = allUsers.find((user2) => user2.login === target.id);
    }
    if (currentUserInfo2) {
      StoreModel.dispatch(setSelectedUser(currentUserInfo2));
    }
    this.eventMediator.notify(
      MEDIATOR_EVENTS.OPEN_USER_DIALOGUE,
      currentUserInfo2
    );
  }
  setUserListHandler() {
    this.view.getUserList().addEventListener(EVENT_NAMES.CLICK, (event) => {
      this.userListHandler(event);
    });
    return true;
  }
  redrawUnreadMessagesHandler(message2) {
    const checkedMessage = isFromServerMessage(message2);
    const { currentUserDialogs } = StoreModel.getState();
    currentUserDialogs.forEach((dialog) => {
      const deletedMessage = dialog.messages.find(
        (msg) => msg.id === (checkedMessage == null ? void 0 : checkedMessage.payload.message.id)
      );
      if (deletedMessage) {
        const currentDialog = dialog;
        currentDialog.messages = dialog.messages.filter(
          (msg) => msg.id !== deletedMessage.id
        );
        StoreModel.dispatch(setCurrentUserDialogs(currentUserDialogs));
        this.drawUnreadMessages();
      }
    });
    return true;
  }
  subscribeToEventMediator() {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_RESPONSE,
      (message2) => {
        this.getAllUsersHandler(message2);
      }
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_RESPONSE,
      (message2) => {
        this.getAllUsersHandler(message2);
      }
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT_RESPONSE,
      this.getAllUsers.bind(this)
    );
    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_IN_RESPONSE, () => {
      this.getAllUsers();
    });
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
      this.getAllUsers.bind(this)
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
      this.getAllUsers.bind(this)
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
      (message2) => {
        this.saveMessages(message2);
      }
    );
    return true;
  }
  subscribeToEventMediator2() {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE,
      (message2) => {
        this.saveMessages(message2);
      }
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_RESPONSE,
      (message2) => {
        this.redrawUnreadMessagesHandler(message2);
      }
    );
    return true;
  }
  searchInputHandler() {
    const { currentAuthorizedUsers, currentUnauthorizedUsers, currentUser: currentUser2 } = StoreModel.getState();
    const allUsers = [...currentAuthorizedUsers, ...currentUnauthorizedUsers];
    const inputValue = this.view.getSearchInput().getHTML().value.toLowerCase().trim();
    const filteredUsers = allUsers.filter(
      (user2) => user2.login.toLowerCase().includes(inputValue)
    );
    this.view.clearUserList();
    const currentUsers = filteredUsers.filter(
      (user2) => user2.login !== (currentUser2 == null ? void 0 : currentUser2.login)
    );
    if (!currentUsers.length) {
      this.view.emptyUserList();
    }
    currentUsers.forEach((user2) => {
      this.view.drawUser(user2);
    });
    this.drawUnreadMessages();
  }
  setSearchInputHandler() {
    this.view.getSearchInput().getHTML().addEventListener(EVENT_NAMES.INPUT, this.searchInputHandler.bind(this));
  }
  init() {
    this.setUserListHandler();
    this.setSearchInputHandler();
    this.subscribeToEventMediator();
    this.subscribeToEventMediator2();
  }
}
const SEND_MESSAGE_INPUT_FIELD_PARAMS = {
  placeholder: "Send message",
  autocomplete: "off"
};
const SEND_MESSAGE_FORM_SVG_DETAILS = {
  SVG_URL: "http://www.w3.org/2000/svg",
  SEND_ID: "send"
};
const form = "_form_1lrab_1";
const inputField = "_inputField_1lrab_15";
const emojiButton = "_emojiButton_1lrab_42";
const submitFormButton = "_submitFormButton_1lrab_50";
const hidden$2 = "_hidden_1lrab_77";
const SEND_MESSAGE_FORM_STYLES = {
  form,
  inputField,
  emojiButton,
  submitFormButton,
  hidden: hidden$2
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
const BUTTON_TYPES = {
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button"
};
const createSVGUse = (id) => {
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${id}`);
  return use;
};
class SendMessageFormView {
  constructor() {
    __publicField(this, "emojiButton");
    __publicField(this, "submitFormButton");
    __publicField(this, "inputField");
    __publicField(this, "form");
    this.emojiButton = this.createEmojiButton();
    this.submitFormButton = this.createSubmitFormButton();
    this.inputField = this.createInputField();
    this.form = this.createHTML();
    this.hideForm();
  }
  getHTML() {
    return this.form;
  }
  getInputField() {
    return this.inputField;
  }
  getSubmitFormButton() {
    return this.submitFormButton;
  }
  getEmojiButton() {
    return this.emojiButton;
  }
  hideForm() {
    this.form.classList.add(SEND_MESSAGE_FORM_STYLES.hidden);
  }
  showForm() {
    this.form.classList.remove(SEND_MESSAGE_FORM_STYLES.hidden);
  }
  createEmojiButton() {
    this.emojiButton = new ButtonModel({
      text: "😀",
      classes: [SEND_MESSAGE_FORM_STYLES.emojiButton]
    });
    return this.emojiButton;
  }
  createInputField() {
    this.inputField = createBaseElement({
      tag: TAG_NAMES.TEXTAREA,
      cssClasses: [SEND_MESSAGE_FORM_STYLES.inputField],
      attributes: {
        placeholder: SEND_MESSAGE_INPUT_FIELD_PARAMS.placeholder,
        autocomplete: SEND_MESSAGE_INPUT_FIELD_PARAMS.autocomplete
      }
    });
    return this.inputField;
  }
  createSubmitFormButton() {
    this.submitFormButton = new ButtonModel({
      classes: [SEND_MESSAGE_FORM_STYLES.submitFormButton],
      attrs: {
        type: BUTTON_TYPES.SUBMIT
      }
    });
    const svg = document.createElementNS(
      SEND_MESSAGE_FORM_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    svg.append(createSVGUse(SEND_MESSAGE_FORM_SVG_DETAILS.SEND_ID));
    this.submitFormButton.getHTML().append(svg);
    this.submitFormButton.setDisabled();
    return this.submitFormButton;
  }
  createHTML() {
    this.form = createBaseElement({
      tag: TAG_NAMES.FORM,
      cssClasses: [SEND_MESSAGE_FORM_STYLES.form]
    });
    this.form.append(
      this.inputField,
      this.emojiButton.getHTML(),
      this.submitFormButton.getHTML()
    );
    return this.form;
  }
}
const emojiWrapper = "_emojiWrapper_poadq_1";
const contentWrapper = "_contentWrapper_poadq_18";
const categoryList = "_categoryList_poadq_22";
const category = "_category_poadq_22";
const emojiList = "_emojiList_poadq_54";
const sectionTitle = "_sectionTitle_poadq_61";
const emojiItem = "_emojiItem_poadq_74";
const hidden$1 = "_hidden_poadq_80";
const EMOJI_STYLES = {
  emojiWrapper,
  contentWrapper,
  categoryList,
  category,
  emojiList,
  sectionTitle,
  emojiItem,
  hidden: hidden$1
};
class EmojiListView {
  constructor(emoji) {
    __publicField(this, "emojiData", []);
    __publicField(this, "categoryNamesList", /* @__PURE__ */ new Map());
    __publicField(this, "emojiItems", []);
    __publicField(this, "categoryButtons", []);
    __publicField(this, "categoryList");
    __publicField(this, "contentWrapper");
    __publicField(this, "emojiWrapper");
    this.emojiData = emoji;
    this.categoryList = this.createCategoryList();
    this.contentWrapper = this.createContentWrapper();
    this.emojiWrapper = this.createHTML();
  }
  getHTML() {
    return this.emojiWrapper;
  }
  switchVisibility() {
    this.emojiWrapper.classList.toggle(EMOJI_STYLES.hidden);
  }
  getEmojiItems() {
    return this.emojiItems;
  }
  getCategoryButtons() {
    return this.categoryButtons;
  }
  getContentWrapper() {
    return this.contentWrapper;
  }
  createCategoryButton(categoryName, emoji) {
    const button = new ButtonModel({
      text: emoji,
      classes: [EMOJI_STYLES.category],
      attrs: {
        id: categoryName
      }
    });
    this.categoryButtons.push(button);
    return button;
  }
  createCategoryList() {
    this.categoryList = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [EMOJI_STYLES.categoryList]
    });
    this.emojiData.forEach((category2) => {
      if (!this.categoryNamesList.has(category2.category)) {
        this.categoryNamesList.set(category2.category, category2.emoji);
      }
    });
    this.categoryNamesList.forEach((emoji, categoryName) => {
      this.createCategoryButton(categoryName, emoji);
      this.categoryList.append(
        this.categoryButtons[this.categoryButtons.length - 1].getHTML()
      );
    });
    return this.categoryList;
  }
  createEmojiSection(categoryName) {
    const sectionTitle2 = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [EMOJI_STYLES.sectionTitle],
      attributes: {
        id: categoryName
      },
      innerContent: categoryName
    });
    const emojiList2 = createBaseElement({
      tag: TAG_NAMES.UL,
      cssClasses: [EMOJI_STYLES.emojiList]
    });
    this.emojiData.forEach((emoji) => {
      if (emoji.category === categoryName) {
        const emojiItem2 = createBaseElement({
          tag: TAG_NAMES.LI,
          cssClasses: [EMOJI_STYLES.emojiItem],
          innerContent: emoji.emoji
        });
        this.emojiItems.push(emojiItem2);
        emojiList2.append(emojiItem2);
      }
    });
    this.contentWrapper.append(sectionTitle2, emojiList2);
  }
  createContentWrapper() {
    this.contentWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [EMOJI_STYLES.contentWrapper]
    });
    return this.contentWrapper;
  }
  createHTML() {
    this.emojiWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [EMOJI_STYLES.emojiWrapper, EMOJI_STYLES.hidden]
    });
    this.contentWrapper.append(this.categoryList);
    this.categoryNamesList.forEach((_, categoryName) => {
      this.createEmojiSection(categoryName);
    });
    this.emojiWrapper.append(this.contentWrapper);
    return this.emojiWrapper;
  }
}
const SCROLL_DETAILS = {
  behavior: "smooth",
  block: "center"
};
class EmojiListModel {
  constructor(emoji) {
    __publicField(this, "view");
    this.view = new EmojiListView(emoji);
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  getView() {
    return this.view;
  }
  hideEmojiList() {
    var _a;
    (_a = this.getHTML()) == null ? void 0 : _a.addEventListener(EVENT_NAMES.MOUSELEAVE, () => {
      var _a2;
      (_a2 = this.view) == null ? void 0 : _a2.switchVisibility();
    });
  }
  init() {
    this.hideEmojiList();
    this.view.getCategoryButtons().forEach((button) => {
      button.getHTML().addEventListener(EVENT_NAMES.CLICK, () => {
        const contentChildren = this.view.getContentWrapper().children;
        Array.from(contentChildren).forEach((child) => {
          if (child.id === button.getHTML().id) {
            const currentChild = child;
            currentChild.scrollIntoView({
              behavior: SCROLL_DETAILS.behavior,
              block: SCROLL_DETAILS.block
            });
          }
        });
      });
    });
  }
}
const isEmoji = (data) => Array.isArray(data) && data.every((item) => typeof item === "object");
const getEmojiData = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json"
  );
  const data = await response.json();
  return data;
};
class SendMessageFormModel {
  constructor() {
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "view", new SendMessageFormView());
    __publicField(this, "emojiList", null);
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  inputFieldHandler() {
    const inputField2 = this.view.getInputField();
    const submitFormButton2 = this.view.getSubmitFormButton();
    if (inputField2.value) {
      submitFormButton2.setEnabled();
    } else {
      submitFormButton2.setDisabled();
    }
  }
  setInputFieldHandlers() {
    const inputField2 = this.view.getInputField();
    const ENTER_KEY = "Enter";
    inputField2.addEventListener(
      EVENT_NAMES.INPUT,
      this.inputFieldHandler.bind(this)
    );
    inputField2.addEventListener(EVENT_NAMES.KEYDOWN, (event) => {
      if (event.key === ENTER_KEY) {
        event.preventDefault();
      }
      if (event.key === ENTER_KEY && event.shiftKey) {
        const currentValue = inputField2.value;
        inputField2.value = `${currentValue}
`;
        inputField2.scrollTop = inputField2.scrollHeight;
      } else if (event.key === ENTER_KEY && !event.shiftKey && inputField2.value) {
        this.formSubmitHandler();
      }
    });
  }
  setPreventDefaultToForm() {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });
    return true;
  }
  formSubmitHandler() {
    const inputField2 = this.view.getInputField();
    const submitFormButton2 = this.view.getSubmitFormButton();
    this.sendMessage(inputField2.value);
    inputField2.value = "";
    submitFormButton2.setDisabled();
  }
  sendMessage(text2) {
    const { selectedUser } = StoreModel.getState();
    const message2 = {
      id: "",
      type: API_TYPES.MSG_SEND,
      payload: {
        message: {
          to: selectedUser == null ? void 0 : selectedUser.login,
          text: text2
        }
      }
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST, message2);
  }
  setSubmitButtonHandler() {
    const submitFormButton2 = this.view.getSubmitFormButton();
    submitFormButton2.getHTML().addEventListener(EVENT_NAMES.CLICK, this.formSubmitHandler.bind(this));
  }
  emojiButtonHandler() {
    var _a;
    const emojiListView = (_a = this.emojiList) == null ? void 0 : _a.getView();
    emojiListView == null ? void 0 : emojiListView.switchVisibility();
  }
  setEmojiButtonHandler() {
    const emojiButtonHTML = this.view.getEmojiButton().getHTML();
    emojiButtonHTML.addEventListener(
      EVENT_NAMES.MOUSEENTER,
      this.emojiButtonHandler.bind(this)
    );
  }
  setEmojiItemHandlers() {
    var _a, _b;
    const emojiItems = (_b = (_a = this.emojiList) == null ? void 0 : _a.getView()) == null ? void 0 : _b.getEmojiItems();
    emojiItems == null ? void 0 : emojiItems.forEach((item) => {
      item.addEventListener(EVENT_NAMES.CLICK, ({ target }) => {
        if (target instanceof HTMLLIElement && target.textContent) {
          this.view.getInputField().value += target.textContent;
          this.view.getSubmitFormButton().setEnabled();
          this.view.getInputField().focus();
        }
      });
    });
  }
  subscribeToEventMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, () => {
      this.view.showForm();
      this.view.getInputField().focus();
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, () => {
      this.view.hideForm();
    });
  }
  init() {
    getEmojiData().then((data) => {
      if (isEmoji(data)) {
        this.emojiList = new EmojiListModel(data);
        const emojiList2 = this.emojiList.getView();
        this.view.getHTML().append(emojiList2.getHTML());
        this.setEmojiButtonHandler();
        this.setEmojiItemHandlers();
      }
    }).catch(() => {
    });
    this.subscribeToEventMediator();
    this.setPreventDefaultToForm();
    this.setInputFieldHandlers();
    this.setSubmitButtonHandler();
  }
}
const MESSAGES_WRAPPER_CONTENT = {
  EMPTY: "This is the start of your great conversation, say hello!",
  NO_USER_SELECT: "Select user to start messaging"
};
const dialogWrapper = "_dialogWrapper_pi0n6_1";
const currentUserInfo = "_currentUserInfo_pi0n6_10";
const active = "_active_pi0n6_39";
const inactive = "_inactive_pi0n6_46";
const messagesWrapper = "_messagesWrapper_pi0n6_54";
const emptyList = "_emptyList_pi0n6_68";
const hidden = "_hidden_pi0n6_74";
const USER_DIALOGUE_STYLES = {
  dialogWrapper,
  currentUserInfo,
  active,
  inactive,
  messagesWrapper,
  emptyList,
  hidden
};
class UserDialogueView {
  constructor() {
    __publicField(this, "currentUserInfo");
    __publicField(this, "messagesWrapper");
    __publicField(this, "dialogWrapper");
    this.currentUserInfo = this.createCurrentUserInfo();
    this.messagesWrapper = this.createMessagesWrapper();
    this.dialogWrapper = this.createHTML();
    this.hideDialogue();
  }
  getHTML() {
    return this.dialogWrapper;
  }
  getCurrentUserInfo() {
    return this.currentUserInfo;
  }
  getMessagesWrapper() {
    return this.messagesWrapper;
  }
  clearMessagesWrapper() {
    this.messagesWrapper.classList.remove(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = "";
  }
  hideDialogue() {
    this.messagesWrapper.classList.add(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = MESSAGES_WRAPPER_CONTENT.NO_USER_SELECT;
    this.currentUserInfo.classList.add(USER_DIALOGUE_STYLES.hidden);
  }
  showDialogue() {
    this.clearMessagesWrapper();
    this.currentUserInfo.classList.remove(USER_DIALOGUE_STYLES.hidden);
  }
  showEmptyDialogue() {
    this.messagesWrapper.classList.add(USER_DIALOGUE_STYLES.emptyList);
    this.messagesWrapper.innerHTML = MESSAGES_WRAPPER_CONTENT.EMPTY;
  }
  setCurrentUserInfo(userInfo) {
    const { active: active2, inactive: inactive2 } = USER_DIALOGUE_STYLES;
    this.currentUserInfo.textContent = userInfo.login;
    this.currentUserInfo.classList.toggle(inactive2, !userInfo.isLogined);
    this.currentUserInfo.classList.toggle(active2, !!userInfo.isLogined);
  }
  createCurrentUserInfo() {
    this.currentUserInfo = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [USER_DIALOGUE_STYLES.currentUserInfo]
    });
    return this.currentUserInfo;
  }
  createMessagesWrapper() {
    this.messagesWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_DIALOGUE_STYLES.messagesWrapper]
    });
    return this.messagesWrapper;
  }
  createHTML() {
    this.dialogWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [USER_DIALOGUE_STYLES.dialogWrapper]
    });
    this.dialogWrapper.append(this.currentUserInfo, this.messagesWrapper);
    return this.dialogWrapper;
  }
}
const isUser = (data) => typeof data === "object" && data !== null && "login" in data && "password" in data;
const isSavedUser = (data) => typeof data === "object" && data !== null && "login" in data && "isLogined" in data;
const message = "_message_drvjb_1";
const text = "_text_drvjb_16";
const login = "_login_drvjb_26";
const status = "_status_drvjb_35";
const date = "_date_drvjb_36";
const currentUser = "_currentUser_drvjb_47";
const otherUser = "_otherUser_drvjb_71";
const MESSAGE_STYLES = {
  message,
  text,
  login,
  status,
  date,
  currentUser,
  otherUser
};
const messageDateFormatting = (date2) => {
  const newDate = new Date(date2);
  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
const MESSAGE_STATE = {
  SENDED: "&#10003",
  DELIVERED: "&#10003&#10003"
};
const MESSAGE_BUTTONS_TEXT = {
  DELETE: "&#128686;",
  EDIT: "&#9997;"
};
class MessageView {
  constructor(messageParams) {
    __publicField(this, "messageParams");
    __publicField(this, "editButton");
    __publicField(this, "deleteButton");
    __publicField(this, "editWrapper");
    __publicField(this, "messageText");
    __publicField(this, "messageDate");
    __publicField(this, "messageLogin");
    __publicField(this, "messageStatus");
    __publicField(this, "message");
    this.messageParams = messageParams;
    this.editButton = this.createEditButton();
    this.deleteButton = this.createDeleteButton();
    this.editWrapper = this.createEditWrapper();
    this.messageText = this.createMessageText();
    this.messageDate = this.createMessageDate();
    this.messageLogin = this.createMessageLogin();
    this.messageStatus = this.createMessageStatus();
    this.message = this.createHTML();
  }
  getHTML() {
    return this.message;
  }
  deliveredMessage() {
    this.messageStatus.innerHTML = MESSAGE_STATE.DELIVERED;
  }
  createEditButton() {
    this.editButton = new ButtonModel({
      text: MESSAGE_BUTTONS_TEXT.EDIT,
      classes: [MESSAGE_STYLES.editButton]
    });
    return this.editButton;
  }
  createDeleteButton() {
    this.deleteButton = new ButtonModel({
      text: MESSAGE_BUTTONS_TEXT.DELETE,
      classes: [MESSAGE_STYLES.deleteButton]
    });
    return this.deleteButton;
  }
  createEditWrapper() {
    this.editWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MESSAGE_STYLES.editWrapper]
    });
    this.editWrapper.append(
      this.editButton.getHTML(),
      this.deleteButton.getHTML()
    );
    return this.editWrapper;
  }
  createMessageText() {
    this.messageText = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.text],
      innerContent: this.messageParams.text
    });
    return this.messageText;
  }
  createMessageLogin() {
    this.messageLogin = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.login],
      innerContent: this.messageParams.from
    });
    return this.messageLogin;
  }
  createMessageDate() {
    this.messageDate = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.date],
      innerContent: messageDateFormatting(this.messageParams.datetime)
    });
    return this.messageDate;
  }
  createMessageStatus() {
    const { isDelivered } = this.messageParams.status;
    this.messageStatus = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [MESSAGE_STYLES.status],
      innerContent: isDelivered ? MESSAGE_STATE.DELIVERED : MESSAGE_STATE.SENDED
    });
    return this.messageStatus;
  }
  wasSentByCurrentUser() {
    var _a;
    return this.messageParams.from === ((_a = StoreModel.getState().currentUser) == null ? void 0 : _a.login);
  }
  createHTML() {
    this.message = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MESSAGE_STYLES.message]
    });
    this.message.append(
      this.messageText,
      this.messageDate,
      this.messageLogin,
      this.messageStatus
    );
    if (this.wasSentByCurrentUser()) {
      this.message.classList.add(MESSAGE_STYLES.currentUser);
      this.messageLogin.textContent = "You";
      this.message.append(this.editWrapper);
    } else {
      this.message.classList.add(MESSAGE_STYLES.otherUser);
      this.messageStatus.textContent = "";
    }
    return this.message;
  }
}
class MessageModel {
  constructor(messageParams, messageID) {
    __publicField(this, "view");
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "messageID", "");
    this.messageID = messageID;
    this.view = new MessageView(messageParams);
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  deleteMessageHandler() {
    const message2 = {
      id: this.messageID,
      type: API_TYPES.MSG_DELETE,
      payload: {
        message: {
          id: this.messageID
        }
      }
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST, message2);
  }
  subscribeToEventMediator() {
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
      (message2) => {
        const checkedMessage = isFromServerMessage(message2);
        if ((checkedMessage == null ? void 0 : checkedMessage.payload.message.id) === this.messageID) {
          this.view.deliveredMessage();
        }
      }
    );
  }
  init() {
    this.subscribeToEventMediator();
    this.getHTML().addEventListener(EVENT_NAMES.CONTEXTMENU, (event) => {
      event.preventDefault();
      this.deleteMessageHandler();
    });
  }
}
class UserDialogueModel {
  constructor() {
    __publicField(this, "view", new UserDialogueView());
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "sendMessageForm", new SendMessageFormModel());
    __publicField(this, "messageID", "");
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  retrieveMessagesWithCurrentUser(data) {
    const checkedData = isFromServerMessage(data);
    if (checkedData && checkedData.id === this.messageID && checkedData.id !== "") {
      this.hasMessages(checkedData.payload.messages);
    }
  }
  drawMessagesWithCurrentUser(messages) {
    this.view.clearMessagesWrapper();
    const messageWrapper = this.view.getMessagesWrapper();
    messages.forEach((message2) => {
      const messageModel = new MessageModel(message2, message2.id);
      messageWrapper.append(messageModel.getHTML());
    });
    messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }
  hasMessages(messages) {
    if (messages.length) {
      this.drawMessagesWithCurrentUser(messages);
    } else if (StoreModel.getState().selectedUser) {
      this.view.showEmptyDialogue();
    }
  }
  requestMessagesWithCurrentUser(userLogin2) {
    this.messageID = crypto.randomUUID();
    const message2 = {
      id: this.messageID,
      type: API_TYPES.MSG_FROM_USER,
      payload: {
        user: {
          login: userLogin2
        }
      }
    };
    this.eventMediator.notify(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      message2
    );
  }
  subscribeToEventMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.OPEN_USER_DIALOGUE, (data) => {
      if (isSavedUser(data)) {
        this.view.setCurrentUserInfo(data);
        this.view.showDialogue();
        this.requestMessagesWithCurrentUser(data.login);
      }
    });
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT_RESPONSE,
      () => this.view.hideDialogue()
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
      (data) => this.retrieveMessagesWithCurrentUser(data)
    );
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE, () => {
      const { selectedUser } = StoreModel.getState();
      if (selectedUser) {
        this.requestMessagesWithCurrentUser(selectedUser == null ? void 0 : selectedUser.login);
      }
    });
  }
  updateStatusCurrentUser(users) {
    const currentUser2 = users.find(
      (user2) => user2.login === this.view.getCurrentUserInfo().textContent
    );
    if (currentUser2) {
      this.view.setCurrentUserInfo(currentUser2);
    }
  }
  init() {
    this.subscribeToEventMediator();
    this.view.getHTML().append(this.sendMessageForm.getHTML());
    StoreModel.subscribe(ACTIONS.SET_ALL_USERS, () => {
      const { allUsers } = StoreModel.getState();
      this.updateStatusCurrentUser(allUsers);
    });
    StoreModel.subscribe(ACTIONS.SET_CURRENT_USER_DIALOGS, () => {
      const { currentUserDialogs, selectedUser } = StoreModel.getState();
      const currentDialog = currentUserDialogs.find(
        (dialog) => dialog.login === (selectedUser == null ? void 0 : selectedUser.login)
      );
      this.hasMessages((currentDialog == null ? void 0 : currentDialog.messages) || []);
    });
  }
}
class MainPageModel {
  constructor(parent, router) {
    __publicField(this, "router");
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "view");
    this.router = router;
    this.view = new MainPageView(parent);
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  show() {
    this.view.getHTML().classList.remove(MAIN_PAGE_STYLES.mainPage_hidden);
    return true;
  }
  hide() {
    this.view.getHTML().classList.add(MAIN_PAGE_STYLES.mainPage_hidden);
    return true;
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
    return true;
  }
  init() {
    this.hide();
    this.subscribeToMediator();
    this.view.getChatWrapper().append(new UserListModel().getHTML(), new UserDialogueModel().getHTML());
    return true;
  }
}
const aboutPage = "_aboutPage_1eieo_1";
const aboutPage_hidden = "_aboutPage_hidden_1eieo_7";
const aboutText = "_aboutText_1eieo_11";
const backButton = "_backButton_1eieo_18";
const ABOUT_PAGE_STYLES = {
  aboutPage,
  aboutPage_hidden,
  aboutText,
  backButton
};
let LoginPageView$1 = class LoginPageView {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "aboutText");
    __publicField(this, "backButton");
    __publicField(this, "page");
    this.parent = parent;
    this.aboutText = this.createAboutText();
    this.backButton = this.createBackButton();
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  getBackButton() {
    return this.backButton;
  }
  createAboutText() {
    this.aboutText = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [ABOUT_PAGE_STYLES.aboutText],
      innerContent: ABOUT_INFO_TEXT.text
    });
    return this.aboutText;
  }
  createBackButton() {
    this.backButton = new ButtonModel({
      text: ABOUT_INFO_TEXT.backButtonText,
      classes: [ABOUT_PAGE_STYLES.backButton]
    });
    return this.backButton;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [ABOUT_PAGE_STYLES.aboutPage]
    });
    this.page.append(this.aboutText, this.backButton.getHTML());
    this.parent.append(this.page);
    return this.page;
  }
};
class AboutPageModel {
  constructor(parent, router) {
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "router");
    __publicField(this, "view");
    this.router = router;
    this.view = new LoginPageView$1(parent);
    this.init();
  }
  getHTML() {
    return this.view.getHTML();
  }
  show() {
    this.view.getHTML().classList.remove(ABOUT_PAGE_STYLES.aboutPage_hidden);
    return true;
  }
  hide() {
    this.view.getHTML().classList.add(ABOUT_PAGE_STYLES.aboutPage_hidden);
    return true;
  }
  subscribeToMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.ABOUT_PAGE) {
        this.show();
      } else {
        this.hide();
      }
    });
    return true;
  }
  backButtonHandler() {
    if (StoreModel.getState().currentUser) {
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    } else {
      this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
    }
    this.hide();
    return true;
  }
  setBackButtonHandler() {
    const backButton2 = this.view.getBackButton().getHTML();
    backButton2.addEventListener(
      EVENT_NAMES.CLICK,
      this.backButtonHandler.bind(this)
    );
    return true;
  }
  init() {
    this.subscribeToMediator();
    this.setBackButtonHandler();
    return true;
  }
}
const loginPage = "_loginPage_uge6a_1";
const loginPage_hidden = "_loginPage_hidden_uge6a_6";
const authenticationWrapper = "_authenticationWrapper_uge6a_10";
const authenticationMessage = "_authenticationMessage_uge6a_26";
const LOGIN_PAGE_STYLES = {
  loginPage,
  loginPage_hidden,
  authenticationWrapper,
  authenticationMessage
};
class LoginPageView2 {
  constructor(parent) {
    __publicField(this, "parent");
    __publicField(this, "authenticationMessage");
    __publicField(this, "authenticationWrapper");
    __publicField(this, "page");
    this.parent = parent;
    this.authenticationMessage = this.createAuthenticationMessage();
    this.authenticationWrapper = this.createAuthenticationWrapper();
    this.page = this.createHTML();
  }
  getHTML() {
    return this.page;
  }
  getShowAuthenticationMessage() {
    return this.authenticationMessage;
  }
  getShowAuthenticationWrapper() {
    return this.authenticationWrapper;
  }
  createAuthenticationMessage() {
    this.authenticationMessage = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [LOGIN_PAGE_STYLES.authenticationMessage]
    });
    return this.authenticationMessage;
  }
  createAuthenticationWrapper() {
    this.authenticationWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOGIN_PAGE_STYLES.authenticationWrapper]
    });
    this.authenticationWrapper.append(this.authenticationMessage);
    return this.authenticationWrapper;
  }
  createHTML() {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOGIN_PAGE_STYLES.loginPage]
    });
    this.page.append(this.authenticationWrapper);
    this.parent.append(this.page);
    return this.page;
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
    const { for: htmlFor, text: text2 } = labelParams;
    this.label = createBaseElement({
      tag: TAG_NAMES.LABEL,
      attributes: {
        for: htmlFor
      },
      innerContent: text2 || ""
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
    return true;
  }
  setInputHandler() {
    const input = this.view.getInput().getHTML();
    input.addEventListener(EVENT_NAMES.INPUT, () => {
      this.inputHandler();
    });
    return true;
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
    const text2 = "Login";
    this.submitFormButton = new ButtonModel({
      text: text2,
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
        const inputField2 = new InputFieldModel(
          inputFieldParams,
          currentValidateParams
        );
        this.inputFields.push(inputField2);
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
    this.inputFields.forEach((inputField2) => {
      const inputFieldElement = inputField2.getView().getHTML();
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
const isKeyOfUser = (context, key) => Object.hasOwnProperty.call(context, key);
class LoginFormModel {
  constructor() {
    __publicField(this, "view", new LoginFormView());
    __publicField(this, "messageID", "");
    __publicField(this, "userData", {
      login: "",
      password: "",
      isLogined: ""
    });
    __publicField(this, "inputFields", []);
    __publicField(this, "isValidInputFields", {});
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
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
  setInputFieldHandlers(inputField2) {
    const inputHTML = inputField2.getView().getInput().getHTML();
    this.isValidInputFields[inputHTML.id] = false;
    inputHTML.addEventListener(EVENT_NAMES.INPUT, () => {
      this.isValidInputFields[inputHTML.id] = inputField2.getIsValid();
      this.switchSubmitFormButtonAccess();
    });
    return true;
  }
  switchSubmitFormButtonAccess() {
    if (Object.values(this.isValidInputFields).every((value) => value)) {
      this.view.getSubmitFormButton().setEnabled();
    } else {
      this.view.getSubmitFormButton().setDisabled();
    }
    return true;
  }
  getFormData() {
    this.inputFields.forEach((inputField2) => {
      const input = inputField2.getView().getInput();
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
    this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_REQUEST, userData);
    return true;
  }
  setSubmitFormButtonHandler() {
    const submitFormButton2 = this.view.getSubmitFormButton().getHTML();
    submitFormButton2.addEventListener(
      EVENT_NAMES.CLICK,
      this.submitFormButtonHandler.bind(this)
    );
    return true;
  }
  setPreventDefaultToForm() {
    this.getHTML().addEventListener(EVENT_NAMES.SUBMIT, (event) => {
      event.preventDefault();
    });
    return true;
  }
  init() {
    this.inputFields = this.view.getInputFields();
    this.inputFields.forEach(
      (inputField2) => this.setInputFieldHandlers(inputField2)
    );
    this.setSubmitFormButtonHandler();
    this.setPreventDefaultToForm();
    return true;
  }
}
const STORE_KEYS = {
  SS_NAME: "b3413f43-40a4-440c-80c0-6aa64b9b1240",
  CURRENT_USER: "currentUser"
};
class LoginPageModel {
  constructor(parent, router, storage) {
    __publicField(this, "loginPageView");
    __publicField(this, "router");
    __publicField(this, "storage");
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
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
    return true;
  }
  hide() {
    this.loginPageView.getHTML().classList.add(LOGIN_PAGE_STYLES.loginPage_hidden);
    return true;
  }
  checkAuthorizedUser() {
    const currentUser2 = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (currentUser2 && isUser(currentUser2)) {
      const userData = {
        id: null,
        type: API_TYPES.USER_LOGIN,
        payload: {
          user: currentUser2
        }
      };
      this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_REQUEST, userData);
      return currentUser2;
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
    } else {
      this.hide();
    }
    return true;
  }
  handleSuccessMessage() {
    const userData = this.loginFormModel.getUserData();
    StoreModel.dispatch(setCurrentUser(userData));
    this.storage.add(STORE_KEYS.CURRENT_USER, JSON.stringify(userData));
    this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    this.hide();
    return true;
  }
  showErrorMessage(error) {
    const authenticationWrapper2 = this.loginPageView.getShowAuthenticationWrapper();
    this.loginPageView.getShowAuthenticationMessage().textContent = error;
    authenticationWrapper2.animate(AUTHENTICATION_ANIMATE_DETAILS.params, {
      duration: AUTHENTICATION_ANIMATE_DETAILS.duration,
      easing: AUTHENTICATION_ANIMATE_DETAILS.easing
    });
    return true;
  }
  handleErrorMessage(checkedMessage) {
    var _a, _b;
    if ((_a = checkedMessage == null ? void 0 : checkedMessage.payload) == null ? void 0 : _a.error) {
      this.showErrorMessage((_b = checkedMessage == null ? void 0 : checkedMessage.payload) == null ? void 0 : _b.error);
    }
    return true;
  }
  handleMessageFromServer(checkedMessage) {
    const savedUser = this.storage.get(STORE_KEYS.CURRENT_USER);
    if (savedUser && isUser(savedUser)) {
      StoreModel.dispatch(setCurrentUser(savedUser));
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
      this.hide();
      return true;
    }
    if ((checkedMessage == null ? void 0 : checkedMessage.type) !== API_TYPES.ERROR) {
      this.handleSuccessMessage();
    } else if ((checkedMessage == null ? void 0 : checkedMessage.id) === this.loginFormModel.getMessageID()) {
      this.handleErrorMessage(checkedMessage);
    }
    return true;
  }
  subscribeToMediator() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.switchPage(String(params));
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_CONNECT, () => {
      this.checkAuthorizedUser();
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.LOG_IN_RESPONSE, (message2) => {
      const checkedMessage = isFromServerMessage(message2);
      if (checkedMessage) {
        this.handleMessageFromServer(checkedMessage);
      }
    });
    return true;
  }
  initPage() {
    this.subscribeToMediator();
    this.hide();
    const loginFormHTML = this.loginFormModel.getHTML();
    this.getHTML().append(loginFormHTML);
    return true;
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
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    document.addEventListener(EVENT_NAMES.DOM_CONTENT_LOADED, () => {
      const currentPath = window.location.pathname.split(ROUTER_DETAILS.DEFAULT_SEGMENT).slice(
        ROUTER_DETAILS.PATH_SEGMENTS_TO_KEEP + ROUTER_DETAILS.NEXT_SEGMENT
      ).join(ROUTER_DETAILS.DEFAULT_SEGMENT);
      this.handleRequest(currentPath);
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
const siteWrapper = "_siteWrapper_1h3d3_1";
const APP_STYLES = {
  siteWrapper
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
      tag: TAG_NAMES.DIV,
      cssClasses: [APP_STYLES.siteWrapper]
    });
    return this.pagesContainer;
  }
}
const APP_NAME = "Fun Chat";
const LOGOUT_BUTTON_TEXT = "Logout";
const ABOUT_BUTTON_TEXT = "About";
const header = "_header_uazn4_1";
const nameApp = "_nameApp_uazn4_12";
const userLogin = "_userLogin_uazn4_20";
const logoutButton = "_logoutButton_uazn4_28";
const aboutButton = "_aboutButton_uazn4_29";
const HEADER_STYLES = {
  header,
  nameApp,
  userLogin,
  logoutButton,
  aboutButton
};
class HeaderView {
  constructor() {
    __publicField(this, "nameApp");
    __publicField(this, "userLogin");
    __publicField(this, "aboutButton");
    __publicField(this, "logoutButton");
    __publicField(this, "header");
    this.nameApp = this.createNameApp();
    this.userLogin = this.createUserLogin();
    this.aboutButton = this.createAboutButton();
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
  getAboutButton() {
    return this.aboutButton;
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
  createAboutButton() {
    this.aboutButton = new ButtonModel({
      classes: [HEADER_STYLES.aboutButton],
      text: ABOUT_BUTTON_TEXT
    });
    return this.aboutButton;
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
      this.aboutButton.getHTML(),
      this.logoutButton.getHTML()
    );
    return this.header;
  }
}
class HeaderModel {
  constructor(router, storage) {
    __publicField(this, "view", new HeaderView());
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
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
    const { currentUser: currentUser2 } = StoreModel.getState();
    if (!currentUser2) {
      return false;
    }
    const logOutData = {
      id: null,
      type: API_TYPES.USER_LOGOUT,
      payload: {
        user: {
          login: currentUser2.login,
          password: currentUser2.password
        }
      }
    };
    this.eventMediator.notify(MEDIATOR_EVENTS.LOG_OUT_REQUEST, logOutData);
    this.storage.remove(STORE_KEYS.CURRENT_USER);
    StoreModel.dispatch(setCurrentUser(null));
    this.view.getLogoutButton().setDisabled();
    this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
    return true;
  }
  setLogoutButtonHandler() {
    const logoutButton2 = this.view.getLogoutButton().getHTML();
    const aboutButton2 = this.view.getAboutButton().getHTML();
    logoutButton2.addEventListener(
      EVENT_NAMES.CLICK,
      this.logoutButtonHandler.bind(this)
    );
    aboutButton2.addEventListener(
      EVENT_NAMES.CLICK,
      this.router.navigateTo.bind(this.router, PAGES_IDS.ABOUT_PAGE)
    );
    return true;
  }
  changeCurrentUserLogin() {
    var _a;
    const userLogin2 = this.view.getUserLogin();
    userLogin2.textContent = ((_a = StoreModel.getState().currentUser) == null ? void 0 : _a.login) || "";
    this.view.getLogoutButton().setEnabled();
    return true;
  }
  init() {
    this.setLogoutButtonHandler();
    StoreModel.subscribe(
      ACTIONS.SET_CURRENT_USER,
      this.changeCurrentUserLogin.bind(this)
    );
    return true;
  }
}
class ClientApiModel {
  constructor(webSocket, isOpen) {
    __publicField(this, "webSocket");
    __publicField(this, "isOpen");
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.unsubscribeToEventMediator();
    this.subscribeToEventMediator();
  }
  isWorks() {
    return this.isOpen;
  }
  sendMessage(message2) {
    this.webSocket.send(JSON.stringify(message2));
    return true;
  }
  unsubscribeToEventMediator() {
    const createNewUserListener = (message2) => {
      this.sendMessage(message2);
    };
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.LOG_IN_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.LOG_OUT_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST,
      createNewUserListener
    );
    this.eventMediator.unsubscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST,
      createNewUserListener
    );
    return true;
  }
  subscribeToEventMediator() {
    const createNewUserListener = (message2) => {
      this.sendMessage(message2);
    };
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_IN_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.LOG_OUT_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.SEND_MESSAGE_REQUEST,
      createNewUserListener
    );
    this.eventMediator.subscribe(
      MEDIATOR_EVENTS.DELETE_MESSAGE_REQUEST,
      createNewUserListener
    );
    return true;
  }
}
class ServerApiModel {
  constructor(webSocket, isOpen) {
    __publicField(this, "webSocket");
    __publicField(this, "isOpen");
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    this.webSocket = webSocket;
    this.isOpen = isOpen;
    this.getMessage();
  }
  isWorks() {
    return this.isOpen;
  }
  getMessage() {
    this.webSocket.addEventListener(EVENT_NAMES.MESSAGE, ({ data }) => {
      const message2 = JSON.parse(String(data));
      const checkedMessage = isFromServerMessage(message2);
      if (checkedMessage) {
        this.handleAuthentication(checkedMessage);
      }
    });
    return true;
  }
  handleAuthentication(message2) {
    switch (message2.type) {
      case API_TYPES.USER_LOGIN: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_RESPONSE, message2);
        return true;
      }
      case API_TYPES.ERROR: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_IN_RESPONSE, message2);
        return false;
      }
      case API_TYPES.USER_LOGOUT: {
        this.eventMediator.notify(MEDIATOR_EVENTS.LOG_OUT_RESPONSE, message2);
        return true;
      }
      default: {
        this.handleUserState(message2);
        return null;
      }
    }
  }
  handleUserState(message2) {
    switch (message2.type) {
      case API_TYPES.USER_ACTIVE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_ALL_AUTHENTICATED_USERS_RESPONSE,
          message2
        );
        return true;
      }
      case API_TYPES.USER_INACTIVE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_ALL_UNAUTHENTICATED_USERS_RESPONSE,
          message2
        );
        return true;
      }
      default: {
        this.handlerUserExternal(message2);
        return null;
      }
    }
  }
  handlerUserExternal(message2) {
    switch (message2.type) {
      case API_TYPES.USER_EXTERNAL_LOGIN: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.EXTERNAL_LOGIN_RESPONSE,
          message2
        );
        return true;
      }
      case API_TYPES.USER_EXTERNAL_LOGOUT: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.EXTERNAL_LOGOUT_RESPONSE,
          message2
        );
        return true;
      }
      default: {
        this.handlerHistoryMessages(message2);
        return null;
      }
    }
  }
  handlerHistoryMessages(message2) {
    switch (message2.type) {
      case API_TYPES.MSG_FROM_USER: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.GET_HISTORY_MESSAGES_RESPONSE,
          message2
        );
        return true;
      }
      default: {
        this.handlerMessages(message2);
        return null;
      }
    }
  }
  handlerMessages(message2) {
    switch (message2.type) {
      case API_TYPES.MSG_SEND: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.SEND_MESSAGE_RESPONSE,
          message2
        );
        return true;
      }
      case API_TYPES.MSG_DELIVER: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.DELIVERED_MESSAGE_RESPONSE,
          message2
        );
        return true;
      }
      case API_TYPES.MSG_DELETE: {
        this.eventMediator.notify(
          MEDIATOR_EVENTS.DELETE_MESSAGE_RESPONSE,
          message2
        );
        return true;
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
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "isOpen", false);
    this.connectWebSocket();
  }
  isWorks() {
    return this.isOpen;
  }
  connectWebSocket() {
    let reconnectTimeout;
    this.webSocket = new WebSocket(API_URL);
    const reconnect = () => {
      reconnectTimeout = setTimeout(() => {
        this.connectWebSocket();
      }, CHECK_INTERVAL);
    };
    this.webSocket.addEventListener(EVENT_NAMES.OPEN, () => {
      this.isOpen = true;
      this.init();
      clearTimeout(reconnectTimeout);
      this.eventMediator.notify(MEDIATOR_EVENTS.SOCKET_CONNECT, null);
    });
    this.webSocket.addEventListener(EVENT_NAMES.CLOSE, () => {
      this.isOpen = false;
      this.eventMediator.notify(MEDIATOR_EVENTS.SOCKET_DISCONNECT, null);
      reconnect();
    });
    return this.isOpen;
  }
  init() {
    const clientApi = new ClientApiModel(this.webSocket, this.isOpen);
    const serverApi = new ServerApiModel(this.webSocket, this.isOpen);
    clientApi.isWorks();
    serverApi.isWorks();
    return this.isOpen;
  }
}
const isSessionStorageData = (data) => {
  if (typeof data === "object" && data !== null) {
    return true;
  }
  return false;
};
class SessionStorageModel {
  constructor() {
    __publicField(this, "storage");
    this.storage = this.init();
  }
  get(key) {
    if (key in this.storage) {
      const data = this.storage[key];
      const result = JSON.parse(data);
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
      const parsedData = JSON.parse(storedData);
      if (isSessionStorageData(parsedData)) {
        this.storage = parsedData;
      }
    } else {
      sessionStorage.setItem(STORE_KEYS.SS_NAME, "{}");
      this.storage = this.init();
    }
    return this.storage;
  }
}
const LINK_ATTRIBUTES = {
  TARGET_BLANK: "_blank",
  RS_HREF: "https://rs.school/",
  GITHUB_HREF: "https://github.com/kleostro"
};
const FOOTER_SVG_DETAILS = {
  SVG_URL: "http://www.w3.org/2000/svg",
  RS_ID: "rsLogo",
  GITHUB_ID: "githubLogo"
};
const FOOTER_YEAR = "2024";
const footer = "_footer_u9db1_1";
const rsLink = "_rsLink_u9db1_13";
const githubLink = "_githubLink_u9db1_14";
const appYear = "_appYear_u9db1_59";
const FOOTER_STYLES = {
  footer,
  rsLink,
  githubLink,
  appYear
};
class FooterView {
  constructor() {
    __publicField(this, "appYear");
    __publicField(this, "githubLogo");
    __publicField(this, "githubLink");
    __publicField(this, "rsLogo");
    __publicField(this, "rsLink");
    __publicField(this, "footer");
    this.appYear = this.createAppYear();
    this.githubLogo = this.createGithubLogo();
    this.githubLink = this.createGithubLink();
    this.rsLogo = this.createRSLogo();
    this.rsLink = this.createRSLink();
    this.footer = this.createHTML();
  }
  getHTML() {
    return this.footer;
  }
  createAppYear() {
    this.appYear = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [FOOTER_STYLES.appYear],
      innerContent: FOOTER_YEAR
    });
    return this.appYear;
  }
  createGithubLogo() {
    this.githubLogo = document.createElementNS(
      FOOTER_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    this.githubLogo.append(createSVGUse(FOOTER_SVG_DETAILS.GITHUB_ID));
    return this.githubLogo;
  }
  createGithubLink() {
    this.githubLink = createBaseElement({
      tag: TAG_NAMES.A,
      cssClasses: [FOOTER_STYLES.githubLink],
      attributes: {
        href: LINK_ATTRIBUTES.GITHUB_HREF,
        target: LINK_ATTRIBUTES.TARGET_BLANK
      }
    });
    this.githubLink.append(this.githubLogo);
    return this.githubLink;
  }
  createRSLogo() {
    this.rsLogo = document.createElementNS(
      FOOTER_SVG_DETAILS.SVG_URL,
      TAG_NAMES.SVG
    );
    this.rsLogo.append(createSVGUse(FOOTER_SVG_DETAILS.RS_ID));
    return this.rsLogo;
  }
  createRSLink() {
    this.rsLink = createBaseElement({
      tag: TAG_NAMES.A,
      cssClasses: [FOOTER_STYLES.rsLink],
      attributes: {
        href: LINK_ATTRIBUTES.RS_HREF,
        target: LINK_ATTRIBUTES.TARGET_BLANK
      }
    });
    this.rsLink.append(this.rsLogo);
    return this.rsLink;
  }
  createHTML() {
    this.footer = createBaseElement({
      tag: TAG_NAMES.FOOTER,
      cssClasses: [FOOTER_STYLES.footer]
    });
    this.footer.append(this.rsLink, this.githubLink, this.appYear);
    return this.footer;
  }
}
class FooterModel {
  constructor() {
    __publicField(this, "view", new FooterView());
  }
  getHTML() {
    return this.view.getHTML();
  }
}
const modal = "_modal_vwm8q_1";
const modal_hidden = "_modal_hidden_vwm8q_11";
const modalOverlay = "_modalOverlay_vwm8q_16";
const modalOverlay_hidden = "_modalOverlay_hidden_vwm8q_27";
const modalContent = "_modalContent_vwm8q_32";
const modalContent_hidden = "_modalContent_hidden_vwm8q_48";
const MODAL_STYLES = {
  modal,
  modal_hidden,
  modalOverlay,
  modalOverlay_hidden,
  modalContent,
  modalContent_hidden
};
class ModalView {
  constructor() {
    __publicField(this, "modalContent");
    __publicField(this, "modalOverlay");
    __publicField(this, "modal");
    this.modalContent = this.createModalContent();
    this.modalOverlay = this.createModalOverlay();
    this.modal = this.createHTML();
  }
  getHTML() {
    return this.modal;
  }
  getModalOverlay() {
    return this.modalOverlay;
  }
  getModalContent() {
    return this.modalContent;
  }
  createModalContent() {
    this.modalContent = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modalContent]
    });
    return this.modalContent;
  }
  createModalOverlay() {
    this.modalOverlay = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modalOverlay]
    });
    return this.modalOverlay;
  }
  createHTML() {
    this.modal = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MODAL_STYLES.modal, MODAL_STYLES.modal_hidden]
    });
    this.modalOverlay.append(this.modalContent);
    this.modal.append(this.modalOverlay);
    return this.modal;
  }
}
class ModalModel {
  constructor() {
    __publicField(this, "view", new ModalView());
  }
  getHTML() {
    return this.view.getHTML();
  }
  setModalText(text2) {
    this.view.getModalContent().textContent = text2;
  }
  show() {
    const modal2 = this.getHTML();
    const modalOverlay2 = this.view.getModalOverlay();
    const modalContent2 = this.view.getModalContent();
    modal2.classList.remove(MODAL_STYLES.modal_hidden);
    modalOverlay2.classList.remove(MODAL_STYLES.modalOverlay_hidden);
    modalContent2.classList.remove(MODAL_STYLES.modalContent_hidden);
    document.body.classList.add("stop-scroll");
  }
  hide() {
    const modal2 = this.getHTML();
    const modalOverlay2 = this.view.getModalOverlay();
    const modalContent2 = this.view.getModalContent();
    modal2.classList.add(MODAL_STYLES.modal_hidden);
    modalOverlay2.classList.add(MODAL_STYLES.modalOverlay_hidden);
    modalContent2.classList.add(MODAL_STYLES.modalContent_hidden);
    document.body.classList.remove("stop-scroll");
  }
}
const SOCKET_MESSAGE = "Connecting to the server...";
class AppModel {
  constructor() {
    __publicField(this, "appView", new AppView());
    __publicField(this, "storage", new SessionStorageModel());
    __publicField(this, "eventMediator", EventMediatorModel.getInstance());
    __publicField(this, "serverApi", new SocketModel());
    __publicField(this, "router", new RouterModel());
    __publicField(this, "modal", new ModalModel());
    this.router.setPages(this.initPages());
    this.subscribeToEvents();
    this.serverApi.isWorks();
  }
  getHTML() {
    return this.appView.getHTML();
  }
  initPages() {
    const root = this.getHTML();
    root.prepend(new HeaderModel(this.router, this.storage).getHTML());
    const loginPage2 = new LoginPageModel(root, this.router, this.storage);
    const mainPage2 = new MainPageModel(root, this.router);
    const aboutPage2 = new AboutPageModel(root, this.router);
    const pages = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: loginPage2,
        [PAGES_IDS.LOGIN_PAGE]: loginPage2,
        [PAGES_IDS.MAIN_PAGE]: mainPage2,
        [PAGES_IDS.ABOUT_PAGE]: aboutPage2
      })
    );
    root.append(new FooterModel().getHTML(), this.modal.getHTML());
    return pages;
  }
  subscribeToEvents() {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_CONNECT, () => {
      this.modal.hide();
    });
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_DISCONNECT, () => {
      this.modal.show();
      this.modal.setModalText(SOCKET_MESSAGE);
    });
  }
}
const index = "";
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-d387a1f1.js.map
