import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {

    @IsString()
    companyName!: string;

    @IsString()
    contactPerson!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    @IsString()
    phone!: string

    @IsOptional()
    @IsString()
    address!: string;

    @IsOptional()
    @IsString()
    gstNumber!: string
}