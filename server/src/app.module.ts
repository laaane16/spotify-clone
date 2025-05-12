import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, TrackModule, FileModule, PrismaModule],
})
export class AppModule {}
