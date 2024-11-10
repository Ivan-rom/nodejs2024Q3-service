import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TrackController],
  imports: [DatabaseModule],
})
export class TrackModule {}
