import type Reducer from '../types/types.ts';
import INITIAL_DATA from '../initialData.ts';
import type { State } from '../../reducer/types/interfaces';
import type { Action } from '../../reducer/types/types.ts';
import { rootReducer } from '../../reducer/rootReducer.ts';

class StoreModel {
  private static listeners: Set<VoidFunction> = new Set();

  private static rootReducer: Reducer<State, Action> = rootReducer;

  private static state: State = INITIAL_DATA;

  public static dispatch(action: Action): Action {
    StoreModel.state = StoreModel.rootReducer(StoreModel.state, action);
    StoreModel.listeners.forEach((listener) => {
      listener();
    });
    return action;
  }

  public static getState(): State {
    return structuredClone(StoreModel.state);
  }

  public static subscribe(listener: VoidFunction): VoidFunction {
    StoreModel.listeners.add(listener);

    return () => {
      StoreModel.listeners.delete(listener);
    };
  }
}

export default StoreModel;
