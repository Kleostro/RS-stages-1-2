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
  { transform: 'translateX(-10%)', opacity: 1 },
  { transform: 'translate(-10%, -110%)', opacity: 0 },
];

export const AUTHENTICATION_ANIMATE_DETAILS = {
  params: AUTHENTICATION_ANIMATE_PARAMS,
  duration: 5500,
  easing: 'cubic-bezier(0, 0.2, 0.58, 0.7)',
};

export const ABOUT_INFO_TEXT = {
  text: 'This project was created for educational purposes.',
  backButtonText: 'Go back',
};

export default PAGES_IDS;
