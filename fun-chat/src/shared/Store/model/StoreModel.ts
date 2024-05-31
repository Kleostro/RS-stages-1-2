import { INITIAL_STATE } from '../initialData.ts';
import type { State } from '../initialData.ts';
import type { Action, Reducer } from '../reducer/types/types.ts';
import { rootReducer } from '../reducer/rootReducer.ts';
import type ACTIONS from '../actions/types/enums.ts';

class StoreModel {
  private static listeners: Map<string, VoidFunction[]> = new Map();

  private static rootReducer: Reducer<State, Action> = rootReducer;

  private static state: State = INITIAL_STATE;

  public static dispatch(action: Action): Action {
    StoreModel.state = StoreModel.rootReducer(StoreModel.state, action);

    StoreModel.listeners.forEach((_, key) => {
      if (key === action.type) {
        const currentListeners = StoreModel.listeners.get(key);
        if (currentListeners) {
          currentListeners.forEach((currentListener) => currentListener());
        }
      }
    });

    return action;
  }

  public static getState(): State {
    return structuredClone(StoreModel.state);
  }

  public static subscribe(
    key: (typeof ACTIONS)[keyof typeof ACTIONS],
    listener: VoidFunction,
  ): VoidFunction {
    const currentListeners = StoreModel.listeners.get(key) || [];
    currentListeners.push(listener);

    StoreModel.listeners.set(key, currentListeners);

    return () => {
      StoreModel.listeners.delete(key);
    };
  }
}

export default StoreModel;
