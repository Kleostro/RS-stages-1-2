const PAGES_IDS = {
  FOR_DEPLOY: 'kleostro-JSFE2023Q4/fun-chat/',
  DEFAULT_PAGE: '',
  LOGIN_PAGE: 'login',
  MAIN_PAGE: 'main',
  ABOUT_PAGE: 'about',
} as const;

const AUTHENTICATION_ANIMATE_PARAMS = [
  { transform: 'translateX(110%)' },
  { transform: 'translateX(-10%)' },
  { transform: 'translateX(-10%)' },
  { transform: 'translateX(110%)' },
];

export const AUTHENTICATION_ANIMATE_DETAILS = {
  params: AUTHENTICATION_ANIMATE_PARAMS,
  duration: 7000,
  easing: 'cubic-bezier(0, 0.2, 0.58, 0.7)',
};

export default PAGES_IDS;
