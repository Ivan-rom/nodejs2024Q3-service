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
import { IDParam } from 'src/utils/IDParam.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() dto: UpdateTrackDto) {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    this.trackService.removeTrack(id);
  }
}
