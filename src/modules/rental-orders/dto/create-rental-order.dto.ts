import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateRentalOrderDto {

    @IsUUID()
    companyId!: string

    @IsDateString()
    startDate!: Date

    @IsDateString()
    endDate!: Date

    @IsArray()
    laptopIds!: string[]

    @IsOptional()
    @IsString()
    notes?: string
}
