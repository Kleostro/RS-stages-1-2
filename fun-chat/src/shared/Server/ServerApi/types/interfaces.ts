import type { User } from '@/shared/Store/initialData.ts';

interface LoginUser {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: User;
  };
}

export default LoginUser;
