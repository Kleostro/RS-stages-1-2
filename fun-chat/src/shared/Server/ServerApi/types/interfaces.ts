import type { User } from '../../../Store/initialData.ts';

interface LoginUser {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: User;
  };
}

export default LoginUser;
