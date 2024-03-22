import type {
  CarInterface,
  WinnerInterface,
} from '../../Api/types/interfaces.ts';

export interface State {
  currentCars: CarInterface[];
  currentWinners: WinnerInterface[];
}
