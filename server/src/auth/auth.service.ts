import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from 'src/user/dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const candidate = await this.userService.getUserByEmail(email);
    const passwordEquals = compareSync(password, candidate?.password || '');

    if (candidate && passwordEquals) {
      const preparedUser = new GetUserDto(candidate);

      return { user: preparedUser, token: this.generateToken(candidate) };
    }

    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST,
    );
  }

  async registration(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const candidate = await this.userService.getUserByEmail(email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = hashSync(password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const preparedUser = new GetUserDto(user);

    return { user: preparedUser, token: this.generateToken(user) };
  }

  generateToken(user: UserModel) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
