import ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import { BUTTONS_TEXT_CONTENT } from '../types/constants.ts';
import IMG_SRC from './imgSrc/imgSrc.ts';

class PlaygroundView {
  private translateSentence: HTMLDivElement;

  private translateListenBtn: ButtonModel;

  private audio: HTMLAudioElement;

  private translateWrapper: HTMLDivElement;

  private playground: HTMLDivElement;

  private gameBoard: HTMLDivElement;

  private sourceBlock: HTMLDivElement;

  private continueBtn: ButtonModel;

  private checkBtn: ButtonModel;

  private autocompleteBtn: ButtonModel;

  constructor() {
    this.audio = new Audio();
    this.translateSentence = this.createTranslateSentence();
    this.translateListenBtn = this.createTranslateListenBtn();
    this.translateWrapper = this.createTranslateWrapper();
    this.gameBoard = this.createGameBoard();
    this.sourceBlock = this.createSourceBlock();
    this.continueBtn = this.createContinueBtn();
    this.checkBtn = this.createCheckBtn();
    this.autocompleteBtn = this.createAutocompleteBtn();
    this.playground = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.playground;
  }

  public getTranslateSentenceHTML(): HTMLDivElement {
    return this.translateSentence;
  }

  public getTranslateSentenceWrapperHTML(): HTMLDivElement {
    return this.translateWrapper;
  }

  public getTranslateListenBtn(): ButtonModel {
    return this.translateListenBtn;
  }

  public getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  public getGameBoardHTML(): HTMLDivElement {
    return this.gameBoard;
  }

  public clearGameBoardHTML(): void {
    this.gameBoard.innerHTML = '';
  }

  public getSourceBlockHTML(): HTMLDivElement {
    return this.sourceBlock;
  }

  public clearSourceBlockHTML(): void {
    this.sourceBlock.innerHTML = '';
  }

  public getContinueBtn(): ButtonModel {
    return this.continueBtn;
  }

  public getCheckBtn(): ButtonModel {
    return this.checkBtn;
  }

  public getAutocompleteBtn(): ButtonModel {
    return this.autocompleteBtn;
  }

  private createTranslateListenBtn(): ButtonModel {
    this.translateListenBtn = new ButtonModel('', [styles.translate_btn]);
    this.translateListenBtn.getHTML().innerHTML = IMG_SRC.volumeOff;
    return this.translateListenBtn;
  }

  private createTranslateSentence(): HTMLDivElement {
    this.translateSentence = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.translate_sentence],
    });
    return this.translateSentence;
  }

  private createTranslateWrapper(): HTMLDivElement {
    this.translateWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.translate_wrapper],
    });

    this.translateWrapper.append(
      this.audio,
      this.translateListenBtn.getHTML(),
      this.translateSentence,
    );
    return this.translateWrapper;
  }

  private createGameBoard(): HTMLDivElement {
    this.gameBoard = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.game_board],
    });

    return this.gameBoard;
  }

  private createSourceBlock(): HTMLDivElement {
    this.sourceBlock = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.source_data],
    });

    return this.sourceBlock;
  }

  private createContinueBtn(): ButtonModel {
    this.continueBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.continueBtn, [
      styles.continue_btn,
      styles.btn__hidden,
    ]);

    return this.continueBtn;
  }

  private createCheckBtn(): ButtonModel {
    this.checkBtn = new ButtonModel(BUTTONS_TEXT_CONTENT.checkBtn, [
      styles.check_btn,
    ]);

    this.checkBtn.setDisabled();

    return this.checkBtn;
  }

  private createAutocompleteBtn(): ButtonModel {
    this.autocompleteBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.autocompleteBtn,
      [styles.autocomplete_btn],
    );

    return this.autocompleteBtn;
  }

  private createHTML(): HTMLDivElement {
    this.playground = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.playground],
    });

    this.playground.append(
      this.translateWrapper,
      this.gameBoard,
      this.sourceBlock,
      this.continueBtn.getHTML(),
      this.checkBtn.getHTML(),
      this.autocompleteBtn.getHTML(),
    );
    return this.playground;
  }
}

export default PlaygroundView;
