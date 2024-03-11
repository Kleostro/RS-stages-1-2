import { EVENT_NAMES, TAG_NAMES } from '../../../shared/types/enums.ts';
import type { wordsInfo } from '../../../shared/api/types/interfaces.ts';
import PlaygroundApi from '../api/PlaygroundApi.ts';
import { randomIndex } from '../types/constants.ts';
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

  private copyPuzzles: HTMLDivElement[] = [];

  private wordLinesHTML: HTMLDivElement[] = [];

  constructor() {
    this.view = new PlaygroundView();
    this.api = new PlaygroundApi();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.view.getHTML();
  }

  public getWordsInCurrentLine(): string[] {
    return this.wordsInCurrentLine;
  }

  public setWordsInCurrentLine(words: string[]): void {
    this.wordsInCurrentLine = words;
  }

  public getCopyPuzzles(): HTMLDivElement[] {
    return this.copyPuzzles;
  }

  public setCopyPuzzles(copyPuzzles: HTMLDivElement[]): void {
    this.copyPuzzles = copyPuzzles;
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

  public checkLine(): void {
    if (
      this.wordsInCurrentLine.length === this.words[this.currentRound].length &&
      this.wordsInCurrentLine.every(
        (word, index) => this.words[this.currentRound][index] === word,
      )
    ) {
      const continueBtn = this.view.getContinueBtn();
      continueBtn.switchDisabled();
    }
  }

  private async setWords(): Promise<string[][]> {
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

    this.setWords()
      .then(() => {
        this.shuffleWords();
        this.createWordLines();
        this.startNextRound();
      })
      .catch(() => {});
  }

  private incrementCurrentRound(): void {
    this.currentRound += 1;
  }

  private checkMatchingPuzzles(): void {
    this.wordsInCurrentLine.forEach((word, index) => {
      const isMatching = word === this.words[this.currentRound][index];
      const copyPuzzle = this.copyPuzzles[index];

      copyPuzzle.classList.toggle(styles.copy_puzzle__error, !isMatching);
      copyPuzzle.classList.toggle(styles.copy_puzzle__success, isMatching);

      const continueBtnHTML = this.view.getContinueBtn().getHTML();
      const checkBtnHTML = this.view.getCheckBtn().getHTML();
      const autoCompleteBtnHTML = this.view.getAutocompleteBtn().getHTML();

      continueBtnHTML.classList.toggle(styles.btn__hidden, !isMatching);
      checkBtnHTML.classList.toggle(styles.btn__hidden, isMatching);
      autoCompleteBtnHTML.disabled = isMatching;
    });
  }

  private startNextRound(): void {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    this.incrementCurrentRound();

    continueBtn.getHTML().classList.add(styles.btn__hidden);
    checkBtn.getHTML().classList.remove(styles.btn__hidden);

    if (this.currentRound === this.words.length) {
      this.startNextLvl();
      return;
    }

    this.wordsInCurrentLine = [];
    continueBtn.switchDisabled();
    checkBtn.switchDisabled();
    autoCompleteBtn.setEnabled();

    this.copyPuzzles.forEach((copyWord) => {
      copyWord.classList.remove(
        styles.copy_puzzle__success,
        styles.copy_puzzle__error,
      );
    });

    this.copyPuzzles = [];
    this.view.clearSourceBlockHTML();
    this.fillSourcedBlock();
  }

  private autoCompleteLine(): void {
    this.wordLinesHTML[this.currentRound].innerHTML = '';

    this.words[this.currentRound].forEach((word) => {
      const puzzle = new PuzzleComponent(word, this, this.view);
      this.wordLinesHTML[this.currentRound].appendChild(puzzle.getHTML());
    });
    const checkBtnHTML = this.view.getCheckBtn();
    const continueBtnHTML = this.view.getContinueBtn();

    checkBtnHTML.setEnabled();
    continueBtnHTML.setEnabled();
    this.startNextRound();
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
    this.words.forEach(() => {
      const wordsLine = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles.line],
      });

      this.wordLinesHTML.push(wordsLine);
    });

    this.view.getGameBoardHTML().append(...this.wordLinesHTML);

    return this.wordLinesHTML;
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
    this.puzzles[this.currentRound].forEach((puzzle) => {
      this.view.getSourceBlockHTML().append(puzzle.getHTML());
    });
  }

  private init(): void {
    this.setWords()
      .then(() => {
        this.shuffleWords();
        this.createWordLines();
        this.createPuzzleElements();
        this.setHandlersToButtons();
        this.fillSourcedBlock();
      })
      .catch(() => {});
  }
}

export default PlaygroundModel;
