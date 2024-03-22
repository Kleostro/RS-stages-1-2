import type Reducer from '../Store/types/types.ts';
import type { State } from './types/interfaces.ts';
import type { Action } from './types/types.ts';

export const rootReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'getCurrentCars':
      return {
        ...state,
        currentCars: [...state.currentCars, ...action.payload],
      };
    case 'getCurrentWinners':
      return {
        ...state,
        currentWinners: [...state.currentWinners, ...action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
