import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { IDParam } from 'src/utils/IDParam.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  findAll() {
    return this.database.getTracks();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.database.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateTrackDto) {
    return this.database.createTrack(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() dto: UpdateTrackDto) {
    return this.database.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    this.database.removeTrack(id);
  }
}
