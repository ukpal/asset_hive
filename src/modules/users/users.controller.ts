import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../common/decorators/role.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Post()
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(
        JwtAuthGuard,
        RolesGuard
    )
    create(@Body() createUserDto:CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(
        JwtAuthGuard,
        RolesGuard
    )
    findAll(){
        return this.usersService.findAll();
    }
}
