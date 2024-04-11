import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import MainPageView from '../view/MainPageView.ts';
import MAIN_PAGE_STYLES from '../view/mainPage.module.scss';
import PAGES_IDS from '../../types/enums.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';

class MainPageModel implements PageInterface {
  private router: RouterModel;

  private eventMediator = MediatorModel.getInstance();

  private mainPageView: MainPageView;

  constructor(parent: HTMLDivElement, router: RouterModel) {
    this.router = router;
    this.mainPageView = new MainPageView(parent);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.mainPageView.getHTML();
  }

  private show(): void {
    this.mainPageView
      .getHTML()
      .classList.remove(MAIN_PAGE_STYLES.mainPage_hidden);
  }

  private hide(): void {
    this.mainPageView.getHTML().classList.add(MAIN_PAGE_STYLES.mainPage_hidden);
  }

  private switchPage(params: string): boolean {
    if (params === PAGES_IDS.MAIN_PAGE) {
      if (StoreModel.getState().currentUser) {
        this.show();
      } else {
        this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
        this.hide();
      }
    }

    return true;
  }

  private subscribeToMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      this.hide();
      this.switchPage(String(params));
    });
  }

  private init(): void {
    this.hide();
    this.subscribeToMediator();
  }
}

export default MainPageModel;
