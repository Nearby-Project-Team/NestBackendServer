import { Test, TestingModule } from '@nestjs/testing';
import { CalandarController } from './calandar.controller';
import { CalandarService } from './calandar.service';

describe('CalandarController', () => {
  let controller: CalandarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalandarController],
      providers: [CalandarService],
    }).compile();

    controller = module.get<CalandarController>(CalandarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
