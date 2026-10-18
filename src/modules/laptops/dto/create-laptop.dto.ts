import { IsNumber, IsString } from "class-validator"


export class CreateLaptopDto {

    @IsString()
    assetTag!: string

    @IsString()
    brand!: string

    @IsString()
    model!: string

    @IsString()
    serialNumber!: string

    @IsString()
    processor!: string

    @IsString()
    ram!: string

    @IsString()
    storage!: string

    @IsNumber()
    purchasePrice!: number

    @IsNumber()
    monthlyRentalPrice!: number
}