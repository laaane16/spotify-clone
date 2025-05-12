import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { rmSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  createFile(file: Express.Multer.File, filePath: string) {
    try {
      const fileName = this._getFileName(file);
      mkdirSync(filePath, { recursive: true });
      writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error with file creating',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  deleteFile(filePath: string) {
    try {
      rmSync(filePath);
    } catch (e) {
      throw new HttpException(
        'Error with deleting file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private _getFileName(file: Express.Multer.File) {
    return uuid.v4() + '.' + file.originalname.split('.').pop();
  }
}
