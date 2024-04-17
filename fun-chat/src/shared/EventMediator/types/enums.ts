const MEDIATOR_EVENTS = {
  CHANGE_PAGE: 'changePage',
  CREATE_NEW_USER: 'createNewUser',
  SET_NEW_USER: 'setNewUser',
  LOG_IN_REQUEST: 'logInRequest',
  LOG_IN_RESPONSE: 'logInResponse',
  LOG_OUT_REQUEST: 'logOutRequest',
  LOG_OUT_RESPONSE: 'logOutResponse',
  SOCKET_CONNECT: 'socketConnect',
  SOCKET_DISCONNECT: 'socketDisconnect',
  GET_ALL_AUTHENTICATED_USERS_REQUEST: 'getAllAuthenticatedUsersRequest',
  GET_ALL_AUTHENTICATED_USERS_RESPONSE: 'getAllAuthenticatedUsersResponse',
  GET_ALL_UNAUTHENTICATED_USERS_REQUEST: 'getAllUnauthenticatedUsersRequest',
  GET_ALL_UNAUTHENTICATED_USERS_RESPONSE: 'getAllUnauthenticatedUsersResponse',
  GET_HISTORY_MESSAGES_REQUEST: 'getHistoryMessagesRequest',
  GET_HISTORY_MESSAGES_RESPONSE: 'getHistoryMessagesResponse',
  GET_ALL_HISTORY_MESSAGE_FOR_CURRENT_USER_REQUEST:
    'getAllHistoryMessageForCurrentUserRequest',
  GET_ALL_HISTORY_MESSAGE_FOR_CURRENT_USER_RESPONSE:
    'getAllHistoryMessageForCurrentUserResponse',
  SEND_MESSAGE_REQUEST: 'sendMessageRequest',
  SEND_MESSAGE_RESPONSE: 'sendMessageResponse',
  DELIVERED_MESSAGE_RESPONSE: 'deliveredMessageResponse',
  EXTERNAL_LOGIN_RESPONSE: 'externalLoginResponse',
  EXTERNAL_LOGOUT_RESPONSE: 'externalLogoutResponse',
  OPEN_USER_DIALOGUE: 'openUserDialogue',
} as const;

export default MEDIATOR_EVENTS;
