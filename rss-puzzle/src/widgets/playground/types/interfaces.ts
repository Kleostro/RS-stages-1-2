import type { levelInfo } from '../../../shared/api/types/interfaces.ts';

interface NewData {
  currentRound: number;
  currentLVL: number;
  gameData: [levelInfo];
}

export default NewData;
