import type PlaygroundView from '../../widgets/playground/ui/PlaygroundView.ts';
import { EVENT_NAMES, TAG_NAMES } from '../../shared/types/enums.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import playgroundStyles from '../../widgets/playground/ui/style.module.scss';
import type PlaygroundModel from '../../widgets/playground/model/PlaygroundModel.ts';
import type ButtonModel from '../../shared/button/model/ButtonModel.ts';

class PuzzleComponent {
  private puzzle: HTMLDivElement;

  private word: string;

  private playground: PlaygroundModel;

  private playgroundView: PlaygroundView;

  constructor(
    word: string,
    playground: PlaygroundModel,
    playgroundView: PlaygroundView,
  ) {
    this.word = word;
    this.playground = playground;
    this.playgroundView = playgroundView;
    this.puzzle = this.createHTML(this.word);
  }

  public getHTML(): HTMLDivElement {
    return this.puzzle;
  }

  public getWord(): string {
    return this.word;
  }

  private calculateSizePuzzle(elem: HTMLDivElement): void {
    const currentElem = elem;
    const wordLength = this.word.length;
    const paddingX = 2;
    const paddingY = 1;

    const pivotFont = 5;
    const minFontSize = 65;
    const maxFontSize = 75;
    const calcFontSize = wordLength > pivotFont ? minFontSize : maxFontSize;
    const padding = `${paddingY}% ${paddingX}%`;
    const fontSize = `${calcFontSize}%`;

    currentElem.style.padding = padding;
    currentElem.style.fontSize = fontSize;
  }

  public clickPuzzleHandler(): void {
    const wordsInCurrentLine = this.playground.getWordsInCurrentLine();
    const words = this.playground.getWords();
    const currentRound = this.playground.getCurrentRound();
    const checkBtn = this.playgroundView.getCheckBtn();
    const wordLines = this.playground.getWordLinesHTML();

    if (this.puzzle.parentNode !== wordLines[currentRound]) {
      this.handlePuzzleNotInCurrentLine(
        words,
        currentRound,
        checkBtn,
        wordLines,
        wordsInCurrentLine,
      );
    } else {
      this.handlePuzzleInCurrentLine(
        words,
        currentRound,
        checkBtn,
        wordsInCurrentLine,
        wordLines,
      );
    }
  }

  private handlePuzzleNotInCurrentLine(
    words: string[][],
    currentRound: number,
    checkBtn: ButtonModel,
    wordLines: HTMLElement[],
    wordsInCurrentLine: string[],
  ): void {
    wordLines[currentRound].append(this.puzzle);
    wordsInCurrentLine.push(this.word);

    if (wordsInCurrentLine.length === words[currentRound].length) {
      checkBtn.setEnabled();
    } else {
      checkBtn.setDisabled();
    }
  }

  private handlePuzzleInCurrentLine(
    words: string[][],
    currentRound: number,
    checkBtn: ButtonModel,
    wordsInCurrentLine: string[],
    wordLines: HTMLElement[],
  ): void {
    const puzzlesArr = wordLines[currentRound].children;
    Array.from(puzzlesArr).forEach((puzzle) => {
      puzzle.classList.remove(
        playgroundStyles.copy_puzzle__error,
        playgroundStyles.copy_puzzle__success,
      );
    });

    const index = wordsInCurrentLine.indexOf(this.word);
    if (index > -1) {
      wordsInCurrentLine.splice(index, 1);
    }

    this.playground.setWordsInCurrentLine(wordsInCurrentLine);
    this.playgroundView.getSourceBlockHTML().append(this.puzzle);

    if (wordsInCurrentLine.length !== words[currentRound].length) {
      checkBtn.setDisabled();
    } else {
      checkBtn.setEnabled();
    }
  }

  private createHTML(word: string): HTMLDivElement {
    const isDraggable = 'true';
    this.puzzle = createBaseElement({
      tag: TAG_NAMES.div,
      cssClasses: [styles.puzzle],
      attributes: {
        draggable: isDraggable,
        id: word,
      },
      innerContent: word,
    });

    this.calculateSizePuzzle(this.puzzle);

    this.puzzle.addEventListener(
      EVENT_NAMES.click,
      this.clickPuzzleHandler.bind(this),
    );

    return this.puzzle;
  }
}

export default PuzzleComponent;
