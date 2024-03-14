import MediatorModel from '../../../pages/core/mediator/model/MediatorModel.ts';
import GameSettingsView from '../ui/GameSettingsView.ts';
import IMG_SRC from '../ui/img/imgSrc/imgSrc.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import styles from '../ui/style.module.scss';
import AppEvents from '../../../pages/core/mediator/types/enums.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import IS_VISIBLE from '../types/enums.ts';

class GameSettingsModel {
  private storage: StorageModel;

  private singletonMediator: MediatorModel<unknown>;

  private gameSettingsView: GameSettingsView;

  constructor(storage: StorageModel) {
    this.storage = storage;
    this.singletonMediator = MediatorModel.getInstance();
    this.gameSettingsView = new GameSettingsView();
    this.init();
    this.checkSentence();
    this.checkListen();
  }

  public getHTML(): HTMLDivElement {
    return this.gameSettingsView.getHTML();
  }

  public getView(): GameSettingsView {
    return this.gameSettingsView;
  }

  private checkSentence(): void {
    if (
      typeof this.storage.get(AppEvents.switchTranslateVisible) === 'undefined'
    ) {
      this.storage.add(
        AppEvents.switchTranslateVisible,
        `${IS_VISIBLE.visible}`,
      );
    }
  }

  private checkListen(): void {
    if (
      typeof this.storage.get(AppEvents.switchListenVisible) === 'undefined'
    ) {
      this.storage.add(AppEvents.switchListenVisible, `${IS_VISIBLE.visible}`);
    }
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

  private switchInitTranslateSentence(): void {
    const translateSentenceImg =
      this.gameSettingsView.getTranslateSentenceImg();
    if (
      this.storage.get(AppEvents.switchTranslateVisible) === IS_VISIBLE.visible
    ) {
      translateSentenceImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateSentenceImg.innerHTML = IMG_SRC.translateOff;
    }
  }

  private switchInitTranslateListen(): void {
    const translateListenImg = this.gameSettingsView.getTranslateListenImg();
    if (
      this.storage.get(AppEvents.switchListenVisible) === IS_VISIBLE.visible
    ) {
      translateListenImg.innerHTML = IMG_SRC.translateOn;
    } else {
      translateListenImg.innerHTML = IMG_SRC.translateOff;
    }
  }

  private init(): void {
    const translateSentenceWrapper =
      this.gameSettingsView.getTranslateSentenceWrapper();

    this.switchInitTranslateSentence();
    this.switchInitTranslateListen();

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
