import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [ArtistController],
  providers: [DatabaseService],
})
export class ArtistModule {}
