import { UserModel } from '../user.model';

export class GetUserDto {
  readonly id!: number;
  readonly email!: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
  }
}
