import type { wordsInfo } from '../../../shared/api/types/interfaces.ts';

interface NewData {
  currentRound: number;
  currentLVL: number;
  gameData: {
    words: wordsInfo[];
  };
}

export default NewData;
