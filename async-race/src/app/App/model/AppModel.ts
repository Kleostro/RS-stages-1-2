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

    const pages: Record<string, PageInterface> = {
      [PAGES_IDS.DEFAULT_PAGE]: new GaragePageModel(this.parent),
      [PAGES_IDS.GARAGE_PAGE]: new GaragePageModel(this.parent),
      [PAGES_IDS.WINNERS_PAGE]: new WinnersPageModel(this.parent),
    };

    const router = new RouterModel(pages);
    router.init();
  }

  public getHTML(): HTMLDivElement {
    return this.parent;
  }
}

export default AppModel;
