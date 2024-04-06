/* eslint-disable max-lines-per-function */
import type { State } from '../initialData.ts';
import type { Action, Reducer } from './types/types.ts';

export const rootReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
