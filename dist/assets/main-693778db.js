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
class BaseCreateElement {
  constructor(tagname, classNames, attrs) {
    this.tag = tagname;
    this.class = classNames;
    if (attrs) {
      this.attrName = Object.keys(attrs);
      this.attrValue = Object.values(attrs);
    }
    this.elem = this.createElement();
  }
  createElement() {
    const elem = document.createElement(this.tag);
    elem.classList.add(...this.class);
    if (this.attrName && this.attrValue) {
      for (let i = 0; i < this.attrName.length; i += 1) {
        elem.setAttribute(this.attrName[i], this.attrValue[i]);
      }
    }
    return elem;
  }
}
const logoSrc = "" + new URL("logo-de83227a.svg", import.meta.url).href;
const logo$1 = "";
const logo = new BaseCreateElement("a", ["logo"], { href: "./" });
const logoElem = logo.elem;
const logoImg = new BaseCreateElement("img", ["logo__img"], { src: logoSrc, alt: "logo" });
const logoImgElem = logoImg.elem;
logoElem.append(logoImgElem);
const title$1 = "";
const title = new BaseCreateElement("h1", ["header__title"]);
const titleElem = title.elem;
titleElem.textContent = "Hangman";
const resultGame = "";
const resultBtn = new BaseCreateElement("button", ["btn-reset", "result"]);
const resultBtnElem = resultBtn.elem;
resultBtnElem.textContent = "Results";
const header = new BaseCreateElement("header", ["header"]);
const headerElem = header.elem;
const headerContainer = new BaseCreateElement("div", ["container", "header__container"]);
const headerContainerElem = headerContainer.elem;
headerContainerElem.append(logoElem, titleElem, resultBtnElem);
headerElem.append(headerContainerElem);
const gallowsSrc = "" + new URL("gallows-e5693fb2.png", import.meta.url).href;
const gallows$1 = "";
const gallows = new BaseCreateElement("div", ["gallows"]);
const gallowsElem = gallows.elem;
const gallowsImg = new BaseCreateElement("img", ["gallows__img"], { src: gallowsSrc, alt: "gallows" });
const gallowsImgElem = gallowsImg.elem;
gallowsElem.append(gallowsImgElem);
const game$1 = "";
const game = new BaseCreateElement("section", ["game"]);
const gameElem = game.elem;
gameElem.append(gallowsElem);
const app = document.createElement("div");
app.classList.add("site-container");
app.append(headerElem, gameElem);
document.body.append(app);
//# sourceMappingURL=main-693778db.js.map
