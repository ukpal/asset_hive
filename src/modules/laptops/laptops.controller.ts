import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LaptopsService } from './laptops.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@Controller('laptops')
export class LaptopsController {

    constructor(
        private readonly laptopService: LaptopsService
    ) { }

    @Post()
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(
        JwtAuthGuard,
        RolesGuard
    )
    create(@Body() createLaptopDto: CreateLaptopDto) {
        return this.laptopService.create(createLaptopDto);
    }
}
