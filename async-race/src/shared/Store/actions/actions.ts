import type {
  CarInterface,
  WinnerInterface,
} from '../../Api/types/interfaces.ts';
import ACTIONS from './types/enums.ts';
import type ActionWithPayload from './types/interfaces.ts';

export const getCars = (
  value: CarInterface[],
): ActionWithPayload<CarInterface[], typeof ACTIONS.GET_CARS> => ({
  payload: value,
  type: ACTIONS.GET_CARS,
});

export const getWinners = (
  value: WinnerInterface[],
): ActionWithPayload<WinnerInterface[], typeof ACTIONS.GET_WINNERS> => ({
  payload: value,
  type: ACTIONS.GET_WINNERS,
});

export const addNewCar = (
  value: CarInterface[],
): ActionWithPayload<CarInterface[], typeof ACTIONS.ADD_NEW_CAR> => ({
  payload: value,
  type: ACTIONS.ADD_NEW_CAR,
});

export const deleteCar = (
  value: CarInterface[],
): ActionWithPayload<CarInterface[], typeof ACTIONS.DELETE_CAR> => ({
  payload: value,
  type: ACTIONS.DELETE_CAR,
});

export const setTotalGaragePages = (
  value: number,
): ActionWithPayload<number, typeof ACTIONS.SET_TOTAL_GARAGE_PAGES> => ({
  payload: value,
  type: ACTIONS.SET_TOTAL_GARAGE_PAGES,
});

export const changeGaragePage = (
  value: number,
): ActionWithPayload<number, typeof ACTIONS.CHANGE_GARAGE_PAGE> => ({
  payload: value,
  type: ACTIONS.CHANGE_GARAGE_PAGE,
});

export const setTotalWinnersPages = (
  value: number,
): ActionWithPayload<number, typeof ACTIONS.SET_TOTAL_WINNERS_PAGES> => ({
  payload: value,
  type: ACTIONS.SET_TOTAL_WINNERS_PAGES,
});

export const changeWinnersPage = (
  value: number,
): ActionWithPayload<number, typeof ACTIONS.CHANGE_WINNERS_PAGE> => ({
  payload: value,
  type: ACTIONS.CHANGE_WINNERS_PAGE,
});
