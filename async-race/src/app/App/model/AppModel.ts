import RouterModel from '../../Router/model/RouterModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import AppView from '../view/AppView.ts';
import GaragePageModel from '../../../pages/GaragePage/model/GaragePageModel.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import WinnersPageModel from '../../../pages/WinnersPage/model/WinnersPageModel.ts';
import HeaderModel from '../../../widgets/Header/model/HeaderModel.ts';

class AppModel {
  private appView: AppView;

  private parent: HTMLDivElement;

  private router: RouterModel;

  constructor() {
    this.appView = new AppView();
    this.parent = this.appView.getHTML();

    const pages = this.initPages();

    this.router = new RouterModel(pages);

    const header = new HeaderModel(this.router);
    this.parent.prepend(header.getHTML());
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
