import CreateElement from '../../CreateElement';
import GameFieldView from '../gameField/GameFieldView';
import ModalView from '../modal/ModalView';
import SettingsGameView from '../settingsGame/SettingsGameView';
import TimerView from '../timer/TimerView';
import './mainView.scss';

/** Create a main
* @class
*/
class MainView {
  constructor() {
    this.#createHTML();
  }

  /**
  * get HTML main
  * @returns {Element} HTML-Element main
  */
  getHTML() {
    return this.main;
  }

  #createHTML() {
    this.main = new CreateElement({ tag: 'main', classes: ['main'] });
    this.modal = new ModalView();
    this.timer = new TimerView();
    this.gameField = new GameFieldView(this.modal, this.timer);
    this.settingsBox = new SettingsGameView(this.gameField, this.timer);

    this.main.append(this.gameField.getHTML(), this.modal.getHTML());
  }
}

export default MainView;
