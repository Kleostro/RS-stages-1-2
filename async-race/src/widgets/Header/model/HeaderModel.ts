import PAGES_IDS from '../../../pages/types/enums.ts';
import type RouterModel from '../../../app/Router/model/RouterModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import HeaderView from '../view/HeaderView.ts';

class HeaderModel {
  private headerView: HeaderView;

  private header: HTMLElement;

  private router: RouterModel;

  constructor(router: RouterModel) {
    this.headerView = new HeaderView();
    this.header = this.headerView.getHTML();
    this.router = router;
    this.setHandlerToButtons();
  }

  public getHTML(): HTMLElement {
    return this.header;
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
}

export default HeaderModel;
