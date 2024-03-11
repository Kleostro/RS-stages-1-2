import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import PuzzleComponent from '../../entities/puzzle/Puzzle.ts';
import randomIndex from './types/constants.ts';
import ButtonComponent from '../../shared/button/Button.ts';
import type Api from '../../shared/api/Api.ts';
import API_URLS from '../../shared/api/types/constants.ts';
import type {
  levelInfo,
  wordsInfo,
} from '../../shared/api/types/interfaces.ts';
import EVENT_NAMES from '../../shared/types/enums.ts';

class PlaygroundComponent {
  private api: Api;

  public gameBoard: HTMLDivElement | null;

  public sourceBlock: HTMLDivElement | null;

  public currentLine: string[] = [];

  public linesArr: HTMLDivElement[] = [];

  public continueBtn: ButtonComponent;

  public checkBtn: ButtonComponent;

  public autocompleteBtn: ButtonComponent;

  public words: string[][];

  public copyPuzzles: HTMLDivElement[] = [];

  public currentRound = 0;

  private currentRoundLvl = 0;

  private currentLvl = 1;

  private playground: HTMLDivElement;

  private randomWords: string[][] = [];

  private puzzles: PuzzleComponent[][] = [];

  constructor(api: Api) {
    this.api = api;
    this.words = [];
    this.gameBoard = null;
    this.sourceBlock = null;
    this.continueBtn = this.createContinueBtn();
    this.checkBtn = this.createCheckBtn();
    this.autocompleteBtn = this.createAutocompleteBtn();
    this.playground = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.playground;
  }

  private getWords(data: levelInfo): string[][] {
    const words: string[][] = [];
    const currentWords = data.rounds[this.currentRoundLvl].words;

    currentWords.forEach((word: wordsInfo) => {
      words.push(word.textExample.split(' '));
    });
    return words;
  }

  private async setWords(): Promise<string[][]> {
    const url = `${API_URLS.levelData}${this.currentLvl}.json`;

    await this.api
      .getData(url)
      .then((data) => {
        const words = this.getWords(data);
        return words;
      })
      .then((words) => {
        this.words = words;
        return words;
      })
      .catch(() => {});
    return this.words;
  }

  private getShuffledWords(): string[][] {
    if (this.words instanceof Array) {
      this.randomWords = this.words.map((wordArr: string[]) =>
        [...wordArr].sort(() => Math.random() - randomIndex),
      );
    }
    return this.randomWords;
  }

  public checkLine(): void {
    if (
      this.currentLine.length === this.words[this.currentRound].length &&
      this.currentLine.every(
        (word, index) => this.words[this.currentRound][index] === word,
      )
    ) {
      this.continueBtn.switchDisabled();
    }
  }

  private checkMatchingPuzzles(): void {
    this.currentLine.forEach((word, index) => {
      const isMatching = word === this.words[this.currentRound][index];
      this.copyPuzzles[index].classList.toggle(
        styles.copy_puzzle__error,
        !isMatching,
      );
      this.copyPuzzles[index].classList.toggle(
        styles.copy_puzzle__success,
        isMatching,
      );
      this.continueBtn
        .getHTML()
        .classList.toggle(styles.btn__hidden, !isMatching);
      this.checkBtn.getHTML().classList.toggle(styles.btn__hidden, isMatching);
      this.autocompleteBtn.getHTML().disabled = isMatching;
    });
  }

  private autoCompleteLine(): void {
    this.linesArr[this.currentRound].innerHTML = '';

    this.words[this.currentRound].forEach((word) => {
      const puzzle = new PuzzleComponent(word, this);
      this.linesArr[this.currentRound].appendChild(puzzle.getHTML());
    });

    this.checkBtn.getHTML().disabled = false;
    this.continueBtn.getHTML().disabled = false;
    this.startNextRound();
  }

  private startNextLvl(): void {
    this.currentRoundLvl += 1;
    this.currentRound = 0;
    this.currentLine = [];
    this.puzzles = [];
    this.linesArr = [];

    if (this.sourceBlock && this.gameBoard) {
      this.sourceBlock.innerHTML = '';
      this.gameBoard.innerHTML = '';
    }

    this.setWords()
      .then(() => {
        this.getShuffledWords();
        this.createLines();
        this.createPuzzleElements();
        this.startNextRound();
      })
      .catch(() => {});
  }

  private startNextRound(): void {
    this.currentRound += 1;
    this.continueBtn.getHTML().classList.add(styles.btn__hidden);
    this.checkBtn.getHTML().classList.remove(styles.btn__hidden);

    if (this.currentRound === this.words.length) {
      this.startNextLvl();
      return;
    }
    this.currentLine = [];
    this.continueBtn.switchDisabled();
    this.checkBtn.switchDisabled();
    this.autocompleteBtn.getHTML().disabled = false;

    this.copyPuzzles.forEach((copyWord) => {
      copyWord.classList.remove(styles.copy_puzzle__success);
      copyWord.classList.remove(styles.copy_puzzle__error);
    });

    this.copyPuzzles = [];

    if (this.sourceBlock) {
      this.sourceBlock.innerHTML = '';
    }

    this.puzzles[this.currentRound].forEach((puzzle) => {
      this.sourceBlock?.append(puzzle.getHTML());
    });
  }

  private createPuzzleElements(): PuzzleComponent[][] {
    if (!(this.randomWords instanceof Array)) {
      return [];
    }

    this.randomWords.forEach((wordsLine: string[]) => {
      const lineArr: PuzzleComponent[] = [];

      wordsLine.forEach((word) => {
        const puzzle = new PuzzleComponent(word, this);
        lineArr.push(puzzle);
      });

      this.puzzles.push(lineArr);
    });

    return this.puzzles;
  }

  private createLines(): void {
    this.words.forEach(() => {
      const lineElem = createBaseElement({
        tag: 'div',
        cssClasses: [styles.line],
      });

      this.linesArr.push(lineElem);

      this.gameBoard?.append(lineElem);
    });
  }

  private createContinueBtn(): ButtonComponent {
    this.continueBtn = new ButtonComponent(
      'button',
      [styles.continue_btn, styles.btn__hidden],
      {},
      {
        key: EVENT_NAMES.click,
        value: (): void => {
          this.startNextRound();
        },
      },
    );

    const textContent = 'Continue';
    this.continueBtn.getHTML().textContent = textContent;
    this.continueBtn.switchDisabled();
    return this.continueBtn;
  }

  private createCheckBtn(): ButtonComponent {
    this.checkBtn = new ButtonComponent(
      'button',
      [styles.check_btn],
      {},
      {
        key: EVENT_NAMES.click,
        value: (): void => {
          this.checkMatchingPuzzles();
        },
      },
    );

    const textContent = 'Check';
    this.checkBtn.getHTML().textContent = textContent;
    this.checkBtn.switchDisabled();
    return this.checkBtn;
  }

  private createAutocompleteBtn(): ButtonComponent {
    this.autocompleteBtn = new ButtonComponent(
      'button',
      [styles.autocomplete_btn],
      {},
      {
        key: EVENT_NAMES.click,
        value: (): void => {
          this.autoCompleteLine();
        },
      },
    );

    const textContent = 'Autocomplete';
    this.autocompleteBtn.getHTML().textContent = textContent;
    return this.autocompleteBtn;
  }

  private createHTML(): HTMLDivElement {
    this.playground = createBaseElement({
      tag: 'div',
      cssClasses: [styles.playground],
    });

    this.gameBoard = createBaseElement({
      tag: 'div',
      cssClasses: [styles.game_board],
    });

    this.sourceBlock = createBaseElement({
      tag: 'div',
      cssClasses: [styles.source_data],
    });

    this.playground.append(
      this.gameBoard,
      this.sourceBlock,
      this.continueBtn.getHTML(),
      this.checkBtn.getHTML(),
      this.autocompleteBtn.getHTML(),
    );

    this.setWords()
      .then(() => {
        this.getShuffledWords();
        this.createLines();
        this.createPuzzleElements();

        this.puzzles[this.currentRound].forEach((puzzle) => {
          this.sourceBlock?.append(puzzle.getHTML());
        });
      })
      .catch(() => {});

    return this.playground;
  }
}

export default PlaygroundComponent;
