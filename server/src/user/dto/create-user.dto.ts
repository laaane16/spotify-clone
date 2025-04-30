import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ title: 'User email', type: 'string' })
  readonly email!: string;
  @ApiProperty({ title: 'User password', type: 'string' })
  readonly password!: string;
}
