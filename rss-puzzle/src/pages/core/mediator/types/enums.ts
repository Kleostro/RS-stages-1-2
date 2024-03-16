const AppEvents = {
  newUser: 'newUser',
  logOut: 'logOut',
  changeHash: 'changeHash',
  switchTranslateVisible: 'switchTranslateVisible',
  switchListenVisible: 'switchListenVisible',
  newGame: 'newGame',
  newCompletedRound: 'newCompletedRound',
  nextRound: 'nextRound',
} as const;

export default AppEvents;
