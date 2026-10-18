import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(
            loginDto.email,
            loginDto.password
        );
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(
        @CurrentUser() user:any
    ){
        return user;
    }

    @Get()
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(
        JwtAuthGuard,
        RolesGuard
    )
    findAll(){
        return 'only super admin can access';
    }
}
