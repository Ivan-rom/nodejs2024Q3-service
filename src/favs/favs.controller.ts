import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IDParam } from 'src/utils/IDParam.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  findAll() {
    return this.database.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addTrack(@Param() { id }: IDParam) {
    console.log(id);

    this.database.addTrackToFavorites(id);

    return {
      message: 'Track is added to favorites',
    };
  }

  @Delete('track/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeTrack(@Param() { id }: IDParam) {
    this.database.removeTrackFromFavorites(id);

    return {
      message: 'Track is removed from favorites',
    };
  }

  @Post('album/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addAlbum(@Param() { id }: IDParam) {
    this.database.addAlbumToFavorites(id);

    return {
      message: 'Album is added to favorites',
    };
  }

  @Delete('album/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeAlbum(@Param() { id }: IDParam) {
    this.database.removeAlbumFromFavorites(id);

    return {
      message: 'Album is removed from favorites',
    };
  }

  @Post('artist/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addArtist(@Param() { id }: IDParam) {
    this.database.addArtistToFavorites(id);

    return {
      message: 'Artist is added to favorites',
    };
  }

  @Delete('artist/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeArtist(@Param() { id }: IDParam) {
    this.database.removeArtistFromFavorites(id);

    return {
      message: 'Artist is removed from favorites',
    };
  }
}
