export interface IUser {
  id: number;
  email: string;
}

export interface UserModel extends Partial<IUser> {
  _inited: boolean;

  initData: () => void;
  setData: (user: IUser) => void;
}
