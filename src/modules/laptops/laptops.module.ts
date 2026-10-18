import { Module } from '@nestjs/common';
import { LaptopsController } from './laptops.controller';
import { LaptopsService } from './laptops.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Laptop } from './entities/laptop.entity';

@Module({
  imports:[
    SequelizeModule.forFeature([Laptop])
  ],
  controllers: [LaptopsController],
  providers: [LaptopsService]
})
export class LaptopsModule {}
