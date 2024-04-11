import type { User } from '../shared/Store/initialData.ts';

const isUser = (data: unknown): data is User =>
  typeof data === 'object' &&
  data !== null &&
  'login' in data &&
  'password' in data;

export default isUser;
