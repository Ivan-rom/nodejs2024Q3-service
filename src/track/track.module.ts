import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [TrackController],
  providers: [DatabaseService],
})
export class TrackModule {}
