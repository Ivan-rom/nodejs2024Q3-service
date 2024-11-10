import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Track } from 'src/utils/types';
import { User } from 'src/utils/user';
import { v4 as UUID } from 'uuid';

@Injectable()
export class DatabaseService {
  users: User[];
  tracks: Track[];

  constructor() {
    this.users = [];
    this.tracks = [];
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
    user.version++;
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

    this.tracks.splice(index, 1);
  }
}
