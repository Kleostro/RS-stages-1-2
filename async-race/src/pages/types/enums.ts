const PAGES_IDS = {
  DEFAULT_PAGE: '',
  GARAGE_PAGE: 'garage',
  WINNERS_PAGE: 'winners',
} as const;

export const MORE_COUNT_CARS = 100;

export const GARAGE_BUTTONS_TEXT = {
  START_RACE: 'Start race',
  RESET_RACE: 'Reset race',
  CREATE_MORE_CARS: 'Create 100 cars',
} as const;

export const WINNERS_SVG_DETAILS = {
  SVG_URL: 'http://www.w3.org/2000/svg',
  CAR_ID: 'car',
} as const;

export const THEAD_TD_IDS = ['id', 'car', 'name', 'wins', 'time'];

export default PAGES_IDS;
