const RACE_TRACK_BUTTON_TEXT = {
  SELECT_CAR: 'Select',
  REMOVE_CAR: 'Remove',
  START_ENGINE: 'A',
  STOP_ENGINE: 'B',
} as const;

export const SINGLE_RACE = 'single';

export const RACE_TRACK_SVG_DETAILS = {
  SVG_URL: 'http://www.w3.org/2000/svg',
  CAR_ID: 'car',
  FLAG_ID: 'race-flag',
} as const;

export const TRANSITION_STATE = {
  START: 'translateX(0)',
} as const;

export const FILL = 'forwards';

export default RACE_TRACK_BUTTON_TEXT;
