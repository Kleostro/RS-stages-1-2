import MainPageModel from '../../../pages/MainPage/model/MainPageModel.ts';
import AboutPageModel from '../../../pages/AboutPage/model/AboutPageModel.ts';
import LoginPageModel from '../../../pages/LoginPage/model/LoginPageModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import RouterModel from '../../Router/model/RouterModel.ts';
import AppView from '../view/AppView.ts';
import HeaderModel from '../../../widgets/Header/model/HeaderModel.ts';
import ServerApiModel from '../../../shared/Server/ServerApi/model/ServerApiModel.ts';

class AppModel {
  private appView: AppView = new AppView();

  private serverApi = new ServerApiModel();

  private router = new RouterModel();

  constructor() {
    this.router.setPages(this.initPages());

    this.serverApi.open();

    this.getHTML().prepend(new HeaderModel(this.router).getHTML());
  }

  public getHTML(): HTMLDivElement {
    return this.appView.getHTML();
  }

  private initPages(): Map<string, PageInterface> {
    const loginPage = new LoginPageModel(this.appView.getHTML(), this.router);
    const mainPage = new MainPageModel(this.appView.getHTML());
    const aboutPage = new AboutPageModel(this.appView.getHTML());
    const pages: Map<string, PageInterface> = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: loginPage,
        [PAGES_IDS.LOGIN_PAGE]: loginPage,
        [PAGES_IDS.MAIN_PAGE]: mainPage,
        [PAGES_IDS.ABOUT_PAGE]: aboutPage,
      }),
    );
    return pages;
  }
}

export default AppModel;
