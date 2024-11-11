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
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDParam } from 'src/utils/IDParam.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() { id }: IDParam) {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param() { id }: IDParam, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  remove(@Param() { id }: IDParam) {
    this.userService.removeUser(id);
  }
}
