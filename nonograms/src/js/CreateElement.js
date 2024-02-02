/**
 * Creates a DOM element with the given properties.
 * @param {Object} options - Options for creating the element.
 * @param {string} options.tag - The tag of the element (default is 'div').
 * @param {string[]} options.classes - The element's classes (default []).
 * @param {Object} options.attrs - Attributes of the element as an object (defaults to {}).
 * @param {string} options.textContent - The text content of the element.
 * @returns {Element} - The DOM element created.
 */
function CreateElement({ tag = 'div', classes = [], attrs = {}, textContent }) {
  this.tag = tag;
  this.classes = classes;
  this.attrs = attrs;
  this.textContent = textContent;

  const elem = document.createElement(this.tag);
  if (this.classes) {
    elem.classList.add(...this.classes);
  }

  if (this.attrs) {
    Object.entries(this.attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });
  }

  if (this.textContent) {
    elem.textContent = this.textContent;
  }

  return elem;
}

export default CreateElement;
