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
import { IDParam } from 'src/utils/IDParam.dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addTrack(@Param() { id }: IDParam) {
    this.favsService.addTrackToFavorites(id);

    return {
      message: 'Track is added to favorites',
    };
  }

  @Delete('track/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeTrack(@Param() { id }: IDParam) {
    this.favsService.removeTrackFromFavorites(id);

    return {
      message: 'Track is removed from favorites',
    };
  }

  @Post('album/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addAlbum(@Param() { id }: IDParam) {
    this.favsService.addAlbumToFavorites(id);

    return {
      message: 'Album is added to favorites',
    };
  }

  @Delete('album/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeAlbum(@Param() { id }: IDParam) {
    this.favsService.removeAlbumFromFavorites(id);

    return {
      message: 'Album is removed from favorites',
    };
  }

  @Post('artist/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  addArtist(@Param() { id }: IDParam) {
    this.favsService.addArtistToFavorites(id);

    return {
      message: 'Artist is added to favorites',
    };
  }

  @Delete('artist/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  removeArtist(@Param() { id }: IDParam) {
    this.favsService.removeArtistFromFavorites(id);

    return {
      message: 'Artist is removed from favorites',
    };
  }
}
