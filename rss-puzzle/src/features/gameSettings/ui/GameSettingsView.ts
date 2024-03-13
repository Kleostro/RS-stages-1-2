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

  constructor() {
    this.translateSentenceImg = this.createTranslateSentenceImg();
    this.translateSentenceWrapper = this.createTranslateSentenceWrapper();
    this.translateListenImg = this.createTranslateListenImg();
    this.translateListenWrapper = this.createTranslateListenWrapper();
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

  private createHTML(): HTMLDivElement {
    this.gameSettings = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_settings],
    });

    this.gameSettings.append(
      this.translateSentenceWrapper,
      this.translateListenWrapper,
    );
    return this.gameSettings;
  }
}

export default GameSettingsView;
