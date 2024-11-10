import { Test, TestingModule } from '@nestjs/testing';
import { TrackController } from './track.controller';
import { DatabaseService } from 'src/database/database.service';

describe('TrackController', () => {
  let controller: TrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [DatabaseService],
    }).compile();

    controller = module.get<TrackController>(TrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
