export interface CurrentUser {
  login: string;
  password: string;
  authorized: boolean;
}

interface Status {
  isDelivered: boolean;
  isEdited: boolean;
  isReaded: boolean;
}

export interface User {
  login: string;
  password: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Status;
}

interface FetchHistoryWithUser {
  id: string;
  payload: Message[];
  type: 'MSG_FROM_USER';
}

export interface Dialog {
  history: FetchHistoryWithUser[];
  login: string;
}

// state field typing
export interface State {
  currentUser: CurrentUser | null;
  currentAuthorizedUsers: User[];
  currentUnauthorizedUsers: User[];
  currentUserDialogs: Dialog[];
}

// enumeration of state fields
export const STATE_FIELDS = {
  CURRENT_USER: 'currentUser',
  CURRENT_AUTHORIZED_USERS: 'currentAuthorizedUsers',
  CURRENT_UNAUTHORIZED_USERS: 'currentUnauthorizedUsers',
  CURRENT_USER_DIALOGS: 'currentUserDialogs',
} as const;

// initial state values
export const INITIAL_STATE: State = {
  currentUser: null,
  currentAuthorizedUsers: [],
  currentUnauthorizedUsers: [],
  currentUserDialogs: [],
} as const;

export default INITIAL_STATE;
