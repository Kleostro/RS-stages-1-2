import MediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import AboutPageView from '../view/AboutPageView.ts';
import ABOUT_PAGE_STYLES from '../view/aboutPage.module.scss';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import PAGES_IDS from '../../types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';

class AboutPageModel implements PageInterface {
  private eventMediator = MediatorModel.getInstance();

  private router: RouterModel;

  private view: AboutPageView;

  constructor(parent: HTMLDivElement, router: RouterModel) {
    this.router = router;
    this.view = new AboutPageView(parent);
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  private show(): void {
    this.view.getHTML().classList.remove(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }

  private hide(): void {
    this.view.getHTML().classList.add(ABOUT_PAGE_STYLES.aboutPage_hidden);
  }

  private subscribeToMediator(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.ABOUT_PAGE) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  private backButtonHandler(): void {
    if (StoreModel.getState().currentUser) {
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    } else {
      this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
    }
    this.hide();
  }

  private setBackButtonHandler(): void {
    const backButton = this.view.getBackButton().getHTML();

    backButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.backButtonHandler.bind(this),
    );
  }

  private init(): void {
    this.subscribeToMediator();
    this.setBackButtonHandler();
  }
}

export default AboutPageModel;
