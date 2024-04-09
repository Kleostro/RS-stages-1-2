import type { CurrentUser, Dialog } from '../initialData.ts';

const ACTIONS = {
  SET_CURRENT_USER: 'setCurrentUser',
  SET_CURRENT_AUTHORIZED_USERS: 'setCurrentAuthorizedUsers',
  SET_CURRENT_UNAUTHORIZED_USERS: 'setCurrentUnauthorizedUsers',
  SET_CURRENT_USER_DIALOGS: 'setCurrentUserDialogs',
} as const;

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

interface ActionWithPayload<T, U extends ActionType> {
  payload: T;
  type: U;
}

export const setCurrentUser = (
  value: CurrentUser | null,
): ActionWithPayload<CurrentUser | null, typeof ACTIONS.SET_CURRENT_USER> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_USER,
});

export const setCurrentAuthorizedUsers = (
  value: CurrentUser[],
): ActionWithPayload<
  CurrentUser[],
  typeof ACTIONS.SET_CURRENT_AUTHORIZED_USERS
> => ({
  payload: value,
  type: ACTIONS.SET_CURRENT_AUTHORIZED_USERS,
});

export const setCurrentUnauthorizedUsers = (
  value: CurrentUser[],
): ActionWithPayload<
  CurrentUser[],
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
