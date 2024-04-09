import type PageInterface from '../../types/interfaces.ts';
import MainPageView from '../view/MainPageView.ts';
import MAIN_PAGE_STYLES from '../view/mainPage.module.scss';

class MainPageModel implements PageInterface {
  private mainPageView: MainPageView;

  constructor(parent: HTMLDivElement) {
    this.mainPageView = new MainPageView(parent);
  }

  public getHTML(): HTMLDivElement {
    return this.mainPageView.getHTML();
  }

  private visible(): void {
    this.mainPageView
      .getHTML()
      .classList.remove(MAIN_PAGE_STYLES.mainPage_hidden);
  }

  private hidden(): void {
    this.mainPageView.getHTML().classList.add(MAIN_PAGE_STYLES.mainPage_hidden);
  }
}

export default MainPageModel;
