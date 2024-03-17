import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import IMG_SRC from './img/imgSrc/imgSrc.ts';

class GameSettingsView {
  private gameSettings: HTMLDivElement;

  private translateSentenceWrapper: HTMLDivElement;

  private translateSentenceImg: HTMLSpanElement;

  private translateListenWrapper: HTMLDivElement;

  private translateListenImg: HTMLSpanElement;

  private choiceGameWrapper: HTMLDivElement;

  private choiceGameImg: HTMLSpanElement;

  private backgroundHintImg: HTMLSpanElement;

  private backgroundHintWrapper: HTMLDivElement;

  private logOutWrapper: HTMLDivElement;

  private logOutImg: HTMLSpanElement;

  constructor() {
    this.translateSentenceImg = this.createTranslateSentenceImg();
    this.translateSentenceWrapper = this.createTranslateSentenceWrapper();
    this.translateListenImg = this.createTranslateListenImg();
    this.translateListenWrapper = this.createTranslateListenWrapper();
    this.choiceGameImg = this.createChoiceGameImg();
    this.choiceGameWrapper = this.createChoiceGameWrapper();
    this.backgroundHintImg = this.createBackgroundHintImg();
    this.backgroundHintWrapper = this.createBackgroundHintWrapper();
    this.logOutImg = this.createLogOutImg();
    this.logOutWrapper = this.createLogOutWrapper();
    this.gameSettings = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.gameSettings;
  }

  public getTranslateSentenceWrapper(): HTMLDivElement {
    return this.translateSentenceWrapper;
  }

  public getTranslateSentenceImg(): HTMLSpanElement {
    return this.translateSentenceImg;
  }

  public getTranslateListenWrapper(): HTMLDivElement {
    return this.translateListenWrapper;
  }

  public getTranslateListenImg(): HTMLSpanElement {
    return this.translateListenImg;
  }

  public getBackgroundHintWrapper(): HTMLDivElement {
    return this.backgroundHintWrapper;
  }

  public getBackgroundHintImg(): HTMLSpanElement {
    return this.backgroundHintImg;
  }

  public getChoiceGameWrapper(): HTMLDivElement {
    return this.choiceGameWrapper;
  }

  public getChoiceGameImg(): HTMLSpanElement {
    return this.choiceGameImg;
  }

  public getLogOutWrapper(): HTMLDivElement {
    return this.logOutWrapper;
  }

  private createTranslateSentenceImg(): HTMLSpanElement {
    this.translateSentenceImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.translate_sentence_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff,
    });
    return this.translateSentenceImg;
  }

  private createTranslateSentenceWrapper(): HTMLDivElement {
    this.translateSentenceWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings_item],
    });

    const textContent = 'Translate';
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.game_settings_item_text],
      innerContent: textContent,
    });

    this.translateSentenceWrapper.append(this.translateSentenceImg, textElem);
    return this.translateSentenceWrapper;
  }

  private createTranslateListenImg(): HTMLSpanElement {
    this.translateListenImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff,
    });
    return this.translateListenImg;
  }

  private createTranslateListenWrapper(): HTMLDivElement {
    this.translateListenWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings_item],
    });

    const textContent = 'Listen';
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.game_settings_item_text],
      innerContent: textContent,
    });

    this.translateListenWrapper.append(this.translateListenImg, textElem);
    return this.translateListenWrapper;
  }

  private createChoiceGameImg(): HTMLSpanElement {
    this.choiceGameImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.chooseGameImg,
    });
    return this.choiceGameImg;
  }

  private createChoiceGameWrapper(): HTMLDivElement {
    this.choiceGameWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings_item],
    });

    const textContent = 'Choice Game';
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.game_settings_item_text],
      innerContent: textContent,
    });

    this.choiceGameWrapper.append(this.choiceGameImg, textElem);
    return this.choiceGameWrapper;
  }

  private createLogOutImg(): HTMLSpanElement {
    this.logOutImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.logOutImg,
    });
    return this.logOutImg;
  }

  private createBackgroundHintWrapper(): HTMLDivElement {
    this.backgroundHintWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings_item],
    });

    const textContent = 'Background Hint';
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.game_settings_item_text],
      innerContent: textContent,
    });

    this.backgroundHintWrapper.append(this.backgroundHintImg, textElem);
    return this.backgroundHintWrapper;
  }

  private createBackgroundHintImg(): HTMLSpanElement {
    this.backgroundHintImg = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.translate_listen_img],
      attributes: {},
      innerContent: IMG_SRC.translateOff,
    });
    return this.backgroundHintImg;
  }

  private createLogOutWrapper(): HTMLDivElement {
    this.logOutWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings_item],
    });

    const textContent = 'Log Out';
    const textElem = createBaseElement({
      tag: TAG_NAMES.span,
      cssClasses: [styles.game_settings_item_text],
      innerContent: textContent,
    });

    this.logOutWrapper.append(this.logOutImg, textElem);
    return this.logOutWrapper;
  }

  private createHTML(): HTMLDivElement {
    this.gameSettings = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings],
    });

    this.gameSettings.append(
      this.translateSentenceWrapper,
      this.translateListenWrapper,
      this.backgroundHintWrapper,
      this.choiceGameWrapper,
      this.logOutWrapper,
    );
    return this.gameSettings;
  }
}

export default GameSettingsView;
