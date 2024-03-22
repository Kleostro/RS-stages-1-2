import type ActionType from './types.ts';

interface ActionWithPayload<T, U extends ActionType> {
  payload: T;
  type: U;
}

export default ActionWithPayload;
