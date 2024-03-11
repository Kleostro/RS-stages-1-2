// import type PlaygroundComponent from '@/widgets/playground/Playground.ts';
import type PlaygroundView from '../../widgets/playground/ui/PlaygroundView.ts';
import { EVENT_NAMES } from '../../shared/types/enums.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import {
  PUZZLE_STYLE,
  COPY_PUZZLE_ANIMATION_OPTIONS,
} from './types/constans.ts';
import type PlaygroundModel from '../../widgets/playground/model/PlaygroundModel.ts';

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

  private calculateSizePuzzle(elem: HTMLDivElement): void {
    const currentElem = elem;
    const wordLength = this.word.length;
    const paddingX = 1;
    const paddingY = 0.5;

    const pivotFont = 5;
    const minFontSize = 1;
    const maxFontSize = 1.2;
    const fontSize = wordLength > pivotFont ? minFontSize : maxFontSize;

    currentElem.style.padding = `${paddingY}dvw ${paddingX}dvw`;
    currentElem.style.fontSize = `${fontSize}dvw`;
  }

  private createDuplicateWordElement(): HTMLDivElement {
    const copyWord = createBaseElement({
      tag: 'div',
      cssClasses: [styles.puzzle],
      attributes: {},
      innerContent: this.word,
    });

    this.calculateSizePuzzle(copyWord);
    return copyWord;
  }

  private clickPuzzleCopyHandler(copyWord: HTMLDivElement): void {
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.auto;
    this.puzzle.classList.remove(styles.puzzle_placeholder);

    const newWordsInCurrentLine = this.playground
      .getWordsInCurrentLine()
      .filter((word) => word !== this.word);
    this.playground.setWordsInCurrentLine(newWordsInCurrentLine);

    const newCopyPuzzles = this.playground
      .getCopyPuzzles()
      .filter((copy) => copy !== copyWord);
    this.playground.setCopyPuzzles(newCopyPuzzles);

    const continueBtn = this.playgroundView.getContinueBtn();
    continueBtn.setDisabled();

    const checkBtn = this.playgroundView.getCheckBtn();
    checkBtn.setDisabled();

    this.playground.checkLine();
    copyWord.remove();
  }

  private setPuzzleAnimation(copyWord: HTMLDivElement): void {
    const linesArr = this.playground.getWordLinesHTML();
    const currentRound = this.playground.getCurrentRound();
    const lineRect = linesArr[currentRound].getBoundingClientRect();

    const gameBoard = this.playgroundView.getGameBoardHTML();
    const gameBoardRect = gameBoard.getBoundingClientRect();

    const sourceBlock = this.playgroundView.getSourceBlockHTML();

    const horizontallyTransform = 0;
    const verticallyTransform =
      gameBoardRect.height - lineRect.height + sourceBlock.clientHeight;
    const startTransformTranslate = `translate(${horizontallyTransform}px, ${verticallyTransform}px)`;
    const endTransformTranslate = `translate(${0}, ${0})`;

    const COPY_PUZZLE_ANIMATION_PROPERTY = [
      { transform: startTransformTranslate },
      { transform: endTransformTranslate },
    ];

    copyWord.animate(
      COPY_PUZZLE_ANIMATION_PROPERTY,
      COPY_PUZZLE_ANIMATION_OPTIONS,
    );
  }

  private clickPuzzleHandler(): void {
    const wordsInCurrentLine = this.playground.getWordsInCurrentLine();
    wordsInCurrentLine.push(this.word);
    this.playground.checkLine();
    const words = this.playground.getWords();
    const currentRound = this.playground.getCurrentRound();
    const checkBtn = this.playgroundView.getCheckBtn();
    const copyPuzzles = this.playground.getCopyPuzzles();

    if (wordsInCurrentLine.length === words[currentRound].length) {
      checkBtn.switchDisabled();
    }

    const copyWord = this.createDuplicateWordElement();
    copyPuzzles.push(copyWord);

    copyWord.addEventListener(EVENT_NAMES.click, () => {
      this.clickPuzzleCopyHandler.bind(this, copyWord)();
    });

    this.setPuzzleAnimation(copyWord);

    copyWord.replaceWith(this.puzzle);
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.none;
    this.puzzle.classList.add(styles.puzzle_placeholder);

    const wordLines = this.playground.getWordLinesHTML();
    wordLines[currentRound].append(copyWord);
  }

  private createHTML(word: string): HTMLDivElement {
    this.puzzle = createBaseElement({
      tag: 'div',
      cssClasses: [styles.puzzle],
      attributes: {},
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
