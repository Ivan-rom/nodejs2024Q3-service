import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly database: DatabaseService) {}

  getTracks() {
    return this.database.tracks;
  }

  getTrack(id: string) {
    const track = this.database.tracks.find((el) => el.id === id);

    if (!track) throw new NotFoundException('Track is not found');

    return track;
  }

  createTrack(data: CreateTrackDto) {
    const newTrack = {
      id: UUID(),
      ...data,
    };

    this.database.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, data: UpdateTrackDto) {
    const track = this.database.tracks.find((el) => el.id === id);

    if (!track) throw new NotFoundException('Track is not found');

    track.albumId = data.albumId ? data.albumId : track.albumId;
    track.artistId = data.artistId ? data.artistId : track.artistId;
    track.duration = data.duration ? data.duration : track.duration;
    track.name = data.name ? data.name : track.name;

    return track;
  }

  removeTrack(id: string) {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index === -1) throw new NotFoundException('Track is not found');

    const favIndex = this.database.favorites.tracks.findIndex(
      (el) => el === id,
    );
    if (favIndex !== -1) {
      this.database.favorites.tracks.splice(favIndex, 1);
    }

    this.database.tracks.splice(index, 1);
  }
}
