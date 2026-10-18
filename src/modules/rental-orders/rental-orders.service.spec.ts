import { Test, TestingModule } from '@nestjs/testing';
import { RentalOrdersService } from './rental-orders.service';

describe('RentalOrdersService', () => {
  let service: RentalOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalOrdersService],
    }).compile();

    service = module.get<RentalOrdersService>(RentalOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
