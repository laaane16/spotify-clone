import { Artist } from 'generated/prisma';

export class CreateTrackDto {
  readonly id: number;
  readonly title: string;
  readonly picture: string;
  readonly audio: string;
  artist: Omit<Artist, 'id'> & { id?: number };
}
