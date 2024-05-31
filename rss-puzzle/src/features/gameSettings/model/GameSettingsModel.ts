import MediatorModel from '../../../pages/core/mediator/model/MediatorModel.ts';
import GameSettingsView from '../ui/GameSettingsView.ts';
import IMG_SRC from '../ui/img/imgSrc/imgSrc.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import styles from '../ui/style.module.scss';
import AppEvents from '../../../pages/core/mediator/types/enums.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import IS_VISIBLE from '../types/enums.ts';
import { PAGES_IDS } from '../../../pages/types/enums.ts';
import STORE_KEYS from '../../../app/Storage/types/enums.ts';

class GameSettingsModel {
  private storage: StorageModel;

  private singletonMediator: MediatorModel<unknown>;

  private gameSettingsView: GameSettingsView;

  constructor(storage: StorageModel) {
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.gameSettingsView = new GameSettingsView();
    this.singletonMediator.subscribe(
      AppEvents.logOut,
      this.resetStates.bind(this),
    );
    this.init();
    this.checkSentence();
    this.checkListen();
    this.checkBackgroundHint();
  }

  public getHTML(): HTMLDivElement {
    return this.gameSettingsView.getHTML();
  }

  public getView(): GameSettingsView {
    return this.gameSettingsView;
  }

  private checkSentence(): void {
    if (typeof this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE) === 'undefined') {
      this.storage.add(STORE_KEYS.TRANSLATE_VISIBLE, `${IS_VISIBLE.visible}`);
    }
  }

  private checkListen(): void {
    if (typeof this.storage.get(STORE_KEYS.LISTEN_VISIBLE) === 'undefined') {
      this.storage.add(STORE_KEYS.LISTEN_VISIBLE, `${IS_VISIBLE.visible}`);
    }
  }

  private checkBackgroundHint(): void {
    if (typeof this.storage.get(STORE_KEYS.BACKGROUND_HINT) === 'undefined') {
      this.storage.add(STORE_KEYS.BACKGROUND_HINT, `${IS_VISIBLE.visible}`);
    }
  }

  private resetStates(): void {
    this.storage.add(STORE_KEYS.TRANSLATE_VISIBLE, `${IS_VISIBLE.hidden}`);
    this.storage.add(STORE_KEYS.LISTEN_VISIBLE, `${IS_VISIBLE.hidden}`);
    this.storage.add(STORE_KEYS.BACKGROUND_HINT, `${IS_VISIBLE.hidden}`);
  }

  private toggleVisibilityState(
    wrapper: HTMLElement,
    img: HTMLElement,
    event: string,
  ): void {
    const currentImg = img;
    const isVisible = this.storage.get(event);

    if (isVisible) {
      currentImg.innerHTML = IMG_SRC.translateOff;
      this.storage.add(event, `${IS_VISIBLE.hidden}`);
    } else {
      currentImg.innerHTML = IMG_SRC.translateOn;
      this.storage.add(event, `${IS_VISIBLE.visible}`);
    }

    this.singletonMediator.notify(event, isVisible);
    wrapper.classList.toggle(styles.active);
  }

  private translateSentenceHandler(): void {
    const translateSentenceWrapper =
      this.gameSettingsView.getTranslateSentenceWrapper();
    const translateSentenceImg =
      this.gameSettingsView.getTranslateSentenceImg();
    this.toggleVisibilityState(
      translateSentenceWrapper,
      translateSentenceImg,
      AppEvents.switchTranslateVisible,
    );
  }

  private translateListenHandler(): void {
    const translateListenWrapper =
      this.gameSettingsView.getTranslateListenWrapper();
    const translateListenImg = this.gameSettingsView.getTranslateListenImg();
    this.toggleVisibilityState(
      translateListenWrapper,
      translateListenImg,
      AppEvents.switchListenVisible,
    );
  }

  private translateBackgroundHintHandler(): void {
    const backgroundHintWrapper =
      this.gameSettingsView.getBackgroundHintWrapper();
    const backgroundHintImg = this.gameSettingsView.getBackgroundHintImg();
    this.toggleVisibilityState(
      backgroundHintWrapper,
      backgroundHintImg,
      AppEvents.switchBackgroundHintVisible,
    );
  }

  private switchInitTranslateSentence(): void {
    const translateSentenceImg =
      this.gameSettingsView.getTranslateSentenceImg();
    if (this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE) === IS_VISIBLE.visible) {
      translateSentenceImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateSentenceImg.innerHTML = IMG_SRC.translateOff;
    }
  }

  private switchInitTranslateListen(): void {
    const translateListenImg = this.gameSettingsView.getTranslateListenImg();
    if (this.storage.get(STORE_KEYS.LISTEN_VISIBLE) === IS_VISIBLE.visible) {
      translateListenImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateListenImg.innerHTML = IMG_SRC.translateOff;
    }
  }

  private switchInitBackgroundHint(): void {
    const backgroundHintImg = this.gameSettingsView.getBackgroundHintImg();
    if (this.storage.get(STORE_KEYS.BACKGROUND_HINT) === IS_VISIBLE.visible) {
      backgroundHintImg.innerHTML = IMG_SRC.translateOn;
    } else {
      backgroundHintImg.innerHTML = IMG_SRC.translateOff;
    }
  }

  private init(): void {
    const translateSentenceWrapper =
      this.gameSettingsView.getTranslateSentenceWrapper();

    this.switchInitTranslateSentence();
    this.switchInitTranslateListen();
    this.switchInitBackgroundHint();

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

    const backgroundHintWrapper =
      this.gameSettingsView.getBackgroundHintWrapper();
    backgroundHintWrapper.addEventListener(
      EVENT_NAMES.click,
      this.translateBackgroundHintHandler.bind(this),
    );

    const choiceGameWrapper = this.gameSettingsView.getChoiceGameWrapper();
    choiceGameWrapper.addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(
        AppEvents.changeHash,
        PAGES_IDS.CHOICE_GAME,
      );
    });

    const logOutWrapper = this.gameSettingsView.getLogOutWrapper();
    logOutWrapper.addEventListener(EVENT_NAMES.click, () => {
      this.storage.remove(STORE_KEYS.USER);
      this.storage.remove(STORE_KEYS.COMPLETED_ROUND);
      this.storage.remove(STORE_KEYS.LAST_ROUND);
      this.singletonMediator.notify(AppEvents.logOut, '');
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.LOG_IN);
    });
  }
}

export default GameSettingsModel;
