const MEDIATOR_EVENTS = {
  CHANGE_PAGE: 'changePage',
  CREATE_NEW_USER: 'createNewUser',
  SET_NEW_USER: 'setNewUser',
  NEW_MESSAGE: 'newMessage',
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  SOCKET_CONNECT: 'socketConnect',
  SOCKET_DISCONNECT: 'socketDisconnect',
} as const;

export default MEDIATOR_EVENTS;
