import CreateElement from '../../CreateElement';
import GameFieldView from '../gameField/GameFieldView';
import ModalView from '../modal/ModalView';
import SettingsGameView from '../settingsGame/SettingsGameView';
import TimerView from '../timer/TimerView';
import WinnersView from '../winners/WinnersView';
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

  /**
  * create HTML main
  */
  #createHTML() {
    this.main = new CreateElement({ tag: 'main', classes: ['main'] });
    this.modal = new ModalView();
    this.timer = new TimerView();
    this.winners = new WinnersView();
    this.gameField = new GameFieldView(this.modal, this.timer, this.winners);
    this.settingsBox = new SettingsGameView(this.gameField, this.timer);

    this.main.append(this.gameField.getHTML(), this.modal.getHTML(), this.winners.getHTML());
  }
}

export default MainView;
