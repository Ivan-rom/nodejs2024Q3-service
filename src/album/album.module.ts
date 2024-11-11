import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  imports: [DatabaseModule],
  providers: [AlbumService],
})
export class AlbumModule {}
