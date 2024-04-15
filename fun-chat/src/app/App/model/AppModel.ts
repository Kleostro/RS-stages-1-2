import MainPageModel from '../../../pages/MainPage/model/MainPageModel.ts';
import AboutPageModel from '../../../pages/AboutPage/model/AboutPageModel.ts';
import LoginPageModel from '../../../pages/LoginPage/model/LoginPageModel.ts';
import PAGES_IDS from '../../../pages/types/enums.ts';
import type PageInterface from '../../../pages/types/interfaces.ts';
import RouterModel from '../../Router/model/RouterModel.ts';
import AppView from '../view/AppView.ts';
import HeaderModel from '../../../widgets/Header/model/HeaderModel.ts';
import SocketModel from '../../../shared/Server/Socket/model/SocketModel.ts';
import SessionStorageModel from '../../../shared/SessionStorage/model/SessionStorage.ts';
import FooterModel from '../../../widgets/Footer/model/FooterModel.ts';
import ModalModel from '../../../shared/Modal/model/ModalModel.ts';
import EventMediatorModel from '../../../shared/EventMediator/model/EventMediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/EventMediator/types/enums.ts';
import SOCKET_MESSAGE from '../types/enums.ts';

class AppModel {
  private appView: AppView = new AppView();

  private storage = new SessionStorageModel();

  private eventMediator = EventMediatorModel.getInstance();

  private serverApi: SocketModel = new SocketModel();

  private router = new RouterModel();

  private modal = new ModalModel();

  constructor() {
    this.router.setPages(this.initPages());

    this.subscribeToEvents();
    this.serverApi.isWorks();
  }

  public getHTML(): HTMLDivElement {
    return this.appView.getHTML();
  }

  private initPages(): Map<string, PageInterface> {
    const root = this.getHTML();
    root.prepend(new HeaderModel(this.router, this.storage).getHTML());
    const loginPage = new LoginPageModel(root, this.router, this.storage);
    const mainPage = new MainPageModel(root, this.router);
    const aboutPage = new AboutPageModel(root, this.router);
    const pages: Map<string, PageInterface> = new Map(
      Object.entries({
        [PAGES_IDS.DEFAULT_PAGE]: loginPage,
        [PAGES_IDS.LOGIN_PAGE]: loginPage,
        [PAGES_IDS.MAIN_PAGE]: mainPage,
        [PAGES_IDS.ABOUT_PAGE]: aboutPage,
      }),
    );
    root.append(new FooterModel().getHTML(), this.modal.getHTML());
    return pages;
  }

  private subscribeToEvents(): void {
    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_CONNECT, () => {
      this.modal.hide();
    });

    this.eventMediator.subscribe(MEDIATOR_EVENTS.SOCKET_DISCONNECT, () => {
      this.modal.show();
      this.modal.setModalText(SOCKET_MESSAGE);
    });
  }
}

export default AppModel;
