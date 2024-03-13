import MediatorModel from '../../../pages/core/mediator/model/MediatorModel.ts';
import GameSettingsView from '../ui/GameSettingsView.ts';
import IMG_SRC from '../ui/img/imgSrc/imgSrc.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import styles from '../ui/style.module.scss';
import AppEvents from '../../../pages/core/mediator/types/enums.ts';

class GameSettingsModel {
  private singletonMediator: MediatorModel<unknown>;

  private gameSettingsView: GameSettingsView;

  constructor() {
    this.singletonMediator = MediatorModel.getInstance();
    this.gameSettingsView = new GameSettingsView();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.gameSettingsView.getHTML();
  }

  private translateSentenceHandler(): void {
    const translateSentenceWrapper =
      this.gameSettingsView.getTranslateSentenceWrapper();

    const translateSentenceImg =
      this.gameSettingsView.getTranslateSentenceImg();

    let isVisible = true;

    if (translateSentenceWrapper.classList.contains(styles.active)) {
      translateSentenceImg.innerHTML = IMG_SRC.translateOff;
      isVisible = true;
    } else {
      translateSentenceImg.innerHTML = IMG_SRC.translateOn;
      isVisible = false;
    }

    this.singletonMediator.notify(AppEvents.switchTranslateVisible, isVisible);
    translateSentenceWrapper.classList.toggle(styles.active);
  }

  private translateListenHandler(): void {
    const translateListenWrapper =
      this.gameSettingsView.getTranslateListenWrapper();

    const translateListenImg = this.gameSettingsView.getTranslateListenImg();

    let isVisible = true;

    if (translateListenWrapper.classList.contains(styles.active)) {
      translateListenImg.innerHTML = IMG_SRC.translateOff;
      isVisible = true;
    } else {
      translateListenImg.innerHTML = IMG_SRC.translateOn;
      isVisible = false;
    }

    this.singletonMediator.notify(AppEvents.switchListenVisible, isVisible);
    translateListenWrapper.classList.toggle(styles.active);
  }

  private init(): void {
    const translateSentenceWrapper =
      this.gameSettingsView.getTranslateSentenceWrapper();

    const translateListenWrapper =
      this.gameSettingsView.getTranslateListenWrapper();

    translateSentenceWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateSentenceHandler.bind(this),
    );

    translateListenWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateListenHandler.bind(this),
    );
  }
}

export default GameSettingsModel;
