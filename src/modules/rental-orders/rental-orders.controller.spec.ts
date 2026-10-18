import { Test, TestingModule } from '@nestjs/testing';
import { RentalOrdersController } from './rental-orders.controller';
import { RentalOrdersService } from './rental-orders.service';

describe('RentalOrdersController', () => {
  let controller: RentalOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalOrdersController],
      providers: [RentalOrdersService],
    }).compile();

    controller = module.get<RentalOrdersController>(RentalOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
