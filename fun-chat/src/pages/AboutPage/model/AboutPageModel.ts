import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import type PageInterface from '../../types/interfaces.ts';
import AboutPageView from '../view/AboutPageView.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import PAGES_IDS from '../../types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';

class AboutPageModel implements PageInterface {
  private eventMediator = EventMediatorModel.getInstance();

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

  private subscribeToMediator(): boolean {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.CHANGE_PAGE, (params) => {
      if (params === PAGES_IDS.ABOUT_PAGE) {
        this.view.show();
      } else {
        this.view.hide();
      }
    });
    return true;
  }

  private backButtonHandler(): boolean {
    if (StoreModel.getState().currentUser) {
      this.router.navigateTo(PAGES_IDS.MAIN_PAGE);
    } else {
      this.router.navigateTo(PAGES_IDS.LOGIN_PAGE);
    }
    this.view.hide();
    return true;
  }

  private setBackButtonHandler(): boolean {
    const backButton = this.view.getBackButton().getHTML();

    backButton.addEventListener(
      EVENT_NAMES.CLICK,
      this.backButtonHandler.bind(this),
    );
    return true;
  }

  private init(): boolean {
    this.subscribeToMediator();
    this.setBackButtonHandler();
    return true;
  }
}

export default AboutPageModel;
