import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import AboutPageView from '../view/AboutPageView.ts';
import ABOUT_PAGE_STYLES from '../view/aboutPage.module.scss';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import PAGES_IDS from '../../types/enums.ts';

class AboutPageModel implements PageInterface {
  private eventMediator = MediatorModel.getInstance();

  private aboutPageView: AboutPageView;

  constructor(parent: HTMLDivElement) {
    this.aboutPageView = new AboutPageView(parent);
    this.init();
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

  private subscribeToMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.ABOUT_PAGE) {
        this.visible();
      } else {
        this.hidden();
      }
    });
  }

  private init(): void {
    this.subscribeToMediator();
  }
}

export default AboutPageModel;
