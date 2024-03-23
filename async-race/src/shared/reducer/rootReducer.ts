import type Reducer from '../Store/types/types.ts';
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
        cars: [...state.cars, ...action.payload],
      };
    case 'getWinners':
      return {
        ...state,
        winners: [...state.winners, ...action.payload],
      };
    case 'addNewCar':
      return {
        ...state,
        newCar: [...state.newCar, ...action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
