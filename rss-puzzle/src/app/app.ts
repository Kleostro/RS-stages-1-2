import styles from './style.module.scss';
import LogInPage from '../pages/logInPage/index.ts';
import createBaseElement from '../utils/createBaseElement.ts';

class App {
  public app: HTMLDivElement;

  public pages: {
    logIn: LogInPage;
  };

  constructor() {
    this.app = this.createHTML();

    this.pages = {
      logIn: new LogInPage('logIn', this.app),
    };
  }

  private createHTML(): HTMLDivElement {
    this.app = createBaseElement({ tag: 'div', cssClasses: [styles.app] });
    return this.app;
  }
}

export default App;
