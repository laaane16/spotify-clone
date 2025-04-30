import { redirect } from 'react-router-dom';

import { getUserSetData } from '@/entities/User/model/store/userStore';
import { IUser } from '@/entities/User/model/types/UserModel';
import { $api } from '@/shared/api/api';
import { getHomeRoute } from '@/shared/configs';
import { LOCAL_STORAGE_JWT_KEY } from '@/shared/constants/localstorage';
import { AuthData } from '../../types/AuthModel';

export const registration = async (
  username: string,
  password: string,
): Promise<AuthData | Error> => {
  try {
    const response = await $api.post<AuthData>('/auth/registration', {
      email: username,
      password,
    });

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, response.data.token);
    getUserSetData()({ id: response.data.user.id, email: response.data.user.email });

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    return new Error('Unknown Error');
  }
};
