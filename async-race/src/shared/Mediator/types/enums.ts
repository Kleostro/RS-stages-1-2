const MEDIATOR_EVENTS = {
  GET_CURRENT_CARS: 'getCurrentCars',
  GET_CURRENT_WINNERS: 'getCurrentWinners',
  NEW_CAR: 'newCar',
  NEW_WINNER: 'newWinner',
  CHANGE_COLOR_PREVIEW_CAR: 'changeColorPreviewCar',
  CHANGE_NAME_PREVIEW_CAR: 'changeNamePreviewCar',
} as const;

export default MEDIATOR_EVENTS;
