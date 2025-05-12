import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModel } from './user.model';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: CreateUserDto): Promise<UserModel> {
    const { email, password } = userDto;
    const user = await this.prisma.user.create({
      data: { email, password },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserByToken(user: GetUserDto) {
    return this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }
}
