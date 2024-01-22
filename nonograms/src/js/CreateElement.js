/**
 * Create element {@link CreateElement}.
 * @param {Object} options - Parameters for creating an element.
 * @param {string} [options.tag='div'] - Element tag.
 * @param {string[]} [options.classes=[]] - Tag classes.
 * @param {Object} [options.attrs={}] - Element attributes.
 * @param {Element} options.parent - Parent element.
 * @param {string} options.textContent - Text content of the element.
*/
class CreateElement {
  constructor({
    tag = 'div',
    classes = [],
    attrs = {},
    parent,
    textContent,
  }) {
    this.tag = tag;
    this.classes = classes;
    this.attrNames = Object.keys(attrs);
    this.attrValues = Object.values(attrs);
    this.parent = parent;
    this.textContent = textContent;
    this.element = this.createElement();
  }

  /**
   * Creates a DOM element with the given properties and appends it to the parent element.
   * @returns {HTMLElement} - DOM element.
  */
  createElement() {
    const elem = document.createElement(this.tag);
    if (this.classes) elem.classList.add(...this.classes);

    if (this.attrNames) {
      this.attrNames.forEach((attrName, index) => {
        elem.setAttribute(attrName, this.attrValues[index]);
      });
    }

    if (this.textContent) elem.textContent = this.textContent;
    if (this.parent) this.parent.append(elem);

    return elem;
  }

  /**
   * Adds an event listener to the element.
   * @param {string} event - Event type.
   * @param {Function} handler - Event handler function.
   */
  addListener(event, handler) {
    this.element.addEventListener(event, handler);
  }

  /**
   * Removes an event listener to the element.
   * @param {string} event - Event type.
   * @param {Function} handler - Event handler function.
  */
  removeListener(event, handler) {
    this.element.removeEventListener(event, handler);
  }
}

export default CreateElement;
