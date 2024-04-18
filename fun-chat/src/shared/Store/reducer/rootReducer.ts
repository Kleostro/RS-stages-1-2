import type { State } from '../initialData.ts';
import type { Action, Reducer } from './types/types.ts';

export const rootReducer: Reducer<State, Action> = (
  state: State,
  action: Action,
): State => {
  switch (action.type) {
    case 'setCurrentUser':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'setSelectedUser':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'setAllUsers':
      return {
        ...state,
        allUsers: action.payload,
      };
    case 'setCurrentAuthorizedUsers':
      return {
        ...state,
        currentAuthorizedUsers: action.payload,
      };
    case 'setCurrentUnauthorizedUsers':
      return {
        ...state,
        currentUnauthorizedUsers: action.payload,
      };
    case 'setCurrentUserDialogs':
      return {
        ...state,
        currentUserDialogs: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
