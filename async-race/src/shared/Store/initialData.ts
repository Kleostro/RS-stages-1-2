import type { State } from './reducer/types/interfaces.ts';

const INITIAL_DATA: State = {
  cars: [],
  winners: [],
  garagePage: 1,
  totalGaragePages: 1,
  winnersPage: 1,
  totalWinnersPages: 1,
} as const;

export default INITIAL_DATA;
