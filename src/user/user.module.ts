import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [UserController],
  providers: [DatabaseService],
})
export class UserModule {}
