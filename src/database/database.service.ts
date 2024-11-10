import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Album, Artist, Favorites, Track } from 'src/utils/types';
import { User } from 'src/utils/user';
import { v4 as UUID } from 'uuid';

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

  getUsers() {
    return this.users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  getUser(id: string) {
    const user = this.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    const { login, version, createdAt, updatedAt } = user;

    return { id, login, version, createdAt, updatedAt };
  }

  createUser(data: CreateUserDto) {
    const newUser = new User(data);

    this.users.push(newUser);

    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  updateUser(id: string, data: UpdateUserDto) {
    const user = this.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    if (user.password !== data.oldPassword)
      throw new ForbiddenException('Password is wrong');

    user.password = data.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  removeUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException('User is not found');

    this.users.splice(index, 1);
  }

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    const track = this.tracks.find((el) => el.id === id);

    if (!track) throw new NotFoundException('Track is not found');

    return track;
  }

  createTrack(data: CreateTrackDto) {
    const newTrack = {
      id: UUID(),
      ...data,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, data: UpdateTrackDto) {
    const track = this.tracks.find((el) => el.id === id);

    if (!track) throw new NotFoundException('Track is not found');

    track.albumId = data.albumId ? data.albumId : track.albumId;
    track.artistId = data.artistId ? data.artistId : track.artistId;
    track.duration = data.duration ? data.duration : track.duration;
    track.name = data.name ? data.name : track.name;

    return track;
  }

  removeTrack(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) throw new NotFoundException('Track is not found');

    const favIndex = this.favorites.tracks.findIndex((el) => el === id);
    if (favIndex !== -1) {
      this.favorites.tracks.splice(favIndex, 1);
    }

    this.tracks.splice(index, 1);
  }

  getArtists() {
    return this.artists;
  }

  getArtist(id: string) {
    const artist = this.artists.find((el) => el.id === id);

    if (!artist) throw new NotFoundException('Artist is not found');

    return artist;
  }

  createArtist(data: CreateArtistDto) {
    const newArtist = {
      id: UUID(),
      ...data,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, data: UpdateArtistDto) {
    const artist = this.artists.find((el) => el.id === id);

    if (!artist) throw new NotFoundException('Artist is not found');

    artist.name = data.name ?? artist.name;
    artist.grammy = data.grammy ?? artist.grammy;

    return artist;
  }

  removeArtist(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) throw new NotFoundException('Artist is not found');

    this.tracks
      .filter((el) => el.artistId === id)
      .forEach((track) => (track.artistId = null));

    this.albums
      .filter((el) => el.artistId === id)
      .forEach((track) => (track.artistId = null));

    const favIndex = this.favorites.artists.findIndex((el) => el === id);
    if (favIndex !== -1) {
      this.favorites.artists.splice(favIndex, 1);
    }

    this.artists.splice(index, 1);
  }

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    const album = this.albums.find((el) => el.id === id);

    if (!album) throw new NotFoundException('Album is not found');

    return album;
  }

  createAlbum(data: CreateAlbumDto) {
    const newAlbum = {
      id: UUID(),
      ...data,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, data: UpdateAlbumDto) {
    const album = this.albums.find((el) => el.id === id);

    if (!album) throw new NotFoundException('Album is not found');

    album.name = data.name ? data.name : album.name;
    album.year = data.year ? data.year : album.year;
    album.artistId = data.artistId ? data.artistId : album.artistId;

    return album;
  }

  removeAlbum(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) throw new NotFoundException('album is not found');

    const tracks = this.tracks.filter((el) => el.albumId === id);
    tracks.forEach((track) => (track.albumId = null));

    const favIndex = this.favorites.albums.findIndex((el) => el === id);
    if (favIndex !== -1) {
      this.favorites.albums.splice(favIndex, 1);
    }

    this.albums.splice(index, 1);
  }

  getFavorites() {
    const tracks = this.tracks.filter((el) =>
      this.favorites.tracks.some((fav) => fav === el.id),
    );

    const albums = this.albums.filter((el) =>
      this.favorites.albums.some((fav) => fav === el.id),
    );

    const artists = this.artists.filter((el) =>
      this.favorites.artists.some((fav) => fav === el.id),
    );

    return {
      tracks,
      albums,
      artists,
    };
  }

  addTrackToFavorites(id: string) {
    const track = this.tracks.find((el) => el.id === id);

    if (!track) throw new UnprocessableEntityException('Track does not exist');

    this.favorites.tracks.push(track.id);
  }

  removeTrackFromFavorites(id: string) {
    const index = this.favorites.tracks.findIndex((track) => track === id);

    if (index === -1) throw new NotFoundException('Track is not in favorites');

    this.favorites.tracks.splice(index, 1);
  }

  addArtistToFavorites(id: string) {
    const artist = this.artists.find((el) => el.id === id);

    if (!artist)
      throw new UnprocessableEntityException('Artist does not exist');

    this.favorites.artists.push(artist.id);
  }

  removeArtistFromFavorites(id: string) {
    const index = this.favorites.artists.findIndex((artist) => artist === id);

    if (index === -1) throw new NotFoundException('Artist is not in favorites');

    this.favorites.artists.splice(index, 1);
  }

  addAlbumToFavorites(id: string) {
    const album = this.albums.find((el) => el.id === id);

    if (!album) throw new UnprocessableEntityException('Album does not exist');

    this.favorites.albums.push(album.id);
  }

  removeAlbumFromFavorites(id: string) {
    const index = this.favorites.albums.findIndex((album) => album === id);

    if (index === -1) throw new NotFoundException('Album is not in favorites');

    this.favorites.albums.splice(index, 1);
  }
}
