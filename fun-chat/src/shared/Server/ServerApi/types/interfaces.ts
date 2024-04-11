import type { User } from '../../../Store/initialData.ts';

interface LoginUser {
  id: string | null;
  type: 'USER_LOGIN';
  payload: {
    user: User;
  };
}

export default LoginUser;
