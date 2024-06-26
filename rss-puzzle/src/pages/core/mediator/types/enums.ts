const AppEvents = {
  newUser: 'newUser',
  logOut: 'logOut',
  changeHash: 'changeHash',
  switchTranslateVisible: 'switchTranslateVisible',
  switchListenVisible: 'switchListenVisible',
  switchBackgroundHintVisible: 'switchBackgroundHintVisible',
  newGame: 'newGame',
  newCompletedRound: 'newCompletedRound',
  nextRound: 'nextRound',
  switchDisableNextRoundBtn: 'switchDisableNextRoundBtn',
  endRound: 'endRound',
} as const;

export default AppEvents;
