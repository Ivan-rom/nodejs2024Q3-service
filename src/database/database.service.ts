import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/utils/user';

@Injectable()
export class DatabaseService {
  users: User[];

  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  getUser(id: string) {
    const user = this.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    const { login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  createUser(data: CreateUserDto) {
    const newUser = new User(data);
    this.users.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  updateUser(id: string, data: UpdateUserDto) {
    const user = this.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    if (user.password !== data.oldPassword)
      throw new ForbiddenException('Password is wrong');

    user.password = data.newPassword;
    user.version++;
  }

  removeUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException('User is not found');

    this.users.splice(index, 1);
  }
}
