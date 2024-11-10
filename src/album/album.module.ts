import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AlbumController],
  imports: [DatabaseModule],
})
export class AlbumModule {}
