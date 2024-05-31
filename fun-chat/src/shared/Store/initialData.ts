import type { Message } from '../../utils/isMessage.ts';

export interface Status {
  isDelivered: boolean;
  isEdited: boolean;
  isReaded: boolean;
}

export interface User {
  login: string;
  password: string;
  isLogined: boolean | string;
}

export interface Dialog {
  login: string;
  messages: Message[];
}

// state field typing
export interface State {
  currentUser: User | null;
  selectedUser: User | null;
  allUsers: User[];
  currentAuthorizedUsers: User[];
  currentUnauthorizedUsers: User[];
  currentUserDialogs: Dialog[];
}

// initial state values
export const INITIAL_STATE: State = {
  currentUser: null,
  selectedUser: null,
  allUsers: [],
  currentAuthorizedUsers: [],
  currentUnauthorizedUsers: [],
  currentUserDialogs: [],
} as const;

export default INITIAL_STATE;
