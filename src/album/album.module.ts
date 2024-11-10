import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AlbumController],
  providers: [DatabaseService],
})
export class AlbumModule {}
