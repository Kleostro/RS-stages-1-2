import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import PuzzleComponent from '../../entities/puzzle/Puzzle.ts';
import randomIndex from './types/constants.ts';

class PlaygroundComponent {
  public gameBoard: HTMLDivElement | null;

  public sourceBlock: HTMLDivElement | null;

  private playground: HTMLDivElement;

  private words: string[][];

  private puzzles: PuzzleComponent[][] = [];

  constructor(words: string[][]) {
    this.words = words;
    this.gameBoard = null;
    this.sourceBlock = null;
    this.playground = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.playground;
  }

  private getShuffledWords(): string[][] {
    if (this.words instanceof Array) {
      this.words.forEach((wordArr: string[]) =>
        wordArr.sort(() => Math.random() - randomIndex),
      );
    }
    return this.words;
  }

  private createPuzzleElements(): PuzzleComponent[][] {
    if (!(this.words instanceof Array)) {
      return [];
    }

    this.words.forEach((wordsLine: string[]) => {
      const lineArr: PuzzleComponent[] = [];

      wordsLine.forEach((word) => {
        const puzzle = new PuzzleComponent(word, this);
        lineArr.push(puzzle);
      });

      this.puzzles.push(lineArr);
    });

    return this.puzzles;
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

    this.playground.append(this.gameBoard, this.sourceBlock);

    this.getShuffledWords();
    this.createPuzzleElements();

    this.puzzles[0].forEach((puzzle) => {
      this.sourceBlock?.append(puzzle.getHTML());
    });

    return this.playground;
  }
}

export default PlaygroundComponent;
