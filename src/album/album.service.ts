import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { v4 as UUID } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly database: DatabaseService) {}

  getAlbums() {
    return this.database.albums;
  }

  getAlbum(id: string) {
    const album = this.database.albums.find((el) => el.id === id);

    if (!album) throw new NotFoundException('Album is not found');

    return album;
  }

  createAlbum(data: CreateAlbumDto) {
    const newAlbum = {
      id: UUID(),
      ...data,
    };

    this.database.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, data: UpdateAlbumDto) {
    const album = this.database.albums.find((el) => el.id === id);

    if (!album) throw new NotFoundException('Album is not found');

    album.name = data.name ? data.name : album.name;
    album.year = data.year ? data.year : album.year;
    album.artistId = data.artistId ? data.artistId : album.artistId;

    return album;
  }

  removeAlbum(id: string) {
    const index = this.database.albums.findIndex((album) => album.id === id);

    if (index === -1) throw new NotFoundException('album is not found');

    const tracks = this.database.tracks.filter((el) => el.albumId === id);
    tracks.forEach((track) => (track.albumId = null));

    const favIndex = this.database.favorites.albums.findIndex(
      (el) => el === id,
    );
    if (favIndex !== -1) {
      this.database.favorites.albums.splice(favIndex, 1);
    }

    this.database.albums.splice(index, 1);
  }
}
