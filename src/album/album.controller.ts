import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IDParam } from 'src/utils/IDParam.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() dto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    return this.albumService.removeAlbum(id);
  }
}
