interface CreateBaseElement<T> {
  tag: T;
  cssClasses?: string[];
  attributes?: Record<string, string>;
  innerContent?: string;
}

const createBaseElement = <T extends keyof HTMLElementTagNameMap>({
  tag,
  cssClasses = [],
  attributes = {},
  innerContent = '',
}: CreateBaseElement<T>): HTMLElementTagNameMap[T] => {
  const elem = document.createElement(tag);

  elem.classList.add(...cssClasses);

  Object.entries(attributes).forEach(([attrName, attrValue]) => {
    elem.setAttribute(attrName, attrValue);
  });

  elem.innerHTML = innerContent;

  return elem;
};

export default createBaseElement;
