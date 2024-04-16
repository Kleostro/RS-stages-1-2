import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import MAIN_PAGE_STYLES from './mainPage.module.scss';

class MainPageView {
  private parent: HTMLDivElement;

  private chatWrapper: HTMLDivElement;

  private page: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;
    this.chatWrapper = this.createChatWrapper();
    this.page = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.page;
  }

  public getChatWrapper(): HTMLDivElement {
    return this.chatWrapper;
  }

  private createChatWrapper(): HTMLDivElement {
    this.chatWrapper = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MAIN_PAGE_STYLES.chatWrapper],
    });

    return this.chatWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.page = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [MAIN_PAGE_STYLES.mainPage],
    });

    this.page.append(this.chatWrapper);
    this.parent.append(this.page);

    return this.page;
  }
}
export default MainPageView;
