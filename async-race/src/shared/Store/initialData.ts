import type { State } from '../reducer/types/interfaces.ts';

const INITIAL_DATA: State = {
  cars: [],
  winners: [],
  newCar: [],
  garagePage: 1,
} as const;

export default INITIAL_DATA;
