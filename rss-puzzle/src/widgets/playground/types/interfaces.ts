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
