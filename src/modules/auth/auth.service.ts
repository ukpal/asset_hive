import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService:JwtService,
        private readonly usersService: UsersService
    ){}

    async login(email:string,password:string){
        const user = await this.usersService.findByEmail(email);

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const validPassword=bcrypt.compare(password,user.password);

        if(!validPassword){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload={sub:user.id,email:user.email,role:user.role};

        const accessToken=await this.jwtService.signAsync(payload);

        return {accessToken}
    }
}
