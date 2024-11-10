import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
})
export class UserModule {}
