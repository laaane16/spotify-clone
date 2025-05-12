import { ArtistSchema } from '@/entities/Artist/model/types/ArtistSchema';
import { CommentSchema } from '@/entities/Comment/model/types/CommentSchema';

export interface SingSchema {
  id: number;
  name: string;
  listens: number;
  picture: string;
  artist: ArtistSchema;
  comment: CommentSchema;
}
