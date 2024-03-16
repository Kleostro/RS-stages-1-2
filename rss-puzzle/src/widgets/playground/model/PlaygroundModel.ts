import { EVENT_NAMES, TAG_NAMES } from '../../../shared/types/enums.ts';
import type {
  CompletedRound,
  levelInfo,
  wordsInfo,
} from '../../../pages/choiceGamePage/types/interfaces.ts';
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
import isNewData from '../../../utils/isNewData.ts';
import STORE_KEYS from '../../../app/Storage/types/enums.ts';
import API_URLS from '../../../pages/choiceGamePage/types/constants.ts';
import formattedText from '../../../utils/formattedText.ts';
import { PAGES_IDS } from '../../../pages/types/enums.ts';

class PlaygroundModel {
  private storage: StorageModel;

  private view: PlaygroundView;

  private gameData: levelInfo[] = [];

  private levelData: levelInfo | null = null;

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
    this.singletonMediator = MediatorModel.getInstance();
    this.audio = this.view.getAudioElement();
    this.shuffledWords = this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.dragWrapper = this.view.getSourceBlockHTML();
    this.init();
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
    this.audio.src = this.getCurrentAudioURL();
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

  private clearRoundInfo(): void {
    this.currentRound = 0;
    this.words = [];
    this.wordsInCurrentLine = [];
    this.puzzles = [];
    this.wordLinesHTML = [];
    this.shuffledWords = [];
    this.wordsInCurrentLine = [];

    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const nextRoundBtn = this.view.getNextRoundBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    const statisticsBtn = this.view.getStatisticsBtn();
    nextRoundBtn.getHTML().classList.add(styles.btn__hidden);
    checkBtn.getHTML().classList.remove(styles.btn__hidden);
    autoCompleteBtn.getHTML().classList.remove(styles.btn__hidden);
    statisticsBtn.getHTML().classList.add(styles.btn__hidden);
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    autoCompleteBtn.setEnabled();
  }

  private setCurrentWords(): void {
    const currentWords = this.levelData?.rounds[this.currentRoundLvl].words;
    currentWords?.forEach((word: wordsInfo) => {
      this.words.push(word.textExample.split(' '));
    });
  }

  private checkLimitSaveGame(): void {
    if (this.levelData && this.currentRoundLvl === this.levelData.roundsCount) {
      this.lvl = this.lvl === this.gameData.length - 1 ? 0 : (this.lvl += 1);
      this.levelData = this.gameData[this.lvl];
      this.currentRoundLvl = 0;
    }
  }

  private redrawPlayground(): void {
    this.view.getGameBoardHTML().classList.remove(styles.game_board__complete);
    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.setCurrentWords();
    this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.createPuzzleElements();
    this.fillSourcedBlock();
    this.setDragListenersToNextRound();
    this.setTranslateSentence();
    this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.auto;
  }

  private setTranslateSentence(): string {
    let translateSentence =
      this.levelData?.rounds[this.currentRoundLvl].words[this.currentRound]
        .textExampleTranslate;

    if (!translateSentence) {
      translateSentence = '';
    }

    this.translateSentence = translateSentence;
    return this.translateSentence;
  }

  private shuffleWords(): string[][] {
    this.shuffledWords = this.words.map((wordArr: string[]) =>
      [...wordArr].sort(() => Math.random() - randomIndex),
    );

    return this.shuffledWords;
  }

  private saveCompletedRound(): void {
    let completedRounds: CompletedRound[] =
      this.storage.get<CompletedRound[]>(STORE_KEYS.COMPLETED_ROUND) || [];

    if (!completedRounds) {
      completedRounds = [];
    }

    const formattedLVL = this.lvl + 1;

    const completedRoundData = {
      lvl: formattedLVL,
      round: this.currentRoundLvl,
    };
    completedRounds.push(completedRoundData);
    this.storage.add(
      STORE_KEYS.COMPLETED_ROUND,
      JSON.stringify(completedRounds),
    );
    this.singletonMediator.notify(AppEvents.newCompletedRound, '');
  }

  private saveLastRound(): void {
    const lastRoundData = {
      currentLVL: this.lvl + 1,
      currentRound: this.currentRoundLvl + 1,
      gameData: this.gameData,
    };
    this.storage.add(STORE_KEYS.LAST_ROUND, JSON.stringify(lastRoundData));
  }

  private checkLimitGames(): void {
    if (
      this.levelData &&
      this.currentRoundLvl === this.levelData.roundsCount - 1
    ) {
      this.lvl = this.lvl === this.gameData.length - 1 ? 0 : (this.lvl += 1);
      this.levelData = this.gameData[this.lvl];
      this.currentRoundLvl = 0;
    } else {
      this.currentRoundLvl += 1;
    }
  }

  private setGameData(data: unknown): void {
    if (isNewData(data)) {
      this.lvl = data.currentLVL - 1;
      this.currentRoundLvl = data.currentRound;
      this.gameData = data.gameData;
      this.levelData = data.gameData[this.lvl];
      this.checkLimitSaveGame();
      this.clearRoundInfo();
      this.redrawPlayground();
    }
  }

  private startNextLine(): void {
    const checkBtn = this.view.getCheckBtn();
    const continueBtn = this.view.getContinueBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    const nextRoundBtn = this.view.getNextRoundBtn();
    const statisticsBtn = this.view.getStatisticsBtn();

    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();

    this.cleanAllUnmatchedPuzzles();

    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.none;

    this.currentRound += 1;

    if (this.wordLinesHTML[this.currentRound]) {
      this.wordLinesHTML[this.currentRound].style.pointerEvents =
        EVENT_ACCESSIBILITY.auto;
    }

    continueBtn.getHTML().classList.add(styles.btn__hidden);
    nextRoundBtn.getHTML().classList.add(styles.btn__hidden);
    statisticsBtn.getHTML().classList.add(styles.btn__hidden);
    checkBtn.getHTML().classList.remove(styles.btn__hidden);

    if (this.currentRound === this.words.length) {
      this.endRound();
      return;
    }

    this.setDragListenersToNextRound();
    this.setTranslateSentence();
    this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
    this.wordsInCurrentLine = [];
    continueBtn.setDisabled();
    checkBtn.setDisabled();
    autoCompleteBtn.setEnabled();
    this.view.clearSourceBlockHTML();
    this.fillSourcedBlock();
  }

  private startNextRound(): void {
    this.view.getGameBoardHTML().classList.remove(styles.game_board__complete);
    this.view.getCheckBtn().setDisabled();
    this.view.getCheckBtn().getHTML().classList.remove(styles.btn__hidden);
    this.view.getNextRoundBtn().getHTML().classList.add(styles.btn__hidden);
    const autoCompleteBtn = this.view.getAutocompleteBtn();
    autoCompleteBtn.setEnabled();
    this.saveCompletedRound();
    this.clearRoundInfo();
    this.checkLimitGames();
    this.redrawPlayground();
  }

  private endRound(): void {
    this.saveCompletedRound();
    this.saveLastRound();
    this.createContentForCompleteRound();

    const continueBtn = this.view.getContinueBtn().getHTML();
    continueBtn.classList.add(styles.btn__hidden);

    const checkBtn = this.view.getCheckBtn().getHTML();
    checkBtn.classList.add(styles.btn__hidden);

    const nextRoundBtn = this.view.getNextRoundBtn().getHTML();
    nextRoundBtn.classList.remove(styles.btn__hidden);

    const statisticsBtn = this.view.getStatisticsBtn().getHTML();
    statisticsBtn.classList.remove(styles.btn__hidden);

    const autoCompleteBtn = this.view.getAutocompleteBtn().getHTML();
    autoCompleteBtn.classList.add(styles.btn__hidden);
  }

  private getCurrentAudioURL(): string {
    const currentAudioSrc =
      this.levelData?.rounds[this.currentRoundLvl].words[this.currentRound]
        .audioExample;

    const url = `${AUDIO_SRC}${currentAudioSrc}`;
    return url;
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

  private createContentForCompleteRound(): void {
    const imgSrc = `${API_URLS.cutImg}${this.levelData?.rounds[this.currentRoundLvl].levelData.imageSrc}`;

    const titleTextContent =
      this.levelData?.rounds[this.currentRoundLvl].levelData.author ?? '';
    const pictureNameText =
      this.levelData?.rounds[this.currentRoundLvl].levelData.name ?? '';
    const pictureYearText =
      this.levelData?.rounds[this.currentRoundLvl].levelData.year ?? '';

    const formattedTitle = formattedText(titleTextContent);
    const formattedPictureName = formattedText(pictureNameText);
    const formattedPictureYear = formattedText(pictureYearText);

    const imgInfo = `- ${formattedPictureName} (${formattedPictureYear})`;

    const gameBoardHTML = this.view.getGameBoardHTML();
    const title = this.view.getRoundTitle();
    const description = this.view.getRoundDescription();
    const imgWrapper = this.view.getRoundImgWrapper();
    const img = new Image();
    gameBoardHTML.classList.add(styles.game_board__complete);
    img.src = imgSrc;
    img.alt = imgInfo;
    title.textContent = formattedTitle;
    description.textContent = imgInfo;
    imgWrapper.innerHTML = '';
    imgWrapper.append(img);

    this.view.clearGameBoardHTML();
    gameBoardHTML.append(imgWrapper, title, description);
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
    const nextRoundBtnHTML = this.view.getNextRoundBtn();
    const autoCompleteBtn = this.view.getAutocompleteBtn();

    continueBtnHTML.getHTML().classList.remove(styles.btn__hidden);
    nextRoundBtnHTML.getHTML().classList.add(styles.btn__hidden);
    checkBtnHTML.getHTML().classList.add(styles.btn__hidden);

    autoCompleteBtn.setDisabled();
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
    const nextRoundBtnHTML = this.view.getNextRoundBtn().getHTML();
    const statisticsBtnHTML = this.view.getStatisticsBtn().getHTML();

    checkBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.checkMatchingPuzzles.bind(this),
    );

    continueBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextLine.bind(this),
    );

    autoCompleteBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.autoCompleteLine.bind(this),
    );

    nextRoundBtnHTML.addEventListener(
      EVENT_NAMES.click,
      this.startNextRound.bind(this),
    );

    statisticsBtnHTML.addEventListener(EVENT_NAMES.click, () => {
      this.singletonMediator.notify(AppEvents.changeHash, PAGES_IDS.STATISTICS);
    });
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
    this.singletonMediator.subscribe(
      AppEvents.switchTranslateVisible,
      this.switchVisibleTranslateSentence.bind(this),
    );
    this.singletonMediator.subscribe(
      AppEvents.switchListenVisible,
      this.switchVisibleTranslateListen.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.newGame,
      this.setGameData.bind(this),
    );

    this.setHandlersToButtons();
    this.setDragsForSourceBlock();
    this.switchInitialTranslateSentence();
    this.switchInitialTranslateListen();

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
}

export default PlaygroundModel;
