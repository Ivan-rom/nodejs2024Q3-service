import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/utils/user';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  getUsers() {
    return this.database.users.map(
      ({ id, login, version, createdAt, updatedAt }) => ({
        id,
        login,
        version,
        createdAt,
        updatedAt,
      }),
    );
  }

  getUser(id: string) {
    const user = this.database.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    const { login, version, createdAt, updatedAt } = user;

    return { id, login, version, createdAt, updatedAt };
  }

  createUser(data: CreateUserDto) {
    const newUser = new User(data);

    this.database.users.push(newUser);

    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  updateUser(id: string, data: UpdateUserDto) {
    const user = this.database.users.find((el) => el.id === id);

    if (!user) throw new NotFoundException('User is not found');

    if (user.password !== data.oldPassword)
      throw new ForbiddenException('Password is wrong');

    user.password = data.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  removeUser(id: string) {
    const index = this.database.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException('User is not found');

    this.database.users.splice(index, 1);
  }
}
