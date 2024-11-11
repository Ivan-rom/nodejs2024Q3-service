import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track } from 'src/utils/types';
import { User } from 'src/utils/user';

@Injectable()
export class DatabaseService {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: Favorites;

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favorites = {
      tracks: [],
      albums: [],
      artists: [],
    };
  }
}
