import type NewData from '../widgets/playground/types/interfaces.ts';

const isNewData = (data: unknown): data is NewData =>
  typeof data === 'object' &&
  data !== null &&
  'currentRound' in data &&
  typeof data.currentRound === 'number' &&
  'gameData' in data &&
  data.gameData !== null &&
  typeof data.gameData === 'object' &&
  'words' in data.gameData &&
  Array.isArray(data.gameData.words);

export default isNewData;
