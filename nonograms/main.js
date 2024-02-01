import './style.scss';
import HeaderView from './src/js/components/header/HeaderView';
import MainView from './src/js/components/main/MainView';
import Mediator from './src/js/components/core/Mediator';

/** Create app
* @class
*/
class App {
  constructor() {
    if (!localStorage.getItem('kleostro')) {
      localStorage.setItem('kleostro', JSON.stringify({}));
    }

    this.mediator = new Mediator();
    this.main = new MainView();
    this.header = new HeaderView(this.main.winners);

    document.body.prepend(
      this.header.getHTML(),
      this.main.getHTML(),
    );
  }
}

const myApp = new App();
