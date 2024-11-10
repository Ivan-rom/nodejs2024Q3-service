import { Injectable } from '@nestjs/common';
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
    const { login, version, createdAt, updatedAt } = this.users.find(
      (el) => el.id === id,
    );
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
    if (user.password === data.oldPassword) {
      user.password = data.newPassword;
      user.version++;
    }
  }

  removeUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
