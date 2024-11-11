import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [DatabaseModule],
  providers: [ArtistService],
})
export class ArtistModule {}
