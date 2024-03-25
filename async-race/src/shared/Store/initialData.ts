import type { State } from './reducer/types/interfaces.ts';

const INITIAL_DATA: State = {
  cars: [],
  winners: [],
  garagePage: 1,
  totalPages: 1,
} as const;

export default INITIAL_DATA;
