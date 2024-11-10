import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ArtistController],
  imports: [DatabaseModule],
})
export class ArtistModule {}
