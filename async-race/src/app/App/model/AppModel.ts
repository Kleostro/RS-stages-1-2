import RouterModel from '../../Router/model/RouterModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import AppView from '../view/AppView.ts';
import GaragePageModel from '../../../pages/GaragePage/model/GaragePageModel.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import WinnersPageModel from '../../../pages/WinnersPage/model/WinnersPageModel.ts';
import HeaderModel from '../../../widgets/Header/model/HeaderModel.ts';

class AppModel {
  private appView: AppView = new AppView();

  private router: RouterModel;

  constructor() {
    this.router = new RouterModel(this.initPages());
    this.appView.getHTML().prepend(new HeaderModel(this.router).getHTML());
  }

  public getHTML(): HTMLDivElement {
    return this.appView.getHTML();
  }

  private initPages(): Map<string, PageInterface> {
    const garagePage = new GaragePageModel(this.appView.getHTML());
    const winnersPage = new WinnersPageModel(this.appView.getHTML());
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
