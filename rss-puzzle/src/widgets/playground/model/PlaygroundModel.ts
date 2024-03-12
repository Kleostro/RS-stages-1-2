import { EVENT_NAMES, TAG_NAMES } from '../../../shared/types/enums.ts';
import type { wordsInfo } from '../../../shared/api/types/interfaces.ts';
import PlaygroundApi from '../api/PlaygroundApi.ts';
import { EVENT_ACCESSIBILITY, randomIndex } from '../types/constants.ts';
import PlaygroundView from '../ui/PlaygroundView.ts';
import styles from '../ui/style.module.scss';
import PuzzleComponent from '../../../entities/puzzle/Puzzle.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';

class PlaygroundModel {
  private view: PlaygroundView;

  private api: PlaygroundApi;

  private words: string[][] = [];

  private shuffledWords: string[][];

  private currentRoundLvl = 0;

  private currentRound = 0;

  private wordsInCurrentLine: string[] = [];

  private puzzles: PuzzleComponent[][] = [];

  private wordLinesHTML: HTMLDivElement[] = [];

  private dragWrapper: ParentNode | null = null;

  constructor() {
    this.view = new PlaygroundView();
    this.api = new PlaygroundApi();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.init();
    this.setHandlersToButtons();
    this.setDragsForSourceBlock();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  public getView(): PlaygroundView {
    return this.view;
  }

  public getWordsInCurrentLine(): string[] {
    return this.wordsInCurrentLine;
  }

  public setWordsInCurrentLine(words: string[]): void {
    this.wordsInCurrentLine = words;
  }

  public getWordLinesHTML(): HTMLDivElement[] {
    return this.wordLinesHTML;
  }

  public getCurrentRound(): number {
    return this.currentRound;
  }

  public getWords(): string[][] {
    return this.words;
  }

  public getPuzzles(): PuzzleComponent[][] {
    return this.puzzles;
  }

  private setDragsForSourceBlock(): void {
    const sourceBlock = this.view.getSourceBlockHTML();

    sourceBlock.addEventListener('dragover', (event) => event.preventDefault());

    sourceBlock.addEventListener('dragenter', () => {
      if (this.dragWrapper === sourceBlock) {
        return;
      }
      sourceBlock.classList.add(styles.line_hovered);
    });

    sourceBlock.addEventListener('dragleave', () => {
      if (this.dragWrapper === sourceBlock) {
        return;
      }
      sourceBlock.classList.remove(styles.line_hovered);
    });

    sourceBlock.addEventListener('drop', (event: DragEvent) => {
      if (this.dragWrapper === sourceBlock) {
        return;
      }
      this.setDragDrop(event, sourceBlock);
    });
  }

  private checkLine(): boolean {
    if (
      this.wordsInCurrentLine.length === this.words[this.currentRound].length &&
      this.wordsInCurrentLine.every(
        (word, index) => this.words[this.currentRound][index] === word,
      )
    ) {
      const continueBtn = this.view.getContinueBtn();
      continueBtn.setEnabled();
      return true;
    }
    return false;
  }

  private async setWords(): Promise<string[][]> {
    this.words = [];
    const levelData = await this.api.getLevelData();
    const currentWords = levelData.rounds[this.currentRoundLvl].words;

    currentWords.forEach((word: wordsInfo) => {
      this.words.push(word.textExample.split(' '));
    });

    return this.words;
  }

  private shuffleWords(): string[][] {
    this.shuffledWords = this.words.map((wordArr: string[]) =>
      [...wordArr].sort(() => Math.random() - randomIndex),
    );

    return this.shuffledWords;
  }

  private startNextLvl(): void {
    this.currentRoundLvl += 1;
    this.currentRound = 0;
    this.wordsInCurrentLine = [];
    this.puzzles = [];
    this.wordLinesHTML = [];

    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.init();
  }

  private incrementCurrentRound(): void {
    this.currentRound += 1;
  }

  private checkMatchingPuzzles(): void {
    this.wordsInCurrentLine.forEach((word, index) => {
      const isMatching = word === this.words[this.currentRound][index];
      const currentLine = this.wordLinesHTML[this.currentRound];
      const currentLineChildren = Array.from(currentLine.children);

      currentLineChildren[index].classList.toggle(
        styles.copy_puzzle__error,
        !isMatching,
      );
      currentLineChildren[index].classList.toggle(
        styles.copy_puzzle__success,
        isMatching,
      );

      const continueBtnHTML = this.view.getContinueBtn().getHTML();
      const checkBtnHTML = this.view.getCheckBtn().getHTML();
      this.view.getCheckBtn().setDisabled();
      const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();

      continueBtnHTML.classList.toggle(styles.btn__hidden, !this.checkLine());
      checkBtnHTML.classList.toggle(styles.btn__hidden, this.checkLine());
      autoCompleteBtnHTML.disabled = this.checkLine();
    });
  }

  private cleanAllUnmatchedPuzzles(): void {
    const currentLine = this.wordLinesHTML[this.currentRound];
    const currentLineChildren = Array.from(currentLine.children);
    currentLineChildren.forEach((children) => {
      children.classList.remove(
        styles.copy_puzzle__success,
        styles.copy_puzzle__error,
      );
    });
  }

  private startNextRound(): void {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();

    this.cleanAllUnmatchedPuzzles();

    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.none;

    this.incrementCurrentRound();

    this.puzzles[this.currentRound].forEach((puzzle) => {
      const currentPuzzle = puzzle.getHTML();
      const puzzleWord = puzzle.getWord();
      currentPuzzle.addEventListener('dragstart', (event: DragEvent) => {
        this.setDragStartForPuzzle(currentPuzzle, event, puzzleWord);
        const parent = currentPuzzle.parentElement;

        if (parent) {
          this.dragWrapper = parent;
        }
      });
      currentPuzzle.addEventListener('dragend', () => {
        this.setDragEndForPuzzle(currentPuzzle);
      });
    });

    if (this.wordLinesHTML[this.currentRound]) {
      this.wordLinesHTML[this.currentRound].style.pointerEvents =
        EVENT_ACCESSIBILITY.auto;
    }

    continueBtn.getHTML().classList.add(styles.btn__hidden);
    checkBtn.getHTML().classList.remove(styles.btn__hidden);

    if (this.currentRound === this.words.length) {
      this.startNextLvl();
      return;
    }
    this.wordsInCurrentLine = [];
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    autoCompleteBtn.setEnabled();
    this.view.clearSourceBlockHTML();
    this.fillSourcedBlock();
  }

  private autoCompleteLine(): void {
    this.wordLinesHTML[this.currentRound].innerHTML = '';
    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.none;
    this.view.clearSourceBlockHTML();

    this.words[this.currentRound].forEach((word) => {
      const puzzle = new PuzzleComponent(word, this, this.view);
      this.wordLinesHTML[this.currentRound].appendChild(puzzle.getHTML());
    });
    const checkBtnHTML = this.view.getCheckBtn();
    const continueBtnHTML = this.view.getContinueBtn();

    continueBtnHTML.getHTML().classList.remove(styles.btn__hidden);
    checkBtnHTML.getHTML().classList.add(styles.btn__hidden);
    checkBtnHTML.setEnabled();
    continueBtnHTML.setEnabled();
  }

  private setHandlersToButtons(): void {
    const checkBtnHTML = this.view.getCheckBtn().getHTML();
    const continueBtnHTML = this.view.getContinueBtn().getHTML();
    const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();

    checkBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.checkMatchingPuzzles.bind(this),
    );

    continueBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextRound.bind(this),
    );

    autoCompleteBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.autoCompleteLine.bind(this),
    );
  }

  private createWordLines(): HTMLDivElement[] {
    this.shuffledWords.forEach(() => {
      const wordsLine = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles.line],
      });

      wordsLine.style.pointerEvents = EVENT_ACCESSIBILITY.none;
      this.wordLinesHTML.push(wordsLine);

      wordsLine.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      wordsLine.addEventListener('dragenter', () => {
        wordsLine.classList.add(styles.line_hovered);
      });

      wordsLine.addEventListener('dragleave', () => {
        wordsLine.classList.remove(styles.line_hovered);
      });

      wordsLine.addEventListener('drop', (event: DragEvent) => {
        this.setDragDrop(event, wordsLine);
      });
    });

    this.view.getGameBoardHTML().append(...this.wordLinesHTML);

    return this.wordLinesHTML;
  }

  private setDragDrop(event: DragEvent, element: HTMLElement): void {
    if (this.dragWrapper === element) {
      return;
    }
    if (event.dataTransfer) {
      element.classList.remove(styles.line_hovered);

      const draggedElementId = event.dataTransfer.getData('id');
      const index = this.puzzles[this.currentRound].findIndex(
        (puz) => puz.getHTML().id === draggedElementId,
      );

      if (index !== -1) {
        const puzzle = this.puzzles[this.currentRound][index];
        this.puzzles[this.currentRound].splice(index, 1);
        puzzle.clickPuzzleHandler();
        element.append(puzzle.getHTML());
        this.puzzles[this.currentRound].push(puzzle);
      }
    }
  }

  private createPuzzleElements(): PuzzleComponent[][] {
    this.shuffledWords.forEach((wordsLine: string[]) => {
      const lineArr: PuzzleComponent[] = [];

      wordsLine.forEach((word) => {
        const puzzle = new PuzzleComponent(word, this, this.view);
        lineArr.push(puzzle);
      });

      this.puzzles.push(lineArr);
    });

    return this.puzzles;
  }

  private fillSourcedBlock(): void {
    const sourcedBlockHTML = this.view.getSourceBlockHTML();
    this.puzzles[this.currentRound].forEach((puzzle) => {
      sourcedBlockHTML.append(puzzle.getHTML());
    });
  }

  private setDragStartForPuzzle(
    currentPuzzle: HTMLElement,
    event: DragEvent,
    puzzleWord: string,
  ): void {
    const { target } = event;
    this.wordLinesHTML[this.currentRound].classList.add(styles.line_hovered);

    if (event.dataTransfer && target instanceof HTMLElement && target.id) {
      event.dataTransfer.setData('id', puzzleWord);
    }
    currentPuzzle.classList.add(styles.puzzle_placeholder);
  }

  private setDragEndForPuzzle(currentPuzzle: HTMLElement): void {
    this.wordLinesHTML[this.currentRound].classList.remove(styles.line_hovered);
    currentPuzzle.classList.remove(styles.puzzle_placeholder);
  }

  private init(): void {
    this.setWords()
      .then(() => {
        this.shuffleWords();
        this.createWordLines();
        this.wordLinesHTML[this.currentRound].style.pointerEvents =
          EVENT_ACCESSIBILITY.auto;
        this.createPuzzleElements();
        this.fillSourcedBlock();

        this.puzzles[this.currentRound].forEach((puzzle) => {
          const currentPuzzle = puzzle.getHTML();
          const puzzleWord = puzzle.getWord();
          currentPuzzle.addEventListener('dragstart', (event: DragEvent) => {
            this.setDragStartForPuzzle(currentPuzzle, event, puzzleWord);
            const parent = currentPuzzle.parentNode;
            if (parent) {
              this.dragWrapper = parent;
            }
          });
          currentPuzzle.addEventListener('dragend', () => {
            this.setDragEndForPuzzle(currentPuzzle);
          });
        });
      })
      .catch(() => {});
  }
}

export default PlaygroundModel;
