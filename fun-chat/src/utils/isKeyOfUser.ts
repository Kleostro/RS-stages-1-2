import type { User } from '../shared/Store/initialData.ts';

const isKeyOfUser = (context: User, key: string): key is keyof User =>
  Object.hasOwnProperty.call(context, key);

export default isKeyOfUser;
