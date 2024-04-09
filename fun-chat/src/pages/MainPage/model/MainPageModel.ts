import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import MainPageView from '../view/MainPageView.ts';
import MAIN_PAGE_STYLES from '../view/mainPage.module.scss';
import PAGES_IDS from '../../types/enums.ts';

class MainPageModel implements PageInterface {
  private eventMediator = MediatorModel.getInstance();

  private mainPageView: MainPageView;

  constructor(parent: HTMLDivElement) {
    this.mainPageView = new MainPageView(parent);
    this.init();
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

  private subscribeToMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.MAIN_PAGE) {
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

export default MainPageModel;
