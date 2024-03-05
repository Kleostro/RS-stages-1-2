import styles from './style.module.scss';
import LogInPage from '../../pages/logInPage/index.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import StorageComponent from '../Storage/Storage.ts';

class App {
  public app: HTMLDivElement;

  private storage: StorageComponent;

  public pages: {
    logIn: LogInPage;
  };

  constructor() {
    this.app = this.createHTML();
    this.storage = new StorageComponent();

    this.pages = {
      logIn: new LogInPage('logIn', this.app, this.storage),
    };
  }

  private createHTML(): HTMLDivElement {
    this.app = createBaseElement({ tag: 'div', cssClasses: [styles.app] });
    return this.app;
  }
}

export default App;
