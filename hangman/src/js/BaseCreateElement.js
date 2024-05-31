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

export default BaseCreateElement;
