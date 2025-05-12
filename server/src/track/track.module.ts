import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  providers: [TrackService, PrismaService, FileService],
  controllers: [TrackController],
})
export class TrackModule {}
