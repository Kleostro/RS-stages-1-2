import shuffleStringArr from '../../utils/shuffleStringArr.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import PuzzleComponent from '../../entities/puzzle/Puzzle.ts';

class PlaygroundComponent {
  private playground: HTMLDivElement;

  private words: string[][];

  private puzzles: PuzzleComponent[][] = [];

  constructor(words: string[][]) {
    this.words = words;
    this.playground = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.playground;
  }

  private getShuffledWords(): string[][] {
    this.words.forEach((wordArr) => shuffleStringArr(wordArr));
    return this.words;
  }

  private createSourceDataBlock(index: number): HTMLDivElement {
    const sourceDataBlock = createBaseElement({
      tag: 'div',
      cssClasses: [styles.sourceData],
    });

    this.puzzles[index].forEach((puzzle) => {
      sourceDataBlock.append(puzzle.getHTML());
    });
    return sourceDataBlock;
  }

  private createPuzzleElements(): PuzzleComponent[][] {
    this.words.forEach((wordsLine) => {
      const lineArr: PuzzleComponent[] = [];

      wordsLine.forEach((word) => {
        const puzzle = new PuzzleComponent(word, this.playground);
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

    this.getShuffledWords();
    this.createPuzzleElements();

    this.playground.append(this.createSourceDataBlock(0));
    return this.playground;
  }
}

export default PlaygroundComponent;
