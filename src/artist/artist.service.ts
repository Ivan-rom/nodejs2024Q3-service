import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { v4 as UUID } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly database: DatabaseService) {}

  getArtists() {
    return this.database.artists;
  }

  getArtist(id: string) {
    const artist = this.database.artists.find((el) => el.id === id);

    if (!artist) throw new NotFoundException('Artist is not found');

    return artist;
  }

  createArtist(data: CreateArtistDto) {
    const newArtist = {
      id: UUID(),
      ...data,
    };

    this.database.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, data: UpdateArtistDto) {
    const artist = this.database.artists.find((el) => el.id === id);

    if (!artist) throw new NotFoundException('Artist is not found');

    artist.name = data.name ?? artist.name;
    artist.grammy = data.grammy ?? artist.grammy;

    return artist;
  }

  removeArtist(id: string) {
    const index = this.database.artists.findIndex((artist) => artist.id === id);

    if (index === -1) throw new NotFoundException('Artist is not found');

    this.database.tracks
      .filter((el) => el.artistId === id)
      .forEach((track) => (track.artistId = null));

    this.database.albums
      .filter((el) => el.artistId === id)
      .forEach((track) => (track.artistId = null));

    const favIndex = this.database.favorites.artists.findIndex(
      (el) => el === id,
    );
    if (favIndex !== -1) {
      this.database.favorites.artists.splice(favIndex, 1);
    }

    this.database.artists.splice(index, 1);
  }
}
