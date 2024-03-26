const MEDIATOR_EVENTS = {
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
  CHANGE_NAME_PREVIEW_CAR: 'changeNamePreviewCar',
  CHANGE_GARAGE_PAGE: 'changeGaragePage',
  CHANGE_TOTAL_GARAGE_PAGES: 'changeTotalGaragePages',
  CHANGE_WINNER_PAGE: 'changeWinnerPage',
  START_RACE: 'startRace',
} as const;

export default MEDIATOR_EVENTS;
