import { TAG_NAMES } from '../../types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import LOADER_STYLES from './loaderView.module.scss';

class LoaderView {
  private loader: HTMLDivElement;

  constructor() {
    this.loader = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.loader;
  }

  private createHTML(): HTMLDivElement {
    this.loader = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [LOADER_STYLES.loader],
    });

    return this.loader;
  }
}

export default LoaderView;
