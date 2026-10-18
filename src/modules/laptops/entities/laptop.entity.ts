import { Column, DataType, Model, Table } from "sequelize-typescript";
import { LaptopStatus } from "../../../common/enums/laptop-status.enum";


@Table({
    tableName: 'laptops',
    timestamps: true
})
export class Laptop extends Model {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string

    @Column({
        allowNull: false,
        unique: true
    })
    declare assetTag: string

    @Column({
        allowNull: false
    })
    declare brand: string

    @Column({
        allowNull: false
    })
    declare model: string

    @Column({
        allowNull: false,
        unique: true
    })
    declare serialNumber: string

    @Column
    declare processor: string

    @Column
    declare ram: string

    @Column
    declare storage: string

    @Column(DataType.DECIMAL(10, 2))
    declare purchasePrice: string

    @Column(DataType.DECIMAL(10, 2))
    declare monthlyRentalPrice: string

    @Column({
        type: DataType.ENUM(...Object.values(LaptopStatus)),
        defaultValue: LaptopStatus.AVAILABLE
    })
    declare status: LaptopStatus

}