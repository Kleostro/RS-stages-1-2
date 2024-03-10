import type PlaygroundComponent from '@/widgets/playground/Playground.ts';
import EVENT_NAMES from '../../shared/types/enums.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import {
  PUZZLE_STYLE,
  COPY_PUZZLE_ANIMATION_OPTIONS,
} from './types/constans.ts';

class PuzzleComponent {
  private puzzle: HTMLDivElement;

  private word: string;

  private playground: PlaygroundComponent;

  constructor(word: string, playground: PlaygroundComponent) {
    this.word = word;
    this.playground = playground;
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
    this.playground.currentLine = this.playground.currentLine.filter(
      (word) => word !== this.word,
    );
    const continueBtn = this.playground.continueBtn.getHTML();
    continueBtn.disabled = true;
    this.playground.checkLine();
    copyWord.remove();
  }

  private setPuzzleAnimation(copyWord: HTMLDivElement): void {
    if (!this.playground.sourceBlock || !this.playground.gameBoard) {
      return;
    }

    const lineRect =
      this.playground.linesArr[
        this.playground.currentRound
      ].getBoundingClientRect();

    const gameBoardRect = this.playground.gameBoard.getBoundingClientRect();

    const horizontallyTransform = 0;
    const verticallyTransform =
      gameBoardRect.height -
      lineRect.height +
      this.playground.sourceBlock.clientHeight;
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
    if (!this.playground.sourceBlock || !this.playground.gameBoard) {
      return;
    }

    this.playground.currentLine.push(this.word);
    this.playground.checkLine();

    const copyWord = this.createDuplicateWordElement();
    copyWord.addEventListener(EVENT_NAMES.click, () => {
      this.clickPuzzleCopyHandler.bind(this, copyWord)();
    });

    this.setPuzzleAnimation(copyWord);

    copyWord.replaceWith(this.puzzle);
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.none;
    this.puzzle.classList.add(styles.puzzle_placeholder);

    this.playground.linesArr[this.playground.currentRound].append(copyWord);
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
