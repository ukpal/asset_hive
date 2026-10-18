import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";
import { RentalOrder } from "../../rental-orders/entities/rental-order.entity";

@Table({
    tableName: 'companies',
    timestamps: true
})

export class Company extends Model {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string;

    @Column({
        allowNull: false
    })
    declare companyName: string

    @Column({
        allowNull: false
    })
    declare contactPerson: string

    @Column({
        allowNull: false,
        unique: true
    })
    declare email: string

    @Column
    declare phone: string

    @Column(DataType.TEXT)
    declare address: string

    @Column
    declare gstNumber: string

    @Column({
        defaultValue: true
    })
    declare isActive: boolean

    @HasMany(() => User)
    declare users: User[]

    @HasMany(()=>RentalOrder)
    declare rentalOrders: RentalOrder[]
}