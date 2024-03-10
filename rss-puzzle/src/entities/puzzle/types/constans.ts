export const PUZZLE_STYLE = {
  none: 'none',
  auto: 'auto',
  opacity_on: '1',
  opacity_off: '0',
  fill: 'forwards',
} as const;

export const PUZZLE_ANIMATION_OPTIONS = {
  duration: 500,
  iterations: 1,
  fill: PUZZLE_STYLE.fill,
} as const;

export const COPY_PUZZLE_ANIMATION_OPTIONS = {
  duration: 1000,
  iterations: 1,
  fill: PUZZLE_STYLE.fill,
} as const;
