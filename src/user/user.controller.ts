import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { IDParam } from 'src/utils/IDParam.dto';

@Controller('user')
export class UserController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  findAll() {
    return this.database.getUsers();
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param() { id }: IDParam) {
    return this.database.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.database.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param() { id }: IDParam, @Body() dto: UpdateUserDto) {
    this.database.updateUser(id, dto);
  }

  @Delete(':id')
  remove(@Param() { id }: IDParam) {
    this.database.removeUser(id);
  }
}
