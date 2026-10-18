import { Module } from '@nestjs/common';
import { RentalOrdersService } from './rental-orders.service';
import { RentalOrdersController } from './rental-orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalOrder } from './entities/rental-order.entity';
import { RentalOrderItem } from './entities/rental-order-item.entity';
import { Company } from '../companies/entities/company.entity';
import { Laptop } from '../laptops/entities/laptop.entity';

@Module({
  imports:[
    SequelizeModule.forFeature([RentalOrder,RentalOrderItem,Company,Laptop])
  ],
  controllers: [RentalOrdersController],
  providers: [RentalOrdersService],
})
export class RentalOrdersModule {}
