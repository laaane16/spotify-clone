import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserModel } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

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
      return this.generateToken(candidate);
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

    return this.generateToken(user);
  }

  generateToken(user: UserModel) {
    const payload = { id: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }
}
