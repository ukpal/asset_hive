import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { UserRole } from "../../../common/enums/user-role.enum";

export class CreateUserDto{

    @IsOptional()
    @IsUUID()
    companyId!: string;

    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string

    @IsEnum(UserRole)
    role!: UserRole
}