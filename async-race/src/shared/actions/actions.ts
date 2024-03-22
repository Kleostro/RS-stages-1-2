import type { CarInterface, WinnerInterface } from '../Api/types/interfaces.ts';
import ACTIONS from './types/enums.ts';
import type ActionWithPayload from './types/interfaces.ts';

export const getCurrentCars = (
  value: CarInterface[],
): ActionWithPayload<CarInterface[], typeof ACTIONS.GET_CURRENT_CARS> => ({
  payload: value,
  type: ACTIONS.GET_CURRENT_CARS,
});

export const getCurrentWinners = (
  value: WinnerInterface[],
): ActionWithPayload<
  WinnerInterface[],
  typeof ACTIONS.GET_CURRENT_WINNERS
> => ({
  payload: value,
  type: ACTIONS.GET_CURRENT_WINNERS,
});
