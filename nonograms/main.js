import './style.scss';
import HeaderView from './src/js/components/header/HeaderView';
import MainView from './src/js/components/main/MainView';

/** Create app
* @class
*/
class App {
  constructor() {
    const main = new MainView();
    const header = new HeaderView();

    document.body.prepend(
      header.getHTML(),
      main.getHTML(),
    );
    document.body.classList.add('light');
  }
}

const myApp = new App();
