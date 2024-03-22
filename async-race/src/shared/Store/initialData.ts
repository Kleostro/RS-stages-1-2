import type { State } from '../reducer/types/interfaces.ts';

const INITIAL_DATA: State = {
  currentCars: [],
  currentWinners: [],
} as const;

export default INITIAL_DATA;
