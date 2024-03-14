import { EVENT_NAMES, TAG_NAMES } from '../../../shared/types/enums.ts';
import type {
  levelInfo,
  wordsInfo,
} from '../../../shared/api/types/interfaces.ts';
import PlaygroundApi from '../api/PlaygroundApi.ts';
import {
  AUDIO_SRC,
  EVENT_ACCESSIBILITY,
  randomIndex,
} from '../types/constants.ts';
import PlaygroundView from '../ui/PlaygroundView.ts';
import styles from '../ui/style.module.scss';
import PuzzleComponent from '../../../entities/puzzle/Puzzle.ts';
import createBaseElement from '../../../utils/createBaseElement.ts';
import MediatorModel from '../../../pages/core/mediator/model/MediatorModel.ts';
import AppEvents from '../../../pages/core/mediator/types/enums.ts';
import IMG_SRC from '../ui/imgSrc/imgSrc.ts';
import type StorageModel from '../../../app/Storage/model/StorageModel.ts';
import type NewData from '../types/interfaces.ts';
import isNewData from '../../../utils/isNewData.ts';

class PlaygroundModel {
  private storage: StorageModel;

  private view: PlaygroundView;

  private api: PlaygroundApi;

  private levelData: levelInfo;

  private audio: HTMLAudioElement;

  private singletonMediator: MediatorModel<unknown>;

  private words: string[][] = [];

  private translateSentence = '';

  private shuffledWords: string[][];

  private lvl = 1;

  private currentRoundLvl = 0;

  private currentRound = 0;

  private wordsInCurrentLine: string[] = [];

  private puzzles: PuzzleComponent[][] = [];

  private wordLinesHTML: HTMLDivElement[] = [];

  private dragWrapper: HTMLElement;

  constructor(storage: StorageModel) {
    this.storage = storage;
    this.view = new PlaygroundView();
    this.api = new PlaygroundApi();

    this.singletonMediator = MediatorModel.getInstance();
    this.singletonMediator.subscribe(
      AppEvents.switchTranslateVisible,
      this.switchVisibleTranslateSentence.bind(this),
    );
    this.singletonMediator.subscribe(
      AppEvents.switchListenVisible,
      this.switchVisibleTranslateListen.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.newRound,
      this.newData.bind(this),
    );

    this.levelData = this.setLevelData();
    this.audio = this.view.getAudioElement();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.init();
    this.setHandlersToButtons();
    this.setDragsForSourceBlock();
    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();
    this.dragWrapper = this.view.getSourceBlockHTML();

    const translateListenHTML = this.view.getTranslateListenBtn().getHTML();
    translateListenHTML.addEventListener(
      EVENT_NAMES.click,
      this.switchTranslateListen.bind(this),
    );

    this.audio.addEventListener(EVENT_NAMES.ended, () => {
      translateListenHTML.innerHTML = IMG_SRC.volumeOff;
      translateListenHTML.classList.remove(styles.translate_btn_active);
    });
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

  private switchTranslateListen(): void {
    const translateListenHTML = this.view.getTranslateListenBtn().getHTML();
    translateListenHTML.innerHTML = IMG_SRC.volumeOn;
    translateListenHTML.classList.add(styles.translate_btn_active);
    this.audio.src = this.formattedAudioURL();
    this.audio.play().catch(() => {});
  }

  private setDragsForSourceBlock(): void {
    const sourceBlock = this.view.getSourceBlockHTML();

    sourceBlock.addEventListener(EVENT_NAMES.dragOver, (event) =>
      event.preventDefault(),
    );

    sourceBlock.addEventListener(EVENT_NAMES.dragDrop, (event: DragEvent) => {
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

      const translateSentenceHTML = this.view.getTranslateSentenceHTML();
      translateSentenceHTML.classList.remove(styles.translate_sentence_hidden);
      const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
      translateListenBtn.classList.remove(styles.translate_listen_hidden);
      return true;
    }
    return false;
  }

  private newData(data: unknown): void {
    if (isNewData(data)) {
      const newData: NewData = data;
      this.currentRoundLvl = newData.currentRound;
      this.currentRound = 0;
      this.words = [];
      this.lvl = newData.currentLVL + 1;
      this.setLevelData();
      this.wordsInCurrentLine = [];
      this.puzzles = [];
      this.wordLinesHTML = [];
      this.shuffledWords = [];
      this.wordsInCurrentLine = [];
      const currentWords = data.gameData.words;
      currentWords.forEach((word: wordsInfo) => {
        this.words.push(word.textExample.split(' '));
      });
      this.newGame();
    }
  }

  private newGame(): void {
    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.createPuzzleElements();
    this.fillSourcedBlock();
    this.setDragListenersToNextRound();
    this.setTranslateSentence()
      .then(() => {
        this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
      })
      .catch(() => {});
    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.auto;
  }

  private setLevelData(): levelInfo {
    this.api
      .getLevelData(this.lvl)
      .then((data) => {
        this.levelData = data;
      })
      .catch(() => {});
    return this.levelData;
  }

  private async setWords(): Promise<string[][]> {
    this.words = [];
    const levelData = await this.api.getLevelData(this.lvl);
    const currentWords = levelData.rounds[this.currentRoundLvl].words;

    currentWords.forEach((word: wordsInfo) => {
      this.words.push(word.textExample.split(' '));
    });

    return this.words;
  }

  private async setTranslateSentence(): Promise<string> {
    const levelData = await this.api.getLevelData(this.lvl);
    const translateSentence =
      levelData.rounds[this.currentRoundLvl].words[this.currentRound]
        .textExampleTranslate;

    this.translateSentence = translateSentence;
    return this.translateSentence;
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
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    this.init();
  }

  private formattedAudioURL(): string {
    const currentAudioSrc =
      this.levelData.rounds[this.currentRoundLvl].words[this.currentRound]
        .audioExample;

    const url = `${AUDIO_SRC}${currentAudioSrc}`;
    return url;
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

  private setDragListenersToNextRound(): void {
    this.puzzles[this.currentRound].forEach((puzzle) => {
      const currentPuzzle = puzzle.getHTML();
      const puzzleWord = puzzle.getWord();
      currentPuzzle.addEventListener(
        EVENT_NAMES.dragStart,
        (event: DragEvent) => {
          this.setDragStartForPuzzle(currentPuzzle, event, puzzleWord);
          const parent = currentPuzzle.parentElement;

          if (parent) {
            this.dragWrapper = parent;
          }
        },
      );
      currentPuzzle.addEventListener(EVENT_NAMES.dragEnd, () => {
        this.setDragEndForPuzzle(currentPuzzle);
      });
    });
  }

  private startNextRound(): void {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();

    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();

    this.cleanAllUnmatchedPuzzles();

    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.none;

    this.incrementCurrentRound();

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

    this.setDragListenersToNextRound();
    this.setTranslateSentence()
      .then(() => {
        this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
      })
      .catch(() => {});
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

  private switchInitialTranslateSentence(): void {
    const isVisible = this.storage.get(AppEvents.switchTranslateVisible);
    const translateSentenceHTML = this.view.getTranslateSentenceHTML();
    if (typeof isVisible === 'boolean') {
      translateSentenceHTML.classList.toggle(
        styles.translate_sentence_hidden,
        isVisible,
      );
    }
  }

  private switchVisibleTranslateSentence(isVisible: unknown): void {
    const translateSentenceHTML = this.view.getTranslateSentenceHTML();

    if (typeof isVisible === 'boolean') {
      translateSentenceHTML.classList.toggle(
        styles.translate_sentence_hidden,
        !isVisible,
      );
    }
  }

  private switchInitialTranslateListen(): void {
    const isVisible = this.storage.get(AppEvents.switchListenVisible);
    const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
    if (typeof isVisible === 'boolean') {
      translateListenBtn.classList.toggle(
        styles.translate_listen_hidden,
        isVisible,
      );
    }
  }

  private switchVisibleTranslateListen(isVisible: unknown): void {
    const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
    if (typeof isVisible === 'boolean') {
      translateListenBtn.classList.toggle(
        styles.translate_listen_hidden,
        !isVisible,
      );
    }
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

      wordsLine.addEventListener(EVENT_NAMES.dragOver, (event) => {
        event.preventDefault();
      });

      wordsLine.addEventListener(EVENT_NAMES.dragDrop, (event: DragEvent) => {
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

        if (puzzle.getHTML().parentNode !== element) {
          puzzle.clickPuzzleHandler();
          element.append(puzzle.getHTML());
          this.puzzles[this.currentRound].push(puzzle);
        }
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
    const currentLine = this.wordLinesHTML[this.currentRound];
    const sourceBlock = this.view.getSourceBlockHTML();

    if (currentPuzzle.parentElement === sourceBlock) {
      currentLine.classList.add(styles.line_hovered);
    } else {
      sourceBlock.classList.add(styles.line_hovered);
    }

    if (event.dataTransfer && target instanceof HTMLElement && target.id) {
      event.dataTransfer.setData('id', puzzleWord);
    }
    currentPuzzle.classList.add(styles.puzzle_placeholder);
  }

  private setDragEndForPuzzle(currentPuzzle: HTMLElement): void {
    const currentLine = this.wordLinesHTML[this.currentRound];
    const sourceBlock = this.view.getSourceBlockHTML();

    if (currentPuzzle.parentElement === sourceBlock) {
      currentLine.classList.remove(styles.line_hovered);
    } else {
      sourceBlock.classList.remove(styles.line_hovered);
    }

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
        this.setDragListenersToNextRound();
      })
      .catch(() => {});

    this.setTranslateSentence()
      .then(() => {
        this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
      })
      .catch(() => {});
  }
}

export default PlaygroundModel;
