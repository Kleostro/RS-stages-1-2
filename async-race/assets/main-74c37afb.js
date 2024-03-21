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
const PAGES_IDS = {
  DEFAULT_PAGE: "",
  GARAGE_PAGE: "garage",
  WINNERS_PAGE: "winners"
};
class RouterModel {
  constructor(pages) {
    __publicField(this, "pages");
    __publicField(this, "currentPage", null);
    this.pages = pages;
    window.addEventListener(EVENT_NAMES.POPSTATE, () => {
      this.handleRequest(
        window.location.pathname.slice(1) + "kleostro-JSFE2023Q4/"
      );
    });
  }
  handleRequest(path) {
    var _a;
    if (!(path in this.pages) || path === PAGES_IDS.DEFAULT_PAGE) {
      window.location.pathname = PAGES_IDS.GARAGE_PAGE;
    }
    (_a = this.currentPage) == null ? void 0 : _a.hide();
    this.currentPage = this.pages[path];
    this.currentPage.show();
  }
  navigateTo(route) {
    this.handleRequest(route);
    window.history.pushState(route, "", route);
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
const GARAGE_PAGE_STYLES = {
  "garage-page": "_garage-page_1tob7_1",
  "garage-page--hidden": "_garage-page--hidden_1tob7_5"
};
class GaragePageView {
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
      cssClasses: [GARAGE_PAGE_STYLES["garage-page"]]
    });
    const h1 = createBaseElement({
      tag: TAG_NAMES.H1,
      innerContent: "Garage"
    });
    h1.style.color = "white";
    this.page.append(h1);
    this.parent.append(this.page);
    return this.page;
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
    this.hide();
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
class AppModel {
  constructor() {
    __publicField(this, "appView");
    __publicField(this, "parent");
    __publicField(this, "router");
    __publicField(this, "btn", null);
    __publicField(this, "btn2", null);
    this.appView = new AppView();
    this.parent = this.appView.getHTML();
    const pages = {
      [PAGES_IDS.GARAGE_PAGE]: new GaragePageModel(this.parent),
      [PAGES_IDS.WINNERS_PAGE]: new WinnersPageModel(this.parent)
    };
    this.router = new RouterModel(pages);
    this.router.navigateTo(
      window.location.pathname.slice(1) + "kleostro-JSFE2023Q4/"
    );
  }
  getHTML() {
    this.btn = createBaseElement({
      tag: "button",
      innerContent: "winners"
    });
    this.btn2 = createBaseElement({
      tag: "button",
      innerContent: "garage"
    });
    this.btn.addEventListener(
      "click",
      this.router.navigateTo.bind(this.router, PAGES_IDS.WINNERS_PAGE)
    );
    this.btn2.addEventListener(
      "click",
      this.router.navigateTo.bind(this.router, PAGES_IDS.GARAGE_PAGE)
    );
    this.parent.append(this.btn, this.btn2);
    return this.parent;
  }
}
const index = "";
const myApp = new AppModel();
document.body.append(myApp.getHTML());
//# sourceMappingURL=main-74c37afb.js.map
