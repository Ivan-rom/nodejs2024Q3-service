import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IDParam } from 'src/utils/IDParam.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    return this.artistService.removeArtist(id);
  }
}
