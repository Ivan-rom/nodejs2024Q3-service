import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private readonly database: DatabaseService) {}

  getFavorites() {
    const tracks = this.database.tracks.filter((el) =>
      this.database.favorites.tracks.some((fav) => fav === el.id),
    );

    const albums = this.database.albums.filter((el) =>
      this.database.favorites.albums.some((fav) => fav === el.id),
    );

    const artists = this.database.artists.filter((el) =>
      this.database.favorites.artists.some((fav) => fav === el.id),
    );

    return {
      tracks,
      albums,
      artists,
    };
  }

  addTrackToFavorites(id: string) {
    const track = this.database.tracks.find((el) => el.id === id);

    if (!track) throw new UnprocessableEntityException('Track does not exist');

    this.database.favorites.tracks.push(track.id);
  }

  removeTrackFromFavorites(id: string) {
    const index = this.database.favorites.tracks.findIndex(
      (track) => track === id,
    );

    if (index === -1) throw new NotFoundException('Track is not in favorites');

    this.database.favorites.tracks.splice(index, 1);
  }

  addArtistToFavorites(id: string) {
    const artist = this.database.artists.find((el) => el.id === id);

    if (!artist)
      throw new UnprocessableEntityException('Artist does not exist');

    this.database.favorites.artists.push(artist.id);
  }

  removeArtistFromFavorites(id: string) {
    const index = this.database.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (index === -1) throw new NotFoundException('Artist is not in favorites');

    this.database.favorites.artists.splice(index, 1);
  }

  addAlbumToFavorites(id: string) {
    const album = this.database.albums.find((el) => el.id === id);

    if (!album) throw new UnprocessableEntityException('Album does not exist');

    this.database.favorites.albums.push(album.id);
  }

  removeAlbumFromFavorites(id: string) {
    const index = this.database.favorites.albums.findIndex(
      (album) => album === id,
    );

    if (index === -1) throw new NotFoundException('Album is not in favorites');

    this.database.favorites.albums.splice(index, 1);
  }
}
