const MEDIATOR_EVENTS = {
  CHANGE_PAGE: 'changePage',
  GET_CURRENT_CARS: 'getCurrentCars',
  GET_CURRENT_WINNERS: 'getCurrentWinners',
  DELETE_CAR: 'deleteCar',
  DELETE_WINNER: 'deleteWinner',
  CREATE_CAR: 'createCar',
  CREATE_WINNER: 'createWinner',
  CREATE_MORE_CARS: 'createMoreCars',
  SELECT_CAR: 'selectCar',
  UPDATE_CAR: 'updateCar',
  CHANGE_COLOR_PREVIEW_CAR: 'changeColorPreviewCar',
  CHANGE_TOTAL_GARAGE_PAGES: 'changeTotalGaragePages',
  CHANGE_NAME_PREVIEW_CAR: 'changeNamePreviewCar',
  CHANGE_GARAGE_PAGE: 'changeGaragePage',
  CHANGE_WINNERS_PAGE: 'changeWinnersPage',
  START_RACE: 'startRace',
  RESET_RACE: 'resetRace',
  NEW_WINNER: 'newWinner',
  CAR_BROKEN: 'carBroken',
  RESET_CURRENT_CAR: 'resetCurrentCar',
  EMPTY_RACE: 'emptyRace',
  SINGLE_RACE_START: 'singleRaceStart',
  SINGLE_RACE_RESET: 'singleRaceReset',
  DRAW_NEW_WINNER: 'drawNewWinner',
} as const;

export default MEDIATOR_EVENTS;
