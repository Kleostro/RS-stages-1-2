import { ABOUT_INFO_TEXT } from '../../types/enums.ts';
import ButtonModel from '../../../shared/Button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import ABOUT_PAGE_STYLES from './aboutPage.module.scss';

class LoginPageView {
  private parent: HTMLDivElement;

  private aboutText: HTMLSpanElement;

  private backButton: ButtonModel;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.aboutText = this.createAboutText();
    this.backButton = this.createBackButton();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getBackButton(): ButtonModel {
    return this.backButton;
  }

  public show(): boolean {
    this.page.classList.remove(ABOUT_PAGE_STYLES.aboutPage_hidden);
    return true;
  }

  public hide(): boolean {
    this.page.classList.add(ABOUT_PAGE_STYLES.aboutPage_hidden);
    return true;
  }

  private createAboutText(): HTMLSpanElement {
    this.aboutText = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [ABOUT_PAGE_STYLES.aboutText],
      innerContent: ABOUT_INFO_TEXT.text,
    });

    return this.aboutText;
  }

  private createBackButton(): ButtonModel {
    this.backButton = new ButtonModel({
      text: ABOUT_INFO_TEXT.backButtonText,
      classes: [ABOUT_PAGE_STYLES.backButton],
    });

    return this.backButton;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [ABOUT_PAGE_STYLES.aboutPage],
    });

    this.page.append(this.aboutText, this.backButton.getHTML());
    this.parent.append(this.page);

    return this.page;
  }
}
export default LoginPageView;
