import { $api } from '@/shared/api/api';
import { IUser } from '../types/UserModel';

export const initUserData = async (): Promise<IUser | Error> => {
  try {
    const response = await $api.get<IUser>('/user/me');

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    return new Error('Unknown Error');
  }
};
