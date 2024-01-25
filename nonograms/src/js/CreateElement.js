/**
 * Creates a DOM element with the given properties and adds it to the parent element.
 * @param {Object} options - Options for creating the element.
 * @param {string} options.tag - The tag of the element (default is 'div').
 * @param {string[]} options.classes - The element's classes (default []).
 * @param {Object} options.attrs - Attributes of the element as an object (defaults to {}).
 * @param {Element} options.parent - The parent element to which the created element will be added.
 * @param {string} options.textContent - The text content of the element.
 * @returns {Element} - The DOM element created.
 */
function CreateElement({
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

  const elem = document.createElement(this.tag);
  if (this.classes) {
    elem.classList.add(...this.classes);
  }

  if (this.attrNames) {
    this.attrNames.forEach((attrName, index) => {
      elem.setAttribute(attrName, this.attrValues[index]);
    });
  }

  if (this.parent) {
    this.parent.append(elem);
  }

  if (this.textContent) {
    elem.textContent = this.textContent;
  }

  return elem;
}

export default CreateElement;
