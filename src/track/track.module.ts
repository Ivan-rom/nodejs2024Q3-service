import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [DatabaseModule],
  providers: [TrackService],
})
export class TrackModule {}
