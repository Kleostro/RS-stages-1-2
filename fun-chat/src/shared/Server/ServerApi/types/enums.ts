const API_URL = 'ws://127.0.0.1:4000';

export const API_TYPES = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  ERROR: 'ERROR',
} as const;

export default API_URL;
