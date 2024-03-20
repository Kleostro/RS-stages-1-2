import TAG_NAMES from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import APP_STYLES from './app.module.scss';

class AppView {
  private pagesContainer: HTMLDivElement;

  constructor() {
    this.pagesContainer = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.pagesContainer;
  }

  private createHTML(): HTMLDivElement {
    this.pagesContainer = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [APP_STYLES['site-wrapper']],
    });

    return this.pagesContainer;
  }
}

export default AppView;
