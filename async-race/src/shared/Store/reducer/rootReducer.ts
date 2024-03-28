/* eslint-disable max-lines-per-function */
import type Reducer from '../types/types.ts';
import type { State } from './types/interfaces.ts';
import type { Action } from './types/types.ts';

export const rootReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'getCars':
      return {
        ...state,
        cars: [...action.payload],
      };
    case 'getWinners':
      return {
        ...state,
        winners: [...state.winners, ...action.payload],
      };
    case 'addNewCar':
      return {
        ...state,
        cars: [...state.cars, ...action.payload],
      };
    case 'deleteCar':
      return {
        ...state,
        cars: [...action.payload],
      };
    case 'setTotalGaragePages':
      return {
        ...state,
        totalGaragePages: action.payload,
      };
    case 'changeGaragePage':
      return {
        ...state,
        garagePage: action.payload,
      };
    case 'setTotalWinnersPages':
      return {
        ...state,
        totalWinnersPages: action.payload,
      };
    case 'changeWinnersPage':
      return {
        ...state,
        winnersPage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
