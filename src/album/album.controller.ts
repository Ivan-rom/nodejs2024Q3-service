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
import { DatabaseService } from 'src/database/database.service';
import { IDParam } from 'src/utils/IDParam.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  findAll() {
    return this.database.getAlbums();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.database.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAlbumDto) {
    return this.database.createAlbum(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() dto: UpdateAlbumDto) {
    return this.database.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    return this.database.removeAlbum(id);
  }
}
