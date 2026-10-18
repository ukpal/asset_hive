import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { UserRole } from "../../../common/enums/user-role.enum";
import { Company } from "../../companies/entities/company.entity";
import { RentalOrder } from "../../rental-orders/entities/rental-order.entity";

@Table({
    tableName: 'users',
    timestamps: true
})

export class User extends Model {

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        allowNull:false,
        primaryKey:true
    })
    declare id: string

    @ForeignKey(()=>Company)
    @Column({
        type:DataType.UUID,
        allowNull:true
    })
    declare companyId: string 

    @Column({
        allowNull:false
    })
    declare name: string

    @Column({
        allowNull:false,
        unique:true
    })
    declare email:string

    @Column({
        allowNull:false
    })
    password!: string

    @Column({
        allowNull:false,
        type:DataType.ENUM(...Object.values(UserRole))
    })
    declare role: UserRole

    @Column({
        defaultValue:true
    })
    declare isActive: boolean

    @BelongsTo(()=>Company)
    declare company: Company


    @HasMany(()=>RentalOrder)
    declare rentalOrders: RentalOrder[]
}