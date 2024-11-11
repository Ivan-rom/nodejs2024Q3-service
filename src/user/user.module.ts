import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {}
