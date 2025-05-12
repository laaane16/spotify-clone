import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class AuthModule {}
