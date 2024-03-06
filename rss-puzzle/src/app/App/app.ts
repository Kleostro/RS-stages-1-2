import styles from './style.module.scss';
import LogInPage from '../../pages/logInPage/index.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import StorageComponent from '../Storage/Storage.ts';
import StartPage from '../../pages/startPage/index.ts';
import Router from '../Router/Router.ts';
import PAGES_IDS from '../types/enums.ts';

class App {
  public pagesContainer: HTMLDivElement;

  private storage: StorageComponent;

  public pages: {
    logIn: LogInPage;
    start: StartPage;
  };

  private router: Router;

  constructor() {
    this.pagesContainer = this.createHTML();
    this.storage = new StorageComponent();

    this.pages = {
      logIn: new LogInPage(PAGES_IDS.LOG_IN, this.pagesContainer, this.storage),
      start: new StartPage(PAGES_IDS.START, this.pagesContainer, this.storage),
    };

    this.router = new Router(this.storage, this.pages);
    this.router.checkLoginUser();
  }

  private createHTML(): HTMLDivElement {
    this.pagesContainer = createBaseElement({
      tag: 'div',
      cssClasses: [styles.pagesContainer],
    });
    return this.pagesContainer;
  }
}

export default App;
