const isHtmlElement = (target: EventTarget | null): target is HTMLElement =>
  target instanceof HTMLElement;

export default isHtmlElement;
