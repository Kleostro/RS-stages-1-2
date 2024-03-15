import type { levelInfo } from '../../../shared/api/types/interfaces.ts';

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
