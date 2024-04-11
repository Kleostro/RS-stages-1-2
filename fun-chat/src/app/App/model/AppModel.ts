import MainPageModel from '../../../pages/MainPage/model/MainPageModel.ts';
import AboutPageModel from '../../../pages/AboutPage/model/AboutPageModel.ts';
import LoginPageModel from '../../../pages/LoginPage/model/LoginPageModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import RouterModel from '../../Router/model/RouterModel.ts';
import AppView from '../view/AppView.ts';
import HeaderModel from '../../../widgets/Header/model/HeaderModel.ts';
import SocketModel from '../../../shared/Server/Socket/model/SocketModel.ts';

class AppModel {
  private appView: AppView = new AppView();

  private serverApi = new SocketModel();

  private router = new RouterModel();

  constructor() {
    this.router.setPages(this.initPages());

    this.serverApi.isWorks();

    this.getHTML().prepend(new HeaderModel(this.router).getHTML());
  }

  public getHTML(): HTMLDivElement {
    return this.appView.getHTML();
  }

  private initPages(): Map<string, PageInterface> {
    const root = this.getHTML();
    const loginPage = new LoginPageModel(root, this.router);
    const mainPage = new MainPageModel(root);
    const aboutPage = new AboutPageModel(root);
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
