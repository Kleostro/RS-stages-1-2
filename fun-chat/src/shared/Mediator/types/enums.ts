const MEDIATOR_EVENTS = {
  CHANGE_PAGE: 'changePage',
  CREATE_NEW_USER: 'createNewUser',
  SET_NEW_USER: 'setNewUser',
  NEW_MESSAGE: 'newMessage',
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
} as const;

export default MEDIATOR_EVENTS;
