import { INITIAL_STATE } from '../initialData.ts';
import type { State } from '../initialData.ts';
import type { Action, Reducer } from '../reducer/types/types.ts';
import { rootReducer } from '../reducer/rootReducer.ts';

class StoreModel {
  private static listeners: Map<string, VoidFunction> = new Map();

  private static rootReducer: Reducer<State, Action> = rootReducer;

  private static state: State = INITIAL_STATE;

  public static dispatch(action: Action): Action {
    StoreModel.state = StoreModel.rootReducer(StoreModel.state, action);

    StoreModel.listeners.forEach((_, key) => {
      if (key in StoreModel.state) {
        const currentListener = StoreModel.listeners.get(key);
        if (currentListener) {
          currentListener();
        }
      }
    });

    return action;
  }

  public static getState(): State {
    return structuredClone(StoreModel.state);
  }

  public static subscribe(
    key: keyof State,
    listener: VoidFunction,
  ): VoidFunction {
    StoreModel.listeners.set(key, listener);

    return () => {
      StoreModel.listeners.delete(key);
    };
  }
}

export default StoreModel;
