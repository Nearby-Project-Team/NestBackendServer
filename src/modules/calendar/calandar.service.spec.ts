import { Test, TestingModule } from '@nestjs/testing';
import { CalandarService } from './calandar.service';

describe('CalandarService', () => {
  let service: CalandarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalandarService],
    }).compile();

    service = module.get<CalandarService>(CalandarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
