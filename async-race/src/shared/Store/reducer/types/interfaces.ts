import type {
  CarInterface,
  WinnerInterface,
} from '../../../Api/types/interfaces.ts';

export interface State {
  cars: CarInterface[];
  winners: WinnerInterface[];
  garagePage: number;
  totalGaragePages: number;
  winnersPage: number;
  totalWinnersPages: number;
}
