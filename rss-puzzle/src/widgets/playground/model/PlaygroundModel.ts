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
import puzzleStyles from '../../../entities/puzzle/style.module.scss';
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
import type MapOfLineInfo from '../types/types.ts';
import type { PictureInfo } from '../types/interfaces.ts';
import shuffleArr from '../../../utils/shuffleArr.ts';

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

  private knowLines: MapOfLineInfo = new Map();

  private dontKnowLines: MapOfLineInfo = new Map();

  private imageRound: HTMLImageElement | null = null;

  private pictureInfo: PictureInfo = {
    src: '',
    title: '',
    info: '',
  };

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

  public getImageRound(): HTMLImageElement | null {
    return this.imageRound;
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

      const currentWordLine = this.wordLinesHTML[this.currentRound];
      const filterStyle = 'grayscale(0)';
      currentWordLine.style.backdropFilter = filterStyle;
      currentWordLine.style.pointerEvents = EVENT_ACCESSIBILITY.none;

      this.puzzles[this.currentRound].forEach((puzzle) => {
        const currentPuzzle = puzzle.getHTML();
        currentPuzzle.classList.remove(puzzleStyles.puzzle_placeholder);
      });

      const translateSentenceHTML = this.view.getTranslateSentenceHTML();
      translateSentenceHTML.classList.remove(styles.translate_sentence_hidden);
      const translateListenBtn = this.view.getTranslateListenBtn().getHTML();
      translateListenBtn.classList.remove(styles.translate_listen_hidden);
      this.addKnowLine();
      return true;
    }
    return false;
  }

  private addKnowLine(): void {
    const currentLine =
      this.levelData?.rounds[this.currentRoundLvl].words[this.currentRound];
    const currentLineData = {
      audioCurrentLineSrc: this.getCurrentAudioURL(),
      sentenceCurrentLine: currentLine?.textExample,
    };
    this.knowLines.set(this.currentRound, currentLineData);
  }

  private addDontKnowLine(): void {
    const currentLine =
      this.levelData?.rounds[this.currentRoundLvl].words[this.currentRound];
    const currentLineData = {
      audioCurrentLineSrc: this.getCurrentAudioURL(),
      sentenceCurrentLine: currentLine?.textExample,
    };
    this.dontKnowLines.set(this.currentRound, currentLineData);
  }

  private clearRoundInfo(): void {
    this.currentRound = 0;
    this.words = [];
    this.wordsInCurrentLine = [];
    this.puzzles = [];
    this.wordLinesHTML = [];
    this.shuffledWords = [];
    this.wordsInCurrentLine = [];
    this.knowLines.clear();
    this.dontKnowLines.clear();

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

  private checkVisibleBackgroundHint(): void {
    this.puzzles.forEach((line) => {
      line.forEach((puzzle) => {
        const currentPuzzle = puzzle.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          this.storage.get(STORE_KEYS.BACKGROUND_HINT) === false,
        );
      });
    });
  }

  private setCurrentRoundImg(): void {
    const imgRoundSrc = `${API_URLS.cutImg}${this.levelData?.rounds[this.currentRoundLvl].levelData.imageSrc}`;
    this.imageRound = new Image();
    this.imageRound.src = imgRoundSrc;
    this.imageRound.classList.add(styles.game_board__image);

    this.imageRound.onload = async (): Promise<void> => {
      const gameBoard = this.view.getGameBoardHTML();

      if (this.imageRound) {
        gameBoard.append(this.imageRound);
      }

      await this.waitForImageClientWidth();
      this.addBackgroundToPuzzle();
    };
  }

  private waitForImageClientWidth(): Promise<void> {
    return new Promise((resolve) => {
      const checkClientWidth = (): void => {
        if (this.imageRound?.clientWidth) {
          resolve();
        } else {
          const time = 100;
          setTimeout(checkClientWidth, time);
        }
      };

      checkClientWidth();
    });
  }

  private redrawPlayground(): void {
    this.view.getGameBoardHTML().classList.remove(styles.game_board__complete);
    this.view.clearGameBoardHTML();
    this.view.clearSourceBlockHTML();
    this.setCurrentWords();
    this.shuffleWords();
    this.wordLinesHTML = this.createWordLines();
    this.createPuzzleElements();
    this.checkVisibleBackgroundHint();
    this.fillSourcedBlock();
    this.setDragListenersToNextRound();
    this.setTranslateSentence();
    this.view.getTranslateSentenceHTML().innerHTML = this.translateSentence;
    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.auto;
    this.setCurrentRoundImg();
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

    this.view
      .getTranslateSentenceHTML()
      .classList.toggle(
        styles.translate_sentence_hidden,
        this.storage.get(STORE_KEYS.TRANSLATE_VISIBLE),
      );

    this.view
      .getTranslateListenBtn()
      .getHTML()
      .classList.toggle(
        styles.translate_listen_hidden,
        this.storage.get(STORE_KEYS.LISTEN_VISIBLE),
      );
  }

  private getCurrentRoundInfo(): PictureInfo {
    const imgSrc = `${API_URLS.cutImg}${this.levelData?.rounds[this.currentRoundLvl].levelData.cutSrc}`;

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
    return {
      src: imgSrc,
      title: formattedTitle,
      info: imgInfo,
    };
  }

  private endRound(): void {
    this.puzzles.forEach((line) => {
      line.forEach((puzzle) => {
        const currentPuzzle = puzzle.getHTML();
        currentPuzzle.style.backgroundImage = '';
      });
    });
    this.saveCompletedRound();
    this.saveLastRound();
    this.createContentForCompleteRound();
    this.view
      .getTranslateSentenceHTML()
      .classList.add(styles.translate_sentence_hidden);

    this.view
      .getTranslateListenBtn()
      .getHTML()
      .classList.add(styles.translate_listen_hidden);
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

    this.pictureInfo = this.getCurrentRoundInfo();

    this.singletonMediator.notify(AppEvents.endRound, [
      this.knowLines,
      this.dontKnowLines,
      this.pictureInfo,
    ]);
  }

  private getCurrentAudioURL(): string {
    const currentAudioSrc =
      this.levelData?.rounds[this.currentRoundLvl].words[this.currentRound]
        .audioExample;

    const url = `${AUDIO_SRC}${currentAudioSrc}`;
    return url;
  }

  private addBackgroundToPuzzle(): void {
    const imageWidth = this.view.getGameBoardHTML().clientWidth ?? 0;
    const imageHeight = this.view.getGameBoardHTML().clientHeight ?? 0;
    const maxLines = 10;

    this.words.forEach((line, lineIndex) => {
      line.forEach((_, puzzleIndex) => {
        this.puzzles.forEach((lineArr) => {
          lineArr.forEach((puzzle) => {
            const puzzleLine = puzzle.getHTML().getAttribute('line');
            const puzzleWord = puzzle.getHTML().getAttribute('word');
            const currentPuzzle = puzzle.getHTML();
            if (
              puzzleLine === String(lineIndex) &&
              puzzleWord === String(puzzleIndex)
            ) {
              if (!currentPuzzle.style.backgroundImage) {
                let backgroundPositionX = 0;
                let backgroundPositionY = 0;
                if (puzzleIndex > 0) {
                  backgroundPositionX = -(
                    puzzleIndex *
                    (imageWidth / line.length)
                  );
                }
                if (lineIndex > 0) {
                  backgroundPositionY = -(lineIndex * (imageHeight / maxLines));
                }

                currentPuzzle.style.backgroundImage = `url(${this.imageRound?.src})`;
                currentPuzzle.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
                currentPuzzle.style.backgroundPosition = `${backgroundPositionX}px ${backgroundPositionY}px`;
              }
            }
          });
        });
      });
    });
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
    this.wordLinesHTML.forEach((wordsLine) => {
      const currentWordsLine = wordsLine;
      currentWordsLine.classList.add(styles.line_complete);
      const wordsLineChildren = Array.from(wordsLine.children);
      wordsLineChildren.forEach((puzzle) => {
        const puzzleHTML = puzzle;
        puzzleHTML.classList.add(puzzleStyles.puzzle_completed);
        if (puzzleHTML instanceof HTMLDivElement) {
          const fontSize = '0px';
          puzzleHTML.style.fontSize = fontSize;
        }
      });
    });

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
    gameBoardHTML.classList.add(styles.game_board__complete);
    title.textContent = formattedTitle;
    description.textContent = imgInfo;
    gameBoardHTML.append(title, description);
  }

  private autoCompleteLine(): void {
    this.wordLinesHTML[this.currentRound].innerHTML = '';
    this.wordLinesHTML[this.currentRound].style.pointerEvents =
      EVENT_ACCESSIBILITY.none;
    this.view.clearSourceBlockHTML();

    const wordsCopy = [...this.words[this.currentRound]];
    const puzzlesCopy = [...this.puzzles[this.currentRound]];

    wordsCopy.forEach((word, index) => {
      const puzzle = puzzlesCopy.find(
        (item) =>
          item.getHTML().id === word &&
          item.getHTML().getAttribute('word') === String(index),
      );
      if (puzzle) {
        this.wordLinesHTML[this.currentRound].appendChild(puzzle.getHTML());
      }
    });

    this.puzzles[this.currentRound].forEach((puzzle) => {
      const currentPuzzle = puzzle.getHTML();
      currentPuzzle.classList.remove(puzzleStyles.puzzle_placeholder);
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

    this.view
      .getTranslateSentenceHTML()
      .classList.remove(styles.translate_sentence_hidden);

    this.view
      .getTranslateListenBtn()
      .getHTML()
      .classList.remove(styles.translate_listen_hidden);

    this.addDontKnowLine();
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

  private switchVisibleBackgroundHint(isVisible: unknown): void {
    if (typeof isVisible === 'boolean') {
      this.puzzles[this.currentRound].forEach((puzzle) => {
        const currentPuzzle = puzzle.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          !isVisible,
        );
      });
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
      this.singletonMediator.notify(AppEvents.switchDisableNextRoundBtn, '');
    });
  }

  private createWordLines(): HTMLDivElement[] {
    this.shuffledWords.forEach((_, index) => {
      const wordsLine = createBaseElement({
        tag: TAG_NAMES.div,
        cssClasses: [styles.line],
      });

      wordsLine.style.pointerEvents = EVENT_ACCESSIBILITY.none;
      wordsLine.style.top = `${index}0%`;
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
    this.shuffledWords.forEach((wordsLine, lineIndex) => {
      const lineArr: PuzzleComponent[] = [];

      wordsLine.forEach((_, wordIndex) => {
        const puzzle = new PuzzleComponent(
          this.words[lineIndex][wordIndex],
          this,
          this.view,
        );

        puzzle.getHTML().setAttribute('line', `${lineIndex}`);
        puzzle.getHTML().setAttribute('word', `${wordIndex}`);

        lineArr.push(puzzle);
      });

      this.puzzles.push(lineArr);
    });

    return this.puzzles;
  }

  private fillSourcedBlock(): void {
    const sourcedBlockHTML = this.view.getSourceBlockHTML();
    const shuffledPuzzles = shuffleArr(this.puzzles[this.currentRound]);
    shuffledPuzzles.forEach((puzzle) => {
      if (puzzle instanceof PuzzleComponent) {
        const puzzleHTML = puzzle.getHTML();
        sourcedBlockHTML.append(puzzleHTML);
      }
    });

    shuffledPuzzles.forEach((puzzle) => {
      if (puzzle instanceof PuzzleComponent) {
        const currentPuzzle = puzzle.getHTML();
        currentPuzzle.classList.toggle(
          puzzleStyles.puzzle_placeholder,
          this.storage.get(STORE_KEYS.BACKGROUND_HINT) === true,
        );
      }
    });

    const gridTemplateColumns = `repeat(${this.puzzles[this.currentRound].length}, auto)`;
    sourcedBlockHTML.style.gridTemplateColumns = gridTemplateColumns;
    this.wordLinesHTML[this.currentRound].style.gridTemplateColumns =
      gridTemplateColumns;
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
      AppEvents.switchBackgroundHintVisible,
      this.switchVisibleBackgroundHint.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.newGame,
      this.setGameData.bind(this),
    );

    this.singletonMediator.subscribe(
      AppEvents.nextRound,
      this.startNextRound.bind(this),
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
