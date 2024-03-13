import ButtonModel from '../../../shared/button/model/ButtonModel.ts';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import { BUTTONS_TEXT_CONTENT } from '../types/constants.ts';

class PlaygroundView {
  private translateWrapper: HTMLDivElement;

  private translateSentence: HTMLDivElement;

  private translateSentenceBtn: ButtonModel;

  private playground: HTMLDivElement;

  private gameBoard: HTMLDivElement;

  private sourceBlock: HTMLDivElement;

  private continueBtn: ButtonModel;

  private checkBtn: ButtonModel;

  private autocompleteBtn: ButtonModel;

  constructor() {
    this.translateSentenceBtn = this.createTranslateSentenceBtn();
    this.translateSentence = this.createTranslateSentence();
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

  public getTranslateSentenceBtn(): ButtonModel {
    return this.translateSentenceBtn;
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

  private createTranslateSentence(): HTMLDivElement {
    this.translateSentence = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.translate_sentence],
    });
    return this.translateSentence;
  }

  private createTranslateSentenceBtn(): ButtonModel {
    this.translateSentenceBtn = new ButtonModel(
      BUTTONS_TEXT_CONTENT.translateBtn,
      [styles.translate_btn],
    );
    return this.translateSentenceBtn;
  }

  private createTranslateWrapper(): HTMLDivElement {
    this.translateWrapper = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.translate_wrapper],
    });
    this.translateWrapper.append(
      this.translateSentenceBtn.getHTML(),
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
