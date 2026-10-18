import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Laptop } from './entities/laptop.entity';

@Injectable()
export class LaptopsService {

    constructor(
        @InjectModel(Laptop)
        private readonly laptopModel:typeof Laptop
    ){}

    create(payload){
        return this.laptopModel.create({
            ...payload
        })
    }
}
