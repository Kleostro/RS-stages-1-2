import RouterModel from '../../Router/model/RouterModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import AppView from '../view/AppView.ts';
import GaragePageModel from '../../../pages/GaragePage/model/GaragePageModel.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import WinnersPageModel from '../../../pages/WinnersPage/model/WinnersPageModel.ts';

class AppModel {
  private appView: AppView;

  private parent: HTMLDivElement;

  constructor() {
    this.appView = new AppView();
    this.parent = this.appView.getHTML();

    const pages = this.initPages();

    const router = new RouterModel(pages);
    router.init();
  }

  public getHTML(): HTMLDivElement {
    return this.parent;
  }

  private initPages(): Map<string, PageInterface> {
    const garagePage = new GaragePageModel(this.parent);
    const winnersPage = new WinnersPageModel(this.parent);
    const pages: Map<string, PageInterface> = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: garagePage,
        [PAGES_IDS.GARAGE_PAGE]: garagePage,
        [PAGES_IDS.WINNERS_PAGE]: winnersPage,
      }),
    );
    return pages;
  }
}

export default AppModel;
