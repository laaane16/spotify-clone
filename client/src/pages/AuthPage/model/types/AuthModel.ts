import { IUser } from '@/entities/User/model/types/UserModel';

export interface IToken {
  token: string;
}

export interface AuthData extends IToken {
  user: IUser;
}

export interface AuthModel {
  isLoading: boolean;
  error?: string;

  loginByUsername: (username: string, password: string) => Promise<string | undefined>;
  registration: (username: string, password: string) => Promise<string | undefined>;
}
