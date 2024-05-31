const ACTIONS = {
  GET_CARS: 'getCars',
  GET_WINNERS: 'getWinners',
  ADD_NEW_CAR: 'addNewCar',
  DELETE_CAR: 'deleteCar',
  CHANGE_GARAGE_PAGE: 'changeGaragePage',
  SET_TOTAL_GARAGE_PAGES: 'setTotalGaragePages',
  CHANGE_WINNERS_PAGE: 'changeWinnersPage',
  SET_TOTAL_WINNERS_PAGES: 'setTotalWinnersPages',
} as const;

export default ACTIONS;
