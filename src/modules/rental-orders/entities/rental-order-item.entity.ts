import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RentalOrder } from "./rental-order.entity";
import { Laptop } from "../../laptops/entities/laptop.entity";

@Table({
    tableName: 'rental_order_items',
    timestamps: true
})
export class RentalOrderItem extends Model {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string

    @ForeignKey(() => RentalOrder)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare rentalOrderId: string

    @ForeignKey(() => Laptop)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare laptopId: string

    @Column(DataType.DECIMAL(10, 2))
    declare monthlyRentalPrice: number


    @BelongsTo(()=>Laptop)
    declare laptop:Laptop

}