import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) { }

    async create(createUserDto: CreateUserDto) {
        const userExist=await this.findByEmail(createUserDto.email);

        if(userExist) throw new ConflictException('Email already exists');

        if(createUserDto.role==UserRole.COMPANY_ADMIN && !createUserDto.companyId) {
            throw new BadRequestException("Company is required");
        } 

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.userModel.create({
            ...createUserDto,
            password: hashedPassword
        })
    }

    findAll() {
        return this.userModel.findAll({
            attributes: {
                exclude: ['password']
            },
            include: { all: true }
        });
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({
            where: { email }
        });
    }

    async findById(id: string) {
        return this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        });
    }
}
