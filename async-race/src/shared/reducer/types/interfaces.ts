import type {
  CarInterface,
  WinnerInterface,
} from '../../Api/types/interfaces.ts';

export interface State {
  cars: CarInterface[];
  winners: WinnerInterface[];
  newCar: CarInterface[];
  garagePage: number;
}
