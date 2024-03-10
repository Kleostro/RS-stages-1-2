import EVENT_NAMES from '../../shared/types/enums.ts';
import createBaseElement from '../../utils/createBaseElement.ts';
import styles from './style.module.scss';
import {
  PUZZLE_STYLE,
  PUZZLE_ANIMATION_OPTIONS,
  COPY_PUZZLE_ANIMATION_OPTIONS,
} from './types/constans.ts';

class PuzzleComponent {
  private puzzle: HTMLDivElement;

  private word: string;

  private parent: HTMLDivElement;

  constructor(word: string, parent: HTMLDivElement) {
    this.word = word;
    this.parent = parent;
    this.puzzle = this.createHTML(this.word);
  }

  public getHTML(): HTMLDivElement {
    return this.puzzle;
  }

  private createDuplicateWordElement(): HTMLDivElement {
    const copyWord = createBaseElement({
      tag: 'div',
      cssClasses: [styles.puzzle],
      attributes: {},
      innerContent: this.word,
    });
    return copyWord;
  }

  private clickHandler(): void {
    const copyWord = this.createDuplicateWordElement();
    const { y, x } = this.puzzle.getBoundingClientRect();

    const horizontallyTransform = x - this.parent.clientWidth;
    const verticallyTransform = y;

    const startTransformTranslate = `translate(${horizontallyTransform}px, ${verticallyTransform}px)`;
    const endTransformTranslate = `translate(${0}px, ${0}px)`;

    const COPY_PUZZLE_ANIMATION_PROPERTY = [
      { transform: startTransformTranslate },
      { transform: endTransformTranslate },
    ];

    copyWord.animate(
      COPY_PUZZLE_ANIMATION_PROPERTY,
      COPY_PUZZLE_ANIMATION_OPTIONS,
    );

    copyWord.replaceWith(this.puzzle);
    this.puzzle.style.pointerEvents = PUZZLE_STYLE.none;

    const PUZZLE_ANIMATION_PROPERTY = [
      { opacity: PUZZLE_STYLE.opacity_on },
      { opacity: PUZZLE_STYLE.opacity_off },
    ];

    this.puzzle.animate(PUZZLE_ANIMATION_PROPERTY, PUZZLE_ANIMATION_OPTIONS);

    this.parent.append(copyWord);
  }

  private createHTML(word: string): HTMLDivElement {
    this.puzzle = createBaseElement({
      tag: 'div',
      cssClasses: [styles.puzzle],
      attributes: {},
      innerContent: word,
    });

    this.puzzle.addEventListener(
      EVENT_NAMES.click,
      this.clickHandler.bind(this),
    );

    return this.puzzle;
  }
}

export default PuzzleComponent;
