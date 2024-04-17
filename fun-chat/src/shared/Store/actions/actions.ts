import type { User, Dialog } from '../initialData.ts';
import ACTIONS from './types/enums.ts';

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

interface ActionWithPayload<T, U extends ActionType> {
  payload: T;
  type: U;
}

export const setCurrentUser = (
  value: User | null,
): ActionWithPayload<User | null, typeof ACTIONS.SET_CURRENT_USER> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_USER,
});

export const setSelectedUser = (
  value: User | null,
): ActionWithPayload<User | null, typeof ACTIONS.SET_SELECTED_USER> => ({
  payload: value,
  type: ACTIONS.SET_SELECTED_USER,
});

export const setCurrentAuthorizedUsers = (
  value: User[],
): ActionWithPayload<User[], typeof ACTIONS.SET_CURRENT_AUTHORIZED_USERS> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_AUTHORIZED_USERS,
});

export const setCurrentUnauthorizedUsers = (
  value: User[],
): ActionWithPayload<
  User[],
  typeof ACTIONS.SET_CURRENT_UNAUTHORIZED_USERS
> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_UNAUTHORIZED_USERS,
});

export const setCurrentUserDialogs = (
  value: Dialog[],
): ActionWithPayload<Dialog[], typeof ACTIONS.SET_CURRENT_USER_DIALOGS> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_USER_DIALOGS,
});
