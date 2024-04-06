import type Reducer from '../types/types.ts';
import INITIAL_DATA from '../initialData.ts';
import type { State } from '../reducer/types/interfaces.ts';
import type { Action } from '../reducer/types/types.ts';
import { rootReducer } from '../reducer/rootReducer.ts';

class StoreModel {
  private static listeners: Map<string, VoidFunction> = new Map();

  private static rootReducer: Reducer<State, Action> = rootReducer;

  private static state: State = INITIAL_DATA;

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

  public static subscribe(key: string, listener: VoidFunction): VoidFunction {
    StoreModel.listeners.set(key, listener);

    return () => {
      StoreModel.listeners.delete(key);
    };
  }
}

export default StoreModel;
