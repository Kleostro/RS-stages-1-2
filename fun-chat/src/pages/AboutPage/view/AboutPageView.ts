import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import ABOUT_PAGE_STYLES from './aboutPage.module.scss';

class LoginPageView {
  private parent: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [ABOUT_PAGE_STYLES.aboutPage],
    });

    this.parent.append(this.page);

    return this.page;
  }
}
export default LoginPageView;
