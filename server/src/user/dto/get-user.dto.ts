import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../user.model';

export class GetUserDto {
  @ApiProperty({ title: 'User id', type: 'number' })
  readonly id!: number;
  @ApiProperty({ title: 'User email', type: 'string' })
  readonly email!: string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
  }
}
