export const safeQuerySelector = <E extends HTMLElement>(selector: string): E => {
  const elem = document.querySelector<E>(selector);

  if (!elem) {
    throw new Error(`Error: element with selector ${selector} was not found`);
  }

  return elem;
};

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  cssClasses: string[] = [],
  attributes?: Record<string, string>,
  innerContent?: string,
): HTMLElementTagNameMap[T] => {
  const elem = document.createElement(tag);

  elem.classList.add(...cssClasses);

  if (attributes) {
    Object.entries(attributes).forEach(([attrName, attrValue]) => {
      elem.setAttribute(attrName, attrValue);
    });
  }

  if (innerContent) {
    elem.innerHTML = innerContent;
  }

  return elem;
};
