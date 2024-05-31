import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import HeaderView from '../view/HeaderView.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';

class HeaderModel {
  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private headerView: HeaderView = new HeaderView();

  private router: RouterModel;

  constructor(router: RouterModel) {
    this.router = router;
    this.init();
  }

  public getHTML(): HTMLElement {
    return this.headerView.getHTML();
  }

  private setHandlerToButtons(): void {
    const garageButton = this.headerView.getGarageButton().getHTML();
    const winnersButton = this.headerView.getWinnersButton().getHTML();

    garageButton.addEventListener(EVENT_NAMES.CLICK, () => {
      this.router.navigateTo(PAGES_IDS.WINNERS_PAGE);
    });

    winnersButton.addEventListener(EVENT_NAMES.CLICK, () => {
      this.router.navigateTo(PAGES_IDS.GARAGE_PAGE);
    });
  }

  private allDisabledButton(): void {
    const garageButton = this.headerView.getGarageButton();
    const winnersButton = this.headerView.getWinnersButton();

    garageButton.setDisabled();
    winnersButton.setDisabled();
  }

  private allEnabled(): void {
    const garageButton = this.headerView.getGarageButton();
    const winnersButton = this.headerView.getWinnersButton();

    garageButton.setEnabled();
    winnersButton.setEnabled();
  }

  private subscribeToMediator(): void {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.START_RACE,
      this.allDisabledButton.bind(this),
    );

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_START,
      this.allDisabledButton.bind(this),
    );

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.EMPTY_RACE,
      this.allEnabled.bind(this),
    );

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.SINGLE_RACE_RESET,
      this.allEnabled.bind(this),
    );
  }

  private init(): void {
    this.subscribeToMediator();
    this.setHandlerToButtons();
  }
}

export default HeaderModel;
