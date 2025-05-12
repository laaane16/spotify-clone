import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'generated/prisma';
import * as path from 'path';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/CreateTrackDto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async getOne(id: number): Promise<Track | null> {
    const track = await this.prisma.track.findUnique({
      where: { id },
      include: {
        comments: true,
        artist: true,
      },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  getAll() {}

  async createTrack(
    files: { picture: Express.Multer.File[]; audio: Express.Multer.File[] },
    trackDto: CreateTrackDto,
  ) {
    const { picture, audio } = files;

    const picturePath = path.resolve(
      __dirname,
      '..',
      '..',
      'files',
      'track',
      'picture',
    );
    const audioPath = path.resolve(
      __dirname,
      '..',
      '..',
      'files',
      'track',
      'audio',
    );

    const pictureName = this.fileService.createFile(picture[0], picturePath);
    const audioName = this.fileService.createFile(audio[0], audioPath);

    const track = await this.prisma.track.create({
      data: {
        ...trackDto,
        artist: {
          connectOrCreate: {
            where: {
              id: trackDto.artist.id,
            },
            create: {
              ...trackDto.artist,
            },
          },
        },
        picture: pictureName,
        audio: audioName,
      },
    });

    return track;
  }

  async deleteTrack(id: number) {
    const track = await this.prisma.track.delete({ where: { id } });

    this.fileService.deleteFile(track.picture);
    this.fileService.deleteFile(track.audio);
  }
}
