import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavsController],
  imports: [DatabaseModule],
})
export class FavsModule {}
