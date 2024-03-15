import type { levelInfo } from '../shared/api/types/interfaces.ts';
import type NewData from '../widgets/playground/types/interfaces.ts';

const isNewData = (data: unknown): data is NewData => {
  if (
    typeof data === 'object' &&
    data !== null &&
    'currentRound' in data &&
    typeof data.currentRound === 'number' &&
    'currentLVL' in data &&
    typeof data.currentLVL === 'number' &&
    'gameData' in data &&
    data.gameData !== null &&
    Array.isArray(data.gameData) &&
    data.gameData.every(
      (round: levelInfo) =>
        'rounds' in round &&
        Array.isArray(round.rounds) &&
        'roundsCount' in round &&
        typeof round.roundsCount === 'number',
    )
  ) {
    return true;
  }
  return false;
};

export default isNewData;
