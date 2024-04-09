import type PageInterface from '../../types/interfaces.ts';
import AboutPageView from '../view/AboutPageView.ts';
import ABOUT_PAGE_STYLES from '../view/aboutPage.module.scss';

class AboutPageModel implements PageInterface {
  private aboutPageView: AboutPageView;

  constructor(parent: HTMLDivElement) {
    this.aboutPageView = new AboutPageView(parent);
  }

  public getHTML(): HTMLDivElement {
    return this.aboutPageView.getHTML();
  }

  private visible(): void {
    this.aboutPageView
      .getHTML()
      .classList.remove(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }

  private hidden(): void {
    this.aboutPageView
      .getHTML()
      .classList.add(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }
}

export default AboutPageModel;
