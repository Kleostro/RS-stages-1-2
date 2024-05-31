import { TAG_NAMES } from '../shared/types/enums.ts';
import createBaseElement from './createBaseElement.ts';

const createListTitle = (title: string): HTMLSpanElement => {
  const span = createBaseElement({
    tag: TAG_NAMES.span,
    innerContent: title,
  });
  return span;
};

export default createListTitle;
