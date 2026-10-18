import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company)
        private readonly companyModel: typeof Company
    ) { }

    create(createCompanyDto: CreateCompanyDto) {
        return this.companyModel.create({
            ...createCompanyDto
        });
    }

    findAll() {
        return this.companyModel.findAll();
    }

    // findById(id:string){
    //     return this.companyModel.findByPk(id);
    // }
}
