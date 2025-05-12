import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/CreateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('/:id')
  getTrack(@Param('id') id: number) {
    return this.trackService.getOne(id);
  }

  @Get()
  getTracks() {
    return this.trackService.getAll();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  createTrack(
    @UploadedFiles()
    files: {
      picture: Express.Multer.File[];
      audio: Express.Multer.File[];
    },
    @Body() trackDto: CreateTrackDto,
  ) {
    return this.trackService.createTrack(files, trackDto);
  }

  @Delete('/:id')
  deleteTrack(@Param('id') id: number) {
    return this.trackService.deleteTrack(id);
  }
}
