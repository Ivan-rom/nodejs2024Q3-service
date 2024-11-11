import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  imports: [DatabaseModule],
  providers: [FavsService],
})
export class FavsModule {}
