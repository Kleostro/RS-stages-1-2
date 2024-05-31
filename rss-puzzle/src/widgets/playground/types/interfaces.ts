import type { levelInfo } from '../../../pages/choiceGamePage/types/interfaces';

export interface NewData {
  currentRound: number;
  currentLVL: number;
  gameData: [levelInfo];
}

export interface LastRoundInfo {
  currentRound: number;
  currentLVL: number;
  gameData: [levelInfo];
}

export interface lineInfo {
  audioCurrentLineSrc: string | undefined;
  sentenceCurrentLine: string | undefined;
}

export interface PictureInfo {
  src: string;
  title: string;
  info: string;
}
